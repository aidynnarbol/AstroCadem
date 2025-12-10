// src/pages/MissionMap_v2.jsx
// УЛУЧШЕННАЯ КАРТА С 3D ГАЛАКТИКАМИ

import { useState, useRef, Suspense, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Canvas, useFrame } from '@react-three/fiber';
import { Stars, Sphere, useTexture } from '@react-three/drei';
import { Home, Star, ChevronLeft, Lock, Trophy, Target } from 'lucide-react';
import { useUser } from '../contexts/UserContext';
import { useGlitch } from '../contexts/GlitchContext';
import Glitch from '../components/Glitch';
import * as THREE from 'three';


// ===== РЕАЛИСТИЧНАЯ ГАЛАКТИКА =====
function Galaxy({ position, textureUrl, scale, isLocked, onClick, isHovered }) {
  const coreRef = useRef();
  const particlesRef = useRef();

  const particleCount = isLocked ? 10000 : 30000;
  const particles = useMemo(() => {
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    const sizes = new Float32Array(particleCount);

    for (let i = 0; i < particleCount; i++) {
      const t = i / particleCount;
      const armCount = 2;
      const armIndex = Math.floor(Math.random() * armCount);
      const armAngleOffset = (armIndex * Math.PI * 2) / armCount;
      const radius = Math.pow(t, 0.7) * 4.5;
      const spiralTightness = 2.5;
      const angle = armAngleOffset + radius * spiralTightness;
      const spreadX = (Math.random() - 0.5) * 1.2 * (1 + radius * 0.3);
      const spreadY = (Math.random() - 0.5) * 0.6 * Math.pow(1 - t, 1.5);
      const spreadZ = (Math.random() - 0.5) * 1.2 * (1 + radius * 0.3);
      positions[i * 3] = Math.cos(angle) * radius + spreadX;
      positions[i * 3 + 1] = spreadY;
      positions[i * 3 + 2] = Math.sin(angle) * radius + spreadZ;

      const distanceFromCenter = radius / 4.5;
      let r, g, b;
      if (distanceFromCenter < 0.1) {
        r = 1.0; g = 1.0; b = 1.0;
      } else if (distanceFromCenter < 0.3) {
        const fade = (distanceFromCenter - 0.1) / 0.2;
        r = 1.0; g = 1.0 - fade * 0.15; b = 0.9 - fade * 0.2;
      } else if (distanceFromCenter < 0.5) {
        const fade = (distanceFromCenter - 0.3) / 0.2;
        r = 0.85 - fade * 0.3; g = 0.85 - fade * 0.2; b = 1.0;
      } else if (distanceFromCenter < 0.75) {
        const fade = (distanceFromCenter - 0.5) / 0.25;
        r = 0.55 - fade * 0.25; g = 0.65 - fade * 0.35; b = 1.0 - fade * 0.15;
      } else {
        const fade = (distanceFromCenter - 0.75) / 0.25;
        r = 0.3 - fade * 0.2; g = 0.3 - fade * 0.2; b = 0.85 - fade * 0.4;
      }
      colors[i * 3] = r; colors[i * 3 + 1] = g; colors[i * 3 + 2] = b;
      const sizeVariation = Math.random() * 0.5 + 0.5;
      sizes[i] = (1 - distanceFromCenter * 0.6) * 0.15 * sizeVariation;
    }
    return { positions, colors, sizes };
  }, [particleCount]);

  useFrame((state) => {
    if (particlesRef.current && !isLocked) particlesRef.current.rotation.y += 0.0015;
    if (coreRef.current) {
      const pulse = 1 + Math.sin(state.clock.elapsedTime * 1.5) * 0.12;
      coreRef.current.scale.setScalar(pulse);
    }
  });

  return (
    <group position={[position[0], position[1], 0]} onClick={onClick}>
      <mesh ref={coreRef}>
        <sphereGeometry args={[0.3, 32, 32]} />
        <meshBasicMaterial color={isLocked ? "#555555" : "#ffffff"} />
      </mesh>
      {!isLocked && (
        <>
          <mesh scale={2.5}><sphereGeometry args={[0.3, 16, 16]} /><meshBasicMaterial color="#ffeeaa" transparent opacity={0.6} /></mesh>
          <mesh scale={4.5}><sphereGeometry args={[0.3, 16, 16]} /><meshBasicMaterial color="#88aaff" transparent opacity={0.3} /></mesh>
          <mesh scale={7}><sphereGeometry args={[0.3, 16, 16]} /><meshBasicMaterial color="#4466aa" transparent opacity={0.15} /></mesh>
        </>
      )}
      <points ref={particlesRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" count={particleCount} array={particles.positions} itemSize={3} />
          <bufferAttribute attach="attributes-color" count={particleCount} array={particles.colors} itemSize={3} />
          <bufferAttribute attach="attributes-size" count={particleCount} array={particles.sizes} itemSize={1} />
        </bufferGeometry>
        <pointsMaterial size={0.08} vertexColors transparent opacity={isLocked ? 0.4 : 0.85} sizeAttenuation depthWrite={false} blending={THREE.AdditiveBlending} />
      </points>
      {!isLocked && (
        <>
          <pointLight intensity={5} distance={20} color="#ffffff" decay={1.8} />
          <pointLight position={[0, 3, 0]} intensity={2.5} distance={15} color="#aaccff" decay={2} />
        </>
      )}
      {isLocked && (
        <group position={[0, 0, 2]}>
          <mesh><cylinderGeometry args={[0.2, 0.2, 0.3, 16]} /><meshBasicMaterial color="#888888" /></mesh>
          <mesh position={[0, 0.2, 0]}><torusGeometry args={[0.15, 0.05, 16, 32, Math.PI]} /><meshBasicMaterial color="#888888" /></mesh>
        </group>
      )}
    </group>
  );
}

// ===== ПЛАНЕТА С ТЕКСТУРОЙ =====
function Planet3D({ position, planet, onClick, isHovered }) {
  const groupRef = useRef();
  const meshRef = useRef();
  const texture = useTexture(planet.image);
  
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 0.5 + position[0]) * 0.3;
    }
    
    if (meshRef.current) {
      meshRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.3) * 0.05;
      meshRef.current.rotation.x = Math.cos(state.clock.elapsedTime * 0.2) * 0.03;
      // НЕТ ВРАЩЕНИЯ вокруг Y - красивая сторона всегда спереди!
    }
  });
  
  return (
    <group ref={groupRef} position={position} onClick={onClick}>
      <mesh ref={meshRef}>
        <sphereGeometry args={[2.5, 64, 64]} />
        <meshBasicMaterial 
          map={texture}
        />
      </mesh>
      
      {planet.locked && (
        <group position={[0, 0, 3]}>
          <mesh>
            <boxGeometry args={[0.6, 0.8, 0.3]} />
            <meshBasicMaterial color="#e0e0e0" />
          </mesh>
          <mesh position={[0, 0.6, 0]}>
            <torusGeometry args={[0.3, 0.1, 16, 32, Math.PI]} />
            <meshBasicMaterial color="#e0e0e0" />
          </mesh>
        </group>
      )}
    </group>
  );
}

function UniverseScene({ universes, onGalaxyClick, hoveredId, setHoveredId }) {
  return (
    <>
      <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={0.5} />

      {universes.map((universe, index) => {
        const positions = [
          [-10, 0, 0],
          [0, -5, 0],
          [10, 0, 0]
        ];

        return (
          <Galaxy
            key={universe.id}
            position={positions[index]}
            textureUrl={universe.backgroundImage}
            scale={universe.locked ? 1 : 1.3}
            isLocked={universe.locked}
            onClick={() => !universe.locked && onGalaxyClick(universe)}
            isHovered={hoveredId === universe.id}
          />
        );
      })}

      <CameraController />
    </>
  );
}

function CameraController() {
  useFrame((state) => {
    state.camera.lookAt(0, -1, 0);
    state.camera.position.x = Math.sin(state.clock.elapsedTime * 0.1) * 0.5;
  });
  return null;
}

function MissionMap() {
  const navigate = useNavigate();
  const { user, loading } = useUser();
  const { showTip, wasTipShown, setCurrentPage } = useGlitch();
  
  // Устанавливаем текущую страницу
  useEffect(() => {
    setCurrentPage('missionmap');
  }, [setCurrentPage]);
  
  const [selectedUniverse, setSelectedUniverse] = useState(null);
  const [hoveredGalaxy, setHoveredGalaxy] = useState(null);
  const [hoveredPlanet, setHoveredPlanet] = useState(null);

  // Подсказки для карты миссий
  useEffect(() => {
    const timer = setTimeout(() => {
      if (!selectedUniverse && !wasTipShown('missionmap_intro')) {
        showTip('missionmap_intro', {
          id: 'missionmap_intro',
          title: '🗺️ Карта Миссий!',
          message: 'Перед тобой 2 вселенные! 🌌\n\n**Вселенная Знаний** (открыта) - тут 4 планеты с обучающими миссиями: Финансы 💰, Кибербезопасность 🛡️, Технологии 🚀 и Реклама 📺!\n\n**Вселенная Приключений** (скоро) - игровые квесты и челленджи! 🎮\n\nКликни на светящуюся галактику чтобы начать! ✨',
          buttons: [{ text: 'Исследовать!', action: 'dismiss' }]
        });
      } else if (selectedUniverse === 'knowledge' && !wasTipShown('missionmap_planets')) {
        showTip('missionmap_planets', {
          id: 'missionmap_planets',
          title: '🪐 Выбери планету!',
          message: '**4 планеты доступны:**\n\n💰 **Финансы** - Деньги, накопления, траты\n🛡️ **Кибербезопасность** - Пароли, защита\n🚀 **Технологии** - Программирование, AI\n📺 **Реклама** - Критическое мышление\n\nНачни с Финансов - там основы! По 5 миссий на каждой планете! 🎯',
          buttons: [{ text: 'Понял!', action: 'dismiss' }]
        });
      }
    }, 1500);

    return () => clearTimeout(timer);
  }, [selectedUniverse, showTip, wasTipShown]);

  const planetsData = {
    finance: {
      id: 'finance',
      name: 'Финансы',
      color: '#fbbf24',
      description: 'Освой управление деньгами',
      missions: 5,
      image: '/uploads/planet1.png',
      locked: false
    },
    cyber: {
      id: 'cyber',
      name: 'Кибербезопасность',
      color: '#00ff41',
      description: 'Защити себя в цифровом мире',
      missions: 5,
      image: '/uploads/planet3.png',
      locked: true
    },
    tech: {
      id: 'tech',
      name: 'Технологии',
      color: '#3b82f6',
      description: 'Познай мир инноваций',
      missions: 6,
      image: '/uploads/planet4.png',
      locked: true
    },
    ads: {
      id: 'ads',
      name: 'Реклама',
      color: '#ec4899',
      description: 'Разгадай секреты маркетинга',
      missions: 4,
      image: '/uploads/planet2.png',
      locked: true
    }
  };

  const getCompletedCount = (planetId) => {
    if (!user || !user.completedMissions) return 0;
    return user.completedMissions.filter(id => id.startsWith(`${planetId}-`)).length;
  };

  const universes = [
    {
      id: 1,
      name: 'Цифровой Мир',
      subtitle: 'Сезон I',
      description: 'Освой основы безопасной жизни в цифровом пространстве',
      shortDescription: 'Изучите базовую информацию о 4 ключевых навыках!',
      locked: false,
      color: '#3b82f6',
      backgroundImage: 'https://images.unsplash.com/photo-1462331940025-496dfbfc7564?w=1200&q=90',
      planets: Object.values(planetsData).map(planet => planet),
      stats: { planets: 4, missions: 19, completed: user?.completedMissions?.length || 0 }
    },
    {
      id: 2,
      name: 'Будущие Миры',
      subtitle: 'Сезон II',
      description: 'Скоро откроются новые вселенные знаний!',
      shortDescription: 'Новые планеты и миссии ждут вас в 2025!',
      locked: true,
      color: '#8b5cf6',
      backgroundImage: 'https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?w=1200&q=90',
      planets: [],
      stats: { planets: '?', missions: '?', releaseDate: 'Q2 2025' }
    },
    {
      id: 3,
      name: 'Неизведанное',
      subtitle: 'Сезон III',
      description: 'Загадочные миры ждут тебя в будущем...',
      shortDescription: 'Секретная вселенная откроется позже!',
      locked: true,
      color: '#ec4899',
      backgroundImage: 'https://images.unsplash.com/photo-1506318137071-a8e063b4bec0?w=1200&q=90',
      planets: [],
      stats: { planets: '?', missions: '?', releaseDate: 'Q4 2025' }
    }
  ];

  const handleGalaxyClick = (universe) => setSelectedUniverse(universe);
  const handlePlanetClick = (planet) => { if (!planet.locked) navigate(`/planet/${planet.id}`); };

  const renderStars = (completed, total) => (
    <div style={{ display: 'flex', gap: '4px', justifyContent: 'center' }}>
      {[...Array(total)].map((_, i) => (
        <Star key={i} style={{ width: '16px', height: '16px', fill: i < completed ? '#fbbf24' : 'none', stroke: '#fbbf24', strokeWidth: 2 }} />
      ))}
    </div>
  );

  if (loading) {
    return (
      <div style={{ minHeight: '100vh', background: '#000', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: "linear" }} style={{ fontSize: '4rem' }}>⚡</motion.div>
      </div>
    );
  }

  return (
    <div style={{ position: 'relative', minHeight: '100vh', background: '#000', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, zIndex: 30, padding: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={() => selectedUniverse ? setSelectedUniverse(null) : navigate('/dashboard')}
          style={{ background: 'rgba(31, 41, 55, 0.95)', backdropFilter: 'blur(20px)', color: 'white', padding: '0.75rem 1.25rem', borderRadius: '0.75rem', border: '2px solid rgba(255, 255, 255, 0.1)', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
          {selectedUniverse ? <ChevronLeft size={18} /> : <Home size={18} />}
          {selectedUniverse ? 'Назад к Вселенным' : 'На станцию'}
        </motion.button>

        {user && (
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} style={{ background: 'rgba(31, 41, 55, 0.95)', backdropFilter: 'blur(20px)', padding: '0.75rem 1.25rem', borderRadius: '0.75rem', border: '2px solid rgba(255, 255, 255, 0.1)', display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span style={{ fontSize: '1.5rem' }}>{user.avatar}</span>
              <div>
                <div style={{ fontSize: '0.875rem', fontWeight: 700, color: 'white' }}>{user.username}</div>
                <div style={{ fontSize: '0.75rem', color: '#fbbf24' }}>Уровень {user.level}</div>
              </div>
            </div>
          </motion.div>
        )}
      </div>

      <AnimatePresence mode="wait">
        {!selectedUniverse ? (
          <motion.div key="universe-map" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} style={{ position: 'relative', minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', padding: '2rem' }}>
            <motion.div initial={{ opacity: 0, y: -30 }} animate={{ opacity: 1, y: 0 }} style={{ position: 'absolute', top: '120px', left: 0, right: 0, textAlign: 'center', zIndex: 20 }}>
              <h1 style={{ fontSize: 'clamp(2.5rem, 6vw, 4rem)', fontWeight: 900, background: 'linear-gradient(135deg, #60a5fa, #3b82f6, #2563eb)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', marginBottom: '1rem' }}>Путешествие по Вселенным</h1>
              <p style={{ color: '#d1d5db', fontSize: '1.25rem' }}>Каждая вселенная - новый сезон приключений</p>
            </motion.div>

            <div style={{ width: '100%', height: '70vh', position: 'relative', zIndex: 10 }}>
              <Canvas camera={{ position: [0, 6, 12], fov: 55 }}>
                <Suspense fallback={null}><UniverseScene universes={universes} onGalaxyClick={handleGalaxyClick} hoveredId={hoveredGalaxy} setHoveredId={setHoveredGalaxy} /></Suspense>
              </Canvas>

              <AnimatePresence>
                {hoveredGalaxy && (() => {
                  const universe = universes.find(u => u.id === hoveredGalaxy);
                  return (
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 20 }}
                      style={{ position: 'absolute', bottom: '10%', left: '50%', transform: 'translateX(-50%)', background: 'rgba(17, 24, 39, 0.95)', backdropFilter: 'blur(30px)', padding: '2rem 3rem', borderRadius: '1.5rem', border: `3px solid ${universe?.color}80`, boxShadow: `0 20px 60px ${universe?.color}40`, textAlign: 'center', minWidth: '400px', pointerEvents: 'none' }}>
                      <div style={{ fontSize: '0.875rem', color: universe.color, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.15em', marginBottom: '0.75rem' }}>{universe.subtitle}</div>
                      <h3 style={{ fontSize: '2.5rem', fontWeight: 900, color: 'white', marginBottom: '1rem', textShadow: `0 0 30px ${universe.color}` }}>{universe.name}</h3>
                      <p style={{ color: '#d1d5db', fontSize: '1.25rem', marginBottom: '1.5rem', fontWeight: 600 }}>{universe.shortDescription}</p>
                      {!universe.locked ? (
                        <>
                          <div style={{ display: 'flex', justifyContent: 'center', gap: '3rem', marginBottom: '1.5rem' }}>
                            <div><div style={{ fontSize: '2rem', fontWeight: 900, color: universe.color }}>{universe.stats.planets}</div><div style={{ fontSize: '0.875rem', color: '#9ca3af' }}>Планет</div></div>
                            <div><div style={{ fontSize: '2rem', fontWeight: 900, color: universe.color }}>{universe.stats.missions}</div><div style={{ fontSize: '0.875rem', color: '#9ca3af' }}>Миссий</div></div>
                            <div><div style={{ fontSize: '2rem', fontWeight: 900, color: '#10b981' }}>{universe.stats.completed}</div><div style={{ fontSize: '0.875rem', color: '#9ca3af' }}>Пройдено</div></div>
                          </div>
                          <div style={{ padding: '1rem 2rem', background: `linear-gradient(135deg, ${universe.color}40, ${universe.color}20)`, borderRadius: '0.75rem', border: `2px solid ${universe.color}60`, fontSize: '1rem', fontWeight: 700, color: 'white', textTransform: 'uppercase', letterSpacing: '0.1em' }}>✨ Кликни для входа ✨</div>
                        </>
                      ) : (
                        <div style={{ padding: '1rem 2rem', background: 'rgba(55, 65, 81, 0.5)', borderRadius: '0.75rem', border: '2px solid rgba(255, 255, 255, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.75rem' }}>
                          <Lock size={20} style={{ color: '#9ca3af' }} /><span style={{ fontSize: '1rem', color: '#9ca3af', fontWeight: 600 }}>Откроется {universe.stats.releaseDate}</span>
                        </div>
                      )}
                    </motion.div>
                  );
                })()}
              </AnimatePresence>
            </div>
          </motion.div>
        ) : (
          <motion.div key="planets" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} style={{ position: 'relative', minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', padding: '2rem' }}>
            <motion.div initial={{ opacity: 0, y: -30 }} animate={{ opacity: 1, y: 0 }} style={{ textAlign: 'center', marginBottom: '3rem' }}>
              <div style={{ fontSize: '0.875rem', color: selectedUniverse.color, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '0.5rem' }}>{selectedUniverse.subtitle}</div>
              <h1 style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', fontWeight: 900, color: 'white', marginBottom: '0.75rem' }}>Выбери свою планету</h1>
              <p style={{ color: '#d1d5db', fontSize: '1.125rem' }}>Каждая планета — новое приключение в мире знаний</p>
            </motion.div>

            <div style={{ position: 'relative', width: '100%', maxWidth: '1400px', height: '600px' }}>
              <Canvas camera={{ position: [0, 0, 15], fov: 50 }}>
                <Suspense fallback={null}>
                  <color attach="background" args={['#000000']} />
                  <Stars radius={200} depth={70} count={8000} factor={6} saturation={0} fade speed={0.6} />
                  
                  {selectedUniverse.planets.map((planet, index) => {
                    const positions = [[-8, 2, 0], [-2, -3, 0], [4, 2, 0], [9, -2, 0]];
                    return (
                      <group key={planet.id} onPointerEnter={() => !planet.locked && setHoveredPlanet(planet.id)} onPointerLeave={() => setHoveredPlanet(null)}>
                        <Planet3D position={positions[index]} planet={planet} onClick={() => handlePlanetClick(planet)} isHovered={hoveredPlanet === planet.id} />
                      </group>
                    );
                  })}
                </Suspense>
              </Canvas>
              
              <AnimatePresence>
                {hoveredPlanet && selectedUniverse.planets.map((planet, index) => {
                  if (planet.id !== hoveredPlanet) return null;
                  const completed = getCompletedCount(planet.id);
                  const labelPositions = [
                    { left: '25%', top: '45%' },   // Финансы - левее центра
                    { left: '25%', top: '75%' },   // Кибер - внизу слева
                    { left: '70%', top: '40%' },   // Технологии - справа вверху
                    { left: '75%', top: '70%' }    // Реклама - справа внизу
                  ];
                  
                  return (
                    <motion.div 
                      key={planet.id} 
                      initial={{ opacity: 0, scale: 0.85, y: 10 }} 
                      animate={{ opacity: 1, scale: 1, y: 0 }} 
                      exit={{ opacity: 0, scale: 0.85, y: 10 }} 
                      transition={{ duration: 0.3, ease: "easeOut" }}
                      style={{ 
                        position: 'absolute', 
                        ...labelPositions[index], 
                        transform: 'translate(-50%, -50%)', 
                        textAlign: 'left', 
                        pointerEvents: 'none', 
                        zIndex: 100, 
                        background: `linear-gradient(135deg, rgba(0, 0, 0, 0.95), rgba(${planet.color === '#fbbf24' ? '251, 191, 36' : planet.color === '#00ff41' ? '0, 255, 65' : planet.color === '#3b82f6' ? '59, 130, 246' : '236, 72, 153'}, 0.15))`,
                        backdropFilter: 'blur(20px)', 
                        padding: '1.75rem 2.25rem', 
                        borderRadius: '1.25rem', 
                        border: `3px solid ${planet.color}`,
                        boxShadow: `0 20px 40px rgba(0, 0, 0, 0.6), 0 0 30px ${planet.color}40`,
                        minWidth: '260px', 
                        maxWidth: '320px' 
                      }}>
                      
                      {/* Иконка и заголовок */}
                      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem', paddingBottom: '1rem', borderBottom: `2px solid ${planet.color}30` }}>
                        <div style={{ 
                          width: '50px', 
                          height: '50px', 
                          borderRadius: '50%', 
                          background: `${planet.color}20`, 
                          border: `2px solid ${planet.color}`,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontSize: '1.5rem'
                        }}>
                          {planet.id === 'finance' ? '💰' : planet.id === 'cyber' ? '🛡️' : planet.id === 'tech' ? '🚀' : '📺'}
                        </div>
                        <div style={{ flex: 1 }}>
                          <div style={{ fontSize: '1.6rem', fontWeight: 900, color: 'white', lineHeight: '1.2' }}>{planet.name}</div>
                          <div style={{ fontSize: '0.85rem', color: planet.color, fontWeight: 600, marginTop: '0.25rem' }}>Планета знаний</div>
                        </div>
                      </div>
                      
                      {/* Описание */}
                      <div style={{ fontSize: '1rem', color: '#d1d5db', marginBottom: '1.25rem', lineHeight: '1.5' }}>{planet.description}</div>
                      
                      {/* Статистика */}
                      <div style={{ 
                        display: 'grid', 
                        gridTemplateColumns: '1fr 1fr', 
                        gap: '1rem',
                        marginBottom: '1rem',
                        padding: '1rem',
                        background: 'rgba(0, 0, 0, 0.4)',
                        borderRadius: '0.75rem',
                        border: `1px solid ${planet.color}20`
                      }}>
                        <div style={{ textAlign: 'center' }}>
                          <div style={{ fontSize: '1.75rem', fontWeight: 900, color: planet.color, marginBottom: '0.25rem' }}>{planet.missions}</div>
                          <div style={{ fontSize: '0.75rem', color: '#9ca3af', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Всего миссий</div>
                        </div>
                        <div style={{ textAlign: 'center' }}>
                          <div style={{ fontSize: '1.75rem', fontWeight: 900, color: '#10b981', marginBottom: '0.25rem' }}>{completed}</div>
                          <div style={{ fontSize: '0.75rem', color: '#9ca3af', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Завершено</div>
                        </div>
                      </div>
                      
                      {/* Прогресс бар */}
                      <div style={{ marginBottom: '0.75rem' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                          <span style={{ fontSize: '0.8rem', color: '#9ca3af' }}>Прогресс</span>
                          <span style={{ fontSize: '0.85rem', fontWeight: 700, color: planet.color }}>{Math.round((completed / planet.missions) * 100)}%</span>
                        </div>
                        <div style={{ 
                          width: '100%', 
                          height: '8px', 
                          background: 'rgba(255, 255, 255, 0.1)', 
                          borderRadius: '999px',
                          overflow: 'hidden',
                          border: '1px solid rgba(255, 255, 255, 0.1)'
                        }}>
                          <div style={{ 
                            width: `${(completed / planet.missions) * 100}%`, 
                            height: '100%', 
                            background: `linear-gradient(90deg, ${planet.color}, ${planet.color}cc)`,
                            boxShadow: `0 0 10px ${planet.color}`,
                            transition: 'width 0.5s ease'
                          }} />
                        </div>
                      </div>
                      
                      {/* Звёзды */}
                      <div style={{ textAlign: 'center' }}>
                        {renderStars(completed, planet.missions)}
                      </div>
                      
                      {/* Кнопка подсказка */}
                      <div style={{ 
                        marginTop: '1rem', 
                        padding: '0.75rem', 
                        background: `${planet.color}15`, 
                        borderRadius: '0.5rem',
                        border: `1px solid ${planet.color}40`,
                        textAlign: 'center'
                      }}>
                        <span style={{ fontSize: '0.85rem', color: '#d1d5db', fontWeight: 600 }}>🎯 Кликни для входа</span>
                      </div>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Глюк - гид по картам */}
      <Glitch />
    </div>
  );
}

export default MissionMap;