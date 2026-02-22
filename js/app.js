// Pasaport Endeksi - Ana Uygulama
const GEOJSON_URL = 'https://raw.githubusercontent.com/datasets/geo-countries/master/data/countries.geojson';
const VISA_CSV_URL = 'https://raw.githubusercontent.com/ilyankou/passport-index-dataset/master/passport-index-tidy-iso3.csv';
const COUNTRIES_META_URL = 'https://raw.githubusercontent.com/annexare/Countries/master/dist/countries.min.json';
const LEAFLET_JS_URL = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js';
const CHART_JS_URL = 'https://cdn.jsdelivr.net/npm/chart.js@4.4.0/dist/chart.umd.min.js';
const VISA_FREE_HIGHLIGHT_THRESHOLD = 150;
const TRIP_CITY_OPTIONS = {
    TR: [
        'Adana', 'Adıyaman', 'Afyonkarahisar', 'Ağrı', 'Aksaray', 'Amasya', 'Ankara', 'Antalya', 'Ardahan', 'Artvin',
        'Aydın', 'Balıkesir', 'Bartın', 'Batman', 'Bayburt', 'Bilecik', 'Bingöl', 'Bitlis', 'Bolu', 'Burdur',
        'Bursa', 'Çanakkale', 'Çankırı', 'Çorum', 'Denizli', 'Diyarbakır', 'Düzce', 'Edirne', 'Elazığ', 'Erzincan',
        'Erzurum', 'Eskişehir', 'Gaziantep', 'Giresun', 'Gümüşhane', 'Hakkari', 'Hatay', 'Iğdır', 'Isparta', 'İstanbul',
        'İzmir', 'Kahramanmaraş', 'Karabük', 'Karaman', 'Kars', 'Kastamonu', 'Kayseri', 'Kilis', 'Kırıkkale', 'Kırklareli',
        'Kırşehir', 'Kocaeli', 'Konya', 'Kütahya', 'Malatya', 'Manisa', 'Mardin', 'Mersin', 'Muğla', 'Muş',
        'Nevşehir', 'Niğde', 'Ordu', 'Osmaniye', 'Rize', 'Sakarya', 'Samsun', 'Siirt', 'Sinop', 'Sivas',
        'Şanlıurfa', 'Şırnak', 'Tekirdağ', 'Tokat', 'Trabzon', 'Tunceli', 'Uşak', 'Van', 'Yalova', 'Yozgat', 'Zonguldak'
    ],
    DE: ['Berlin', 'Münih', 'Hamburg', 'Frankfurt', 'Köln', 'Düsseldorf'],
    FR: ['Paris', 'Lyon', 'Nice', 'Marsilya', 'Bordeaux', 'Toulouse'],
    ES: ['Madrid', 'Barselona', 'Valensiya', 'Sevilla', 'Malaga', 'Bilbao'],
    IT: ['Roma', 'Milano', 'Venedik', 'Floransa', 'Napoli', 'Bologna'],
    GB: ['Londra', 'Manchester', 'Edinburgh', 'Birmingham', 'Liverpool', 'Bristol'],
    US: ['New York', 'Los Angeles', 'Miami', 'Chicago', 'San Francisco', 'Washington DC'],
    CA: ['Toronto', 'Vancouver', 'Montreal', 'Calgary', 'Ottawa', 'Quebec City'],
    JP: ['Tokyo', 'Osaka', 'Kyoto', 'Sapporo', 'Fukuoka', 'Nara'],
    TH: ['Bangkok', 'Phuket', 'Chiang Mai', 'Krabi', 'Pattaya', 'Ko Samui'],
    AE: ['Dubai', 'Abu Dhabi', 'Sharjah', 'Ajman', 'Ras Al Khaimah', 'Al Ain'],
    SG: ['Marina Bay', 'Orchard', 'Sentosa', 'Chinatown', 'Little India', 'Bugis'],
    NL: ['Amsterdam', 'Rotterdam', 'Lahey', 'Utrecht', 'Eindhoven', 'Haarlem'],
    CH: ['Zürih', 'Cenevre', 'Luzern', 'Interlaken', 'Bern', 'Lozan'],
    AT: ['Viyana', 'Salzburg', 'Graz', 'Innsbruck', 'Linz', 'Hallstatt'],
    BE: ['Brüksel', 'Anvers', 'Brugge', 'Gent', 'Leuven', 'Liège'],
    DK: ['Kopenhag', 'Aarhus', 'Odense', 'Aalborg', 'Roskilde', 'Esbjerg'],
    FI: ['Helsinki', 'Espoo', 'Tampere', 'Turku', 'Oulu', 'Rovaniemi'],
    NO: ['Oslo', 'Bergen', 'Trondheim', 'Stavanger', 'Tromsø', 'Ålesund'],
    SE: ['Stockholm', 'Göteborg', 'Malmö', 'Uppsala', 'Lund', 'Kiruna'],
    PT: ['Lizbon', 'Porto', 'Faro', 'Braga', 'Coimbra', 'Madeira'],
    GR: ['Atina', 'Selanik', 'Heraklion', 'Rodos', 'Patra', 'Kalamata'],
    CZ: ['Prag', 'Brno', 'Ostrava', 'Plzen', 'Olomouc', 'Cesky Krumlov'],
    PL: ['Varşova', 'Krakow', 'Wroclaw', 'Gdansk', 'Poznan', 'Lodz'],
    HU: ['Budapeşte', 'Debrecen', 'Szeged', 'Pecs', 'Gyor', 'Miskolc'],
    RO: ['Bükreş', 'Kluj-Napoka', 'Braşov', 'Timişoara', 'Sibiu', 'Iaşi'],
    BG: ['Sofya', 'Plovdiv', 'Varna', 'Burgaz', 'Ruse', 'Veliko Tarnovo'],
    HR: ['Zagreb', 'Split', 'Dubrovnik', 'Zadar', 'Rijeka', 'Pula'],
    RS: ['Belgrad', 'Novi Sad', 'Niş', 'Kragujevac', 'Subotica', 'Kraljevo'],
    RU: ['Moskova', 'St Petersburg', 'Soçi', 'Kazan', 'Novosibirsk', 'Vladivostok'],
    UA: ['Kiev', 'Lviv', 'Odessa', 'Kharkiv', 'Dnipro', 'Ivano-Frankivsk'],
    CN: ['Pekin', 'Şanghay', 'Guangzhou', 'Shenzhen', 'Chengdu', 'Xi’an'],
    IN: ['Yeni Delhi', 'Mumbai', 'Bangalore', 'Hyderabad', 'Chennai', 'Kalküta'],
    ID: ['Cakarta', 'Bali (Denpasar)', 'Surabaya', 'Bandung', 'Yogyakarta', 'Medan'],
    MY: ['Kuala Lumpur', 'Penang', 'Johor Bahru', 'Kota Kinabalu', 'Kuching', 'Malakka'],
    VN: ['Hanoi', 'Ho Chi Minh City', 'Da Nang', 'Nha Trang', 'Hue', 'Hoi An'],
    KR: ['Seul', 'Busan', 'Incheon', 'Daegu', 'Daejeon', 'Jeju'],
    HK: ['Hong Kong', 'Kowloon', 'New Territories', 'Lantau', 'Sha Tin', 'Causeway Bay'],
    AU: ['Sydney', 'Melbourne', 'Brisbane', 'Perth', 'Adelaide', 'Gold Coast'],
    NZ: ['Auckland', 'Wellington', 'Christchurch', 'Queenstown', 'Hamilton', 'Dunedin'],
    MX: ['Mexico City', 'Cancun', 'Guadalajara', 'Monterrey', 'Tulum', 'Puebla'],
    BR: ['São Paulo', 'Rio de Janeiro', 'Brasilia', 'Salvador', 'Recife', 'Curitiba'],
    AR: ['Buenos Aires', 'Cordoba', 'Mendoza', 'Rosario', 'Bariloche', 'Ushuaia'],
    CL: ['Santiago', 'Valparaiso', 'Viña del Mar', 'Antofagasta', 'La Serena', 'Puerto Varas'],
    ZA: ['Cape Town', 'Johannesburg', 'Durban', 'Pretoria', 'Port Elizabeth', 'Stellenbosch'],
    EG: ['Kahire', 'İskenderiye', 'Giza', 'Luksor', 'Asvan', 'Sharm El Sheikh'],
    MA: ['Rabat', 'Kazablanka', 'Marakeş', 'Fes', 'Tanca', 'Agadir'],
    SA: ['Riyad', 'Cidde', 'Mekke', 'Medine', 'Dammam', 'Abha'],
    QA: ['Doha', 'Al Wakrah', 'Al Khor', 'Lusail', 'Umm Salal', 'Dukhan'],
    KW: ['Kuveyt', 'Hawalli', 'Salmiya', 'Farwaniya', 'Ahmadi', 'Jahra'],
    BH: ['Manama', 'Muharraq', 'Riffa', 'Isa Town', 'Sitra', 'Budaiya'],
    OM: ['Maskat', 'Salalah', 'Sohar', 'Nizwa', 'Sur', 'Duqm'],
    JO: ['Amman', 'Akabe', 'Petra', 'Irbid', 'Zarqa', 'Madaba'],
    IE: ['Dublin', 'Cork', 'Galway', 'Limerick', 'Kilkenny', 'Waterford'],
    IS: ['Reykjavik', 'Akureyri', 'Vik', 'Selfoss', 'Keflavik', 'Husavik'],
    LU: ['Lüksemburg', 'Esch-sur-Alzette', 'Differdange', 'Dudelange', 'Ettelbruck', 'Wiltz'],
    MT: ['Valletta', 'Sliema', 'St Julians', 'Mdina', 'Gozo', 'Mellieha'],
    CY: ['Lefkoşa', 'Limasol', 'Larnaka', 'Baf', 'Gazimağusa', 'Girne'],
    EE: ['Tallinn', 'Tartu', 'Narva', 'Parnu', 'Viljandi', 'Haapsalu'],
    LV: ['Riga', 'Daugavpils', 'Liepaja', 'Jelgava', 'Jurmala', 'Ventspils'],
    LT: ['Vilnius', 'Kaunas', 'Klaipeda', 'Siauliai', 'Panevezys', 'Palanga'],
    SK: ['Bratislava', 'Kosice', 'Zilina', 'Presov', 'Nitra', 'Banska Bystrica'],
    SI: ['Ljubljana', 'Maribor', 'Bled', 'Koper', 'Celje', 'Piran'],
    BA: ['Saraybosna', 'Banja Luka', 'Mostar', 'Tuzla', 'Zenica', 'Bihac'],
    AL: ['Tiran', 'Durres', 'Vlore', 'Shkoder', 'Sarande', 'Berat'],
    MK: ['Üsküp', 'Ohri', 'Bitola', 'Tetovo', 'Kumanovo', 'Prilep'],
    ME: ['Podgorica', 'Budva', 'Kotor', 'Herceg Novi', 'Bar', 'Cetinje'],
    MD: ['Kişinev', 'Balti', 'Tiraspol', 'Comrat', 'Cahul', 'Orhei'],
    GE: ['Tiflis', 'Batum', 'Kutaisi', 'Rustavi', 'Mtskheta', 'Telavi'],
    AM: ['Erivan', 'Gümrü', 'Vanadzor', 'Dilijan', 'Sevan', 'Eçmiadzin'],
    AZ: ['Bakü', 'Gence', 'Sumgayıt', 'Şeki', 'Lenkeran', 'Nahçıvan'],
    KZ: ['Astana', 'Almatı', 'Şımkent', 'Aktau', 'Karagandı', 'Türkistan'],
    UZ: ['Taşkent', 'Semerkant', 'Buhara', 'Hive', 'Namangan', 'Andican'],
    KG: ['Bişkek', 'Oş', 'Karakol', 'Celalabad', 'Tokmok', 'Naryn'],
    TJ: ['Duşanbe', 'Hucend', 'Kulob', 'Bokhtar', 'İstaravşan', 'Penjikent'],
    TM: ['Aşkabat', 'Türkmenbaşı', 'Daşoğuz', 'Merv', 'Türkmenabat', 'Balkanabat'],
    MN: ['Ulan Batur', 'Erdenet', 'Darkhan', 'Kharkhorin', 'Choibalsan', 'Ölgii'],
    PK: ['İslamabad', 'Lahor', 'Karaçi', 'Rawalpindi', 'Faisalabad', 'Peşaver'],
    BD: ['Dakha', 'Çittagong', 'Sylhet', 'Khulna', 'Rajshahi', 'Cox\'s Bazar'],
    LK: ['Kolombo', 'Kandy', 'Galle', 'Negombo', 'Jaffna', 'Nuwara Eliya'],
    NP: ['Katmandu', 'Pokhara', 'Lalitpur', 'Bhaktapur', 'Biratnagar', 'Chitwan'],
    PH: ['Manila', 'Cebu', 'Davao', 'Boracay', 'Baguio', 'Palawan'],
    KH: ['Phnom Penh', 'Siem Reap', 'Sihanoukville', 'Battambang', 'Kampot', 'Kep'],
    LA: ['Vientiane', 'Luang Prabang', 'Pakse', 'Vang Vieng', 'Savannakhet', 'Thakhek'],
    MM: ['Yangon', 'Mandalay', 'Naypyidaw', 'Bagan', 'Inle Lake', 'Mawlamyine'],
    TW: ['Taipei', 'Kaohsiung', 'Taichung', 'Tainan', 'Hsinchu', 'Keelung'],
    IL: ['Tel Aviv', 'Kudüs', 'Hayfa', 'Eilat', 'Beerşeva', 'Nazaret'],
    IQ: ['Bağdat', 'Erbil', 'Basra', 'Musul', 'Necef', 'Kerbela'],
    IR: ['Tahran', 'İsfahan', 'Şiraz', 'Meşhed', 'Tebriz', 'Yezd'],
    LB: ['Beyrut', 'Trablusşam', 'Sayda', 'Sur', 'Jounieh', 'Baalbek'],
    NG: ['Lagos', 'Abuja', 'Kano', 'Port Harcourt', 'Ibadan', 'Enugu'],
    KE: ['Nairobi', 'Mombasa', 'Kisumu', 'Nakuru', 'Naivasha', 'Eldoret'],
    TZ: ['Darüsselam', 'Zanzibar', 'Arusha', 'Dodoma', 'Mwanza', 'Moshi'],
    UG: ['Kampala', 'Entebbe', 'Jinja', 'Mbarara', 'Gulu', 'Fort Portal'],
    ET: ['Addis Ababa', 'Dire Dawa', 'Mekele', 'Bahir Dar', 'Gondar', 'Hawassa'],
    GH: ['Accra', 'Kumasi', 'Takoradi', 'Tamale', 'Cape Coast', 'Tema'],
    CI: ['Abidjan', 'Yamoussoukro', 'Bouake', 'San Pedro', 'Korhogo', 'Daloa'],
    SN: ['Dakar', 'Saint-Louis', 'Thiès', 'Saly', 'Kaolack', 'Ziguinchor'],
    DZ: ['Cezayir', 'Oran', 'Constantine', 'Annaba', 'Tlemcen', 'Bejaia'],
    TN: ['Tunus', 'Sousse', 'Sfax', 'Hammamet', 'Monastir', 'Nabeul'],
    CO: ['Bogota', 'Medellin', 'Cartagena', 'Cali', 'Barranquilla', 'Santa Marta'],
    PE: ['Lima', 'Cusco', 'Arequipa', 'Trujillo', 'Iquitos', 'Piura'],
    EC: ['Quito', 'Guayaquil', 'Cuenca', 'Manta', 'Loja', 'Galapagos'],
    BO: ['La Paz', 'Santa Cruz', 'Sucre', 'Cochabamba', 'Potosi', 'Uyuni'],
    PY: ['Asuncion', 'Ciudad del Este', 'Encarnacion', 'San Lorenzo', 'Luque', 'Pedro Juan Caballero'],
    UY: ['Montevideo', 'Punta del Este', 'Colonia del Sacramento', 'Salto', 'Maldonado', 'Paysandu'],
    VE: ['Karakas', 'Maracaibo', 'Valencia', 'Barquisimeto', 'Margarita', 'Merida'],
    CR: ['San Jose', 'Liberia', 'La Fortuna', 'Tamarindo', 'Puerto Viejo', 'Monteverde'],
    PA: ['Panama City', 'Bocas del Toro', 'David', 'Colon', 'Boquete', 'San Blas'],
    DO: ['Santo Domingo', 'Punta Cana', 'Santiago de los Caballeros', 'La Romana', 'Puerto Plata', 'Samana'],
    CU: ['Havana', 'Varadero', 'Santiago de Cuba', 'Trinidad', 'Cienfuegos', 'Holguin'],
    JM: ['Kingston', 'Montego Bay', 'Negril', 'Ocho Rios', 'Port Antonio', 'Mandeville'],
    GT: ['Guatemala City', 'Antigua', 'Flores', 'Quetzaltenango', 'Atitlan', 'Escuintla'],
    HN: ['Tegucigalpa', 'San Pedro Sula', 'Roatan', 'La Ceiba', 'Copan', 'Tela'],
    SV: ['San Salvador', 'Santa Ana', 'San Miguel', 'La Libertad', 'Sonsonate', 'Suchitoto'],
    NI: ['Managua', 'Granada', 'Leon', 'San Juan del Sur', 'Masaya', 'Esteli']
};
const TRIP_DAILY_ESTIMATE_USD = {
    TR: 70, DE: 145, FR: 150, ES: 125, IT: 135, GB: 170, US: 190, CA: 170, JP: 165,
    TH: 75, AE: 145, SG: 170, NL: 155, CH: 220, AT: 150, BE: 150, DK: 180, FI: 170,
    NO: 185, SE: 175, PT: 110, GR: 105, CZ: 95, PL: 90, HU: 85, RO: 75, BG: 70,
    HR: 95, RS: 70, RU: 95, UA: 65, CN: 100, IN: 60, ID: 65, MY: 75, VN: 60,
    KR: 145, HK: 180, AU: 185, NZ: 175, MX: 85, BR: 80, AR: 75, ZA: 70, EG: 60
};
const TRIP_VISA_FEE_USD = {
    vizesiz: 0,
    varista: 45,
    evize: 35,
    vize: 95,
    unknown: 50
};
const TRIP_PROCESS_ETA = {
    vizesiz: 'Aynı gün giriş',
    varista: 'Aynı gün (sınır/havalimanı)',
    evize: '1-3 iş günü',
    vize: '7-21 iş günü',
    unknown: 'Resmi kaynaktan kontrol edilmeli'
};
let map, geoLayer, geoData = null;
let visaMatrixByPassportIso3 = null;
let visaLoadState = 'idle';
let countryMetaByIso2 = null;
const compareFilterState = { search: '', region: 'all', sort: 'rank' };
const passportFilterState = { mode: 'all', search: '', region: 'all', sort: 'rank', limit: 24, step: 24 };
const rankingFilterState = { search: '', region: 'all', limit: 20, step: 20 };
let tripPlannerSetupDone = false;
let tripCityPickerSetupDone = false;
let rankingRendered = false;
let mapInitStarted = false;
let turkeyChartStarted = false;
let passportGridRendered = false;
let compareSelectsFilled = false;
let mapSelectFilled = false;
const externalScriptCache = {};

document.addEventListener('DOMContentLoaded', () => {
    const data = PASAPORT_DATA.sort((a, b) => a.sira - b.sira);
    const turkiye = data.find(d => d.kod === 'TR');
    const countriesStat = document.getElementById('stat-countries');
    const updatedStat = document.getElementById('stat-updated');

    if (countriesStat) {
        countriesStat.textContent = String(data.length);
    }
    if (updatedStat) {
        updatedStat.textContent = formatDateTr(DATA_INFO?.generatedAt);
    }

    if (turkiye) {
        document.getElementById('stat-visa-free').textContent = turkiye.vizesiz + turkiye.varistaSiz;
    }

    setDataQualityBadge('Veri doğrulama: kontrol ediliyor...', 'loading');
    setupLazyPassportGrid(data);
    setupLazyRankingSection(data);
    setupLazyCompareSection(data);
    renderTurkeySpotlight(turkiye);
    setupLazyMap(data);
    setupLazyTripPlanner(data);
    setupLazyTurkeyChart(turkiye);
    initEventListeners(data);
    applyInitialSearchFromUrl();
});

function normalizeText(value) {
    return String(value || '')
        .toLowerCase()
        .replace(/ı/g, 'i')
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '');
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

function runWhenIdle(task, timeoutMs) {
    if ('requestIdleCallback' in window) {
        window.requestIdleCallback(() => task(), { timeout: timeoutMs || 1500 });
    } else {
        setTimeout(task, timeoutMs || 1500);
    }
}

function scrollToSectionWithOffset(target) {
    if (!target) return;
    const header = document.getElementById('header');
    const headerHeight = header ? header.offsetHeight : 64;
    const offset = headerHeight + 8;
    const top = window.scrollY + target.getBoundingClientRect().top - offset;
    window.scrollTo({ top: Math.max(0, top), behavior: 'smooth' });
}

function stabilizeSectionScroll(target) {
    if (!target) return;
    [0, 300, 800, 1600, 2600, 4000].forEach(delay => {
        setTimeout(() => scrollToSectionWithOffset(target), delay);
    });
}

function loadExternalScript(url, globalSymbol) {
    if (globalSymbol && typeof window[globalSymbol] !== 'undefined') {
        return Promise.resolve();
    }
    if (externalScriptCache[url]) return externalScriptCache[url];

    externalScriptCache[url] = new Promise((resolve, reject) => {
        const existing = document.querySelector(`script[data-src="${url}"]`);
        if (existing) {
            existing.addEventListener('load', () => resolve(), { once: true });
            existing.addEventListener('error', () => reject(new Error('Script yuklenemedi: ' + url)), { once: true });
            return;
        }

        const script = document.createElement('script');
        script.src = url;
        script.defer = true;
        script.async = true;
        script.dataset.src = url;
        script.onload = () => resolve();
        script.onerror = () => reject(new Error('Script yuklenemedi: ' + url));
        document.head.appendChild(script);
    });

    return externalScriptCache[url];
}

function formatDateTr(isoDate) {
    if (!isoDate) return 'Bilinmiyor';
    const date = new Date(isoDate + 'T00:00:00');
    if (Number.isNaN(date.getTime())) return isoDate;
    return date.toLocaleDateString('tr-TR', { year: 'numeric', month: 'short', day: 'numeric' });
}

function renderRankingInfo(data) {
    const el = document.getElementById('ranking-info');
    if (!el) return;

    const info = typeof DATA_INFO !== 'undefined' ? DATA_INFO : {};
    const sourceName = info.sourceName || 'Belirtilmedi';
    const sourceUrl = info.sourceUrl || '#';
    const generatedAt = formatDateTr(info.generatedAt);
    const methodology = info.methodology || 'Pasaport puanı = vizesiz + varışta vize + e-vize.';
    const countryCount = String(data.length || 0);
    const coverageTarget = String(info.coverageTarget || 198);
    const note = info.note || '';

    el.innerHTML = `
        <div class="ranking-info-grid">
            <p><strong>Son güncelleme:</strong> ${generatedAt}</p>
            <p><strong>Kapsam:</strong> ${countryCount} pasaport, hedef ${coverageTarget} destinasyon</p>
            <p><strong>Metodoloji:</strong> ${methodology}</p>
            <p><strong>Kaynak:</strong> <a href="${sourceUrl}" target="_blank" rel="noopener noreferrer">${sourceName}</a></p>
            ${note ? `<p class="ranking-note">${note}</p>` : ''}
        </div>
    `;
}

function renderSourceComparison() {
    const el = document.getElementById('source-compare');
    if (!el) return;

    const rows = Array.isArray(DATA_INFO?.comparisons) ? DATA_INFO.comparisons : [];
    if (!rows.length) {
        el.innerHTML = '';
        return;
    }

    el.innerHTML = `
        <h3>Kaynak Karşılaştırması</h3>
        <div class="source-compare-table-wrap">
            <table class="source-compare-table">
                <thead>
                    <tr>
                        <th>Kaynak</th>
                        <th>Veri/Metodoloji Tipi</th>
                        <th>Güncelleme Modeli</th>
                        <th>Son Kontrol</th>
                        <th>Bağlantı</th>
                    </tr>
                </thead>
                <tbody>
                    ${rows.map(item => `
                        <tr>
                            <td>${item.label || '-'}</td>
                            <td>${item.sourceType || '-'}</td>
                            <td>${item.refreshModel || '-'}</td>
                            <td>${formatDateTr(item.checkedAt)}</td>
                            <td><a href="${item.url || '#'}" target="_blank" rel="noopener noreferrer">Aç</a></td>
                        </tr>
                    `).join('')}
                </tbody>
            </table>
        </div>
    `;
}

function setupLazyPassportGrid(data) {
    if (passportGridRendered) return;
    const section = document.getElementById('pasaportlar');
    const renderCards = () => {
        if (passportGridRendered) return;
        applyPassportFilters(data);
        passportGridRendered = true;
    };

    if (!section) {
        renderCards();
        return;
    }

    const observer = new IntersectionObserver(entries => {
        const visible = entries.some(entry => entry.isIntersecting);
        if (!visible) return;
        observer.disconnect();
        renderCards();
    }, { rootMargin: '180px 0px' });
    observer.observe(section);

    runWhenIdle(renderCards, 2200);
}

function setupLazyCompareSection(data) {
    const section = document.getElementById('karsilastir');
    const fill = () => {
        if (compareSelectsFilled) return;
        compareSelectsFilled = true;
        preloadCountryMeta().then(() => applyCompareFilters(data));
    };

    if (!section) {
        fill();
        return;
    }

    const observer = new IntersectionObserver(entries => {
        const visible = entries.some(entry => entry.isIntersecting);
        if (!visible) return;
        observer.disconnect();
        fill();
    }, { rootMargin: '200px 0px' });
    observer.observe(section);

    document.getElementById('compare-search')?.addEventListener('focus', fill, { once: true });
    document.getElementById('compare-select-1')?.addEventListener('focus', fill, { once: true });
    document.getElementById('compare-select-2')?.addEventListener('focus', fill, { once: true });
}

function setupLazyRankingSection(data) {
    if (rankingRendered) return;
    const section = document.getElementById('siralama');
    if (!section) {
        renderRankingInfo(data);
        renderSourceComparison();
        applyRankingFilters(data);
        rankingRendered = true;
        return;
    }

    const renderAll = () => {
        if (rankingRendered) return;
        renderRankingInfo(data);
        renderSourceComparison();
        applyRankingFilters(data);
        rankingRendered = true;
    };

    const observer = new IntersectionObserver(entries => {
        const visible = entries.some(entry => entry.isIntersecting);
        if (!visible) return;
        observer.disconnect();
        renderAll();
    }, { rootMargin: '220px 0px' });

    observer.observe(section);
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

function sortListingData(data, mode) {
    const items = [...data];
    if (mode === 'name') {
        return items.sort((a, b) => a.ulke.localeCompare(b.ulke, 'tr'));
    }
    if (mode === 'score-asc') {
        return items.sort((a, b) => a.puan - b.puan || a.ulke.localeCompare(b.ulke, 'tr'));
    }
    if (mode === 'score-desc') {
        return items.sort((a, b) => b.puan - a.puan || a.ulke.localeCompare(b.ulke, 'tr'));
    }
    return items.sort((a, b) => a.sira - b.sira || a.ulke.localeCompare(b.ulke, 'tr'));
}

function applyPassportFilters(data) {
    let filtered = [...data];

    if (passportFilterState.mode === 'top-20') {
        filtered = sortListingData(filtered, 'rank').slice(0, 20);
    } else if (passportFilterState.mode === 'visa-free') {
        filtered = filtered.filter(d => d.vizesiz >= VISA_FREE_HIGHLIGHT_THRESHOLD);
        filtered.sort((a, b) => b.vizesiz - a.vizesiz || b.puan - a.puan || a.ulke.localeCompare(b.ulke, 'tr'));
    }

    const search = normalizeText(passportFilterState.search || '');
    if (search) {
        filtered = filtered.filter(d => normalizeText(d.ulke).includes(search));
    }

    if (passportFilterState.region !== 'all') {
        if (!countryMetaByIso2) {
            preloadCountryMeta().then(() => applyPassportFilters(data));
            return;
        }
        filtered = filtered.filter(item => getCountryContinentCode(item.kod) === passportFilterState.region);
    }

    filtered = sortListingData(filtered, passportFilterState.sort);

    const limited = filtered.slice(0, passportFilterState.limit);
    renderPassportGrid(limited);

    const countEl = document.getElementById('passport-result-count');
    if (countEl) countEl.textContent = String(limited.length);

    const loadMore = document.getElementById('passport-load-more');
    if (loadMore) {
        const hasMore = filtered.length > passportFilterState.limit;
        loadMore.style.display = hasMore ? 'inline-flex' : 'none';
        loadMore.disabled = !hasMore;
    }
}

function applyRankingFilters(data) {
    let filtered = [...data];

    const search = normalizeText(rankingFilterState.search || '');
    if (search) {
        filtered = filtered.filter(d => normalizeText(d.ulke).includes(search));
    }

    if (rankingFilterState.region !== 'all') {
        if (!countryMetaByIso2) {
            preloadCountryMeta().then(() => applyRankingFilters(data));
            return;
        }
        filtered = filtered.filter(item => getCountryContinentCode(item.kod) === rankingFilterState.region);
    }

    filtered = sortListingData(filtered, 'rank');
    const limit = rankingFilterState.limit === 'all' ? filtered.length : Number(rankingFilterState.limit) || 20;
    const limited = filtered.slice(0, limit);

    renderRankingTable(limited);

    const countEl = document.getElementById('ranking-result-count');
    if (countEl) countEl.textContent = String(limited.length);

    const loadMore = document.getElementById('ranking-load-more');
    if (loadMore) {
        const hasMore = filtered.length > limited.length;
        loadMore.style.display = hasMore ? 'inline-flex' : 'none';
        loadMore.disabled = !hasMore;
    }
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
    const country = PASAPORT_DATA.find(item => item.kod === String(code || '').toUpperCase());
    const slug = slugifyCountryName(country ? country.ulke : code);
    return `ulke/${slug}/`;
}

function findCountryByCode(data, code) {
    const target = String(code || '').toUpperCase();
    return data.find(item => item.kod === target) || null;
}

function getTripVisaStatus(originCountry, destinationCountry) {
    if (!originCountry || !destinationCountry) return null;
    if (originCountry.kod === destinationCountry.kod) return 'same';
    const source = visaMatrixByPassportIso3?.[originCountry.iso3];
    if (!source) return null;
    return source[destinationCountry.iso3] || null;
}

function getTripChecklist(status, destinationName) {
    if (status === 'vizesiz') {
        return [
            `${destinationName} için pasaport geçerlilik süresini kontrol et.`,
            'Dönüş bileti ve konaklama rezervasyonunu hazır tut.',
            'Seyahat sigortası yaptırmayı değerlendir.'
        ];
    }
    if (status === 'varista') {
        return [
            'Varışta vize ücretini ve ödeme yöntemini önceden doğrula.',
            'Girişte istenebilecek evrakları (rezervasyon, dönüş bileti vb.) hazır tut.',
            'Havalimanı sürecinde ekstra süre planla.'
        ];
    }
    if (status === 'evize') {
        return [
            'E-vize başvurusunu resmi kanal üzerinden tamamla.',
            'Onay belgesini dijital ve basılı olarak sakla.',
            'Kalış süresi ve giriş sayısı şartlarını kontrol et.'
        ];
    }
    if (status === 'vize') {
        return [
            `${destinationName} için konsolosluk başvuru adımlarını kontrol et.`,
            'Randevu, evrak, biyometri ve ücret planını netleştir.',
            'Seyahat tarihinden önce tampon süre bırak.'
        ];
    }
    return [
        'Bu rota için canlı vize durumu şu an alınamadı.',
        'Seyahat öncesi resmi konsolosluk ve sınır otoritesi kaynaklarını kontrol et.'
    ];
}

function getTripRequiredDocs(status, destinationName) {
    if (status === 'vizesiz') {
        return ['Pasaport (en az 6 ay)', 'Dönüş bileti', 'Konaklama rezervasyonu', 'Seyahat sigortası (önerilir)'];
    }
    if (status === 'varista') {
        return ['Pasaport (en az 6 ay)', 'Varışta vize ücreti için ödeme aracı', 'Dönüş bileti', 'Konaklama belgesi'];
    }
    if (status === 'evize') {
        return ['Pasaport', 'E-vize onay belgesi (QR/PDF)', 'Dönüş bileti', 'Konaklama kanıtı'];
    }
    if (status === 'vize') {
        return [
            `${destinationName} vize başvuru formu`,
            'Pasaport + biyometrik fotoğraf',
            'Seyahat sağlık sigortası',
            'Maddi yeterlilik ve rezervasyon belgeleri'
        ];
    }
    return ['Pasaport', 'Resmi vize şartları çıktısı', 'Konaklama + dönüş bileti'];
}

function getTripScoreMeta(status) {
    if (status === 'vizesiz') return { score: 95, level: 'Düşük Hazırlık', cls: 'trip-score-high' };
    if (status === 'varista') return { score: 80, level: 'Orta Hazırlık', cls: 'trip-score-mid' };
    if (status === 'evize') return { score: 65, level: 'Orta-Yüksek Hazırlık', cls: 'trip-score-mid' };
    if (status === 'vize') return { score: 35, level: 'Yüksek Hazırlık', cls: 'trip-score-low' };
    return { score: 50, level: 'Belirsiz', cls: 'trip-score-mid' };
}

function getTripDailyEstimateUsd(destinationCode) {
    return TRIP_DAILY_ESTIMATE_USD[String(destinationCode || '').toUpperCase()] || 95;
}

function getTripProcessEta(status) {
    return TRIP_PROCESS_ETA[status] || TRIP_PROCESS_ETA.unknown;
}

function getTripVisaFeeUsd(status) {
    return TRIP_VISA_FEE_USD[status] ?? TRIP_VISA_FEE_USD.unknown;
}

function getTripSelectedDays() {
    const daysInput = document.getElementById('trip-days');
    const raw = Number(daysInput?.value || 5);
    const safeDays = Number.isFinite(raw) ? Math.max(1, Math.min(60, Math.round(raw))) : 5;
    if (daysInput) daysInput.value = String(safeDays);
    return safeDays;
}

function getSelectedTripCities() {
    const citySelect = document.getElementById('trip-city-select');
    if (!(citySelect instanceof HTMLSelectElement)) return [];
    return [...citySelect.selectedOptions].map(option => option.value).filter(Boolean);
}

function getTripCityPickerEls() {
    return {
        select: document.getElementById('trip-city-select'),
        toggle: document.getElementById('trip-city-toggle'),
        dropdown: document.getElementById('trip-city-dropdown'),
        search: document.getElementById('trip-city-search'),
        options: document.getElementById('trip-city-options')
    };
}

function closeTripCityDropdown() {
    const { toggle, dropdown } = getTripCityPickerEls();
    if (!toggle || !dropdown) return;
    dropdown.classList.add('is-collapsed');
    toggle.setAttribute('aria-expanded', 'false');
}

function updateTripCityToggleLabel() {
    const { toggle, select } = getTripCityPickerEls();
    if (!(select instanceof HTMLSelectElement) || !toggle) return;
    const selected = [...select.selectedOptions].map(o => o.value).filter(Boolean);
    if (!select.options.length) {
        toggle.textContent = 'Şehir verisi hazırlanıyor';
        toggle.disabled = true;
        return;
    }
    toggle.disabled = false;
    if (!selected.length) {
        toggle.textContent = 'Şehir seç';
        return;
    }
    if (selected.length === 1) {
        toggle.textContent = selected[0];
        return;
    }
    toggle.textContent = `${selected.length} şehir seçildi`;
}

function renderTripCityCheckboxList() {
    const { select, options, search } = getTripCityPickerEls();
    if (!(select instanceof HTMLSelectElement) || !options) return;

    const query = normalizeText(search?.value || '');
    const allCities = [...select.options].map(o => o.value).filter(Boolean);
    const filteredCities = allCities.filter(city => !query || normalizeText(city).includes(query));

    if (!allCities.length) {
        options.innerHTML = '<div class="trip-city-empty">Şehir verisi hazırlanıyor</div>';
        updateTripCityToggleLabel();
        return;
    }

    if (!filteredCities.length) {
        options.innerHTML = '<div class="trip-city-empty">Aramaya uygun şehir bulunamadı</div>';
        updateTripCityToggleLabel();
        return;
    }

    const selectedSet = new Set(getSelectedTripCities());
    options.innerHTML = filteredCities.map((city, index) => `
        <label class="trip-city-check" for="trip-city-check-${index}">
            <input id="trip-city-check-${index}" type="checkbox" value="${city}" ${selectedSet.has(city) ? 'checked' : ''}>
            <span>${city}</span>
        </label>
    `).join('');

    options.querySelectorAll('input[type="checkbox"]').forEach(input => {
        input.addEventListener('change', e => {
            const target = e.currentTarget;
            const option = [...select.options].find(o => o.value === target.value);
            if (option) option.selected = target.checked;

            const selectedCount = [...select.selectedOptions].length;
            if (selectedCount === 0 && select.options.length) {
                select.options[0].selected = true;
                const firstCheckbox = options.querySelector(`input[type="checkbox"][value="${CSS.escape(select.options[0].value)}"]`);
                if (firstCheckbox) firstCheckbox.checked = true;
            }

            syncTripCitySummary();
            renderHomeTripPlanner(PASAPORT_DATA);
        });
    });

    updateTripCityToggleLabel();
}

function setupTripCityPickerUi() {
    if (tripCityPickerSetupDone) return;
    const { toggle, dropdown, search, options } = getTripCityPickerEls();
    if (!toggle || !dropdown || !search || !options) return;

    toggle.addEventListener('click', () => {
        const willOpen = dropdown.classList.contains('is-collapsed');
        if (willOpen) {
            dropdown.classList.remove('is-collapsed');
            toggle.setAttribute('aria-expanded', 'true');
            renderTripCityCheckboxList();
            setTimeout(() => search.focus(), 0);
        } else {
            closeTripCityDropdown();
        }
    });

    search.addEventListener('input', () => renderTripCityCheckboxList());

    document.addEventListener('click', e => {
        const field = toggle.closest('.trip-field');
        if (!field) return;
        if (field.contains(e.target)) return;
        closeTripCityDropdown();
    });

    document.addEventListener('keydown', e => {
        if (e.key === 'Escape') closeTripCityDropdown();
    });

    tripCityPickerSetupDone = true;
}

function syncTripCitySummary() {
    const citySummary = document.getElementById('trip-city-summary');
    if (!citySummary) return;
    const selected = getSelectedTripCities();
    citySummary.textContent = selected.length ? `Seçilen: ${selected.join(', ')}` : 'Seçilen: yok';
    updateTripCityToggleLabel();
}

function updateTripShareableUrl(originCode, destinationCode, selectedCities, days) {
    const params = new URLSearchParams(window.location.search);
    if (originCode) params.set('from', originCode);
    else params.delete('from');

    if (destinationCode) params.set('to', destinationCode);
    else params.delete('to');

    if (selectedCities.length) params.set('city', selectedCities.join(','));
    else params.delete('city');

    params.set('days', String(days));
    const next = `${window.location.pathname}?${params.toString()}`;
    window.history.replaceState({}, '', next);
}

function applyTripParamsFromUrl(data) {
    const params = new URLSearchParams(window.location.search);
    const from = String(params.get('from') || '').toUpperCase();
    const to = String(params.get('to') || '').toUpperCase();
    const cityParam = params.get('city') || '';
    const daysParam = Number(params.get('days') || '');
    const selectedCities = cityParam.split(',').map(item => item.trim()).filter(Boolean);

    const origin = findCountryByCode(data, from);
    const destination = findCountryByCode(data, to);
    const originEl = document.getElementById('trip-origin');
    const destinationEl = document.getElementById('trip-destination');

    if (origin && originEl) originEl.value = origin.kod;
    if (destination && destinationEl) destinationEl.value = destination.kod;

    const targetDestinationCode = destination?.kod || destinationEl?.value || 'DE';
    renderTripCityOptions(targetDestinationCode, selectedCities);

    const daysInput = document.getElementById('trip-days');
    if (daysInput && Number.isFinite(daysParam) && daysParam >= 1 && daysParam <= 60) {
        daysInput.value = String(Math.round(daysParam));
    }
}

function renderHomeTripPlanner(data) {
    const resultEl = document.getElementById('trip-result');
    const originCode = document.getElementById('trip-origin')?.value || '';
    const destinationCode = document.getElementById('trip-destination')?.value || '';
    const selectedCities = getSelectedTripCities();
    const primaryCity = selectedCities[0] || '';
    const tripDays = getTripSelectedDays();

    if (!resultEl) return;
    const origin = findCountryByCode(data, originCode);
    const destination = findCountryByCode(data, destinationCode);

    if (!origin || !destination) {
        resultEl.innerHTML = '<h3>Rota Özeti</h3><p>Ülkeleri seçip rotayı analiz edin.</p>';
        return;
    }
    if (origin.kod === destination.kod) {
        resultEl.innerHTML = '<h3>Rota Özeti</h3><p>Aynı ülke seçildi. Lütfen farklı bir hedef ülke seçin.</p>';
        return;
    }

    const status = getTripVisaStatus(origin, destination);
    const statusMap = {
        vizesiz: { text: 'Vizesiz geçiş', cls: 'status-vizesiz' },
        varista: { text: 'Varışta vize', cls: 'status-varista' },
        evize: { text: 'E-vize gerekli', cls: 'status-evize' },
        vize: { text: 'Önceden vize gerekli', cls: 'status-vize' },
        unknown: { text: 'Durum doğrulanamadı', cls: 'status-vize' }
    };
    const selected = statusMap[status] || statusMap.unknown;
    const scoreMeta = getTripScoreMeta(status || 'unknown');
    const destinationLabel = primaryCity ? `${primaryCity}, ${destination.ulke}` : destination.ulke;
    const cityLine = selectedCities.length ? selectedCities.join(', ') : 'Şehir seçimi yapılmadı';
    const checklist = getTripChecklist(status || 'unknown', destination.ulke);
    const requiredDocs = getTripRequiredDocs(status || 'unknown', destination.ulke);
    const checklistHtml = checklist.map(item => `<li>${item}</li>`).join('');
    const docsHtml = requiredDocs.map(item => `<li>${item}</li>`).join('');
    const etaText = getTripProcessEta(status || 'unknown');
    const visaFeeUsd = getTripVisaFeeUsd(status || 'unknown');
    const dailyUsd = getTripDailyEstimateUsd(destination.kod);
    const totalUsd = visaFeeUsd + dailyUsd * tripDays;
    const flightsQuery = encodeURIComponent(`${origin.ulke} ${destinationLabel} uçuş`);
    const hotelQuery = encodeURIComponent(destinationLabel);
    const visaQuery = encodeURIComponent(`${origin.ulke} vatandaşları ${destination.ulke} vize şartları`);

    updateTripShareableUrl(origin.kod, destination.kod, selectedCities, tripDays);
    const shareUrl = window.location.href;

    resultEl.innerHTML = `
        <div class="trip-result-top">
            <h3>🧭 ${origin.bayrak} ${origin.ulke} -> ${destination.bayrak} ${destinationLabel}</h3>
            <span class="planner-status ${selected.cls}">${selected.text}</span>
        </div>
        <div class="trip-kpi-row">
            <div class="trip-kpi ${scoreMeta.cls}">
                <span>⭐ Rota Skoru</span>
                <strong>${scoreMeta.score}/100</strong>
            </div>
            <div class="trip-kpi">
                <span>🧾 Hazırlık Seviyesi</span>
                <strong>${scoreMeta.level}</strong>
            </div>
            <div class="trip-kpi">
                <span>🏙️ Seçilen Şehirler</span>
                <strong>${cityLine}</strong>
            </div>
        </div>
        <div class="trip-detail-grid">
            <section class="trip-detail-card">
                <h4>📁 Gerekli Evraklar</h4>
                <ul class="planner-checklist">${docsHtml}</ul>
            </section>
            <section class="trip-detail-card">
                <h4>⏱️ Tahmini Süreç</h4>
                <p class="trip-eta">${etaText}</p>
                <ul class="planner-checklist">${checklistHtml}</ul>
            </section>
            <section class="trip-detail-card trip-detail-cost">
                <h4>💳 Mini Maliyet Özeti (${tripDays} gün)</h4>
                <div class="trip-cost-line"><span>Vize ücreti (tahmini)</span><strong>$${visaFeeUsd}</strong></div>
                <div class="trip-cost-line"><span>Günlük gider (tahmini)</span><strong>$${dailyUsd}</strong></div>
                <div class="trip-cost-line"><span>Toplam tahmini bütçe</span><strong>$${totalUsd}</strong></div>
                <p class="trip-cost-note">Not: Değerler şehir/seyahat tarzına göre değişebilir.</p>
            </section>
        </div>
        <div class="planner-links">
            <a href="https://www.google.com/travel/flights?q=${flightsQuery}" target="_blank" rel="noopener noreferrer">Uçuş Ara</a>
            <a href="https://www.booking.com/searchresults.tr.html?ss=${hotelQuery}" target="_blank" rel="noopener noreferrer">Konaklama Ara</a>
            <a href="https://www.google.com/search?q=${visaQuery}" target="_blank" rel="noopener noreferrer">Vize Kaynakları</a>
            <a href="${getCountryDetailUrl(destination.kod)}" target="_blank" rel="noopener noreferrer">Ülke Detayı</a>
        </div>
        <div class="trip-share-row">
            <button type="button" class="trip-share-btn" id="trip-share-btn" data-url="${shareUrl}">🔗 Sonucu Kopyala</button>
            <span class="trip-share-note">Bu buton aynı rota sonucunu başkasıyla paylaşmak içindir.</span>
        </div>
    `;

    const shareBtn = document.getElementById('trip-share-btn');
    shareBtn?.addEventListener('click', async () => {
        const url = shareBtn.dataset.url || '';
        if (!url) return;
        try {
            await navigator.clipboard.writeText(url);
            shareBtn.textContent = '✅ Bağlantı Kopyalandı';
            setTimeout(() => {
                shareBtn.textContent = '🔗 Sonucu Kopyala';
            }, 1800);
        } catch {
            window.prompt('Bağlantıyı kopyalayın:', url);
        }
    });
}

function setupTripPlannerSelects(data) {
    if (tripPlannerSetupDone) return;
    const originEl = document.getElementById('trip-origin');
    const destinationEl = document.getElementById('trip-destination');
    if (!originEl || !destinationEl) return;

    const sorted = [...data].sort((a, b) => a.ulke.localeCompare(b.ulke, 'tr'));
    const options = '<option value="">Ülke seçin</option>' + sorted.map(item => `
        <option value="${item.kod}">${item.bayrak} ${item.ulke}</option>
    `).join('');
    originEl.innerHTML = options;
    destinationEl.innerHTML = options;
    originEl.value = 'TR';
    destinationEl.value = 'DE';
    tripPlannerSetupDone = true;
    setupTripCityPickerUi();
    renderTripCityOptions('DE', []);
}

function getTripCityOptionsByCode(code) {
    const key = String(code || '').toUpperCase();
    if (TRIP_CITY_OPTIONS[key]) return TRIP_CITY_OPTIONS[key];

    const capital = countryMetaByIso2?.[key]?.capital;
    if (capital) {
        return [capital];
    }

    return [];
}

function renderTripCityOptions(destinationCode, selectedCities) {
    const citySelect = document.getElementById('trip-city-select');
    if (!(citySelect instanceof HTMLSelectElement)) return;
    setupTripCityPickerUi();
    const { search } = getTripCityPickerEls();
    const cities = getTripCityOptionsByCode(destinationCode);
    citySelect.disabled = !cities.length;
    const selectedSet = new Set(Array.isArray(selectedCities) ? selectedCities : []);
    if (!cities.length) {
        citySelect.innerHTML = '';
        if (search) search.value = '';
        renderTripCityCheckboxList();
        syncTripCitySummary();
        return;
    }
    citySelect.innerHTML = cities.map(city => {
        const selected = selectedSet.size ? selectedSet.has(city) : false;
        return `<option value="${city}" ${selected ? 'selected' : ''}>${city}</option>`;
    }).join('');
    const selectedCount = [...citySelect.options].filter(option => option.selected).length;
    if ((selectedCount === 0) && citySelect.options.length) {
        citySelect.options[0].selected = true;
    }
    if (search) search.value = '';
    renderTripCityCheckboxList();
    syncTripCitySummary();
}

function setupLazyTripPlanner(data) {
    const section = document.getElementById('rota-planlayici');
    const trigger = () => {
        setupTripPlannerSelects(data);
        applyTripParamsFromUrl(data);
        renderHomeTripPlanner(data);
        preloadCountryMeta().then(() => {
            const destinationCode = document.getElementById('trip-destination')?.value || '';
            if (destinationCode) renderTripCityOptions(destinationCode, getSelectedTripCities());
        });
        if (visaLoadState === 'idle') {
            preloadVisaDataset(data).then(() => renderHomeTripPlanner(data));
        }
    };

    if (!section) {
        trigger();
        return;
    }

    const observer = new IntersectionObserver(entries => {
        const visible = entries.some(entry => entry.isIntersecting);
        if (!visible) return;
        observer.disconnect();
        trigger();
    }, { rootMargin: '220px 0px' });
    observer.observe(section);

    document.getElementById('trip-origin')?.addEventListener('focus', trigger, { once: true });
    document.getElementById('trip-destination')?.addEventListener('focus', trigger, { once: true });
}

function renderPassportGrid(data) {
    const grid = document.getElementById('passport-grid');
    if (!grid) return;
    grid.innerHTML = '';
    let index = 0;
    const chunkSize = 24;

    const renderChunk = () => {
        const slice = data.slice(index, index + chunkSize);
        if (!slice.length) return;
        grid.insertAdjacentHTML('beforeend', slice.map(d => `
            <article class="passport-card" data-code="${d.kod}" tabindex="0" aria-label="${d.ulke} pasaportu, puan: ${d.puan}">
                <span class="rank-badge">#${d.sira}</span>
                <span class="flag">${d.bayrak}</span>
                <span class="country-name">${d.ulke}</span>
                <span class="score">${d.puan}</span>
                <a class="country-detail-link" href="${getCountryDetailUrl(d.kod)}" aria-label="${d.ulke} detay sayfasini ac">Detay</a>
            </article>
        `).join(''));
        index += chunkSize;
        if (index < data.length) {
            requestAnimationFrame(renderChunk);
        }
    };

    renderChunk();
}

function renderRankingTable(data) {
    const tbody = document.getElementById('ranking-body');
    if (!tbody) return;
    tbody.innerHTML = '';
    let index = 0;
    const chunkSize = 30;

    const renderChunk = () => {
        const slice = data.slice(index, index + chunkSize);
        if (!slice.length) return;
        tbody.insertAdjacentHTML('beforeend', slice.map(d => `
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
        `).join(''));
        index += chunkSize;
        if (index < data.length) requestAnimationFrame(renderChunk);
    };

    renderChunk();
}

function fillSelects(data) {
    if (!mapSelectFilled) {
        const mapSelect = document.getElementById('map-country-select');
        if (mapSelect) {
            data.forEach(d => {
                const opt = document.createElement('option');
                opt.value = d.kod;
                opt.textContent = d.bayrak + ' ' + d.ulke;
                mapSelect.appendChild(opt);
            });
            mapSelect.value = 'TR';
            mapSelectFilled = true;
        }
    }
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

function setupLazyMap(data) {
    if (mapInitStarted) return;
    const section = document.getElementById('harita');
    const select = document.getElementById('map-country-select');

    const triggerMapInit = () => {
        if (mapInitStarted) return;
        mapInitStarted = true;
        fillSelects(data);
        setMapDataStatus('Harita motoru yukleniyor...', 'loading');
        loadExternalScript(LEAFLET_JS_URL, 'L')
            .then(() => initMap(data))
            .catch(err => {
                console.warn(err);
                setMapDataStatus('Harita yuklenemedi.', 'warn');
            });
    };

    if (section) {
        const observer = new IntersectionObserver(entries => {
            const visible = entries.some(entry => entry.isIntersecting);
            if (!visible) return;
            observer.disconnect();
            triggerMapInit();
        }, { rootMargin: '260px 0px' });
        observer.observe(section);
    }

    select?.addEventListener('focus', triggerMapInit, { once: true });
    select?.addEventListener('pointerdown', triggerMapInit, { once: true });
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

    renderTurkeyChart(tr);
}

function renderTurkeyChart(tr) {
    const ctx = document.getElementById('turkey-chart');
    if (!ctx || typeof Chart === 'undefined' || ctx.dataset.ready === '1') return;

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
    ctx.dataset.ready = '1';
}

function setupLazyTurkeyChart(tr) {
    if (turkeyChartStarted) return;
    const section = document.getElementById('turkiye');
    if (!section) return;

    const triggerChart = () => {
        if (turkeyChartStarted) return;
        turkeyChartStarted = true;
        loadExternalScript(CHART_JS_URL, 'Chart')
            .then(() => renderTurkeyChart(tr))
            .catch(err => console.warn(err));
    };

    const observer = new IntersectionObserver(entries => {
        const visible = entries.some(entry => entry.isIntersecting);
        if (!visible) return;
        observer.disconnect();
        triggerChart();
    }, { rootMargin: '240px 0px' });
    observer.observe(section);
}

function initEventListeners(data) {
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            passportFilterState.mode = btn.dataset.filter || 'all';
            passportFilterState.limit = passportFilterState.step;
            applyPassportFilters(data);
        });
    });

    document.getElementById('passport-search')?.addEventListener('input', e => {
        passportFilterState.search = e.target.value || '';
        passportFilterState.limit = passportFilterState.step;
        applyPassportFilters(data);
    });

    document.getElementById('passport-region')?.addEventListener('change', e => {
        passportFilterState.region = e.target.value || 'all';
        passportFilterState.limit = passportFilterState.step;
        applyPassportFilters(data);
    });

    document.getElementById('passport-sort')?.addEventListener('change', e => {
        passportFilterState.sort = e.target.value || 'rank';
        applyPassportFilters(data);
    });

    document.getElementById('passport-load-more')?.addEventListener('click', () => {
        passportFilterState.limit += passportFilterState.step;
        applyPassportFilters(data);
    });

    document.getElementById('ranking-search')?.addEventListener('input', e => {
        rankingFilterState.search = e.target.value || '';
        if (rankingFilterState.limit !== 'all') {
            rankingFilterState.limit = 20;
            const limitEl = document.getElementById('ranking-limit');
            if (limitEl) limitEl.value = '20';
        }
        applyRankingFilters(data);
    });

    document.getElementById('ranking-region')?.addEventListener('change', e => {
        rankingFilterState.region = e.target.value || 'all';
        if (rankingFilterState.limit !== 'all') {
            rankingFilterState.limit = 20;
            const limitEl = document.getElementById('ranking-limit');
            if (limitEl) limitEl.value = '20';
        }
        applyRankingFilters(data);
    });

    document.getElementById('ranking-limit')?.addEventListener('change', e => {
        const value = e.target.value || '20';
        rankingFilterState.limit = value === 'all' ? 'all' : Number(value);
        applyRankingFilters(data);
    });

    document.getElementById('ranking-load-more')?.addEventListener('click', () => {
        const limitEl = document.getElementById('ranking-limit');
        if (limitEl) limitEl.value = 'all';
        rankingFilterState.limit = 'all';
        applyRankingFilters(data);
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
        if (!countryMetaByIso2) {
            preloadCountryMeta().then(() => applyCompareFilters(data));
            return;
        }
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

    document.getElementById('trip-origin')?.addEventListener('change', () => {
        renderHomeTripPlanner(data);
    });
    document.getElementById('trip-destination')?.addEventListener('change', () => {
        const destinationCode = document.getElementById('trip-destination')?.value || '';
        renderTripCityOptions(destinationCode, []);
        renderHomeTripPlanner(data);
    });
    document.getElementById('trip-city-select')?.addEventListener('change', () => {
        syncTripCitySummary();
        renderHomeTripPlanner(data);
    });
    document.getElementById('trip-days')?.addEventListener('input', () => {
        renderHomeTripPlanner(data);
    });
    document.getElementById('trip-run')?.addEventListener('click', () => {
        if (visaLoadState === 'idle') {
            preloadVisaDataset(data).then(() => renderHomeTripPlanner(data));
        }
        renderHomeTripPlanner(data);
        document.getElementById('trip-result')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
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
                stabilizeSectionScroll(target);
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
