# UI/UX DESIGN SPECIFICATION
## Sistem Pencatatan UMKM Berbasis Web

**Versi:** 1.0  
**Design Style:** Modern Minimal SaaS  
**Target:** Pemilik dan karyawan UMKM  
**Platform:** Web Responsive  
**Primary Goal:** Cepat dipahami, cepat digunakan, dan tetap terlihat profesional.

---

# 1. Design Direction

Desain sistem menggunakan pendekatan **modern business dashboard** yang sederhana, bersih, dan profesional.

Sistem tidak boleh terlihat seperti:

- template admin generik,
- dashboard yang terlalu ramai,
- aplikasi akuntansi enterprise,
- atau desain yang penuh gradient dan efek dekoratif.

Sistem harus terasa seperti produk yang benar-benar dibuat untuk kebutuhan operasional UMKM.

### Karakter desain

```text
Modern
Elegant
Clean
Professional
Simple
Fast
Friendly
Consistent
```

Prinsip utama:

> **Pengguna membuka sistem → langsung mengerti → langsung mencatat → selesai.**

---

# 2. UX Principles

## 2.1 One Primary Action

Setiap halaman memiliki satu aksi utama.

Contoh halaman Barang:

```text
[ + Tambah Barang ]
```

Jangan memenuhi halaman dengan banyak tombol yang memiliki tingkat kepentingan sama.

---

## 2.2 Progressive Disclosure

Informasi yang penting ditampilkan terlebih dahulu.

Informasi tambahan hanya muncul ketika diperlukan.

Contoh transaksi:

```text
Tanggal
Barang
Jumlah
```

Setelah barang dipilih:

```text
Stok tersedia
Harga
Total
```

Tidak semua informasi harus memenuhi layar sejak awal.

---

## 2.3 Consistency

Komponen yang sama harus terlihat dan bekerja dengan cara yang sama di seluruh halaman.

Contoh:

```text
Tambah Barang
Tambah Barang Masuk
Tambah Barang Keluar
Tambah Penghasilan
Tambah Pengeluaran
```

semuanya mengikuti pola form yang sama.

---

# 3. Visual Identity

## 3.1 Primary Color

Gunakan satu warna utama sebagai identitas sistem.

```css
Primary       #2563EB
Primary Hover #1D4ED8
Primary Light #EFF6FF
```

Warna primary digunakan untuk:

- tombol utama,
- active navigation,
- link,
- focus state,
- icon penting,
- selected state.

---

# 4. Neutral Color System

```css
Background      #F8FAFC
Surface         #FFFFFF

Text Primary    #0F172A
Text Secondary  #475569
Text Muted      #94A3B8

Border          #E2E8F0
Border Strong   #CBD5E1
```

Background aplikasi jangan menggunakan pure white untuk seluruh layar.

Gunakan:

```text
Background → #F8FAFC
Card       → #FFFFFF
```

sehingga card terasa terangkat secara natural.

---

# 5. Semantic Colors

## Success

```css
Success       #16A34A
Success Light #DCFCE7
```

Digunakan untuk:

- transaksi berhasil,
- stok aman,
- uang masuk.

## Warning

```css
Warning       #D97706
Warning Light #FEF3C7
```

Digunakan untuk:

- stok menipis,
- peringatan.

## Danger

```css
Danger       #DC2626
Danger Light #FEE2E2
```

Digunakan untuk:

- error,
- penghapusan,
- stok kritis,
- uang keluar.

---

# 6. Typography

Gunakan:

**Inter**

Fallback:

```text
Inter, system-ui, sans-serif
```

## Type Scale

```text
Page Title       28px / 700
Section Title    18px / 600
Card Title       15px / 600
Body             14px / 400
Small            13px / 400
Caption          12px / 500
```

Angka finansial menggunakan font weight yang lebih kuat agar mudah dipindai.

Contoh:

```text
Rp12.500.000
```

lebih besar daripada:

```text
Total Penghasilan
```

---

# 7. Layout Architecture

Desktop:

```text
┌──────────────────────────────────────────────────────────────┐
│                         TOP BAR                              │
├───────────────┬──────────────────────────────────────────────┤
│               │                                              │
│               │                                              │
│   SIDEBAR     │                 MAIN CONTENT                 │
│               │                                              │
│               │                                              │
│               │                                              │
└───────────────┴──────────────────────────────────────────────┘
```

## Sidebar

```text
Width: 240px
```

## Header

```text
Height: 64px
```

## Main Content

```text
Padding: 28px – 32px
Max Width: 1440px
```

---

# 8. Sidebar

Sidebar harus menjadi elemen navigasi utama.

```text
┌────────────────────────────┐
│                            │
│  [LOGO] NAMA UMKM          │
│                            │
│  MENU UTAMA                │
│                            │
│  ◉ Dashboard               │
│                            │
│  INVENTORI                 │
│  □ Barang                  │
│  □ Barang Masuk            │
│  □ Barang Keluar           │
│                            │
│  OPERASIONAL               │
│  □ Penghasilan             │
│  □ Pengeluaran             │
│                            │
│  □ Laporan                 │
│                            │
│  □ Pengguna                │
│                            │
│                            │
│  ────────────────────────  │
│                            │
│  [Avatar] Harry            │
│          Administrator     │
│                            │
└────────────────────────────┘
```

Struktur menu mengikuti pembagian sistem:

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

Struktur tersebut merupakan implementasi visual dari struktur fitur pada PRD.

---

# 9. Sidebar Active State

Menu aktif menggunakan background yang sangat ringan.

```css
background: #EFF6FF
color: #2563EB
```

Contoh:

```text
┌────────────────────────────┐
│  ▌ ◉ Dashboard             │
└────────────────────────────┘
```

Gunakan indicator vertical kecil atau background soft.

Jangan membuat seluruh sidebar menjadi biru.

---

# 10. Sidebar Collapsed

Desktop dapat memiliki mode collapsed:

```text
Expanded
240px
```

menjadi:

```text
Collapsed
72px
```

Ketika collapsed:

```text
┌───────┐
│  ◉    │
│  ▣    │
│  ⇩    │
│  ⇧    │
│  ▤    │
│  ⚙    │
└───────┘
```

Tooltip ditampilkan ketika cursor berada di icon.

---

# 11. Top Bar

Top bar harus minimal.

```text
┌────────────────────────────────────────────────────────────┐
│ Dashboard                               🔔   Harry ▾       │
└────────────────────────────────────────────────────────────┘
```

Isi:

- breadcrumb atau nama halaman,
- notification,
- profile,
- role.

Tidak perlu global search apabila belum menjadi requirement.

---

# 12. Login Design

Login adalah satu-satunya halaman yang tidak menggunakan sidebar.

## Desktop

```text
┌──────────────────────────────────────────────────────────────┐
│                                                              │
│                BRAND / VISUAL        LOGIN                  │
│                                                              │
│                NAMA UMKM             Selamat Datang         │
│                                                              │
│                Sistem Pencatatan     Masuk ke akun Anda     │
│                                                              │
│                Kelola pencatatan                              │
│                usaha dengan mudah.    Username              │
│                                      ┌───────────────────┐  │
│                                      │                   │  │
│                                      └───────────────────┘  │
│                                                              │
│                                      Password               │
│                                      ┌───────────────────┐  │
│                                      │ •••••••••••    👁 │  │
│                                      └───────────────────┘  │
│                                                              │
│                                      □ Ingat saya            │
│                                                              │
│                                      ┌───────────────────┐  │
│                                      │       Masuk       │  │
│                                      └───────────────────┘  │
│                                                              │
└──────────────────────────────────────────────────────────────┘
```

Login hanya meminta:

```text
Username
Password
```

sesuai requirement autentikasi sistem.

---

# 13. Dashboard Design

Tujuan dashboard:

> **Memberikan gambaran kondisi usaha dalam 5–10 detik.**

---

## 13.1 Header

```text
Dashboard

Selamat datang kembali.

[ Bulan Ini ▾ ]
```

Periode:

```text
Hari Ini
7 Hari
Bulan Ini
Custom
```

---

# 14. Summary Cards

Gunakan empat card.

```text
┌─────────────────────┐
│ Penghasilan         │
│                     │
│ Rp12.500.000        │
│ ↑ 12,4%             │
└─────────────────────┘

┌─────────────────────┐
│ Pengeluaran         │
│                     │
│ Rp7.200.000         │
│ ↓ 4,2%              │
└─────────────────────┘

┌─────────────────────┐
│ Selisih             │
│                     │
│ Rp5.300.000         │
└─────────────────────┘

┌─────────────────────┐
│ Total Stok          │
│                     │
│ 328 item            │
│ 12 jenis barang     │
└─────────────────────┘
```

Informasi dashboard mengikuti kebutuhan ringkasan penghasilan, pengeluaran, selisih, stok, Cash, QRIS, dan transaksi terbaru.

---

# 15. Financial Overview

```text
┌───────────────────────────────────────────────────────────┐
│ Ringkasan Keuangan                       Bulan Ini ▾     │
│                                                           │
│ Rp15jt ┤                          ╭──╮                    │
│ Rp10jt ┤             ╭──╮       │  │                    │
│  Rp5jt ┤    ╭──╮     │  │╭──────╯  ╰──╮                │
│    Rp0 ┼────┴──┴─────┴──┴─────────────┴────            │
│                                                           │
│      ━ Penghasilan       ━ Pengeluaran                    │
└───────────────────────────────────────────────────────────┘
```

Chart cukup menggunakan dua series:

```text
Penghasilan
Pengeluaran
```

Jangan menambahkan banyak chart yang tidak membantu.

---

# 16. Payment Overview

Karena Cash dan QRIS merupakan metode pembayaran, tampilkan ringkasan sederhana.

```text
┌─────────────────────────────────┐
│ Metode Pembayaran               │
│                                 │
│ Cash                            │
│ ███████████████████░  62%      │
│ Rp7.500.000                     │
│                                 │
│ QRIS                            │
│ ████████████░░░░░░░  38%      │
│ Rp5.000.000                     │
└─────────────────────────────────┘
```

Cash dan QRIS tidak dibuat sebagai menu sidebar terpisah karena keduanya merupakan field metode transaksi.

---

# 17. Stock Alert

Dashboard menampilkan stok yang membutuhkan perhatian.

```text
┌──────────────────────────────────────────────────────┐
│ Kondisi Stok                           Lihat Semua →  │
│                                                      │
│ Indomie              28 pcs        ● Aman            │
│ Aqua                   4 dus        ● Menipis        │
│ Minyak                 2 pcs        ● Kritis         │
│ Tepung                18 pcs        ● Aman           │
└──────────────────────────────────────────────────────┘
```

Status:

```text
● Aman
● Menipis
● Kritis
```

---

# 18. Recent Transactions

```text
┌─────────────────────────────────────────────────────────────┐
│ Transaksi Terbaru                         Lihat Semua →     │
├──────────┬─────────────┬────────────┬──────────┬───────────┤
│ Tanggal  │ Transaksi   │ Jenis      │ Metode   │ Nominal   │
├──────────┼─────────────┼────────────┼──────────┼───────────┤
│ 22 Aug   │ Penjualan   │ Penghasilan│ QRIS     │ +150.000  │
│ 22 Aug   │ Belanja     │ Pengeluaran│ Cash     │ -80.000   │
│ 22 Aug   │ Restock     │ Barang Masuk│ —       │ —         │
└──────────┴─────────────┴────────────┴──────────┴───────────┘
```

Nominal:

```text
+ Rp → success
- Rp → danger
```

---

# 19. Inventory — Barang

Page header:

```text
Barang

Kelola daftar barang dan stok usaha.

                              [ + Tambah Barang ]
```

Search:

```text
┌───────────────────────────────────────────────┐
│ 🔍 Cari kode atau nama barang...              │
└───────────────────────────────────────────────┘
```

Table:

```text
┌────────┬────────────────┬────────┬────────────┬───────┬───────┐
│ Kode   │ Nama           │ Satuan │ Harga Jual │ Stok  │ Aksi  │
├────────┼────────────────┼────────┼────────────┼───────┼───────┤
│ BR001  │ Indomie Goreng │ pcs    │ Rp3.500    │ 28    │ ⋮     │
│ BR002  │ Aqua 600ml     │ botol  │ Rp3.000    │ 42    │ ⋮     │
│ BR003  │ Minyak 1L      │ botol  │ Rp17.000   │ 6     │ ⋮     │
└────────┴────────────────┴────────┴────────────┴───────┴───────┘
```

---

# 20. Product Status Badge

Gunakan badge kecil.

```text
● Aman
● Menipis
● Kritis
```

Contoh:

```text
28 pcs   [ Aman ]
4 pcs    [ Menipis ]
2 pcs    [ Kritis ]
```

Badge tidak boleh terlalu besar.

---

# 21. Tambah Barang

Form:

```text
Tambah Barang

Informasi Barang

Kode Barang
[ BR001                         ]

Nama Barang
[ Indomie Goreng                ]

Satuan
[ pcs ▼                        ]

Harga Beli
[ Rp 3.000                      ]

Harga Jual
[ Rp 3.500                      ]

Stok Awal
[ 20                            ]

────────────────────────────────────────

                         [ Batal ] [ Simpan Barang ]
```

Form menggunakan dua column pada desktop jika jumlah field bertambah.

---

# 22. Barang Masuk

Header:

```text
Barang Masuk

Catat barang yang masuk ke stok.

[ + Barang Masuk ]
```

Filter:

```text
[ 🔍 Cari transaksi... ] [ Filter Tanggal ▾ ]
```

Table:

```text
Nomor       Tanggal       Barang        Jumlah       Supplier
BM-00021    22 Aug        Indomie       20           PT ABC
BM-00020    21 Aug        Aqua          15           PT XYZ
```

---

# 23. Form Barang Masuk

```text
Tambah Barang Masuk

Tanggal
[ 22 Agustus 2026 ]

Barang
[ Pilih barang... ▼ ]

Stok Saat Ini
28 pcs

Jumlah Masuk
[ 20 ]

Harga Beli
[ Rp3.000 ]

Supplier
[ PT ABC ]

Keterangan
[ Opsional... ]

──────────────────────────────

Total
Rp60.000

                    [ Batal ] [ Simpan ]
```

Setelah berhasil:

```text
✓ Barang masuk berhasil dicatat.
Stok Indomie bertambah 20 pcs.
```

---

# 24. Barang Keluar

Struktur visual harus konsisten dengan Barang Masuk.

```text
Barang Keluar

Catat barang yang keluar dari stok.

[ + Barang Keluar ]
```

Table:

```text
Nomor       Tanggal       Barang        Jumlah       Tujuan
BK-00032    22 Aug        Indomie       5            Penjualan
BK-00031    22 Aug        Aqua          10           Penjualan
```

---

# 25. Stock Validation

Ketika memilih barang:

```text
Stok tersedia
28 pcs
```

Jumlah:

```text
[ 25 ]
```

Tampilkan:

```text
Stok setelah transaksi
3 pcs
```

Jika jumlah melebihi stok:

```text
┌──────────────────────────────────────┐
│ ⚠ Stok tidak mencukupi              │
│                                      │
│ Stok tersedia : 28 pcs               │
│ Jumlah keluar : 35 pcs               │
└──────────────────────────────────────┘
```

Tombol simpan dinonaktifkan.

---

# 26. Operasional Navigation

Operasional adalah parent menu.

```text
OPERASIONAL

  ↓

┌───────────────────────────┐
│ Penghasilan               │
│ Uang masuk                │
├───────────────────────────┤
│ Pengeluaran               │
│ Uang keluar               │
└───────────────────────────┘
```

Microcopy harus membantu pengguna memahami istilah:

```text
Penghasilan
"Catat uang yang masuk"

Pengeluaran
"Catat uang yang keluar"
```

Dengan demikian pengguna tidak perlu menebak arti menu.

---

# 27. Penghasilan Page

Header:

```text
Penghasilan

Catat semua uang yang masuk ke usaha.

[ + Tambah Penghasilan ]
```

Summary:

```text
┌──────────────────────────────┐
│ Penghasilan Bulan Ini        │
│                              │
│ Rp12.500.000                 │
│                              │
│ Cash      Rp7.500.000        │
│ QRIS      Rp5.000.000        │
└──────────────────────────────┘
```

Table:

```text
Tanggal    Sumber        Metode      Nominal
22 Aug     Penjualan     QRIS        Rp150.000
22 Aug     Penjualan     Cash        Rp85.000
21 Aug     Penjualan     QRIS        Rp210.000
```

---

# 28. Tambah Penghasilan

```text
Tambah Penghasilan

Tanggal
[ 22 Agustus 2026 ]

Sumber Penghasilan
[ Penjualan ▼ ]

Nominal
[ Rp150.000 ]

Metode Pembayaran

┌─────────────────┐ ┌─────────────────┐
│      CASH       │ │      QRIS       │
│        ✓        │ │                 │
└─────────────────┘ └─────────────────┘

Keterangan
[ Opsional... ]

                   [ Batal ] [ Simpan ]
```

Cash dan QRIS menggunakan segmented control agar lebih cepat daripada dropdown.

---

# 29. Pengeluaran Page

Header:

```text
Pengeluaran

Catat semua uang yang keluar dari usaha.

[ + Tambah Pengeluaran ]
```

Summary:

```text
┌──────────────────────────────┐
│ Pengeluaran Bulan Ini        │
│                              │
│ Rp7.200.000                  │
│                              │
│ Cash      Rp4.000.000        │
│ QRIS      Rp3.200.000        │
└──────────────────────────────┘
```

Table:

```text
Tanggal    Kategori       Metode       Nominal
22 Aug     Bahan Baku     Cash         Rp250.000
21 Aug     Transportasi   Cash         Rp50.000
20 Aug     Internet       QRIS         Rp300.000
```

---

# 30. Tambah Pengeluaran

```text
Tambah Pengeluaran

Tanggal
[ 22 Agustus 2026 ]

Kategori
[ Bahan Baku ▼ ]

Nominal
[ Rp250.000 ]

Metode Pembayaran

┌─────────────────┐ ┌─────────────────┐
│      CASH       │ │      QRIS       │
│        ✓        │ │                 │
└─────────────────┘ └─────────────────┘

Keterangan
[ Opsional... ]

                    [ Batal ] [ Simpan ]
```

---

# 31. Financial Summary

Di halaman penghasilan/pengeluaran, gunakan summary kecil.

```text
┌─────────────────┐
│ Penghasilan     │
│ Rp12.500.000    │
└─────────────────┘

┌─────────────────┐
│ Pengeluaran     │
│ Rp7.200.000     │
└─────────────────┘

┌─────────────────┐
│ Selisih         │
│ Rp5.300.000     │
└─────────────────┘
```

Perhitungan:

```text
Penghasilan
-
Pengeluaran
=
Selisih
```

Ini merupakan **selisih pencatatan uang masuk dan uang keluar**, bukan laba akuntansi formal.

---

# 32. Laporan

Halaman laporan dibuat sebagai satu workspace.

```text
Laporan

[ Barang ] [ Barang Masuk ] [ Barang Keluar ]
[ Penghasilan ] [ Pengeluaran ]
```

Filter:

```text
Periode

[ 01 Aug 2026 ] — [ 31 Aug 2026 ]

[ Terapkan ]
```

Summary:

```text
Penghasilan      Rp12.500.000
Pengeluaran      Rp7.200.000
Selisih          Rp5.300.000
```

Table ditampilkan di bawah summary.

---

# 33. User Management

Page:

```text
Pengguna

Kelola akun dan akses pengguna.

[ + Tambah Pengguna ]
```

Table:

```text
Nama       Username     Role        Status       Aksi
Harry      harry        Admin       Aktif        ⋮
Budi       budi         Karyawan    Aktif        ⋮
Andi       andi         Karyawan    Nonaktif     ⋮
```

Status:

```text
[ Aktif ]
[ Nonaktif ]
```

---

# 34. Add User

```text
Tambah Pengguna

Nama
[ Harry ]

Username
[ harry ]

Password
[ ••••••••• ]

Role

[ Admin ▼ ]

Status

[ ● Aktif ]

                  [ Batal ] [ Simpan ]
```

---

# 35. Empty State

Setiap halaman tanpa data harus memiliki empty state.

Contoh barang:

```text
              ┌─────────────┐
              │     📦      │
              └─────────────┘

          Belum ada barang

     Tambahkan barang pertama
     untuk mulai mengelola stok.

           [ + Tambah Barang ]
```

Penghasilan:

```text
              Belum ada penghasilan

        Belum ada transaksi uang masuk
        pada periode ini.

         [ + Tambah Penghasilan ]
```

---

# 36. Delete Confirmation

```text
Hapus Barang?

Barang "Indomie Goreng" akan dihapus
dari daftar barang.

Tindakan ini tidak dapat dibatalkan.

[ Batal ] [ Hapus Barang ]
```

Gunakan warna danger hanya pada tombol tindakan destruktif.

---

# 37. Toast Notification

Success:

```text
┌─────────────────────────────────┐
│ ✓ Data berhasil disimpan        │
└─────────────────────────────────┘
```

Lebih spesifik:

```text
✓ Penghasilan Rp150.000 berhasil dicatat.
```

Error:

```text
┌─────────────────────────────────┐
│ ⚠ Gagal menyimpan data          │
│   Silakan coba kembali.         │
└─────────────────────────────────┘
```

Toast muncul di kanan bawah.

---

# 38. Form Validation

Validation harus muncul dekat dengan field.

Contoh:

```text
Jumlah

[ -5 ]

⚠ Jumlah harus lebih besar dari 0.
```

Kode:

```text
Kode Barang

[ BR001 ]

⚠ Kode barang sudah digunakan.
```

Nominal:

```text
Nominal

[ Rp0 ]

⚠ Nominal harus lebih besar dari Rp0.
```

---

# 39. Loading State

Gunakan skeleton, bukan halaman kosong.

```text
┌─────────────────────────────────────┐
│ █████████████                       │
│                                     │
│ ████████      ████████              │
│                                     │
│ █████████████████████████           │
└─────────────────────────────────────┘
```

Button:

```text
[ Menyimpan... ]
```

Saat loading, button tidak dapat diklik dua kali.

---

# 40. Table Design

Table harus terasa ringan.

```text
Header
────────────────────────────────────
Row
────────────────────────────────────
Row
────────────────────────────────────
Row
```

Gunakan:

```text
Row Height: 48–56px
Border: #E2E8F0
Hover: #F8FAFC
```

Hindari border vertikal terlalu banyak.

---

# 41. Button System

## Primary

```text
[ + Tambah Barang ]
```

## Secondary

```text
[ Filter ]
[ Export ]
```

## Ghost

```text
[ Lihat Semua → ]
```

## Danger

```text
[ Hapus ]
```

Satu halaman idealnya hanya mempunyai satu primary CTA.

---

# 42. Iconography

Gunakan satu icon library.

Rekomendasi:

**Lucide Icons**

Mapping:

```text
Dashboard       LayoutDashboard
Barang          Package
Barang Masuk    PackagePlus
Barang Keluar   PackageMinus
Penghasilan     TrendingUp
Pengeluaran     TrendingDown
Laporan         FileText
Pengguna        Users
Logout          LogOut
Menu            Menu
Settings        Settings
Notification    Bell
Search          Search
```

Jangan mencampur banyak icon library.

---

# 43. Component Design System

Komponen reusable:

```text
components/
│
├── layout/
│   ├── Sidebar
│   ├── Header
│   ├── PageContainer
│   └── MobileNav
│
├── ui/
│   ├── Button
│   ├── Input
│   ├── Select
│   ├── DatePicker
│   ├── Modal
│   ├── Badge
│   ├── Dropdown
│   ├── Toast
│   ├── Skeleton
│   └── EmptyState
│
├── dashboard/
│   ├── SummaryCard
│   ├── FinancialChart
│   ├── PaymentSummary
│   ├── StockAlert
│   └── RecentTransactions
│
├── inventory/
│   ├── ProductTable
│   ├── ProductForm
│   ├── IncomingForm
│   ├── OutgoingForm
│   └── StockBadge
│
└── operational/
    ├── IncomeForm
    ├── ExpenseForm
    ├── IncomeTable
    └── ExpenseTable
```

Tujuannya agar semua halaman berbagi design system yang sama.

---

# 44. Spacing System

Gunakan kelipatan 4px.

```text
4px
8px
12px
16px
20px
24px
32px
40px
48px
```

Contoh:

```text
Card Padding      20–24px
Section Gap       24–32px
Input Gap         16px
Button Gap        8–12px
```

Spacing yang konsisten akan membuat interface terlihat profesional meskipun desainnya sederhana.

---

# 45. Border Radius

```text
Input       8px
Button      8px
Badge       999px
Card        12px
Modal       16px
```

Jangan membuat seluruh komponen terlalu rounded.

---

# 46. Shadow

Gunakan shadow tipis.

Card:

```css
box-shadow:
0 1px 2px rgba(15, 23, 42, 0.04);
```

Modal:

```css
box-shadow:
0 16px 40px rgba(15, 23, 42, 0.12);
```

Sebagian besar card tetap cukup menggunakan border.

---

# 47. Mobile Design

Pada mobile sidebar menjadi drawer.

```text
┌──────────────────────────────┐
│ ☰    Dashboard          🔔  │
├──────────────────────────────┤
│                              │
│ Penghasilan                  │
│ Rp12.500.000                 │
│                              │
│ Pengeluaran                  │
│ Rp7.200.000                  │
│                              │
│ Selisih                      │
│ Rp5.300.000                  │
│                              │
│ Stok Kritis                  │
│ Minyak 1L          2 pcs     │
│                              │
└──────────────────────────────┘
```

Table besar pada desktop berubah menjadi card pada mobile.

---

# 48. Mobile Transaction Card

Desktop:

```text
Tanggal | Transaksi | Metode | Nominal
```

Mobile:

```text
┌───────────────────────────────┐
│ Penjualan                      │
│ 22 Agustus 2026               │
│                               │
│ QRIS                  +150k   │
└───────────────────────────────┘
```

Tujuannya menghindari horizontal scrolling sebanyak mungkin.

---

# 49. Responsive Breakpoints

```text
Mobile   < 768px
Tablet   768px – 1024px
Desktop  > 1024px
Large    > 1440px
```

Pada desktop:

```text
Sidebar + Content
```

Pada tablet:

```text
Collapsed Sidebar + Content
```

Pada mobile:

```text
Header + Drawer Navigation
```

---

# 50. Accessibility

Minimal harus:

- memiliki label pada input,
- memiliki focus state,
- warna tidak menjadi satu-satunya indikator,
- tombol memiliki nama yang jelas,
- area klik cukup besar,
- contrast text memenuhi standar,
- navigation dapat digunakan dengan keyboard.

Contoh:

Jangan hanya:

```text
🔴
```

gunakan:

```text
● Kritis
```

---

# 51. Microcopy

Gunakan Bahasa Indonesia sederhana.

### Jangan:

```text
Create Transaction
```

### Gunakan:

```text
Tambah Transaksi
```

### Jangan:

```text
Invalid Input
```

### Gunakan:

```text
Data belum lengkap.
```

### Jangan:

```text
Transaction Successfully Created
```

### Gunakan:

```text
Penghasilan berhasil dicatat.
```

---

# 52. Dashboard Information Hierarchy

Urutan visual:

```text
1. Kondisi Keuangan
       ↓
2. Kondisi Stok
       ↓
3. Transaksi Terbaru
       ↓
4. Informasi Pendukung
```

Jangan menampilkan chart sebelum angka utama.

---

# 53. Financial Color Rules

Penghasilan:

```text
Text/Icon → Success
```

Pengeluaran:

```text
Text/Icon → Danger
```

Selisih positif:

```text
Success
```

Selisih negatif:

```text
Danger
```

Cash/QRIS tetap menggunakan warna netral; jangan memberi warna berbeda hanya demi dekorasi.

---

# 54. Interaction Flow

## Input Penghasilan

```text
Operasional
     ↓
Penghasilan
     ↓
Tambah Penghasilan
     ↓
Isi Form
     ↓
Pilih Cash / QRIS
     ↓
Simpan
     ↓
Toast Success
     ↓
Table Refresh
     ↓
Dashboard Update
```

## Input Pengeluaran

```text
Operasional
     ↓
Pengeluaran
     ↓
Tambah Pengeluaran
     ↓
Isi Form
     ↓
Pilih Cash / QRIS
     ↓
Simpan
     ↓
Toast Success
     ↓
Table Refresh
     ↓
Dashboard Update
```

---

# 55. Page Template

Semua halaman utama menggunakan struktur konsisten:

```text
Page Title
Page Description

Primary Action

Filter / Search

Summary (jika diperlukan)

Main Content
```

Contoh:

```text
Barang
Kelola barang dan stok usaha.

[ + Tambah Barang ]

[ Search... ] [ Filter ]

────────────────────────

TABLE
```

Dengan pola tersebut pengguna tidak perlu belajar ulang layout setiap halaman.

---

# 56. Visual Hierarchy Example

```text
PAGE TITLE
28px / Bold

Page description
14px / Muted

Primary Button
14px / Semibold

Section title
18px / Semibold

Table content
14px / Regular
```

Jangan membuat semua teks bold.

---

# 57. Design Anti-Pattern

Hindari:

```text
❌ Gradient pada setiap card
❌ 10+ summary cards
❌ Glassmorphism
❌ Neon colors
❌ Shadow terlalu kuat
❌ Icon terlalu besar
❌ Semua elemen rounded 20px+
❌ Chart dekoratif
❌ Animasi berlebihan
❌ Sidebar penuh warna
❌ Dashboard terlalu padat
❌ Button terlalu banyak
```

---

# 58. Design Character

Produk harus terasa:

```text
                   PROFESSIONAL
                        ▲
                        │
                        │
          SIMPLE ◀─────┼─────▶ MODERN
                        │
                        │
                        ▼
                     FRIENDLY
```

Bukan:

```text
Complex
Decorative
Enterprise-heavy
Over-animated
```

---

# 59. Final Screen Map

```text
LOGIN
  │
  ▼
DASHBOARD
  │
  ├──────────────────────────────────┐
  │                                  │
  ▼                                  ▼
INVENTORI                        OPERASIONAL
  │                                  │
  ├── Barang                         ├── Penghasilan
  │                                  │
  ├── Barang Masuk                   └── Pengeluaran
  │
  └── Barang Keluar
  │
  ▼
LAPORAN
  │
  ▼
PENGGUNA
```

---

# 60. Final Design Goal

Target akhir interface:

> **Terlihat seperti aplikasi SaaS profesional yang dibuat oleh tim product engineer, tetapi tetap sesederhana aplikasi pencatatan harian UMKM.**

Pengguna harus bisa membuka sistem dan memahami tiga hal secara langsung:

```text
1. Berapa uang yang masuk?
2. Berapa uang yang keluar?
3. Bagaimana kondisi barang/stok?
```

Kemudian pengguna dapat melakukan pencatatan melalui:

```text
Barang Masuk
Barang Keluar
Penghasilan
Pengeluaran
```

dengan alur yang pendek dan konsisten.

---

# 61. Design Summary

```text
STYLE
Modern + Minimal + Professional

COLOR
Neutral + Blue Primary + Semantic Colors

LAYOUT
240px Sidebar + 64px Header + Flexible Content

NAVIGATION
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

KEY EXPERIENCE
Login
→ Dashboard
→ Pilih transaksi
→ Isi form
→ Simpan
→ Dashboard ter-update

CORE PRINCIPLE
Simple to understand.
Fast to operate.
Consistent everywhere.
```

Desain ini menjadi **acuan UI/UX utama untuk implementasi frontend** dan harus mengikuti struktur bisnis PRD: **Inventori untuk barang, Operasional untuk uang masuk/keluar, Cash/QRIS sebagai metode transaksi, serta Google Sheets sebagai penyimpanan data**.