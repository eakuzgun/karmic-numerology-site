'use client';

import { useState } from 'react';
import { getPositionMeaning, getStrengthLevel } from '../lib/numerologyMatrix';
import styles from './NumerologyMatrix.module.css';

export default function NumerologyMatrix({ matrixData }) {
  const [selectedPos, setSelectedPos] = useState(null);

  if (!matrixData) return null;

  const { digitCounts, workingNumbers, lines, birthDate, missingNumbers } = matrixData;

  const formatDate = () => {
    const { day, month, year } = birthDate;
    return `${String(day).padStart(2, '0')}.${String(month).padStart(2, '0')}.${year}`;
  };

  return (
    <div className={styles.matrixContainer}>
      <div className={styles.header}>
        <h2 className={styles.title}>Pythagoras Karesi</h2>
        <p className={styles.date}>{formatDate()}</p>
      </div>

      {/* 3x3 Pythagoras Karesi */}
      <div className={styles.pythagorasSquare}>
        {/* Satır 1: 1, 2, 3 */}
        <MatrixCell pos={1} count={digitCounts[1]} selected={selectedPos === 1} onClick={setSelectedPos} />
        <MatrixCell pos={2} count={digitCounts[2]} selected={selectedPos === 2} onClick={setSelectedPos} />
        <MatrixCell pos={3} count={digitCounts[3]} selected={selectedPos === 3} onClick={setSelectedPos} />
        
        {/* Satır 2: 4, 5, 6 */}
        <MatrixCell pos={4} count={digitCounts[4]} selected={selectedPos === 4} onClick={setSelectedPos} />
        <MatrixCell pos={5} count={digitCounts[5]} selected={selectedPos === 5} onClick={setSelectedPos} isCenter />
        <MatrixCell pos={6} count={digitCounts[6]} selected={selectedPos === 6} onClick={setSelectedPos} />
        
        {/* Satır 3: 7, 8, 9 */}
        <MatrixCell pos={7} count={digitCounts[7]} selected={selectedPos === 7} onClick={setSelectedPos} />
        <MatrixCell pos={8} count={digitCounts[8]} selected={selectedPos === 8} onClick={setSelectedPos} />
        <MatrixCell pos={9} count={digitCounts[9]} selected={selectedPos === 9} onClick={setSelectedPos} />
      </div>

      {/* Çalışan Sayılar */}
      <div className={styles.workingNumbers}>
        <h3>Çalışan Sayılar</h3>
        <div className={styles.workingGrid}>
          <div className={styles.workingItem}>
            <span>A1 (Toplam):</span>
            <strong>{workingNumbers.A1}</strong>
          </div>
          <div className={styles.workingItem}>
            <span>A2 (İndirgeme):</span>
            <strong>{workingNumbers.A2}</strong>
          </div>
          <div className={styles.workingItem}>
            <span>A3 (Fark):</span>
            <strong>{workingNumbers.A3}</strong>
          </div>
          <div className={styles.workingItem}>
            <span>A4 (İndirgeme):</span>
            <strong>{workingNumbers.A4}</strong>
          </div>
        </div>
      </div>

      {/* Seçili Pozisyon Detayı */}
      {selectedPos && (
        <div className={styles.detail}>
          <button className={styles.closeBtn} onClick={() => setSelectedPos(null)}>×</button>
          <div className={styles.detailHeader}>
            <h3>{selectedPos}. {getPositionMeaning(selectedPos).title}</h3>
            <div className={styles.detailBadge} style={{
              backgroundColor: getStrengthLevel(digitCounts[selectedPos]).color
            }}>
              {getStrengthLevel(digitCounts[selectedPos]).level}
            </div>
          </div>
          <p>{getPositionMeaning(selectedPos).description}</p>
          <div className={styles.detailCount}>
            <span>Tekrar Sayısı:</span>
            <strong>{digitCounts[selectedPos]}</strong>
            <span className={styles.detailDesc}>
              {getStrengthLevel(digitCounts[selectedPos]).desc}
            </span>
          </div>
        </div>
      )}

      {/* Eksik Sayılar */}
      {missingNumbers.length > 0 && (
        <div className={styles.missing}>
          <h3>⚠️ Karmik Görevler (Eksik Sayılar)</h3>
          <div className={styles.missingList}>
            {missingNumbers.map(num => (
              <div key={num} className={styles.missingItem}>
                <span className={styles.missingNum}>{num}</span>
                <span>{getPositionMeaning(num).title}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Satır/Sütun Güçleri */}
      <div className={styles.lines}>
        <div className={styles.lineGroup}>
          <h4>Satırlar (Yatay)</h4>
          <div className={styles.lineItem}>
            <span>İrade Hattı (1-2-3):</span>
            <strong>{lines.rows.row1}</strong>
          </div>
          <div className={styles.lineItem}>
            <span>Aile Hattı (4-5-6):</span>
            <strong>{lines.rows.row2}</strong>
          </div>
          <div className={styles.lineItem}>
            <span>Alışkanlık Hattı (7-8-9):</span>
            <strong>{lines.rows.row3}</strong>
          </div>
        </div>
        
        <div className={styles.lineGroup}>
          <h4>Sütunlar (Dikey)</h4>
          <div className={styles.lineItem}>
            <span>Özgüven (1-4-7):</span>
            <strong>{lines.columns.col1}</strong>
          </div>
          <div className={styles.lineItem}>
            <span>Aile/İlişki (2-5-8):</span>
            <strong>{lines.columns.col2}</strong>
          </div>
          <div className={styles.lineItem}>
            <span>İstikrar (3-6-9):</span>
            <strong>{lines.columns.col3}</strong>
          </div>
        </div>
        
        <div className={styles.lineGroup}>
          <h4>Çaprazlar</h4>
          <div className={styles.lineItem}>
            <span>Ruhsal (1-5-9):</span>
            <strong>{lines.diagonals.diag1}</strong>
          </div>
          <div className={styles.lineItem}>
            <span>Fiziksel (3-5-7):</span>
            <strong>{lines.diagonals.diag2}</strong>
          </div>
        </div>
      </div>
    </div>
  );
}

// Matrix Cell
function MatrixCell({ pos, count, selected, onClick, isCenter }) {
  const meaning = getPositionMeaning(pos);
  const strength = getStrengthLevel(count);

  return (
    <div 
      className={`${styles.cell} ${selected ? styles.selected : ''} ${isCenter ? styles.center : ''}`}
      onClick={() => onClick(pos)}
      style={{ borderColor: strength.color }}
    >
      <div className={styles.cellNumber}>{pos}</div>
      <div className={styles.cellDots}>
        {count > 0 ? '●'.repeat(Math.min(count, 5)) : '○'}
      </div>
      <div className={styles.cellCount} style={{ color: strength.color }}>
        {count}
      </div>
      <div className={styles.cellTitle}>{meaning.title}</div>
    </div>
  );
}