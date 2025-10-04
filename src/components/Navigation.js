'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import styles from './Navigation.module.css';

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { href: '/', label: 'Ana Sayfa' },
    { href: '/calculate', label: 'Hesapla' },
    { href: '/details', label: 'Numeroloji' },
    { href: '/about', label: 'Hakkımızda' },
    { href: '/contact', label: 'İletişim' },
  ];

  return (
    <nav className={`${styles.nav} ${isScrolled ? styles.scrolled : ''}`}>
      <div className="container">
        <div className={styles.navContent}>
          {/* Logo */}
          <Link href="/" className={styles.logo}>
            <svg className={styles.logoSvg} viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <linearGradient id="navGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" style={{stopColor: '#9B59B6', stopOpacity: 1}} />
                  <stop offset="100%" style={{stopColor: '#3498DB', stopOpacity: 1}} />
                </linearGradient>
                <linearGradient id="navGrad2" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" style={{stopColor: '#F39C12', stopOpacity: 1}} />
                  <stop offset="100%" style={{stopColor: '#E8B923', stopOpacity: 1}} />
                </linearGradient>
              </defs>
              <circle cx="20" cy="20" r="18" fill="none" stroke="url(#navGrad1)" strokeWidth="1.5"/>
              <path d="M 20 8 L 29 14 L 29 26 L 20 32 L 11 26 L 11 14 Z" 
                    fill="none" stroke="url(#navGrad2)" strokeWidth="1.5" opacity="0.6"/>
              <path d="M 12 20 Q 14 17 16 20 Q 18 23 20 20 Q 22 17 24 20 Q 26 23 28 20 Q 26 17 24 20 Q 22 23 20 20 Q 18 17 16 20 Q 14 23 12 20 Z" 
                    fill="url(#navGrad2)"/>
              <circle cx="20" cy="20" r="2" fill="url(#navGrad1)"/>
            </svg>
            <span className={styles.logoText}></span>
          </Link>

          {/* Desktop Menu */}
          <ul className={styles.navLinks}>
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className={styles.navLink}>
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          {/* CTA Button */}
          <Link href="/calculate" className={`btn btn-primary ${styles.ctaBtn}`}>
            Hemen Hesapla
          </Link>

          {/* Mobile Menu Toggle */}
          <button
            className={styles.mobileToggle}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Menu"
          >
            <span className={isMobileMenuOpen ? styles.open : ''}></span>
            <span className={isMobileMenuOpen ? styles.open : ''}></span>
            <span className={isMobileMenuOpen ? styles.open : ''}></span>
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className={styles.mobileMenu}>
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={styles.mobileLink}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
}