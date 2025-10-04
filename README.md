# Karmik Numeroloji - Full Stack Next.js Application

Modern, hızlı ve ölçeklenebilir karmik numeroloji hesaplama ve analiz platformu.

## 🚀 Teknoloji Stack

- **Frontend:** Next.js 14 (App Router)
- **Database:** Supabase (PostgreSQL)
- **Styling:** CSS Modules + Custom CSS
- **Deployment:** Netlify
- **Language:** JavaScript

## 📋 Özellikler

✅ Sunucu taraflı rendering (SSR) ve Incremental Static Regeneration (ISR)  
✅ Supabase ile gerçek zamanlı database entegrasyonu  
✅ Responsive tasarım (Mobil, Tablet, Desktop)  
✅ SEO optimizasyonu  
✅ Performans optimizasyonu  
✅ Güvenli API kullanımı  
✅ Mistik ve modern UI/UX tasarım  

## 🛠️ Kurulum Adımları

### 1. Supabase Kurulumu

1. [Supabase](https://supabase.com) hesabı oluşturun
2. Yeni bir proje oluşturun
3. SQL Editor'de `supabase/migrations/` içindeki schema'yı çalıştırın
4. API keys'leri kopyalayın (Settings > API)

### 2. Projeyi Klonlayın

```bash
git clone <repository-url>
cd karmic-numerology
npm install
```

### 3. Environment Variables

`.env.local` dosyası oluşturun:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### 4. Development Server

```bash
npm run dev
```

Tarayıcıda `http://localhost:3000` adresini açın.

## 🌐 Netlify Deployment

### Otomatik Deployment (Önerilen)

1. GitHub'a repository push edin
2. [Netlify](https://netlify.com) hesabınızla giriş yapın
3. "Import from Git" seçeneğini kullanın
4. Repository'yi seçin
5. Build ayarları:
   - **Build command:** `npm run build`
   - **Publish directory:** `.next`
6. Environment variables ekleyin:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
7. "Deploy" butonuna tıklayın

### Manuel Deployment

```bash
# Production build oluştur
npm run build

# Netlify CLI ile deploy et
npm install -g netlify-cli
netlify login
netlify init
netlify deploy --prod
```

## 📁 Proje Yapısı

```
karmic-numerology/
├── app/                      # Next.js App Router
│   ├── layout.js            # Root layout
│   ├── page.js              # Ana sayfa
│   ├── calculate/           # Hesaplama sayfası
│   ├── details/             # Detay sayfası
│   ├── about/               # Hakkımızda
│   └── contact/             # İletişim
├── components/              # React components
│   ├── Hero.js
│   ├── Features.js
│   ├── Navigation.js
│   ├── Footer.js
│   └── CalculationForm.js
├── lib/                     # Utility functions
│   ├── supabase.js         # Database client
│   └── numerology.js       # Calculation logic
├── styles/                  # Global styles
│   └── globals.css
├── supabase/               # Database schemas
│   └── migrations/
├── public/                 # Static assets
├── next.config.js          # Next.js config
├── netlify.toml           # Netlify config
└── package.json
```

## 🗄️ Database Schema

### Ana Tablolar

- **hero_sections** - Ana sayfa hero bölümü
- **features** - Özellikler/Hizmetler
- **how_it_works** - Nasıl çalışır adımları
- **testimonials** - Kullanıcı yorumları
- **numerology_numbers** - Numeroloji sayıları (1-9)
- **karmic_numbers** - Karmik sayılar (11, 22, 33)
- **articles** - Blog yazıları
- **team_members** - Ekip üyeleri
- **contact_submissions** - İletişim form gönderileri
- **calculation_results** - Hesaplama sonuçları
- **site_settings** - Site ayarları

## ⚡ Performans Optimizasyonları

1. **ISR (Incremental Static Regeneration)**
   - Ana sayfa her 1 saatte bir yenilenir
   - Cache stratejisi ile hızlı yükleme

2. **Database Optimizasyonu**
   - İndeksler kullanılıyor
   - Tek sorguda multiple data fetch
   - Row Level Security (RLS) aktif

3. **Frontend Optimizasyonu**
   - CSS Modules ile scope isolation
   - Lazy loading için intersection observer
   - Minimal JavaScript bundle

4. **SEO**
   - Semantic HTML
   - Meta tags
   - Open Graph tags
   - Structured data (JSON-LD) hazır

## 🔒 Güvenlik

- Environment variables kullanımı
- Supabase RLS policies
- CORS yapılandırması
- Input validation
- XSS protection headers

## 📊 Analytics & Monitoring

Calculation results tablosunda:
- Kullanıcı istatistikleri
- Popüler sayılar
- Kullanım trendleri

## 🎨 Özelleştirme

### Renk Paleti Değiştirme

`styles/globals.css` dosyasında CSS variables:

```css
:root {
  --color-primary: #9B59B6;
  --color-secondary: #3498DB;
  --color-accent: #E8B923;
  /* ... */
}
```

### Font Değiştirme

`styles/globals.css`:

```css
@import url('your-font-url');

:root {
  --font-heading: 'Your Heading Font', serif;
  --font-body: 'Your Body Font', sans-serif;
}
```

## 🐛 Troubleshooting

### Build Hatası

```bash
# Cache'i temizle
rm -rf .next
npm run build
```

### Supabase Bağlantı Hatası

- Environment variables'ları kontrol edin
- Supabase URL ve Key doğruluğunu onaylayın
- RLS policies'i kontrol edin

### Netlify Deploy Hatası

- Build logs'ları inceleyin
- Environment variables Netlify'da set edilmiş mi?
- Node version uyumlu mu? (>=18.0.0)

## 📈 Gelecek Özellikler

- [ ] Kullanıcı hesapları ve profiller
- [ ] PDF rapor oluşturma
- [ ] Email ile sonuç gönderme
- [ ] Çoklu dil desteği
- [ ] Admin panel
- [ ] Gelişmiş analytics dashboard

## 📝 Lisans

© 2025 Karmik Numeroloji. Tüm hakları saklıdır.

## 🤝 Katkıda Bulunma

Katkılarınızı bekliyoruz! Pull request göndermeden önce:

1. Kod standartlarına uyun
2. Component'leri test edin
3. README güncellemelerini ekleyin

## 📧 İletişim

Sorularınız için: info@karmicnumeroloji.com

---

**Hazırlayan:** AI Assistant  
**Versiyon:** 1.0.0  
**Son Güncelleme:** 2025