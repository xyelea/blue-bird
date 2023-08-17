// Impor fungsi untuk membuat klien middleware dari Supabase dan tipe yang diperlukan dari Next.js
import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs";
import { NextRequest, NextResponse } from "next/server";

export async function middleware(req: NextRequest) {
  // Membuat objek respons Next.js yang akan dikembalikan
  const res = NextResponse.next();

  // Membuat klien Supabase dengan menggunakan objek permintaan dan respons saat ini
  const supabase = createMiddlewareClient({ req, res });

  // Mengambil sesi autentikasi dari cookie dalam permintaan saat ini
  // (Catatan: Kode ini tidak menangani kasus ketika cookie kedaluwarsa atau tidak valid)
  await supabase.auth.getSession();

  // Mengembalikan objek respons yang mungkin telah dimodifikasi oleh Supabase
  return res;
}
