// src/pages/FinancePlanet.jsx
// ПЛАНЕТА ФИНАНСОВ - КРАСИВОЕ 2D ИНТЕРАКТИВНОЕ МЕНЮ

import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import PlanetApproachAnimation from '../components/PlanetApproachAnimation';
import FinancePlanetIntro from '../components/planets/finance/FinancePlanetIntro';
import FinanceMissions from '../components/planets/finance/FinanceMissions';
import FinanceStory from '../components/planets/finance/FinanceStory';
import FinanceAchievements from '../components/planets/finance/FinanceAchievements';
import FinanceVideos from '../components/planets/finance/FinanceVideos';

function FinancePlanet() {
  const navigate = useNavigate();
  
  const [showApproach, setShowApproach] = useState(true);
  const [showIntro, setShowIntro] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [hoveredObject, setHoveredObject] = useState(null);
  const [activeComponent, setActiveComponent] = useState(null);
  
  const hasVisited = localStorage.getItem('finance_planet_visited') === 'true';
  
  useEffect(() => {
    if (!showApproach) {
      if (!hasVisited) {
        setShowIntro(true);
      } else {
        setShowMenu(true);
      }
    }
  }, [showApproach, hasVisited]);

  const interactiveObjects = [
    {
      id: 'captain',
      name: 'История с Капитаном',
      component: 'story',
      emoji: '🏴‍☠️',
      // Точная область капитана
      area: { left: '10%', top: '28%', width: '12%', height: '50%' },
    },
    {
      id: 'board',
      name: 'Доска достижений',
      component: 'achievements',
      emoji: '🏆',
      // Точная область доски
      area: { left: '33%', top: '18%', width: '34%', height: '48%' },
    },
    {
      id: 'barrel',
      name: 'Книга миссий',
      component: 'missions',
      emoji: '📚',
      // Точная область бочки с книгой
      area: { right: '8%', top: '38%', width: '18%', height: '42%' },
    },
    {
      id: 'scroll',
      name: 'Видео-материалы',
      component: 'videos',
      emoji: '🎬',
      // Точная область свитка
      area: { left: '40%', bottom: '15%', width: '18%', height: '12%' },
    }
  ];

  const handleObjectClick = (obj) => {
    setActiveComponent(obj.component);
  };

  const handleIntroComplete = () => {
    localStorage.setItem('finance_planet_visited', 'true');
    setShowIntro(false);
    setShowMenu(true);
  };

  const handleBack = () => {
    navigate('/mission-map');
  };

  if (showApproach) {
    return (
      <PlanetApproachAnimation
        planetName="Финансов"
        onComplete={() => setShowApproach(false)}
      />
    );
  }

  if (showIntro) {
    return (
      <FinancePlanetIntro onComplete={handleIntroComplete} />
    );
  }

  if (showMenu) {
    return (
      <div style={{ 
        minHeight: '100vh',
        position: 'relative',
        background: '#1a1410',
        overflow: 'hidden'
      }}>
        {/* ФОН - РАСТЯНУТ НА ВЕСЬ ЭКРАН БЕЗ ОБРЕЗКИ */}
        <div 
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage: 'url(/uploads/menu.jpg)',
            backgroundSize: '100% 100%',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            zIndex: 1
          }} 
        />

        {/* ЗАТЕМНЕНИЕ ПРИ HOVER */}
        <AnimatePresence>
          {hoveredObject && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              style={{
                position: 'absolute',
                inset: 0,
                background: 'rgba(0, 0, 0, 0.3)',
                zIndex: 5,
                pointerEvents: 'none'
              }}
            />
          )}
        </AnimatePresence>

        {/* КНОПКА НАЗАД */}
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.85 }}
          whileHover={{ opacity: 1, scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleBack}
          style={{
            position: 'fixed',
            top: '1.25rem',
            left: '1.25rem',
            zIndex: 1000,
            background: 'rgba(45, 31, 24, 0.9)',
            border: '2px solid rgba(201, 169, 97, 0.5)',
            borderRadius: '0.625rem',
            padding: '0.5rem 1rem',
            color: '#d4a574',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '0.4rem',
            fontWeight: 600,
            fontSize: '0.8125rem',
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
            boxShadow: '0 3px 10px rgba(0,0,0,0.6)',
            backdropFilter: 'blur(8px)',
            fontFamily: 'Georgia, serif'
          }}
        >
          <ArrowLeft size={15} />
          НАЗАД
        </motion.button>

        {/* ИНТЕРАКТИВНЫЕ ОБЛАСТИ */}
        <div style={{
          position: 'absolute',
          inset: 0,
          zIndex: 10
        }}>
          {interactiveObjects.map((obj) => (
            <motion.div
              key={obj.id}
              onMouseEnter={() => setHoveredObject(obj.id)}
              onMouseLeave={() => setHoveredObject(null)}
              onClick={() => handleObjectClick(obj)}
              whileHover={{ scale: 1.02 }}
              style={{
                position: 'absolute',
                ...obj.area,
                cursor: 'pointer',
                transition: 'all 0.2s'
              }}
            />
          ))}
        </div>

        {/* МАЛЕНЬКИЙ TOOLTIP - ПРОСТО ТЕКСТ */}
        <AnimatePresence>
          {hoveredObject && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.2 }}
              style={{
                position: 'fixed',
                left: '50%',
                top: '15%',
                transform: 'translateX(-50%)',
                background: 'rgba(20, 15, 12, 0.95)',
                border: '2px solid #d4a574',
                borderRadius: '0.75rem',
                padding: '0.75rem 1.5rem',
                boxShadow: '0 8px 25px rgba(0,0,0,0.9), 0 0 30px rgba(212,165,116,0.5)',
                backdropFilter: 'blur(10px)',
                zIndex: 100,
                pointerEvents: 'none'
              }}
            >
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem'
              }}>
                <span style={{ fontSize: '1.75rem' }}>
                  {interactiveObjects.find(o => o.id === hoveredObject)?.emoji}
                </span>
                <span style={{
                  color: '#f4e4c1',
                  fontSize: '1rem',
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                  textShadow: '0 2px 8px rgba(0,0,0,0.9)',
                  fontFamily: 'Georgia, serif'
                }}>
                  {interactiveObjects.find(o => o.id === hoveredObject)?.name}
                </span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ПОДСКАЗКА */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: hoveredObject ? 0 : 0.7 }}
          transition={{ duration: 0.3 }}
          style={{
            position: 'fixed',
            bottom: '2rem',
            right: '2.5rem',
            color: '#d4a574',
            fontSize: '0.8125rem',
            fontWeight: 600,
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
            textShadow: '0 2px 10px rgba(0,0,0,0.9)',
            zIndex: 50,
            pointerEvents: 'none',
            background: 'rgba(0,0,0,0.6)',
            padding: '0.75rem 1.25rem',
            borderRadius: '0.625rem',
            backdropFilter: 'blur(10px)',
            border: '2px solid rgba(212,165,116,0.4)',
            boxShadow: '0 4px 15px rgba(0,0,0,0.8)'
          }}
        >
          ✨ Наведи на объекты
        </motion.div>

        {/* МОДАЛЬНЫЕ ОКНА */}
        <AnimatePresence>
          {activeComponent === 'missions' && (
            <FinanceMissions onClose={() => setActiveComponent(null)} />
          )}
          {activeComponent === 'story' && (
            <FinanceStory onClose={() => setActiveComponent(null)} />
          )}
          {activeComponent === 'achievements' && (
            <FinanceAchievements onClose={() => setActiveComponent(null)} />
          )}
          {activeComponent === 'videos' && (
            <FinanceVideos onClose={() => setActiveComponent(null)} />
          )}
        </AnimatePresence>
      </div>
    );
  }

  return null;
}

export default FinancePlanet;