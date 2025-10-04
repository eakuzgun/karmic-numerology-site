// lib/numerology.js

/**
 * Türkçe karakterleri numerolojik değerlere çeviren tablo
 */
const LETTER_VALUES = {
  // A-I (1-9)
  'A': 1, 'B': 2, 'C': 3, 'Ç': 3, 'D': 4, 'E': 5, 'F': 6, 'G': 7, 'Ğ': 7, 'H': 8, 'I': 9, 'İ': 9,
  // J-R (1-9)
  'J': 1, 'K': 2, 'L': 3, 'M': 4, 'N': 5, 'O': 6, 'Ö': 6, 'P': 7, 'Q': 8, 'R': 9,
  // S-Z (1-8)
  'S': 1, 'Ş': 1, 'T': 2, 'U': 3, 'Ü': 3, 'V': 4, 'W': 5, 'X': 6, 'Y': 7, 'Z': 8,
};

/**
 * Sesli harfler
 */
const VOWELS = ['A', 'E', 'I', 'İ', 'O', 'Ö', 'U', 'Ü'];

/**
 * Sayıyı tek haneye indirgeme (Master numbers korunur: 11, 22, 33)
 */
function reduceToSingleDigit(num) {
  // Master numbers kontrolü
  if (num === 11 || num === 22 || num === 33) {
    return num;
  }

  while (num > 9) {
    const digits = num.toString().split('');
    num = digits.reduce((sum, digit) => sum + parseInt(digit), 0);
    
    // Hesaplama sırasında master number çıkarsa koru
    if (num === 11 || num === 22 || num === 33) {
      return num;
    }
  }

  return num;
}

/**
 * YAŞAM YOLU SAYISI (Life Path Number)
 * Doğum tarihinden hesaplanır - kişinin temel amacı ve karmik misyonu
 */
export function calculateLifePath(birthDate) {
  const date = new Date(birthDate);
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();

  // Her bileşeni ayrı indirgeme
  const reducedDay = reduceToSingleDigit(day);
  const reducedMonth = reduceToSingleDigit(month);
  const reducedYear = reduceToSingleDigit(year);

  // Toplam ve son indirgeme
  const total = reducedDay + reducedMonth + reducedYear;
  return reduceToSingleDigit(total);
}

/**
 * KADERİ SAYISI (Destiny/Expression Number)
 * Tam isimden hesaplanır - kişinin yaşam görevi
 */
export function calculateDestiny(fullName) {
  const cleanName = fullName.toUpperCase().replace(/[^A-ZÇĞİÖŞÜ]/g, '');
  
  let total = 0;
  for (let char of cleanName) {
    total += LETTER_VALUES[char] || 0;
  }

  return reduceToSingleDigit(total);
}

/**
 * RUH SAYISI (Soul Urge Number)
 * İsimdeki sesli harflerden hesaplanır - iç arzular
 */
export function calculateSoulUrge(fullName) {
  const cleanName = fullName.toUpperCase().replace(/[^A-ZÇĞİÖŞÜ]/g, '');
  
  let total = 0;
  for (let char of cleanName) {
    if (VOWELS.includes(char)) {
      total += LETTER_VALUES[char] || 0;
    }
  }

  return reduceToSingleDigit(total);
}

/**
 * KİŞİLİK SAYISI (Personality Number)
 * İsimdeki sessiz harflerden hesaplanır - dış görünüm
 */
export function calculatePersonality(fullName) {
  const cleanName = fullName.toUpperCase().replace(/[^A-ZÇĞİÖŞÜ]/g, '');
  
  let total = 0;
  for (let char of cleanName) {
    if (!VOWELS.includes(char)) {
      total += LETTER_VALUES[char] || 0;
    }
  }

  return reduceToSingleDigit(total);
}

/**
 * DOĞUM GÜNÜ SAYISI (Birthday Number)
 * Doğum gününden direkt hesaplanır - özel yetenekler
 */
export function calculateBirthday(birthDate) {
  const date = new Date(birthDate);
  const day = date.getDate();
  return reduceToSingleDigit(day);
}

/**
 * KİŞİSEL YIL SAYISI (Personal Year Number)
 * Mevcut yıl için karmik döngü
 */
export function calculatePersonalYear(birthDate) {
  const date = new Date(birthDate);
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const currentYear = new Date().getFullYear();

  const reducedDay = reduceToSingleDigit(day);
  const reducedMonth = reduceToSingleDigit(month);
  const reducedYear = reduceToSingleDigit(currentYear);

  const total = reducedDay + reducedMonth + reducedYear;
  return reduceToSingleDigit(total);
}

/**
 * UYUMLULUK ANALİZİ (Compatibility)
 * İki kişinin yaşam yolu sayılarına göre uyumluluk
 */
export function calculateCompatibility(number1, number2) {
  const compatibilityMatrix = {
    1: { compatible: [1, 5, 7], neutral: [2, 3, 9], challenging: [4, 6, 8] },
    2: { compatible: [2, 4, 6, 8], neutral: [1, 3, 9], challenging: [5, 7] },
    3: { compatible: [3, 5, 6, 9], neutral: [1, 2, 7], challenging: [4, 8] },
    4: { compatible: [2, 4, 8], neutral: [6, 7], challenging: [1, 3, 5, 9] },
    5: { compatible: [1, 3, 5, 7], neutral: [9], challenging: [2, 4, 6, 8] },
    6: { compatible: [2, 3, 6, 9], neutral: [4, 8], challenging: [1, 5, 7] },
    7: { compatible: [1, 5, 7], neutral: [2, 4], challenging: [3, 6, 8, 9] },
    8: { compatible: [2, 4, 8], neutral: [3, 6], challenging: [1, 5, 7, 9] },
    9: { compatible: [3, 6, 9], neutral: [1, 2, 5], challenging: [4, 7, 8] },
  };

  const num1 = reduceToSingleDigit(number1);
  const num2 = reduceToSingleDigit(number2);

  if (compatibilityMatrix[num1].compatible.includes(num2)) {
    return { level: 'high', percentage: 85 };
  } else if (compatibilityMatrix[num1].neutral.includes(num2)) {
    return { level: 'medium', percentage: 60 };
  } else {
    return { level: 'challenging', percentage: 35 };
  }
}

/**
 * TAM NUMEROLOJI ANALİZİ
 * Tüm hesaplamaları bir arada yapar
 */
export function calculateFullNumerology(fullName, birthDate) {
  return {
    lifePath: calculateLifePath(birthDate),
    destiny: calculateDestiny(fullName),
    soulUrge: calculateSoulUrge(fullName),
    personality: calculatePersonality(fullName),
    birthday: calculateBirthday(birthDate),
    personalYear: calculatePersonalYear(birthDate),
    timestamp: new Date().toISOString(),
  };
}

/**
 * Master Number kontrolü
 */
export function isMasterNumber(num) {
  return num === 11 || num === 22 || num === 33;
}

/**
 * Sayı yorumu için renk kodu
 */
export function getNumberColor(num) {
  const colors = {
    1: '#FF6B6B',
    2: '#4ECDC4',
    3: '#FFD93D',
    4: '#95E1D3',
    5: '#F38181',
    6: '#AA96DA',
    7: '#A8DADC',
    8: '#C9ADA7',
    9: '#9D84B7',
    11: '#9B59B6',
    22: '#3498DB',
    33: '#E74C3C',
  };
  return colors[num] || '#6C757D';
}