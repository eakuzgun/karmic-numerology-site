// lib/numerologyMatrix.js

/**
 * PYTHAGORAS KARE SİSTEMİ
 * Doğum tarihi rakamlarını 1-9 arası konumlara yerleştirme
 */

function reduceToSingleDigit(num) {
  while (num > 9) {
    const digits = String(num).split('');
    num = digits.reduce((sum, d) => sum + parseInt(d), 0);
  }
  return num;
}

/**
 * Pythagoras Karesi Hesaplama
 */
export function calculateNumerologyMatrix(birthDate) {
  const date = new Date(birthDate);
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();

  // Tarihi string'e çevir ve tüm rakamları al
  const dateString = `${String(day).padStart(2, '0')}${String(month).padStart(2, '0')}${year}`;
  const allDigits = dateString.split('').map(d => parseInt(d)).filter(d => d !== 0);

  // 1-9 arası her sayının kaç kez geçtiğini say
  const digitCounts = {};
  for (let i = 1; i <= 9; i++) {
    digitCounts[i] = 0;
  }

  allDigits.forEach(digit => {
    if (digit >= 1 && digit <= 9) {
      digitCounts[digit]++;
    }
  });

  // EK HESAPLAMALAR (Çalışan Sayılar)
  
  // İlk işlem sayısı: Tüm rakamların toplamı
  const firstSum = allDigits.reduce((sum, d) => sum + d, 0);
  
  // İkinci işlem sayısı: İlk toplamın rakamlarının toplamı
  const secondSum = reduceToSingleDigit(firstSum);
  
  // Üçüncü işlem sayısı: İlk toplam - (2 * ilk rakam)
  const firstDigit = parseInt(String(day).padStart(2, '0')[0]);
  const thirdSum = Math.abs(firstSum - (2 * firstDigit));
  
  // Dördüncü işlem sayısı: Üçüncü toplamın rakamlarının toplamı
  const fourthSum = reduceToSingleDigit(thirdSum);

  // Ek hesaplanan sayıları da digit count'a ekle
  const additionalDigits = [
    ...String(firstSum).split('').map(d => parseInt(d)),
    ...String(secondSum).split('').map(d => parseInt(d)),
    ...String(thirdSum).split('').map(d => parseInt(d)),
    ...String(fourthSum).split('').map(d => parseInt(d))
  ].filter(d => d >= 1 && d <= 9);

  additionalDigits.forEach(digit => {
    digitCounts[digit]++;
  });

  // Satır, sütun ve çapraz güçleri
  const rows = {
    row1: digitCounts[1] + digitCounts[2] + digitCounts[3], // İrade hattı
    row2: digitCounts[4] + digitCounts[5] + digitCounts[6], // Aile hattı
    row3: digitCounts[7] + digitCounts[8] + digitCounts[9], // Alışkanlık hattı
  };

  const columns = {
    col1: digitCounts[1] + digitCounts[4] + digitCounts[7], // Özgüven
    col2: digitCounts[2] + digitCounts[5] + digitCounts[8], // Aile/İlişki
    col3: digitCounts[3] + digitCounts[6] + digitCounts[9], // İstikrar
  };

  const diagonals = {
    diag1: digitCounts[1] + digitCounts[5] + digitCounts[9], // Ruhsal
    diag2: digitCounts[3] + digitCounts[5] + digitCounts[7], // Fiziksel
  };

  // 3x3 matris formatı
  const matrix = [
    [digitCounts[1], digitCounts[2], digitCounts[3]],
    [digitCounts[4], digitCounts[5], digitCounts[6]],
    [digitCounts[7], digitCounts[8], digitCounts[9]]
  ];

  return {
    birthDate: { day, month, year },
    
    // Her pozisyonun değeri (1-9)
    digitCounts,
    
    // Matris görünümü
    matrix,
    
    // Çalışan sayılar
    workingNumbers: {
      A1: firstSum,
      A2: secondSum,
      A3: thirdSum,
      A4: fourthSum,
    },

    // Satır/Sütun güçleri
    lines: {
      rows,
      columns,
      diagonals,
    },

    // Eksik sayılar (Karmik görevler)
    missingNumbers: Object.keys(digitCounts).filter(k => digitCounts[k] === 0).map(Number),

    // Ham rakamlar
    rawDigits: allDigits,
  };
}

/**
 * Pozisyon anlamları (Pythagoras sistemi)
 */
export function getPositionMeaning(position) {
  const meanings = {
    1: { title: "Karakter & Ego", description: "Liderlik özellikleri, irade gücü, bağımsızlık", color: "#FF6B6B" },
    2: { title: "Enerji", description: "Yaşam enerjisi, biyoenerji, sezgi", color: "#4ECDC4" },
    3: { title: "İlgi", description: "Yaratıcılık, merak, bilimsel ilgi", color: "#FFD93D" },
    4: { title: "Sağlık", description: "Fiziksel sağlık, dayanıklılık", color: "#95E1D3" },
    5: { title: "Mantık", description: "Analitik düşünme, planlama yeteneği", color: "#F38181" },
    6: { title: "Emek", description: "Pratik beceriler, el işi yeteneği", color: "#AA96DA" },
    7: { title: "Şans", description: "Kader, şans faktörü", color: "#A8DADC" },
    8: { title: "Sorumluluk", description: "Görev bilinci, aile sorumluluğu", color: "#C9ADA7" },
    9: { title: "Hafıza", description: "Zihinsel güç, bellek", color: "#9D84B7" },
  };
  
  return meanings[position] || { title: "Bilinmiyor", description: "", color: "#999" };
}

/**
 * Sayı gücü yorumu
 */
export function getStrengthLevel(count) {
  if (count === 0) return { level: "Yok", desc: "Karmik görev", color: "#E74C3C" };
  if (count === 1) return { level: "Zayıf", desc: "Geliştirilmeli", color: "#F39C12" };
  if (count === 2) return { level: "Normal", desc: "Dengeli", color: "#3498DB" };
  if (count === 3) return { level: "Güçlü", desc: "İyi gelişmiş", color: "#27AE60" };
  if (count === 4) return { level: "Çok Güçlü", desc: "Baskın özellik", color: "#8E44AD" };
  return { level: "Aşırı", desc: "Dengesiz", color: "#E74C3C" };
}

export function getNumberColor(count) {
  return getStrengthLevel(count).color;
}