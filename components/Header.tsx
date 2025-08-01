'use client'
import Image from 'next/image'
import Link from 'next/link'

export default function Header() {
  return (
    <header className="w-full">
      <Link href="/" className="block w-full">
        <div className="w-full cursor-pointer">
          <Image
            src="/images/logo.png"
            alt="L&apos;Altra Saronno - Testata"
            width={1920}
            height={300}
            priority
            className="w-full h-auto select-none"
          />
        </div>
      </Link>
    </header>
  )
}




