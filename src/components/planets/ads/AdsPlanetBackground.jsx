// src/components/planets/ads/AdsPlanetBackground.jsx
// ФИНАЛЬНЫЙ КИБЕРПАНК ФОН - Неоновый город мошенников

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

function AdsPlanetBackground({ missionProgress = 0 }) {
  const [parallaxY, setParallaxY] = useState(0);
  const [glitchActive, setGlitchActive] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setParallaxY(window.scrollY * 0.3);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const glitchInterval = setInterval(() => {
      setGlitchActive(true);
      setTimeout(() => setGlitchActive(false), 200);
    }, 5000);

    return () => clearInterval(glitchInterval);
  }, []);

  const cityOpacity = 0.4 + (missionProgress * 0.12);
  const cityScale = 0.85 + (missionProgress * 0.03);

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      overflow: 'hidden',
      zIndex: 0,
      background: 'linear-gradient(to bottom, #0a0015 0%, #1a0030 50%, #0f001a 100%)'
    }}>
      
      {/* РЕАЛЬНОЕ ФОТО КИБЕРПАНК ГОРОДА */}
      <motion.div 
        animate={{
          filter: glitchActive 
            ? 'brightness(1.2) contrast(1.3) saturate(1.5) hue-rotate(10deg)' 
            : 'brightness(0.8) contrast(1.2) saturate(1.3)'
        }}
        transition={{ duration: 0.1 }}
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: 'url(https://images.unsplash.com/photo-1542831371-29b0f74f9713?w=1920&q=80)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          transform: `translateY(${parallaxY * 0.2}px) scale(1.1)`,
        }}
      />

      {/* Неоновый оверлей */}
      <div style={{
        position: 'absolute',
        inset: 0,
        background: 'radial-gradient(ellipse at 50% 50%, rgba(236, 72, 153, 0.2) 0%, transparent 70%)',
        mixBlendMode: 'screen'
      }} />

      {/* Cyan свечение */}
      <div style={{
        position: 'absolute',
        inset: 0,
        background: 'radial-gradient(ellipse at 80% 20%, rgba(0, 255, 255, 0.15) 0%, transparent 50%)',
        mixBlendMode: 'screen'
      }} />

      {/* Глитч линии */}
      {glitchActive && (
        <>
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={`glitch-${i}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 1, 0], x: [0, Math.random() * 20 - 10] }}
              transition={{ duration: 0.2, delay: i * 0.02 }}
              style={{
                position: 'absolute',
                left: 0,
                right: 0,
                top: `${Math.random() * 100}%`,
                height: '2px',
                background: `rgba(${Math.random() > 0.5 ? '236, 72, 153' : '0, 255, 255'}, 0.8)`,
                boxShadow: `0 0 10px rgba(${Math.random() > 0.5 ? '236, 72, 153' : '0, 255, 255'}, 0.8)`
              }}
            />
          ))}
        </>
      )}

      {/* ГОЛОГРАММЫ-РЕКЛАМЫ */}
      <div style={{
        position: 'absolute',
        top: '15%',
        right: '10%',
        width: '300px',
        height: '200px',
        transform: `translateY(${parallaxY * 0.1}px) perspective(1000px) rotateY(-15deg)`,
      }}>
        <motion.div
          animate={{
            opacity: [0.6, 0.9, 0.6],
            scale: [1, 1.02, 1],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: 'easeInOut'
          }}
          style={{
            width: '100%',
            height: '100%',
            background: 'linear-gradient(135deg, rgba(236, 72, 153, 0.3), rgba(219, 39, 119, 0.2))',
            backdropFilter: 'blur(10px)',
            border: '2px solid rgba(236, 72, 153, 0.5)',
            borderRadius: '1rem',
            padding: '1.5rem',
            boxShadow: '0 0 40px rgba(236, 72, 153, 0.4), inset 0 0 20px rgba(236, 72, 153, 0.2)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            position: 'relative',
            overflow: 'hidden'
          }}
        >
          {/* Scanning lines */}
          <motion.div
            animate={{ y: ['0%', '100%'] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
            style={{
              position: 'absolute',
              inset: 0,
              background: 'linear-gradient(to bottom, transparent 0%, rgba(236, 72, 153, 0.3) 50%, transparent 100%)',
              height: '50%'
            }}
          />
          
          <div style={{
            fontSize: '2.5rem',
            fontWeight: 900,
            color: '#EC4899',
            textShadow: '0 0 20px rgba(236, 72, 153, 0.8)',
            marginBottom: '0.5rem',
            zIndex: 1
          }}>
            -70% OFF!
          </div>
          <div style={{
            fontSize: '1.25rem',
            color: '#F9A8D4',
            fontWeight: 700,
            zIndex: 1
          }}>
            SUPER OFFER
          </div>
        </motion.div>
      </div>

      {/* ГОЛОГРАММА 2 */}
      <div style={{
        position: 'absolute',
        top: '40%',
        left: '8%',
        width: '250px',
        height: '180px',
        transform: `translateY(${parallaxY * 0.15}px) perspective(1000px) rotateY(15deg)`,
      }}>
        <motion.div
          animate={{
            opacity: [0.5, 0.8, 0.5],
            scale: [1, 1.03, 1],
          }}
          transition={{
            duration: 2.5,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: 0.5
          }}
          style={{
            width: '100%',
            height: '100%',
            background: 'linear-gradient(135deg, rgba(0, 255, 255, 0.3), rgba(6, 182, 212, 0.2))',
            backdropFilter: 'blur(10px)',
            border: '2px solid rgba(0, 255, 255, 0.5)',
            borderRadius: '1rem',
            padding: '1.5rem',
            boxShadow: '0 0 40px rgba(0, 255, 255, 0.4), inset 0 0 20px rgba(0, 255, 255, 0.2)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            position: 'relative',
            overflow: 'hidden'
          }}
        >
          <motion.div
            animate={{ y: ['0%', '100%'] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: 'linear' }}
            style={{
              position: 'absolute',
              inset: 0,
              background: 'linear-gradient(to bottom, transparent 0%, rgba(0, 255, 255, 0.3) 50%, transparent 100%)',
              height: '40%'
            }}
          />
          
          <div style={{
            fontSize: '2rem',
            fontWeight: 900,
            color: '#00FFFF',
            textShadow: '0 0 20px rgba(0, 255, 255, 0.8)',
            marginBottom: '0.5rem',
            zIndex: 1
          }}>
            BUY NOW
          </div>
          <div style={{
            fontSize: '1rem',
            color: '#67E8F9',
            fontWeight: 700,
            zIndex: 1
          }}>
            Limited Time!
          </div>
        </motion.div>
      </div>

      {/* НЕОНОВЫЙ ГОРОД-СИЛУЭТ */}
      <motion.div
        animate={{ opacity: [cityOpacity, cityOpacity + 0.08, cityOpacity] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        style={{
          position: 'absolute',
          bottom: '0',
          left: '50%',
          transform: `translateX(-50%) translateY(${parallaxY * 0.25}px) scale(${cityScale})`,
          filter: missionProgress === 0 
            ? 'blur(12px) brightness(0.6)' 
            : missionProgress < 2 
            ? 'blur(8px) brightness(0.75)' 
            : missionProgress < 4 
            ? 'blur(4px) brightness(0.85)' 
            : 'blur(0px)',
          transition: 'filter 1s ease-out',
          opacity: cityOpacity
        }}
      >
        <div style={{ 
          display: 'flex', 
          alignItems: 'flex-end', 
          gap: '12px', 
          filter: 'drop-shadow(0 10px 50px rgba(236, 72, 153, 0.6))',
          minWidth: '800px'
        }}>
          {/* Небоскрёбы с неоном */}
          {[
            { h: 140, w: 55, color: '#EC4899', glow: 'rgba(236, 72, 153, 0.8)' },
            { h: 180, w: 48, color: '#00FFFF', glow: 'rgba(0, 255, 255, 0.8)' },
            { h: 120, w: 42, color: '#EC4899', glow: 'rgba(236, 72, 153, 0.8)' },
            { h: 200, w: 60, color: '#A855F7', glow: 'rgba(168, 85, 247, 0.8)' },
            { h: 160, w: 50, color: '#00FFFF', glow: 'rgba(0, 255, 255, 0.8)' },
            { h: 190, w: 55, color: '#EC4899', glow: 'rgba(236, 72, 153, 0.8)' },
            { h: 130, w: 45, color: '#00FFFF', glow: 'rgba(0, 255, 255, 0.8)' },
            { h: 170, w: 52, color: '#A855F7', glow: 'rgba(168, 85, 247, 0.8)' },
            { h: 145, w: 48, color: '#EC4899', glow: 'rgba(236, 72, 153, 0.8)' },
            { h: 155, w: 50, color: '#00FFFF', glow: 'rgba(0, 255, 255, 0.8)' },
          ].map((building, i) => (
            <motion.div
              key={`building-${i}`}
              animate={{
                boxShadow: [
                  `0 0 20px ${building.glow}, inset 0 0 10px ${building.glow}`,
                  `0 0 30px ${building.glow}, inset 0 0 15px ${building.glow}`,
                  `0 0 20px ${building.glow}, inset 0 0 10px ${building.glow}`
                ]
              }}
              transition={{
                duration: 2 + i * 0.3,
                repeat: Infinity,
                delay: i * 0.2
              }}
              style={{
                width: `${building.w}px`,
                height: `${building.h}px`,
                background: `linear-gradient(to top, #0a0015, ${building.color}30)`,
                border: `2px solid ${building.color}`,
                borderRadius: '4px 4px 0 0',
                position: 'relative',
                overflow: 'hidden'
              }}
            >
              {/* Окна */}
              {[...Array(Math.floor(building.h / 20))].map((_, row) => (
                <div key={`row-${row}`} style={{
                  display: 'flex',
                  gap: '6px',
                  padding: '4px',
                  marginBottom: '8px'
                }}>
                  {[...Array(Math.floor(building.w / 15))].map((_, col) => (
                    <motion.div
                      key={`window-${col}`}
                      animate={{
                        opacity: [0.3, 0.8, 0.3],
                        backgroundColor: [building.color, `${building.color}CC`, building.color]
                      }}
                      transition={{
                        duration: 1 + Math.random() * 2,
                        repeat: Infinity,
                        delay: Math.random() * 2
                      }}
                      style={{
                        width: '6px',
                        height: '6px',
                        background: building.color,
                        boxShadow: `0 0 4px ${building.glow}`
                      }}
                    />
                  ))}
                </div>
              ))}
            </motion.div>
          ))}
        </div>

        {/* Название города */}
        {missionProgress >= 3 && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.8 }}
            style={{
              marginTop: '30px',
              textAlign: 'center',
              position: 'relative'
            }}
          >
            <motion.div
              animate={{
                textShadow: [
                  '0 0 10px #EC4899, 0 0 20px #EC4899, 0 0 30px #EC4899',
                  '0 0 20px #00FFFF, 0 0 30px #00FFFF, 0 0 40px #00FFFF',
                  '0 0 10px #EC4899, 0 0 20px #EC4899, 0 0 30px #EC4899'
                ]
              }}
              transition={{ duration: 3, repeat: Infinity }}
              style={{
                fontSize: missionProgress === 5 ? '3.5rem' : missionProgress === 4 ? '3rem' : '2.2rem',
                fontWeight: 900,
                background: 'linear-gradient(90deg, #EC4899, #00FFFF, #A855F7, #EC4899)',
                backgroundSize: '200% 100%',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                letterSpacing: '0.3em',
                transition: 'all 0.6s',
                fontFamily: 'monospace',
                textTransform: 'uppercase'
              }}
            >
              ⚠️ ГОРОД ИЛЛЮЗИЙ ⚠️
            </motion.div>
          </motion.div>
        )}
      </motion.div>

      {/* Дигитальный дождь */}
      {[...Array(15)].map((_, i) => (
        <motion.div
          key={`rain-${i}`}
          style={{
            position: 'absolute',
            left: `${Math.random() * 100}%`,
            top: `-20px`,
            fontSize: '1rem',
            color: Math.random() > 0.5 ? '#EC4899' : '#00FFFF',
            opacity: 0.3,
            fontFamily: 'monospace',
            fontWeight: 700,
            textShadow: `0 0 5px ${Math.random() > 0.5 ? '#EC4899' : '#00FFFF'}`
          }}
          animate={{
            y: ['0vh', '110vh'],
            opacity: [0, 0.6, 0]
          }}
          transition={{
            duration: 8 + Math.random() * 4,
            repeat: Infinity,
            ease: 'linear',
            delay: Math.random() * 5
          }}
        >
          {['0', '1', '$', '%', '#', '@'][Math.floor(Math.random() * 6)]}
        </motion.div>
      ))}

      {/* Цифровые частицы */}
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={`particle-${i}`}
          style={{
            position: 'absolute',
            width: '3px',
            height: '3px',
            background: Math.random() > 0.5 ? '#EC4899' : '#00FFFF',
            borderRadius: '50%',
            boxShadow: `0 0 6px ${Math.random() > 0.5 ? '#EC4899' : '#00FFFF'}`,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            x: [0, Math.random() * 100 - 50],
            y: [0, Math.random() * 100 - 50],
            opacity: [0, 0.8, 0],
            scale: [0, 1.5, 0]
          }}
          transition={{
            duration: Math.random() * 10 + 5,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: Math.random() * 5
          }}
        />
      ))}

      {/* Сканирующая линия */}
      <motion.div
        animate={{ y: ['0%', '100%'] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          height: '2px',
          background: 'linear-gradient(90deg, transparent, #00FFFF, transparent)',
          boxShadow: '0 0 10px #00FFFF',
          opacity: 0.3
        }}
      />
    </div>
  );
}

export default AdsPlanetBackground;