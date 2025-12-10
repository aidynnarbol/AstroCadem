// src/components/PlanetApproachAnimation.jsx
// 3D ИНТРО ПЛАНЕТЫ ФИНАНСОВ С РЕАЛЬНЫМ КОРАБЛЕМ

import { useState, useEffect, useRef, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Stars, Sphere, useGLTF, useTexture } from '@react-three/drei';
import { motion } from 'framer-motion';
import * as THREE from 'three';

// ПЛАНЕТА ФИНАНСОВ С ТЕКСТУРОЙ
function FinancePlanet() {
  const meshRef = useRef();
  const atmosphereRef = useRef();
  const cloudsRef = useRef();

  // Загружаем текстуру планеты
  const planetTexture = useTexture('/uploads/finance.jpg');

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.001; // Медленное вращение
    }
    if (cloudsRef.current) {
      cloudsRef.current.rotation.y += 0.0015; // Облака чуть быстрее
    }
    if (atmosphereRef.current) {
      atmosphereRef.current.rotation.y += 0.0005;
    }
  });

  return (
    <group>
      {/* Основная планета с текстурой */}
      <Sphere ref={meshRef} args={[2, 64, 64]} position={[0, 0, 0]}>
        <meshStandardMaterial
          map={planetTexture}
          roughness={0.7}
          metalness={0.1}
        />
      </Sphere>

      {/* Слой облаков (прозрачный) */}
      <Sphere ref={cloudsRef} args={[2.05, 32, 32]} position={[0, 0, 0]}>
        <meshStandardMaterial
          color="#ffffff"
          transparent
          opacity={0.15}
          roughness={1}
        />
      </Sphere>

      {/* Атмосфера (свечение) */}
      <Sphere ref={atmosphereRef} args={[2.15, 32, 32]} position={[0, 0, 0]}>
        <meshBasicMaterial
          color="#4A90E2"
          transparent
          opacity={0.2}
          side={THREE.BackSide}
        />
      </Sphere>

      {/* Внешнее свечение */}
      <Sphere args={[2.3, 32, 32]} position={[0, 0, 0]}>
        <meshBasicMaterial
          color="#6BB6FF"
          transparent
          opacity={0.1}
          side={THREE.BackSide}
        />
      </Sphere>

      {/* Освещение планеты */}
      <pointLight position={[5, 3, 5]} intensity={2} color="#ffffff" />
      <pointLight position={[-3, -2, 3]} intensity={0.5} color="#4A90E2" />
    </group>
  );
}

// ВАШ КОСМИЧЕСКИЙ КОРАБЛЬ
function CustomSpaceship() {
  const shipRef = useRef();
  const { scene } = useGLTF('/spaceship/scene.gltf');

  useFrame((state) => {
    const time = state.clock.elapsedTime;
    
    if (shipRef.current) {
      // Плавное движение по дуге к планете
      const progress = Math.min(time / 8, 1); // 8 секунд до подлета
      
      // Траектория: справа сверху → к планете
      shipRef.current.position.x = 6 - progress * 5;
      shipRef.current.position.y = 3 - progress * 2.5;
      shipRef.current.position.z = 8 - progress * 4;
      
      // Поворот корабля к планете
      shipRef.current.rotation.y = -Math.PI / 4 + progress * Math.PI / 4;
      shipRef.current.rotation.z = Math.sin(time * 0.5) * 0.1;
      
      // Легкое покачивание
      shipRef.current.position.y += Math.sin(time * 2) * 0.05;
    }
  });

  return (
    <group ref={shipRef}>
      <primitive 
        object={scene.clone()} 
        scale={0.3}
        rotation={[0, Math.PI, 0]}
      />
      
      {/* Свет от двигателей */}
      <pointLight position={[0, -0.5, -1]} intensity={3} color="#00BFFF" distance={4} />
      <pointLight position={[0, -0.5, -1]} intensity={2} color="#FFD700" distance={2} />
    </group>
  );
}

// ЗАГРУЗЧИК (пока модель грузится)
function LoadingSpaceship() {
  const shipRef = useRef();

  useFrame((state) => {
    const time = state.clock.elapsedTime;
    if (shipRef.current) {
      shipRef.current.position.x = Math.sin(time * 0.5) * 4 - 2;
      shipRef.current.position.y = Math.cos(time * 0.7) * 2 + 1;
      shipRef.current.position.z = 6;
      shipRef.current.rotation.y = time * 0.5;
    }
  });

  return (
    <group ref={shipRef}>
      <mesh>
        <coneGeometry args={[0.3, 0.8, 8]} />
        <meshStandardMaterial color="#C0C0C0" metalness={0.9} roughness={0.1} />
      </mesh>
      <mesh position={[0, -0.5, 0]}>
        <coneGeometry args={[0.15, 0.4, 8]} />
        <meshBasicMaterial color="#00BFFF" transparent opacity={0.8} />
      </mesh>
      <pointLight position={[0, -0.7, 0]} intensity={2} color="#00BFFF" distance={3} />
    </group>
  );
}

// КАМЕРА С ПРИБЛИЖЕНИЕМ
function CameraAnimation() {
  useFrame((state) => {
    const time = state.clock.elapsedTime;
    
    // Приближение камеры (как Google Earth)
    const targetZ = Math.max(12 - time * 0.9, 5);
    state.camera.position.z = THREE.MathUtils.lerp(
      state.camera.position.z,
      targetZ,
      0.02
    );
    
    // Легкое движение камеры для живости
    state.camera.position.x = Math.sin(time * 0.1) * 0.3;
    state.camera.position.y = Math.cos(time * 0.15) * 0.2 + 0.5;
    
    state.camera.lookAt(0, 0, 0);
  });

  return null;
}

// СЛЕД ОТ КОРАБЛЯ
function ShipTrail() {
  const trailRef = useRef();
  const points = useRef([]);
  const maxPoints = 50;

  useFrame((state) => {
    const time = state.clock.elapsedTime;
    const progress = Math.min(time / 8, 1);
    
    // Позиция корабля
    const x = 6 - progress * 5;
    const y = 3 - progress * 2.5 + Math.sin(time * 2) * 0.05;
    const z = 8 - progress * 4;
    
    // Добавляем точку следа
    points.current.push(new THREE.Vector3(x, y, z));
    
    // Ограничиваем количество точек
    if (points.current.length > maxPoints) {
      points.current.shift();
    }
    
    // Обновляем геометрию следа
    if (trailRef.current && points.current.length > 1) {
      const geometry = new THREE.BufferGeometry().setFromPoints(points.current);
      trailRef.current.geometry.dispose();
      trailRef.current.geometry = geometry;
    }
  });

  return (
    <line ref={trailRef}>
      <bufferGeometry />
      <lineBasicMaterial color="#00BFFF" transparent opacity={0.5} linewidth={2} />
    </line>
  );
}

// 3D СЦЕНА
function Scene() {
  return (
    <>
      {/* Освещение */}
      <ambientLight intensity={0.2} />
      <directionalLight position={[10, 10, 5]} intensity={1.5} color="#ffffff" />
      <directionalLight position={[-5, -5, -5]} intensity={0.3} color="#4A90E2" />
      
      {/* Звездное небо */}
      <Stars 
        radius={100} 
        depth={50} 
        count={2000} 
        factor={4} 
        saturation={0} 
        fade 
        speed={0.5}
      />
      
      {/* Планета Финансов */}
      <Suspense fallback={null}>
        <FinancePlanet />
      </Suspense>
      
      {/* Космический корабль */}
      <Suspense fallback={null}>
        <CustomSpaceship />
      </Suspense>
      
      {/* След от корабля */}
      <ShipTrail />
      
      {/* Анимация камеры */}
      <CameraAnimation />
    </>
  );
}

// ГЛАВНЫЙ КОМПОНЕНТ
function PlanetApproachAnimation({ planetName = "Планета Финансов", onComplete }) {
  const [progress, setProgress] = useState(0);
  const [showUI, setShowUI] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setShowUI(false);
            setTimeout(() => onComplete(), 500);
          }, 1000);
          return 100;
        }
        return prev + 1.2;
      });
    }, 50);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <div style={{ 
      position: 'fixed', 
      inset: 0, 
      background: '#000', 
      overflow: 'hidden',
      zIndex: 9999 
    }}>
      {/* 3D СЦЕНА */}
      <Canvas 
        camera={{ position: [0, 0.5, 12], fov: 60 }}
        style={{ width: '100%', height: '100%' }}
      >
        <Scene />
      </Canvas>

      {/* UI ОВЕРЛЕЙ */}
      {showUI && (
        <>
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ delay: 0.5, duration: 1 }}
            style={{
              position: 'absolute',
              bottom: '8%',
              left: '50%',
              transform: 'translateX(-50%)',
              textAlign: 'center',
              zIndex: 100,
              width: '90%',
              maxWidth: '700px'
            }}
          >
            {/* Заголовок */}
            <motion.div
              animate={{ scale: [1, 1.05, 1], opacity: [0.9, 1, 0.9] }}
              transition={{ duration: 2, repeat: Infinity }}
              style={{
                color: '#4A90E2',
                fontSize: '1.1rem',
                fontWeight: 700,
                marginBottom: '1.2rem',
                textTransform: 'uppercase',
                letterSpacing: '0.4em',
                textShadow: '0 0 30px rgba(74, 144, 226, 1), 0 0 60px rgba(74, 144, 226, 0.5)'
              }}
            >
              ✨ ЗАХОДИМ НА ПОСАДКУ ✨
            </motion.div>

            {/* Название планеты */}
            <h2 style={{
              color: '#FFFFFF',
              fontSize: '3.5rem',
              fontWeight: 900,
              marginBottom: '2rem',
              textShadow: '0 0 40px rgba(255, 255, 255, 0.9), 0 4px 20px rgba(0, 0, 0, 1)',
              letterSpacing: '0.05em'
            }}>
              {planetName}
            </h2>

            {/* Прогресс бар */}
            <div style={{
              width: '100%',
              height: '12px',
              background: 'rgba(0, 0, 0, 0.7)',
              borderRadius: '20px',
              overflow: 'hidden',
              border: '3px solid rgba(74, 144, 226, 0.5)',
              boxShadow: '0 0 30px rgba(74, 144, 226, 0.4)',
              marginBottom: '1rem'
            }}>
              <motion.div
                initial={{ width: '0%' }}
                animate={{ width: `${progress}%` }}
                style={{
                  height: '100%',
                  background: 'linear-gradient(90deg, #4A90E2, #6BB6FF, #4A90E2)',
                  backgroundSize: '200% 100%',
                  borderRadius: '20px',
                  boxShadow: '0 0 30px rgba(74, 144, 226, 1)',
                  animation: 'shimmer 2s infinite'
                }}
              />
              <style>
                {`
                  @keyframes shimmer {
                    0% { background-position: -200% 0; }
                    100% { background-position: 200% 0; }
                  }
                `}
              </style>
            </div>

            {/* Процент */}
            <motion.div
              animate={{ opacity: [0.7, 1, 0.7] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              style={{
                color: '#4A90E2',
                fontSize: '1.4rem',
                fontWeight: 700,
                textShadow: '0 0 25px rgba(74, 144, 226, 1)'
              }}
            >
              {Math.round(progress)}%
            </motion.div>
          </motion.div>

          {/* Инструкция */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.7 }}
            transition={{ delay: 1 }}
            style={{
              position: 'absolute',
              top: '6%',
              left: '50%',
              transform: 'translateX(-50%)',
              color: '#ffffff',
              fontSize: '0.95rem',
              textAlign: 'center',
              textShadow: '0 0 15px rgba(0, 0, 0, 1)',
              letterSpacing: '0.05em'
            }}
          >
            🌌 Приближаемся к Планете Финансов...
          </motion.div>
        </>
      )}
    </div>
  );
}

// Предзагрузка модели корабля
useGLTF.preload('/spaceship/scene.gltf');

export default PlanetApproachAnimation;