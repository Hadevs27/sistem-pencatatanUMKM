import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core';

export const users = sqliteTable('users', {
  id: text('id').primaryKey(), // We can use UUID strings
  username: text('username').notNull().unique(),
  passwordHash: text('password_hash').notNull(),
  plainPassword: text('plain_password'),
  nama: text('nama').notNull(),
  role: text('role').notNull(), // Admin / Karyawan
  status: text('status').notNull(), // Aktif / Nonaktif
  createdAt: text('created_at').notNull(),
});

export const barang = sqliteTable('barang', {
  idBarang: text('id_barang').primaryKey(),
  kodeBarang: text('kode_barang').notNull().unique(),
  namaBarang: text('nama_barang').notNull(),
  satuan: text('satuan').notNull(),
  hargaBeli: integer('harga_beli').notNull(),
  hargaJual: integer('harga_jual').notNull(),
  stok: integer('stok').notNull().default(0),
  status: text('status').notNull(), // Aktif / Nonaktif
});

export const barangMasuk = sqliteTable('barang_masuk', {
  idTransaksi: text('id_transaksi').primaryKey(),
  nomorTransaksi: text('nomor_transaksi').notNull().unique(),
  tanggal: text('tanggal').notNull(),
  kodeBarang: text('kode_barang').notNull(),
  namaBarang: text('nama_barang').notNull(),
  jumlah: integer('jumlah').notNull(),
  hargaBeli: integer('harga_beli').notNull(),
  total: integer('total').notNull(),
  supplier: text('supplier'),
  keterangan: text('keterangan'),
  userId: text('user_id').notNull(),
});

export const barangKeluar = sqliteTable('barang_keluar', {
  idTransaksi: text('id_transaksi').primaryKey(),
  nomorTransaksi: text('nomor_transaksi').notNull().unique(),
  tanggal: text('tanggal').notNull(),
  kodeBarang: text('kode_barang').notNull(),
  namaBarang: text('nama_barang').notNull(),
  jumlah: integer('jumlah').notNull(),
  hargaJual: integer('harga_jual').notNull(),
  total: integer('total').notNull(),
  tujuan: text('tujuan'),
  keterangan: text('keterangan'),
  userId: text('user_id').notNull(),
});

export const penghasilan = sqliteTable('penghasilan', {
  idTransaksi: text('id_transaksi').primaryKey(),
  nomorTransaksi: text('nomor_transaksi').notNull().unique(),
  tanggal: text('tanggal').notNull(),
  sumber: text('sumber').notNull(),
  nominal: integer('nominal').notNull(),
  metode: text('metode').notNull(), // Cash / QRIS
  keterangan: text('keterangan'),
  userId: text('user_id').notNull(),
});

export const pengeluaran = sqliteTable('pengeluaran', {
  idTransaksi: text('id_transaksi').primaryKey(),
  nomorTransaksi: text('nomor_transaksi').notNull().unique(),
  tanggal: text('tanggal').notNull(),
  kategori: text('kategori').notNull(),
  nominal: integer('nominal').notNull(),
  metode: text('metode').notNull(), // Cash / QRIS
  keterangan: text('keterangan'),
  userId: text('user_id').notNull(),
});

export const penjualan = sqliteTable('penjualan', {
  idTransaksi: text('id_transaksi').primaryKey(),
  metode: text('metode').notNull().default('Cash'),
  tanggal: text('tanggal').notNull(),
  nominal: integer('nominal').notNull(),
  pcsLaku: integer('pcs_laku').notNull(),
  keterangan: text('keterangan'),
  userId: text('user_id').notNull(),
});

export const bahanBaku = sqliteTable('bahan_baku', {
  id: text('id').primaryKey(),
  namaBahan: text('nama_bahan').notNull(),
  kuantiti: text('kuantiti').notNull(),
  tanggalBuat: text('tanggal_buat').notNull(),
});
