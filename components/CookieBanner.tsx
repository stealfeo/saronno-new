'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'

let resetConsentCallback: (() => void) | null = null

export function resetConsent() {
  if (resetConsentCallback) resetConsentCallback()
}

export default function CookieBanner() {
  const [visible, setVisible] = useState<boolean>(false)
  const [animate, setAnimate] = useState<boolean>(false)

  useEffect(() => {
    const consent = typeof window !== 'undefined' ? localStorage.getItem('cookie-consent') : null
    if (!consent) {
      setVisible(true)
      setTimeout(() => setAnimate(true), 50) // trigger animazione dopo mount
    }
    resetConsentCallback = () => {
      localStorage.removeItem('cookie-consent')
      setVisible(true)
      setTimeout(() => setAnimate(true), 50)
    }
    return () => {
      resetConsentCallback = null
    }
  }, [])

  const handleConsent = (choice: 'accepted' | 'rejected') => {
    setAnimate(false)
    setTimeout(() => {
      localStorage.setItem('cookie-consent', choice)
      setVisible(false)
    }, 200) // delay per chiudere con animazione
  }

  if (!visible) return null

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 transition-opacity duration-300">
      <div
        className={`bg-white text-gray-800 max-w-lg w-full mx-4 rounded-lg shadow-lg p-6 text-center transform transition-all duration-300 ${
          animate ? 'opacity-100 scale-100' : 'opacity-0 scale-90'
        }`}
      >
        <h2 className="text-xl font-bold mb-4">Gestione Cookie</h2>
        <p className="text-sm mb-4">
          Questo sito utilizza cookie tecnici e, previo consenso, cookie di terze parti per migliorare l&rsquo;esperienza utente e mostrare contenuti personalizzati. 
          Per maggiori informazioni leggi la nostra{' '}
          <Link href="/cookie" className="text-brand-cyan underline">
            Cookie Policy
          </Link>.
        </p>

        <div className="flex justify-center gap-4 mt-6">
          <button
            onClick={() => handleConsent('accepted')}
            className="bg-brand-cyan hover:bg-cyan-700 text-white px-5 py-2 rounded transition"
          >
            Accetta
          </button>
          <button
            onClick={() => handleConsent('rejected')}
            className="bg-gray-700 hover:bg-gray-600 text-white px-5 py-2 rounded transition"
          >
            Rifiuta
          </button>
        </div>
      </div>
    </div>
  )
}



