// Impor klien route handler dari Supabase dan tipe-tipe yang dibutuhkan dari Next.js
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function GET(request: NextRequest) {
  // Membuat objek URL dari request
  const requestUrl = new URL(request.url);

  // Mengambil parameter "code" dari URL
  const code = requestUrl.searchParams.get("code");

  // Jika "code" ada, lakukan proses tukar kode dengan sesi autentikasi
  if (code) {
    // Membuat klien Supabase dengan cookies
    const supabase = createRouteHandlerClient<Database>({ cookies });

    // Menukarkan kode untuk mendapatkan sesi autentikasi
    await supabase.auth.exchangeCodeForSession(code);
  }

  // Mengalihkan pengguna kembali ke URL asal
  return NextResponse.redirect(requestUrl.origin);
}
