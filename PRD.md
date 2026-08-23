# PRODUCT REQUIREMENTS DOCUMENT (PRD)
## Sistem Pencatatan UMKM Berbasis Web

**Versi:** 1.0  
**Jenis Produk:** Aplikasi Web  
**Target Pengguna:** Pemilik dan karyawan UMKM  
**Penyimpanan Data:** Google Sheets  
**Autentikasi:** Username dan Password  

---

# 1. Ringkasan Produk

Sistem Pencatatan UMKM adalah aplikasi berbasis web yang digunakan untuk membantu UMKM melakukan pencatatan barang dan transaksi keuangan secara terstruktur.

Sistem memiliki dua kelompok pencatatan utama:

1. **Inventori**, untuk mencatat barang masuk dan barang keluar.
2. **Operasional**, untuk mencatat uang masuk dan uang keluar yang direpresentasikan sebagai:
   - **Penghasilan**
   - **Pengeluaran**

Sistem menggunakan Google Sheets sebagai media penyimpanan data. Aplikasi web berfungsi sebagai antarmuka untuk melakukan input, melihat, mengubah, dan mengelola data tanpa pengguna harus berinteraksi langsung dengan Google Sheets.

Rancangan ini mempertahankan kebutuhan utama dari dokumen awal, yaitu pencatatan barang masuk/keluar, penghasilan, pengeluaran, metode Cash dan QRIS, dashboard, laporan, serta autentikasi username dan password.

---

# 2. Latar Belakang

Pencatatan UMKM yang dilakukan secara manual dapat menyebabkan data barang dan transaksi keuangan tidak tersusun dengan baik. Kondisi tersebut dapat menyulitkan pemilik usaha dalam mengetahui jumlah barang yang tersedia, barang yang masuk dan keluar, jumlah penghasilan, jumlah pengeluaran, serta kondisi keuangan usaha.

Sistem dikembangkan sebagai aplikasi pencatatan sederhana yang berfokus pada kebutuhan operasional sehari-hari. Aplikasi memungkinkan pengguna memasukkan data melalui form yang tersedia, kemudian data disimpan secara terstruktur pada Google Sheets.

Sistem tidak menggunakan database relasional seperti MySQL atau PostgreSQL pada versi awal. Google Sheets digunakan sebagai media penyimpanan terpusat sesuai rancangan awal sistem.

---

# 3. Tujuan Produk

Tujuan sistem adalah:

1. Mempermudah pencatatan barang masuk.
2. Mempermudah pencatatan barang keluar.
3. Mempermudah pencatatan penghasilan atau uang masuk.
4. Mempermudah pencatatan pengeluaran atau uang keluar.
5. Mencatat transaksi berdasarkan metode Cash dan QRIS.
6. Menampilkan kondisi stok barang.
7. Menampilkan ringkasan pemasukan dan pengeluaran.
8. Menyediakan riwayat transaksi.
9. Mempermudah pencarian dan penyaringan data.
10. Mengurangi ketergantungan terhadap pencatatan manual.
11. Menyediakan autentikasi menggunakan username dan password.
12. Memberikan akses berbeda berdasarkan role pengguna jika dibutuhkan.

Tujuan tersebut mengacu pada sasaran awal sistem untuk pencatatan barang, penghasilan, pengeluaran, Cash/QRIS, dashboard, dan autentikasi.

---

# 4. Konsep Bisnis Sistem

Sistem dibagi menjadi tiga area utama:

```text
SISTEM PENCATATAN UMKM
│
├── Dashboard
│
├── Inventori
│   ├── Barang
│   ├── Barang Masuk
│   └── Barang Keluar
│
├── Operasional
│   ├── Penghasilan
│   └── Pengeluaran
│
├── Laporan
│
└── Pengguna
```

### Pengertian Operasional

Dalam sistem ini, **Operasional merupakan kelompok menu untuk pencatatan keuangan usaha**, bukan menu khusus untuk mencatat aktivitas operasional.

Operasional terdiri dari:

```text
Operasional
├── Penghasilan
└── Pengeluaran
```

Dengan demikian:

- **Penghasilan** = uang masuk
- **Pengeluaran** = uang keluar

Cash dan QRIS digunakan sebagai **metode transaksi**, bukan sebagai menu terpisah. Hal ini sesuai dengan rancangan awal yang menyimpan metode sebagai `Cash/QRIS`.

---

# 5. Target Pengguna

## 5.1 Admin / Pemilik

Admin memiliki akses penuh terhadap sistem.

Hak akses:

- Login.
- Melihat dashboard.
- Mengelola data barang.
- Mencatat barang masuk.
- Mencatat barang keluar.
- Mencatat penghasilan.
- Mencatat pengeluaran.
- Melihat laporan.
- Mengelola pengguna.

Kebutuhan ini mengikuti rancangan hak akses pemilik/admin pada dokumen awal.

## 5.2 Karyawan

Karyawan memiliki akses sesuai kewenangan yang diberikan.

Hak akses dapat mencakup:

- Login.
- Melihat dashboard.
- Melihat barang.
- Mencatat barang masuk.
- Mencatat barang keluar.
- Mencatat penghasilan.
- Mencatat pengeluaran.
- Melihat data yang diperlukan.

Admin dapat membatasi akses berdasarkan role.

---

# 6. Struktur Navigasi

Struktur sidebar utama:

```text
Dashboard

Inventori
├── Barang
├── Barang Masuk
└── Barang Keluar

Operasional
├── Penghasilan
└── Pengeluaran

Laporan

Pengguna
```

### Alasan struktur

Struktur tersebut dibuat agar istilah pada sistem mengikuti cara pengguna memahami proses bisnis:

**Barang**
→ mengelola stok.

**Operasional**
→ mengelola uang masuk dan uang keluar.

**Laporan**
→ melihat hasil pencatatan.

Tidak dibuat menu terpisah bernama "Keuangan" karena fungsi keuangan sudah dikelompokkan di dalam Operasional.

---

# 7. Ruang Lingkup MVP

Versi pertama sistem mencakup:

## 7.1 Authentication

- Login username.
- Login password.
- Logout.
- Session pengguna.
- Role pengguna.

## 7.2 Inventori

- Data barang.
- Barang masuk.
- Barang keluar.
- Stok otomatis.
- Riwayat transaksi barang.

## 7.3 Operasional

- Penghasilan.
- Pengeluaran.
- Metode Cash.
- Metode QRIS.
- Riwayat transaksi keuangan.

## 7.4 Dashboard

- Total jenis barang.
- Total stok.
- Total penghasilan.
- Total pengeluaran.
- Selisih penghasilan dan pengeluaran.
- Ringkasan Cash.
- Ringkasan QRIS.
- Transaksi terbaru.

## 7.5 Laporan

- Laporan barang.
- Laporan barang masuk.
- Laporan barang keluar.
- Laporan penghasilan.
- Laporan pengeluaran.
- Filter periode.

## 7.6 Pengguna

- Melihat pengguna.
- Menambah pengguna.
- Mengubah pengguna.
- Menonaktifkan pengguna.
- Mengatur role.

---

# 8. Arsitektur Sistem

```text
                         USER
                           │
                           ▼
                   ┌───────────────┐
                   │  WEB APP      │
                   │   Next.js     │
                   └───────┬───────┘
                           │
                  ┌────────┴────────┐
                  │                 │
                  ▼                 ▼
            Authentication       API / Server
                  │                 │
                  └────────┬────────┘
                           │
                           ▼
                    GOOGLE SHEETS
                           │
          ┌────────────────┼────────────────┐
          │                │                │
          ▼                ▼                ▼
       INVENTORI       OPERASIONAL       USERS
       - Barang        - Penghasilan
       - Masuk         - Pengeluaran
       - Keluar
```

Google Sheets berfungsi sebagai media penyimpanan, sedangkan aplikasi menjadi antarmuka utama pengguna. Pengguna tidak berinteraksi langsung dengan spreadsheet.

---

# 9. Struktur Google Sheets

Satu file Google Sheets digunakan sebagai penyimpanan utama.

```text
Google Sheets
│
├── users
├── barang
├── barang_masuk
├── barang_keluar
├── penghasilan
└── pengeluaran
```

Tidak diperlukan sheet `operasional`, karena Operasional merupakan kelompok menu yang terdiri dari Penghasilan dan Pengeluaran.

---

# 10. Sheet Users

Nama sheet:

`users`

| Kolom | Tipe | Keterangan |
|---|---|---|
| id | String | ID pengguna |
| username | String | Username login |
| password_hash | String | Password yang sudah di-hash |
| nama | String | Nama pengguna |
| role | String | Admin/Karyawan |
| status | String | Aktif/Nonaktif |
| created_at | DateTime | Waktu pembuatan |

Password wajib disimpan dalam bentuk hash dan tidak boleh disimpan sebagai plaintext.

---

# 11. Sheet Barang

Nama sheet:

`barang`

| Kolom | Keterangan |
|---|---|
| id_barang | ID barang |
| kode_barang | Kode unik |
| nama_barang | Nama barang |
| satuan | Satuan barang |
| harga_beli | Harga pembelian |
| harga_jual | Harga penjualan |
| stok | Jumlah stok |
| status | Aktif/Nonaktif |

Keterangan field mengikuti struktur master barang yang telah ditentukan sebelumnya.

---

# 12. Sheet Barang Masuk

Nama sheet:

`barang_masuk`

| Kolom | Keterangan |
|---|---|
| id_transaksi | ID transaksi |
| nomor_transaksi | Nomor transaksi |
| tanggal | Tanggal transaksi |
| kode_barang | Kode barang |
| nama_barang | Nama barang |
| jumlah | Jumlah barang |
| harga_beli | Harga beli |
| total | Total nilai |
| supplier | Supplier |
| keterangan | Catatan |
| user_id | Pengguna yang melakukan input |

Field tersebut mengikuti struktur barang masuk pada rancangan awal.

---

# 13. Sheet Barang Keluar

Nama sheet:

`barang_keluar`

| Kolom | Keterangan |
|---|---|
| id_transaksi | ID transaksi |
| nomor_transaksi | Nomor transaksi |
| tanggal | Tanggal transaksi |
| kode_barang | Kode barang |
| nama_barang | Nama barang |
| jumlah | Jumlah barang |
| harga_jual | Harga jual |
| total | Total nilai |
| tujuan | Tujuan/keterangan |
| user_id | Pengguna yang melakukan input |

Field tersebut mengikuti struktur barang keluar pada rancangan awal.

---

# 14. Sheet Penghasilan

Nama sheet:

`penghasilan`

Penghasilan merepresentasikan **uang masuk**.

| Kolom | Keterangan |
|---|---|
| id_transaksi | ID transaksi |
| nomor_transaksi | Nomor transaksi |
| tanggal | Tanggal |
| sumber | Sumber uang masuk |
| nominal | Nilai transaksi |
| metode | Cash/QRIS |
| keterangan | Keterangan |
| user_id | Pengguna yang melakukan input |

Struktur tersebut konsisten dengan rancangan awal sheet penghasilan.

### Contoh

| Tanggal | Sumber | Nominal | Metode |
|---|---|---:|---|
| 22/08/2026 | Penjualan | Rp50.000 | Cash |
| 22/08/2026 | Penjualan | Rp75.000 | QRIS |

---

# 15. Sheet Pengeluaran

Nama sheet:

`pengeluaran`

Pengeluaran merepresentasikan **uang keluar**.

| Kolom | Keterangan |
|---|---|
| id_transaksi | ID transaksi |
| nomor_transaksi | Nomor transaksi |
| tanggal | Tanggal |
| kategori | Kategori pengeluaran |
| nominal | Nilai transaksi |
| metode | Cash/QRIS |
| keterangan | Keterangan |
| user_id | Pengguna yang melakukan input |

Struktur ini mengikuti rancangan awal sheet pengeluaran.

### Contoh

| Tanggal | Kategori | Nominal | Metode |
|---|---|---:|---|
| 22/08/2026 | Bahan Baku | Rp250.000 | Cash |
| 22/08/2026 | Transportasi | Rp50.000 | QRIS |

---

# 16. Modul Authentication

## 16.1 Login

User memasukkan:

```text
Username
Password
```

Proses:

```text
Input Username + Password
        ↓
Cari Username
        ↓
Username ditemukan?
   ┌────┴────┐
  Tidak      Ya
   ↓          ↓
 Error     Verifikasi Password
                ↓
        Password benar?
          ┌────┴────┐
         Tidak      Ya
          ↓          ↓
        Error     Cek Status
                       ↓
                    Aktif?
                   ┌───┴───┐
                  Tidak    Ya
                   ↓        ↓
                 Error   Dashboard
```

Pesan kesalahan:

> Username atau password salah.

---

# 17. Modul Dashboard

Dashboard memberikan gambaran kondisi usaha secara cepat.

## 17.1 Summary

Dashboard menampilkan:

```text
┌────────────────┐ ┌────────────────┐
│ Penghasilan    │ │ Pengeluaran    │
│ Rp12.500.000   │ │ Rp7.200.000    │
└────────────────┘ └────────────────┘

┌────────────────┐ ┌────────────────┐
│ Selisih        │ │ Total Stok     │
│ Rp5.300.000    │ │ 328 item       │
└────────────────┘ └────────────────┘
```

## 17.2 Ringkasan Pembayaran

```text
Cash
Rp7.500.000

QRIS
Rp5.000.000
```

## 17.3 Transaksi Terbaru

Menampilkan:

- Penghasilan terbaru.
- Pengeluaran terbaru.
- Barang masuk terbaru.
- Barang keluar terbaru.

## 17.4 Filter Periode

- Hari ini.
- Minggu ini.
- Bulan ini.
- Custom.

---

# 18. Modul Barang

Menu:

`Inventori → Barang`

Fungsi:

- Tambah barang.
- Lihat barang.
- Cari barang.
- Edit barang.
- Hapus barang.
- Lihat stok.

### Field Tambah Barang

- Kode barang.
- Nama barang.
- Satuan.
- Harga beli.
- Harga jual.
- Stok awal.

---

# 19. Modul Barang Masuk

Menu:

`Inventori → Barang Masuk`

### Form

- Tanggal.
- Barang.
- Jumlah.
- Harga beli.
- Supplier.
- Keterangan.

Setelah transaksi:

```text
Stok Baru = Stok Sebelum + Barang Masuk
```

Contoh:

```text
Stok sebelum = 10
Barang masuk = 20
Stok baru    = 30
```

---

# 20. Modul Barang Keluar

Menu:

`Inventori → Barang Keluar`

### Form

- Tanggal.
- Barang.
- Jumlah.
- Harga jual.
- Tujuan/keterangan.

Perhitungan:

```text
Stok Baru = Stok Sebelum - Barang Keluar
```

Sistem harus memeriksa jumlah stok sebelum transaksi disimpan.

Contoh:

```text
Stok tersedia = 10
Barang keluar = 4
Stok akhir    = 6
```

Apabila jumlah yang dikeluarkan melebihi stok:

> Stok tidak mencukupi.

Transaksi tidak boleh disimpan. Requirement validasi stok ini juga sudah ditetapkan pada rancangan awal.

---

# 21. Modul Operasional

Menu:

`Operasional`

Submenu:

```text
Operasional
├── Penghasilan
└── Pengeluaran
```

Tujuan modul:

> Mencatat seluruh uang yang masuk dan uang yang keluar dari kegiatan usaha.

---

# 22. Submodul Penghasilan

Penghasilan adalah pencatatan **uang masuk**.

Menu:

`Operasional → Penghasilan`

### Form

```text
Tanggal
Sumber Penghasilan
Nominal
Metode Pembayaran
Keterangan
```

### Metode Pembayaran

```text
Cash
QRIS
```

Contoh sumber:

- Penjualan.
- Pendapatan lainnya.
- Pemasukan usaha lainnya.

Daftar sumber dapat disesuaikan dengan kebutuhan UMKM.

---

# 23. Submodul Pengeluaran

Pengeluaran adalah pencatatan **uang keluar**.

Menu:

`Operasional → Pengeluaran`

### Form

```text
Tanggal
Kategori Pengeluaran
Nominal
Metode Pembayaran
Keterangan
```

### Kategori

Contoh:

- Bahan baku.
- Transportasi.
- Listrik.
- Internet.
- Gaji.
- Peralatan.
- Lainnya.

Kategori dapat dikelola sesuai kebutuhan usaha.

---

# 24. Cash dan QRIS

Cash dan QRIS bukan modul tersendiri.

Keduanya merupakan nilai pada field:

```text
metode
```

Contoh:

```text
Penghasilan
Rp100.000
Metode: Cash
```

atau:

```text
Penghasilan
Rp100.000
Metode: QRIS
```

Hal yang sama berlaku untuk pengeluaran.

Dengan model tersebut sistem dapat memberikan ringkasan:

```text
Uang Masuk
├── Cash  : Rp7.500.000
└── QRIS  : Rp5.000.000

Uang Keluar
├── Cash  : Rp4.000.000
└── QRIS  : Rp3.200.000
```

Pendekatan ini konsisten dengan requirement bahwa Cash dan QRIS dicatat melalui field metode, bukan menu terpisah.

---

# 25. Perhitungan Ringkasan Keuangan

Sistem menghitung:

```text
Total Penghasilan
        -
Total Pengeluaran
        =
Selisih
```

Contoh:

```text
Penghasilan = Rp10.000.000
Pengeluaran = Rp6.500.000
Selisih     = Rp3.500.000
```

Nilai tersebut merupakan **selisih pencatatan uang masuk dan uang keluar**, bukan otomatis laba akuntansi resmi. Perhitungan laba akuntansi dapat dikembangkan apabila dibutuhkan.

---

# 26. Modul Laporan

Menu:

`Laporan`

Laporan menggunakan satu halaman dengan filter sesuai kebutuhan.

### Jenis laporan

```text
Laporan
├── Barang
├── Barang Masuk
├── Barang Keluar
├── Penghasilan
└── Pengeluaran
```

### Filter

- Periode tanggal.
- Barang.
- Metode pembayaran.
- Kategori pengeluaran.
- Pengguna.

### Contoh laporan keuangan

```text
Periode: 01/08/2026 - 31/08/2026

Total Penghasilan       Rp12.500.000
Total Pengeluaran       Rp7.200.000
Selisih                 Rp5.300.000
```

---

# 27. User Management

Menu:

`Pengguna`

Admin dapat:

- Menambah user.
- Mengubah user.
- Mengubah role.
- Mengaktifkan user.
- Menonaktifkan user.
- Menghapus user jika diperlukan.

### Role

Minimal:

```text
Admin
Karyawan
```

---

# 28. Hak Akses

| Fitur | Admin | Karyawan |
|---|:---:|:---:|
| Login | ✓ | ✓ |
| Dashboard | ✓ | ✓ |
| Lihat Barang | ✓ | ✓ |
| Tambah Barang | ✓ | Sesuai izin |
| Edit Barang | ✓ | Sesuai izin |
| Hapus Barang | ✓ | ✕ |
| Barang Masuk | ✓ | ✓ |
| Barang Keluar | ✓ | ✓ |
| Penghasilan | ✓ | ✓ |
| Pengeluaran | ✓ | Sesuai izin |
| Laporan | ✓ | Terbatas |
| Kelola Pengguna | ✓ | ✕ |

Hak akses dapat disederhanakan menjadi satu role apabila UMKM hanya mempunyai satu pengguna.

---

# 29. Kebutuhan Fungsional

### FR-01 Authentication

Sistem harus memungkinkan pengguna masuk menggunakan username dan password.

### FR-02 Session

Sistem harus mempertahankan session setelah login berhasil dan menyediakan logout.

### FR-03 User Management

Admin harus dapat mengelola data pengguna.

### FR-04 Master Barang

Sistem harus menyediakan fungsi tambah, lihat, ubah, dan hapus data barang.

### FR-05 Barang Masuk

Sistem harus mencatat barang masuk dan memperbarui stok.

### FR-06 Barang Keluar

Sistem harus mencatat barang keluar dan mengurangi stok.

### FR-07 Stock Validation

Sistem harus memvalidasi stok sebelum menyimpan barang keluar.

### FR-08 Penghasilan

Sistem harus mencatat uang masuk berdasarkan tanggal, sumber, nominal, metode, dan keterangan.

### FR-09 Pengeluaran

Sistem harus mencatat uang keluar berdasarkan tanggal, kategori, nominal, metode, dan keterangan.

### FR-10 Payment Method

Sistem harus mendukung Cash dan QRIS.

### FR-11 Dashboard

Sistem harus menampilkan ringkasan barang dan transaksi keuangan.

### FR-12 Reporting

Sistem harus menyediakan pencarian dan filter berdasarkan periode.

### FR-13 User Audit

Transaksi harus menyimpan identitas pengguna yang melakukan input.

---

# 30. Kebutuhan Non-Fungsional

## 30.1 Security

- Password wajib di-hash.
- Password plaintext tidak boleh disimpan.
- Session harus aman.
- Google Sheets tidak boleh diakses langsung oleh pengguna.
- Credential Google API disimpan sebagai environment variable.
- Validasi role dilakukan pada server.

## 30.2 Usability

- Interface sederhana.
- Bahasa sistem mudah dipahami.
- Form tidak berlebihan.
- Error message jelas.
- Konfirmasi tindakan penting.
- Responsive pada desktop dan mobile.

## 30.3 Performance

Aplikasi harus tetap responsif untuk skala transaksi UMKM dan tidak melakukan request Google Sheets yang tidak diperlukan.

## 30.4 Availability

Aplikasi bergantung pada ketersediaan layanan aplikasi dan Google Sheets.

---

# 31. Business Rules

### BR-01

Setiap barang harus memiliki kode barang unik.

### BR-02

Barang masuk menambah stok.

### BR-03

Barang keluar mengurangi stok.

### BR-04

Barang keluar tidak boleh melebihi stok yang tersedia.

### BR-05

Setiap penghasilan memiliki satu metode pembayaran.

### BR-06

Setiap pengeluaran memiliki satu metode pembayaran.

### BR-07

Metode pembayaran yang tersedia minimal:

```text
Cash
QRIS
```

### BR-08

Penghasilan merupakan uang masuk.

### BR-09

Pengeluaran merupakan uang keluar.

### BR-10

Operasional merupakan kelompok menu yang menaungi Penghasilan dan Pengeluaran.

### BR-11

Setiap transaksi menyimpan user yang melakukan input.

---

# 32. Alur Sistem

## 32.1 Login

```text
Buka Sistem
     ↓
Username + Password
     ↓
Validasi
     ↓
Dashboard
```

## 32.2 Barang Masuk

```text
Barang Masuk
     ↓
Pilih Barang
     ↓
Isi Jumlah
     ↓
Validasi
     ↓
Simpan
     ↓
Stok Bertambah
```

## 32.3 Barang Keluar

```text
Barang Keluar
     ↓
Pilih Barang
     ↓
Isi Jumlah
     ↓
Cek Stok
     ↓
Stok cukup?
 ┌────┴────┐
Tidak      Ya
 ↓          ↓
Error      Simpan
            ↓
       Stok Berkurang
```

## 32.4 Uang Masuk

```text
Operasional
     ↓
Penghasilan
     ↓
Isi transaksi
     ↓
Pilih Cash / QRIS
     ↓
Simpan
     ↓
Uang Masuk Bertambah
```

## 32.5 Uang Keluar

```text
Operasional
     ↓
Pengeluaran
     ↓
Isi transaksi
     ↓
Pilih Cash / QRIS
     ↓
Simpan
     ↓
Uang Keluar Bertambah
```

---

# 33. Dashboard Data Flow

```text
Barang Masuk ──────┐
                    │
Barang Keluar ─────┤
                    ▼
                  STOK
                    │
                    ▼
               DASHBOARD

Penghasilan ────────┐
                    │
Pengeluaran ────────┤
                    ▼
             RINGKASAN KEUANGAN
                    │
                    ▼
               DASHBOARD
```

---

# 34. Kriteria Keberhasilan

Sistem dianggap berhasil apabila:

1. User dapat login menggunakan username dan password.
2. Admin dapat mengelola user.
3. User dapat mengelola data barang.
4. User dapat mencatat barang masuk.
5. User dapat mencatat barang keluar.
6. Stok berubah secara otomatis berdasarkan transaksi.
7. Sistem menolak barang keluar jika stok tidak mencukupi.
8. User dapat mencatat penghasilan.
9. User dapat mencatat pengeluaran.
10. User dapat memilih Cash atau QRIS.
11. Dashboard menampilkan ringkasan usaha.
12. User dapat melihat riwayat transaksi.
13. User dapat memfilter data berdasarkan periode.
14. Data tersimpan pada Google Sheets.
15. Hak akses pengguna diterapkan sesuai role.

Kriteria ini mempertahankan kriteria keberhasilan utama pada rancangan awal dan menyesuaikannya dengan definisi Operasional yang telah diperjelas.

---

# 35. Teknologi yang Direkomendasikan

| Komponen | Teknologi |
|---|---|
| Frontend | Next.js |
| Bahasa | TypeScript |
| Styling | Tailwind CSS / CSS |
| Backend | Next.js Server/API |
| Authentication | Custom Username/Password Session |
| Storage | Google Sheets |
| API | Google Sheets API |
| Hosting | Vercel / Server |
| Database Relasional | Tidak digunakan pada MVP |

Stack tersebut mengikuti teknologi yang sudah direkomendasikan pada rancangan awal.

---

# 36. Batasan Sistem

Versi MVP tidak mencakup:

- Akuntansi double-entry.
- Jurnal umum.
- Neraca.
- Perpajakan.
- Payroll kompleks.
- Integrasi bank.
- Payment gateway otomatis.
- Multi-cabang kompleks.
- Forecasting.
- AI.
- Manajemen gudang tingkat lanjut.

Sistem difokuskan sebagai **sistem pencatatan UMKM**, bukan sistem akuntansi atau ERP.

---

# 37. MVP Final

Fokus implementasi:

```text
LOGIN
  │
  ▼
DASHBOARD
  │
  ├── INVENTORI
  │    ├── Barang
  │    ├── Barang Masuk
  │    └── Barang Keluar
  │
  ├── OPERASIONAL
  │    ├── Penghasilan
  │    └── Pengeluaran
  │
  ├── LAPORAN
  │
  └── PENGGUNA
```

Dengan struktur ini, sistem tetap sederhana tetapi sudah mencakup kebutuhan utama pencatatan UMKM.

---

# 38. Prinsip Produk

Produk harus mengikuti prinsip:

> **Catat dengan cepat, lihat dengan jelas, kelola dengan mudah.**

Sistem tidak dirancang untuk terlihat kompleks. Fokus utamanya adalah membuat pengguna UMKM dapat:

```text
Login
  ↓
Pahami kondisi usaha
  ↓
Catat transaksi
  ↓
Simpan
  ↓
Lihat hasil
```

dengan langkah sesedikit mungkin.

---

# 39. Kesimpulan Requirement

Struktur final sistem yang menjadi acuan implementasi adalah:

```text
                         SISTEM UMKM
                              │
              ┌───────────────┼───────────────┐
              │               │               │
           INVENTORI       OPERASIONAL      LAINNYA
              │               │               │
       ┌──────┼──────┐    ┌───┴────┐       ┌──┴────┐
       │      │      │    │        │       │       │
     Barang  Masuk  Keluar Penghasilan Pengeluaran Laporan User
                              │        │
                              │        │
                           Uang Masuk  Uang Keluar
                              │        │
                         ┌────┴────────┴────┐
                         │   Cash / QRIS    │
                         └──────────────────┘
```

**Tidak ada modul Operasional terpisah yang mencatat aktivitas atau biaya operasional.**

Dalam PRD final ini, **Operasional adalah parent menu yang berisi Penghasilan dan Pengeluaran**, sehingga struktur sistem sesuai dengan kebutuhan bisnis yang telah kamu jelaskan.