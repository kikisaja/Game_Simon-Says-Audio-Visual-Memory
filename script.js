// Elemen UI DOM
const elLevel = document.getElementById("current-level");
const elInstruction = document.getElementById("game-instruction");
const btnStart = document.getElementById("btn-start");
const tombolSimon = document.querySelectorAll(".simon-btn");

// Array Penyimpan State Urutan Warna
let polaKomputer = [];
let polaPemain = [];
let level = 0;
let giliranPemain = false;
let indeksLangkahPemain = 0;

// Frekuensi Nada Suara Khusus untuk Setiap Tombol (Web Audio API)
const NADA_TOMBOL = [261.63, 329.63, 392.00, 523.25]; // Nada C4, E4, G4, C5

// --- FUNGSI AUDIO: GENERATOR NADA SYNTHESIZER ALAMI ---
function bunyikanNada(frekuensi) {
    // Inisialisasi Audio Context bawaan browser
    const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    const oscillator = audioCtx.createOscillator();
    const gainNode = audioCtx.createGain();
    
    oscillator.type = "sine"; // Jenis gelombang suara lembut (sine wave)
    oscillator.frequency.value = frekuensi;
    
    // Mengatur siklus volume memudar halus agar suara tidak terpotong kasar
    gainNode.gain.setValueAtTime(0.3, audioCtx.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.4);
    
    oscillator.connect(gainNode);
    gainNode.connect(audioCtx.destination);
    
    oscillator.start();
    oscillator.stop(audioCtx.currentTime + 0.4); // Bunyi berdurasi 0.4 detik
}

// --- FUNGSI 1: MEMULAI/RESET GAME ---
function mulaiGame() {
    polaKomputer = [];
    level = 0;
    btnStart.disabled = true;
    btnStart.innerText = "Game Berjalan... 🎮";
    lanjutKeLevelBerikutnya();
}

// --- FUNGSI 2: GENERATE LEVEL BARU & ATUR POLA ---
function lanjutKeLevelBerikutnya() {
    polaPemain = [];
    indeksLangkahPemain = 0;
    giliranPemain = false;
    level++;
    elLevel.innerText = level;
    elInstruction.innerText = "🤖 Komputer sedang mengedipkan pola warna...";

    // Pilih indeks acak dari 0 sampai 3
    const indeksAcak = Math.floor(Math.random() * 4);
    polaKomputer.push(indeksAcak);

    // Mainkan kumpulan seluruh pola secara berurutan dengan jeda waktu animasi
    putarSemuaPola();
}

// --- FUNGSI 3: MEMUTAR SELURUH POLA KOMPUTER ---
function putarSemuaPola() {
    let i = 0;
    // Gunakan setInterval untuk memberi jeda kedipan antar tombol
    const intervalAnimasi = setInterval(() => {
        kedipkanTombol(polaKomputer[i]);
        i++;
        
        // Jika semua pola sudah diputar selesai
        if (i >= polaKomputer.length) {
            clearInterval(intervalAnimasi);
            // Berikan giliran kontrol penuh kepada pemain
            setTimeout(() => {
                giliranPemain = true;
                elInstruction.innerText = "👉 Giliranmu! Tiru urutan kedipan di atas!";
            }, 600);
        }
    }, 600); // Kedipan berpindah setiap 0.6 detik
}

// --- FUNGSI AUXILIARY: MEMBERIKAN EFEK VISUAL MENYALA & SUARA ---
function kedipkanTombol(indeks) {
    const tombol = document.querySelector(`.simon-btn[data-index="${indeks}"]`);
    bunyikanNada(NADA_TOMBOL[indeks]);
    
    tombol.classList.add("active");
    setTimeout(() => {
        tombol.classList.remove("active");
    }, 300); // Efek menyala ditahan selama 0.3 detik
}

// --- FUNGSI 4: LOGIKA VALIDASI INPUT JAWABAN PEMAIN ---
function tanganiKlikPemain(event) {
    // Abaikan klik jika belum giliran pemain atau game belum dimulai
    if (!giliranPemain) return;

    const targetTombol = event.target;
    const indeksDipilih = parseInt(targetTombol.getAttribute("data-index"));

    // Kedipkan tombol yang diklik pemain
    kedipkanTombol(indeksDipilih);
    polaPemain.push(indeksDipilih);

    // VALIDASI: Cek apakah klik langkah saat ini cocok dengan pola komputer
    if (polaPemain[indeksLangkahPemain] === polaKomputer[indeksLangkahPemain]) {
        indeksLangkahPemain++;

        // Jika semua langkah dalam level ini sukses ditiru seluruhnya
        if (polaPemain.length === polaKomputer.length) {
            giliranPemain = false;
            elInstruction.innerText = " Benar! Bersiap untuk level selanjutnya...";
            setTimeout(lanjutKeLevelBerikutnya, 1200);
        }
    } else {
        // JIKA SALAH JAWAB -> GAME OVER
        akhiriPermainan();
    }
}

// --- FUNGSI 5: MENANGANI KONDISI GAME OVER ---
function akhiriPermainan() {
    giliranPemain = false;
    elInstruction.innerText = `💥 Salah Urutan! Game Over di Level ${level}. Coba lagi!`;
    
    // Bunyikan nada penanda kalah (Nada rendah sumbang)
    bunyikanNada(110); 
    
    btnStart.disabled = false;
    btnStart.innerText = "Main Lagi 🔄";
}

// --- EVENT LISTENERS INTERAKSI ---
tombolSimon.forEach(tombol => {
    tombol.addEventListener("click", tanganiKlikPemain);
});

btnStart.addEventListener("click", mulaiGame);
