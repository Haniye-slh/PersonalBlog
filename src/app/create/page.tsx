'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function CreatePostPage() {
  const router = useRouter()
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)

    const res = await fetch('/api/posts/create', {
      method: 'POST',
      body: JSON.stringify({ title, content }),
      headers: { 'Content-Type': 'application/json' },
    })

    if (res.ok) {
      router.push('/')
    } else {
      alert('خطا در ایجاد پست')
      setLoading(false)
    }
  }

  return (
    <main style={{ maxWidth: 600, margin: 'auto', padding: 20 }}>
      <h1 className="text-3xl font-bold text-center mt-10 mb-6 text-purple-700">
        Add New Post:
      </h1>

      <form onSubmit={handleSubmit}>
        <div>
          <label className="block text-base font-semibold text-purple-700 mb-2 tracking-wide uppercase">
            Title:
          </label>

          <input
            type="text"
            value={title}
            onChange={e => setTitle(e.target.value)}
            required
            className="w-full p-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent transition"
          />

        </div>
        <div style={{ marginTop: 10 }}>
          <label className='"block text-base font-semibold text-purple-700 mb-2 tracking-wide uppercase"'>Content:</label>
          <textarea
            value={content}
            onChange={e => setContent(e.target.value)}
            required
            rows={6}
            className="w-full p-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent transition"
          />
        </div>
        <button type="submit" disabled={loading} className={`mt-3 px-6 py-2 rounded-md font-semibold text-white transition
    ${loading
            ? 'bg-gray-400 cursor-not-allowed'
            : 'bg-purple-700 hover:bg-purple-800 cursor-pointer'
          }`}>
          {loading ? 'Sending' : 'Send'}
        </button>
      </form>
    </main>
  )
}
