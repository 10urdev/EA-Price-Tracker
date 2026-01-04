const fs = require('fs');
const http = require('http');

const API_ADRESI = 'http://localhost:3000/api/prices';
const CIKTI_DOSYASI = 'public/offline.html';
const ANA_DOSYA = 'public/index.html';

console.log(`${API_ADRESI} adresinden verileri çekip statik dosya yapıyorum...`);

function jsonVerisiCek(url) {
    return new Promise((basarili, hatali) => {
        http.get(url, (cevap) => {
            let veri = '';
            cevap.on('data', parca => veri += parca);
            cevap.on('end', () => {
                try {
                    basarili(JSON.parse(veri));
                } catch (e) {
                    hatali(e);
                }
            });
        }).on('error', hatali);
    });
}

async function statikDosyaOlustur() {
    try {
        const fiyatVerileri = await jsonVerisiCek(API_ADRESI);
        console.log(` ${fiyatVerileri.successful.length} tane ülke çektim.`);

        let htmlIcerigi = fs.readFileSync(ANA_DOSYA, 'utf8');

        // TARIH EKLİYORUZ
        const zamanDamgasi = new Date().toLocaleString('tr-TR');

        // JS KODU ENJEKTE ET (Burası baya karışık oldu ama çalışıyor)
        const enjekteEdilecekScript = `
        // --- STATIK MOD (OLUSTURULMA: ${zamanDamgasi}) ---
        const STATIK_VERI = ${JSON.stringify(fiyatVerileri.successful)};
        currentData = STATIK_VERI; // Direkt veriyi yüklüyoruz
        
        // Çevrimdışı Mod için Init fonksiyonunu eziyoruz
        const originalInit = init;
        init = async function() {
            try {
                // Çevrimdışı modda olduğumuz için IPAPI bozulmasın diye manuel tr yapıyoruz
                console.log("Çevrimdışı Mod Başlatılıyor...");
                userLang = 'TR'; 
                applyLocalization();
            } catch(e) { console.log(e); }
            
            // Eldeki veriyi render et
            renderTable();
            updateLowestPrice();
            
            // Polling'i (sürekli kontrol) kapat
            startPolling = function() {};
            
            // Arayüz güncellemeleri - DOM otursun diye biraz beklettim
            setTimeout(() => {
                // Yenile butonunu kaldırıp yerine bilgi rozeti koyuyoruz
                const btn = document.getElementById('refreshBtn');
                if(btn) {
                    const rozet = document.createElement('div');
                    rozet.className = "flex items-center gap-2 px-3 py-2 text-xs font-medium text-text-subtle bg-white/5 rounded-lg border border-white/5 cursor-help transition-colors hover:bg-white/10";
                    rozet.innerHTML = \`<span class="material-symbols-outlined text-[16px]">history</span><span>${zamanDamgasi}</span><span class="material-symbols-outlined text-[16px] text-yellow-500 ml-1">info</span>\`;
                    
                    rozet.title = "Sunucu şu an aktif değil"; 
                    rozet.addEventListener('mouseenter', (e) => showTooltip(e, "Sunucu şu an aktif değil"));
                    rozet.addEventListener('mouseleave', hideTooltip);

                    btn.replaceWith(rozet);
                }

                const ind = document.getElementById('statusIndicator');
                if(ind) ind.classList.add('hidden');
            }, 100);
        };
        
        // Veri çekmeyi iptal et
        async function fetchData() { return; }
        async function triggerRefresh() { return; }
        
        // Yüklendiğinde çalıştır
        window.addEventListener('load', () => {
             // init script'in sonunda çağrılıyor zaten
        });
        `;

        // "let currentData = [];" gördüğün yeri değiştir
        htmlIcerigi = htmlIcerigi.replace('let currentData = [];', enjekteEdilecekScript);

        fs.writeFileSync(CIKTI_DOSYASI, htmlIcerigi);
        console.log(`✅ Oldu! Dosya şurada: ${CIKTI_DOSYASI}`);

    } catch (e) {
        console.error("Hata çıktı:", e);
    }
}

statikDosyaOlustur();
