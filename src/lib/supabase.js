// lib/supabase.js
import { createClient } from '@supabase/supabase-js';

// Supabase client instance (singleton pattern)
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: false, // Kullanıcı auth kullanmıyoruz
  },
  db: {
    schema: 'public',
  },
  global: {
    headers: {
      'x-application-name': 'karmic-numerology',
    },
  },
});

// ==========================================
// DATABASE HELPER FUNCTIONS
// ==========================================

/**
 * Ana sayfa için tüm gerekli verileri tek sorguda çeker
 */
export async function getHomePageData() {
  try {
    const [heroData, featuresData, stepsData, testimonialsData] = await Promise.all([
      supabase
        .from('hero_sections')
        .select('*')
        .eq('is_active', true)
        .single(),
      
      supabase
        .from('features')
        .select('*')
        .eq('is_active', true)
        .order('order_index', { ascending: true }),
      
      supabase
        .from('how_it_works')
        .select('*')
        .eq('is_active', true)
        .order('step_number', { ascending: true }),
      
      supabase
        .from('testimonials')
        .select('*')
        .eq('is_active', true)
        .order('created_at', { ascending: false })
        .limit(6),
    ]);

    return {
      hero: heroData.data,
      features: featuresData.data || [],
      steps: stepsData.data || [],
      testimonials: testimonialsData.data || [],
    };
  } catch (error) {
    console.error('Error fetching home page data:', error);
    return null;
  }
}

/**
 * Numeroloji sayılarını ve karmik sayıları çeker
 */
export async function getNumerologyData() {
  try {
    const [numbersData, karmicData] = await Promise.all([
      supabase
        .from('numerology_numbers')
        .select('*')
        .order('number', { ascending: true }),
      
      supabase
        .from('karmic_numbers')
        .select('*')
        .order('number', { ascending: true }),
    ]);

    return {
      numbers: numbersData.data || [],
      karmicNumbers: karmicData.data || [],
    };
  } catch (error) {
    console.error('Error fetching numerology data:', error);
    return null;
  }
}

/**
 * Belirli bir numeroloji sayısının detayını çeker
 */
export async function getNumberDetails(number) {
  try {
    // Önce normal sayılarda ara
    let { data, error } = await supabase
      .from('numerology_numbers')
      .select('*')
      .eq('number', number)
      .single();

    // Bulunamazsa karmik sayılarda ara
    if (error || !data) {
      const karmicResult = await supabase
        .from('karmic_numbers')
        .select('*')
        .eq('number', number)
        .single();
      
      data = karmicResult.data;
    }

    return data;
  } catch (error) {
    console.error('Error fetching number details:', error);
    return null;
  }
}

/**
 * Blog/makale listesini çeker
 */
export async function getArticles(limit = 10) {
  try {
    const { data, error } = await supabase
      .from('articles')
      .select('id, slug, title, excerpt, featured_image_url, category, tags, author, reading_time, published_at')
      .eq('is_published', true)
      .order('published_at', { ascending: false })
      .limit(limit);

    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error fetching articles:', error);
    return [];
  }
}

/**
 * Belirli bir makaleyi slug ile çeker
 */
export async function getArticleBySlug(slug) {
  try {
    const { data, error } = await supabase
      .from('articles')
      .select('*')
      .eq('slug', slug)
      .eq('is_published', true)
      .single();

    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error fetching article:', error);
    return null;
  }
}

/**
 * Ekip üyelerini çeker
 */
export async function getTeamMembers() {
  try {
    const { data, error } = await supabase
      .from('team_members')
      .select('*')
      .eq('is_active', true)
      .order('order_index', { ascending: true });

    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error fetching team members:', error);
    return [];
  }
}

/**
 * Site ayarlarını çeker
 */
export async function getSiteSettings() {
  try {
    const { data, error } = await supabase
      .from('site_settings')
      .select('*');

    if (error) throw error;
    
    // Key-value pair olarak döndür
    return data.reduce((acc, item) => {
      acc[item.key] = item.value;
      return acc;
    }, {});
  } catch (error) {
    console.error('Error fetching site settings:', error);
    return {};
  }
}

/**
 * İletişim formu gönderimi
 */
export async function submitContactForm(formData) {
  try {
    const { data, error } = await supabase
      .from('contact_submissions')
      .insert([
        {
          name: formData.name,
          email: formData.email,
          subject: formData.subject,
          message: formData.message,
        },
      ])
      .select()
      .single();

    if (error) throw error;
    return { success: true, data };
  } catch (error) {
    console.error('Error submitting contact form:', error);
    return { success: false, error: error.message };
  }
}

/**
 * Hesaplama sonucunu kaydet
 */
export async function saveCalculationResult(resultData) {
  try {
    // Veriyi temizle ve doğru formata getir
    const cleanData = {
      user_name: resultData.user_name || null,
      birth_date: resultData.birth_date || null,
      life_path_number: resultData.life_path_number || null,
      destiny_number: resultData.destiny_number || null,
      soul_number: resultData.soul_number || null,
      personality_number: resultData.personality_number || null,
      result_data: resultData.result_data || null,
    };

    const { data, error } = await supabase
      .from('calculation_results')
      .insert([cleanData])
      .select()
      .single();

    if (error) {
      console.warn('Calculation save warning:', error.message);
      // Hata olsa bile başarılı dön (kullanıcı deneyimini etkilemesin)
      return { success: true, data: null };
    }
    
    return { success: true, data };
  } catch (error) {
    console.warn('Error saving calculation result:', error);
    // Hata olsa bile başarılı dön (kullanıcı deneyimini etkilemesin)
    return { success: true, data: null };
  }
}