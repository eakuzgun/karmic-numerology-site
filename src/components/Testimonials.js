'use client';

import { useEffect, useRef, useState } from 'react';
import styles from './Testimonials.module.css';

export default function Testimonials({ data }) {
  const [visibleCards, setVisibleCards] = useState([]);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            data?.forEach((_, index) => {
              setTimeout(() => {
                setVisibleCards((prev) => [...prev, index]);
              }, index * 100);
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

  const testimonials = data || [
    {
      user_name: 'Zeynep K.',
      comment: 'Numeroloji analizi hayatıma yeni bir bakış açısı kazandırdı. Kendimi daha iyi anlıyorum.',
      rating: 5,
    },
    {
      user_name: 'Mehmet A.',
      comment: 'Yaşam yolu sayım beni çok etkiledi. Gerçekten doğru bir analiz!',
      rating: 5,
    },
    {
      user_name: 'Elif S.',
      comment: 'Karmik sayılarım hakkında öğrendiklerim inanılmazdı. Herkese tavsiye ederim.',
      rating: 5,
    },
  ];

  return (
    <section className={`${styles.testimonials} section`} ref={sectionRef}>
      <div className="container">
        {/* Header */}
        <div className={styles.header}>
          <h2 className={styles.title}>Kullanıcı Yorumları</h2>
          <p className={styles.subtitle}>
            Binlerce kişi numeroloji ile kendini keşfetti
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className={styles.grid}>
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className={`${styles.card} ${
                visibleCards.includes(index) ? styles.visible : ''
              }`}
            >
              {/* Quote Icon */}
              <div className={styles.quoteIcon}>&quot;</div>

              {/* Rating */}
              <div className={styles.rating}>
                {Array.from({ length: testimonial.rating || 5 }).map((_, i) => (
                  <span key={i} className={styles.star}>⭐</span>
                ))}
              </div>

              {/* Comment */}
              <p className={styles.comment}>{testimonial.comment}</p>

              {/* User Info */}
              <div className={styles.user}>
                <div className={styles.avatar}>
                  {testimonial.user_name?.charAt(0) || 'U'}
                </div>
                <div className={styles.userInfo}>
                  <div className={styles.userName}>{testimonial.user_name}</div>
                  {testimonial.user_title && (
                    <div className={styles.userTitle}>{testimonial.user_title}</div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}