import { db } from '@/db'
import { NextResponse } from 'next/server'

export async function GET(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const postId = Number(id)
  const post = await db.post.findUnique({ where: { id: postId } })
  if (!post) return NextResponse.json({ error: "Not Found" }, { status: 404 })
  return NextResponse.json(post)
}

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const postId = Number(id)
  const { title, content } = await req.json()
  const updated = await db.post.update({
    where: { id: postId },
    data: { title, content },
  })
  return NextResponse.json(updated)
}

export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const postId = Number(id)
  try {
    await db.post.delete({ where: { id: postId } })
    return NextResponse.json({ message: "Deleted" })
  } catch (_error) {
    return NextResponse.json({ error: "Not Found" }, { status: 404 })
  }
}
