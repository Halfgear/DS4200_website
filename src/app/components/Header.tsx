"use client"

import Link from "next/link"
import { useState } from "react"
import { X, Menu } from "lucide-react"

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="bg-gray-100 border-b border-gray-200">
      <div className="container mx-auto max-w-5xl px-4">
        <nav className="flex justify-between items-center h-16">
          <Link href="/" className="text-xl font-semibold text-gray-800">
            Joon Lee
          </Link>

          {/* Mobile menu button */}
          <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)} aria-label="Toggle menu">
            {isMenuOpen ? <X className="h-6 w-6 text-gray-600" /> : <Menu className="h-6 w-6 text-gray-600" />}
          </button>

          {/* Desktop Navigation */}
          <ul className="hidden md:flex space-x-8">
            <li>
              <Link href="/" className="text-gray-600 hover:text-gray-800 transition-colors">
                Home
              </Link>
            </li>
            <li>
              <Link href="/games" className="text-gray-600 hover:text-gray-800 transition-colors">
                Games
              </Link>
            </li>
            <li>
              <Link href="/blog" className="text-gray-600 hover:text-gray-800 transition-colors">
                Blog
              </Link>
            </li>
          </ul>
        </nav>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4">
            <ul className="flex flex-col space-y-4">
              <li>
                <Link
                  href="/"
                  className="text-gray-600 hover:text-gray-800 transition-colors block"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/games"
                  className="text-gray-600 hover:text-gray-800 transition-colors block"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Games
                </Link>
              </li>
              <li>
                <Link
                  href="/blog"
                  className="text-gray-600 hover:text-gray-800 transition-colors block"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Blog
                </Link>
              </li>
            </ul>
          </div>
        )}
      </div>
    </header>
  )
}

export default Header

