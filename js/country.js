const VISA_CSV_URL = 'https://raw.githubusercontent.com/ilyankou/passport-index-dataset/master/passport-index-tidy-iso3.csv';
const COUNTRIES_META_URL = 'https://raw.githubusercontent.com/annexare/Countries/master/dist/countries.min.json';
const CONTINENT_LABELS_TR = {
    AF: 'Afrika',
    AS: 'Asya',
    EU: 'Avrupa',
    NA: 'Kuzey Amerika',
    SA: 'Güney Amerika',
    OC: 'Okyanusya'
};

const VISA_STATUS_META = {
    vizesiz: { label: 'Vizesiz', color: '#2ecc71', index: 0 },
    varista: { label: 'Varışta Vize', color: '#f39c12', index: 1 },
    evize: { label: 'E-Vize', color: '#3498db', index: 2 },
    vize: { label: 'Vize Gerekli', color: '#e74c3c', index: 3 }
};

let visaChart = null;
let visaMatrixByPassportIso3 = null;
let visaLoadState = 'idle';
let currentCountry = null;
let activeVisaStatus = 'vize';
let visaListSearchQuery = '';
let visaListSortMode = 'az';
let visaListRegion = 'all';
let countryMetaByIso2 = null;
let lastRenderedVisaItems = [];

const COUNTRY_BY_ISO3 = {};
PASAPORT_DATA.forEach(item => {
    COUNTRY_BY_ISO3[item.iso3] = item;
});
const VALID_ISO3 = new Set(PASAPORT_DATA.map(item => item.iso3));

function getCountryByCode(code) {
    if (!code) return null;
    return PASAPORT_DATA.find(item => item.kod === code.toUpperCase()) || null;
}

function parseCountryCodeFromUrl() {
    const params = new URLSearchParams(window.location.search);
    return (params.get('code') || '').toUpperCase();
}

function updateUrl(code) {
    const url = new URL(window.location.href);
    url.searchParams.set('code', code);
    window.history.replaceState({}, '', url.toString());
}

function formatNumberTr(value) {
    const raw = Number(String(value || '').replace(/\./g, ''));
    if (!Number.isFinite(raw)) return value;
    return new Intl.NumberFormat('tr-TR').format(raw);
}

function getRankPercentile(country) {
    const total = PASAPORT_DATA.length || 1;
    const percentile = ((total - country.sira + 1) / total) * 100;
    return Math.round(percentile);
}

function getMobilityTier(country) {
    if (country.puan >= 170) return 'Elit Mobilite';
    if (country.puan >= 140) return 'Yüksek Mobilite';
    if (country.puan >= 100) return 'Gelişen Mobilite';
    return 'Sınırlı Mobilite';
}

function normalizeText(value) {
    return String(value || '')
        .toLowerCase()
        .replace(/ı/g, 'i')
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '');
}

function getVisaCounts(country) {
    const source = visaMatrixByPassportIso3?.[country.iso3];
    if (!source) {
        return {
            vizesiz: country.vizesiz,
            varista: country.varistaSiz,
            evize: country.evize,
            vize: country.vizeGerekli
        };
    }

    const counts = { vizesiz: 0, varista: 0, evize: 0, vize: 0 };
    Object.entries(source).forEach(([iso3, status]) => {
        if (!VALID_ISO3.has(iso3)) return;
        if (!counts[status] && counts[status] !== 0) return;
        counts[status] += 1;
    });
    return counts;
}

function mapRequirementToStatus(requirement) {
    const value = String(requirement || '').toLowerCase().trim().replace(/"/g, '');
    if (!value) return null;

    // CSV'de 30/90/180 gibi gün bazlı serbest kalış değerleri var: vizesiz kabul edilir.
    if (/^\d+$/.test(value)) return 'vizesiz';
    if (value === 'visa free' || value.includes('visa free') || value.includes('no visa')) return 'vizesiz';
    if (value === 'eta' || value.includes('electronic travel authorization')) return 'vizesiz';
    if (value === 'visa on arrival') return 'varista';
    if (value === 'e-visa') return 'evize';
    if (value === 'visa required') return 'vize';
    return null;
}

function parseVisaCsvToMatrix(csvText) {
    const lines = csvText.split(/\r?\n/).filter(Boolean);
    const matrix = {};

    lines.slice(1).forEach(line => {
        const parts = line.split(',');
        if (parts.length < 3) return;

        const passport = parts[0].trim();
        const destination = parts[1].trim();
        const requirement = parts[2].trim();
        const status = mapRequirementToStatus(requirement);

        if (!status || !passport || !destination) return;
        if (!VALID_ISO3.has(passport) || !VALID_ISO3.has(destination)) return;
        if (passport === destination) return;

        if (!matrix[passport]) matrix[passport] = {};
        matrix[passport][destination] = status;
    });

    return matrix;
}

async function preloadVisaDataset() {
    if (visaLoadState === 'loading' || visaLoadState === 'loaded') return;
    visaLoadState = 'loading';
    renderVisaCountryListLoading('Gerçek vize verisi yükleniyor...');

    try {
        const response = await fetch(VISA_CSV_URL, { cache: 'force-cache' });
        if (!response.ok) throw new Error('CSV indirilemedi: ' + response.status);

        const csvText = await response.text();
        visaMatrixByPassportIso3 = parseVisaCsvToMatrix(csvText);
        visaLoadState = 'loaded';
    } catch (err) {
        visaLoadState = 'error';
        console.warn('Vize veri seti yüklenemedi:', err);
    }
}

async function preloadCountryMeta() {
    if (countryMetaByIso2) return;
    try {
        const response = await fetch(COUNTRIES_META_URL, { cache: 'force-cache' });
        if (!response.ok) throw new Error('Meta indirilemedi: ' + response.status);
        countryMetaByIso2 = await response.json();
    } catch (err) {
        console.warn('Ülke meta verisi yüklenemedi:', err);
        countryMetaByIso2 = {};
    }
}

function getCountryContinentCode(kod) {
    if (!kod || !countryMetaByIso2) return null;
    const meta = countryMetaByIso2[kod.toUpperCase()];
    return meta?.continent || null;
}

function setCountryMeta(country) {
    if (!country) return;
    document.title = `${country.ulke} Pasaportu | Pasaport Endeksi`;

    const heading = document.getElementById('country-title');
    const subtitle = document.getElementById('country-subtitle');
    const flag = document.getElementById('passport-flag');
    const passportCountry = document.getElementById('passport-country');
    const passportCode = document.getElementById('passport-code');

    if (heading) heading.textContent = `${country.bayrak} ${country.ulke}`;
    if (subtitle) subtitle.textContent = `${country.ulke} pasaportunun global erişim gücü, vize dağılımı ve seyahat profili.`;
    if (flag) flag.textContent = country.bayrak;
    if (passportCountry) passportCountry.textContent = country.ulke.toUpperCase();
    if (passportCode) passportCode.textContent = country.kod;
}

function renderHeroBadges(country) {
    const badges = document.getElementById('hero-badges');
    if (!badges || !country) return;

    const percentile = getRankPercentile(country);
    const tier = getMobilityTier(country);
    const counts = getVisaCounts(country);
    const totalAccess = counts.vizesiz + counts.varista + counts.evize;

    const items = [
        `Dünya #${country.sira}`,
        `Güç ${country.puan}`,
        `%${percentile} dilimde`,
        `${totalAccess} ülke erişim`,
        tier
    ];

    badges.innerHTML = items.map(item => `<span class="hero-badge">${item}</span>`).join('');
}

function renderCountryStats(country) {
    const grid = document.getElementById('country-metric-grid');
    if (!grid || !country) return;

    const counts = getVisaCounts(country);
    const totalAccess = counts.vizesiz + counts.varista + counts.evize;
    const metrics = [
        { label: 'Dünya Sırası', value: '#' + country.sira },
        { label: 'Pasaport Gücü', value: String(country.puan) },
        { label: 'Toplam Erişim', value: totalAccess + ' ülke' },
        { label: 'Vizesiz', value: counts.vizesiz + ' ülke', status: 'vizesiz' },
        { label: 'Varışta Vize', value: counts.varista + ' ülke', status: 'varista' },
        { label: 'E-Vize', value: counts.evize + ' ülke', status: 'evize' },
        { label: 'Vize Gerekli', value: counts.vize + ' ülke', status: 'vize' },
        { label: 'Nüfus', value: formatNumberTr(country.nufus) },
        { label: 'Mobilite Segmenti', value: getMobilityTier(country) }
    ];

    grid.innerHTML = metrics.map(metric => {
        if (metric.status) {
            return `
                <button type="button" class="country-metric-card is-clickable" data-visa-status="${metric.status}" aria-label="${metric.label} listesini aç">
                    <span class="label">${metric.label}</span>
                    <span class="value">${metric.value}</span>
                </button>
            `;
        }

        return `
            <article class="country-metric-card">
                <span class="label">${metric.label}</span>
                <span class="value">${metric.value}</span>
            </article>
        `;
    }).join('');
}

function renderVisaBars(country) {
    const bars = document.getElementById('visa-bars');
    if (!bars || !country) return;

    const counts = getVisaCounts(country);
    const total = counts.vizesiz + counts.varista + counts.evize + counts.vize;
    const items = [
        ['Vizesiz', counts.vizesiz, 'vizesiz'],
        ['Varışta Vize', counts.varista, 'varista'],
        ['E-Vize', counts.evize, 'evize'],
        ['Vize Gerekli', counts.vize, 'vize']
    ];

    bars.innerHTML = items.map(([label, value, status]) => {
        const pct = total ? Math.round((value / total) * 100) : 0;
        const color = VISA_STATUS_META[status].color;
        return `
            <button type="button" class="visa-bar-row" data-visa-status="${status}" aria-label="${label} listesini aç">
                <div class="visa-bar-head">
                    <span>${label}</span>
                    <span>${value} (${pct}%)</span>
                </div>
                <div class="visa-bar-track">
                    <div class="visa-bar-fill" style="width:${pct}%;background:${color}"></div>
                </div>
            </button>
        `;
    }).join('');
}

function renderTravelSnapshot(country) {
    const el = document.getElementById('travel-snapshot');
    if (!el || !country) return;

    const counts = getVisaCounts(country);
    const total = counts.vizesiz + counts.varista + counts.evize + counts.vize;
    const easyTravel = counts.vizesiz + counts.varista;
    const easyPct = total ? Math.round((easyTravel / total) * 100) : 0;
    const digitalPct = total ? Math.round((counts.evize / total) * 100) : 0;
    const restrictionPct = total ? Math.round((counts.vize / total) * 100) : 0;

    el.innerHTML = `
        <div class="snapshot-item">
            <span class="label">Kolay Erişim</span>
            <span class="value">%${easyPct}</span>
            <small>Vizesiz + varışta vize</small>
        </div>
        <div class="snapshot-item">
            <span class="label">Dijital Erişim</span>
            <span class="value">%${digitalPct}</span>
            <small>E-vize kanal payı</small>
        </div>
        <div class="snapshot-item">
            <span class="label">Kısıtlı Alan</span>
            <span class="value">%${restrictionPct}</span>
            <small>Vize gerekli ülkeler</small>
        </div>
    `;
}

function renderVisaChart(country) {
    const canvas = document.getElementById('visa-chart');
    if (!canvas || !country || typeof Chart === 'undefined') return;

    if (visaChart) {
        visaChart.destroy();
        visaChart = null;
    }

    const counts = getVisaCounts(country);

    visaChart = new Chart(canvas, {
        type: 'doughnut',
        data: {
            labels: ['Vizesiz', 'Varışta Vize', 'E-Vize', 'Vize Gerekli'],
            datasets: [{
                data: [counts.vizesiz, counts.varista, counts.evize, counts.vize],
                backgroundColor: ['#2ecc71', '#f39c12', '#3498db', '#e74c3c'],
                borderColor: '#0f172a',
                borderWidth: 2
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { labels: { color: '#d8deea' } }
            },
            cutout: '58%',
            onHover(evt, elements, chart) {
                chart.canvas.style.cursor = elements.length ? 'pointer' : 'default';
            },
            onClick(evt, elements) {
                if (!elements.length) return;
                const index = elements[0].index;
                const status = Object.keys(VISA_STATUS_META).find(key => VISA_STATUS_META[key].index === index);
                if (!status) return;
                handleVisaCategorySelection(status, true);
            }
        }
    });
}

function fillCountrySelect(selectedCode) {
    const select = document.getElementById('country-select');
    if (!select) return;

    const sorted = [...PASAPORT_DATA].sort((a, b) => a.ulke.localeCompare(b.ulke, 'tr'));
    select.innerHTML = '<option value="">Seçiniz</option>' + sorted.map(item => `
        <option value="${item.kod}">${item.bayrak} ${item.ulke}</option>
    `).join('');

    if (selectedCode) select.value = selectedCode;
}

function getVisaDestinationsByStatus(country) {
    const empty = { vizesiz: [], varista: [], evize: [], vize: [] };
    const source = visaMatrixByPassportIso3?.[country.iso3];
    if (!source) return empty;

    Object.entries(source).forEach(([iso3, status]) => {
        if (!empty[status]) return;
        if (iso3 === country.iso3) return;

        const knownCountry = COUNTRY_BY_ISO3[iso3];
        if (!knownCountry) return;
        empty[status].push({
            iso3,
            ulke: knownCountry.ulke,
            bayrak: knownCountry.bayrak,
            kod: knownCountry.kod
        });
    });

    Object.keys(empty).forEach(key => {
        empty[key].sort((a, b) => a.ulke.localeCompare(b.ulke, 'tr'));
    });

    return empty;
}

function renderVisaCountryListLoading(message) {
    const title = document.getElementById('visa-list-title');
    const subtitle = document.getElementById('visa-list-subtitle');
    const list = document.getElementById('visa-country-list');
    const search = document.getElementById('visa-list-search');
    const region = document.getElementById('visa-list-region');
    const sort = document.getElementById('visa-list-sort');
    const exportCsv = document.getElementById('export-list-csv');
    const exportJson = document.getElementById('export-list-json');

    if (title) title.textContent = 'Ülke Listesi';
    if (subtitle) subtitle.textContent = message;
    if (list) list.innerHTML = '';
    if (search) search.disabled = true;
    if (region) region.disabled = true;
    if (sort) sort.disabled = true;
    if (exportCsv) exportCsv.disabled = true;
    if (exportJson) exportJson.disabled = true;
    lastRenderedVisaItems = [];
}

function updateActiveSelectionUI() {
    document.querySelectorAll('[data-visa-status]').forEach(el => {
        el.classList.toggle('is-active', el.dataset.visaStatus === activeVisaStatus);
    });

    if (visaChart) {
        const index = VISA_STATUS_META[activeVisaStatus]?.index;
        if (typeof index === 'number') {
            visaChart.setActiveElements([{ datasetIndex: 0, index }]);
            visaChart.update();
        }
    }
}

function renderVisaCountryList(country, status, shouldScroll) {
    const title = document.getElementById('visa-list-title');
    const subtitle = document.getElementById('visa-list-subtitle');
    const list = document.getElementById('visa-country-list');
    const panel = document.getElementById('visa-country-list-panel');

    if (!title || !subtitle || !list || !panel) return;

    if (visaLoadState === 'loading') {
        renderVisaCountryListLoading('Gerçek vize verisi yükleniyor...');
        return;
    }

    if (visaLoadState === 'error') {
        title.textContent = 'Ülke Listesi';
        subtitle.textContent = 'Detay liste şu anda yüklenemedi. Lütfen daha sonra tekrar deneyin.';
        list.innerHTML = '';
        const search = document.getElementById('visa-list-search');
        const region = document.getElementById('visa-list-region');
        const sort = document.getElementById('visa-list-sort');
        const exportCsv = document.getElementById('export-list-csv');
        const exportJson = document.getElementById('export-list-json');
        if (search) search.disabled = true;
        if (region) region.disabled = true;
        if (sort) sort.disabled = true;
        if (exportCsv) exportCsv.disabled = true;
        if (exportJson) exportJson.disabled = true;
        lastRenderedVisaItems = [];
        return;
    }

    const meta = VISA_STATUS_META[status];
    const buckets = getVisaDestinationsByStatus(country);
    const baseItems = buckets[status] || [];
    const searchQuery = normalizeText(visaListSearchQuery);
    const regionFiltered = baseItems.filter(item => {
        if (visaListRegion === 'all') return true;
        return getCountryContinentCode(item.kod) === visaListRegion;
    });
    const items = regionFiltered
        .filter(item => {
            if (!searchQuery) return true;
            return normalizeText(item.ulke).includes(searchQuery);
        })
        .sort((a, b) => {
            const cmp = a.ulke.localeCompare(b.ulke, 'tr');
            return visaListSortMode === 'za' ? -cmp : cmp;
        });

    const search = document.getElementById('visa-list-search');
    const region = document.getElementById('visa-list-region');
    const sort = document.getElementById('visa-list-sort');
    const exportCsv = document.getElementById('export-list-csv');
    const exportJson = document.getElementById('export-list-json');
    if (search) {
        search.disabled = false;
        if (search.value !== visaListSearchQuery) search.value = visaListSearchQuery;
    }
    if (region) {
        region.disabled = false;
        region.value = visaListRegion;
    }
    if (sort) {
        sort.disabled = false;
        sort.value = visaListSortMode;
    }
    if (exportCsv) exportCsv.disabled = items.length === 0;
    if (exportJson) exportJson.disabled = items.length === 0;

    title.textContent = `${country.ulke} için ${meta.label} Ülkeler`;
    const regionLabel = visaListRegion === 'all'
        ? 'Tüm Bölgeler'
        : (CONTINENT_LABELS_TR[visaListRegion] || visaListRegion);
    subtitle.textContent = `${items.length} / ${baseItems.length} ülke listeleniyor. Bölge: ${regionLabel}.`;

    if (!items.length) {
        const emptyMessage = baseItems.length && (searchQuery || visaListRegion !== 'all')
            ? 'Arama kriterine uygun ülke bulunamadı.'
            : 'Bu kategoride listelenecek ülke bulunamadı.';
        list.innerHTML = `<p class="visa-list-empty">${emptyMessage}</p>`;
    } else {
        list.innerHTML = items.map(item => {
            const text = `${item.bayrak} ${item.ulke}`;
            return `<a class="visa-country-chip" href="ulke.html?code=${encodeURIComponent(item.kod)}">${text}</a>`;
        }).join('');
    }
    lastRenderedVisaItems = items;

    if (shouldScroll) {
        panel.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
}

function handleVisaCategorySelection(status, shouldScroll) {
    if (!currentCountry || !VISA_STATUS_META[status]) return;
    activeVisaStatus = status;
    updateActiveSelectionUI();
    renderVisaCountryList(currentCountry, status, shouldScroll);
}

function getCountryAccessScore(country) {
    const counts = getVisaCounts(country);
    return counts.vizesiz + counts.varista + counts.evize;
}

function getRankedCountriesByAccess() {
    return [...PASAPORT_DATA].sort((a, b) => {
        const diff = getCountryAccessScore(b) - getCountryAccessScore(a);
        if (diff !== 0) return diff;
        return a.ulke.localeCompare(b.ulke, 'tr');
    });
}

function switchCountry(nextCountry) {
    if (!nextCountry) return;
    const select = document.getElementById('country-select');
    if (select) select.value = nextCountry.kod;
    updateUrl(nextCountry.kod);
    renderCountryPage(nextCountry);
}

function downloadBlob(filename, content, mimeType) {
    const blob = new Blob([content], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement('a');
    anchor.href = url;
    anchor.download = filename;
    document.body.appendChild(anchor);
    anchor.click();
    anchor.remove();
    URL.revokeObjectURL(url);
}

function exportCurrentList(format) {
    if (!currentCountry || !lastRenderedVisaItems.length) return;
    const meta = VISA_STATUS_META[activeVisaStatus];
    const safeCountry = currentCountry.kod.toLowerCase();
    const safeStatus = activeVisaStatus;

    if (format === 'csv') {
        const header = 'kod,ulke,bayrak,status\\n';
        const rows = lastRenderedVisaItems
            .map(item => `${item.kod},\"${item.ulke.replace(/\"/g, '\"\"')}\",${item.bayrak},${meta.label}`)
            .join('\\n');
        downloadBlob(`pasaport-${safeCountry}-${safeStatus}.csv`, header + rows, 'text/csv;charset=utf-8');
        return;
    }

    const payload = {
        sourceCountry: { kod: currentCountry.kod, ulke: currentCountry.ulke },
        status: meta.label,
        count: lastRenderedVisaItems.length,
        items: lastRenderedVisaItems
    };
    downloadBlob(
        `pasaport-${safeCountry}-${safeStatus}.json`,
        JSON.stringify(payload, null, 2),
        'application/json;charset=utf-8'
    );
}

function bindInteractiveHandlers() {
    const metricGrid = document.getElementById('country-metric-grid');
    if (metricGrid && !metricGrid.dataset.bound) {
        metricGrid.addEventListener('click', event => {
            const card = event.target.closest('[data-visa-status]');
            if (!card) return;
            handleVisaCategorySelection(card.dataset.visaStatus, true);
        });
        metricGrid.dataset.bound = '1';
    }

    const visaBars = document.getElementById('visa-bars');
    if (visaBars && !visaBars.dataset.bound) {
        visaBars.addEventListener('click', event => {
            const row = event.target.closest('[data-visa-status]');
            if (!row) return;
            handleVisaCategorySelection(row.dataset.visaStatus, true);
        });
        visaBars.dataset.bound = '1';
    }

    const search = document.getElementById('visa-list-search');
    if (search && !search.dataset.bound) {
        search.addEventListener('input', event => {
            visaListSearchQuery = event.target.value || '';
            if (currentCountry) {
                renderVisaCountryList(currentCountry, activeVisaStatus, false);
            }
        });
        search.dataset.bound = '1';
    }

    const sort = document.getElementById('visa-list-sort');
    if (sort && !sort.dataset.bound) {
        sort.addEventListener('change', event => {
            visaListSortMode = event.target.value === 'za' ? 'za' : 'az';
            if (currentCountry) {
                renderVisaCountryList(currentCountry, activeVisaStatus, false);
            }
        });
        sort.dataset.bound = '1';
    }

    const region = document.getElementById('visa-list-region');
    if (region && !region.dataset.bound) {
        region.addEventListener('change', event => {
            visaListRegion = event.target.value || 'all';
            if (currentCountry) {
                renderVisaCountryList(currentCountry, activeVisaStatus, false);
            }
        });
        region.dataset.bound = '1';
    }

    const exportCsv = document.getElementById('export-list-csv');
    if (exportCsv && !exportCsv.dataset.bound) {
        exportCsv.addEventListener('click', () => exportCurrentList('csv'));
        exportCsv.dataset.bound = '1';
    }

    const exportJson = document.getElementById('export-list-json');
    if (exportJson && !exportJson.dataset.bound) {
        exportJson.addEventListener('click', () => exportCurrentList('json'));
        exportJson.dataset.bound = '1';
    }

    const maxAccess = document.getElementById('quick-max-access');
    if (maxAccess && !maxAccess.dataset.bound) {
        maxAccess.addEventListener('click', () => {
            const ranked = getRankedCountriesByAccess();
            if (ranked[0]) switchCountry(ranked[0]);
        });
        maxAccess.dataset.bound = '1';
    }

    const minAccess = document.getElementById('quick-min-access');
    if (minAccess && !minAccess.dataset.bound) {
        minAccess.addEventListener('click', () => {
            const ranked = getRankedCountriesByAccess();
            if (ranked[ranked.length - 1]) switchCountry(ranked[ranked.length - 1]);
        });
        minAccess.dataset.bound = '1';
    }
}

function renderCountryPage(country) {
    if (!country) return;

    currentCountry = country;
    setCountryMeta(country);
    renderHeroBadges(country);
    renderCountryStats(country);
    renderTravelSnapshot(country);
    renderVisaBars(country);
    renderVisaChart(country);

    updateActiveSelectionUI();
    if (currentCountry) renderVisaCountryList(currentCountry, activeVisaStatus, false);
}

document.addEventListener('DOMContentLoaded', async () => {
    const fallback = PASAPORT_DATA[0];
    const code = parseCountryCodeFromUrl();
    const country = getCountryByCode(code) || fallback;

    fillCountrySelect(country.kod);
    bindInteractiveHandlers();
    updateUrl(country.kod);
    renderCountryPage(country);

    await Promise.all([preloadVisaDataset(), preloadCountryMeta()]);
    if (currentCountry) {
        renderCountryPage(currentCountry);
        renderVisaCountryList(currentCountry, activeVisaStatus, false);
    }

    document.getElementById('country-select')?.addEventListener('change', e => {
        const next = getCountryByCode(e.target.value);
        if (!next) return;
        switchCountry(next);
    });
});
