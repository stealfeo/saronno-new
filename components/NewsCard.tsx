import Link from 'next/link'
import Image from 'next/image'

type NewsCardProps = {
  title: string
  subtitle: string
  image: string
  slug: string
  tag?: string
}

export default function NewsCard({ title, subtitle, image, slug, tag }: NewsCardProps) {
  return (
    <Link href={`/news/${slug}`} className="block group rounded-md overflow-hidden shadow hover:shadow-lg transition">
      <div className="relative w-full h-48">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </div>
      <div className="bg-white p-4">
        {tag && <span className="text-xs text-brand-orange uppercase font-semibold">{tag}</span>}
        <h2 className="text-xl font-bold text-gray-800 group-hover:text-brand-cyan">{title}</h2>
        <div
          className="text-gray-600 subtitle-preview"
          dangerouslySetInnerHTML={{ __html: subtitle }}
        />
      </div>
    </Link>
  )
}
