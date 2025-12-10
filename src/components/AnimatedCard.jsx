import { motion } from 'framer-motion';
import { useState } from 'react';

function AnimatedCard({ 
  children, 
  className = '', 
  glowColor = 'rgba(250,204,21,0.5)',
  delay = 0,
  hoverScale = 1.02,
  ...props 
}) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.6,
        delay: delay,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
      whileHover={{ 
        scale: hoverScale,
        y: -8,
        transition: { duration: 0.3, ease: "easeOut" }
      }}
      whileTap={{ scale: 0.98 }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`relative overflow-hidden ${className}`}
      {...props}
    >
      {/* Светящийся эффект от мыши */}
      {isHovered && (
        <motion.div
          className="absolute rounded-full blur-3xl pointer-events-none"
          style={{
            width: '300px',
            height: '300px',
            left: mousePosition.x - 150,
            top: mousePosition.y - 150,
            background: `radial-gradient(circle, ${glowColor} 0%, transparent 70%)`,
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.3 }}
          transition={{ duration: 0.3 }}
        />
      )}

      {/* Блеск по краям при ховере */}
      <motion.div
        className="absolute inset-0 rounded-3xl"
        initial={{ opacity: 0 }}
        animate={{ opacity: isHovered ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        style={{
          background: `linear-gradient(135deg, ${glowColor.replace('0.5', '0.2')} 0%, transparent 50%, ${glowColor.replace('0.5', '0.2')} 100%)`,
        }}
      />

      {/* Анимированная рамка */}
      <motion.div
        className="absolute inset-0 rounded-3xl"
        style={{
          background: `linear-gradient(90deg, transparent, ${glowColor.replace('0.5', '0.6')}, transparent)`,
          backgroundSize: '200% 100%',
        }}
        animate={isHovered ? {
          backgroundPosition: ['0% 0%', '200% 0%'],
        } : {}}
        transition={{
          duration: 2,
          repeat: isHovered ? Infinity : 0,
          ease: "linear",
        }}
      />

      {/* Частицы при ховере */}
      {isHovered && [...Array(5)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-white rounded-full pointer-events-none"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          initial={{ opacity: 0, scale: 0 }}
          animate={{
            opacity: [0, 1, 0],
            scale: [0, 1.5, 0],
            y: [0, -50],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            delay: i * 0.2,
          }}
        />
      ))}

      {/* Контент */}
      <div className="relative z-10">
        {children}
      </div>
    </motion.div>
  );
}

export default AnimatedCard;