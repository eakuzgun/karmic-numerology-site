'use client';

import { useEffect, useRef, useState } from 'react';
import styles from './HowItWorks.module.css';

export default function HowItWorks({ data }) {
  const [visibleSteps, setVisibleSteps] = useState([]);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            data?.forEach((_, index) => {
              setTimeout(() => {
                setVisibleSteps((prev) => [...prev, index]);
              }, index * 200);
            });
            observer.disconnect();
          }
        });
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, [data]);

  const steps = data || [
    {
      step_number: 1,
      title: 'Bilgilerinizi Girin',
      description: 'Doğum tarihinizi ve tam isminizi formumuza girin',
    },
    {
      step_number: 2,
      title: 'Anında Hesaplama',
      description: 'Gelişmiş algoritmamız karmik değerlerinizi hesaplar',
    },
    {
      step_number: 3,
      title: 'Sonuçları Keşfedin',
      description: 'Detaylı analiz ve rehberlik ile kendinizi tanıyın',
    },
  ];

  return (
    <section className={`${styles.howItWorks} section geometric-bg`} ref={sectionRef}>
      <div className="container">
        {/* Header */}
        <div className={styles.header}>
          <h2 className={styles.title}>Nasıl Çalışır?</h2>
          <p className={styles.subtitle}>
            Üç basit adımda karmik enerjinizi keşfedin
          </p>
        </div>

        {/* Steps */}
        <div className={styles.stepsContainer}>
          {steps.map((step, index) => (
            <div key={index} className={styles.stepWrapper}>
              {/* Step Card */}
              <div
                className={`${styles.step} ${
                  visibleSteps.includes(index) ? styles.visible : ''
                }`}
              >
                <div className={styles.stepNumber}>{step.step_number}</div>
                <h3 className={styles.stepTitle}>{step.title}</h3>
                <p className={styles.stepDescription}>{step.description}</p>
              </div>

              {/* Connector Line */}
              {index < steps.length - 1 && (
                <div className={styles.connector}></div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}