import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'

// Thêm chữ 'async' vào dòng dưới
export async function createClient() {
  // Thêm chữ 'await' vào dòng dưới để chờ lấy cookie
  const cookieStore = await cookies()

  return createServerClient(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll()
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            )
          } catch {
            // Bỏ qua lỗi
          }
        },
      },
    }
  )
}