// Pasaport Endeksi - Ana Uygulama
const GEOJSON_URL = 'https://raw.githubusercontent.com/datasets/geo-countries/master/data/countries.geojson';
const VISA_CSV_URL = 'https://raw.githubusercontent.com/ilyankou/passport-index-dataset/master/passport-index-tidy-iso3.csv';
const COUNTRIES_META_URL = 'https://raw.githubusercontent.com/annexare/Countries/master/dist/countries.min.json';
let map, geoLayer, geoData = null;
let visaMatrixByPassportIso3 = null;
let visaLoadState = 'idle';
let countryMetaByIso2 = null;
const compareFilterState = { search: '', region: 'all', sort: 'rank' };

document.addEventListener('DOMContentLoaded', () => {
    const data = PASAPORT_DATA.sort((a, b) => a.sira - b.sira);
    const turkiye = data.find(d => d.kod === 'TR');
    const countriesStat = document.getElementById('stat-countries');

    if (countriesStat) {
        countriesStat.textContent = String(data.length);
    }

    if (turkiye) {
        document.getElementById('stat-visa-free').textContent = turkiye.vizesiz + turkiye.varistaSiz;
    }

    setDataQualityBadge('Veri doğrulama: kontrol ediliyor...', 'loading');
    renderPassportGrid(data, 'all');
    renderRankingTable(data);
    fillSelects(data);
    initMap(data);
    renderTurkeySpotlight(turkiye);
    initEventListeners(data);
    applyInitialSearchFromUrl();
    preloadCountryMeta().then(() => {
        applyCompareFilters(data);
    });
});

function normalizeText(value) {
    return String(value || '')
        .toLowerCase()
        .replace(/ı/g, 'i')
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '');
}

function applyInitialSearchFromUrl() {
    const params = new URLSearchParams(window.location.search);
    const q = params.get('q');
    if (!q) return;
    const input = document.getElementById('ulke-ara');
    if (!input) return;
    input.value = q;
    input.dispatchEvent(new Event('input', { bubbles: true }));
}

function getAccessScore(country) {
    return country.vizesiz + country.varistaSiz + country.evize;
}

async function preloadCountryMeta() {
    if (countryMetaByIso2) return;
    try {
        const response = await fetch(COUNTRIES_META_URL, { cache: 'force-cache' });
        if (!response.ok) throw new Error('Meta indirilemedi: ' + response.status);
        countryMetaByIso2 = await response.json();
    } catch (err) {
        console.warn('Ulke meta verisi yuklenemedi:', err);
        countryMetaByIso2 = {};
    }
}

function getCountryContinentCode(kod) {
    if (!kod) return null;
    const meta = countryMetaByIso2?.[kod.toUpperCase()];
    return meta?.continent || null;
}

function sortCompareData(data, mode) {
    const items = [...data];
    if (mode === 'access-desc') {
        return items.sort((a, b) => getAccessScore(b) - getAccessScore(a) || a.ulke.localeCompare(b.ulke, 'tr'));
    }
    if (mode === 'access-asc') {
        return items.sort((a, b) => getAccessScore(a) - getAccessScore(b) || a.ulke.localeCompare(b.ulke, 'tr'));
    }
    if (mode === 'name') {
        return items.sort((a, b) => a.ulke.localeCompare(b.ulke, 'tr'));
    }
    return items.sort((a, b) => a.sira - b.sira || a.ulke.localeCompare(b.ulke, 'tr'));
}

function fillSingleCompareSelect(selectId, list) {
    const el = document.getElementById(selectId);
    if (!el) return;

    const previous = el.value;
    el.innerHTML = '<option value="">Ülke Seçin</option>' + list.map(d => `
        <option value="${d.kod}">${d.bayrak} ${d.ulke}</option>
    `).join('');

    if (previous && list.some(item => item.kod === previous)) {
        el.value = previous;
    } else {
        el.value = '';
        renderCompare(selectId === 'compare-select-1' ? 'compare-result-1' : 'compare-result-2', null);
    }
}

function applyCompareFilters(data) {
    const q = normalizeText(compareFilterState.search);
    const region = compareFilterState.region;

    const filtered = data.filter(item => {
        const nameMatch = !q || normalizeText(item.ulke).includes(q);
        const regionMatch = region === 'all' || getCountryContinentCode(item.kod) === region;
        return nameMatch && regionMatch;
    });

    const sorted = sortCompareData(filtered, compareFilterState.sort);
    fillSingleCompareSelect('compare-select-1', sorted);
    fillSingleCompareSelect('compare-select-2', sorted);
}

function focusCountryForCompare(data, code) {
    const country = data.find(d => d.kod === code);
    if (!country) return;

    const select = document.getElementById('compare-select-1');
    if (select) select.value = code;
    renderCompare('compare-result-1', country);
    document.getElementById('karsilastir')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function getCountryDetailUrl(code) {
    return 'ulke.html?code=' + encodeURIComponent(code);
}

function renderPassportGrid(data, filter) {
    const grid = document.getElementById('passport-grid');
    let filtered = [...data];
    if (filter === 'top-20') filtered = filtered.slice(0, 20);
    else if (filter === 'visa-free') filtered = filtered.filter(d => d.vizesiz >= 100);
    grid.innerHTML = filtered.map(d => `
        <article class="passport-card" data-code="${d.kod}" tabindex="0" aria-label="${d.ulke} pasaportu, puan: ${d.puan}">
            <span class="rank-badge">#${d.sira}</span>
            <span class="flag">${d.bayrak}</span>
            <span class="country-name">${d.ulke}</span>
            <span class="score">${d.puan}</span>
            <a class="country-detail-link" href="${getCountryDetailUrl(d.kod)}" aria-label="${d.ulke} detay sayfasini ac">Detay</a>
        </article>
    `).join('');
}

function renderRankingTable(data) {
    const tbody = document.getElementById('ranking-body');
    tbody.innerHTML = data.map(d => `
        <tr class="ranking-row" data-code="${d.kod}" tabindex="0" aria-label="${d.ulke} satirina git, karsilastirmada ac">
            <td class="rank-col">${d.sira}</td>
            <td>
                <div class="country-col">
                    <span class="flag">${d.bayrak}</span>
                    <a class="country-detail-link" href="${getCountryDetailUrl(d.kod)}" aria-label="${d.ulke} detay sayfasini ac">${d.ulke}</a>
                </div>
            </td>
            <td class="visa-free">${d.vizesiz}</td>
            <td class="visa-arrival">${d.varistaSiz}</td>
            <td class="evisa">${d.evize}</td>
            <td class="visa-required">${d.vizeGerekli}</td>
            <td class="score-col">${d.puan}</td>
        </tr>
    `).join('');
}

function fillSelects(data) {
    const mapSelect = document.getElementById('map-country-select');
    if (mapSelect) {
        data.forEach(d => {
            const opt = document.createElement('option');
            opt.value = d.kod;
            opt.textContent = d.bayrak + ' ' + d.ulke;
            mapSelect.appendChild(opt);
        });
    }

    // Ilk gorunumde filtrelenmemis compare listesi
    fillSingleCompareSelect('compare-select-1', sortCompareData(data, 'rank'));
    fillSingleCompareSelect('compare-select-2', sortCompareData(data, 'rank'));

    const mapSel = document.getElementById('map-country-select');
    if (mapSel) mapSel.value = 'TR';
}

function renderCompare(id, country) {
    const el = document.getElementById(id);
    if (!country) { el.innerHTML = ''; return; }
    const total = country.vizesiz + country.varistaSiz + country.evize;
    el.innerHTML = `
        <span class="compare-flag">${country.bayrak}</span>
        <div class="compare-country-name">${country.ulke}</div>
        <div class="compare-stat"><span class="compare-stat-label">Pasaport G\u00fcc\u00fc</span><span class="compare-stat-value">${country.puan}</span></div>
        <div class="compare-stat"><span class="compare-stat-label">D\u00fcnya S\u0131ras\u0131</span><span class="compare-stat-value">#${country.sira}</span></div>
        <div class="compare-stat"><span class="compare-stat-label">Vizesiz</span><span class="compare-stat-value" style="color:#2ecc71">${country.vizesiz}</span></div>
        <div class="compare-stat"><span class="compare-stat-label">Var\u0131\u015fta Vize</span><span class="compare-stat-value" style="color:#f39c12">${country.varistaSiz}</span></div>
        <div class="compare-stat"><span class="compare-stat-label">E-Vize</span><span class="compare-stat-value" style="color:#3498db">${country.evize}</span></div>
        <div class="compare-stat"><span class="compare-stat-label">Vize Gerekli</span><span class="compare-stat-value" style="color:#e74c3c">${country.vizeGerekli}</span></div>
        <div class="compare-stat"><span class="compare-stat-label">Toplam Eri\u015fim</span><span class="compare-stat-value">${total} \u00fclke</span></div>
        <div class="compare-stat"><span class="compare-stat-label">N\u00fcfus</span><span class="compare-stat-value">${country.nufus}</span></div>
    `;
}

const ISO2_TO_ISO3 = {};
function buildIsoMap(data) {
    data.forEach(d => { ISO2_TO_ISO3[d.kod] = d.iso3; });
}

function setMapDataStatus(message, state) {
    const el = document.getElementById('map-data-status');
    if (!el) return;
    el.textContent = message;
    el.dataset.state = state || 'info';
}

function mapRequirementToStatus(requirement) {
    const value = String(requirement || '').toLowerCase().trim().replace(/"/g, '');
    if (!value) return null;
    if (/^\d+$/.test(value)) return 'vizesiz';
    if (value === 'visa free' || value.includes('visa free') || value.includes('no visa')) return 'vizesiz';
    if (value === 'eta' || value.includes('electronic travel authorization')) return 'vizesiz';
    if (value === 'visa on arrival') return 'varista';
    if (value === 'e-visa') return 'evize';
    if (value === 'visa required') return 'vize';
    return null;
}

function parseVisaCsvToMatrix(csvText, data) {
    const validIso3 = new Set(data.map(item => item.iso3));
    const lines = csvText.split(/\r?\n/).filter(Boolean);
    const matrix = {};

    lines.slice(1).forEach(line => {
        const parts = line.split(',');
        if (parts.length < 3) return;

        const passport = parts[0].trim();
        const destination = parts[1].trim();
        const requirement = parts[2].trim();

        if (!validIso3.has(passport) || !validIso3.has(destination)) return;
        if (passport === destination) return;

        const status = mapRequirementToStatus(requirement);
        if (!status) return;

        if (!matrix[passport]) matrix[passport] = {};
        matrix[passport][destination] = status;
    });

    return matrix;
}

function setDataQualityBadge(message, state) {
    const el = document.getElementById('data-quality-badge');
    if (!el) return;
    el.textContent = message;
    el.dataset.state = state || 'loading';
}

function evaluateDataQuality(data) {
    if (!visaMatrixByPassportIso3) {
        setDataQualityBadge('Veri doğrulama: canlı CSV alınamadı, yerel veri gösteriliyor.', 'warn');
        return;
    }

    let mismatchCount = 0;
    let checkedCount = 0;

    data.forEach(country => {
        const source = visaMatrixByPassportIso3[country.iso3];
        if (!source) return;
        checkedCount += 1;

        const counts = { vizesiz: 0, varista: 0, evize: 0, vize: 0 };
        Object.values(source).forEach(status => {
            if (counts[status] || counts[status] === 0) counts[status] += 1;
        });

        const same =
            counts.vizesiz === country.vizesiz &&
            counts.varista === country.varistaSiz &&
            counts.evize === country.evize &&
            counts.vize === country.vizeGerekli;

        if (!same) mismatchCount += 1;
    });

    if (checkedCount === 0) {
        setDataQualityBadge('Veri doğrulama: karşılaştırma yapılamadı.', 'warn');
        return;
    }

    if (mismatchCount === 0) {
        setDataQualityBadge(`Veri doğrulama: ${checkedCount} ülke için tam uyum.`, 'ok');
        return;
    }

    setDataQualityBadge(`Veri doğrulama: ${mismatchCount} ülkede CSV/data.js farkı var.`, 'warn');
}

async function preloadVisaDataset(data) {
    if (visaLoadState === 'loading' || visaLoadState === 'loaded') return;
    visaLoadState = 'loading';
    setMapDataStatus('Gercek vize verisi yukleniyor...', 'loading');

    try {
        const response = await fetch(VISA_CSV_URL, { cache: 'force-cache' });
        if (!response.ok) throw new Error('CSV indirilemedi: ' + response.status);

        const csvText = await response.text();
        visaMatrixByPassportIso3 = parseVisaCsvToMatrix(csvText, data);
        visaLoadState = 'loaded';
        setMapDataStatus('Gercek vize verisi aktif.', 'ok');
        evaluateDataQuality(data);
    } catch (err) {
        visaLoadState = 'error';
        console.warn('Vize veri seti yuklenemedi:', err);
        setMapDataStatus('Gercek vize verisi yuklenemedi. Haritada eksik alanlar olabilir.', 'warn');
        setDataQualityBadge('Veri doğrulama: canlı CSV alınamadı, yerel veri kullanılıyor.', 'error');
    }
}

function initMap(data) {
    buildIsoMap(data);
    map = L.map('world-map', {
        center: [30, 20], zoom: 2, minZoom: 2, maxZoom: 6,
        scrollWheelZoom: true, zoomControl: true
    });

    L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_nolabels/{z}/{x}/{y}{r}.png', {
        attribution: '&copy; OpenStreetMap &copy; CARTO',
        subdomains: 'abcd', maxZoom: 19
    }).addTo(map);

    fetch(GEOJSON_URL)
        .then(r => r.json())
        .then(geo => {
            geoData = geo;
            const selectedCode = document.getElementById('map-country-select')?.value || 'TR';
            updateMapForCountry(data, selectedCode);
            preloadVisaDataset(data).then(() => {
                const currentCode = document.getElementById('map-country-select')?.value || selectedCode;
                updateMapForCountry(data, currentCode);
            });
        })
        .catch(err => console.warn('GeoJSON yuklenemedi:', err));
}

function updateMapForCountry(data, countryCode) {
    if (!geoData) return;
    const country = data.find(d => d.kod === countryCode);
    if (!country) return;

    if (geoLayer) map.removeLayer(geoLayer);

    const selectedIso3 = country.iso3;
    const visaStatus = buildVisaStatusMap(data, country);

    geoLayer = L.geoJSON(geoData, {
        style: function(feature) {
            const iso3 = feature.properties['ISO3166-1-Alpha-3'];
            const status = visaStatus[iso3];
            let color = '#222', opacity = 0.5;

            if (iso3 === selectedIso3) { color = '#f5c518'; opacity = 1; }
            else if (status === 'vizesiz') { color = '#2ecc71'; opacity = 0.8; }
            else if (status === 'varista') { color = '#f39c12'; opacity = 0.8; }
            else if (status === 'evize') { color = '#3498db'; opacity = 0.8; }
            else if (status === 'vize') { color = '#e74c3c'; opacity = 0.7; }

            return { fillColor: color, weight: 1, opacity: 0.6, color: '#444', fillOpacity: opacity };
        },
        onEachFeature: function(feature, layer) {
            const iso3 = feature.properties['ISO3166-1-Alpha-3'];
            const name = feature.properties.name;
            const status = visaStatus[iso3];
            let statusText = 'Veri yok';
            if (iso3 === selectedIso3) statusText = 'Se\u00e7ilen \u00fclke';
            else if (status === 'vizesiz') statusText = 'Vizesiz giri\u015f';
            else if (status === 'varista') statusText = 'Var\u0131\u015fta vize';
            else if (status === 'evize') statusText = 'E-Vize';
            else if (status === 'vize') statusText = 'Vize gerekli';

            layer.bindTooltip('<strong>' + name + '</strong><br>' + statusText, {
                sticky: true, className: 'map-tooltip'
            });
        }
    }).addTo(map);
}

function buildVisaStatusMap(data, selectedCountry) {
    const statusMap = {};
    if (typeof VISA_MAP !== 'undefined' && VISA_MAP[selectedCountry.kod]) {
        const vm = VISA_MAP[selectedCountry.kod];
        data.forEach(d => {
            if (d.kod === selectedCountry.kod) return;
            if (vm.vizesiz && vm.vizesiz.includes(d.iso3)) statusMap[d.iso3] = 'vizesiz';
            else if (vm.varista && vm.varista.includes(d.iso3)) statusMap[d.iso3] = 'varista';
            else if (vm.evize && vm.evize.includes(d.iso3)) statusMap[d.iso3] = 'evize';
            else statusMap[d.iso3] = 'vize';
        });
        return statusMap;
    }

    const source = visaMatrixByPassportIso3?.[selectedCountry.iso3];
    if (!source) return statusMap;

    data.forEach(d => {
        if (d.kod === selectedCountry.kod) return;
        if (source[d.iso3]) statusMap[d.iso3] = source[d.iso3];
    });

    return statusMap;
}

function renderTurkeySpotlight(tr) {
    if (!tr) return;
    const statsEl = document.getElementById('turkey-stats');
    const total = tr.vizesiz + tr.varistaSiz + tr.evize;
    statsEl.innerHTML = `
        <div class="spotlight-stat-item"><span class="label">Pasaport G\u00fcc\u00fc</span><span class="value">${tr.puan}</span></div>
        <div class="spotlight-stat-item"><span class="label">D\u00fcnya S\u0131ras\u0131</span><span class="value">#${tr.sira}</span></div>
        <div class="spotlight-stat-item"><span class="label">Vizesiz Giri\u015f</span><span class="value">${tr.vizesiz} \u00fclke</span></div>
        <div class="spotlight-stat-item"><span class="label">Var\u0131\u015fta Vize</span><span class="value">${tr.varistaSiz} \u00fclke</span></div>
        <div class="spotlight-stat-item"><span class="label">E-Vize</span><span class="value">${tr.evize} \u00fclke</span></div>
        <div class="spotlight-stat-item"><span class="label">Vize Gerekli</span><span class="value">${tr.vizeGerekli} \u00fclke</span></div>
        <div class="spotlight-stat-item"><span class="label">Toplam Eri\u015fim</span><span class="value">${total} \u00fclke</span></div>
        <div class="spotlight-stat-item"><span class="label">N\u00fcfus</span><span class="value">${tr.nufus}</span></div>
    `;

    const ctx = document.getElementById('turkey-chart');
    if (ctx && typeof Chart !== 'undefined') {
        new Chart(ctx, {
            type: 'line',
            data: {
                labels: TURKIYE_GECMIS.map(d => d.yil),
                datasets: [{
                    label: 'Pasaport G\u00fcc\u00fc',
                    data: TURKIYE_GECMIS.map(d => d.puan),
                    borderColor: '#f5c518',
                    backgroundColor: 'rgba(245,197,24,0.1)',
                    fill: true, tension: 0.4,
                    pointBackgroundColor: '#f5c518',
                    pointRadius: 5, pointHoverRadius: 8
                }]
            },
            options: {
                responsive: true, maintainAspectRatio: false,
                plugins: {
                    legend: { display: false },
                    tooltip: { backgroundColor: '#1a1a2e', titleColor: '#f5c518', bodyColor: '#fff', borderColor: 'rgba(245,197,24,0.3)', borderWidth: 1 }
                },
                scales: {
                    x: { ticks: { color: '#888' }, grid: { color: 'rgba(255,255,255,0.05)' } },
                    y: { ticks: { color: '#888' }, grid: { color: 'rgba(255,255,255,0.05)' }, min: 60 }
                }
            }
        });
    }
}

function initEventListeners(data) {
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            renderPassportGrid(data, btn.dataset.filter);
        });
    });

    document.getElementById('compare-select-1')?.addEventListener('change', e => {
        const c = data.find(d => d.kod === e.target.value);
        renderCompare('compare-result-1', c);
    });
    document.getElementById('compare-select-2')?.addEventListener('change', e => {
        const c = data.find(d => d.kod === e.target.value);
        renderCompare('compare-result-2', c);
    });

    document.getElementById('compare-search')?.addEventListener('input', e => {
        compareFilterState.search = e.target.value || '';
        applyCompareFilters(data);
    });

    document.getElementById('compare-region')?.addEventListener('change', e => {
        compareFilterState.region = e.target.value || 'all';
        applyCompareFilters(data);
    });

    document.getElementById('compare-sort')?.addEventListener('change', e => {
        compareFilterState.sort = e.target.value || 'rank';
        applyCompareFilters(data);
    });

    document.getElementById('compare-quick-best')?.addEventListener('click', () => {
        const sorted = sortCompareData(data, 'access-desc');
        if (!sorted[0]) return;
        compareFilterState.search = '';
        compareFilterState.region = 'all';
        applyCompareFilters(data);
        const searchEl = document.getElementById('compare-search');
        const regionEl = document.getElementById('compare-region');
        if (searchEl) searchEl.value = '';
        if (regionEl) regionEl.value = 'all';
        const left = document.getElementById('compare-select-1');
        if (left) left.value = sorted[0].kod;
        renderCompare('compare-result-1', sorted[0]);
    });

    document.getElementById('compare-quick-worst')?.addEventListener('click', () => {
        const sorted = sortCompareData(data, 'access-asc');
        if (!sorted[0]) return;
        compareFilterState.search = '';
        compareFilterState.region = 'all';
        applyCompareFilters(data);
        const searchEl = document.getElementById('compare-search');
        const regionEl = document.getElementById('compare-region');
        if (searchEl) searchEl.value = '';
        if (regionEl) regionEl.value = 'all';
        const right = document.getElementById('compare-select-2');
        if (right) right.value = sorted[0].kod;
        renderCompare('compare-result-2', sorted[0]);
    });

    document.getElementById('map-country-select')?.addEventListener('change', e => {
        const code = e.target.value;
        if (code && geoData) updateMapForCountry(data, code);
    });

    const searchInput = document.getElementById('ulke-ara');
    const searchBox = searchInput?.parentElement;
    if (searchInput && searchBox) {
        let resultsDiv = document.createElement('div');
        resultsDiv.className = 'search-results';
        searchBox.appendChild(resultsDiv);

        searchInput.addEventListener('input', e => {
            const q = normalizeText(e.target.value.trim());
            if (q.length < 2) { resultsDiv.classList.remove('active'); return; }
            const results = data.filter(d => normalizeText(d.ulke).includes(q)).slice(0, 8);
            if (results.length === 0) { resultsDiv.classList.remove('active'); return; }
            resultsDiv.innerHTML = results.map(d => `
                <div class="search-result-item" data-code="${d.kod}">
                    <span class="flag">${d.bayrak}</span> ${d.ulke}
                    <span style="color:#f5c518;margin-left:auto">${d.puan}</span>
                </div>
            `).join('');
            resultsDiv.classList.add('active');
        });

        resultsDiv.addEventListener('click', e => {
            const item = e.target.closest('.search-result-item');
            if (item) {
                const code = item.dataset.code;
                focusCountryForCompare(data, code);
                resultsDiv.classList.remove('active');
                searchInput.value = '';
            }
        });

        document.addEventListener('click', e => {
            if (!searchBox.contains(e.target)) resultsDiv.classList.remove('active');
        });
    }

    const menuBtn = document.querySelector('.mobile-menu-btn');
    const nav = document.querySelector('.main-nav');
    menuBtn?.addEventListener('click', () => {
        nav.classList.toggle('open');
        menuBtn.setAttribute('aria-expanded', nav.classList.contains('open'));
    });

    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', e => {
            e.preventDefault();
            const target = document.querySelector(link.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                nav?.classList.remove('open');
                document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
                link.classList.add('active');
            }
        });
    });

    document.getElementById('passport-grid')?.addEventListener('click', e => {
        if (e.target.closest('.country-detail-link')) return;
        const card = e.target.closest('.passport-card');
        if (card) {
            const code = card.dataset.code;
            focusCountryForCompare(data, code);
        }
    });

    document.getElementById('passport-grid')?.addEventListener('keydown', e => {
        if (e.key !== 'Enter' && e.key !== ' ') return;
        const card = e.target.closest('.passport-card');
        if (!card) return;
        e.preventDefault();
        focusCountryForCompare(data, card.dataset.code);
    });

    document.getElementById('ranking-body')?.addEventListener('click', e => {
        const row = e.target.closest('.ranking-row');
        if (!row) return;
        focusCountryForCompare(data, row.dataset.code);
    });

    document.getElementById('ranking-body')?.addEventListener('keydown', e => {
        if (e.key !== 'Enter' && e.key !== ' ') return;
        const row = e.target.closest('.ranking-row');
        if (!row) return;
        e.preventDefault();
        focusCountryForCompare(data, row.dataset.code);
    });

    window.addEventListener('scroll', () => {
        const header = document.getElementById('header');
        if (window.scrollY > 50) header.style.boxShadow = '0 4px 20px rgba(0,0,0,0.3)';
        else header.style.boxShadow = 'none';
    });
}
