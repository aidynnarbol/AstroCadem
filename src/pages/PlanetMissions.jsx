import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Star, Zap, Lock, Clock, TrendingUp } from 'lucide-react';
import CosmicBackgroundAdvanced from '../components/CosmicBackgroundAdvanced';
import { getPlanetById } from '../data/missionsData';

function PlanetMissions() {
  const { planetId } = useParams();
  const navigate = useNavigate();
  const [planet, setPlanet] = useState(null);

  useEffect(() => {
    const foundPlanet = getPlanetById(planetId);
    
    if (!foundPlanet) {
      alert('Планета не найдена!');
      navigate('/mission-map');
      return;
    }
    
    setPlanet(foundPlanet);
  }, [planetId, navigate]);

  // Если планета ещё загружается
  if (!planet) {
    return (
      <div style={{ 
        minHeight: '100vh', 
        background: '#000', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center' 
      }}>
        <div style={{ 
          color: 'white', 
          fontSize: '2rem',
          textAlign: 'center'
        }}>
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            style={{ display: 'inline-block', marginBottom: '1rem' }}
          >
            🚀
          </motion.div>
          <div>Загрузка планеты...</div>
        </div>
      </div>
    );
  }

  // Цвета сложности
  const difficultyColors = {
    easy: 'from-green-400 to-emerald-500',
    medium: 'from-yellow-400 to-orange-500',
    hard: 'from-red-400 to-rose-500'
  };

  const difficultyLabels = {
    easy: 'Лёгкая',
    medium: 'Средняя',
    hard: 'Сложная'
  };

  return (
    <div style={{ 
      position: 'relative', 
      minHeight: '100vh', 
      background: '#000', 
      overflow: 'hidden' 
    }}>
      <CosmicBackgroundAdvanced />

      <div style={{ 
        position: 'relative', 
        zIndex: 20, 
        minHeight: '100vh', 
        padding: '2rem' 
      }}>
        
        {/* Кнопка назад */}
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          whileHover={{ scale: 1.05, x: -5 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate('/mission-map')}
          style={{
            position: 'fixed',
            top: '2rem',
            left: '2rem',
            background: 'rgba(15, 23, 42, 0.95)',
            backdropFilter: 'blur(20px)',
            color: 'white',
            padding: '0.875rem 1.75rem',
            borderRadius: '9999px',
            fontWeight: 700,
            border: '2px solid rgba(255, 255, 255, 0.2)',
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem',
            boxShadow: '0 10px 40px rgba(0, 0, 0, 0.8)',
            cursor: 'pointer',
            zIndex: 100,
            fontSize: '1rem'
          }}
        >
          <ArrowLeft style={{ width: '1.25rem', height: '1.25rem' }} />
          <span>Назад к карте</span>
        </motion.button>

        {/* Заголовок планеты */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          style={{
            textAlign: 'center',
            marginTop: '5rem',
            marginBottom: '3rem'
          }}
        >
          {/* Иконка планеты */}
          <motion.div
            animate={{
              scale: [1, 1.1, 1],
              rotate: [0, 5, -5, 0]
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            style={{ 
              fontSize: '5rem', 
              marginBottom: '1.5rem',
              filter: 'drop-shadow(0 0 40px ' + planet.color + '80)'
            }}
          >
            {planet.emoji}
          </motion.div>

          {/* Название */}
          <h1 style={{
            fontSize: 'clamp(2.5rem, 6vw, 4.5rem)',
            fontWeight: 900,
            background: `linear-gradient(135deg, ${planet.color} 0%, ${planet.color}dd 50%, ${planet.color} 100%)`,
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            marginBottom: '1rem',
            textShadow: `0 0 60px ${planet.color}40`
          }}>
            {planet.name}
          </h1>

          {/* Описание */}
          <p style={{ 
            fontSize: '1.25rem', 
            color: '#d1d5db',
            maxWidth: '800px',
            margin: '0 auto 2rem',
            lineHeight: 1.6
          }}>
            {planet.description}
          </p>

          {/* Статистика планеты */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4 }}
            style={{
              display: 'inline-flex',
              gap: '2rem',
              background: 'rgba(15, 23, 42, 0.8)',
              backdropFilter: 'blur(20px)',
              padding: '1.5rem 3rem',
              borderRadius: '1.5rem',
              border: '2px solid rgba(255, 255, 255, 0.1)'
            }}
          >
            <div style={{ textAlign: 'center' }}>
              <div style={{ 
                fontSize: '2.5rem', 
                fontWeight: 900, 
                color: planet.color 
              }}>
                {planet.missions}
              </div>
              <div style={{ 
                fontSize: '0.875rem', 
                color: '#9ca3af',
                fontWeight: 600 
              }}>
                миссий
              </div>
            </div>
            <div style={{ 
              width: '2px', 
              background: 'rgba(255, 255, 255, 0.1)' 
            }} />
            <div style={{ textAlign: 'center' }}>
              <div style={{ 
                fontSize: '2.5rem', 
                fontWeight: 900, 
                color: '#fbbf24' 
              }}>
                {planet.missionsList.reduce((sum, m) => sum + m.xpReward, 0)}
              </div>
              <div style={{ 
                fontSize: '0.875rem', 
                color: '#9ca3af',
                fontWeight: 600 
              }}>
                XP всего
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Список миссий */}
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '2rem',
          padding: '0 1rem'
        }}>
          {planet.missionsList.map((mission, index) => (
            <motion.div
              key={mission.id}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 + index * 0.1, type: 'spring' }}
              whileHover={{ scale: 1.05, y: -10 }}
              onClick={() => !mission.locked && navigate(`/mission/${mission.id}`)}
              style={{
                background: 'rgba(15, 23, 42, 0.85)',
                backdropFilter: 'blur(30px)',
                borderRadius: '1.75rem',
                padding: '2rem',
                border: `2px solid ${mission.locked ? 'rgba(75, 85, 99, 0.3)' : 'rgba(255, 255, 255, 0.15)'}`,
                boxShadow: mission.locked 
                  ? '0 20px 60px rgba(0, 0, 0, 0.7)' 
                  : `0 20px 60px ${planet.color}30`,
                cursor: mission.locked ? 'not-allowed' : 'pointer',
                position: 'relative',
                overflow: 'hidden',
                opacity: mission.locked ? 0.6 : 1
              }}
            >
              {/* Номер миссии */}
              <div style={{
                position: 'absolute',
                top: '1.25rem',
                right: '1.25rem',
                width: '3.5rem',
                height: '3.5rem',
                background: mission.locked 
                  ? 'linear-gradient(135deg, #6b7280, #4b5563)' 
                  : `linear-gradient(135deg, ${planet.color}, ${planet.color}dd)`,
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 900,
                fontSize: '1.5rem',
                color: mission.locked ? '#9ca3af' : 'white',
                boxShadow: mission.locked 
                  ? 'none' 
                  : `0 8px 20px ${planet.color}60`
              }}>
                {mission.locked ? <Lock style={{ width: '1.5rem' }} /> : index + 1}
              </div>

              {/* Персонаж */}
              <motion.div
                animate={mission.locked ? {} : {
                  rotate: [0, 10, -10, 0],
                  scale: [1, 1.1, 1]
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  delay: index * 0.3
                }}
                style={{
                  fontSize: '5rem',
                  textAlign: 'center',
                  marginBottom: '1.25rem',
                  filter: mission.locked 
                    ? 'grayscale(100%)' 
                    : `drop-shadow(0 8px 20px ${planet.color}40)`
                }}
              >
                {mission.character}
              </motion.div>

              {/* Название миссии */}
              <h3 style={{
                fontSize: '1.625rem',
                fontWeight: 900,
                color: 'white',
                textAlign: 'center',
                marginBottom: '0.5rem',
                lineHeight: 1.3
              }}>
                {mission.title}
              </h3>

              {/* Имя персонажа */}
              <p style={{
                fontSize: '1rem',
                color: mission.locked ? '#6b7280' : planet.color,
                textAlign: 'center',
                marginBottom: '1rem',
                fontWeight: 700
              }}>
                {mission.characterName}
              </p>

              {/* Описание */}
              <p style={{
                fontSize: '0.9375rem',
                color: '#9ca3af',
                textAlign: 'center',
                marginBottom: '1.5rem',
                lineHeight: 1.6,
                minHeight: '4rem'
              }}>
                {mission.description}
              </p>

              {/* Метрики */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '0.75rem',
                marginBottom: '1.5rem'
              }}>
                {/* Награда XP */}
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.5rem',
                  padding: '0.75rem',
                  background: 'rgba(251, 191, 36, 0.1)',
                  borderRadius: '0.875rem',
                  border: '1px solid rgba(251, 191, 36, 0.3)'
                }}>
                  <Zap style={{ 
                    width: '1.25rem', 
                    height: '1.25rem', 
                    color: '#fbbf24',
                    fill: '#fbbf24'
                  }} />
                  <span style={{ 
                    color: '#fbbf24', 
                    fontWeight: 800, 
                    fontSize: '1rem' 
                  }}>
                    +{mission.xpReward} XP
                  </span>
                </div>

                {/* Награда монет */}
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.5rem',
                  padding: '0.75rem',
                  background: 'rgba(52, 211, 153, 0.1)',
                  borderRadius: '0.875rem',
                  border: '1px solid rgba(52, 211, 153, 0.3)'
                }}>
                  <span style={{ fontSize: '1.25rem' }}>🪙</span>
                  <span style={{ 
                    color: '#34d399', 
                    fontWeight: 800, 
                    fontSize: '1rem' 
                  }}>
                    +{mission.coinsReward}
                  </span>
                </div>
              </div>

              {/* Дополнительная информация */}
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '1.5rem',
                gap: '0.75rem'
              }}>
                {/* Сложность */}
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  padding: '0.5rem 1rem',
                  background: `linear-gradient(135deg, ${difficultyColors[mission.difficulty].split(' ')[0].replace('from-', '')}20, transparent)`,
                  borderRadius: '0.75rem',
                  border: `1px solid ${difficultyColors[mission.difficulty].split(' ')[0].replace('from-', '')}40`
                }}>
                  <TrendingUp style={{ 
                    width: '1rem', 
                    height: '1rem',
                    color: difficultyColors[mission.difficulty].split(' ')[0].replace('from-', '').replace('-400', '-500')
                  }} />
                  <span style={{
                    fontSize: '0.875rem',
                    fontWeight: 700,
                    color: difficultyColors[mission.difficulty].split(' ')[0].replace('from-', '').replace('-400', '-200')
                  }}>
                    {difficultyLabels[mission.difficulty]}
                  </span>
                </div>

                {/* Длительность */}
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  padding: '0.5rem 1rem',
                  background: 'rgba(148, 163, 184, 0.1)',
                  borderRadius: '0.75rem',
                  border: '1px solid rgba(148, 163, 184, 0.3)'
                }}>
                  <Clock style={{ 
                    width: '1rem', 
                    height: '1rem',
                    color: '#94a3b8'
                  }} />
                  <span style={{
                    fontSize: '0.875rem',
                    fontWeight: 700,
                    color: '#cbd5e1'
                  }}>
                    {mission.duration}
                  </span>
                </div>
              </div>

              {/* Кнопка действия */}
              {!mission.locked ? (
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  style={{
                    background: `linear-gradient(135deg, ${planet.color}, ${planet.color}dd)`,
                    color: 'white',
                    padding: '1rem 1.5rem',
                    borderRadius: '1rem',
                    fontWeight: 800,
                    textAlign: 'center',
                    boxShadow: `0 8px 30px ${planet.color}50`,
                    fontSize: '1.125rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.75rem'
                  }}
                >
                  <Star style={{ 
                    width: '1.5rem', 
                    height: '1.5rem',
                    fill: 'white'
                  }} />
                  <span>Начать миссию</span>
                </motion.div>
              ) : (
                <div style={{
                  background: 'rgba(75, 85, 99, 0.3)',
                  color: '#9ca3af',
                  padding: '1rem 1.5rem',
                  borderRadius: '1rem',
                  fontWeight: 700,
                  textAlign: 'center',
                  fontSize: '1rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.75rem',
                  border: '2px dashed rgba(75, 85, 99, 0.5)'
                }}>
                  <Lock style={{ width: '1.25rem', height: '1.25rem' }} />
                  <span>Заблокировано</span>
                </div>
              )}
            </motion.div>
          ))}
        </div>

        {/* Нижний отступ */}
        <div style={{ height: '4rem' }} />
      </div>
    </div>
  );
}

export default PlanetMissions;