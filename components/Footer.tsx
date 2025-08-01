'use client'
import Link from 'next/link'
import { resetConsent } from './CookieBanner'

export default function Footer() {
  return (
    <footer className="w-full bg-brand-cyan text-white mt-12">
      <div className="max-w-6xl mx-auto px-4 py-8 flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-sm font-serif text-center md:text-left">
          © {new Date().getFullYear()} <span className="font-bold">L&apos;Altra Saronno</span> – Periodico di attualità, cultura, politica e opinione
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4 text-sm">
          <Link href="/privacy" className="hover:underline transition">Privacy Policy</Link>
          <Link href="/cookie" className="hover:underline transition">Cookie Policy</Link>
          <button 
            onClick={resetConsent} 
            className="hover:underline transition"
          >
            Gestisci preferenze cookie
          </button>
        </div>
      </div>
    </footer>
  )
}





