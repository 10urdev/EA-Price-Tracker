const express = require('express');
const path = require('path');
const { taramayiBaslat, sonuclariGetir } = require('./ea-price-tracker');

const app = express();
const PORT = 3000;

// HTML dosyalarini buradan veriyoruz (public klasörü)
app.use(express.static(path.join(__dirname, 'public')));

// API: Sonuçları Getir - Burası frontend'e veriyi yolluyor
app.get('/api/prices', (req, res) => {
    res.json(sonuclariGetir());
});

// API: Taramayı Başlat (Yenile butonu için)
app.post('/api/refresh', (req, res) => {
    const durum = sonuclariGetir();
    if (durum.isScanning) {
        return res.json({ message: 'Şu an zaten tarama yapıyor, bekle biraz.', status: durum });
    }

    // Arka planda başlasın ki bekletmeyelim
    taramayiBaslat().then(() => {
        console.log('Web isteği geldi, taramayı bitirdim.');
    });

    res.json({ message: 'Taramayı başlattım.', status: sonuclariGetir() });
});

app.listen(PORT, () => {
    console.log(`Server çalışıyor: http://localhost:${PORT}`);
    // İlk açılışta direkt taramaya başlasın
    taramayiBaslat();
});
