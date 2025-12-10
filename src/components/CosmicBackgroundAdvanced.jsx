import { motion } from 'framer-motion';

function CosmicBackgroundAdvanced() {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
      {/* БАЗОВЫЙ ГЛУБОКИЙ КОСМОС */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0515] via-[#1a0b2e] to-[#0f0520]" />

      {/* ЧЕРНАЯ ДЫРА - простая версия без лагов */}
      <div className="absolute top-[10%] left-[5%] w-[450px] h-[450px]" style={{ perspective: '1500px' }}>
        
        {/* Внешнее оранжевое свечение */}
        <motion.div
          className="absolute inset-[-40%] rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(255,100,0,0.2) 0%, rgba(255,69,0,0.15) 30%, rgba(180,40,0,0.1) 50%, transparent 70%)',
            filter: 'blur(80px)',
          }}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.2, 0.35, 0.2],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {/* Затягивающиеся частицы материи - МЕНЬШЕ */}
        {[...Array(25)].map((_, i) => {
          const angle = (i * 360) / 50;
          const startRadius = 220;
          const x1 = Math.cos((angle * Math.PI) / 180) * startRadius;
          const y1 = Math.sin((angle * Math.PI) / 180) * startRadius;
          
          return (
            <motion.div
              key={`matter-${i}`}
              className="absolute rounded-full"
              style={{
                width: '3px',
                height: '3px',
                left: '50%',
                top: '50%',
                background: i % 3 === 0 ? '#ff6347' : i % 3 === 1 ? '#ff4500' : '#ff8c00',
                boxShadow: `0 0 8px ${i % 3 === 0 ? '#ff6347' : i % 3 === 1 ? '#ff4500' : '#ff8c00'}`,
              }}
              animate={{
                x: [x1, x1 * 0.7, x1 * 0.45, x1 * 0.2, 0],
                y: [y1, y1 * 0.7, y1 * 0.45, y1 * 0.2, 0],
                scale: [1, 0.9, 0.7, 0.4, 0],
                opacity: [0.7, 0.8, 0.6, 0.3, 0],
              }}
              transition={{
                duration: 10,
                repeat: Infinity,
                delay: i * 0.2,
                ease: "easeIn",
              }}
            />
          );
        })}

        {/* 3D Аккреционный диск */}
        <div
          className="absolute left-1/2 top-1/2"
          style={{
            width: '450px',
            height: '450px',
            marginLeft: '-225px',
            marginTop: '-225px',
            transformStyle: 'preserve-3d',
            transform: 'rotateX(75deg)',
          }}
        >
          {/* Внешний диск */}
          <motion.div
            className="absolute inset-0 rounded-full"
            style={{
              background: 'conic-gradient(from 0deg, transparent 0%, rgba(255,69,0,0.9) 8%, rgba(255,100,0,0.8) 12%, transparent 20%, rgba(220,50,0,0.85) 32%, rgba(180,30,0,0.75) 40%, transparent 50%, rgba(255,69,0,0.8) 62%, transparent 72%, rgba(255,100,0,0.75) 88%, transparent 98%)',
              filter: 'blur(4px)',
              boxShadow: '0 30px 80px rgba(0,0,0,0.95), 0 0 60px rgba(255,69,0,0.4)',
            }}
            animate={{
              rotateZ: 360,
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "linear",
            }}
          />

          {/* Средний диск */}
          <motion.div
            className="absolute inset-[10%] rounded-full"
            style={{
              background: 'conic-gradient(from 180deg, transparent 0%, rgba(255,100,0,0.95) 12%, rgba(255,140,0,0.9) 18%, transparent 28%, rgba(255,69,0,0.9) 48%, rgba(220,50,0,0.85) 55%, transparent 68%, rgba(255,100,0,0.9) 82%, transparent 95%)',
              filter: 'blur(3px)',
              boxShadow: '0 25px 60px rgba(0,0,0,0.85), 0 0 50px rgba(255,100,0,0.3)',
            }}
            animate={{
              rotateZ: -360,
            }}
            transition={{
              duration: 15,
              repeat: Infinity,
              ease: "linear",
            }}
          />

          {/* Внутренний диск */}
          <motion.div
            className="absolute inset-[22%] rounded-full"
            style={{
              background: 'conic-gradient(from 0deg, rgba(255,140,0,1) 0%, rgba(255,165,0,0.95) 10%, transparent 18%, rgba(255,100,0,0.98) 38%, rgba(255,140,0,0.92) 45%, transparent 58%, rgba(255,69,0,0.95) 75%, rgba(255,140,0,1) 82%, transparent 92%)',
              filter: 'blur(2px)',
              boxShadow: '0 15px 40px rgba(0,0,0,0.75), 0 0 60px rgba(255,140,0,0.5)',
            }}
            animate={{
              rotateZ: 360,
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "linear",
            }}
          />

          {/* Самый яркий слой */}
          <motion.div
            className="absolute inset-[32%] rounded-full"
            style={{
              background: 'conic-gradient(from 90deg, rgba(255,165,0,1) 0%, rgba(255,200,100,0.95) 15%, transparent 25%, rgba(255,140,0,1) 50%, rgba(255,165,0,0.95) 58%, transparent 70%, rgba(255,200,100,0.9) 88%, transparent 100%)',
              filter: 'blur(1.5px)',
              boxShadow: '0 0 80px rgba(255,140,0,0.6)',
            }}
            animate={{
              rotateZ: 360,
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        </div>

        {/* Черная сфера */}
        <motion.div 
          className="absolute inset-[35%] rounded-full" 
          style={{
            background: '#000000',
            boxShadow: `
              0 0 60px 10px rgba(255,69,0,0.3),
              0 0 40px 5px rgba(180,30,0,0.4),
              inset -25px -25px 60px rgba(0,0,0,1),
              inset 20px 20px 30px rgba(0,0,0,1)
            `,
            zIndex: 20,
          }}
          animate={{
            boxShadow: [
              '0 0 60px 10px rgba(255,69,0,0.3), 0 0 40px 5px rgba(180,30,0,0.4), inset -25px -25px 60px rgba(0,0,0,1), inset 20px 20px 30px rgba(0,0,0,1)',
              '0 0 80px 12px rgba(255,100,0,0.4), 0 0 50px 7px rgba(220,50,0,0.5), inset -25px -25px 60px rgba(0,0,0,1), inset 20px 20px 30px rgba(0,0,0,1)',
              '0 0 60px 10px rgba(255,69,0,0.3), 0 0 40px 5px rgba(180,30,0,0.4), inset -25px -25px 60px rgba(0,0,0,1), inset 20px 20px 30px rgba(0,0,0,1)',
            ],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>

      {/* ЯРКАЯ ТУМАННОСТЬ - ЕЩЕ ВЫШЕ */}
      <div className="absolute top-[8%] right-[3%] w-[700px] h-[550px]">
        
        {/* Массивное внешнее свечение */}
        <motion.div
          className="absolute inset-[-20%]"
          style={{
            background: 'radial-gradient(ellipse at 45% 50%, rgba(255,100,120,0.4) 0%, rgba(180,80,200,0.35) 25%, rgba(100,150,255,0.3) 50%, transparent 75%)',
            filter: 'blur(60px)',
          }}
          animate={{
            scale: [1, 1.12, 1],
            opacity: [0.4, 0.6, 0.4],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {/* ЯРКИЕ оранжево-розовые облака */}
        <motion.div
          className="absolute top-[15%] left-[10%] w-[55%] h-[45%]"
          style={{
            background: 'radial-gradient(ellipse, rgba(255,120,60,0.9) 0%, rgba(255,80,40,0.8) 20%, rgba(220,70,50,0.65) 40%, rgba(180,60,40,0.4) 60%, transparent 80%)',
            filter: 'blur(25px)',
            borderRadius: '60% 40% 55% 45%',
            boxShadow: '0 0 80px rgba(255,100,50,0.6)',
          }}
          animate={{
            rotate: [0, 8, -8, 0],
            scale: [1, 1.08, 0.98, 1],
            opacity: [0.9, 1, 0.9],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {/* Яркие розовые области */}
        <motion.div
          className="absolute top-[20%] left-[20%] w-[40%] h-[35%]"
          style={{
            background: 'radial-gradient(ellipse, rgba(255,100,150,0.85) 0%, rgba(230,80,140,0.7) 30%, rgba(200,60,120,0.5) 55%, transparent 75%)',
            filter: 'blur(20px)',
            borderRadius: '50% 60% 45% 55%',
          }}
          animate={{
            scale: [1, 1.06, 1],
            opacity: [0.85, 1, 0.85],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1,
          }}
        />

        {/* ЯРКИЕ голубые газовые структуры */}
        <motion.div
          className="absolute top-[30%] right-[8%] w-[50%] h-[55%]"
          style={{
            background: 'radial-gradient(ellipse, rgba(100,200,255,0.85) 0%, rgba(80,170,240,0.75) 25%, rgba(60,140,220,0.6) 45%, rgba(50,120,180,0.4) 65%, transparent 80%)',
            filter: 'blur(22px)',
            borderRadius: '50% 65% 40% 60%',
            boxShadow: '0 0 70px rgba(100,180,255,0.5)',
          }}
          animate={{
            rotate: [0, -10, 10, 0],
            scale: [1, 1.1, 0.96, 1],
            opacity: [0.85, 1, 0.85],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2,
          }}
        />

        {/* Фиолетовые пылевые столбы */}
        <motion.div
          className="absolute top-[12%] left-[32%] w-[35%] h-[60%]"
          style={{
            background: 'linear-gradient(180deg, rgba(200,100,240,0.7) 0%, rgba(160,80,200,0.65) 30%, rgba(120,60,160,0.5) 60%, rgba(80,40,120,0.3) 85%, transparent 100%)',
            filter: 'blur(18px)',
            borderRadius: '40% 40% 65% 65%',
          }}
          animate={{
            scaleY: [1, 1.12, 1],
            opacity: [0.7, 0.9, 0.7],
          }}
          transition={{
            duration: 14,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 0.5,
          }}
        />

        {/* ОЧЕНЬ ЯРКИЕ звездообразующие области */}
        <motion.div
          className="absolute top-[25%] left-[22%] w-[28%] h-[32%]"
          style={{
            background: 'radial-gradient(circle, rgba(255,240,200,1) 0%, rgba(255,200,140,0.95) 25%, rgba(255,160,100,0.8) 50%, rgba(255,120,60,0.5) 70%, transparent 85%)',
            filter: 'blur(12px)',
            boxShadow: '0 0 60px rgba(255,200,140,0.9)',
          }}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [1, 1, 1],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        <motion.div
          className="absolute top-[42%] right-[22%] w-[25%] h-[28%]"
          style={{
            background: 'radial-gradient(circle, rgba(220,240,255,0.95) 0%, rgba(180,210,250,0.85) 30%, rgba(140,180,230,0.7) 55%, rgba(100,150,200,0.4) 75%, transparent 90%)',
            filter: 'blur(10px)',
            boxShadow: '0 0 50px rgba(180,220,255,0.8)',
          }}
          animate={{
            scale: [1, 1.18, 1],
            opacity: [0.95, 1, 0.95],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1.5,
          }}
        />

        {/* Темные пылевые прожилки */}
        <motion.div
          className="absolute top-[22%] left-[15%] w-[60%] h-[10%]"
          style={{
            background: 'linear-gradient(90deg, transparent 0%, rgba(30,20,40,0.8) 25%, rgba(20,10,30,0.9) 50%, rgba(30,20,40,0.75) 75%, transparent 100%)',
            filter: 'blur(6px)',
            transform: 'rotate(-18deg)',
          }}
          animate={{
            x: [0, 12, 0],
            opacity: [0.8, 1, 0.8],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        <motion.div
          className="absolute top-[48%] left-[10%] w-[65%] h-[8%]"
          style={{
            background: 'linear-gradient(90deg, transparent 0%, rgba(25,15,35,0.75) 20%, rgba(15,5,25,0.85) 50%, rgba(25,15,35,0.7) 80%, transparent 100%)',
            filter: 'blur(5px)',
            transform: 'rotate(15deg)',
          }}
          animate={{
            x: [0, -10, 0],
            opacity: [0.75, 0.95, 0.75],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2.5,
          }}
        />

        {/* Яркие звёзды - МЕНЬШЕ */}
        {[...Array(30)].map((_, i) => {
          const size = Math.random() * 3 + 1.5;
          const x = Math.random() * 85 + 7;
          const y = Math.random() * 85 + 7;
          const colors = ['#ffffff', '#ffffcc', '#ccddff', '#ffccee'];
          const color = colors[Math.floor(Math.random() * colors.length)];
          
          return (
            <motion.div
              key={`star-${i}`}
              className="absolute rounded-full"
              style={{
                width: `${size}px`,
                height: `${size}px`,
                left: `${x}%`,
                top: `${y}%`,
                background: color,
                boxShadow: `0 0 ${size * 4}px ${color}, 0 0 ${size * 8}px ${color}`,
              }}
              animate={{
                opacity: [0.4, 1, 0.4],
              }}
              transition={{
                duration: Math.random() * 3 + 2,
                repeat: Infinity,
                ease: "easeInOut",
                delay: Math.random() * 4,
              }}
            />
          );
        })}

        {/* Светящиеся газовые волокна */}
        <motion.div
          className="absolute top-[35%] left-[25%] w-[45%] h-[3%]"
          style={{
            background: 'linear-gradient(90deg, transparent 0%, rgba(100,180,255,0.7) 30%, rgba(150,200,255,0.8) 50%, rgba(100,180,255,0.7) 70%, transparent 100%)',
            filter: 'blur(4px)',
            boxShadow: '0 0 20px rgba(120,190,255,0.8)',
            transform: 'rotate(-25deg)',
          }}
          animate={{
            scaleX: [1, 1.1, 1],
            opacity: [0.7, 0.95, 0.7],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>

      {/* ЗВЕЗДЫ НА ФОНЕ - меньше для производительности */}
      {[...Array(80)].map((_, i) => {
        const size = Math.random() * 2 + 0.5;
        const x = Math.random() * 100;
        const y = Math.random() * 100;
        const duration = Math.random() * 4 + 3;
        
        return (
          <motion.div
            key={`star-bg-${i}`}
            className="absolute rounded-full bg-white"
            style={{
              width: `${size}px`,
              height: `${size}px`,
              left: `${x}%`,
              top: `${y}%`,
              boxShadow: `0 0 ${size * 2}px rgba(255,255,255,0.5)`,
            }}
            animate={{
              opacity: [0.3, 0.8, 0.3],
            }}
            transition={{
              duration: duration,
              repeat: Infinity,
              ease: "easeInOut",
              delay: Math.random() * 5,
            }}
          />
        );
      })}

      {/* ПАДАЮЩИЕ МЕТЕОРИТЫ - меньше */}
      {[...Array(3)].map((_, i) => {
        const startX = Math.random() * 100;
        const startY = -10;
        const endX = startX + 40;
        const endY = 50;
        
        return (
          <motion.div
            key={`meteor-${i}`}
            className="absolute"
            style={{
              left: `${startX}%`,
              top: `${startY}%`,
              width: '2px',
              height: '2px',
            }}
            animate={{
              x: [`0%`, `${endX - startX}vw`],
              y: [`0%`, `${endY - startY}vh`],
              opacity: [0, 1, 1, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeIn",
              delay: i * 5,
              repeatDelay: 15,
            }}
          >
            <div
              className="rounded-full bg-white"
              style={{
                width: '2px',
                height: '2px',
                boxShadow: '0 0 6px rgba(255,255,255,0.8)',
              }}
            />
            <div
              className="absolute"
              style={{
                width: '40px',
                height: '1px',
                background: 'linear-gradient(90deg, rgba(255,255,255,0.7) 0%, transparent 100%)',
                filter: 'blur(1px)',
                transform: 'rotate(-35deg)',
                left: '-40px',
              }}
            />
          </motion.div>
        );
      })}

      {/* КОСМИЧЕСКАЯ ПЫЛЬ - меньше */}
      {[...Array(15)].map((_, i) => {
        const size = Math.random() * 2.5 + 0.5;
        return (
          <motion.div
            key={`dust-${i}`}
            className="absolute rounded-full bg-white/10"
            style={{
              width: `${size}px`,
              height: `${size}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              filter: 'blur(1px)',
            }}
            animate={{
              x: [0, Math.random() * 60 - 30, 0],
              y: [0, Math.random() * 60 - 30, 0],
              opacity: [0.1, 0.35, 0.1],
            }}
            transition={{
              duration: Math.random() * 35 + 25,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        );
      })}

      {/* МЯГКОЕ ОБЩЕЕ СВЕЧЕНИЕ */}
      <motion.div
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse at 50% 45%, rgba(120, 100, 200, 0.04) 0%, transparent 65%)',
        }}
        animate={{
          opacity: [0.04, 0.09, 0.04],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    </div>
  );
}

export default CosmicBackgroundAdvanced;