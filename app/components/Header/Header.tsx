'use client'

import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { setThemeAction } from '@/app/actions'

import Link from 'next/link'
import styles from './header.module.css'

function SunIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="12" cy="12" r="4" />
      <line x1="12" y1="2" x2="12" y2="6" />
      <line x1="12" y1="18" x2="12" y2="22" />
      <line x1="2" y1="12" x2="6" y2="12" />
      <line x1="18" y1="12" x2="22" y2="12" />
      <line x1="4.93" y1="4.93" x2="7.76" y2="7.76" />
      <line x1="16.24" y1="16.24" x2="19.07" y2="19.07" />
      <line x1="4.93" y1="19.07" x2="7.76" y2="16.24" />
      <line x1="16.24" y1="7.76" x2="19.07" y2="4.93" />
    </svg>
  )
}

function MoonIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M21 12.79A9 9 0 1 1 11.21 3a7 7 0 0 0 9.79 9.79z" />
    </svg>
  )
}

function HamburgerIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <line x1="3" y1="6" x2="21" y2="6" />
      <line x1="3" y1="12" x2="21" y2="12" />
      <line x1="3" y1="18" x2="21" y2="18" />
    </svg>
  )
}

function CloseIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  )
}

export default function Header() {

  const router = useRouter()
  const [theme, setTheme] = useState<'light' | 'dark'>('light')
  const [menuOpen, setMenuOpen] = useState(false)

  const sentinelRef = useRef<HTMLDivElement>(null);

  const [isScrolled, setIsScrolled] = useState(false);

  const isDark = theme === 'dark'

      useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        // When sentinel goes out of view (scrolled past), isIntersecting is false
        setIsScrolled(!entry.isIntersecting);
      },
      {
        root: null, // Uses the viewport
        rootMargin: "0px", 
        threshold: 0,
      }
    );

     if (sentinelRef.current) {
      observer.observe(sentinelRef.current);
    }

    //   return () => {
    //   if (sentinelRef.current) observer.unobserve(sentinelRef.current);
    // };
  }, []);

 

 const toggleTheme = async () => {
    const nextTheme = theme === 'light' ? 'dark' : 'light'
    // 1. Optimistic UI update (Instant change on the screen)
    setTheme(nextTheme)
    document.documentElement.setAttribute('data-theme', nextTheme)
    // 2. Persist the change on the server
    await setThemeAction(nextTheme)
    // 3. Refresh server components to stay in sync
    router.refresh()
  }

  const closeMenu = () => setMenuOpen(false)

  return (
     <>
     <div ref={sentinelRef} className={styles.sentinel} />
    <header className={`${styles.header} ${isScrolled ? styles.headerCollapsed : ""}`}>
      <div className={styles.inner}>
        {/* Logo */}
        <Link href="/" className={styles.logo} onClick={closeMenu} aria-label="Home">
          <span className={styles.logo_text}>ShortLinked</span>
        </Link>

        {/* Desktop nav — centered */}
        <nav className={styles.nav} aria-label="Main navigation">
          <Link href="/" className={styles.link}>Features</Link>
          <Link href="/about" className={styles.link}>Pricing</Link>
          <Link href="/contact" className={styles.link}>Contact</Link>
        </nav>

        {/* Desktop theme toggle */}
        <div className={styles.auth_btns_container}>
          <button className={styles.login_btn}>
            Login
          </button>

          <button className={styles.signup_btn}>
            Start Free
          </button>
        </div>

        {/* Mobile hamburger */}
        <button
          className={styles.hamburger}
          // onClick={() => setMenuOpen(prev => !prev)}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
        >
          {menuOpen ? <CloseIcon /> : <HamburgerIcon />}
        </button>
      </div>

      {/* Mobile fullscreen menu */}
      {menuOpen && (
        <div className={styles.mobile_menu} role="dialog" aria-modal="true" aria-label="Mobile navigation">
          <nav className={styles.mobile_nav} aria-label="Mobile main navigation">
            <Link href="/" className={styles.mobile_link} onClick={closeMenu}>Home</Link>
            <Link href="/about" className={styles.mobile_link} onClick={closeMenu}>About</Link>
            <Link href="/contact" className={styles.mobile_link} onClick={closeMenu}>Contact Us</Link>
          </nav>
          <button className={styles.login_btn}>
            Login
          </button>

          <button className={styles.signup_btn}>
            Start Free
          </button>
          <button
            className={styles.mobile_theme_toggle}
            onClick={toggleTheme}
            aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            {isDark ? <SunIcon /> : <MoonIcon />}
            <span>{isDark ? 'Light Mode' : 'Dark Mode'}</span>
          </button>
        </div>
      )}
    </header>
    </>
  )
}