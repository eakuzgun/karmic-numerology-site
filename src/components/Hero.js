'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import styles from './Hero.module.css';

export default function Hero({ data }) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  // Fallback data if database is empty
  const heroData = data || {
    title: 'Karmik Enerjinizi Keşfedin',
    subtitle: 'Numeroloji ile İç Yolculuğunuza Başlayın',
    description: 'Doğum tarihiniz ve isminiz sayıların evrensel dilinde size özel mesajlar taşır.',
    cta_text: 'Hesaplamaya Başla',
  };

  return (
    <section className={styles.hero}>
      {/* Background Pattern */}
      <div className={styles.heroPattern}></div>
      
      {/* Floating Geometric Shapes */}
      <div className={styles.floatingShapes}>
        <div className={`${styles.shape} ${styles.shape1}`}></div>
        <div className={`${styles.shape} ${styles.shape2}`}></div>
        <div className={`${styles.shape} ${styles.shape3}`}></div>
      </div>

      <div className="container">
        <div className={`${styles.heroContent} ${isVisible ? styles.visible : ''}`}>
          {/* Subtitle */}
          {heroData.subtitle && (
            <div className={styles.subtitle}>
              <span className={styles.subtitleIcon}>✦</span>
              {heroData.subtitle}
              <span className={styles.subtitleIcon}>✦</span>
            </div>
          )}

          {/* Main Title */}
          <h1 className={styles.title}>{heroData.title}</h1>

          {/* Description */}
          {heroData.description && (
            <p className={styles.description}>{heroData.description}</p>
          )}

          {/* CTA Buttons */}
          <div className={styles.ctaGroup}>
            <Link href="/calculate" className="btn btn-primary btn-lg">
              {heroData.cta_text}
            </Link>
            <Link href="/details" className="btn btn-secondary btn-lg">
              Daha Fazla Bilgi
            </Link>
          </div>

          {/* Trust Indicators */}
          <div className={styles.trustBadges}>
            <div className={styles.badge}>
              <span className={styles.badgeIcon}>⚡</span>
              <span>Anında Sonuç</span>
            </div>
            <div className={styles.badge}>
              <span className={styles.badgeIcon}>🔒</span>
              <span>Gizlilik Garantili</span>
            </div>
            <div className={styles.badge}>
              <span className={styles.badgeIcon}>✨</span>
              <span>Ücretsiz Analiz</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}