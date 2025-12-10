import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ChevronRight, Shield, Bug, AlertTriangle, Download, Trash2 } from 'lucide-react';

function CyberMission3() {
  const [step, setStep] = useState('story');
  const [dialogIndex, setDialogIndex] = useState(0);
  const [virusScene, setVirusScene] = useState(0);
  const [selectedFile, setSelectedFile] = useState(null);
  const [score, setScore] = useState(0);

  const storyDialogs = [
    {
      speaker: 'Система Безопасности',
      text: '🦠 ТРЕВОГА! Обнаружено вредоносное ПО в системе!',
      color: '#ff0055',
      isSystem: true
    },
    {
      speaker: 'Кибериа',
      text: 'Агент, вирусы атакуют наши защитные системы! Они крадут данные, шпионят за пользователями, шифруют файлы...',
      avatar: '/uploads/photo_2025-11-18_23-04-15.jpg',
      color: '#00ff41'
    },
    {
      speaker: 'Агент',
      text: 'Вирусы в компьютере? Как обычные болезни?',
      color: '#FFF'
    },
    {
      speaker: 'Кибериа',
      text: 'Да! Компьютерные вирусы "заражают" устройства. ВИРУС размножается сам, ТРОЯН притворяется полезной программой, ЧЕРВЬ распространяется по сети!',
      avatar: '/uploads/photo_2025-11-18_23-04-15.jpg',
      color: '#00ff41'
    },
    {
      speaker: 'Агент',
      text: 'Как они попадают в компьютер?',
      color: '#FFF'
    },
    {
      speaker: 'Кибериа',
      text: 'Через скачивание файлов, переходы по ссылкам, USB-флешки, взломанные программы... Но я научу тебя ЗАЩИЩАТЬСЯ!',
      avatar: '/uploads/photo_2025-11-18_23-04-15.jpg',
      color: '#00ff41'
    }
  ];

  const files = [
    {
      id: 1,
      name: 'Бесплатная_игра.exe',
      size: '45 MB',
      source: 'Неизвестный сайт',
      isMalware: true,
      type: 'Троян',
      danger: [
        '❌ Расширение .exe (программа)',
        '❌ Слишком хорошо чтобы быть правдой',
        '❌ Неизвестный источник',
        '❌ Подозрительное название'
      ]
    },
    {
      id: 2,
      name: 'документ.pdf',
      size: '2 MB',
      source: 'Email от коллеги',
      isMalware: false,
      type: 'Безопасный',
      safe: [
        '✅ Расширение .pdf (документ)',
        '✅ Нормальный размер',
        '✅ Известный отправитель',
        '✅ Ожидаемый файл'
      ]
    },
    {
      id: 3,
      name: 'Обновление_Windows.bat',
      size: '12 KB',
      source: 'Ссылка из SMS',
      isMalware: true,
      type: 'Вирус',
      danger: [
        '❌ Расширение .bat (скрипт)',
        '❌ Windows НЕ обновляется через SMS',
        '❌ Подозрительный источник',
        '❌ Маленький размер для "обновления"'
      ]
    }
  ];

  const handleFileAnalysis = (file, decision) => {
    const isCorrect = (decision === 'delete' && file.isMalware) || (decision === 'keep' && !file.isMalware);
    
    if (isCorrect) setScore(score + 1);
    
    setSelectedFile({ ...file, decision, isCorrect });
    
    setTimeout(() => {
      if (virusScene < files.length - 1) {
        setVirusScene(virusScene + 1);
        setSelectedFile(null);
      } else {
        setStep('conclusion');
      }
    }, 4000);
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #0a0e27 0%, #1a1f3a 50%, #0f1729 100%)',
      position: 'relative'
    }}>
      <motion.button
        onClick={() => window.history.back()}
        style={{
          position: 'fixed',
          top: '2rem',
          left: '2rem',
          zIndex: 100,
          background: 'rgba(26, 31, 58, 0.9)',
          border: '2px solid #00ff41',
          borderRadius: '1rem',
          padding: '0.75rem 1.5rem',
          color: '#00ff41',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          fontFamily: 'monospace',
          fontWeight: 700
        }}
      >
        <ArrowLeft size={20} />
        НАЗАД
      </motion.button>

      <div style={{ padding: '7rem 2rem 2rem', maxWidth: '1000px', margin: '0 auto' }}>
        <AnimatePresence mode="wait">
          {step === 'story' && (
            <motion.div key="story">
              {/* Story implementation similar to Mission 1 */}
              <div style={{ textAlign: 'center' }}>
                <h2 style={{ fontSize: '2.5rem', color: '#00ff41', marginBottom: '2rem' }}>
                  🦠 ВИРУСЫ И ЗАЩИТА
                </h2>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  onClick={() => setStep('virusScanner')}
                  style={{
                    background: 'linear-gradient(135deg, #00ff41, #00d9ff)',
                    border: 'none',
                    borderRadius: '1rem',
                    padding: '1rem 2.5rem',
                    fontSize: '1.25rem',
                    fontWeight: 900,
                    color: '#000',
                    cursor: 'pointer'
                  }}
                >
                  НАЧАТЬ СКАНИРОВАНИЕ
                </motion.button>
              </div>
            </motion.div>
          )}

          {step === 'virusScanner' && (
            <motion.div
              key="virusScanner"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <h2 style={{
                fontSize: '2.5rem',
                color: '#00ff41',
                textAlign: 'center',
                marginBottom: '2rem',
                fontFamily: 'monospace'
              }}>
                🔍 СКАНЕР ФАЙЛОВ
              </h2>

              <div style={{
                background: 'rgba(26, 31, 58, 0.9)',
                borderRadius: '1.5rem',
                border: '3px solid #00ff41',
                padding: '2rem',
                maxWidth: '700px',
                margin: '0 auto'
              }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '1.5rem',
                  marginBottom: '2rem',
                  padding: '1.5rem',
                  background: 'rgba(0, 0, 0, 0.3)',
                  borderRadius: '1rem'
                }}>
                  <div style={{ fontSize: '4rem' }}>
                    {files[virusScene].isMalware ? '🦠' : '📄'}
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: '1.5rem', fontWeight: 700, color: '#FFF', marginBottom: '0.5rem' }}>
                      {files[virusScene].name}
                    </div>
                    <div style={{ fontSize: '1rem', color: '#9ca3af', marginBottom: '0.25rem' }}>
                      Размер: {files[virusScene].size}
                    </div>
                    <div style={{ fontSize: '1rem', color: '#9ca3af' }}>
                      Источник: {files[virusScene].source}
                    </div>
                  </div>
                </div>

                {!selectedFile ? (
                  <div>
                    <div style={{
                      fontSize: '1.25rem',
                      fontWeight: 700,
                      color: '#00ff41',
                      textAlign: 'center',
                      marginBottom: '1.5rem'
                    }}>
                      ЭТОТ ФАЙЛ БЕЗОПАСЕН?
                    </div>
                    <div style={{ display: 'flex', gap: '1rem' }}>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        onClick={() => handleFileAnalysis(files[virusScene], 'delete')}
                        style={{
                          flex: 1,
                          background: 'linear-gradient(135deg, #ff0055, #ff3366)',
                          border: 'none',
                          borderRadius: '1rem',
                          padding: '1.5rem',
                          fontSize: '1.25rem',
                          fontWeight: 900,
                          color: '#FFF',
                          cursor: 'pointer',
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: 'center',
                          gap: '0.5rem'
                        }}
                      >
                        <Trash2 size={32} />
                        УДАЛИТЬ
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        onClick={() => handleFileAnalysis(files[virusScene], 'keep')}
                        style={{
                          flex: 1,
                          background: 'linear-gradient(135deg, #00ff41, #00d9ff)',
                          border: 'none',
                          borderRadius: '1rem',
                          padding: '1.5rem',
                          fontSize: '1.25rem',
                          fontWeight: 900,
                          color: '#000',
                          cursor: 'pointer',
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: 'center',
                          gap: '0.5rem'
                        }}
                      >
                        <Shield size={32} />
                        БЕЗОПАСНО
                      </motion.button>
                    </div>
                  </div>
                ) : (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    style={{
                      background: selectedFile.isCorrect ? 'rgba(0, 255, 65, 0.2)' : 'rgba(255, 0, 85, 0.2)',
                      border: `3px solid ${selectedFile.isCorrect ? '#00ff41' : '#ff0055'}`,
                      borderRadius: '1rem',
                      padding: '2rem'
                    }}
                  >
                    <div style={{ fontSize: '4rem', textAlign: 'center', marginBottom: '1rem' }}>
                      {selectedFile.isCorrect ? '✅' : '❌'}
                    </div>
                    <div style={{
                      fontSize: '2rem',
                      fontWeight: 900,
                      color: selectedFile.isCorrect ? '#00ff41' : '#ff0055',
                      textAlign: 'center',
                      marginBottom: '1.5rem'
                    }}>
                      {selectedFile.isCorrect ? 'ПРАВИЛЬНО!' : 'ОШИБКА!'}
                    </div>
                    <div style={{ fontSize: '1.125rem', color: '#FFF', lineHeight: 1.8 }}>
                      {selectedFile.isMalware ? (
                        <div>
                          <div style={{ fontWeight: 700, marginBottom: '1rem', color: '#ff0055' }}>
                            🦠 Признаки вредоносного ПО:
                          </div>
                          {selectedFile.danger.map((d, i) => (
                            <div key={i} style={{ marginBottom: '0.5rem' }}>{d}</div>
                          ))}
                        </div>
                      ) : (
                        <div>
                          <div style={{ fontWeight: 700, marginBottom: '1rem', color: '#00ff41' }}>
                            ✅ Признаки безопасности:
                          </div>
                          {selectedFile.safe.map((s, i) => (
                            <div key={i} style={{ marginBottom: '0.5rem' }}>{s}</div>
                          ))}
                        </div>
                      )}
                    </div>
                  </motion.div>
                )}
              </div>
            </motion.div>
          )}

          {step === 'conclusion' && (
            <motion.div
              key="conclusion"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              style={{ textAlign: 'center' }}
            >
              <div style={{ fontSize: '6rem', marginBottom: '2rem' }}>🎉</div>
              <h2 style={{ fontSize: '3rem', color: '#00ff41', marginBottom: '1rem' }}>
                МИССИЯ ЗАВЕРШЕНА!
              </h2>
              <div style={{ fontSize: '1.5rem', color: '#FFF', marginBottom: '2rem' }}>
                Правильных ответов: {score} / {files.length}
              </div>
              <div style={{
                background: 'rgba(26, 31, 58, 0.9)',
                borderRadius: '1.5rem',
                border: '3px solid #00ff41',
                padding: '2rem',
                maxWidth: '600px',
                margin: '0 auto 2rem',
                textAlign: 'left'
              }}>
                <h3 style={{ color: '#00ff41', fontSize: '1.5rem', marginBottom: '1rem' }}>
                  🛡️ Правила защиты:
                </h3>
                <div style={{ fontSize: '1.125rem', color: '#FFF', lineHeight: 2 }}>
                  <div>✅ Установи антивирус</div>
                  <div>✅ Обновляй систему</div>
                  <div>✅ Не скачивай с подозрительных сайтов</div>
                  <div>✅ Проверяй USB-флешки</div>
                  <div>✅ Делай резервные копии</div>
                </div>
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                onClick={() => window.history.back()}
                style={{
                  background: 'linear-gradient(135deg, #00ff41, #00d9ff)',
                  border: 'none',
                  borderRadius: '1rem',
                  padding: '1rem 2.5rem',
                  fontSize: '1.25rem',
                  fontWeight: 900,
                  color: '#000',
                  cursor: 'pointer'
                }}
              >
                ВЕРНУТЬСЯ К ПЛАНЕТЕ
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

export default CyberMission3;