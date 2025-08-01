import { notFound } from 'next/navigation'
import Image from 'next/image'
import { createClient } from '@supabase/supabase-js'
import NewsCard from '@/components/NewsCard' // ✅ importa NewsCard per riutilizzarlo

export const dynamic = 'force-dynamic' // ✅ Evita cache statica di Next.js

type Props = {
  params: {
    slug: string
  }
}

export default async function ArticlePage({ params }: Props) {
  const supabase = createClient(
    'https://ihexdbticbojrpnoauco.supabase.co',
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImloZXhkYnRpY2JvanJwbm9hdWNvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTM0MDQzNDYsImV4cCI6MjA2ODk4MDM0Nn0.fBkm9FKEHQgDTdYCP3K-8s1IZaw9E6Q5h9vVMZKMkgQ'
  )

  // ✅ Articolo corrente
  const { data: article, error } = await supabase
    .from('articles')
    .select('*')
    .eq('slug', params.slug)
    .single()

  if (!article || error) {
    return notFound()
  }

  // ✅ Altri articoli (escludi quello attuale)
  const { data: others } = await supabase
    .from('articles')
    .select('*')
    .neq('slug', params.slug)
    .order('created_at', { ascending: false })
    .limit(6)

  return (
    <article className="max-w-screen-md mx-auto px-4 py-10 article-page">
      {article.image_url && (
        <Image
          src={article.image_url}
          alt={article.title}
          width={1200}
          height={600}
          className="w-full rounded mb-6"
        />
      )}

      {/* Categoria */}
      {article.category && (
        <span className="text-sm uppercase text-brand-orange font-semibold">
          {article.category}
        </span>
      )}

      {/* Titolo */}
      <h1 className="text-3xl font-bold mt-2">{article.title}</h1>

      {/* Sottotitolo */}
      {article.subtitle && (
        <div
          className="text-gray-700 text-lg font-bold mt-2 subtitle"
          dangerouslySetInnerHTML={{ __html: article.subtitle }}
        />
      )}

      {/* Contenuto HTML */}
      <div
        className="mt-8 text-base md:text-lg text-gray-800 leading-relaxed content"
        dangerouslySetInnerHTML={{ __html: article.content }}
      />

      {/* Tag come pillole */}
      {article.tags && article.tags.length > 0 && (
        <div className="flex gap-2 mt-6 flex-wrap">
          {article.tags.map((t: string) => (
            <span
              key={t}
              className="px-2 py-1 bg-brand-cyan text-white rounded-full text-sm"
            >
              #{t}
            </span>
          ))}
        </div>
      )}

      {/* ✅ Sezione altri articoli in scorrimento orizzontale */}
      {others && others.length > 0 && (
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-black mb-4">Consigliati</h2>
          <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
            {others.map((item) => (
              <div key={item.id} className="min-w-[300px] max-w-[350px] flex-shrink-0 h-[420px]">
                <NewsCard
                  title={item.title}
                  subtitle={item.subtitle}
                  image={item.image_url}
                  slug={item.slug}
                />
              </div>
            ))}
          </div>
        </div>
      )}
    </article>
  )
}

