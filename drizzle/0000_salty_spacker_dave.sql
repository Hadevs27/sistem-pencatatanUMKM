CREATE TABLE `barang` (
	`id_barang` text PRIMARY KEY NOT NULL,
	`kode_barang` text NOT NULL,
	`nama_barang` text NOT NULL,
	`satuan` text NOT NULL,
	`harga_beli` integer NOT NULL,
	`harga_jual` integer NOT NULL,
	`stok` integer DEFAULT 0 NOT NULL,
	`status` text NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `barang_kode_barang_unique` ON `barang` (`kode_barang`);--> statement-breakpoint
CREATE TABLE `barang_keluar` (
	`id_transaksi` text PRIMARY KEY NOT NULL,
	`nomor_transaksi` text NOT NULL,
	`tanggal` text NOT NULL,
	`kode_barang` text NOT NULL,
	`nama_barang` text NOT NULL,
	`jumlah` integer NOT NULL,
	`harga_jual` integer NOT NULL,
	`total` integer NOT NULL,
	`tujuan` text,
	`keterangan` text,
	`user_id` text NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `barang_keluar_nomor_transaksi_unique` ON `barang_keluar` (`nomor_transaksi`);--> statement-breakpoint
CREATE TABLE `barang_masuk` (
	`id_transaksi` text PRIMARY KEY NOT NULL,
	`nomor_transaksi` text NOT NULL,
	`tanggal` text NOT NULL,
	`kode_barang` text NOT NULL,
	`nama_barang` text NOT NULL,
	`jumlah` integer NOT NULL,
	`harga_beli` integer NOT NULL,
	`total` integer NOT NULL,
	`supplier` text,
	`keterangan` text,
	`user_id` text NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `barang_masuk_nomor_transaksi_unique` ON `barang_masuk` (`nomor_transaksi`);--> statement-breakpoint
CREATE TABLE `pengeluaran` (
	`id_transaksi` text PRIMARY KEY NOT NULL,
	`nomor_transaksi` text NOT NULL,
	`tanggal` text NOT NULL,
	`kategori` text NOT NULL,
	`nominal` integer NOT NULL,
	`metode` text NOT NULL,
	`keterangan` text,
	`user_id` text NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `pengeluaran_nomor_transaksi_unique` ON `pengeluaran` (`nomor_transaksi`);--> statement-breakpoint
CREATE TABLE `penghasilan` (
	`id_transaksi` text PRIMARY KEY NOT NULL,
	`nomor_transaksi` text NOT NULL,
	`tanggal` text NOT NULL,
	`sumber` text NOT NULL,
	`nominal` integer NOT NULL,
	`metode` text NOT NULL,
	`keterangan` text,
	`user_id` text NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `penghasilan_nomor_transaksi_unique` ON `penghasilan` (`nomor_transaksi`);--> statement-breakpoint
CREATE TABLE `users` (
	`id` text PRIMARY KEY NOT NULL,
	`username` text NOT NULL,
	`password_hash` text NOT NULL,
	`nama` text NOT NULL,
	`role` text NOT NULL,
	`status` text NOT NULL,
	`created_at` text NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `users_username_unique` ON `	` (`username`);