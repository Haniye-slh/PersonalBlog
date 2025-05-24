import { NextResponse } from 'next/server'
import { db } from '@/db'

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { title, content } = body

    if (typeof title !== 'string' || typeof content !== 'string') {
      return NextResponse.json({ error: 'داده‌ها معتبر نیستند' }, { status: 400 })
    }

    const post = await db.post.create({
      data: {
        title,
        content,
      },
    })

    return NextResponse.json(post)
  } catch (error) {
    return NextResponse.json({ error: 'خطا در سرور' }, { status: 500 })
  }
}
