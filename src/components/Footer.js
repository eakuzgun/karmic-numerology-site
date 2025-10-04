'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { getSiteSettings } from '../lib/supabase';
import styles from './Footer.module.css';

export default function Footer() {
  const [settings, setSettings] = useState(null);

  useEffect(() => {
    getSiteSettings().then(setSettings);
  }, []);

  const currentYear = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className="container">
        <div className={styles.footerContent}>
          {/* Brand */}
          <div className={styles.brand}>
            <div className={styles.logo}>
              <svg className={styles.logoSvg} viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <linearGradient id="footerGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" style={{stopColor: '#E8B923', stopOpacity: 1}} />
                    <stop offset="100%" style={{stopColor: '#3498DB', stopOpacity: 1}} />
                  </linearGradient>
                  <linearGradient id="footerGrad2" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" style={{stopColor: '#F39C12', stopOpacity: 1}} />
                    <stop offset="100%" style={{stopColor: '#E8B923', stopOpacity: 1}} />
                  </linearGradient>
                </defs>
                <circle cx="20" cy="20" r="18" fill="none" stroke="url(#footerGrad1)" strokeWidth="1.5"/>
                <path d="M 20 8 L 29 14 L 29 26 L 20 32 L 11 26 L 11 14 Z" 
                      fill="none" stroke="url(#footerGrad2)" strokeWidth="1.5" opacity="0.6"/>
                <path d="M 12 20 Q 14 17 16 20 Q 18 23 20 20 Q 22 17 24 20 Q 26 23 28 20 Q 26 17 24 20 Q 22 23 20 20 Q 18 17 16 20 Q 14 23 12 20 Z" 
                      fill="url(#footerGrad2)"/>
                <circle cx="20" cy="20" r="2" fill="white"/>
              </svg>
              <span>Karmik Numeroloji</span>
            </div>
            <p className={styles.tagline}>
              {settings?.site_meta?.tagline || 'Sayıların Gücüyle Kendinizi Keşfedin'}
            </p>
            <div className={styles.social}>
              {settings?.social_links?.instagram && (
                <a 
                  href={`https://instagram.com/${settings.social_links.instagram}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.socialLink}
                  aria-label="Instagram"
                >
                  📷
                </a>
              )}
              {settings?.social_links?.twitter && (
                <a 
                  href={`https://twitter.com/${settings.social_links.twitter}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.socialLink}
                  aria-label="Twitter"
                >
                  🐦
                </a>
              )}
              {settings?.social_links?.facebook && (
                <a 
                  href={`https://facebook.com/${settings.social_links.facebook}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.socialLink}
                  aria-label="Facebook"
                >
                  📘
                </a>
              )}
            </div>
          </div>

          {/* Quick Links */}
          <div className={styles.links}>
            <h4>Hızlı Linkler</h4>
            <ul>
              <li><Link href="/">Ana Sayfa</Link></li>
              <li><Link href="/calculate">Hesapla</Link></li>
              <li><Link href="/details">Numeroloji</Link></li>
              <li><Link href="/about">Hakkımızda</Link></li>
            </ul>
          </div>

          {/* Resources */}
          <div className={styles.links}>
            <h4>Kaynaklar</h4>
            <ul>
              <li><Link href="/details">Numeroloji Nedir?</Link></li>
              <li><Link href="/details">Karmik Sayılar</Link></li>
              <li><Link href="/details">Yaşam Yolu</Link></li>
              <li><Link href="/contact">SSS</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div className={styles.contact}>
            <h4>İletişim</h4>
            {settings?.contact_info?.email && (
              <p>
                <span className={styles.contactIcon}>✉️</span>
                {settings.contact_info.email}
              </p>
            )}
            {settings?.contact_info?.phone && (
              <p>
                <span className={styles.contactIcon}>📞</span>
                {settings.contact_info.phone}
              </p>
            )}
            {settings?.contact_info?.address && (
              <p>
                <span className={styles.contactIcon}>📍</span>
                {settings.contact_info.address}
              </p>
            )}
          </div>
        </div>

        {/* Bottom Bar */}
        <div className={styles.bottomBar}>
          <p>© {currentYear} Karmik Numeroloji. Tüm hakları saklıdır.</p>
          <div className={styles.legal}>
            <Link href="/privacy">Gizlilik Politikası</Link>
            <span>•</span>
            <Link href="/terms">Kullanım Koşulları</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}