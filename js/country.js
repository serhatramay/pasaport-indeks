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

function renderCountryStats(country) {
    const grid = document.getElementById('country-metric-grid');
    if (!grid || !country) return;

    const totalAccess = country.vizesiz + country.varistaSiz + country.evize;
    const metrics = [
        ['Dunya Sirasi', '#' + country.sira],
        ['Pasaport Gucu', String(country.puan)],
        ['Toplam Erisim', totalAccess + ' ulke'],
        ['Nufus', country.nufus]
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

function setCountryMeta(country) {
    if (!country) return;
    const title = `${country.ulke} Pasaportu | Pasaport Endeksi`;
    document.title = title;

    const heading = document.getElementById('country-title');
    const subtitle = document.getElementById('country-subtitle');
    if (heading) heading.textContent = `${country.bayrak} ${country.ulke}`;
    if (subtitle) subtitle.textContent = `${country.ulke} pasaportunun vize dagilimi ve guc metrikleri.`;
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
    renderCountryStats(country);
    renderVisaBars(country);
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
