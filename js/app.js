// Pasaport Endeksi - Ana Uygulama
const GEOJSON_URL = 'https://raw.githubusercontent.com/datasets/geo-countries/master/data/countries.geojson';
const VISA_CSV_URL = 'https://raw.githubusercontent.com/ilyankou/passport-index-dataset/master/passport-index-tidy-iso3.csv';
const COUNTRIES_META_URL = 'https://raw.githubusercontent.com/annexare/Countries/master/dist/countries.min.json';
const LEAFLET_JS_URL = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js';
const CHART_JS_URL = 'https://cdn.jsdelivr.net/npm/chart.js@4.4.0/dist/chart.umd.min.js';
const TRIP_CITY_OPTIONS = {
    TR: ['İstanbul', 'Ankara', 'İzmir', 'Antalya', 'Kapadokya', 'Bodrum'],
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
let map, geoLayer, geoData = null;
let visaMatrixByPassportIso3 = null;
let visaLoadState = 'idle';
let countryMetaByIso2 = null;
const compareFilterState = { search: '', region: 'all', sort: 'rank' };
let tripPlannerSetupDone = false;
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
        renderPassportGrid(data, 'all');
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
        renderRankingTable(data);
        rankingRendered = true;
        return;
    }

    const renderAll = () => {
        if (rankingRendered) return;
        renderRankingInfo(data);
        renderSourceComparison();
        renderRankingTable(data);
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

function renderHomeTripPlanner(data) {
    const resultEl = document.getElementById('trip-result');
    const originCode = document.getElementById('trip-origin')?.value || '';
    const destinationCode = document.getElementById('trip-destination')?.value || '';
    const cityRaw = document.getElementById('trip-city')?.value || '';
    const city = cityRaw.trim();

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
    const destinationLabel = city ? `${city}, ${destination.ulke}` : destination.ulke;
    const checklist = getTripChecklist(status || 'unknown', destination.ulke);
    const checklistHtml = checklist.map(item => `<li>${item}</li>`).join('');
    const flightsQuery = encodeURIComponent(`${origin.ulke} ${destinationLabel} uçuş`);
    const hotelQuery = encodeURIComponent(destinationLabel);
    const visaQuery = encodeURIComponent(`${origin.ulke} vatandaşları ${destination.ulke} vize şartları`);

    resultEl.innerHTML = `
        <h3>${origin.bayrak} ${origin.ulke} -> ${destination.bayrak} ${destinationLabel}</h3>
        <span class="planner-status ${selected.cls}">${selected.text}</span>
        <ul class="planner-checklist">${checklistHtml}</ul>
        <div class="planner-links">
            <a href="https://www.google.com/travel/flights?q=${flightsQuery}" target="_blank" rel="noopener noreferrer">Uçuş Ara</a>
            <a href="https://www.booking.com/searchresults.tr.html?ss=${hotelQuery}" target="_blank" rel="noopener noreferrer">Konaklama Ara</a>
            <a href="https://www.google.com/search?q=${visaQuery}" target="_blank" rel="noopener noreferrer">Vize Kaynakları</a>
            <a href="${getCountryDetailUrl(destination.kod)}" target="_blank" rel="noopener noreferrer">Ülke Detayı</a>
        </div>
    `;
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
    renderTripCityOptions('DE');
}

function getTripCityOptionsByCode(code) {
    const key = String(code || '').toUpperCase();
    if (TRIP_CITY_OPTIONS[key]) return TRIP_CITY_OPTIONS[key];

    const capital = countryMetaByIso2?.[key]?.capital;
    if (capital) {
        return [capital];
    }

    return ['Şehir verisi hazırlanıyor'];
}

function renderTripCityOptions(destinationCode) {
    const optionsEl = document.getElementById('trip-city-options');
    if (!optionsEl) return;

    const cities = getTripCityOptionsByCode(destinationCode);
    optionsEl.innerHTML = cities.map((city, index) => `
        <label class="trip-city-pill">
            <input type="checkbox" name="trip-city-checkbox" value="${city}" ${index === 0 ? 'checked' : ''}>
            <span>${city}</span>
        </label>
    `).join('');

    const cityInput = document.getElementById('trip-city');
    if (cityInput) cityInput.value = cities[0] || '';
}

function setupLazyTripPlanner(data) {
    const section = document.getElementById('rota-planlayici');
    const trigger = () => {
        setupTripPlannerSelects(data);
        renderHomeTripPlanner(data);
        preloadCountryMeta().then(() => {
            const destinationCode = document.getElementById('trip-destination')?.value || '';
            if (destinationCode) renderTripCityOptions(destinationCode);
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

function renderPassportGrid(data, filter) {
    const grid = document.getElementById('passport-grid');
    if (!grid) return;
    let filtered = [...data];
    if (filter === 'top-20') filtered = filtered.slice(0, 20);
    else if (filter === 'visa-free') filtered = filtered.filter(d => d.vizesiz >= 100);
    grid.innerHTML = '';
    let index = 0;
    const chunkSize = 24;

    const renderChunk = () => {
        const slice = filtered.slice(index, index + chunkSize);
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
        if (index < filtered.length) {
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
        renderTripCityOptions(destinationCode);
        renderHomeTripPlanner(data);
    });
    document.getElementById('trip-city-options')?.addEventListener('change', e => {
        const target = e.target;
        if (!(target instanceof HTMLInputElement) || target.name !== 'trip-city-checkbox') return;
        document.querySelectorAll('input[name="trip-city-checkbox"]').forEach(input => {
            if (input !== target) input.checked = false;
        });
        if (!target.checked) {
            target.checked = true;
        }
        const cityInput = document.getElementById('trip-city');
        if (cityInput) cityInput.value = target.value || '';
        renderHomeTripPlanner(data);
    });
    document.getElementById('trip-city')?.addEventListener('input', () => {
        const typed = document.getElementById('trip-city')?.value?.trim() || '';
        if (typed) {
            document.querySelectorAll('input[name="trip-city-checkbox"]').forEach(input => {
                input.checked = false;
            });
        }
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
