import { pgTable, text, integer } from 'drizzle-orm/pg-core';

export const users = pgTable('users', {
  id: text('id').primaryKey(),
  username: text('username').notNull().unique(),
  passwordHash: text('password_hash').notNull(),
  plainPassword: text('plain_password'),
  nama: text('nama').notNull(),
  role: text('role').notNull(), // Admin / Staff
  status: text('status').notNull(), // Aktif / Nonaktif
  createdAt: text('created_at').notNull(),
});

export const barangMasuk = pgTable('barang_masuk', {
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

export const barangKeluar = pgTable('barang_keluar', {
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

export const penghasilan = pgTable('penghasilan', {
  idTransaksi: text('id_transaksi').primaryKey(),
  nomorTransaksi: text('nomor_transaksi').notNull().unique(),
  tanggal: text('tanggal').notNull(),
  sumber: text('sumber').notNull(),
  nominal: integer('nominal').notNull(),
  metode: text('metode').notNull(),
  keterangan: text('keterangan'),
  userId: text('user_id').notNull(),
});

export const pengeluaran = pgTable('pengeluaran', {
  idTransaksi: text('id_transaksi').primaryKey(),
  nomorTransaksi: text('nomor_transaksi').notNull().unique(),
  tanggal: text('tanggal').notNull(),
  kategori: text('kategori').notNull(),
  nominal: integer('nominal').notNull(),
  metode: text('metode').notNull(),
  keterangan: text('keterangan'),
  userId: text('user_id').notNull(),
});

export const penjualan = pgTable('penjualan', {
  idTransaksi: text('id_transaksi').primaryKey(),
  metode: text('metode').notNull().default('Cash'),
  tanggal: text('tanggal').notNull(),
  nominal: integer('nominal').notNull(),
  pcsLaku: integer('pcs_laku').notNull(),
  keterangan: text('keterangan'),
  userId: text('user_id').notNull(),
});

export const bahanBaku = pgTable('bahan_baku', {
  id: text('id').primaryKey(),
  namaBahan: text('nama_bahan').notNull(),
  kuantiti: text('kuantiti').notNull(),
  tanggalBuat: text('tanggal_buat').notNull(),
});
