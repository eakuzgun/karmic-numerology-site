'use client';

import { useState } from 'react';
import { calculateFullNumerology, getNumberColor } from '../lib/numerology';
import { calculateNumerologyMatrix } from '../lib/numerologyMatrix';
import { getNumerologyData, saveCalculationResult } from '../lib/supabase';
import NumerologyMatrix from './NumerologyMatrix';
import styles from './CalculationForm.module.css';

export default function CalculationForm() {
  const [formData, setFormData] = useState({
    fullName: '',
    birthDate: '',
  });
  const [errors, setErrors] = useState({});
  const [result, setResult] = useState(null);
  const [matrixResult, setMatrixResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [numberDetails, setNumberDetails] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Lütfen tam adınızı girin';
    } else if (formData.fullName.trim().length < 3) {
      newErrors.fullName = 'İsim en az 3 karakter olmalıdır';
    }

    if (!formData.birthDate) {
      newErrors.birthDate = 'Lütfen doğum tarihinizi seçin';
    } else {
      const birthYear = new Date(formData.birthDate).getFullYear();
      const currentYear = new Date().getFullYear();
      if (birthYear > currentYear || birthYear < 1900) {
        newErrors.birthDate = 'Geçerli bir tarih girin';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) return;

    setLoading(true);

    try {
      // Calculate numerology
      const calculationResult = calculateFullNumerology(
        formData.fullName,
        formData.birthDate
      );

      // Calculate matrix
      const matrixCalculation = calculateNumerologyMatrix(formData.birthDate);

      // Fetch number meanings from database
      const fetchedNumberDetails = await getNumerologyData();

      setResult(calculationResult);
      setMatrixResult(matrixCalculation);
      setNumberDetails(fetchedNumberDetails);

      // Analytics kaydı
      saveCalculationResult({
        user_name: formData.fullName,
        birth_date: formData.birthDate,
        life_path_number: calculationResult.lifePath,
        destiny_number: calculationResult.destiny,
        soul_number: calculationResult.soulUrge,
        personality_number: calculationResult.personality,
        result_data: calculationResult,
      }).catch(() => {});

      // Scroll to results
      setTimeout(() => {
        document.getElementById('results')?.scrollIntoView({ 
          behavior: 'smooth',
          block: 'start'
        });
      }, 100);

    } catch (err) {
      console.error('Calculation error:', err);
      setErrors({ submit: 'Bir hata oluştu. Lütfen tekrar deneyin.' });
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setFormData({ fullName: '', birthDate: '' });
    setResult(null);
    setMatrixResult(null);
    setNumberDetails(null);
    setErrors({});
  };

  const getNumberMeaning = (number) => {
    if (!numberDetails) return null;
    
    const karmicNumber = numberDetails.karmicNumbers?.find(n => n.number === number);
    if (karmicNumber) return karmicNumber;
    
    const regularNumber = numberDetails.numbers?.find(n => n.number === number);
    return regularNumber;
  };

  return (
    <div className={styles.formContainer}>
      {/* Form */}
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.formContent}>
          {/* Full Name */}
          <div className="form-group">
            <label htmlFor="fullName" className="form-label">
              Tam Adınız *
            </label>
            <input
              type="text"
              id="fullName"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              className={`form-input ${errors.fullName ? styles.errorInput : ''}`}
              placeholder="Örn: Ayşe Yıldız"
              disabled={loading}
            />
            {errors.fullName && (
              <span className="form-error">{errors.fullName}</span>
            )}
          </div>

          {/* Birth Date */}
          <div className="form-group">
            <label htmlFor="birthDate" className="form-label">
              Doğum Tarihiniz *
            </label>
            <input
              type="date"
              id="birthDate"
              name="birthDate"
              value={formData.birthDate}
              onChange={handleChange}
              className={`form-input ${errors.birthDate ? styles.errorInput : ''}`}
              disabled={loading}
              max={new Date().toISOString().split('T')[0]}
            />
            {errors.birthDate && (
              <span className="form-error">{errors.birthDate}</span>
            )}
          </div>

          {/* Submit Error */}
          {errors.submit && (
            <div className={styles.submitError}>{errors.submit}</div>
          )}

          {/* Buttons */}
          <div className={styles.buttonGroup}>
            <button
              type="submit"
              className="btn btn-primary btn-lg"
              disabled={loading}
            >
              {loading ? 'Hesaplanıyor...' : '✨ Hesapla'}
            </button>
            {result && (
              <button
                type="button"
                onClick={handleReset}
                className="btn btn-secondary"
              >
                Yeniden Hesapla
              </button>
            )}
          </div>
        </div>
      </form>

      {/* Results */}
      {result && (
        <div id="results" className={styles.results}>
          <h2 className={styles.resultsTitle}>Numeroloji Sonuçlarınız</h2>
          <p className={styles.resultsSubtitle}>
            {formData.fullName} için hesaplanan karmik değerler
          </p>

          <div className={styles.resultsGrid}>
            {/* Life Path */}
            <ResultCard
              title="Yaşam Yolu Sayısı"
              number={result.lifePath}
              details={getNumberMeaning(result.lifePath)}
              description="Yaşam amacınız ve karmik misyonunuz"
            />

            {/* Destiny */}
            <ResultCard
              title="Kader Sayısı"
              number={result.destiny}
              details={getNumberMeaning(result.destiny)}
              description="İsminizin taşıdığı enerji"
            />

            {/* Soul Urge */}
            <ResultCard
              title="Ruh Sayısı"
              number={result.soulUrge}
              details={getNumberMeaning(result.soulUrge)}
              description="İç arzularınız ve motivasyonunuz"
            />

            {/* Personality */}
            <ResultCard
              title="Kişilik Sayısı"
              number={result.personality}
              details={getNumberMeaning(result.personality)}
              description="Dış görünümünüz ve başkalarının sizi algılayışı"
            />

            {/* Birthday */}
            <ResultCard
              title="Doğum Günü Sayısı"
              number={result.birthday}
              details={getNumberMeaning(result.birthday)}
              description="Özel yetenekleriniz"
            />

            {/* Personal Year */}
            <ResultCard
              title="Kişisel Yıl Sayısı"
              number={result.personalYear}
              details={getNumberMeaning(result.personalYear)}
              description="2025 yılı için enerjiniz"
            />
          </div>

          {/* Matrix Visualization */}
          <NumerologyMatrix matrixData={matrixResult} />
        </div>
      )}
    </div>
  );
}

// Result Card Component
function ResultCard({ title, number, details, description }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const color = getNumberColor(number);

  return (
    <div className={styles.resultCard}>
      <div className={styles.cardHeader}>
        <h3 className={styles.cardTitle}>{title}</h3>
        <div 
          className={styles.numberBadge}
          style={{ backgroundColor: color }}
        >
          {number}
        </div>
      </div>

      <p className={styles.cardDescription}>{description}</p>

      {details && (
        <>
          <div className={styles.cardMeaning}>
            <strong>{details.title}</strong>
            <p>{details.description}</p>
          </div>

          {details.detailed_description && (
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className={styles.expandButton}
            >
              {isExpanded ? 'Daha Az Göster' : 'Detaylı Bilgi'}
            </button>
          )}

          {isExpanded && details.detailed_description && (
            <div className={styles.expandedContent}>
              <p>{details.detailed_description}</p>
              {details.keywords && details.keywords.length > 0 && (
                <div className={styles.keywords}>
                  {details.keywords.map((keyword, idx) => (
                    <span key={idx} className="badge badge-primary">
                      {keyword}
                    </span>
                  ))}
                </div>
              )}
            </div>
          )}
        </>
      )}
    </div>
  );
}