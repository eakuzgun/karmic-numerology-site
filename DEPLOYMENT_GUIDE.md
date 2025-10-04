# 🚀 Karmik Numeroloji - Hızlı Deployment Rehberi

Bu rehber, projeyi sıfırdan canlıya almanız için adım adım talimatlar içerir.

## ⚡ Hızlı Başlangıç (15 dakika)

### 1️⃣ Supabase Kurulumu (5 dakika)

1. **Supabase hesabı oluşturun**: https://supabase.com
2. **"New Project"** tıklayın
3. Proje adı: `karmic-numerology`
4. Database şifresi belirleyin (güvenli bir şifre)
5. Region seçin: `Europe West` (Avrupa için)
6. **Create Project** tıklayın

### 2️⃣ Database Schema Yükleyin (3 dakika)

1. Sol menüden **SQL Editor** seçin
2. `supabase_schema` artifact'taki tüm SQL kodunu kopyalayın
3. SQL Editor'e yapıştırın
4. **RUN** butonuna tıklayın
5. ✅ "Success" mesajını görmelisiniz

### 3️⃣ API Keys Alın (1 dakika)

1. Sol menüden **Settings** → **API** seçin
2. Şu değerleri kopyalayın:
   - **Project URL**: `https://xxxxx.supabase.co`
   - **anon public** key: `eyJhbGc...` (uzun bir string)

### 4️⃣ Projeyi GitHub'a Yükleyin (3 dakika)

```bash
# Terminal'de:
git init
git add .
git commit -m "Initial commit: Karmic Numerology"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/karmic-numerology.git
git push -u origin main
```

### 5️⃣ Netlify'da Deploy Edin (3 dakika)

1. **Netlify'a giriş yapın**: https://app.netlify.com
2. **"Add new site"** → **"Import an existing project"**
3. **GitHub** seçin ve repository'nizi seçin
4. Build ayarları (otomatik doldurulur):
   ```
   Build command: npm run build
   Publish directory: .next
   ```
5. **"Add environment variables"** tıklayın:
   ```
   NEXT_PUBLIC_SUPABASE_URL = [Supabase Project URL]
   NEXT_PUBLIC_SUPABASE_ANON_KEY = [Supabase anon key]
   ```
6. **"Deploy site"** tıklayın
7. ⏳ 2-3 dakika bekleyin...
8. 🎉 **Tebrikler!** Siteniz canlıda!

---

## 📋 Detaylı Kurulum Adımları

### Local Development

```bash
# 1. Bağımlılıkları yükle
npm install

# 2. Environment variables oluştur
# .env.local dosyası oluşturun ve şunları ekleyin:
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key

# 3. Development server'ı başlat
npm run dev

# 4. Tarayıcıda aç
# http://localhost:3000
```

### Production Build Test

```bash
# Production build oluştur
npm run build

# Production server'ı başlat
npm start
```

---

## 🗄️ Database İçerik Ekleme

### Supabase Dashboard Üzerinden

1. **Table Editor** → İlgili tablo seçin
2. **"Insert row"** tıklayın
3. Verileri girin
4. **Save** tıklayın

### Örnek: Hero Section Ekleme

```sql
INSERT INTO hero_sections (title, subtitle, description, cta_text) 
VALUES (
  'Karmik Enerjinizi Keşfedin',
  'Numeroloji ile İç Yolculuğunuza Başlayın',
  'Doğum tarihiniz ve isminiz sayıların evrensel dilinde size özel mesajlar taşır.',
  'Hesaplamaya Başla'
);
```

### Örnek: Feature Ekleme

```sql
INSERT INTO features (title, description, icon_name, order_index) 
VALUES (
  'Yaşam Yolu Hesaplaması',
  'Doğum tarihinize göre yaşam amacınızı keşfedin',
  'compass',
  1
);
```

---

## 🎨 Özelleştirme

### Renkleri Değiştirme

`styles/globals.css` dosyasında:

```css
:root {
  --color-primary: #9B59B6;      /* Ana renk */
  --color-secondary: #3498DB;    /* İkincil renk */
  --color-accent: #E8B923;       /* Vurgu rengi */
}
```

### Logo Değiştirme

`components/Navigation.js` ve `components/Footer.js` dosyalarında logo sembolünü değiştirin:

```javascript
<span className={styles.logoIcon}>✦</span>  // Bunu değiştirin
```

### İletişim Bilgileri

Supabase'de `site_settings` tablosuna ekleyin:

```sql
INSERT INTO site_settings (key, value) VALUES
('contact_info', '{"email": "info@example.com", "phone": "+90 555 123 4567"}');
```

---

## 🔧 Sorun Giderme

### Build Hatası

```bash
# Cache'i temizle
rm -rf .next node_modules
npm install
npm run build
```

### Supabase Bağlantı Hatası

✅ Kontrol listesi:
- [ ] `.env.local` dosyası var mı?
- [ ] Environment variables doğru mu?
- [ ] Supabase projeniz aktif mi?
- [ ] RLS policies aktif mi?

### Netlify Deploy Hatası

1. **Build logs**'u kontrol edin
2. Environment variables Netlify'da ekli mi?
3. Node version: 18+ gerekli

---

## 📊 İlk İçerik Ekleme Checklist

Deployment sonrası bu içerikleri ekleyin:

- [ ] Hero section (1 adet)
- [ ] Features (en az 3 adet)
- [ ] How it works steps (3 adet)
- [ ] Testimonials (3-6 adet)
- [ ] Numerology numbers 1-9 (9 adet)
- [ ] Karmic numbers 11, 22, 33 (3 adet)
- [ ] Team member (en az 1 adet)
- [ ] Site settings (contact_info, social_links)

### Hızlı Sample Data SQL

```sql
-- Sample data yükle (supabase_schema artifact'ta mevcut)
-- "SAMPLE DATA" bölümündeki SQL'i çalıştırın
```

---

## 🚀 Performance Optimizasyonu

### Images

- Supabase Storage kullanın
- WebP formatı tercih edin
- Lazy loading aktif

### Caching

- ISR (Incremental Static Regeneration) aktif
- Revalidate süresi: 1 saat
- Netlify CDN otomatik

### SEO

- Metadata her sayfada ekli
- Semantic HTML kullanılıyor
- Open Graph tags hazır

---

## 📈 Monitoring & Analytics

### Google Analytics Ekleme

`app/layout.js` dosyasına:

```javascript
<Script src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX" />
<Script id="google-analytics">
  {`
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', 'G-XXXXXXXXXX');
  `}
</Script>
```

### Supabase Analytics

Dashboard → Analytics → Her tablo için istatistikler

---

## 🔐 Güvenlik Best Practices

✅ Yapılması gerekenler:
- [ ] Environment variables asla commit etmeyin
- [ ] `.env.local` dosyası `.gitignore`'da
- [ ] Supabase RLS policies aktif
- [ ] HTTPS kullanımı (Netlify otomatik)
- [ ] Regular Supabase backups

---

## 🆘 Yardım & Destek

### Dokümantasyon

- Next.js: https://nextjs.org/docs
- Supabase: https://supabase.com/docs
- Netlify: https://docs.netlify.com

### Sorun mu var?

1. README.md dosyasını okuyun
2. Build logs kontrol edin
3. Browser console hatalarını inceleyin
4. Supabase logs kontrol edin

---

## ✅ Deployment Checklist

Canlıya almadan önce:

- [ ] Tüm environment variables set edildi
- [ ] Database schema yüklendi
- [ ] Sample data eklendi
- [ ] Local build başarılı (`npm run build`)
- [ ] Tüm sayfalar çalışıyor
- [ ] Form submit test edildi
- [ ] Responsive tasarım kontrol edildi
- [ ] SEO metadata kontrol edildi
- [ ] Analytics eklendi (opsiyonel)

---

## 🎉 Tebrikler!

Karmik Numeroloji siteniz artık canlıda! 

**Next Steps:**
1. İçerik ekleyin (blog yazıları, ekip üyeleri)
2. Social media'da paylaşın
3. Google Search Console ekleyin
4. Analytics takip edin

**Netlify URL:** `https://your-site-name.netlify.app`

Custom domain eklemek için: Netlify Dashboard → Domain settings

---

**İyi şanslar! ✨**