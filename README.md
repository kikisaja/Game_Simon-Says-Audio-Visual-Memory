# 🎨 Simon Says: "Audio-Visual Memory" dengan Efek Gradien

Sebuah game edukatif penguji memori dan daya ingat taktis berbasis **Vanilla JavaScript dan HTML5 Web Audio API**. Proyek ini dikemas ulang dengan pendekatan desain antarmuka modern menggunakan **Bright Neon Gradient Layout** yang cerah, kontras tinggi, dan estetik bagi pengguna.

Tujuan utama proyek ini adalah mengenalkan konsep **Asynchronous State Management** (sinkronisasi waktu giliran aksi) serta pemanfaatan synthesizer suara berbasis kode murni tanpa memerlukan aset file media eksternal.

---

## 🚀 Fitur Utama

*   **Modern Neon Gradient Design:** Mengganti warna pad redup konvensional dengan perpaduan warna gradien cerah kekinian (*Candy Pink, Cyan, Yellow,* dan *Mint Green*) di atas latar belakang panel putih yang minimalis.
*   **Web Audio API Synthesizer:** Mengintegrasikan osilator gelombang sinus (`oscillator.type = "sine"`) bawaan browser untuk menghasilkan frekuensi nada musik murni secara *on-the-fly* tanpa membebani performa jaringan (*zero network latency*).
*   **Asynchronous Pattern Sequence Player:** Logika perputaran rantai data (*pattern sequencing*) dikelola menggunakan antrean waktu terukur (`setInterval`), memastikan kedipan visual dan bunyi nada milik komputer berjalan stabil dan selaras di setiap level.
*   **Strict Input Validation Loop:** Setiap ketukan (*input click*) dari pemain divalidasi secara langsung (*real-time processing*) menggunakan sistem pembandingan indeks array untuk mendeteksi kesalahan langkah secepat mungkin.
*   **Safe Action Lock:** Mengunci akses klik tombol pemain ketika komputer sedang mendemonstrasikan pola urutan warna, sehingga mencegah terjadinya manipulasi kecurangan ataupun kerusakan jalannya state logika game.

---

## 📂 Struktur Folder Proyek

```text
├── index.html       # Struktur dashboard level, instruksi dinamis, dan grid pad warna
├── style.css        # Variabel gradien modern, rasio kotak aspek 1:1, dan efek redup-terang (.active)
└── script.js        # Konfigurasi Audio Context, state mesin game, dan penanganan pola memori
