// src/components/planets/finance/FinancePlanetBackground.jsx
// ФИНАЛЬНЫЙ РЕАЛИСТИЧНЫЙ ФОН - Реальное фото + 3D солнце

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

function FinancePlanetBackground({ missionProgress = 0 }) {
  const [parallaxY, setParallaxY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setParallaxY(window.scrollY * 0.5);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const cityScale = 0.8 + (missionProgress * 0.25);
  const cityOpacity = 0.5 + (missionProgress * 0.1);

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      overflow: 'hidden',
      zIndex: 0
    }}>
      
      {/* РЕАЛЬНОЕ ФОТО ПУСТЫНИ */}
      <div style={{
        position: 'absolute',
        inset: 0,
        backgroundImage: 'url(https://images.unsplash.com/photo-1509316785289-025f5b846b35?w=1920&q=80)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        transform: `translateY(${parallaxY * 0.3}px) scale(1.1)`,
        filter: 'brightness(0.7) contrast(1.1)'
      }} />

      {/* Затемнение */}
      <div style={{
        position: 'absolute',
        inset: 0,
        background: 'linear-gradient(to bottom, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.5) 100%)'
      }} />

      {/* Золотистый оверлей */}
      <div style={{
        position: 'absolute',
        inset: 0,
        background: 'radial-gradient(ellipse at 80% 20%, rgba(255, 180, 80, 0.15) 0%, transparent 60%)',
        mixBlendMode: 'screen'
      }} />

      {/* 3D СОЛНЦЕ */}
      <div style={{
        position: 'absolute',
        top: '10%',
        right: '15%',
        width: '220px',
        height: '220px',
        transform: `translateY(${parallaxY * 0.05}px)`,
        filter: 'drop-shadow(0 0 60px rgba(255, 140, 50, 0.6))'
      }}>
        {/* Свечение внешнее */}
        <motion.div
          animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.4, 0.2] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          style={{
            position: 'absolute',
            inset: '-80px',
            background: 'radial-gradient(circle, rgba(255, 140, 50, 0.5) 0%, rgba(255, 100, 0, 0.3) 30%, transparent 70%)',
            borderRadius: '50%',
            filter: 'blur(40px)'
          }}
        />

        {/* Свечение среднее */}
        <motion.div
          animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
          style={{
            position: 'absolute',
            inset: '-40px',
            background: 'radial-gradient(circle, rgba(255, 160, 60, 0.6) 0%, rgba(255, 120, 30, 0.4) 40%, transparent 70%)',
            borderRadius: '50%',
            filter: 'blur(25px)'
          }}
        />

        {/* Тело солнца */}
        <motion.div
          animate={{ scale: [1, 1.03, 1] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
          style={{
            position: 'absolute',
            inset: 0,
            borderRadius: '50%',
            background: 'radial-gradient(circle at 30% 30%, #fffbeb 0%, #fff4d0 15%, #ffe17f 35%, #ffb84d 55%, #ff8c1a 75%, #e65100 95%)',
            boxShadow: `0 0 80px 20px rgba(255, 140, 50, 0.5), inset -30px -30px 60px rgba(0,0,0,0.4), inset 15px 15px 40px rgba(255,255,255,0.3)`,
          }}
        >
          {/* Блики */}
          <div style={{
            position: 'absolute',
            top: '15%',
            left: '20%',
            width: '60px',
            height: '60px',
            background: 'radial-gradient(circle, rgba(255,255,255,0.6) 0%, transparent 70%)',
            borderRadius: '50%',
            filter: 'blur(8px)'
          }} />
          <div style={{
            position: 'absolute',
            top: '25%',
            left: '35%',
            width: '30px',
            height: '30px',
            background: 'radial-gradient(circle, rgba(255,255,255,0.4) 0%, transparent 70%)',
            borderRadius: '50%',
            filter: 'blur(5px)'
          }} />
        </motion.div>

        {/* Пятна */}
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={`spot-${i}`}
            animate={{ opacity: [0.2, 0.5, 0.2], scale: [0.9, 1.1, 0.9] }}
            transition={{ duration: 4 + i * 0.3, repeat: Infinity, delay: i * 0.3 }}
            style={{
              position: 'absolute',
              width: `${12 + Math.random() * 25}px`,
              height: `${12 + Math.random() * 25}px`,
              borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(160, 40, 0, 0.6) 0%, rgba(120, 30, 0, 0.3) 70%, transparent)',
              top: `${15 + Math.random() * 70}%`,
              left: `${15 + Math.random() * 70}%`,
              filter: 'blur(3px)',
              boxShadow: 'inset 2px 2px 8px rgba(0,0,0,0.5)'
            }}
          />
        ))}

        {/* Лучи */}
        {[...Array(16)].map((_, i) => (
          <motion.div
            key={`ray-${i}`}
            animate={{ opacity: [0.3, 0.7, 0.3], scaleY: [0.7, 1.3, 0.7], scaleX: [1, 0.8, 1] }}
            transition={{ duration: 2.5, repeat: Infinity, delay: i * 0.1 }}
            style={{
              position: 'absolute',
              width: '5px',
              height: '40px',
              background: 'linear-gradient(to bottom, rgba(255, 220, 120, 0.9), transparent)',
              top: '50%',
              left: '50%',
              transformOrigin: 'center',
              transform: `translate(-50%, -50%) rotate(${i * 22.5}deg) translateY(-125px)`,
              filter: 'blur(2px)',
              borderRadius: '50%'
            }}
          />
        ))}

        {/* Вспышки */}
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={`flare-${i}`}
            animate={{ opacity: [0, 0.6, 0], scale: [0.5, 1.2, 0.5] }}
            transition={{ duration: 3, repeat: Infinity, delay: i * 0.5 }}
            style={{
              position: 'absolute',
              width: `${20 + Math.random() * 30}px`,
              height: `${20 + Math.random() * 30}px`,
              borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(255, 255, 200, 0.8) 0%, transparent 70%)',
              top: `${30 + Math.random() * 40}%`,
              left: `${30 + Math.random() * 40}%`,
              filter: 'blur(8px)'
            }}
          />
        ))}
      </div>

      {/* Город */}
      <motion.div
        animate={{ opacity: [cityOpacity, cityOpacity + 0.05, cityOpacity] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        style={{
          position: 'absolute',
          bottom: '32%',
          left: '50%',
          transform: `translateX(-50%) translateY(${parallaxY * 0.2}px) scale(${cityScale})`,
          filter: missionProgress === 0 ? 'blur(10px) brightness(0.7)' : missionProgress < 2 ? 'blur(6px) brightness(0.8)' : missionProgress < 4 ? 'blur(3px) brightness(0.9)' : 'blur(0px)',
          transition: 'filter 1s ease-out',
          opacity: cityOpacity
        }}
      >
        <div style={{ display: 'flex', alignItems: 'flex-end', gap: '8px', filter: 'drop-shadow(0 8px 40px rgba(0,0,0,0.8))', minWidth: '700px' }}>
          <div style={{ width: '45px', height: '75px', background: 'linear-gradient(to top, #2d1810, #4a2818)', borderRadius: '3px 3px 0 0' }} />
          <div style={{ width: '38px', height: '90px', background: 'linear-gradient(to top, #2d1810, #4a2818)', borderRadius: '4px 4px 0 0' }} />
          <div style={{ width: '32px', height: '68px', background: 'linear-gradient(to top, #2d1810, #4a2818)', borderRadius: '2px 2px 0 0' }} />
          
          {/* Минарет */}
          <div style={{ width: '22px', height: '150px', background: 'linear-gradient(to top, #2d1810, #6a3820)', position: 'relative' }}>
            <div style={{ position: 'absolute', top: '-18px', left: '50%', transform: 'translateX(-50%)', width: '35px', height: '35px', background: 'radial-gradient(circle, #8a5d42, #4a2818)', borderRadius: '50% 50% 0 0', clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)', boxShadow: 'inset -5px -5px 10px rgba(0,0,0,0.5)' }} />
          </div>

          {/* Купол */}
          <div style={{ position: 'relative', width: '140px', height: '120px' }}>
            <div style={{ width: '100%', height: '80px', background: 'linear-gradient(to top, #2d1810, #6a3820)', borderRadius: '6px 6px 0 0', position: 'absolute', bottom: 0, boxShadow: 'inset -10px 0 20px rgba(0,0,0,0.4)' }} />
            <div style={{ width: '90px', height: '70px', background: 'radial-gradient(ellipse at bottom, #8a5d42, #6a3820)', borderRadius: '50% 50% 0 0', position: 'absolute', bottom: '80px', left: '50%', transform: 'translateX(-50%)', clipPath: 'ellipse(50% 100% at 50% 100%)', boxShadow: 'inset -15px -15px 30px rgba(0,0,0,0.5)' }} />
            <div style={{ width: '10px', height: '30px', background: 'linear-gradient(to top, #6a3820, #8a5d42)', position: 'absolute', bottom: '150px', left: '50%', transform: 'translateX(-50%)' }} />
            <div style={{ width: '18px', height: '18px', background: 'radial-gradient(circle, #b8865a, #8a5d42)', borderRadius: '50%', position: 'absolute', bottom: '180px', left: '50%', transform: 'translateX(-50%)', boxShadow: '0 0 15px rgba(184, 134, 90, 0.6)' }} />
          </div>

          {/* Минарет 2 */}
          <div style={{ width: '20px', height: '140px', background: 'linear-gradient(to top, #2d1810, #6a3820)', position: 'relative' }}>
            <div style={{ position: 'absolute', top: '-15px', left: '50%', transform: 'translateX(-50%)', width: '32px', height: '32px', background: 'radial-gradient(circle, #8a5d42, #4a2818)', borderRadius: '50% 50% 0 0', clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)', boxShadow: 'inset -5px -5px 10px rgba(0,0,0,0.5)' }} />
          </div>

          <div style={{ width: '55px', height: '95px', background: 'linear-gradient(to top, #2d1810, #4a2818)', borderRadius: '5px 5px 0 0' }} />
          <div style={{ width: '38px', height: '80px', background: 'linear-gradient(to top, #2d1810, #4a2818)', borderRadius: '3px 3px 0 0' }} />
          <div style={{ width: '50px', height: '100px', background: 'linear-gradient(to top, #2d1810, #4a2818)', borderRadius: '4px 4px 0 0' }} />
          <div style={{ width: '42px', height: '85px', background: 'linear-gradient(to top, #2d1810, #4a2818)', borderRadius: '3px 3px 0 0' }} />
          
          {/* Башня */}
          <div style={{ width: '28px', height: '130px', background: 'linear-gradient(to top, #2d1810, #6a3820)', borderRadius: '3px 3px 0 0', position: 'relative' }}>
            <div style={{ width: '18px', height: '18px', background: 'radial-gradient(circle, #8a5d42, #6a3820)', borderRadius: '50%', position: 'absolute', top: '-10px', left: '50%', transform: 'translateX(-50%)', boxShadow: '0 0 10px rgba(138, 93, 66, 0.5)' }} />
          </div>

          <div style={{ width: '35px', height: '65px', background: 'linear-gradient(to top, #2d1810, #4a2818)', borderRadius: '2px 2px 0 0' }} />
          <div style={{ width: '28px', height: '55px', background: 'linear-gradient(to top, #2d1810, #4a2818)', borderRadius: '2px 2px 0 0' }} />
        </div>

        {/* Название */}
        {missionProgress >= 3 && (
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            style={{
              marginTop: '25px',
              textAlign: 'center',
              fontSize: missionProgress === 5 ? '3rem' : missionProgress === 4 ? '2.5rem' : '1.8rem',
              fontWeight: 900,
              color: '#d4a876',
              textShadow: '0 3px 15px rgba(0,0,0,0.9), 0 0 50px rgba(212, 165, 116, 0.7), 2px 2px 0 rgba(0,0,0,0.5)',
              letterSpacing: '0.25em',
              transition: 'all 0.6s',
              fontFamily: 'serif'
            }}
          >
            ✧ ЗОЛОТОЙ БАЗАР ✧
          </motion.div>
        )}
      </motion.div>

      {/* Мираж */}
      <motion.div
        animate={{ opacity: [0.05, 0.2, 0.05], scaleY: [1, 1.03, 1] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        style={{
          position: 'absolute',
          bottom: '30%',
          left: 0,
          right: 0,
          height: '120px',
          background: 'linear-gradient(to top, rgba(255, 255, 255, 0.15), transparent)',
          filter: 'blur(25px)'
        }}
      />

      {/* Пыль */}
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={`dust-${i}`}
          style={{
            position: 'absolute',
            width: '2px',
            height: '2px',
            background: 'rgba(255, 255, 255, 0.4)',
            borderRadius: '50%',
            left: `${Math.random() * 100}%`,
            top: `${50 + Math.random() * 40}%`,
          }}
          animate={{
            x: [0, Math.random() * 100 - 50],
            y: [0, Math.random() * 50 - 25],
            opacity: [0, 0.7, 0]
          }}
          transition={{
            duration: Math.random() * 25 + 20,
            repeat: Infinity,
            ease: 'linear',
            delay: Math.random() * 10
          }}
        />
      ))}
    </div>
  );
}

export default FinancePlanetBackground;