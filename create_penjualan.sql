CREATE TABLE IF NOT EXISTS "penjualan" (
  "id_transaksi" text PRIMARY KEY NOT NULL,
  "tanggal" text NOT NULL,
  "nominal" integer NOT NULL,
  "pcs_laku" integer NOT NULL,
  "keterangan" text,
  "user_id" text NOT NULL
);
