'use client'

import { useRouter, useParams } from 'next/navigation'
import { useState, useEffect } from 'react'

export default function PostPage() {
  const params = useParams()
  const id = params.id
  const router = useRouter()
  const [post, setPost] = useState<{ id: number; title: string; content: string } | null>(null)
  const [editing, setEditing] = useState(false)
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')

  useEffect(() => {
    if (!id) return;
    fetch(`/api/posts/${id}`)
      .then(res => res.json())
      .then(data => {
        setPost(data)
        setTitle(data.title)
        setContent(data.content)
      })
  }, [id])


  async function handleUpdate(e: React.FormEvent) {
    e.preventDefault()
    const res = await fetch(`/api/posts/${params.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, content }),
    })
    if (res.ok) {
      const updatedPost = await res.json()
      setPost(updatedPost)
      setEditing(false)
    }
  }

  async function handleDelete() {
    if (!confirm("Are you sure you want to delete it?")) return
    const res = await fetch(`/api/posts/${params.id}`, { method: 'DELETE' })
    if (res.ok) {
      router.push('/')
    }
  }

  if (!post) return <p>Loading...</p>

  return (
    <main className="max-w-xl mx-auto p-5 border border-gray-300 rounded-xl shadow-sm">
      {editing ? (
        <form onSubmit={handleUpdate} className="space-y-6">
          <h1 className="text-3xl font-bold text-gray-900">Edit</h1>

          <input
            type="text"
            value={title}
            onChange={e => setTitle(e.target.value)}
            required
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent transition"
            placeholder="Post Title"
          />

          <textarea
            value={content}
            onChange={e => setContent(e.target.value)}
            required
            rows={6}
            className="w-full p-3 border border-gray-300 rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent transition"
            placeholder="Post Content"
          />

          <div className="flex space-x-3">
            <button
              type="submit"
              onClick={handleUpdate}
              className="bg-purple-700 text-white font-semibold px-4 py-1.5 rounded-md hover:bg-purple-800 transition text-sm"
            >
              Save
            </button>
            <button
              type="button"
              onClick={() => setEditing(false)}
              className="bg-gray-300 text-gray-700 font-semibold px-4 py-1.5 rounded-md hover:bg-gray-400 transition text-sm"
            >
              Cancel
            </button>
          </div>
        </form>
      ) : (
        <>
          <h1 className="text-3xl font-bold text-gray-900 mb-4">{post.title}</h1>
          <p className="text-gray-700 leading-relaxed mb-6">{post.content}</p>

          <div className="flex space-x-3">
            <button
              onClick={() => setEditing(true)}
              className="bg-purple-700 text-white font-semibold px-4 py-1.5 rounded-md hover:bg-purple-800 transition text-sm"
            >
              Edit
            </button>
            <button
              onClick={handleDelete}
              className="bg-red-600 text-white font-semibold px-4 py-1.5 rounded-md hover:bg-red-700 transition text-sm"
            >
              Delete
            </button>
            <button
              type="button"
              onClick={() => router.push('/')}
              className="bg-blue-700 text-white font-semibold px-4 py-1.5 rounded-md hover:bg-blue-800 transition text-sm"
            >
              HomePage
            </button>

          </div>
        </>
      )}
    </main>

  )
}
