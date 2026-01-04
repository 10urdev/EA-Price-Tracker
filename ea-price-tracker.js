require('dotenv').config();
const { request, ProxyAgent } = require('undici');
const readline = require('readline');

// Proxy Listesi (Global - 89 Ülke)
const baseProxies = [
    // --- AVRUPA ---
    { name: 'Arnavutluk', code: 'al', locale: 'en-US', currency: 'EUR' },
    { name: 'Avusturya', code: 'at', locale: 'de-AT', currency: 'EUR' },
    { name: 'Belçika', code: 'be', locale: 'fr-BE', currency: 'EUR' },
    { name: 'Bosna', code: 'ba', locale: 'en-US', currency: 'EUR' },
    { name: 'Bulgaristan', code: 'bg', locale: 'bg-BG', currency: 'BGN' },
    { name: 'Hırvatistan', code: 'hr', locale: 'en-US', currency: 'EUR' },
    { name: 'Kıbrıs', code: 'cy', locale: 'en-US', currency: 'EUR' },
    { name: 'Çekya', code: 'cz', locale: 'cs-CZ', currency: 'CZK' },
    { name: 'Danimarka', code: 'dk', locale: 'da-DK', currency: 'DKK' },
    { name: 'Estonya', code: 'ee', locale: 'en-US', currency: 'EUR' },
    { name: 'Finlandiya', code: 'fi', locale: 'fi-FI', currency: 'EUR' },
    { name: 'Fransa', code: 'fr', locale: 'fr-FR', currency: 'EUR' },
    { name: 'Almanya', code: 'de', locale: 'de-DE', currency: 'EUR' },
    { name: 'Yunanistan', code: 'gr', locale: 'en-US', currency: 'EUR' },
    { name: 'Macaristan', code: 'hu', locale: 'hu-HU', currency: 'HUF' },
    { name: 'İzlanda', code: 'is', locale: 'en-US', currency: 'EUR' },
    { name: 'İrlanda', code: 'ie', locale: 'en-IE', currency: 'EUR' },
    { name: 'İtalya', code: 'it', locale: 'it-IT', currency: 'EUR' },
    { name: 'Letonya', code: 'lv', locale: 'en-US', currency: 'EUR' },
    { name: 'Litvanya', code: 'lt', locale: 'en-US', currency: 'EUR' },
    { name: 'Lüksemburg', code: 'lu', locale: 'fr-LU', currency: 'EUR' },
    { name: 'Malta', code: 'mt', locale: 'en-US', currency: 'EUR' },
    { name: 'Hollanda', code: 'nl', locale: 'nl-NL', currency: 'EUR' },
    { name: 'Norveç', code: 'no', locale: 'no-NO', currency: 'NOK' },
    { name: 'Polonya', code: 'pl', locale: 'pl-PL', currency: 'PLN' },
    { name: 'Portekiz', code: 'pt', locale: 'pt-PT', currency: 'EUR' },
    { name: 'Romanya', code: 'ro', locale: 'ro-RO', currency: 'RON' },
    { name: 'Slovakya', code: 'sk', locale: 'en-US', currency: 'EUR' },
    { name: 'Slovenya', code: 'si', locale: 'en-US', currency: 'EUR' },
    { name: 'İspanya', code: 'es', locale: 'es-ES', currency: 'EUR' },
    { name: 'İsveç', code: 'se', locale: 'sv-SE', currency: 'SEK' },
    { name: 'İsviçre', code: 'ch', locale: 'de-CH', currency: 'CHF' },
    { name: 'İngiltere', code: 'gb', locale: 'en-GB', currency: 'GBP' },

    // --- AMERİKA ---
    { name: 'Kanada', code: 'ca', locale: 'en-CA', currency: 'CAD' },
    { name: 'ABD', code: 'us', locale: 'en-US', currency: 'USD' },
    { name: 'Meksika', code: 'mx', locale: 'es-MX', currency: 'USD' },
    { name: 'Brezilya', code: 'br', locale: 'pt-BR', currency: 'BRL' },
    { name: 'Arjantin', code: 'ar', locale: 'es-AR', currency: 'USD' },
    { name: 'Şili', code: 'cl', locale: 'es-CL', currency: 'CLP' },
    { name: 'Kolombiya', code: 'co', locale: 'es-CO', currency: 'COP' },
    { name: 'Peru', code: 'pe', locale: 'es-PE', currency: 'PEN' },
    { name: 'Uruguay', code: 'uy', locale: 'es-UY', currency: 'UYU' },
    { name: 'Paraguay', code: 'py', locale: 'es-PY', currency: 'PYG' },
    { name: 'Bolivya', code: 'bo', locale: 'es-BO', currency: 'BOB' },
    { name: 'Kosta Rika', code: 'cr', locale: 'es-CR', currency: 'CRC' },
    { name: 'Ekvador', code: 'ec', locale: 'es-EC', currency: 'USD' },
    { name: 'Guatemala', code: 'gt', locale: 'es-GT', currency: 'GTQ' },
    { name: 'Panama', code: 'pa', locale: 'es-PA', currency: 'USD' },

    // --- ASYA & PASİFİK ---
    { name: 'Avustralya', code: 'au', locale: 'en-AU', currency: 'AUD' },
    { name: 'Yeni Zelanda', code: 'nz', locale: 'en-NZ', currency: 'NZD' },
    { name: 'Japonya', code: 'jp', locale: 'ja-JP', currency: 'JPY' },
    { name: 'Güney Kore', code: 'kr', locale: 'ko-KR', currency: 'KRW' },
    { name: 'Tayvan', code: 'tw', locale: 'zh-TW', currency: 'TWD' },
    { name: 'Hong Kong', code: 'hk', locale: 'en-HK', currency: 'HKD' },
    { name: 'Çin', code: 'cn', locale: 'zh-CN', currency: 'CNY' },
    { name: 'Hindistan', code: 'in', locale: 'en-IN', currency: 'INR' },
    { name: 'Endonezya', code: 'id', locale: 'en-ID', currency: 'IDR' },
    { name: 'Malezya', code: 'my', locale: 'en-MY', currency: 'MYR' },
    { name: 'Filipinler', code: 'ph', locale: 'en-PH', currency: 'PHP' },
    { name: 'Singapur', code: 'sg', locale: 'en-SG', currency: 'SGD' },
    { name: 'Tayland', code: 'th', locale: 'en-TH', currency: 'THB' },
    { name: 'Vietnam', code: 'vn', locale: 'en-VN', currency: 'VND' },
    { name: 'Pakistan', code: 'pk', locale: 'en-US', currency: 'PKR' },
    { name: 'Bangladeş', code: 'bd', locale: 'en-US', currency: 'BDT' },
    { name: 'Sri Lanka', code: 'lk', locale: 'en-US', currency: 'LKR' },
    { name: 'Nepal', code: 'np', locale: 'en-US', currency: 'NPR' },
    { name: 'Kamboçya', code: 'kh', locale: 'en-US', currency: 'USD' },

    // --- ORTA DOĞU & AFRİKA ---
    { name: 'Türkiye', code: 'tr', locale: 'tr-TR', currency: 'USD' },
    { name: 'İsrail', code: 'il', locale: 'he-IL', currency: 'ILS' },
    { name: 'Suudi Arabistan', code: 'sa', locale: 'ar-SA', currency: 'SAR' },
    { name: 'BAE', code: 'ae', locale: 'ar-AE', currency: 'AED' },
    { name: 'Katar', code: 'qa', locale: 'ar-QA', currency: 'QAR' },
    { name: 'Kuveyt', code: 'kw', locale: 'ar-KW', currency: 'KWD' },
    { name: 'Umman', code: 'om', locale: 'ar-OM', currency: 'OMR' },
    { name: 'Bahreyn', code: 'bh', locale: 'ar-BH', currency: 'BHD' },
    { name: 'Mısır', code: 'eg', locale: 'en-US', currency: 'EGP' },
    { name: 'Güney Afrika', code: 'za', locale: 'en-ZA', currency: 'ZAR' },
    { name: 'Nijerya', code: 'ng', locale: 'en-NG', currency: 'NGN' },
    { name: 'Kenya', code: 'ke', locale: 'en-KE', currency: 'KES' },
    { name: 'Gana', code: 'gh', locale: 'en-GH', currency: 'GHS' },
    { name: 'Fas', code: 'ma', locale: 'fr-MA', currency: 'MAD' },
    { name: 'Cezayir', code: 'dz', locale: 'fr-DZ', currency: 'DZD' },

    // --- CIS & DİĞER ---
    { name: 'Ukrayna', code: 'ua', locale: 'en-US', currency: 'UAH' },
    { name: 'Kazakistan', code: 'kz', locale: 'ru-KZ', currency: 'KZT' },
    { name: 'Özbekistan', code: 'uz', locale: 'ru-RU', currency: 'UZS' },
    { name: 'Azerbaycan', code: 'az', locale: 'en-US', currency: 'AZN' },
    { name: 'Gürcistan', code: 'ge', locale: 'en-US', currency: 'GEL' },
    { name: 'Moldova', code: 'md', locale: 'en-US', currency: 'MDL' },
    { name: 'Ermenistan', code: 'am', locale: 'en-US', currency: 'AMD' }
];

const PROXY_TEMPLATE = process.env.EARTH_PROXY_URL;
if (!PROXY_TEMPLATE) {
    console.error("❌ Hata: '.env' dosyasında 'EARTH_PROXY_URL' tanımlı değil!");
    process.exit(1);
}

// Proxy URL Oluşturucu
const proxies = baseProxies.map(p => ({
    ...p,
    url: PROXY_TEMPLATE.replace('COUNTRY_CODE', p.code)
}));

const EA_GRAPHQL_URL = 'https://service-aggregation-layer.juno.ea.com/graphql';

let rates = { USD: 1, TRY: 30 };
let successfulResults = [];
let failedCountries = [];
let completedCount = 0;
const totalCount = proxies.length;
const showFullList = process.argv.includes('--full');

// Spinner
let spinnerInterval;
const frames = ['⠋', '⠙', '⠹', '⠸', '⠼', '⠴', '⠦', '⠧', '⠇', '⠏'];
function startSpinner() {
    let i = 0;
    process.stdout.write('\x1B[?25l');
    spinnerInterval = setInterval(() => {
        const frame = frames[i = (i + 1) % frames.length];
        const percent = Math.round((completedCount / totalCount) * 100);
        readline.cursorTo(process.stdout, 0);
        process.stdout.write(`${frame} Veriler çekiliyor... %${percent} (${completedCount}/${totalCount}) Tamamlandı`);
    }, 80);
}
function stopSpinner() {
    clearInterval(spinnerInterval);
    readline.cursorTo(process.stdout, 0);
    readline.clearLine(process.stdout, 0);
    process.stdout.write('\x1B[?25h');
}

async function fetchExchangeRates() {
    try {
        const controller = new AbortController();
        setTimeout(() => controller.abort(), 10000);
        process.stdout.write('💱 Döviz kurları güncelleniyor... ');
        const { body } = await request('https://open.er-api.com/v6/latest/USD', { signal: controller.signal });
        const data = await body.json();
        if (data && data.rates) {
            rates = data.rates;
            console.log(`✅ (1 USD = ${rates.TRY.toFixed(2)} TRY)\n`);
        }
    } catch (error) {
        console.log('❌ Başarısız (Varsayılan kullanılıyor)\n');
    }
}

function parsePriceString(priceStr) {
    if (!priceStr) return 0;
    const match = priceStr.match(/[\d][\d.,\s]*[\d]|\d+/);
    if (!match) return 0;
    let clean = match[0].replace(/\s/g, '');
    const lastDotIndex = clean.lastIndexOf('.');
    const lastCommaIndex = clean.lastIndexOf(',');
    const lastSeparatorIndex = Math.max(lastDotIndex, lastCommaIndex);
    let integerPart = clean;
    let decimalPart = '0';
    if (lastSeparatorIndex !== -1) {
        const charsAfterSeparator = clean.length - lastSeparatorIndex - 1;
        if (charsAfterSeparator === 2) {
            integerPart = clean.substring(0, lastSeparatorIndex);
            decimalPart = clean.substring(lastSeparatorIndex + 1);
        } else if (charsAfterSeparator !== 3) {
            integerPart = clean.substring(0, lastSeparatorIndex);
            decimalPart = clean.substring(lastSeparatorIndex + 1);
        }
    }
    integerPart = integerPart.replace(/[.,]/g, '');
    const value = parseFloat(`${integerPart}.${decimalPart}`);
    return Math.round(value);
}

function convertPrice(amount, fromCurrency) {
    if (!rates[fromCurrency]) return { usd: 0, try: 0 };
    const rateToUsd = 1 / rates[fromCurrency];
    const usdVal = amount * rateToUsd;
    const tryVal = usdVal * rates.TRY;
    return { usdVal: usdVal, usd: usdVal.toFixed(2), try: tryVal.toFixed(2) };
}

async function fetchWithRetry(proxyConfig, retries = 3) {
    for (let i = 0; i < retries; i++) {
        try {
            const client = new ProxyAgent(proxyConfig.url);
            const params = new URLSearchParams({
                operationName: 'PlanSelection',
                variables: JSON.stringify({ locale: proxyConfig.locale }),
                extensions: JSON.stringify({ persistedQuery: { version: 1, sha256Hash: 'a60817e7ed053ce4467a20930d6a445a5e3e14533ab9316e60662db48a25f131' } })
            });
            const { statusCode, body } = await request(`${EA_GRAPHQL_URL}?${params.toString()}`, {
                dispatcher: client, headers: { 'User-Agent': 'Mozilla/5.0' },
            });
            if (statusCode !== 200) throw new Error(`HTTP ${statusCode}`);
            const data = await body.json();

            processCountryData(data, proxyConfig);
            completedCount++;
            return;
        } catch (error) {
            if (i < retries - 1) await new Promise(r => setTimeout(r, 1500));
        }
    }
    failedCountries.push(proxyConfig.name);
    completedCount++;
}

function processCountryData(data, proxyConfig) {
    if (data?.data?.gameSubscriptions?.items) {
        const items = data.data.gameSubscriptions.items;
        let countryResult = { name: proxyConfig.name };

        // Basit ve Pro paketleri bul
        const basicItem = items.find(i => i.slug === 'origin-access-basic') || items[0];
        const proItem = items.find(i => i.slug === 'origin-access-premier');

        const processItem = (item, typeName) => {
            if (!item || !item.offers) return;
            item.offers.forEach(offer => {
                const priceInfo = offer.lowestPricePurchaseOption;
                if (!priceInfo) return;

                const name = offer.offerName || offer.name;
                const isYearly = name.toLowerCase().includes('annual') || name.toLowerCase().includes('yıllık') || name.toLowerCase().includes('12-month');
                const isMonthly = name.toLowerCase().includes('monthly') || name.toLowerCase().includes('aylık');

                const priceStr = priceInfo.displayTotalWithDiscount || priceInfo.displayTotal;
                const currency = priceInfo.currency || proxyConfig.currency;
                const amount = parsePriceString(priceStr);
                const converted = convertPrice(amount, currency);

                // Orijinal değerleri de sakla (Gruplama için önemli)
                const finalObj = { ...converted, originalAmount: amount, originalCurrency: currency };

                if (typeName === 'Basic') {
                    if (isYearly) countryResult.basicYearly = finalObj;
                    if (isMonthly) countryResult.basicMonthly = finalObj;
                } else {
                    if (isYearly) countryResult.proYearly = finalObj;
                    if (isMonthly) countryResult.proMonthly = finalObj;
                }
            });
        };

        if (basicItem) processItem(basicItem, 'Basic');
        if (proItem) processItem(proItem, 'Pro');

        if (countryResult.basicYearly || countryResult.proYearly) successfulResults.push(countryResult);
    } else {
        failedCountries.push(proxyConfig.name);
    }
}

function getCheaperAndGrouped(data, type, homePriceUsd) {
    const valid = data.filter(r => r[type]);
    // Eğer Türkiye fiyatı yoksa eşik çok yüksek olsun (hepsini göster)
    // Eğer varsa, Türkiye fiyatından 1 dolar düşük olanları "Ucuz" say.
    // Yani (Home - 1.0) değerinden küçük veya eşit olanlar.
    const threshold = homePriceUsd > 0 ? (homePriceUsd - 1.0) : 999999;

    const worthy = [];
    const others = [];

    valid.forEach(r => {
        if (r[type].usdVal <= threshold) worthy.push(r);
        else others.push(r);
    });

    // Gruplama (Fiyat ve Para Birimine göre)
    const groups = {};
    worthy.forEach(r => {
        const key = `${r[type].originalCurrency}_${r[type].originalAmount}`;
        if (!groups[key]) groups[key] = { price: r[type], countries: [] };
        groups[key].countries.push(r.name);
    });

    const groupedList = Object.values(groups).sort((a, b) => a.price.usdVal - b.price.usdVal);
    // Others'ı da sırala (en ucuzdan pahalıya)
    others.sort((a, b) => a[type].usdVal - b[type].usdVal);

    return { groupedList, others };
}

function printGroupedTable(title, data, type) {
    const homeCountry = data.find(r => r.name === 'Türkiye');
    const homePriceRaw = homeCountry && homeCountry[type] ? homeCountry[type] : null;
    const homePriceUsd = homePriceRaw ? homePriceRaw.usdVal : 0;

    console.log(`\n════════════════════════════════════════════════════════════`);
    console.log(`📊 ${title}`);
    if (homePriceUsd > 0) console.log(`   (Baz Ülke: Türkiye - $${homePriceRaw.usd})`);
    console.log(`════════════════════════════════════════════════════════════`);

    if (showFullList) {
        // Tam liste modu
        const sorted = data.filter(r => r[type]).sort((a, b) => a[type].usdVal - b[type].usdVal);
        sorted.forEach((r, index) => {
            const medal = index === 0 ? '🥇' : (index === 1 ? '🥈' : (index === 2 ? '🥉' : '  '));
            console.log(`${medal} ${r.name.padEnd(18)} : $${r[type].usd} (₺${r[type].try})`);
        });
        return sorted[0];
    } else {
        // Gruplanmış mod
        const { groupedList, others } = getCheaperAndGrouped(data, type, homePriceUsd);

        if (groupedList.length === 0) {
            console.log("   (Bu kategoride Türkiye'den belirgin şekilde ucuz ülke yok)");
        } else {
            // İlk 5 grubu yazdır
            const limit = 5;
            groupedList.slice(0, limit).forEach((g, index) => {
                const medal = index === 0 ? '🥇' : (index === 1 ? '🥈' : (index === 2 ? '🥉' : '  '));
                const countryList = g.countries.join(', ');
                const displayCountries = countryList.length > 50 ? countryList.substring(0, 47) + '...' : countryList;

                console.log(`${medal} Fiyat: $${g.price.usd} (₺${g.price.try})`);
                console.log(`   Ülkeler: ${displayCountries}`);
                console.log('   ------------------------------------------------------------');
            });

            if (groupedList.length > limit) {
                console.log(`   ... ve daha ucuz ${groupedList.length - limit} farklı fiyat grubu daha.`);
            }
        }

        // Pahalı olanların özeti
        if (others.length > 0) {
            console.log(`\n   🚫 +${others.length} Ülke (Türkiye fiyatında veya daha pahalı)`);
            console.log(`      (Tam listeyi görmek için '--full' parametresi ile çalıştırın)`);
        }

        // Return winner for recommendation
        if (groupedList.length > 0) return { name: groupedList[0].countries[0], plan: groupedList[0].price };
        if (others.length > 0) return { name: others[0].name, plan: others[0][type] };
        return null;
    }
}

function printFinalResults() {
    stopSpinner();
    console.log('\n\n✅ Tarama Tamamlandı!\n');

    printGroupedTable('BASIC - AYLIK FİYATLAR', successfulResults, 'basicMonthly');
    printGroupedTable('BASIC - YILLIK FİYATLAR', successfulResults, 'basicYearly');
    printGroupedTable('PRO - AYLIK FİYATLAR', successfulResults, 'proMonthly');
    const winnerData = printGroupedTable('PRO - YILLIK FİYATLAR', successfulResults, 'proYearly');

    console.log('\n════════════════════════════════════════════════════════════');
    console.log('🏆 MAKUL SEÇENEK (Pro Yıllık)');
    console.log('════════════════════════════════════════════════════════════');

    if (winnerData) {
        const { name, plan } = winnerData;
        console.log(`✅ EN UCUZ: ${name} ($${plan.usd} - ₺${plan.try} TL)`);

        if (name === 'Mısır') {
            console.log(`   ⚠️  Uyarı: Mısır'da ödeme kısıtlamaları olabilir.`);
            const { groupedList } = getCheaperAndGrouped(successfulResults, 'proYearly', 0);
            if (groupedList.length > 1) {
                const alt = groupedList[1];
                console.log(`   💡 ALTERNATİF: ${alt.countries[0]} ($${alt.price.usd} - ₺${alt.price.try} TL)`);
            }
        }
    }

    if (failedCountries.length > 0) {
        console.log(`\n⚠️  ALINAMAYAN VERİLER (${failedCountries.length}): ${failedCountries.join(', ')}`);
    }
}

(async () => {
    const originalEmit = process.emit;
    process.emit = function (name, data, ...args) {
        if (name === 'warning' && typeof data === 'object' && data.name === 'ExperimentalWarning') return false;
        return originalEmit.apply(process, [name, data, ...args]);
    };

    await fetchExchangeRates();
    startSpinner();
    const promises = proxies.map(p => fetchWithRetry(p));
    await Promise.all(promises);
    printFinalResults();
})();
