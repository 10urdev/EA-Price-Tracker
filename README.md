# 🌍 EA Play Küresel Fiyat Takipçisi (Global Price Tracker)

> [!TIP]
> **Canlı Demo:** [https://yuksuk42.github.io/EA-Price-Tracker/offline.html](https://yuksuk42.github.io/EA-Price-Tracker/offline.html) (Son tarama verileriyle)

Bu proje, **Node.js, Asenkron Mimari ve Proxy Yönetimi** konularında kendimi geliştirmek ve EA Play'in hangi ülkelerden daha ucuza alınabildiğini merak ettiğim için hazırladığım, EA Play abonelik fiyatlarını 89 farklı ülkeden (EA Play'in satıldığı neredeyse tüm bölgeler) çekip karşılaştıran bir araçtır.

Amacım, karmaşık veri çekme (scraping) işlemlerini yönetmek ve gerçek dünya senaryolarında region-lock (bölge kısıtlaması) gibi durumları aşan bir çözüm üretmekti.

## 🛠️ Teknik Kazanımlar ve Özellikler

### Backend & Veri Yönetimi
*   **Asenkron Mimari:** `Promise.all` yapısı ile 89 ülkeyi aynı anda, birbirini bloklamadan saniyeler içinde tarar.
*   **Akıllı Veri İşleme:** Gelen ham JSON verisini işleyerek en ucuz fiyatları gruplandırır.
*   **Proxy Entegrasyonu:** IP tabanlı fiyatlandırmayı doğru analiz etmek için dinamik proxy yapısı kurulmuştur.
*   **Hata Yönetimi:** Canlı döviz kuru çekilemezse sistemin çökmemesi için otomatik fallback mekanizması devreye girer.

### Frontend & Kullanıcı Deneyimi
*   **Modern Arayüz:** Tailwind CSS kullanarak Glassmorphism efektleri ve modern tipografi ile premium bir görünüm sağladım.
*   **Dinamik Yerelleştirme:** Frontend tarafında TR/EN dil desteği ve otomatik para birimi çevirisi (IP tabanlı) geliştirdim.
*   **Performans Odaklı Render:** Veri akışını "live stream" mantığında DOM'a basarak akıcı bir kullanıcı deneyimi sundum.
*   **Statik Dosya Üretimi:** Aktif bir node sunucusu olmadan da çalışabilen, verilerin içine gömülü olduğu "offline" HTML üretim mekanizması kurguladım.



## 🚀 Kurulum

1.  **Projeyi İndirin:**
    Bu repoyu bilgisayarınıza klonlayın veya zip olarak indirin.

2.  **Gerekli Paketleri Yükleyin:**
    ```bash
    npm install
    ```

3.  **Yapılandırma (.env):**
    Proje ana dizininde `.env` adında bir dosya oluşturun ve proxy servisinizin (Örn: IPRoyal) bilgilerini aşağıdaki formatta ekleyin:
    ```env
    EARTH_PROXY_URL=http://kullanici:sifre_country-COUNTRY_CODE@proxy.adresi:port
    ```
    *Not: `COUNTRY_CODE` kısmı kod tarafından otomatik değiştirilecektir, o kısmı aynen bırakın.*

## 🎮 Kullanım

**Standart (Önerilen) Mod:**
Bu modda sadece en iyi 5 fiyat grubu listelenir ve pahalı ülkeler gizlenir.
```bash
node ea-price-tracker.js
```

**Tam Liste Modu:**
Tüm 89 ülkenin fiyatlarını görmek isterseniz:
```bash
node ea-price-tracker.js --full
```

## 📋 Örnek Çıktı

```text
📊 PRO - YILLIK FİYATLAR (Baz Ülke: Türkiye - $120.00)
════════════════════════════════════════════════════════════
🥇 Fiyat: $39.81 (₺1713.49)
   Ülkeler: Mısır

🥈 Fiyat: $65.45 (₺2817.06)
   Ülkeler: Ukrayna
...
```

## ⚠️ Yasal Uyarı
Bu proje sadece eğitim ve piyasa analizi amaçlıdır. Bölgesel fiyatlandırma politikaları ve hesap kuralları hakkında sorumluluk kullanıcıya aittir.
