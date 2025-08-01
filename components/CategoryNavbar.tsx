'use client'
import { useEffect, useState } from 'react'
import { createClient } from '@supabase/supabase-js'
import { Menu, Search } from 'lucide-react'

const supabase = createClient(
  'https://ihexdbticbojrpnoauco.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImloZXhkYnRpY2JvanJwbm9hdWNvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTM0MDQzNDYsImV4cCI6MjA2ODk4MDM0Nn0.fBkm9FKEHQgDTdYCP3K-8s1IZaw9E6Q5h9vVMZKMkgQ'
)

type Props = {
  onSelectCategory: (category: string | null) => void
  onSearch: (query: string) => void
  searchValue: string // ✅ nuovo valore dal parent
}

export default function CategoryNavbar({ onSelectCategory, onSearch, searchValue }: Props) {
  const [categories, setCategories] = useState<string[]>([])
  const [active, setActive] = useState<string | null>(null)
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    const fetchCategories = async () => {
      const { data } = await supabase.from('articles').select('category')
      if (data) {
        const unique = Array.from(new Set(data.map((a) => a.category).filter(Boolean)))
        setCategories(unique)
      }
    }
    fetchCategories()
  }, [])

  const handleClick = (cat: string | null) => {
    setActive(cat)
    onSelectCategory(cat)
    setIsOpen(false)
  }

  const buttonClasses = (cat: string | null) => `
    relative px-4 py-1.5 rounded-full font-medium transition duration-300
    ${active === cat ? 'text-brand-cyan' : 'text-gray-700 hover:text-brand-cyan'}
    before:absolute before:bottom-0 before:left-1/2 before:-translate-x-1/2
    before:h-[2px] before:bg-brand-cyan before:w-0 before:transition-all before:duration-300
    hover:before:w-full ${active === cat ? 'before:w-full' : ''}
  `

  return (
    <nav className="w-full sticky top-0 z-50 bg-white/80 backdrop-blur-md shadow-sm border-b border-gray-200">
      <div className="hidden md:flex justify-end items-center gap-6 px-4 py-3 flex-wrap">
        <button onClick={() => handleClick(null)} className={buttonClasses(null)}>
          Tutte
        </button>
        {categories.map((cat) => (
          <button key={cat} onClick={() => handleClick(cat)} className={buttonClasses(cat)}>
            {cat}
          </button>
        ))}

        {/* ✅ Input ricerca che usa searchValue */}
        <div className="flex items-center bg-gray-100 rounded-full px-3 py-1 ml-4">
          <Search className="w-4 h-4 text-gray-500" />
          <input
            type="text"
            placeholder="Cerca articoli..."
            value={searchValue}
            onChange={(e) => onSearch(e.target.value)}
            className="bg-transparent outline-none px-2 text-sm w-48"
          />
        </div>
      </div>
    </nav>
  )
}




