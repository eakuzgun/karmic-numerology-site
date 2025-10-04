import CalculationForm from '../../components/CalculationForm';
import styles from './calculate.module.css';

export const metadata = {
  title: 'Karmik Hesaplama | Numeroloji Analizi',
  description: 'Doğum tarihiniz ve isminizle karmik numeroloji hesaplaması yapın. Yaşam yolu, kader ve ruh sayınızı öğrenin.',
};

export default function CalculatePage() {
  return (
    <div className={styles.calculatePage}>
      {/* Hero Section */}
      <section className={styles.hero}>
        <div className="container">
          <div className={styles.heroContent}>
            <h1 className={styles.title}>Karmik Numeroloji Hesaplama</h1>
            <p className={styles.subtitle}>
              Doğum tarihiniz ve isminiz, evrenin size özel mesajlarını taşır. 
              Karmik değerlerinizi keşfedin ve yaşam yolculuğunuza ışık tutun.
            </p>
          </div>
        </div>
      </section>

      {/* Form Section */}
      <section className={styles.formSection}>
        <div className="container">
          <CalculationForm />
        </div>
      </section>

      {/* Info Section */}
      <section className={styles.infoSection}>
        <div className="container">
          <div className={styles.infoGrid}>
            <div className={styles.infoCard}>
              <div className={styles.infoIcon}>🔮</div>
              <h3>Gizlilik Garantisi</h3>
              <p>Bilgileriniz güvendedir ve asla üçüncü taraflarla paylaşılmaz.</p>
            </div>
            <div className={styles.infoCard}>
              <div className={styles.infoIcon}>⚡</div>
              <h3>Anında Sonuç</h3>
              <p>Hesaplama işlemi saniyeler içinde tamamlanır ve sonuçlarınızı görürsünüz.</p>
            </div>
            <div className={styles.infoCard}>
              <div className={styles.infoIcon}>📊</div>
              <h3>Detaylı Analiz</h3>
              <p>Her sayının anlamı ve sizin için özel yorumlar sunuyoruz.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}