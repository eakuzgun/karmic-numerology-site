import { getNumerologyData, getArticles } from '../../lib/supabase';
import { getNumberColor } from '../../lib/numerology';
import styles from './details.module.css';

export const metadata = {
  title: 'Numeroloji Rehberi | Sayıların Anlamı',
  description: 'Numeroloji sayılarının anlamlarını, karmik sayıları ve numeroloji hakkında detaylı bilgileri keşfedin.',
};

export const revalidate = 3600;

export default async function DetailsPage() {
  const numerologyData = await getNumerologyData();
  const articles = await getArticles(3);

  const numbers = numerologyData?.numbers || [];
  const karmicNumbers = numerologyData?.karmicNumbers || [];

  return (
    <div className={styles.detailsPage}>
      {/* Hero */}
      <section className={styles.hero}>
        <div className="container">
          <h1 className={styles.title}>Numeroloji Rehberi</h1>
          <p className={styles.subtitle}>
            Sayıların gizemli dünyasını keşfedin ve anlamlarını öğrenin
          </p>
        </div>
      </section>

      {/* Introduction */}
      <section className={`${styles.intro} section`}>
        <div className="container">
          <div className={styles.introContent}>
            <h2>Numeroloji Nedir?</h2>
            <p>
              Numeroloji, sayıların evrensel bir dil olduğu ve her sayının kendine özgü 
              bir titreşim ve anlam taşıdığı fikrine dayanan antik bir bilim dalıdır. 
              Binlerce yıldır insanlar sayıların gücünü kullanarak kendilerini daha 
              iyi anlamaya ve yaşam yollarını keşfetmeye çalışmışlardır.
            </p>
            <p>
              Doğum tarihiniz ve isminiz, sayısal olarak analiz edildiğinde, kişiliğiniz, 
              yetenekleriniz, zorluklarınız ve yaşam amacınız hakkında derin içgörüler sunar.
            </p>
          </div>
        </div>
      </section>

      {/* Regular Numbers (1-9) */}
      <section className={`${styles.numbersSection} section geometric-bg`}>
        <div className="container">
          <h2 className="text-center">Numeroloji Sayıları (1-9)</h2>
          <p className={`${styles.sectionSubtitle} text-center`}>
            Her sayının kendine özgü enerjisi ve anlamı vardır
          </p>

          <div className={styles.numbersGrid}>
            {numbers.map((number) => (
              <div key={number.number} className={styles.numberCard}>
                <div 
                  className={styles.numberBadge}
                  style={{ backgroundColor: getNumberColor(number.number) }}
                >
                  {number.number}
                </div>
                <h3>{number.title}</h3>
                <p className={styles.numberDescription}>{number.description}</p>
                {number.keywords && number.keywords.length > 0 && (
                  <div className={styles.keywords}>
                    {number.keywords.map((keyword, idx) => (
                      <span key={idx} className="badge badge-primary">
                        {keyword}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Karmic Numbers */}
      {karmicNumbers && karmicNumbers.length > 0 && (
        <section className={`${styles.karmicSection} section`}>
          <div className="container">
            <h2 className="text-center">Usta Sayılar (Master Numbers)</h2>
            <p className={`${styles.sectionSubtitle} text-center`}>
              11, 22 ve 33 - Yüksek ruhsal enerji taşıyan özel sayılar
            </p>

            <div className={styles.karmicGrid}>
              {karmicNumbers.map((number) => (
                <div key={number.number} className={styles.karmicCard}>
                  <div 
                    className={styles.karmicBadge}
                    style={{ backgroundColor: getNumberColor(number.number) }}
                  >
                    {number.number}
                  </div>
                  <h3>{number.title}</h3>
                  <p className={styles.karmicDescription}>{number.description}</p>
                  
                  {number.spiritual_meaning && (
                    <div className={styles.spiritualMeaning}>
                      <strong>Ruhsal Anlam:</strong>
                      <p>{number.spiritual_meaning}</p>
                    </div>
                  )}

                  {number.keywords && number.keywords.length > 0 && (
                    <div className={styles.keywords}>
                      {number.keywords.map((keyword, idx) => (
                        <span key={idx} className="badge badge-accent">
                          {keyword}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* How to Calculate */}
      <section className={`${styles.howToCalculate} section geometric-bg`}>
        <div className="container">
          <h2 className="text-center">Numeroloji Nasıl Hesaplanır?</h2>
          
          <div className={styles.calculationSteps}>
            <div className={styles.stepCard}>
              <div className={styles.stepNumber}>1</div>
              <h3>Yaşam Yolu Sayısı</h3>
              <p>
                Doğum tarihinizi (gün + ay + yıl) toplayın ve tek haneye indirgeyin. 
                <br/><strong>Örnek:</strong> 15/06/1990 → 1+5+6+1+9+9+0 = 31 → 3+1 = <span className={styles.highlight}>4</span>
              </p>
            </div>

            <div className={styles.stepCard}>
              <div className={styles.stepNumber}>2</div>
              <h3>Kader Sayısı</h3>
              <p>
                İsminizin her harfine karşılık gelen sayıları toplayın. Her harfin 1-9 arası değeri vardır.
                <br/><strong>Örnek:</strong> AYŞE → 1+7+1+5 = 14 → 1+4 = <span className={styles.highlight}>5</span>
              </p>
            </div>

            <div className={styles.stepCard}>
              <div className={styles.stepNumber}>3</div>
              <h3>Ruh Sayısı</h3>
              <p>
                İsiminizdeki sadece sesli harflerin sayısal değerlerini toplayın.
                <br/><strong>Not:</strong> Bu sayı iç arzularınızı temsil eder.
              </p>
            </div>
          </div>

          <div className={styles.calculateCta}>
            <p>Kendi numeroloji değerlerinizi öğrenmek ister misiniz?</p>
            <a href="/calculate" className="btn btn-primary btn-lg">
              Hemen Hesapla
            </a>
          </div>
        </div>
      </section>

      {/* Articles */}
      {articles && articles.length > 0 && (
        <section className={`${styles.articles} section`}>
          <div className="container">
            <h2 className="text-center">Numeroloji Makaleleri</h2>
            <div className={styles.articlesGrid}>
              {articles.map((article) => (
                <div key={article.id} className={styles.articleCard}>
                  {article.featured_image_url && (
                    <div className={styles.articleImage}>
                      <img src={article.featured_image_url} alt={article.title} />
                    </div>
                  )}
                  <div className={styles.articleContent}>
                    {article.category && (
                      <span className={styles.articleCategory}>{article.category}</span>
                    )}
                    <h3>{article.title}</h3>
                    <p>{article.excerpt}</p>
                    <div className={styles.articleMeta}>
                      {article.reading_time && (
                        <span>📖 {article.reading_time} dk okuma</span>
                      )}
                      {article.author && <span>✍️ {article.author}</span>}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}