'use client'
import { useState, useRef, useEffect } from 'react'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  'https://ihexdbticbojrpnoauco.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImloZXhkYnRpY2JvanJwbm9hdWNvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTM0MDQzNDYsImV4cCI6MjA2ODk4MDM0Nn0.fBkm9FKEHQgDTdYCP3K-8s1IZaw9E6Q5h9vVMZKMkgQ'
)

// ✅ Lista tag predefiniti
const availableTags = [
  'Cronaca', 'Politica', 'Eventi', 'Sport', 'Pallavolo', 'Basket',
  'Economia', 'Cultura', 'Musica', 'Spettacolo', 'Cinema', 'Teatro',
  'Scuola', 'Università', 'Giovani', 'Ambiente', 'Salute',
  'Ospedale', 'Farmacia', 'Lavoro', 'Aziende', 'Sindacati', 'Trasporti',
  'Sicurezza', 'Meteo', 'Viabilità', 'Tradizioni', 'Mercatini'
]

// ✅ Categorie fisse
const categories = [
  'Cronaca',
  'Politica',
  'Eventi',
  'Sport',
  'Economia',
  'Cultura',
  'Musica & Spettacolo',
  'Scuola & Giovani',
  'Ambiente',
  'Salute',
  'Lavoro'
]

export default function AdminPage() {
  const [title, setTitle] = useState('')
  const [subtitle, setSubtitle] = useState('')
  const [subtitleColor, setSubtitleColor] = useState('#000000')
  const [category, setCategory] = useState(categories[0])
  const [selectedTags, setSelectedTags] = useState<string[]>([])
  const [customTags, setCustomTags] = useState('')
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  const [preview, setPreview] = useState('')
  const [imagePreview, setImagePreview] = useState<string | null>(null)

  const [isBold, setIsBold] = useState(false)
  const [isItalic, setIsItalic] = useState(false)
  const [isUnderline, setIsUnderline] = useState(false)

  const editorRef = useRef<HTMLDivElement>(null)

  const slugify = (text: string) =>
    text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '')

  const updateToolbarState = () => {
    setIsBold(document.queryCommandState('bold'))
    setIsItalic(document.queryCommandState('italic'))
    setIsUnderline(document.queryCommandState('underline'))
  }

  const formatText = (command: string, value?: string) => {
    (document as any).execCommand(command, false, value || '')
    updateToolbarState()
  }

  const handleInput = () => {
    if (editorRef.current) setPreview(editorRef.current.innerHTML)
  }

  const toggleTag = (tag: string) => {
    setSelectedTags(prev =>
      prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]
    )
  }

  useEffect(() => {
    document.addEventListener('selectionchange', updateToolbarState)
    return () => document.removeEventListener('selectionchange', updateToolbarState)
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setMessage('')

    let imageUrl = ''
    if (imageFile) {
      const fileName = `${Date.now()}-${imageFile.name}`
      const { error: storageError } = await supabase.storage
        .from('images')
        .upload(fileName, imageFile)

      if (storageError) {
        setMessage('Errore upload immagine')
        setLoading(false)
        return
      }

      const { data: publicUrl } = supabase.storage.from('images').getPublicUrl(fileName)
      imageUrl = publicUrl.publicUrl
    }

    const slug = slugify(title)
    const contentHtml = editorRef.current?.innerHTML || ''

    const allTags = [
      ...selectedTags,
      ...customTags.split(',').map(t => t.trim()).filter(Boolean)
    ]

    const { error } = await supabase.from('articles').insert([
  {
    title,
    subtitle: `<span style="color:${subtitleColor}">${subtitle}</span>`,
    slug,
    image_url: imageUrl,
    category,
    tags: allTags,
    content: contentHtml
  }
])

if (error) {
  console.error('Supabase Insert Error:', error)
  setMessage(`❌ Errore: ${error.message}`)
} else {
  setMessage('✅ Articolo creato con successo!')
      setTitle('')
      setSubtitle('')
      setCategory(categories[0])
      setSelectedTags([])
      setCustomTags('')
      if (editorRef.current) editorRef.current.innerHTML = ''
      setImageFile(null)
      setImagePreview(null)
      setPreview('')
    }

    setLoading(false)
  }

  return (
    <section className="max-w-screen-xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold text-brand-cyan mb-6">Admin Panel</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input type="text" placeholder="Titolo" value={title} onChange={(e) => setTitle(e.target.value)} required className="border p-2 rounded" />

        {/* Sottotitolo + colore */}
        <div className="flex gap-2 items-center">
          <input
            type="text"
            placeholder="Sottotitolo"
            value={subtitle}
            onChange={(e) => setSubtitle(e.target.value)}
            className="border p-2 rounded flex-1"
            style={{ color: subtitleColor }}
          />
          <input
            type="color"
            value={subtitleColor}
            onChange={(e) => setSubtitleColor(e.target.value)}
            className="w-10 h-10 p-0 border rounded"
            title="Colore sottotitolo"
          />
        </div>

        {/* ✅ Dropdown categorie */}
        <div>
          <label className="block mb-1 font-semibold text-gray-700">Categoria:</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="border p-2 rounded w-full"
          >
            {categories.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>

        {/* ✅ Tag */}
        <div>
          <p className="mb-2 font-semibold text-gray-700">Tag:</p>
          <div className="flex flex-wrap gap-2 mb-3">
            {availableTags.map(tag => (
              <button
                type="button"
                key={tag}
                onClick={() => toggleTag(tag)}
                className={`px-3 py-1 rounded-full border transition
                  ${selectedTags.includes(tag)
                    ? 'bg-brand-cyan text-white border-brand-cyan'
                    : 'bg-gray-100 text-gray-700 border-gray-300 hover:bg-gray-200'}`}
              >
                #{tag}
              </button>
            ))}
          </div>
          <input
            type="text"
            placeholder="Aggiungi altri tag separati da virgola"
            value={customTags}
            onChange={(e) => setCustomTags(e.target.value)}
            className="border p-2 rounded w-full"
          />
        </div>

        {/* Toolbar */}
        <div className="flex flex-wrap gap-2 mb-2 items-center">
          <button type="button" onClick={() => formatText('bold')} className={`px-2 py-1 rounded font-bold ${isBold ? 'bg-gray-400' : 'bg-gray-200'}`}>B</button>
          <button type="button" onClick={() => formatText('italic')} className={`px-2 py-1 rounded italic ${isItalic ? 'bg-gray-400' : 'bg-gray-200'}`}>I</button>
          <button type="button" onClick={() => formatText('underline')} className={`px-2 py-1 rounded underline ${isUnderline ? 'bg-gray-400' : 'bg-gray-200'}`}>U</button>
          <button type="button" onClick={() => formatText('justifyLeft')} className="px-2 py-1 bg-gray-200 rounded">↤</button>
          <button type="button" onClick={() => formatText('justifyCenter')} className="px-2 py-1 bg-gray-200 rounded">↔</button>
          <button type="button" onClick={() => formatText('justifyRight')} className="px-2 py-1 bg-gray-200 rounded">↦</button>
          <input type="color" onChange={(e) => formatText('foreColor', e.target.value)} className="w-8 h-8 p-0 border rounded" />
        </div>

        {/* Editor + Anteprima */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div
            ref={editorRef}
            contentEditable
            onInput={handleInput}
            className="border p-3 rounded min-h-[200px] bg-white"
          />
          <div className="border p-3 rounded min-h-[200px] bg-gray-50">
            <h3 className="font-bold mb-2 text-brand-cyan">Anteprima</h3>
            {imagePreview && (
              <img src={imagePreview} alt="Anteprima copertina" className="w-full rounded mb-4" />
            )}
            <div className="mb-4">
              <h2 className="text-2xl font-bold">{title || 'Titolo articolo'}</h2>
              {subtitle && (
                <p className="mt-1 text-lg" style={{ color: subtitleColor }}>{subtitle}</p>
              )}
              <p className="text-sm text-gray-500 mt-1">{category}</p>
            </div>
            <div dangerouslySetInnerHTML={{ __html: preview || '<p>Testo articolo...</p>' }} />
            {([...selectedTags, ...customTags.split(',').map(t => t.trim()).filter(Boolean)]).length > 0 && (
              <div className="flex flex-wrap gap-2 mt-4">
                {[...selectedTags, ...customTags.split(',').map(t => t.trim()).filter(Boolean)].map(tag => (
                  <span key={tag} className="px-2 py-1 text-sm rounded-full bg-brand-cyan text-white">#{tag}</span>
                ))}
              </div>
            )}
          </div>
        </div>

        <input
          type="file"
          accept="image/*"
          onChange={(e) => {
            const file = e.target.files?.[0] || null
            setImageFile(file)
            if (file) {
              const reader = new FileReader()
              reader.onloadend = () => setImagePreview(reader.result as string)
              reader.readAsDataURL(file)
            } else {
              setImagePreview(null)
            }
          }}
        />

        <button type="submit" disabled={loading} className="bg-brand-cyan text-white py-2 rounded hover:bg-brand-orange transition">
          {loading ? 'Caricamento...' : 'Pubblica Articolo'}
        </button>
      </form>
      {message && <p className="mt-4 text-center">{message}</p>}
    </section>
  )
}
