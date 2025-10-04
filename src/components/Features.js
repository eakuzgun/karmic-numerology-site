'use client';

import { useEffect, useRef, useState } from 'react';
import styles from './Features.module.css';

// Icon mapping
const ICONS = {
  compass: '🧭',
  user: '👤',
  star: '⭐',
  heart: '💜',
  infinity: '∞',
  crystal: '💎',
};

export default function Features({ data }) {
  const [visibleCards, setVisibleCards] = useState([]);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Staggered animation
            data?.forEach((_, index) => {
              setTimeout(() => {
                setVisibleCards((prev) => [...prev, index]);
              }, index * 150);
            });
            observer.disconnect();
          }
        });
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, [data]);

  // Fallback data
  const features = data || [
    {
      title: 'Yaşam Yolu Hesaplaması',
      description: 'Doğum tarihinize göre yaşam amacınızı keşfedin',
      icon_name: 'compass',
    },
    {
      title: 'İsim Analizi',
      description: 'İsminizin taşıdığı enerji ve anlamını öğrenin',
      icon_name: 'user',
    },
    {
      title: 'Karmik Sayılar',
      description: 'Özel ruhsal sayıların gücünü anlayın',
      icon_name: 'star',
    },
  ];

  return (
    <section className={`${styles.features} section`} ref={sectionRef}>
      <div className="container">
        {/* Section Header */}
        <div className={styles.header}>
          <h2 className={styles.title}>
            Numeroloji Hizmetlerimiz
          </h2>
          <p className={styles.subtitle}>
            Sayıların evrensel dilinde kendinizi keşfedin
          </p>
        </div>

        {/* Features Grid */}
        <div className={styles.grid}>
          {features.map((feature, index) => (
            <div
              key={index}
              className={`${styles.card} ${
                visibleCards.includes(index) ? styles.visible : ''
              }`}
            >
              {/* Icon */}
              <div className={styles.iconWrapper}>
                <span className={styles.icon}>
                  {ICONS[feature.icon_name] || '✨'}
                </span>
              </div>

              {/* Content */}
              <h3 className={styles.cardTitle}>{feature.title}</h3>
              <p className={styles.cardDescription}>{feature.description}</p>

              {/* Hover Effect Line */}
              <div className={styles.hoverLine}></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}