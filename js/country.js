const VISA_CSV_URL = 'https://raw.githubusercontent.com/ilyankou/passport-index-dataset/master/passport-index-tidy-iso3.csv';

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

    if (title) title.textContent = 'Ülke Listesi';
    if (subtitle) subtitle.textContent = message;
    if (list) list.innerHTML = '';
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
        return;
    }

    const meta = VISA_STATUS_META[status];
    const buckets = getVisaDestinationsByStatus(country);
    const items = buckets[status] || [];

    title.textContent = `${country.ulke} için ${meta.label} Ülkeler`;
    subtitle.textContent = `${items.length} ülke listeleniyor.`;

    if (!items.length) {
        list.innerHTML = '<p class="visa-list-empty">Bu kategoride listelenecek ülke bulunamadı.</p>';
    } else {
        list.innerHTML = items.map(item => {
            const text = `${item.bayrak} ${item.ulke}`;
            return `<a class="visa-country-chip" href="ulke.html?code=${encodeURIComponent(item.kod)}">${text}</a>`;
        }).join('');
    }

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

    await preloadVisaDataset();
    if (currentCountry) {
        renderCountryPage(currentCountry);
        renderVisaCountryList(currentCountry, activeVisaStatus, false);
    }

    document.getElementById('country-select')?.addEventListener('change', e => {
        const next = getCountryByCode(e.target.value);
        if (!next) return;
        updateUrl(next.kod);
        renderCountryPage(next);
        if (visaLoadState === 'loaded') {
            renderVisaCountryList(next, activeVisaStatus, false);
        }
    });
});
