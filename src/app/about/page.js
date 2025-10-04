import { getTeamMembers } from '../../lib/supabase';
import Image from 'next/image';
import styles from './about.module.css';

export const metadata = {
  title: 'Hakkımızda | Karmik Numeroloji',
  description: 'Numeroloji uzmanlarımız ve misyonumuz hakkında bilgi edinin.',
};

export const revalidate = 7200; // 2 hours

export default async function AboutPage() {
  const teamMembers = await getTeamMembers();

  return (
    <div className={styles.aboutPage}>
      {/* Hero */}
      <section className={styles.hero}>
        <div className="container">
          <h1 className={styles.title}>Hakkımızda</h1>
          <p className={styles.subtitle}>
            Sayıların gizemli dünyasında rehberliğiniz
          </p>
        </div>
      </section>

      {/* Mission */}
      <section className={`${styles.mission} section`}>
        <div className="container">
          <div className={styles.missionContent}>
            <div className={styles.missionText}>
              <h2>Misyonumuz</h2>
              <p>
                Karmik Numeroloji olarak, insanların sayıların evrensel dilini anlayarak 
                kendilerini daha iyi tanımalarına yardımcı oluyoruz. Binlerce yıllık antik 
                bilgeliği modern teknolojiyle birleştirerek, herkesin erişebileceği bir 
                platform oluşturduk.
              </p>
              <p>
                Numeroloji, doğum tarihiniz ve isminizin taşıdığı titreşimleri analiz ederek 
                yaşam amacınızı, yeteneklerinizi ve karmik yolculuğunuzu ortaya çıkarır.
              </p>
            </div>
            <div className={styles.missionImage}>
              <div className={styles.geometricCircle}>
                <div className={styles.innerCircle}>✦</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className={`${styles.values} section geometric-bg`}>
        <div className="container">
          <h2 className="text-center">Değerlerimiz</h2>
          <div className={styles.valuesGrid}>
            <div className={styles.valueCard}>
              <div className={styles.valueIcon}>🔮</div>
              <h3>Güvenilirlik</h3>
              <p>Doğru ve detaylı analizler sunmak için sürekli araştırma yapıyoruz.</p>
            </div>
            <div className={styles.valueCard}>
              <div className={styles.valueIcon}>💜</div>
              <h3>Gizlilik</h3>
              <p>Bilgileriniz güvendedir ve asla paylaşılmaz.</p>
            </div>
            <div className={styles.valueCard}>
              <div className={styles.valueIcon}>✨</div>
              <h3>Erişilebilirlik</h3>
              <p>Numeroloji bilgisini herkes için ulaşılabilir kılıyoruz.</p>
            </div>
            <div className={styles.valueCard}>
              <div className={styles.valueIcon}>🌟</div>
              <h3>Kalite</h3>
              <p>En yüksek standartlarda hizmet sunmak için çalışıyoruz.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Team */}
      {teamMembers && teamMembers.length > 0 && (
        <section className={`${styles.team} section`}>
          <div className="container">
            <h2 className="text-center">Ekibimiz</h2>
            <p className={`${styles.teamSubtitle} text-center`}>
              Numeroloji alanında uzman kadromuz
            </p>
            <div className={styles.teamGrid}>
              {teamMembers.map((member) => (
                <div key={member.id} className={styles.teamCard}>
                  <div className={styles.teamAvatar}>
                    {member.photo_url ? (
                      <Image 
                        src={member.photo_url} 
                        alt={member.name}
                        width={120}
                        height={120}
                        style={{ objectFit: 'cover' }}
                      />
                    ) : (
                      <div className={styles.avatarPlaceholder}>
                        {member.name.charAt(0)}
                      </div>
                    )}
                  </div>
                  <h3>{member.name}</h3>
                  {member.title && <p className={styles.teamTitle}>{member.title}</p>}
                  {member.bio && <p className={styles.teamBio}>{member.bio}</p>}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className={`${styles.cta} section`}>
        <div className="container">
          <div className={styles.ctaContent}>
            <h2>Karmik Yolculuğunuza Başlayın</h2>
            <p>Numeroloji ile kendinizi keşfedin ve yaşamınıza yeni bir bakış açısı kazanın.</p>
            <a href="/calculate" className="btn btn-primary btn-lg">
              Hemen Hesapla
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}