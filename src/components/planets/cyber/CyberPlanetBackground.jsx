import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

function CyberPlanetBackground({ missionProgress = 0 }) {
  const [parallaxY, setParallaxY] = useState(0);
  const [glitchActive, setGlitchActive] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setParallaxY(window.scrollY * 0.5);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Случайный глитч эффект
  useEffect(() => {
    const glitchInterval = setInterval(() => {
      if (Math.random() > 0.7) {
        setGlitchActive(true);
        setTimeout(() => setGlitchActive(false), 100);
      }
    }, 3000);

    return () => clearInterval(glitchInterval);
  }, []);

  const cityOpacity = 0.4 + (missionProgress * 0.15);

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      overflow: 'hidden',
      zIndex: 0,
      background: '#0a0e27'
    }}>
      
      {/* Базовый градиент */}
      <div style={{
        position: 'absolute',
        inset: 0,
        background: 'linear-gradient(180deg, #0a0e27 0%, #1a1f3a 50%, #0f1729 100%)'
      }} />

      {/* Футуристичный город - ТВОЯ КАРТИНКА */}
      <div style={{
        position: 'absolute',
        inset: 0,
        backgroundImage: 'url(/uploads/photo_2025-11-18_23-04-14.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center bottom',
        opacity: cityOpacity,
        transform: `translateY(${parallaxY * 0.3}px) scale(1.1)`,
        filter: glitchActive ? 'hue-rotate(180deg) saturate(3)' : 'brightness(0.9) saturate(1.3)',
        transition: 'filter 0.1s'
      }} />

      {/* Неоновое свечение снизу */}
      <div style={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: '60%',
        background: 'linear-gradient(to top, rgba(0, 217, 255, 0.2) 0%, transparent 100%)',
        filter: 'blur(40px)'
      }} />

      {/* Сканирующие горизонтальные линии */}
      {[...Array(5)].map((_, i) => (
        <motion.div
          key={`scan-${i}`}
          animate={{
            y: ['0%', '100%']
          }}
          transition={{
            duration: 8 + i * 2,
            repeat: Infinity,
            ease: 'linear',
            delay: i * 1.5
          }}
          style={{
            position: 'absolute',
            left: 0,
            right: 0,
            height: '2px',
            background: 'linear-gradient(90deg, transparent, #00ff41, transparent)',
            boxShadow: '0 0 10px #00ff41',
            opacity: 0.3
          }}
        />
      ))}

      {/* Вертикальные неоновые линии */}
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={`vline-${i}`}
          animate={{
            opacity: [0.2, 0.6, 0.2]
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            delay: i * 0.4
          }}
          style={{
            position: 'absolute',
            left: `${10 + i * 12}%`,
            top: 0,
            bottom: 0,
            width: '1px',
            background: `linear-gradient(180deg, transparent, ${i % 2 === 0 ? '#00ff41' : '#00d9ff'}, transparent)`,
            boxShadow: `0 0 10px ${i % 2 === 0 ? '#00ff41' : '#00d9ff'}`
          }}
        />
      ))}

      {/* Голографическая сетка */}
      <div style={{
        position: 'absolute',
        inset: 0,
        backgroundImage: `
          linear-gradient(rgba(0, 255, 65, 0.03) 1px, transparent 1px),
          linear-gradient(90deg, rgba(0, 255, 65, 0.03) 1px, transparent 1px)
        `,
        backgroundSize: '50px 50px',
        animation: 'grid-move 20s linear infinite'
      }} />

      {/* Матричный код дождь */}
      {[...Array(15)].map((_, i) => (
        <motion.div
          key={`matrix-${i}`}
          animate={{
            y: [-100, window.innerHeight + 100]
          }}
          transition={{
            duration: 8 + Math.random() * 4,
            repeat: Infinity,
            ease: 'linear',
            delay: Math.random() * 5
          }}
          style={{
            position: 'absolute',
            left: `${Math.random() * 100}%`,
            top: '-100px',
            fontSize: '14px',
            color: '#00ff41',
            fontFamily: 'monospace',
            opacity: 0.4,
            textShadow: '0 0 8px #00ff41',
            whiteSpace: 'pre'
          }}
        >
          {Array(20).fill(0).map(() => 
            String.fromCharCode(33 + Math.random() * 94)
          ).join('\n')}
        </motion.div>
      ))}

      {/* Плавающие голографические частицы */}
      {[...Array(25)].map((_, i) => (
        <motion.div
          key={`particle-${i}`}
          animate={{
            x: [0, Math.random() * 100 - 50, 0],
            y: [0, Math.random() * 100 - 50, 0],
            opacity: [0.2, 0.8, 0.2],
            scale: [1, 1.5, 1]
          }}
          transition={{
            duration: 5 + Math.random() * 5,
            repeat: Infinity,
            delay: Math.random() * 5
          }}
          style={{
            position: 'absolute',
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            width: `${4 + Math.random() * 6}px`,
            height: `${4 + Math.random() * 6}px`,
            borderRadius: '50%',
            background: i % 3 === 0 ? '#00ff41' : i % 3 === 1 ? '#00d9ff' : '#ff0055',
            boxShadow: `0 0 ${10 + Math.random() * 10}px currentColor`,
            filter: 'blur(1px)'
          }}
        />
      ))}

      {/* Голографический круг в центре */}
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          rotate: [0, 360]
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: 'linear'
        }}
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '800px',
          height: '800px',
          borderRadius: '50%',
          border: '2px solid rgba(0, 255, 65, 0.1)',
          boxShadow: '0 0 50px rgba(0, 255, 65, 0.1), inset 0 0 50px rgba(0, 255, 65, 0.05)'
        }}
      />

      {/* Внутренний голографический круг */}
      <motion.div
        animate={{
          scale: [1, 1.1, 1],
          rotate: [360, 0]
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: 'linear'
        }}
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '500px',
          height: '500px',
          borderRadius: '50%',
          border: '1px solid rgba(0, 217, 255, 0.2)',
          boxShadow: '0 0 30px rgba(0, 217, 255, 0.2)'
        }}
      />

      {/* Кибер-город силуэт */}
      <motion.div
        animate={{
          opacity: [cityOpacity, cityOpacity + 0.1, cityOpacity]
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: 'easeInOut'
        }}
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: '40%',
          background: `
            linear-gradient(180deg, transparent 0%, rgba(0, 217, 255, 0.1) 50%, rgba(0, 255, 65, 0.1) 100%)
          `,
          filter: 'blur(20px)'
        }}
      />

      {/* Глитч оверлей */}
      {glitchActive && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 1, 0] }}
          transition={{ duration: 0.1 }}
          style={{
            position: 'absolute',
            inset: 0,
            background: `
              repeating-linear-gradient(
                0deg,
                rgba(255, 0, 85, 0.1) 0px,
                transparent 2px,
                transparent 4px,
                rgba(0, 255, 65, 0.1) 4px,
                rgba(0, 255, 65, 0.1) 6px,
                transparent 6px
              )
            `,
            mixBlendMode: 'difference'
          }}
        />
      )}

      {/* Неоновая рамка по краям */}
      <div style={{
        position: 'absolute',
        inset: '20px',
        border: '1px solid rgba(0, 255, 65, 0.2)',
        borderRadius: '10px',
        boxShadow: 'inset 0 0 30px rgba(0, 255, 65, 0.1)',
        pointerEvents: 'none'
      }} />

      {/* CSS анимации */}
      <style>{`
        @keyframes grid-move {
          0% { transform: translateY(0); }
          100% { transform: translateY(50px); }
        }
      `}</style>
    </div>
  );
}

export default CyberPlanetBackground;