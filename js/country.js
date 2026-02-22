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

const COUNTRY_NAME_OVERRIDES = {
    TR: 'Türkiye',
    ES: 'İspanya',
    IT: 'İtalya',
    SE: 'İsveç',
    CH: 'İsviçre',
    IE: 'İrlanda',
    IL: 'İsrail',
    CN: 'Çin',
    CZ: 'Çekya',
    BE: 'Belçika',
    NO: 'Norveç',
    GE: 'Gürcistan',
    UZ: 'Özbekistan',
    GB: 'Birleşik Krallık',
    CI: 'Fildişi Sahili',
    EG: 'Mısır',
    KR: 'Güney Kore',
    ZA: 'Güney Afrika',
    SS: 'Güney Sudan'
};

const POPULAR_FOODS_BY_CODE = {
    TR: ['Kebap', 'Mantı', 'Baklava'],
    ES: ['Tapas', 'Paella', 'Tortilla'],
    IT: ['Pizza', 'Pasta', 'Risotto'],
    FR: ['Croissant', 'Ratatouille', 'Crème brûlée'],
    DE: ['Bratwurst', 'Pretzel', 'Schnitzel'],
    GB: ['Fish & Chips', 'Sunday Roast', 'Pie'],
    US: ['Burger', 'Barbekü', 'Pancake'],
    JP: ['Sushi', 'Ramen', 'Tempura'],
    KR: ['Kimchi', 'Bibimbap', 'Bulgogi'],
    CN: ['Dumpling', 'Pekin ördeği', 'Noodle'],
    IN: ['Biryani', 'Curry', 'Naan'],
    TH: ['Pad Thai', 'Tom Yum', 'Som Tam'],
    GR: ['Moussaka', 'Souvlaki', 'Tzatziki'],
    PT: ['Bacalhau', 'Caldo Verde', 'Pastel de Nata'],
    NL: ['Stroopwafel', 'Bitterballen', 'Haring'],
    CH: ['Fondü', 'Röşti', 'Çikolata']
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
let visaListVisibleCount = 80;
let plannerOriginCode = '';
let plannerDestinationCode = '';
let plannerDestinationCity = '';
let budgetDestinationCode = '';
let budgetOriginCode = '';
let budgetFromCurrency = '';
let budgetToCurrency = '';
let budgetAmount = 2000;
let budgetDays = 5;
let fxRatesMap = null;
let fxRatesUpdatedAt = '';
let fxRatesSource = 'fallback';
let fxRatesLoading = false;

const COUNTRY_BY_ISO3 = {};
PASAPORT_DATA.forEach(item => {
    COUNTRY_BY_ISO3[item.iso3] = item;
});
const VALID_ISO3 = new Set(PASAPORT_DATA.map(item => item.iso3));
const FX_FALLBACK_RATES_USD = {
    USD: 1,
    EUR: 0.92,
    TRY: 36.4,
    GBP: 0.78,
    CHF: 0.88,
    AED: 3.67,
    SAR: 3.75,
    CAD: 1.35,
    AUD: 1.52,
    NZD: 1.66,
    JPY: 151.0,
    CNY: 7.2,
    KRW: 1330,
    SGD: 1.35,
    INR: 83.0,
    THB: 35.8,
    MYR: 4.7,
    RUB: 92.0,
    BRL: 5.0,
    MXN: 17.0,
    ZAR: 18.7
};

const DEFAULT_CURRENCY_BY_COUNTRY = {
    TR: 'TRY', DE: 'EUR', FR: 'EUR', IT: 'EUR', ES: 'EUR', PT: 'EUR', NL: 'EUR', BE: 'EUR', AT: 'EUR', FI: 'EUR', IE: 'EUR', GR: 'EUR',
    US: 'USD', CA: 'CAD', AU: 'AUD', NZ: 'NZD', JP: 'JPY', KR: 'KRW', CN: 'CNY', IN: 'INR', SG: 'SGD', TH: 'THB', MY: 'MYR',
    AE: 'AED', SA: 'SAR', CH: 'CHF', GB: 'GBP', BR: 'BRL', MX: 'MXN', ZA: 'ZAR', RU: 'RUB'
};

const DAILY_COST_USD = {
    high: { accommodation: 140, food: 60, transport: 30, misc: 35 },
    midHigh: { accommodation: 95, food: 42, transport: 22, misc: 24 },
    mid: { accommodation: 65, food: 28, transport: 14, misc: 18 },
    low: { accommodation: 38, food: 16, transport: 8, misc: 10 }
};

function getCountryByCode(code) {
    if (!code) return null;
    return PASAPORT_DATA.find(item => item.kod === code.toUpperCase()) || null;
}

function slugifyCountryName(value) {
    const table = { 'ç': 'c', 'ğ': 'g', 'ı': 'i', 'ö': 'o', 'ş': 's', 'ü': 'u', 'â': 'a', 'î': 'i', 'û': 'u' };
    return String(value || '')
        .toLowerCase()
        .replace(/[çğıöşüâîû]/g, ch => table[ch] || ch)
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/-+/g, '-')
        .replace(/^-|-$/g, '') || 'ulke';
}

function getCountrySlugByCode(code) {
    const country = getCountryByCode(code);
    return country ? slugifyCountryName(country.ulke) : '';
}

function getSiteBasePath() {
    const marker = '/pasaport-indeks/';
    const path = window.location.pathname || '/';
    const idx = path.indexOf(marker);
    if (idx >= 0) return path.slice(0, idx + marker.length);
    return '/';
}

function getCleanCountryPath(code) {
    const slug = getCountrySlugByCode(code);
    if (!slug) return 'ulke.html?code=' + encodeURIComponent(String(code || '').toUpperCase());
    return `ulke/${slug}/`;
}

function findCountryBySlug(slug) {
    const normalized = String(slug || '').toLowerCase();
    return PASAPORT_DATA.find(item => slugifyCountryName(item.ulke) === normalized) || null;
}

function parseCountryCodeFromUrl() {
    const bodyCode = document.body?.dataset?.countryCode;
    if (bodyCode) return String(bodyCode).toUpperCase();

    const pathMatch = window.location.pathname.match(/\/ulke\/([^\/?#]+)\/?$/i);
    if (pathMatch && pathMatch[1]) {
        const bySlug = findCountryBySlug(decodeURIComponent(pathMatch[1]));
        if (bySlug) return bySlug.kod;
    }

    const params = new URLSearchParams(window.location.search);
    return (params.get('code') || '').toUpperCase();
}

function updateUrl(code) {
    const cleanPath = getCleanCountryPath(code);
    if (cleanPath.startsWith('ulke/')) {
        const next = `${window.location.origin}${getSiteBasePath()}${cleanPath}`;
        window.history.replaceState({}, '', next);
        return;
    }
    const url = new URL(window.location.href);
    url.searchParams.set('code', code);
    window.history.replaceState({}, '', url.toString());
}

function getCanonicalCountryUrl(code) {
    const cleanPath = getCleanCountryPath(code);
    if (cleanPath.startsWith('ulke/')) {
        return `https://serhatramay.github.io/pasaport-indeks/${cleanPath}`;
    }
    const value = String(code || '').toUpperCase();
    return `https://serhatramay.github.io/pasaport-indeks/ulke.html?code=${encodeURIComponent(value)}`;
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

function normalizeCountryNameTr(value) {
    let output = String(value || '');
    const replacements = [
        ['Birlesik Krallik', 'Birleşik Krallık'],
        ['Fildisi Sahili', 'Fildişi Sahili'],
        ['Turkiye', 'Türkiye'],
        ['Ispanya', 'İspanya'],
        ['Italya', 'İtalya'],
        ['Isvec', 'İsveç'],
        ['Isvicre', 'İsviçre'],
        ['Irlanda', 'İrlanda'],
        ['Israil', 'İsrail'],
        ['Cekya', 'Çekya'],
        ['Belcika', 'Belçika'],
        ['Norvec', 'Norveç'],
        ['Gurcistan', 'Gürcistan'],
        ['Ozbekistan', 'Özbekistan'],
        ['Misir', 'Mısır'],
        ['Guney', 'Güney'],
        ['Cin', 'Çin']
    ];
    replacements.forEach(([from, to]) => {
        output = output.replaceAll(from, to);
    });
    return output;
}

function getCountryDisplayName(country) {
    if (!country) return '';
    const code = String(country.kod || '').toUpperCase();
    if (COUNTRY_NAME_OVERRIDES[code]) return COUNTRY_NAME_OVERRIDES[code];
    return normalizeCountryNameTr(country.ulke);
}

function getCountryFoodSummary(country) {
    const code = String(country?.kod || '').toUpperCase();
    const mapped = POPULAR_FOODS_BY_CODE[code];
    if (mapped?.length) return mapped.join(', ');

    const profile = typeof COUNTRY_PROFILES !== 'undefined' ? COUNTRY_PROFILES[code] : null;
    const raw = String(profile?.foodCulture || '').trim();
    if (!raw) return 'Yerel mutfak öne çıkıyor.';

    const firstSentence = raw.split('.').map(s => s.trim()).filter(Boolean)[0] || raw;
    const chunks = firstSentence.split(',').map(s => s.trim()).filter(Boolean);
    if (chunks.length >= 2) return chunks.slice(0, 3).join(', ');
    return firstSentence;
}

function getCountryCurrencySummary(country) {
    const code = String(country?.kod || '').toUpperCase();
    const profile = typeof COUNTRY_PROFILES !== 'undefined' ? COUNTRY_PROFILES[code] : null;
    const fromFields = String(profile?.fields?.currency?.value || '').trim();
    if (fromFields) return fromFields;

    const fromProfile = String(profile?.currency || '').trim();
    if (fromProfile) return fromProfile;

    const currencyCode = getCountryCurrencyCode(country);
    return currencyCode || 'Resmi para birimi bilgisi güncelleniyor';
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
        if (iso3 === country.iso3) return;
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
        if (!VALID_ISO3.has(passport)) return;
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

function detectUserPreferredCurrency() {
    const lang = (navigator.language || '').toLowerCase();
    if (lang.startsWith('tr')) return 'TRY';
    return 'USD';
}

function extractCurrencyCodeFromText(text) {
    const match = String(text || '').toUpperCase().match(/\b[A-Z]{3}\b/);
    return match ? match[0] : '';
}

function normalizeCurrencyCode(code) {
    const value = String(code || '').toUpperCase().trim();
    return /^[A-Z]{3}$/.test(value) ? value : '';
}

function getCurrencyCodeFromMeta(kod) {
    const meta = countryMetaByIso2?.[String(kod || '').toUpperCase()];
    if (!meta) return '';

    const tryCode = value => normalizeCurrencyCode(value);
    if (meta.currency) return tryCode(meta.currency);
    if (Array.isArray(meta.currencies) && meta.currencies.length) {
        const first = meta.currencies[0];
        if (typeof first === 'string') return tryCode(first);
        if (first?.code) return tryCode(first.code);
    }
    if (meta.currencies && typeof meta.currencies === 'object') {
        const keys = Object.keys(meta.currencies);
        if (keys.length) return tryCode(keys[0]);
    }
    return '';
}

function getCurrencyCodeForCountry(kod) {
    const code = String(kod || '').toUpperCase();
    const profile = typeof COUNTRY_PROFILES !== 'undefined' ? COUNTRY_PROFILES[code] : null;
    const fromField = extractCurrencyCodeFromText(profile?.fields?.currency?.value);
    if (fromField) return fromField;
    const fromProfile = extractCurrencyCodeFromText(profile?.currency);
    if (fromProfile) return fromProfile;
    const fromMeta = getCurrencyCodeFromMeta(code);
    if (fromMeta) return fromMeta;
    return DEFAULT_CURRENCY_BY_COUNTRY[code] || 'USD';
}

function getAvailableCurrencies() {
    const set = new Set(['USD', 'EUR', 'TRY']);
    PASAPORT_DATA.forEach(item => {
        const code = getCurrencyCodeForCountry(item.kod);
        if (code) set.add(code);
    });
    return [...set].sort((a, b) => a.localeCompare(b));
}

async function preloadExchangeRates() {
    if (fxRatesMap || fxRatesLoading) return;
    fxRatesLoading = true;
    try {
        const response = await fetch('https://open.er-api.com/v6/latest/USD', { cache: 'no-store' });
        if (!response.ok) throw new Error('Kur servisi yanıt vermedi: ' + response.status);
        const payload = await response.json();
        if (!payload?.rates || typeof payload.rates !== 'object') throw new Error('Kur verisi eksik');
        fxRatesMap = payload.rates;
        fxRatesUpdatedAt = payload.time_last_update_utc || new Date().toISOString();
        fxRatesSource = 'live';
    } catch (err) {
        fxRatesMap = { ...FX_FALLBACK_RATES_USD };
        fxRatesUpdatedAt = 'fallback';
        fxRatesSource = 'fallback';
        console.warn('Canlı kur verisi alınamadı, fallback kullanılıyor:', err);
    } finally {
        fxRatesLoading = false;
    }
}

function convertByUsdBase(amount, fromCode, toCode) {
    const rates = fxRatesMap || FX_FALLBACK_RATES_USD;
    const fromRate = rates[fromCode];
    const toRate = rates[toCode];
    if (!fromRate || !toRate) return null;
    const usd = amount / fromRate;
    return usd * toRate;
}

function formatMoney(value, currency) {
    const safe = Number(value || 0);
    try {
        return new Intl.NumberFormat('tr-TR', {
            style: 'currency',
            currency: currency || 'USD',
            maximumFractionDigits: safe > 1000 ? 0 : 2
        }).format(safe);
    } catch (_) {
        return `${safe.toFixed(2)} ${currency || ''}`.trim();
    }
}

function getDailyCostTier(kod) {
    const code = String(kod || '').toUpperCase();
    if (['CH', 'NO', 'SG', 'AE', 'US', 'GB'].includes(code)) return 'high';
    if (['DE', 'FR', 'NL', 'AT', 'AU', 'CA', 'JP', 'KR', 'IT', 'ES'].includes(code)) return 'midHigh';
    if (['TR', 'BR', 'MX', 'TH', 'MY', 'CN', 'PT', 'GR', 'PL'].includes(code)) return 'mid';
    if (['IN', 'PK', 'BD', 'NP', 'KE', 'UG', 'TZ', 'EG', 'MA', 'VN'].includes(code)) return 'low';

    const continent = getCountryContinentCode(code);
    if (continent === 'EU' || continent === 'NA' || continent === 'OC') return 'midHigh';
    if (continent === 'AS' || continent === 'SA') return 'mid';
    if (continent === 'AF') return 'low';
    return 'mid';
}

function ensureBudgetPlannerDom() {
    if (document.getElementById('budget-planner-section')) return;
    const main = document.querySelector('.country-page');
    if (!main) return;

    const section = document.createElement('section');
    section.className = 'budget-planner';
    section.id = 'budget-planner-section';
    section.innerHTML = `
        <div class="container">
            <div class="budget-head">
                <h2>Bütçe ve Para Birimi Çevirici</h2>
                <p>Kaynak ülke, hedef ülke ve tutar seçin. Günlük tahmini masrafı ve yaklaşık kur karşılığını görün.</p>
            </div>
            <div class="budget-grid">
                <div class="budget-field">
                    <label for="budget-origin-country">Bulunduğum Ülke</label>
                    <select id="budget-origin-country" aria-label="Bulunduğum ülke"></select>
                </div>
                <div class="budget-field">
                    <label for="budget-amount">Tutar</label>
                    <input id="budget-amount" type="number" min="0" step="1" value="2000" aria-label="Tutar">
                </div>
                <div class="budget-field">
                    <label for="budget-from-currency">Kaynak Para</label>
                    <select id="budget-from-currency" aria-label="Kaynak para birimi"></select>
                </div>
                <div class="budget-field">
                    <label for="budget-destination-country">Hedef Ülke</label>
                    <select id="budget-destination-country" aria-label="Hedef ülke"></select>
                </div>
                <div class="budget-field">
                    <label>Hedef Para Birimi</label>
                    <div class="budget-target-currency" id="budget-target-currency">-</div>
                </div>
                <div class="budget-field">
                    <label for="budget-days">Seyahat Günü</label>
                    <input id="budget-days" type="number" min="1" max="60" step="1" value="5" aria-label="Seyahat günü">
                </div>
                <div class="budget-field budget-action">
                    <button type="button" class="mini-btn" id="budget-refresh">Kuru Yenile</button>
                </div>
            </div>
            <article class="budget-result" id="budget-result" aria-live="polite">
                <h3>Bütçe Özeti</h3>
                <p>Hedef ülke ve tutar seçin.</p>
            </article>
        </div>
    `;

    const metricsSection = document.querySelector('.country-metrics');
    const visaBreakdownSection = document.getElementById('country-visa-breakdown');

    if (metricsSection && metricsSection.parentNode === main) {
        if (metricsSection.nextSibling) main.insertBefore(section, metricsSection.nextSibling);
        else main.appendChild(section);
    } else if (visaBreakdownSection && visaBreakdownSection.parentNode === main) {
        main.insertBefore(section, visaBreakdownSection);
    } else {
        main.appendChild(section);
    }
}

function getBudgetPlannerGridHtml() {
    return `
        <div class="budget-field">
            <label for="budget-origin-country">Bulunduğum Ülke</label>
            <select id="budget-origin-country" aria-label="Bulunduğum ülke"></select>
        </div>
        <div class="budget-field">
            <label for="budget-amount">Tutar</label>
            <input id="budget-amount" type="number" min="0" step="1" value="2000" aria-label="Tutar">
        </div>
        <div class="budget-field">
            <label for="budget-from-currency">Kaynak Para</label>
            <select id="budget-from-currency" aria-label="Kaynak para birimi"></select>
        </div>
        <div class="budget-field">
            <label for="budget-destination-country">Hedef Ülke</label>
            <select id="budget-destination-country" aria-label="Hedef ülke"></select>
        </div>
        <div class="budget-field">
            <label>Hedef Para Birimi</label>
            <div class="budget-target-currency" id="budget-target-currency">-</div>
        </div>
        <div class="budget-field">
            <label for="budget-days">Seyahat Günü</label>
            <input id="budget-days" type="number" min="1" max="60" step="1" value="5" aria-label="Seyahat günü">
        </div>
        <div class="budget-field budget-action">
            <button type="button" class="mini-btn" id="budget-refresh">Kuru Yenile</button>
        </div>
    `;
}

function renderBudgetPlanner(country) {
    ensureBudgetPlannerDom();

    const budgetSection = document.getElementById('budget-planner-section');
    const budgetGrid = budgetSection?.querySelector('.budget-grid');
    if (budgetGrid) {
        // Eski DOM/cached yerleşim kalsa bile her seferinde doğru alan sırasını zorla.
        budgetGrid.innerHTML = getBudgetPlannerGridHtml();
    }

    const originSelect = document.getElementById('budget-origin-country');
    const destinationSelect = document.getElementById('budget-destination-country');
    const fromSelect = document.getElementById('budget-from-currency');
    const targetCurrencyEl = document.getElementById('budget-target-currency');
    const amountInput = document.getElementById('budget-amount');
    const daysInput = document.getElementById('budget-days');
    if (!originSelect || !destinationSelect || !fromSelect || !targetCurrencyEl || !amountInput || !daysInput) return;

    const countries = [...PASAPORT_DATA].sort((a, b) => a.ulke.localeCompare(b.ulke, 'tr'));
    const countryOptions = countries.map(item => `
        <option value="${item.kod}">${item.bayrak} ${item.ulke} (${getCurrencyCodeForCountry(item.kod)})</option>
    `).join('');
    originSelect.innerHTML = countryOptions;
    destinationSelect.innerHTML = countryOptions;

    const currencies = getAvailableCurrencies();
    const currencyOptions = currencies.map(code => `<option value="${code}">${code}</option>`).join('');
    fromSelect.innerHTML = currencyOptions;

    if (!budgetOriginCode) budgetOriginCode = country.kod;
    if (!budgetDestinationCode) budgetDestinationCode = country.kod;
    if (!budgetFromCurrency) {
        const preferred = detectUserPreferredCurrency();
        budgetFromCurrency = preferred === 'TRY' ? 'TRY' : getCurrencyCodeForCountry(budgetOriginCode);
    }
    budgetToCurrency = getCurrencyCodeForCountry(budgetDestinationCode);

    originSelect.value = budgetOriginCode;
    destinationSelect.value = budgetDestinationCode;
    fromSelect.value = currencies.includes(budgetFromCurrency) ? budgetFromCurrency : 'USD';
    targetCurrencyEl.textContent = `${budgetToCurrency} (Hedef ülke para birimi)`;
    amountInput.value = String(budgetAmount);
    daysInput.value = String(budgetDays);
}

async function renderBudgetOutput() {
    const result = document.getElementById('budget-result');
    if (!result) return;
    const destination = getCountryByCode(budgetDestinationCode);
    if (!destination) {
        result.innerHTML = '<h3>Bütçe Özeti</h3><p>Hedef ülke seçin.</p>';
        return;
    }

    await preloadExchangeRates();

    const from = normalizeCurrencyCode(budgetFromCurrency) || 'USD';
    const to = normalizeCurrencyCode(budgetToCurrency) || getCurrencyCodeForCountry(destination.kod);
    const amount = Math.max(0, Number(budgetAmount || 0));
    const days = Math.max(1, Number(budgetDays || 1));

    const converted = convertByUsdBase(amount, from, to);
    if (converted == null) {
        result.innerHTML = '<h3>Bütçe Özeti</h3><p>Kur dönüşümü şu an yapılamadı. Lütfen para birimlerini değiştirin.</p>';
        return;
    }

    const tier = getDailyCostTier(destination.kod);
    const model = DAILY_COST_USD[tier];
    const dailyUsd = model.accommodation + model.food + model.transport + model.misc;
    const totalUsd = dailyUsd * days;
    const totalLocal = convertByUsdBase(totalUsd, 'USD', to);
    const dailyLocal = convertByUsdBase(dailyUsd, 'USD', to);
    const note = fxRatesSource === 'live'
        ? 'Kur kaynağı: canlı'
        : 'Kur kaynağı: fallback (yaklaşık)';

    result.innerHTML = `
        <h3>${destination.bayrak} ${destination.ulke} için Bütçe Özeti</h3>
        <p><strong>${formatMoney(amount, from)}</strong> ≈ <strong>${formatMoney(converted, to)}</strong></p>
        <div class="budget-kpis">
            <div><span>Günlük Tahmini</span><strong>${formatMoney(dailyLocal, to)}</strong></div>
            <div><span>${days} Gün Tahmini</span><strong>${formatMoney(totalLocal, to)}</strong></div>
            <div><span>Yaklaşık USD</span><strong>${formatMoney(totalUsd, 'USD')}</strong></div>
        </div>
        <ul class="budget-breakdown">
            <li>Konaklama: ${formatMoney(convertByUsdBase(model.accommodation, 'USD', to), to)} / gün</li>
            <li>Yeme-içme: ${formatMoney(convertByUsdBase(model.food, 'USD', to), to)} / gün</li>
            <li>Ulaşım: ${formatMoney(convertByUsdBase(model.transport, 'USD', to), to)} / gün</li>
            <li>Diğer: ${formatMoney(convertByUsdBase(model.misc, 'USD', to), to)} / gün</li>
        </ul>
        <p class="budget-note">${note}. Son güncelleme: ${fxRatesUpdatedAt || '-'}</p>
    `;
}

function setCountryMeta(country) {
    if (!country) return;
    const countryName = getCountryDisplayName(country);
    const pageTitle = `${countryName} Pasaport, Vize ve Yaşam Rehberi 2026 | Pasaport Endeksi`;
    const pageDescription = `${countryName} için pasaport gücü, vize dağılımı, yaşam maliyeti, asgari ücret, uçuş ve seyahat planlama rehberi.`;
    const pageKeywords = `${countryName} pasaport, ${countryName} vize, ${countryName} yaşam maliyeti, ${countryName} asgari ücret, ${countryName} nasıl gidilir, ${countryName} uçak bileti`;
    const canonicalUrl = getCanonicalCountryUrl(country.kod);

    document.title = pageTitle;
    const descriptionMeta = document.querySelector('meta[name="description"]');
    if (descriptionMeta) descriptionMeta.setAttribute('content', pageDescription);
    const keywordsMeta = document.querySelector('meta[name="keywords"]');
    if (keywordsMeta) keywordsMeta.setAttribute('content', pageKeywords);

    const canonicalLink = document.getElementById('canonical-link');
    if (canonicalLink) canonicalLink.setAttribute('href', canonicalUrl);
    const ogUrl = document.getElementById('og-url');
    if (ogUrl) ogUrl.setAttribute('content', canonicalUrl);
    const ogTitle = document.getElementById('og-title');
    if (ogTitle) ogTitle.setAttribute('content', pageTitle);
    const ogDescription = document.getElementById('og-description');
    if (ogDescription) ogDescription.setAttribute('content', pageDescription);
    const twitterTitle = document.getElementById('twitter-title');
    if (twitterTitle) twitterTitle.setAttribute('content', pageTitle);
    const twitterDescription = document.getElementById('twitter-description');
    if (twitterDescription) twitterDescription.setAttribute('content', pageDescription);

    const jsonldScript = document.getElementById('country-jsonld');
    if (jsonldScript) {
        const payload = {
            '@context': 'https://schema.org',
            '@type': 'WebPage',
            name: pageTitle,
            url: canonicalUrl,
            inLanguage: 'tr',
            about: {
                '@type': 'Place',
                name: countryName
            }
        };
        jsonldScript.textContent = JSON.stringify(payload);
    }

    const heading = document.getElementById('country-title');
    const subtitle = document.getElementById('country-subtitle');
    const flag = document.getElementById('passport-flag');
    const passportCountry = document.getElementById('passport-country');
    const passportPopulation = document.getElementById('passport-population');
    const passportCurrency = document.getElementById('passport-currency');
    const passportFoods = document.getElementById('passport-foods');
    const passportCode = document.getElementById('passport-code');
    const breadcrumbCountryLink = document.getElementById('breadcrumb-country-link');
    const breadcrumbContinentLink = document.getElementById('breadcrumb-continent-link');

    if (heading) heading.textContent = `${country.bayrak} ${countryName}`;
    if (subtitle) subtitle.textContent = `${countryName} pasaportunun global erişim gücü, vize dağılımı ve seyahat profili.`;
    if (flag) flag.textContent = country.bayrak;
    if (passportCountry) passportCountry.textContent = countryName.toLocaleUpperCase('tr-TR');
    if (passportPopulation) passportPopulation.textContent = formatNumberTr(country.nufus);
    if (passportCurrency) passportCurrency.textContent = getCountryCurrencySummary(country);
    if (passportFoods) passportFoods.textContent = getCountryFoodSummary(country);
    if (passportCode) passportCode.textContent = country.kod;
    if (breadcrumbCountryLink) {
        breadcrumbCountryLink.textContent = countryName;
        breadcrumbCountryLink.href = canonicalUrl;
    }
    const continentCode = getCountryContinentCode(country.kod);
    const continentLabel = CONTINENT_LABELS_TR[continentCode] || 'Bölge';
    if (breadcrumbContinentLink) {
        breadcrumbContinentLink.textContent = continentLabel;
        breadcrumbContinentLink.href = `./#siralama`;
    }

    const breadcrumbJsonldScript = document.getElementById('country-breadcrumb-jsonld');
    if (breadcrumbJsonldScript) {
        const payload = {
            '@context': 'https://schema.org',
            '@type': 'BreadcrumbList',
            itemListElement: [
                { '@type': 'ListItem', position: 1, name: 'Pasaport Endeksi', item: 'https://serhatramay.github.io/pasaport-indeks/' },
                { '@type': 'ListItem', position: 2, name: 'Ülkeler', item: 'https://serhatramay.github.io/pasaport-indeks/#siralama' },
                { '@type': 'ListItem', position: 3, name: continentLabel, item: 'https://serhatramay.github.io/pasaport-indeks/#siralama' },
                { '@type': 'ListItem', position: 4, name: countryName, item: canonicalUrl },
                { '@type': 'ListItem', position: 5, name: 'Vize Durumu', item: `${canonicalUrl}#country-visa-breakdown` }
            ]
        };
        breadcrumbJsonldScript.textContent = JSON.stringify(payload);
    }
}

function buildCountryFaqItems(country) {
    const countryName = getCountryDisplayName(country);
    const counts = getVisaCounts(country);
    const totalAccess = counts.vizesiz + counts.varista + counts.evize;
    const fastAccess = counts.vizesiz + counts.varista;

    return [
        {
            question: `${countryName} pasaportu ile toplam kaç ülkeye erişim var?`,
            answer: `${countryName} pasaportu ile toplam ${totalAccess} ülkeye erişim bulunur. Bu toplam, vizesiz + varışta vize + e-vize kategorilerinin toplamıdır.`
        },
        {
            question: `${countryName} pasaportu ile hızlı erişim kaç ülke?`,
            answer: `Hızlı erişim (vizesiz + varışta vize) toplamı ${fastAccess} ülkedir.`
        },
        {
            question: `${countryName} için e-vize ve klasik vize dağılımı nasıl?`,
            answer: `E-vize gereken ülke sayısı ${counts.evize}, önceden vize gereken ülke sayısı ${counts.vize}.`
        },
        {
            question: `${countryName} pasaportunun dünya sırası kaç?`,
            answer: `${countryName} pasaportu bu veri modelinde dünya sıralamasında #${country.sira} konumundadır.`
        },
        {
            question: 'Bu sayfadaki pasaport puanı nasıl hesaplanıyor?',
            answer: 'Pasaport puanı = vizesiz ülke + varışta vize ülke + e-vize ülke.'
        }
    ];
}

function renderCountryFaq(country) {
    const faqList = document.getElementById('country-faq-list');
    const faqNote = document.getElementById('country-faq-note');
    if (!faqList) return;

    const items = buildCountryFaqItems(country);
    faqList.innerHTML = items.map(item => `
        <details class="faq-item">
            <summary>${item.question}</summary>
            <p>${item.answer}</p>
        </details>
    `).join('');

    if (faqNote) {
        faqNote.textContent = `${getCountryDisplayName(country)} için bu sorular veriye bağlı olarak otomatik güncellenir.`;
    }

    const faqJsonldScript = document.getElementById('country-faq-jsonld');
    if (faqJsonldScript) {
        const payload = {
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: items.map(item => ({
                '@type': 'Question',
                name: item.question,
                acceptedAnswer: {
                    '@type': 'Answer',
                    text: item.answer
                }
            }))
        };
        faqJsonldScript.textContent = JSON.stringify(payload);
    }
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
        `${totalAccess} ülke erişim (E-Vize dahil)`,
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
        { label: 'Toplam Erişim (E-Vize Dahil)', value: totalAccess + ' ülke' },
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

function getProfileField(profile, fieldName) {
    const field = profile?.fields?.[fieldName];
    if (field && typeof field === 'object' && Object.prototype.hasOwnProperty.call(field, 'value')) {
        return field;
    }

    return {
        value: profile?.[fieldName] || '-',
        source_url: '',
        source_name: '',
        checked_at: profile?.updatedAt || '',
        trust_score: 50,
        note: ''
    };
}

function buildAutoCountryProfile(country) {
    const updatedAt = DATA_INFO?.generatedAt || '2026-02-20';
    const countryName = country.ulke;
    const wikiQuery = encodeURIComponent(countryName);
    const wikiUniversityCategory = `https://www.google.com/search?q=${encodeURIComponent(countryName + ' üniversiteleri')}`;
    const wikivoyage = `https://tr.wikivoyage.org/wiki/${wikiQuery}`;
    const operatorSearch = `https://www.google.com/search?q=${encodeURIComponent(countryName + ' mobile operators')}`;
    const peopleSearch = `https://www.google.com/search?q=${encodeURIComponent(countryName + ' famous people')}`;

    return {
        updatedAt,
        editorial_status: 'auto',
        next_review_at: 'Planlanacak',
        schools: [
            { name: `${countryName} Üniversite Rehberi`, url: wikiUniversityCategory },
            { name: 'QS Dünya Üniversite Sıralamaları', url: 'https://www.topuniversities.com/world-university-rankings' },
            { name: 'Times Higher Education', url: 'https://www.timeshighereducation.com/world-university-rankings' },
            { name: 'Webometrics Üniversite Endeksi', url: 'https://www.webometrics.info/en' },
            { name: 'UNESCO Institute for Statistics', url: 'https://uis.unesco.org/' }
        ],
        places: [
            `${countryName} için şehir ve gezi rehberi`,
            `${countryName} kültürel noktalar`,
            `${countryName} doğa ve açık hava rotaları`,
            `${countryName} müze ve tarih rotaları`,
            `${countryName} yeme-içme bölgeleri`
        ],
        operators: [
            { name: `${countryName} Operatör Araması`, url: operatorSearch },
            { name: 'GSMA Mobile Coverage Maps', url: 'https://www.gsma.com/coverage/' },
            { name: 'OpenSignal', url: 'https://www.opensignal.com/' }
        ],
        fields: {
            currency: {
                value: 'Resmi kaynakla doğrulanmalıdır.',
                source_url: `https://www.google.com/search?q=${encodeURIComponent(countryName + ' currency')}`,
                source_name: `${countryName} para birimi araması`,
                checked_at: updatedAt,
                trust_score: 60,
                note: 'Düzenli güncelleme için resmi merkez bankası/istatistik kaynağı önerilir.'
            },
            minimumWage: {
                value: 'Dönemsel olarak güncellenir; resmi kaynakla teyit edilmelidir.',
                source_url: `https://www.google.com/search?q=${encodeURIComponent(countryName + ' minimum wage official')}`,
                source_name: `${countryName} asgari ücret araması`,
                checked_at: updatedAt,
                trust_score: 58,
                note: 'Asgari ücret bilgisi mevzuatla değişebilir.'
            },
            livingCost: {
                value: 'Şehir bazında farklılık gösterir; güncel saha verisiyle kontrol önerilir.',
                source_url: 'https://www.numbeo.com/cost-of-living/',
                source_name: 'Numbeo',
                checked_at: updatedAt,
                trust_score: 62,
                note: 'Yaşam maliyeti hesaplarında kira ve kur etkisi yüksektir.'
            },
            inflation: {
                value: 'Yıllık oran dönemsel değişir; resmi istatistikle güncel kontrol önerilir.',
                source_url: 'https://www.imf.org/en/Publications/WEO',
                source_name: 'IMF WEO',
                checked_at: updatedAt,
                trust_score: 64,
                note: 'Kısa vadeli dalgalanmalar için ulusal istatistik kurumu takip edilmelidir.'
            },
            government: {
                value: 'Yönetim biçimi resmi kamu kaynaklarından doğrulanmalıdır.',
                source_url: `https://www.google.com/search?q=${encodeURIComponent(countryName + ' government type')}`,
                source_name: `${countryName} yönetim biçimi araması`,
                checked_at: updatedAt,
                trust_score: 65,
                note: ''
            },
            foodCulture: {
                value: 'Yerel mutfak ve yeme-içme kültürü bölgesel farklılıklar gösterir.',
                source_url: wikivoyage,
                source_name: 'Wikivoyage',
                checked_at: updatedAt,
                trust_score: 60,
                note: ''
            }
        },
        famousPeople: [
            `${countryName} için ünlü kişiler listesi`,
            'Editoryal kaynak doğrulaması planlanıyor',
            'Kültür, spor ve bilim alanları ayrı sınıflandırılacak',
            'Yerel doğrulama sonrası isim bazlı yayınlanır',
            'Güncelleme planı: kademeli'
        ],
        source_registry: {
            schools: {
                source_name: 'QS / THE / UNESCO',
                source_url: 'https://www.topuniversities.com/world-university-rankings',
                checked_at: updatedAt,
                trust_score: 62
            },
            places: {
                source_name: 'Wikivoyage',
                source_url: wikivoyage,
                checked_at: updatedAt,
                trust_score: 58
            },
            operators: {
                source_name: 'GSMA Coverage',
                source_url: 'https://www.gsma.com/coverage/',
                checked_at: updatedAt,
                trust_score: 62
            },
            famousPeople: {
                source_name: `${countryName} famous people araması`,
                source_url: peopleSearch,
                checked_at: updatedAt,
                trust_score: 50
            }
        }
    };
}

function renderFieldMeta(field) {
    const sourceLink = field.source_url
        ? `<a href="${field.source_url}" target="_blank" rel="noopener noreferrer">${field.source_name || 'Kaynak'}</a>`
        : 'Kaynak eklenmedi';
    const checkedText = field.checked_at ? field.checked_at : '-';
    const trust = Number.isFinite(Number(field.trust_score)) ? Number(field.trust_score) : 50;
    const trustClass = trust >= 80 ? 'trust-high' : (trust >= 65 ? 'trust-medium' : 'trust-low');
    const note = field.note ? `<small class="field-note">${field.note}</small>` : '';

    return `
        <div class="field-meta">
            <span class="field-source">Kaynak: ${sourceLink}</span>
            <span class="field-checked">Son kontrol: ${checkedText}</span>
            <span class="field-trust ${trustClass}">Güven: ${trust}/100</span>
        </div>
        ${note}
    `;
}

function renderKnowledgeSection(country) {
    const grid = document.getElementById('country-knowledge-grid');
    const note = document.getElementById('country-knowledge-note');
    if (!grid) return;

    const profileBase = typeof COUNTRY_PROFILES !== 'undefined' ? COUNTRY_PROFILES[country.kod] : null;
    const profile = profileBase || buildAutoCountryProfile(country);

    const statusLabel = profile.editorial_status === 'gold'
        ? 'Gold'
        : (profile.editorial_status === 'standard' ? 'Standard' : (profile.editorial_status === 'auto' ? 'Auto' : 'Draft'));
    const nextReview = profile.next_review_at || '-';
    if (note) {
        note.textContent = profileBase
            ? `Son editoryal güncelleme: ${profile.updatedAt} | Durum: ${statusLabel} | Sonraki planlı yenileme: ${nextReview}`
            : `Son güncelleme: ${profile.updatedAt} | Durum: ${statusLabel} | Bu ülke için otomatik temel rehber aktif.`;
    }

    const currencyField = getProfileField(profile, 'currency');
    const minimumWageField = getProfileField(profile, 'minimumWage');
    const livingCostField = getProfileField(profile, 'livingCost');
    const inflationField = getProfileField(profile, 'inflation');
    const governmentField = getProfileField(profile, 'government');
    const foodCultureField = getProfileField(profile, 'foodCulture');

    const schoolItems = profile.schools.map(item => `
        <li><a href="${item.url}" target="_blank" rel="noopener noreferrer">${item.name}</a></li>
    `).join('');

    const placeItems = profile.places.map(item => `<li>${item}</li>`).join('');

    const operatorItems = profile.operators.map(item => `
        <li><a href="${item.url}" target="_blank" rel="noopener noreferrer">${item.name}</a></li>
    `).join('');

    const famousItems = profile.famousPeople.map(item => `<span class="knowledge-tag">${item}</span>`).join('');
    const sourceRegistry = profile.source_registry || {};
    const sourceRows = Object.entries(sourceRegistry).map(([key, item]) => {
        const labelMap = {
            schools: 'Okullar',
            places: 'Gezilecek Yerler',
            operators: 'Operatörler',
            famousPeople: 'Ünlü Kişiler'
        };
        const label = labelMap[key] || key;
        const name = item?.source_name || 'Kaynak';
        const url = item?.source_url || '';
        const checkedAt = item?.checked_at || '-';
        const trust = Number.isFinite(Number(item?.trust_score)) ? Number(item.trust_score) : 50;
        const link = url
            ? `<a href="${url}" target="_blank" rel="noopener noreferrer">${name}</a>`
            : name;
        return `<li><strong>${label}:</strong> ${link} · Son kontrol: ${checkedAt} · Güven: ${trust}/100</li>`;
    }).join('');

    grid.innerHTML = `
        <article class="knowledge-card">
            <h3>En İyi Okullar</h3>
            <ul class="knowledge-list">${schoolItems}</ul>
        </article>
        <article class="knowledge-card">
            <h3>Gezilecek Yerler</h3>
            <ul class="knowledge-list">${placeItems}</ul>
        </article>
        <article class="knowledge-card">
            <h3>İnternet ve Operatörler</h3>
            <ul class="knowledge-list">${operatorItems}</ul>
        </article>
        <article class="knowledge-card">
            <h3>Ekonomi Özeti</h3>
            <div class="knowledge-stats">
                <div class="knowledge-stat">
                    <span>Para Birimi</span>
                    <strong>${currencyField.value}</strong>
                    ${renderFieldMeta(currencyField)}
                </div>
                <div class="knowledge-stat">
                    <span>Asgari Ücret</span>
                    <strong>${minimumWageField.value}</strong>
                    ${renderFieldMeta(minimumWageField)}
                </div>
                <div class="knowledge-stat">
                    <span>Yaşam Maliyeti</span>
                    <strong>${livingCostField.value}</strong>
                    ${renderFieldMeta(livingCostField)}
                </div>
                <div class="knowledge-stat">
                    <span>Enflasyon</span>
                    <strong>${inflationField.value}</strong>
                    ${renderFieldMeta(inflationField)}
                </div>
            </div>
        </article>
        <article class="knowledge-card">
            <h3>Yönetim ve Yaşam Tarzı</h3>
            <p><strong>Yönetim Biçimi:</strong> ${governmentField.value}</p>
            ${renderFieldMeta(governmentField)}
            <p><strong>Yeme-İçme Alışkanlıkları:</strong> ${foodCultureField.value}</p>
            ${renderFieldMeta(foodCultureField)}
        </article>
        <article class="knowledge-card">
            <h3>En Ünlü 10 Kişi</h3>
            <div class="knowledge-tags">${famousItems}</div>
        </article>
        <article class="knowledge-card knowledge-card-full">
            <h3>Veri Güven ve Yenileme Politikası</h3>
            <p>Bu kartlar kaynaklı veri modeli ile yayınlanır: <code>source_url</code>, <code>checked_at</code>, <code>trust_score</code>.</p>
            <ul class="knowledge-list">
                <li><strong>Ekonomi alanları:</strong> 30-45 gün</li>
                <li><strong>Operatör / yaşam maliyeti:</strong> 60-90 gün</li>
                <li><strong>Okul / gezi / kültür:</strong> 180 gün</li>
            </ul>
            ${sourceRows ? `<ul class="knowledge-list source-list">${sourceRows}</ul>` : ''}
        </article>
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

    const sorted = [...PASAPORT_DATA].sort((a, b) => getCountryDisplayName(a).localeCompare(getCountryDisplayName(b), 'tr'));
    select.innerHTML = '<option value="">Seçiniz</option>' + sorted.map(item => `
        <option value="${item.kod}">${item.bayrak} ${getCountryDisplayName(item)}</option>
    `).join('');

    if (selectedCode) select.value = selectedCode;
}

function fillTripPlannerSelects(selectedOrigin, selectedDestination) {
    const originEl = document.getElementById('planner-origin');
    const destinationEl = document.getElementById('planner-destination');
    if (!originEl || !destinationEl) return;

    const sorted = [...PASAPORT_DATA].sort((a, b) => getCountryDisplayName(a).localeCompare(getCountryDisplayName(b), 'tr'));
    const options = '<option value="">Seçiniz</option>' + sorted.map(item => `
        <option value="${item.kod}">${item.bayrak} ${getCountryDisplayName(item)}</option>
    `).join('');

    originEl.innerHTML = options;
    destinationEl.innerHTML = options;

    if (selectedOrigin) originEl.value = selectedOrigin;
    if (selectedDestination && selectedDestination !== selectedOrigin) {
        destinationEl.value = selectedDestination;
    }
}

function getPairVisaStatus(originCountry, destinationCountry) {
    if (!originCountry || !destinationCountry) return null;
    if (originCountry.kod === destinationCountry.kod) return 'same';
    const source = visaMatrixByPassportIso3?.[originCountry.iso3];
    if (!source) return null;
    return source[destinationCountry.iso3] || null;
}

function buildPlannerChecklist(status, destinationCountry) {
    const countryName = destinationCountry ? getCountryDisplayName(destinationCountry) : 'hedef ülke';
    if (status === 'vizesiz') {
        return [
            `Pasaport geçerlilik süresini ${countryName} için kontrol edin.`,
            'Dönüş bileti ve konaklama rezervasyonunu hazır tutun.',
            'Seyahat sigortası yaptırmayı değerlendirin.',
            'Girişte istenebilecek finansal yeterlilik belgelerini hazırlayın.'
        ];
    }
    if (status === 'varista') {
        return [
            'Varışta vize ücretini ve ödeme yöntemini önceden doğrulayın.',
            'Pasaport, dönüş bileti ve konaklama belgelerini hazır tutun.',
            'Varsa biyometrik fotoğraf ve başvuru formu gereksinimini kontrol edin.',
            'Havalimanı yoğunluğunu hesaba katıp ekstra zaman planlayın.'
        ];
    }
    if (status === 'evize') {
        return [
            'E-vize başvurusunu resmi kanallardan seyahat öncesi tamamlayın.',
            'Onay belgesinin dijital ve basılı kopyasını taşıyın.',
            'Pasaport geçerlilik süresi ve boş sayfa koşullarını kontrol edin.',
            'E-vize kapsamındaki kalış süresi limitini aşmayın.'
        ];
    }
    if (status === 'vize') {
        return [
            `${countryName} konsolosluğu başvuru adımlarını resmi siteden doğrulayın.`,
            'Randevu, evrak listesi, biyometri ve ücret kalemlerini planlayın.',
            'Başvuru sonuç süresi için seyahat tarihinden önce zaman tamponu bırakın.',
            'Ret riskini azaltmak için evrak tutarlılığına dikkat edin.'
        ];
    }
    return [
        'Bu rota için güncel vize durumu şu anda doğrulanamadı.',
        'Seyahatten önce resmi konsolosluk ve sınır otoritesi kaynaklarını kontrol edin.'
    ];
}

function renderTripPlanner() {
    const resultEl = document.getElementById('trip-planner-result');
    if (!resultEl) return;

    const origin = getCountryByCode(plannerOriginCode);
    const destination = getCountryByCode(plannerDestinationCode);
    if (!origin || !destination) {
        resultEl.innerHTML = '<h3>Plan Özeti</h3><p>Ülkeleri seçip planı oluşturun.</p>';
        return;
    }

    if (origin.kod === destination.kod) {
        resultEl.innerHTML = `
            <h3>Plan Özeti</h3>
            <p>Aynı ülke seçildi. Lütfen farklı bir hedef ülke seçin.</p>
        `;
        return;
    }

    const city = plannerDestinationCity ? plannerDestinationCity.trim() : '';
    const destinationName = getCountryDisplayName(destination);
    const originName = getCountryDisplayName(origin);
    const targetLabel = city ? `${city}, ${destinationName}` : destinationName;
    const status = getPairVisaStatus(origin, destination);

    const statusMeta = {
        vizesiz: { text: 'Vizesiz geçiş', className: 'status-vizesiz' },
        varista: { text: 'Varışta vize', className: 'status-varista' },
        evize: { text: 'E-vize gerekli', className: 'status-evize' },
        vize: { text: 'Önceden vize gerekli', className: 'status-vize' },
        same: { text: 'Aynı ülke', className: 'status-vize' },
        unknown: { text: 'Durum doğrulanamadı', className: 'status-vize' }
    };
    const mappedStatus = statusMeta[status || 'unknown'] || statusMeta.unknown;
    const checklist = buildPlannerChecklist(status || 'unknown', destination);
    const listHtml = checklist.map(item => `<li>${item}</li>`).join('');

    const flightsQuery = encodeURIComponent(`${originName} ${targetLabel} uçuş`);
    const hotelQuery = encodeURIComponent(targetLabel);
    const visaQuery = encodeURIComponent(`${originName} vatandaşları ${destinationName} vize şartları`);
    const mapsQuery = encodeURIComponent(targetLabel);

    resultEl.innerHTML = `
        <h3>${origin.bayrak} ${originName} → ${destination.bayrak} ${targetLabel}</h3>
        <span class="planner-status ${mappedStatus.className}">${mappedStatus.text}</span>
        <ul class="planner-checklist">${listHtml}</ul>
        <div class="planner-links">
            <a href="https://www.google.com/travel/flights?q=${flightsQuery}" target="_blank" rel="noopener noreferrer">Uçuş Ara</a>
            <a href="https://www.booking.com/searchresults.tr.html?ss=${hotelQuery}" target="_blank" rel="noopener noreferrer">Konaklama Ara</a>
            <a href="https://www.google.com/search?q=${visaQuery}" target="_blank" rel="noopener noreferrer">Vize Kaynaklarını Kontrol Et</a>
            <a href="https://www.google.com/maps/search/?api=1&query=${mapsQuery}" target="_blank" rel="noopener noreferrer">Haritada Aç</a>
        </div>
    `;
}

function getVisaDestinationsByStatus(country) {
    const empty = { vizesiz: [], varista: [], evize: [], vize: [] };
    const source = visaMatrixByPassportIso3?.[country.iso3];
    if (!source) return empty;

    Object.entries(source).forEach(([iso3, status]) => {
        if (!empty[status]) return;
        if (iso3 === country.iso3) return;

        const knownCountry = COUNTRY_BY_ISO3[iso3];
        const destination = knownCountry || { ulke: iso3, bayrak: '🌐', kod: '' };
        empty[status].push({
            iso3,
            ulke: destination.ulke,
            bayrak: destination.bayrak,
            kod: destination.kod
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
        const visibleItems = items.slice(0, visaListVisibleCount);
        const chips = visibleItems.map(item => {
            const text = `${item.bayrak} ${item.ulke}`;
            if (item.kod) {
                return `<a class="visa-country-chip" href="${getSiteBasePath()}${getCleanCountryPath(item.kod)}">${text}</a>`;
            }
            return `<span class="visa-country-chip is-readonly">${text}</span>`;
        }).join('');

        const hasMore = items.length > visibleItems.length;
        const moreButton = hasMore
            ? `<div class="visa-list-actions"><button type="button" class="mini-btn" id="visa-list-more">Daha Fazla Göster (${items.length - visibleItems.length})</button></div>`
            : '';

        list.innerHTML = chips + moreButton;

        if (hasMore) {
            const moreBtn = document.getElementById('visa-list-more');
            moreBtn?.addEventListener('click', () => {
                visaListVisibleCount += 80;
                renderVisaCountryList(currentCountry, activeVisaStatus, false);
            });
        }
    }
    lastRenderedVisaItems = items;

    if (shouldScroll) {
        panel.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
}

function handleVisaCategorySelection(status, shouldScroll) {
    if (!currentCountry || !VISA_STATUS_META[status]) return;
    activeVisaStatus = status;
    visaListVisibleCount = 80;
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
            visaListVisibleCount = 80;
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
            visaListVisibleCount = 80;
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
            visaListVisibleCount = 80;
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

    const plannerOrigin = document.getElementById('planner-origin');
    if (plannerOrigin && !plannerOrigin.dataset.bound) {
        plannerOrigin.addEventListener('change', event => {
            plannerOriginCode = event.target.value || '';
            renderTripPlanner();
        });
        plannerOrigin.dataset.bound = '1';
    }

    const plannerDestination = document.getElementById('planner-destination');
    if (plannerDestination && !plannerDestination.dataset.bound) {
        plannerDestination.addEventListener('change', event => {
            plannerDestinationCode = event.target.value || '';
            renderTripPlanner();
        });
        plannerDestination.dataset.bound = '1';
    }

    const plannerCity = document.getElementById('planner-destination-city');
    if (plannerCity && !plannerCity.dataset.bound) {
        plannerCity.addEventListener('input', event => {
            plannerDestinationCity = event.target.value || '';
        });
        plannerCity.dataset.bound = '1';
    }

    const plannerRun = document.getElementById('planner-run');
    if (plannerRun && !plannerRun.dataset.bound) {
        plannerRun.addEventListener('click', () => {
            renderTripPlanner();
            document.getElementById('trip-planner-result')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        });
        plannerRun.dataset.bound = '1';
    }

    const budgetOrigin = document.getElementById('budget-origin-country');
    if (budgetOrigin && !budgetOrigin.dataset.bound) {
        budgetOrigin.addEventListener('change', event => {
            budgetOriginCode = event.target.value || '';
            budgetFromCurrency = getCurrencyCodeForCountry(budgetOriginCode);
            renderBudgetPlanner(getCountryByCode(parseCountryCodeFromUrl()) || currentCountry || PASAPORT_DATA[0]);
            renderBudgetOutput();
        });
        budgetOrigin.dataset.bound = '1';
    }

    const budgetDestination = document.getElementById('budget-destination-country');
    if (budgetDestination && !budgetDestination.dataset.bound) {
        budgetDestination.addEventListener('change', event => {
            budgetDestinationCode = event.target.value || '';
            budgetToCurrency = getCurrencyCodeForCountry(budgetDestinationCode);
            renderBudgetPlanner(getCountryByCode(parseCountryCodeFromUrl()) || currentCountry || PASAPORT_DATA[0]);
            renderBudgetOutput();
        });
        budgetDestination.dataset.bound = '1';
    }

    const budgetAmountEl = document.getElementById('budget-amount');
    if (budgetAmountEl && !budgetAmountEl.dataset.bound) {
        budgetAmountEl.addEventListener('input', event => {
            budgetAmount = Number(event.target.value || 0);
            renderBudgetOutput();
        });
        budgetAmountEl.dataset.bound = '1';
    }

    const budgetFromEl = document.getElementById('budget-from-currency');
    if (budgetFromEl && !budgetFromEl.dataset.bound) {
        budgetFromEl.addEventListener('change', event => {
            budgetFromCurrency = event.target.value || 'USD';
            renderBudgetOutput();
        });
        budgetFromEl.dataset.bound = '1';
    }

    const budgetDaysEl = document.getElementById('budget-days');
    if (budgetDaysEl && !budgetDaysEl.dataset.bound) {
        budgetDaysEl.addEventListener('input', event => {
            budgetDays = Number(event.target.value || 1);
            renderBudgetOutput();
        });
        budgetDaysEl.dataset.bound = '1';
    }

    const budgetRefresh = document.getElementById('budget-refresh');
    if (budgetRefresh && !budgetRefresh.dataset.bound) {
        budgetRefresh.addEventListener('click', async () => {
            fxRatesMap = null;
            await renderBudgetOutput();
        });
        budgetRefresh.dataset.bound = '1';
    }
}

function renderCountryPage(country) {
    if (!country) return;

    currentCountry = country;
    visaListVisibleCount = 80;
    setCountryMeta(country);
    renderHeroBadges(country);
    renderCountryStats(country);
    renderTravelSnapshot(country);
    renderVisaBars(country);
    renderVisaChart(country);
    renderKnowledgeSection(country);
    renderCountryFaq(country);

    if (!plannerOriginCode || plannerOriginCode === currentCountry?.kod) {
        plannerOriginCode = country.kod;
    }
    if (!plannerDestinationCode || plannerDestinationCode === plannerOriginCode) {
        const fallbackDestination = PASAPORT_DATA.find(item => item.kod !== plannerOriginCode);
        plannerDestinationCode = fallbackDestination ? fallbackDestination.kod : '';
    }
    fillTripPlannerSelects(plannerOriginCode, plannerDestinationCode);
    renderTripPlanner();
    if (!budgetOriginCode) budgetOriginCode = country.kod;
    if (!budgetFromCurrency) budgetFromCurrency = getCurrencyCodeForCountry(budgetOriginCode);
    renderBudgetPlanner(country);
    renderBudgetOutput();
    bindInteractiveHandlers();

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
