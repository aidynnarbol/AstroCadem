// src/pages/AdsPlanet.jsx
// СТРАНИЦА ПЛАНЕТЫ РЕКЛАМЫ

import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Shield, AlertTriangle } from 'lucide-react';
import PlanetApproachAnimation from '../components/PlanetApproachAnimation';
import AdsPlanetIntro from '../components/planets/ads/AdsPlanetIntro';
import AdsPlanetBackground from '../components/planets/ads/AdsPlanetBackground';
import { 
  AdsPlanetProgress, 
  AdsMissionCard 
} from '../components/planets/ads/AdsUI';
import { adsStoryArc } from '../data/adsStoryArc';
import { useUser } from '../contexts/UserContext';

function AdsPlanet() {
  const navigate = useNavigate();
  const { user } = useUser();
  
  const [showApproach, setShowApproach] = useState(true);
  const [showIntro, setShowIntro] = useState(false);
  const [showContent, setShowContent] = useState(false);
  
  const hasVisited = localStorage.getItem('ads_planet_visited') === 'true';
  
  useEffect(() => {
    if (!showApproach) {
      if (!hasVisited) {
        setShowIntro(true);
      } else {
        setShowContent(true);
      }
    }
  }, [showApproach, hasVisited]);
  
  const completedMissions = user?.completedMissions?.filter(
    id => id.startsWith('ads-')
  ) || [];
  
  const completedCount = completedMissions.length;

  const handleIntroComplete = () => {
    localStorage.setItem('ads_planet_visited', 'true');
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
      
      {/* АНИМАЦИЯ ПОДЛЁТА */}
      {showApproach && (
        <PlanetApproachAnimation
          planetName="Город Иллюзий"
          planetEmoji="🎭"
          planetColor="#EC4899"
          onComplete={() => setShowApproach(false)}
        />
      )}

      {/* ВСТУПИТЕЛЬНАЯ СЦЕНА */}
      {showIntro && (
        <AdsPlanetIntro onComplete={handleIntroComplete} />
      )}

      {/* ОСНОВНОЙ КОНТЕНТ ПЛАНЕТЫ */}
      {showContent && (
        <>
          <AdsPlanetBackground missionProgress={completedCount} />
          
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
              
              {/* ХЕДЕР */}
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
                    background: 'rgba(26, 0, 48, 0.7)',
                    backdropFilter: 'blur(15px)',
                    border: '2px solid #EC4899',
                    color: '#EC4899',
                    padding: '0.75rem 1.5rem',
                    borderRadius: '1rem',
                    fontWeight: 700,
                    cursor: 'pointer',
                    fontSize: '1rem',
                    transition: 'all 0.3s',
                    boxShadow: '0 4px 20px rgba(236, 72, 153, 0.4)',
                    fontFamily: 'monospace'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = 'rgba(26, 0, 48, 0.9)';
                    e.currentTarget.style.transform = 'translateX(-5px)';
                    e.currentTarget.style.boxShadow = '0 6px 30px rgba(236, 72, 153, 0.6)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'rgba(26, 0, 48, 0.7)';
                    e.currentTarget.style.transform = 'translateX(0)';
                    e.currentTarget.style.boxShadow = '0 4px 20px rgba(236, 72, 153, 0.4)';
                  }}
                >
                  <ArrowLeft size={20} />
                  ВЕРНУТЬСЯ К КАРТЕ
                </button>
              </motion.div>

              {/* ЗАГОЛОВОК ПЛАНЕТЫ */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                style={{
                  textAlign: 'center',
                  marginBottom: '3rem'
                }}
              >
                <motion.div
                  animate={{
                    rotate: [0, 5, -5, 0],
                    scale: [1, 1.05, 1]
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: 'easeInOut'
                  }}
                  style={{
                    fontSize: '5rem',
                    marginBottom: '1rem',
                    filter: 'drop-shadow(0 0 30px rgba(236, 72, 153, 0.8))'
                  }}
                >
                  🌃
                </motion.div>
              </motion.div>

              {/* ПРОГРЕСС ПЛАНЕТЫ */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                style={{ marginBottom: '3rem' }}
              >
                <AdsPlanetProgress 
                  currentMission={completedCount + 1} 
                  totalMissions={4} 
                />
              </motion.div>

              {/* СПИСОК МИССИЙ */}
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
                {adsStoryArc.missions.map((mission, index) => {
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
                      <AdsMissionCard
                        mission={mission}
                        isLocked={isLocked}
                        isCompleted={isCompleted}
                        onClick={() => handleMissionClick(mission.id, isLocked)}
                        distanceToCity={mission.distanceToCity}
                      />
                    </motion.div>
                  );
                })}
              </motion.div>

              {/* ИНФОРМАЦИЯ О ПЛАНЕТЕ */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1.2 }}
                style={{
                  background: 'linear-gradient(135deg, rgba(26, 0, 48, 0.6), rgba(15, 0, 26, 0.4))',
                  backdropFilter: 'blur(20px)',
                  border: '2px solid rgba(236, 72, 153, 0.4)',
                  borderRadius: '1.5rem',
                  padding: '2rem',
                  marginBottom: '2rem',
                  position: 'relative',
                  overflow: 'hidden'
                }}
              >
                {/* Сканирующая линия */}
                <motion.div
                  animate={{ x: ['-100%', '200%'] }}
                  transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '50%',
                    height: '100%',
                    background: 'linear-gradient(90deg, transparent, rgba(236, 72, 153, 0.2), transparent)',
                    pointerEvents: 'none'
                  }}
                />

                <h2 style={{
                  fontSize: '1.75rem',
                  fontWeight: 900,
                  color: '#EC4899',
                  marginBottom: '1rem',
                  textAlign: 'center',
                  textShadow: '0 0 20px rgba(236, 72, 153, 0.6)',
                  fontFamily: 'monospace',
                  textTransform: 'uppercase'
                }}>
                  ⚠️ О ПЛАНЕТЕ
                </h2>

                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                  gap: '1.5rem',
                  color: '#FFF'
                }}>
                  <div style={{
                    padding: '1.5rem',
                    background: 'rgba(0, 0, 0, 0.3)',
                    borderRadius: '1rem',
                    border: '1px solid rgba(236, 72, 153, 0.3)'
                  }}>
                    <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>🌃</div>
                    <h3 style={{ 
                      fontSize: '1.125rem', 
                      fontWeight: 800, 
                      color: '#EC4899',
                      marginBottom: '0.5rem',
                      fontFamily: 'monospace'
                    }}>
                      КИБЕРПАНК ГОРОД
                    </h3>
                    <p style={{ fontSize: '0.9375rem', color: '#F9A8D4', lineHeight: 1.6 }}>
                      Неоновые огни и голографическая реклама повсюду
                    </p>
                  </div>

                  <div style={{
                    padding: '1.5rem',
                    background: 'rgba(0, 0, 0, 0.3)',
                    borderRadius: '1rem',
                    border: '1px solid rgba(0, 255, 255, 0.3)'
                  }}>
                    <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>🎭</div>
                    <h3 style={{ 
                      fontSize: '1.125rem', 
                      fontWeight: 800, 
                      color: '#00FFFF',
                      marginBottom: '0.5rem',
                      fontFamily: 'monospace'
                    }}>
                      ГОРОД ИЛЛЮЗИЙ
                    </h3>
                    <p style={{ fontSize: '0.9375rem', color: '#67E8F9', lineHeight: 1.6 }}>
                      Здесь обман и манипуляции стали искусством
                    </p>
                  </div>

                  <div style={{
                    padding: '1.5rem',
                    background: 'rgba(0, 0, 0, 0.3)',
                    borderRadius: '1rem',
                    border: '1px solid rgba(168, 85, 247, 0.3)'
                  }}>
                    <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>🛡️</div>
                    <h3 style={{ 
                      fontSize: '1.125rem', 
                      fontWeight: 800, 
                      color: '#A855F7',
                      marginBottom: '0.5rem',
                      fontFamily: 'monospace'
                    }}>
                      КРИТИЧЕСКОЕ МЫШЛЕНИЕ
                    </h3>
                    <p style={{ fontSize: '0.9375rem', color: '#C4B5FD', lineHeight: 1.6 }}>
                      Научись видеть правду сквозь манипуляции
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* ЦИТАТА НАВИГАТОРА */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 1.4 }}
                style={{
                  background: 'linear-gradient(135deg, rgba(236, 72, 153, 0.2), rgba(219, 39, 119, 0.1))',
                  backdropFilter: 'blur(10px)',
                  border: '3px solid rgba(236, 72, 153, 0.5)',
                  borderLeft: '8px solid #EC4899',
                  borderRadius: '1rem',
                  padding: '2rem',
                  textAlign: 'center',
                  position: 'relative',
                  overflow: 'hidden'
                }}
              >
                {/* Глитч эффект */}
                <motion.div
                  animate={{
                    opacity: [0, 0.1, 0],
                    x: [-5, 5, -5]
                  }}
                  transition={{
                    duration: 0.2,
                    repeat: Infinity,
                    repeatDelay: 4
                  }}
                  style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'rgba(0, 255, 255, 0.3)',
                    mixBlendMode: 'color-dodge',
                    pointerEvents: 'none'
                  }}
                />

                <motion.div
                  animate={{
                    rotate: [0, 5, -5, 0],
                    scale: [1, 1.1, 1]
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity
                  }}
                  style={{
                    fontSize: '4rem',
                    marginBottom: '1rem',
                    filter: 'drop-shadow(0 0 20px rgba(236, 72, 153, 0.8))'
                  }}
                >
                  🎭
                </motion.div>

                <p style={{
                  fontSize: '1.5rem',
                  fontStyle: 'italic',
                  color: '#EC4899',
                  fontWeight: 700,
                  marginBottom: '1rem',
                  lineHeight: 1.6,
                  textShadow: '0 0 20px rgba(236, 72, 153, 0.4)',
                  fontFamily: 'monospace'
                }}>
                  "НЕ ВЕРЬ КРАСИВЫМ ОБЕЩАНИЯМ - ПРОВЕРЯЙ ФАКТЫ!"
                </p>
                
                <p style={{
                  fontSize: '1.125rem',
                  color: '#F9A8D4',
                  fontWeight: 600,
                  fontFamily: 'monospace'
                }}>
                  — НАВИГАТОР ПРАЙС
                </p>
              </motion.div>

            </div>
          </div>

          {/* Цифровые частицы */}
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={`particle-${i}`}
              style={{
                position: 'fixed',
                width: '3px',
                height: '3px',
                borderRadius: '50%',
                background: i % 2 === 0 ? '#EC4899' : '#00FFFF',
                boxShadow: `0 0 10px ${i % 2 === 0 ? '#EC4899' : '#00FFFF'}`,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                zIndex: 5,
                pointerEvents: 'none'
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

export default AdsPlanet;