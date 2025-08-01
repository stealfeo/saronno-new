'use client'
import { useEffect, useState } from 'react'
import { createClient } from '@supabase/supabase-js'
import NewsCard from '../components/NewsCard'
import Image from 'next/image'
import Link from 'next/link'
import CategoryNavbar from '../components/CategoryNavbar'
import { Download } from 'lucide-react'

const supabase = createClient(
  'https://ihexdbticbojrpnoauco.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImloZXhkYnRpY2JvanJwbm9hdWNvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTM0MDQzNDYsImV4cCI6MjA2ODk4MDM0Nn0.fBkm9FKEHQgDTdYCP3K-8s1IZaw9E6Q5h9vVMZKMkgQ'
)

type Article = {
  id: string
  title: string
  subtitle: string
  image_url: string
  slug: string
  tags: string[]
  category: string
  content: string
}

export default function Home() {
  const [articles, setArticles] = useState<Article[]>([])
  const [category, setCategory] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')

  const fetchArticles = async (cat: string | null = null) => {
    setLoading(true)
    let query = supabase.from('articles').select('*').order('created_at', { ascending: false })
    if (cat) query = query.eq('category', cat)
    const { data, error } = await query
    if (!error && data) setArticles(data as Article[])
    setLoading(false)
  }

  const handleSearch = async (query: string) => {
    setSearchQuery(query)
    const q = query.trim()

    if (q === '') {
      fetchArticles(category)
      return
    }

    setLoading(true)
    const lower = q.toLowerCase()

    const { data, error } = await supabase
      .from('articles')
      .select('*')
      .order('created_at', { ascending: false })

    if (!error && data) {
      const filtered = data.filter((a: Article) => {
        const tagMatch = a.tags?.some((t) => t.toLowerCase().includes(lower))
        const titleMatch = a.title?.toLowerCase().includes(lower)
        const subtitleMatch = a.subtitle?.toLowerCase().includes(lower)
        return tagMatch || titleMatch || subtitleMatch
      })
      setArticles(filtered as Article[])
    }

    setLoading(false)
  }

  useEffect(() => {
    fetchArticles(category)
  }, [category])

  const featured = articles[0]
  const others = articles

  return (
    <>
      <div className="flex justify-center mb-8">
        <a
          href="/files/quotidiano.pdf"
          download
          className="flex items-center gap-2 bg-brand-cyan hover:bg-brand-orange text-white font-semibold px-6 py-3 rounded-full shadow-lg transition-colors duration-200"
        >
          <Download className="w-5 h-5" />
          Scarica il quotidiano in PDF
        </a>
      </div>

      {/* ✅ Passiamo searchQuery alla navbar */}
      <CategoryNavbar
        onSelectCategory={setCategory}
        onSearch={handleSearch}
        searchValue={searchQuery} // ✅ mantiene sempre il valore della barra
      />

      <section className="max-w-screen-xl mx-auto px-4 py-10">
        {searchQuery && articles.length === 0 && (
          <div className="text-center py-10 text-gray-500">
            Nessun articolo trovato per &quot;<span className="font-semibold">{searchQuery}</span>&quot;
          </div>
        )}

        {articles.length > 0 && (
          <>
            <div className="mb-12">
              <Link href={`/news/${featured.slug}`} className="block group">
                <div className="relative w-full h-64 sm:h-96 overflow-hidden rounded-md">
                  <Image
                    src={featured.image_url}
                    alt={featured.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-black/40 flex flex-col justify-end p-6">
                    <h1 className="text-3xl sm:text-4xl font-bold text-white mb-2">{featured.title}</h1>
                    <div
                      className="subtitle-featured"
                      dangerouslySetInnerHTML={{ __html: featured.subtitle }}
                    />
                  </div>
                </div>
              </Link>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-brand-cyan mb-6 text-center">Ultime Notizie</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {others.map((article) => (
                  <NewsCard
                    key={article.id}
                    title={article.title}
                    subtitle={article.subtitle}
                    image={article.image_url}
                    slug={article.slug}
                    tag={article.tags[0]}
                  />
                ))}
              </div>
            </div>
          </>
        )}
      </section>
    </>
  )
}
















