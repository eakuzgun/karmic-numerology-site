'use client';

import { useState } from 'react';
import { submitContactForm } from '../../lib/supabase';
import styles from './contact.module.css';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'İsminizi girin';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'E-posta adresinizi girin';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Geçerli bir e-posta adresi girin';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Mesajınızı yazın';
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Mesajınız en az 10 karakter olmalıdır';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) return;

    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const result = await submitContactForm(formData);

      if (result.success) {
        setSubmitStatus({
          type: 'success',
          message: 'Mesajınız başarıyla gönderildi! En kısa sürede size dönüş yapacağız.',
        });
        setFormData({ name: '', email: '', subject: '', message: '' });
      } else {
        setSubmitStatus({
          type: 'error',
          message: 'Bir hata oluştu. Lütfen tekrar deneyin.',
        });
      }
    } catch (err) {
      console.error('Contact form error:', err);
      setSubmitStatus({
        type: 'error',
        message: 'Bir hata oluştu. Lütfen tekrar deneyin.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={styles.contactPage}>
      {/* Hero */}
      <section className={styles.hero}>
        <div className="container">
          <h1 className={styles.title}>İletişim</h1>
          <p className={styles.subtitle}>
            Sorularınız için bize ulaşın, size yardımcı olmaktan mutluluk duyarız
          </p>
        </div>
      </section>

      {/* Contact Content */}
      <section className={`${styles.contactSection} section`}>
        <div className="container">
          <div className={styles.contactGrid}>
            {/* Contact Info */}
            <div className={styles.contactInfo}>
              <h2>Bize Ulaşın</h2>
              <p className={styles.infoText}>
                Numeroloji hakkında sorularınız mı var? Size nasıl yardımcı olabileceğimizi 
                öğrenmek için bizimle iletişime geçin.
              </p>

              <div className={styles.infoCards}>
                <div className={styles.infoCard}>
                  <div className={styles.infoIcon}>✉️</div>
                  <h3>E-posta</h3>
                  <p>info@karmicnumeroloji.com</p>
                </div>

                <div className={styles.infoCard}>
                  <div className={styles.infoIcon}>📞</div>
                  <h3>Telefon</h3>
                  <p>+90 555 123 4567</p>
                </div>

                <div className={styles.infoCard}>
                  <div className={styles.infoIcon}>📍</div>
                  <h3>Adres</h3>
                  <p>İstanbul, Türkiye</p>
                </div>

                <div className={styles.infoCard}>
                  <div className={styles.infoIcon}>⏰</div>
                  <h3>Çalışma Saatleri</h3>
                  <p>Pazartesi - Cuma<br />09:00 - 18:00</p>
                </div>
              </div>

              {/* FAQ */}
              <div className={styles.faq}>
                <h3>Sıkça Sorulan Sorular</h3>
                <div className={styles.faqItem}>
                  <strong>Numeroloji nedir?</strong>
                  <p>Sayıların evrensel dilini kullanarak kişilik ve yaşam yolu analizidir.</p>
                </div>
                <div className={styles.faqItem}>
                  <strong>Hesaplama ne kadar sürer?</strong>
                  <p>Anında sonuç alırsınız, birkaç saniye içinde tamamlanır.</p>
                </div>
                <div className={styles.faqItem}>
                  <strong>Bilgilerim güvende mi?</strong>
                  <p>Evet, tüm bilgileriniz şifrelenir ve asla paylaşılmaz.</p>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className={styles.formWrapper}>
              <form onSubmit={handleSubmit} className={styles.form}>
                <h2>Mesaj Gönderin</h2>

                {/* Success/Error Message */}
                {submitStatus && (
                  <div
                    className={`${styles.statusMessage} ${
                      submitStatus.type === 'success'
                        ? styles.success
                        : styles.error
                    }`}
                  >
                    {submitStatus.message}
                  </div>
                )}

                {/* Name */}
                <div className="form-group">
                  <label htmlFor="name" className="form-label">
                    Adınız *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className={`form-input ${errors.name ? styles.errorInput : ''}`}
                    disabled={isSubmitting}
                  />
                  {errors.name && <span className="form-error">{errors.name}</span>}
                </div>

                {/* Email */}
                <div className="form-group">
                  <label htmlFor="email" className="form-label">
                    E-posta *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`form-input ${errors.email ? styles.errorInput : ''}`}
                    disabled={isSubmitting}
                  />
                  {errors.email && <span className="form-error">{errors.email}</span>}
                </div>

                {/* Subject */}
                <div className="form-group">
                  <label htmlFor="subject" className="form-label">
                    Konu
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className="form-input"
                    disabled={isSubmitting}
                  />
                </div>

                {/* Message */}
                <div className="form-group">
                  <label htmlFor="message" className="form-label">
                    Mesajınız *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    className={`form-textarea ${errors.message ? styles.errorInput : ''}`}
                    rows="6"
                    disabled={isSubmitting}
                  />
                  {errors.message && <span className="form-error">{errors.message}</span>}
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="btn btn-primary btn-lg"
                  disabled={isSubmitting}
                  style={{ width: '100%' }}
                >
                  {isSubmitting ? 'Gönderiliyor...' : 'Mesaj Gönder'}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}