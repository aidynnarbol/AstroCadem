// src/pages/CyberPlanet.jsx
// СТРАНИЦА ПЛАНЕТЫ КИБЕРБЕЗОПАСНОСТИ

import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Shield, AlertTriangle } from 'lucide-react';
import CyberPlanetBackground from '../components/planets/cyber/CyberPlanetBackground';
import CyberPlanetIntro from '../components/planets/cyber/CyberPlanetIntro';
import PlanetApproachAnimation from '../components/PlanetApproachAnimation';
import { 
  CyberPlanetProgress, 
  CyberMissionCard 
} from '../components/planets/cyber/CyberUI';
import { cyberStoryArc } from '../data/cyberStoryArc';
import { useUser } from '../contexts/UserContext';

function CyberPlanet() {
  const navigate = useNavigate();
  const { user } = useUser();
  
  // Состояния для анимаций
  const [showApproach, setShowApproach] = useState(true);
  const [showIntro, setShowIntro] = useState(false);
  const [showContent, setShowContent] = useState(false);
  
  // Проверка первого визита на планету
  const hasVisited = localStorage.getItem('cyber_planet_visited') === 'true';
  
  useEffect(() => {
    // Если анимация подлёта завершена
    if (!showApproach) {
      if (!hasVisited) {
        // Первый визит - показываем intro
        setShowIntro(true);
      } else {
        // Уже были - сразу показываем контент
        setShowContent(true);
      }
    }
  }, [showApproach, hasVisited]);
  
  // Подсчет завершенных миссий планеты
  const completedMissions = user?.completedMissions?.filter(
    id => id.startsWith('cyber-')
  ) || [];
  
  const completedCount = completedMissions.length;

  const handleIntroComplete = () => {
    // Отмечаем что посетили планету
    localStorage.setItem('cyber_planet_visited', 'true');
    setShowIntro(false);
    setShowContent(true);
  };

  const handleMissionClick = (missionId, isLocked) => {
    if (!isLocked) {
      navigate(`/mission/${missionId}`);
    }
  };

  return (
    <div style={{ 
      minHeight: '100vh', 
      position: 'relative',
      overflow: 'hidden'
    }}>
      
      {/* ========== 1. АНИМАЦИЯ ПОДЛЁТА ========== */}
      {showApproach && (
        <PlanetApproachAnimation
          planetName="Планета Кибербезопасности"
          planetEmoji="🛡️"
          planetColor="#00ff41"
          onComplete={() => setShowApproach(false)}
        />
      )}

      {/* ========== 2. ВСТУПИТЕЛЬНАЯ СЦЕНА ========== */}
      {showIntro && (
        <CyberPlanetIntro onComplete={handleIntroComplete} />
      )}

      {/* ========== 3. ОСНОВНОЙ КОНТЕНТ ПЛАНЕТЫ ========== */}
      {showContent && (
        <>
          {/* ФОН КИБЕРПЛАНЕТЫ */}
          <CyberPlanetBackground missionProgress={completedCount} />
          
          {/* КОНТЕНТ ПОВЕРХ ФОНА */}
          <div style={{ 
            position: 'relative', 
            zIndex: 10, 
            minHeight: '100vh',
            padding: '2rem'
          }}>
            <div style={{
              maxWidth: '1400px',
              margin: '0 auto'
            }}>
              
              {/* ========== ХЕДЕР ========== */}
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                style={{ marginBottom: '2rem' }}
              >
                <button 
                  onClick={() => navigate('/mission-map')}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    background: 'rgba(26, 31, 58, 0.8)',
                    backdropFilter: 'blur(10px)',
                    border: '2px solid #00ff41',
                    color: '#00ff41',
                    padding: '0.75rem 1.5rem',
                    borderRadius: '1rem',
                    fontWeight: 700,
                    cursor: 'pointer',
                    fontSize: '1rem',
                    transition: 'all 0.3s',
                    boxShadow: '0 4px 20px rgba(0, 255, 65, 0.3)',
                    fontFamily: 'monospace'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = 'rgba(26, 31, 58, 0.95)';
                    e.currentTarget.style.transform = 'translateX(-5px)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'rgba(26, 31, 58, 0.8)';
                    e.currentTarget.style.transform = 'translateX(0)';
                  }}
                >
                  <ArrowLeft size={20} />
                  ВЕРНУТЬСЯ К КАРТЕ ВСЕЛЕННОЙ
                </button>
              </motion.div>

              {/* ========== ЗАГОЛОВОК ПЛАНЕТЫ ========== */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                style={{
                  textAlign: 'center',
                  marginBottom: '3rem'
                }}
              >
                {/* Эмодзи планеты */}
                <motion.div
                  animate={{
                    rotate: [0, 10, -10, 0],
                    scale: [1, 1.1, 1]
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: 'easeInOut'
                  }}
                  style={{
                    fontSize: '5rem',
                    marginBottom: '1rem',
                    filter: 'drop-shadow(0 0 30px rgba(0, 255, 65, 0.6))'
                  }}
                >
                  🛡️
                </motion.div>
              </motion.div>

              {/* ========== ПРОГРЕСС ПЛАНЕТЫ ========== */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                style={{ marginBottom: '3rem' }}
              >
                <CyberPlanetProgress 
                  currentMission={completedCount + 1} 
                  totalMissions={5} 
                />
              </motion.div>

              {/* ========== СПИСОК МИССИЙ ========== */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
                  gap: '2rem',
                  marginBottom: '4rem'
                }}
              >
                {cyberStoryArc.missions.map((mission, index) => {
                  const isLocked = index > completedCount;
                  const isCompleted = completedMissions.includes(mission.id);

                  return (
                    <motion.div
                      key={mission.id}
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ 
                        duration: 0.5, 
                        delay: 0.7 + (index * 0.1) 
                      }}
                    >
                      <CyberMissionCard
                        mission={mission}
                        isLocked={isLocked}
                        isCompleted={isCompleted}
                        onClick={() => handleMissionClick(mission.id, isLocked)}
                        securityLevel={mission.securityLevel}
                      />
                    </motion.div>
                  );
                })}
              </motion.div>

              {/* ========== ИНФОРМАЦИЯ О ПЛАНЕТЕ ========== */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1.2 }}
                style={{
                  background: 'linear-gradient(135deg, rgba(26, 31, 58, 0.8), rgba(10, 14, 39, 0.9))',
                  backdropFilter: 'blur(20px)',
                  border: '2px solid rgba(0, 255, 65, 0.3)',
                  borderRadius: '1.5rem',
                  padding: '2rem',
                  marginBottom: '2rem'
                }}
              >
                <h2 style={{
                  fontSize: '1.75rem',
                  fontWeight: 900,
                  color: '#00ff41',
                  marginBottom: '1rem',
                  textAlign: 'center',
                  fontFamily: 'monospace'
                }}>
                  📖 О ПЛАНЕТЕ
                </h2>

                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                  gap: '1.5rem',
                  color: '#FFF'
                }}>
                  <div>
                    <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>🔐</div>
                    <h3 style={{ 
                      fontSize: '1.125rem', 
                      fontWeight: 800, 
                      color: '#00ff41',
                      marginBottom: '0.5rem',
                      fontFamily: 'monospace'
                    }}>
                      ЦИФРОВАЯ КРЕПОСТЬ
                    </h3>
                    <p style={{ fontSize: '0.9375rem', color: '#00d9ff', lineHeight: 1.6 }}>
                      Защищённый мир данных и информации
                    </p>
                  </div>

                  <div>
                    <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>🤖</div>
                    <h3 style={{ 
                      fontSize: '1.125rem', 
                      fontWeight: 800, 
                      color: '#00ff41',
                      marginBottom: '0.5rem',
                      fontFamily: 'monospace'
                    }}>
                      ИИ КИБЕРИА
                    </h3>
                    <p style={{ fontSize: '0.9375rem', color: '#00d9ff', lineHeight: 1.6 }}>
                      Искусственный интеллект-защитник
                    </p>
                  </div>

                  <div>
                    <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>🛡️</div>
                    <h3 style={{ 
                      fontSize: '1.125rem', 
                      fontWeight: 800, 
                      color: '#00ff41',
                      marginBottom: '0.5rem',
                      fontFamily: 'monospace'
                    }}>
                      КИБЕРБЕЗОПАСНОСТЬ
                    </h3>
                    <p style={{ fontSize: '0.9375rem', color: '#00d9ff', lineHeight: 1.6 }}>
                      Изучи защиту в цифровом мире
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* ========== ЦИТАТА КИБЕРИИ ========== */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 1.4 }}
                style={{
                  background: 'linear-gradient(135deg, rgba(0, 255, 65, 0.15), rgba(0, 217, 255, 0.1))',
                  backdropFilter: 'blur(10px)',
                  border: '3px solid rgba(0, 255, 65, 0.4)',
                  borderLeft: '8px solid #00ff41',
                  borderRadius: '1rem',
                  padding: '2rem',
                  textAlign: 'center',
                  position: 'relative',
                  overflow: 'hidden'
                }}
              >
                {/* Декоративные щиты */}
                <div style={{
                  position: 'absolute',
                  top: '-20px',
                  left: '20px',
                  fontSize: '3rem',
                  opacity: 0.2
                }}>🔒</div>
                <div style={{
                  position: 'absolute',
                  bottom: '-20px',
                  right: '20px',
                  fontSize: '3rem',
                  opacity: 0.2
                }}>🔒</div>

                <motion.div
                  animate={{
                    rotate: [0, 5, -5, 0]
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity
                  }}
                  style={{
                    fontSize: '4rem',
                    marginBottom: '1rem'
                  }}
                >
                  🤖
                </motion.div>

                <p style={{
                  fontSize: '1.5rem',
                  fontStyle: 'italic',
                  color: '#00ff41',
                  fontWeight: 700,
                  marginBottom: '1rem',
                  lineHeight: 1.6,
                  fontFamily: 'monospace'
                }}>
                  "В КИБЕРБЕЗОПАСНОСТИ НЕТ МЕЛОЧЕЙ. ОДИН СЛАБЫЙ ПАРОЛЬ - И ВСЯ ЗАЩИТА РУШИТСЯ!"
                </p>
                
                <p style={{
                  fontSize: '1.125rem',
                  color: '#00d9ff',
                  fontWeight: 600,
                  fontFamily: 'monospace'
                }}>
                  — КИБЕРИА, ИИ-ЗАЩИТНИК
                </p>
              </motion.div>

            </div>
          </div>

          {/* Тонкие плавающие частицы */}
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={`particle-${i}`}
              style={{
                position: 'fixed',
                width: '3px',
                height: '3px',
                borderRadius: '50%',
                background: i % 2 === 0 ? '#00ff41' : '#00d9ff',
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                zIndex: 5,
                pointerEvents: 'none',
                boxShadow: `0 0 10px currentColor`
              }}
              animate={{
                y: [0, -30, 0],
                opacity: [0.1, 0.5, 0.1],
                scale: [0.8, 1.2, 0.8]
              }}
              transition={{
                duration: Math.random() * 8 + 6,
                repeat: Infinity,
                delay: i * 1.5
              }}
            />
          ))}
        </>
      )}
    </div>
  );
}

export default CyberPlanet;