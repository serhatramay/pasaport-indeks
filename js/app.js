// Pasaport Endeksi - Ana Uygulama
passport-index-tidy-iso3.csv';
const GEOJSON_URL = 'https://raw.githubusercontent.com/datasets/geo-countries/master/data/countries.geojson';
let map, geoLayer, geoData = null;

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

    renderPassportGrid(data, 'all');
    renderRankingTable(data);
    fillSelects(data);
    initMap(data);
    renderTurkeySpotlight(turkiye);
    initEventListeners(data);
});

function normalizeText(value) {
    return String(value || '')
        .toLowerCase()
        .replace(/ı/g, 'i')
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '');
}

function focusCountryForCompare(data, code) {
    const country = data.find(d => d.kod === code);
    if (!country) return;

    const select = document.getElementById('compare-select-1');
    if (select) select.value = code;
    renderCompare('compare-result-1', country);
    document.getElementById('karsilastir')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
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
        </article>
    `).join('');
}

function renderRankingTable(data) {
    const tbody = document.getElementById('ranking-body');
    tbody.innerHTML = data.map(d => `
        <tr>
            <td class="rank-col">${d.sira}</td>
            <td><div class="country-col"><span class="flag">${d.bayrak}</span> ${d.ulke}</div></td>
            <td class="visa-free">${d.vizesiz}</td>
            <td class="visa-arrival">${d.varistaSiz}</td>
            <td class="evisa">${d.evize}</td>
            <td class="visa-required">${d.vizeGerekli}</td>
            <td class="score-col">${d.puan}</td>
        </tr>
    `).join('');
}

function fillSelects(data) {
    const selects = ['compare-select-1', 'compare-select-2', 'map-country-select'];
    selects.forEach(id => {
        const el = document.getElementById(id);
        if (!el) return;
        data.forEach(d => {
            const opt = document.createElement('option');
            opt.value = d.kod;
            opt.textContent = d.bayrak + ' ' + d.ulke;
            el.appendChild(opt);
        });
    });
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
            updateMapForCountry(data, 'TR');
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

    const allCountries = [...data].filter(d => d.kod !== selectedCountry.kod);
    allCountries.sort((a, b) => b.puan - a.puan);
    let vizesizCount = selectedCountry.vizesiz;
    let varistaCount = selectedCountry.varistaSiz;
    let evizeCount = selectedCountry.evize;
    let idx = 0;

    allCountries.forEach(d => {
        if (idx < vizesizCount) statusMap[d.iso3] = 'vizesiz';
        else if (idx < vizesizCount + varistaCount) statusMap[d.iso3] = 'varista';
        else if (idx < vizesizCount + varistaCount + evizeCount) statusMap[d.iso3] = 'evize';
        else statusMap[d.iso3] = 'vize';
        idx++;
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

    window.addEventListener('scroll', () => {
        const header = document.getElementById('header');
        if (window.scrollY > 50) header.style.boxShadow = '0 4px 20px rgba(0,0,0,0.3)';
        else header.style.boxShadow = 'none';
    });
}
