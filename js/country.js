let visaChart = null;

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
    if (country.puan >= 170) return 'Elite Mobilite';
    if (country.puan >= 140) return 'Yuksek Mobilite';
    if (country.puan >= 100) return 'Gelisen Mobilite';
    return 'Sinirli Mobilite';
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
    if (subtitle) subtitle.textContent = `${country.ulke} pasaportunun global erisim gucu, vize dagilimi ve seyahat profili.`;
    if (flag) flag.textContent = country.bayrak;
    if (passportCountry) passportCountry.textContent = country.ulke.toUpperCase();
    if (passportCode) passportCode.textContent = country.kod;
}

function renderHeroBadges(country) {
    const badges = document.getElementById('hero-badges');
    if (!badges || !country) return;

    const percentile = getRankPercentile(country);
    const tier = getMobilityTier(country);
    const totalAccess = country.vizesiz + country.varistaSiz + country.evize;

    const items = [
        `Dunya #${country.sira}`,
        `Guc ${country.puan}`,
        `%${percentile} dilimde`,
        `${totalAccess} ulke erisim`,
        tier
    ];

    badges.innerHTML = items.map(item => `<span class="hero-badge">${item}</span>`).join('');
}

function renderCountryStats(country) {
    const grid = document.getElementById('country-metric-grid');
    if (!grid || !country) return;

    const totalAccess = country.vizesiz + country.varistaSiz + country.evize;
    const metrics = [
        ['Dunya Sirasi', '#' + country.sira],
        ['Pasaport Gucu', String(country.puan)],
        ['Toplam Erisim', totalAccess + ' ulke'],
        ['Vize Gerekli', country.vizeGerekli + ' ulke'],
        ['Nufus', formatNumberTr(country.nufus)],
        ['Mobilite Segmenti', getMobilityTier(country)]
    ];

    grid.innerHTML = metrics.map(([label, value]) => `
        <article class="country-metric-card">
            <span class="label">${label}</span>
            <span class="value">${value}</span>
        </article>
    `).join('');
}

function renderVisaBars(country) {
    const bars = document.getElementById('visa-bars');
    if (!bars || !country) return;

    const total = country.vizesiz + country.varistaSiz + country.evize + country.vizeGerekli;
    const items = [
        ['Vizesiz', country.vizesiz, '#2ecc71'],
        ['Varista Vize', country.varistaSiz, '#f39c12'],
        ['E-Vize', country.evize, '#3498db'],
        ['Vize Gerekli', country.vizeGerekli, '#e74c3c']
    ];

    bars.innerHTML = items.map(([label, value, color]) => {
        const pct = total ? Math.round((value / total) * 100) : 0;
        return `
            <div class="visa-bar-row">
                <div class="visa-bar-head">
                    <span>${label}</span>
                    <span>${value} (${pct}%)</span>
                </div>
                <div class="visa-bar-track">
                    <div class="visa-bar-fill" style="width:${pct}%;background:${color}"></div>
                </div>
            </div>
        `;
    }).join('');
}

function renderTravelSnapshot(country) {
    const el = document.getElementById('travel-snapshot');
    if (!el || !country) return;

    const total = country.vizesiz + country.varistaSiz + country.evize + country.vizeGerekli;
    const easyTravel = country.vizesiz + country.varistaSiz;
    const easyPct = total ? Math.round((easyTravel / total) * 100) : 0;
    const digitalPct = total ? Math.round((country.evize / total) * 100) : 0;
    const restrictionPct = total ? Math.round((country.vizeGerekli / total) * 100) : 0;

    el.innerHTML = `
        <div class="snapshot-item">
            <span class="label">Kolay Erisim</span>
            <span class="value">%${easyPct}</span>
            <small>Vizesiz + varista vize</small>
        </div>
        <div class="snapshot-item">
            <span class="label">Dijital Erişim</span>
            <span class="value">%${digitalPct}</span>
            <small>E-vize kanal payi</small>
        </div>
        <div class="snapshot-item">
            <span class="label">Kisitli Alan</span>
            <span class="value">%${restrictionPct}</span>
            <small>Vize gerekli ulkeler</small>
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

    visaChart = new Chart(canvas, {
        type: 'doughnut',
        data: {
            labels: ['Vizesiz', 'Varista', 'E-Vize', 'Vize Gerekli'],
            datasets: [{
                data: [country.vizesiz, country.varistaSiz, country.evize, country.vizeGerekli],
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
            cutout: '58%'
        }
    });
}

function fillCountrySelect(selectedCode) {
    const select = document.getElementById('country-select');
    if (!select) return;

    const sorted = [...PASAPORT_DATA].sort((a, b) => a.ulke.localeCompare(b.ulke, 'tr'));
    select.innerHTML = '<option value="">Seciniz</option>' + sorted.map(item => `
        <option value="${item.kod}">${item.bayrak} ${item.ulke}</option>
    `).join('');

    if (selectedCode) select.value = selectedCode;
}

function renderCountryPage(country) {
    if (!country) return;
    setCountryMeta(country);
    renderHeroBadges(country);
    renderCountryStats(country);
    renderTravelSnapshot(country);
    renderVisaBars(country);
    renderVisaChart(country);
}

document.addEventListener('DOMContentLoaded', () => {
    const fallback = PASAPORT_DATA[0];
    const code = parseCountryCodeFromUrl();
    const country = getCountryByCode(code) || fallback;

    fillCountrySelect(country.kod);
    updateUrl(country.kod);
    renderCountryPage(country);

    document.getElementById('country-select')?.addEventListener('change', e => {
        const next = getCountryByCode(e.target.value);
        if (!next) return;
        updateUrl(next.kod);
        renderCountryPage(next);
    });
});
