# 🌍 EA Play Küresel Fiyat Takipçisi (Global Price Tracker)

Bu araç, Electronic Arts (EA) Play abonelik fiyatlarını **89 farklı ülke** mağazasını tarayarak karşılaştırır ve size en ucuz seçenekleri sunar. 

Otomatik olarak döviz kurlarını çeker, fiyatları çevirir ve Türkiye fiyatından pahalı olan seçenekleri gizleyerek size en sade ve net sonucu gösterir.

![Demo](https://via.placeholder.com/800x400?text=Price+Tracker+Demo+Screenshot)
*(Örnek Çalışma Görseli)*

## ✨ Özellikler

*   **⚡ Hızlı Tarama:** Paralel istek mimarisiyle 89 ülkeyi saniyeler içinde tarar.
*   **🧠 Akıllı Sıralama:** Aynı fiyata sahip ülkeleri otomatik olarak gruplandırır.
*   **🔎 Filtreleme:** Bulunduğunuz ülkeden (Türkiye) pahalı olanları otomatik gizler.
*   **💱 Otomatik Çeviri:** Anlık kur bilgisiyle tüm fiyatları USD ve TRY olarak gösterir.
*   **🛡️ Proxy Desteği:** IP tabanlı fiyatlandırmayı yakalamak için IPRoyal gibi servislerle tam uyumludur.

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
