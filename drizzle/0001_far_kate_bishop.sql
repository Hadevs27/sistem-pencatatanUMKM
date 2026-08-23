CREATE TABLE `bahan_baku` (
	`id` text PRIMARY KEY NOT NULL,
	`nama_bahan` text NOT NULL,
	`kuantiti` text NOT NULL,
	`tanggal_buat` text NOT NULL
);
--> statement-breakpoint
CREATE TABLE `penjualan` (
	`id_transaksi` text PRIMARY KEY NOT NULL,
	`metode` text DEFAULT 'Cash' NOT NULL,
	`tanggal` text NOT NULL,
	`nominal` integer NOT NULL,
	`pcs_laku` integer NOT NULL,
	`keterangan` text,
	`user_id` text NOT NULL
);
--> statement-breakpoint
ALTER TABLE `users` ADD `plain_password` text;