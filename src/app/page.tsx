import { db } from '@/db'
import Link from 'next/link'

type Post = {
  id: number
  title: string
  content: string
}

export default async function HomePage() {
  const posts: Post[] = await db.post.findMany({
    orderBy: { createdAt: 'desc' }
  })

  return (
    <main style={{ maxWidth: 600, margin: 'auto', padding: 20 }}>
      <h1 className="text-5xl font-extrabold text-center mt-10 mb-10 bg-gradient-to-r from-purple-700 via-pink-500 to-indigo-500 bg-clip-text text-transparent drop-shadow-lg font-sans pb-4">My Personal Blog</h1>
      <div className="flex justify-center mt-2">
        <Link href="/create" className="inline-block px-4 py-2 bg-purple-700 hover:bg-purple-800 text-white font-semibold rounded-md shadow-md transition-colors duration-300 text-sm">New Post</Link>
      </div>
      <ul>
        {posts.map(post => (
          <li
            key={post.id}
            className="border border-gray-200 rounded-xl shadow-sm p-5 mb-6 hover:shadow-md transition-shadow list-none mt-4"
          >
            <Link href={`/posts/${post.id}`}>
              <h2 className="text-xl font-bold text-gray-800 mb-2 hover:text-purple-700 transition-colors duration-200">
                {post.title}
              </h2>
            </Link>
            <p className="text-gray-600 text-sm leading-relaxed">
              {post.content.substring(0, 100)}...
            </p>
          </li>
        ))}

      </ul>
    </main>
  )
}
