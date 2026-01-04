require('dotenv').config();
const { request, ProxyAgent } = require('undici');
const readline = require('readline');

// Proxy Listesi (Global - 89 Ülke)
// Proxy Listesi (Global - 89 Ülke)
const temelProxyler = [
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
// Proxy URL Oluşturucu
const proxyler = temelProxyler.map(p => ({
    ...p,
    url: PROXY_TEMPLATE.replace('COUNTRY_CODE', p.code)
}));

const EA_GRAPHQL_URL = 'https://service-aggregation-layer.juno.ea.com/graphql';

let kurOranlari = { USD: 1, TRY: 43 };
let basariliSonuclar = [];
let hataliUlkeler = [];
let tamamlananSayisi = 0;
const toplamSayi = proxyler.length;
const tamListeyiGoster = process.argv.includes('--full');

// Spinner (Yükleniyor animasyonu)
let yuklemeInterval;
const cerceveler = ['⠋', '⠙', '⠹', '⠸', '⠼', '⠴', '⠦', '⠧', '⠇', '⠏'];
function yukleniyorBaslat() {
    let i = 0;
    process.stdout.write('\x1B[?25l');
    yuklemeInterval = setInterval(() => {
        const cerceve = cerceveler[i = (i + 1) % cerceveler.length];
        const yuzde = Math.round((tamamlananSayisi / toplamSayi) * 100);
        readline.cursorTo(process.stdout, 0);
        process.stdout.write(`${cerceve} Veriler çekiliyor... %${yuzde} (${tamamlananSayisi}/${toplamSayi}) Tamamlandı`);
    }, 80);
}
function yukleniyorDurdur() {
    if (yuklemeInterval) {
        clearInterval(yuklemeInterval);
        readline.cursorTo(process.stdout, 0);
        readline.clearLine(process.stdout, 0);
        process.stdout.write('\x1B[?25h');
    }
}

async function dovizKurlariniCek() {
    try {
        // Burası isteği iptal etmek için, dökümantasyonda timeout yerine bunu öneriyorlar.
        const kontrolcu = new AbortController();
        setTimeout(() => kontrolcu.abort(), 10000); // 10 saniye sonra iptal et
        process.stdout.write('💱 Döviz kurları güncelleniyor... ');
        const { body } = await request('https://open.er-api.com/v6/latest/USD', { signal: kontrolcu.signal });
        const data = await body.json();
        if (data && data.rates) {
            kurOranlari = data.rates;
            console.log(`✅ (1 USD = ${kurOranlari.TRY.toFixed(2)} TRY)\n`);
        }
    } catch (hata) {
        console.log('❌ Başarısız (Varsayılan kullanılıyor)\n');
    }
}

function fiyatiTemizleVeCevir(fiyatMetni) {
    if (!fiyatMetni) return 0;

    // Bu regex kısmı biraz karışık, AI'dan yardım alarak hallettim ama sayıları ayıklıyor.
    const eslesme = fiyatMetni.match(/[\d][\d.,\s]*[\d]|\d+/);
    if (!eslesme) return 0;

    let temiz = eslesme[0].replace(/\s/g, '');
    const sonNokta = temiz.lastIndexOf('.');
    const sonVirgul = temiz.lastIndexOf(',');
    const sonAyirici = Math.max(sonNokta, sonVirgul);

    let tamKisim = temiz;
    let ondalikKisim = '0';

    if (sonAyirici !== -1) {
        const ayiricidanSonraki = temiz.length - sonAyirici - 1;
        if (ayiricidanSonraki === 2) {
            tamKisim = temiz.substring(0, sonAyirici);
            ondalikKisim = temiz.substring(sonAyirici + 1);
        } else if (ayiricidanSonraki !== 3) {
            tamKisim = temiz.substring(0, sonAyirici);
            ondalikKisim = temiz.substring(sonAyirici + 1);
        }
    }

    tamKisim = tamKisim.replace(/[.,]/g, '');
    const deger = parseFloat(`${tamKisim}.${ondalikKisim}`);
    return Math.round(deger);
}

function fiyatDonustur(miktar, birim) {
    if (!kurOranlari[birim]) return { usd: 0, try: 0 };
    const dolaraCevir = 1 / kurOranlari[birim];
    const dolarDegeri = miktar * dolaraCevir;
    const tlDegeri = dolarDegeri * kurOranlari.TRY;
    return { usdVal: dolarDegeri, usd: dolarDegeri.toFixed(2), try: tlDegeri.toFixed(2) };
}

async function veriyiGetir(proxyAyari, hedefDizi, denemeHakki = 3) {
    for (let i = 0; i < denemeHakki; i++) {
        try {
            const istemci = new ProxyAgent(proxyAyari.url);
            const parametreler = new URLSearchParams({
                operationName: 'PlanSelection',
                variables: JSON.stringify({ locale: proxyAyari.locale }),
                // Buradaki hash değerini developer tools'dan buldum
                extensions: JSON.stringify({ persistedQuery: { version: 1, sha256Hash: 'a60817e7ed053ce4467a20930d6a445a5e3e14533ab9316e60662db48a25f131' } })
            });
            const { statusCode, body } = await request(`${EA_GRAPHQL_URL}?${parametreler.toString()}`, {
                dispatcher: istemci, headers: { 'User-Agent': 'Mozilla/5.0' },
            });
            if (statusCode !== 200) throw new Error(`HTTP ${statusCode}`);
            const data = await body.json();

            veriyiIsle(data, proxyAyari, hedefDizi);
            tamamlananSayisi++;
            return;
        } catch (hata) {
            if (i < denemeHakki - 1) await new Promise(r => setTimeout(r, 1500));
        }
    }
    hataliUlkeler.push(proxyAyari.name);
    tamamlananSayisi++;
}

function veriyiIsle(data, proxyAyari, hedefDizi) {
    if (data?.data?.gameSubscriptions?.items) {
        const urunler = data.data.gameSubscriptions.items;
        let ulkeSonucu = { name: proxyAyari.name, code: proxyAyari.code };

        // Basit ve Pro paketleri bul
        const basicPaket = urunler.find(i => i.slug === 'origin-access-basic') || urunler[0];
        const proPaket = urunler.find(i => i.slug === 'origin-access-premier');

        const paketiIsle = (urun, tipIsmi) => {
            if (!urun || !urun.offers) return;
            urun.offers.forEach(teklif => {
                const fiyatBilgisi = teklif.lowestPricePurchaseOption;
                if (!fiyatBilgisi) return;

                const name = teklif.offerName || teklif.name;
                const yillikMi = name.toLowerCase().includes('annual') || name.toLowerCase().includes('yıllık') || name.toLowerCase().includes('12-month');
                const aylikMi = name.toLowerCase().includes('monthly') || name.toLowerCase().includes('aylık');

                const fiyatMetni = fiyatBilgisi.displayTotalWithDiscount || fiyatBilgisi.displayTotal;
                const paraBirimi = fiyatBilgisi.currency || proxyAyari.currency;
                const miktar = fiyatiTemizleVeCevir(fiyatMetni);
                const cevrilen = fiyatDonustur(miktar, paraBirimi);

                // Orijinal değerleri de sakla (Gruplama için önemli)
                const sonucObjesi = { ...cevrilen, originalAmount: miktar, originalCurrency: paraBirimi };

                if (tipIsmi === 'Basic') {
                    if (yillikMi) ulkeSonucu.basicYearly = sonucObjesi;
                    if (aylikMi) ulkeSonucu.basicMonthly = sonucObjesi;
                } else {
                    if (yillikMi) ulkeSonucu.proYearly = sonucObjesi;
                    if (aylikMi) ulkeSonucu.proMonthly = sonucObjesi;
                }
            });
        };

        if (basicPaket) paketiIsle(basicPaket, 'Basic');
        if (proPaket) paketiIsle(proPaket, 'Pro');

        if (ulkeSonucu.basicYearly || ulkeSonucu.proYearly) hedefDizi.push(ulkeSonucu);
    } else {
        hataliUlkeler.push(proxyAyari.name);
    }
}

function ucuzaGoreGrupla(data, tip, bazFiyatUsd) {
    const gecerliOlanlar = data.filter(r => r[tip]);
    const limit = bazFiyatUsd > 0 ? (bazFiyatUsd - 1.0) : 999999;

    const alinabilirler = [];
    const digerleri = [];

    gecerliOlanlar.forEach(r => {
        if (r[tip].usdVal <= limit) alinabilirler.push(r);
        else digerleri.push(r);
    });

    const gruplar = {};
    alinabilirler.forEach(r => {
        const anahtar = `${r[tip].originalCurrency}_${r[tip].originalAmount}`;
        if (!gruplar[anahtar]) gruplar[anahtar] = { price: r[tip], countries: [] };
        gruplar[anahtar].countries.push(r.name);
    });

    const gruplanmisListe = Object.values(gruplar).sort((a, b) => a.price.usdVal - b.price.usdVal);
    digerleri.sort((a, b) => a[type].usdVal - b[type].usdVal);

    return { gruplanmisListe, digerleri };
}

function tabloyuYazdir(baslik, data, tip) {
    const anaUlke = data.find(r => r.name === 'Türkiye');
    const anaFiyatHam = anaUlke && anaUlke[tip] ? anaUlke[tip] : null;
    const anaFiyatUsd = anaFiyatHam ? anaFiyatHam.usdVal : 0;

    console.log(`\n════════════════════════════════════════════════════════════`);
    console.log(`📊 ${baslik}`);
    if (anaFiyatUsd > 0) console.log(`   (Baz Ülke: Türkiye - $${anaFiyatHam.usd})`);
    console.log(`════════════════════════════════════════════════════════════`);

    if (tamListeyiGoster) {
        const sirali = data.filter(r => r[tip]).sort((a, b) => a[tip].usdVal - b[tip].usdVal);
        sirali.forEach((r, indeks) => {
            const madalya = indeks === 0 ? '🥇' : (indeks === 1 ? '🥈' : (indeks === 2 ? '🥉' : '  '));
            console.log(`${madalya} ${r.name.padEnd(18)} : $${r[tip].usd} (₺${r[tip].try})`);
        });
        return sirali[0];
    } else {
        const { gruplanmisListe, digerleri } = ucuzaGoreGrupla(data, tip, anaFiyatUsd);

        if (gruplanmisListe.length === 0) {
            console.log("   (Bu kategoride Türkiye'den belirgin şekilde ucuz ülke yok)");
        } else {
            const limit = 5;
            gruplanmisListe.slice(0, limit).forEach((g, indeks) => {
                const madalya = indeks === 0 ? '🥇' : (indeks === 1 ? '🥈' : (indeks === 2 ? '🥉' : '  '));
                const ulkeListesi = g.countries.join(', ');
                const gosterilenUlkeler = ulkeListesi.length > 50 ? ulkeListesi.substring(0, 47) + '...' : ulkeListesi;

                console.log(`${madalya} Fiyat: $${g.price.usd} (₺${g.price.try})`);
                console.log(`   Ülkeler: ${gosterilenUlkeler}`);
                console.log('   ------------------------------------------------------------');
            });

            if (gruplanmisListe.length > limit) {
                console.log(`   ... ve daha ucuz ${gruplanmisListe.length - limit} farklı fiyat grubu daha.`);
            }
        }

        if (digerleri.length > 0) {
            console.log(`\n   🚫 +${digerleri.length} Ülke (Türkiye fiyatında veya daha pahalı)`);
            console.log(`      (Tam listeyi görmek için '--full' parametresi ile çalıştırın)`);
        }

        if (gruplanmisListe.length > 0) return { name: gruplanmisListe[0].countries[0], plan: gruplanmisListe[0].price };
        if (digerleri.length > 0) return { name: digerleri[0].name, plan: digerleri[0][tip] };
        return null;
    }
}

function sonuclariGoster() {
    yukleniyorDurdur();
    console.log('\n\n✅ Tarama Tamamlandı!\n');

    tabloyuYazdir('BASIC - AYLIK FİYATLAR', basariliSonuclar, 'basicMonthly');
    tabloyuYazdir('BASIC - YILLIK FİYATLAR', basariliSonuclar, 'basicYearly');
    tabloyuYazdir('PRO - AYLIK FİYATLAR', basariliSonuclar, 'proMonthly');
    const kazananVeri = tabloyuYazdir('PRO - YILLIK FİYATLAR', basariliSonuclar, 'proYearly');

    console.log('\n════════════════════════════════════════════════════════════');
    console.log('🏆 MAKUL SEÇENEK (Pro Yıllık)');
    console.log('════════════════════════════════════════════════════════════');

    if (kazananVeri) {
        const { name, plan } = kazananVeri;
        console.log(`✅ EN UCUZ: ${name} ($${plan.usd} - ₺${plan.try} TL)`);

        if (name === 'Mısır') {
            console.log(`   ⚠️  Uyarı: Mısır'da ödeme kısıtlamaları olabilir.`);
            const { gruplanmisListe } = ucuzaGoreGrupla(basariliSonuclar, 'proYearly', 0);
            if (gruplanmisListe.length > 1) {
                const alt = gruplanmisListe[1];
                console.log(`   💡 ALTERNATİF: ${alt.countries[0]} ($${alt.price.usd} - ₺${alt.price.try} TL)`);
            }
        }
    }

    if (hataliUlkeler.length > 0) {
        console.log(`\n⚠️  ALINAMAYAN VERİLER (${hataliUlkeler.length}): ${hataliUlkeler.join(', ')}`);
    }
}

function getResults() {
    return {
        successful: successfulResults,
        failed: failedCountries,
        completed: completedCount,
        total: totalCount,
        isScanning: spinnerInterval !== undefined
    };
}

// Web Arayüzü İçin Tarama Durumu
let webTaramaModu = false;

async function taramayiBaslat() {
    // Hem konsol hem web aynı anda çalışmasın
    if (yuklemeInterval || webTaramaModu) return;

    webTaramaModu = true;
    hataliUlkeler = [];
    tamamlananSayisi = 0;

    // Her taramada listeyi sıfırla ki kullanıcı yeni sonuçları görsün
    basariliSonuclar = [];

    if (require.main === module) {
        console.clear();
    }

    await dovizKurlariniCek();

    // Sadece konsoldan çalıştırıyorsak spinner açalım
    if (require.main === module) yukleniyorBaslat();

    // Bilgi Sistemleri Entegrasyonu dersinde görmüştük, hepsini aynı anda başlatmak için Promise.all kullandım.
    const islemSozleri = proxyler.map(p => veriyiGetir(p, basariliSonuclar));
    await Promise.all(islemSozleri);

    if (require.main === module) {
        sonuclariGoster();
    } else {
        yukleniyorDurdur(); // Güvenlik önlemi
    }

    webTaramaModu = false;
}

module.exports = {
    taramayiBaslat,
    sonuclariGetir
};

function sonuclariGetir() {
    return {
        successful: basariliSonuclar,
        failed: hataliUlkeler,
        completed: tamamlananSayisi,
        total: toplamSayi,
        // Durum kontrolü: Spinner dönüyor mu veya web taraması aktif mi?
        isScanning: (yuklemeInterval !== undefined) || webTaramaModu
    };
}

// CLI Modunda Çalıştırılırsa
if (require.main === module) {
    (async () => {
        const originalEmit = process.emit;
        process.emit = function (name, data, ...args) {
            if (name === 'warning' && typeof data === 'object' && data.name === 'ExperimentalWarning') return false;
            return originalEmit.apply(process, [name, data, ...args]);
        };
        await taramayiBaslat();
    })();
}
