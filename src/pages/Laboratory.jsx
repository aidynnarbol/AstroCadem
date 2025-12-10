import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import {
  ArrowLeft, Sparkles, Shield, Rocket, Lock, Zap
} from 'lucide-react';

function Laboratory() {
  const navigate = useNavigate();

  const tools = [
    {
      id: 'finance-core',
      title: 'ФИНАНСЫ',
      description: 'Управление бюджетом, копилка целей, сравнение цен.',
      path: '/lab/finance',
      color: '#4dd0e1',
      icon: Rocket,
      position: { top: '56%', left: '56%' },
      locked: false
    },
    {
      id: 'cyber-drill',
      title: 'КИБЕР-ЩИТ',
      description: 'Скоро... защита станции и баланс энергии.',
      path: null,
      color: '#a78bfa',
      icon: Shield,
      position: { top: '63%', left: '41%' },
      locked: true
    },
    {
      id: 'logistics',
      title: 'ЛОГИСТИКА',
      description: 'Скоро... маршруты снабжения и экономия ресурса.',
      path: null,
      color: '#fbbf24',
      icon: Zap,
      position: { top: '63%', left: '63%' },
      locked: true
    },
    {
      id: 'terraform',
      title: 'ТЕРРАФОРМ',
      description: 'Скоро... план базы: цели, сроки, ресурсы.',
      path: null,
      color: '#34d399',
      icon: Rocket,
      position: { top: '40%', left: '52%' },
      locked: true
    }
  ];

  const [hovered, setHovered] = useState(null);

  return (
    <div className="min-h-screen text-white relative overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ 
          backgroundImage: `url('/uploads/lab-hub.jpg')`, 
          filter: 'brightness(0.85)' 
        }}
      />
      <div className="absolute inset-0 bg-black/30" />

      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(77,208,225,0.06),transparent_60%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:100px_100px]" />
      </div>

      <div className="relative z-20 min-h-screen px-6 pb-12 lg:px-14">
        <div className="flex items-center justify-between pt-8 mb-6">
          <motion.button
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            onClick={() => navigate('/dashboard')}
            className="flex items-center gap-2 text-white/80 hover:text-white transition-colors font-bold"
          >
            <ArrowLeft className="w-5 h-5" />
            На станцию
          </motion.button>

          <div className="hidden sm:flex items-center gap-2 text-sm text-white/60">
            <Sparkles className="w-4 h-4 text-cyan-200" />
            Лаборатория практики: финансы, кибер, логистика, базы
          </div>
        </div>

        <div className="relative w-full max-w-6xl mx-auto" style={{ height: '75vh' }}>
          {tools.map((tool, index) => {
            const Icon = tool.icon;
            const locked = tool.locked;
            return (
              <motion.button
                key={tool.id}
                onMouseEnter={() => setHovered(tool)}
                onMouseLeave={() => setHovered(null)}
                onClick={() => {
                  if (!locked && tool.path) navigate(tool.path);
                }}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 + index * 0.1, type: 'spring', stiffness: 200 }}
                className="absolute cursor-pointer"
                style={{
                  top: tool.position.top,
                  left: tool.position.left,
                  transform: 'translate(-50%, -50%)'
                }}
              >
                <div className="relative">
                  <motion.div
                    className="absolute inset-0 rounded-full"
                    style={{
                      width: '60px',
                      height: '60px',
                      background: `radial-gradient(circle, ${tool.color}40, transparent 70%)`,
                      left: '50%',
                      top: '50%',
                      transform: 'translate(-50%, -50%)'
                    }}
                    animate={{
                      scale: locked ? [1, 1.2, 1] : [1, 1.4, 1],
                      opacity: locked ? [0.3, 0.5, 0.3] : [0.5, 0.8, 0.5]
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  />
                  
                  <motion.div
                    className={`relative rounded-full flex items-center justify-center shadow-lg ${
                      locked 
                        ? 'bg-gray-600/60 border-2 border-gray-400/40' 
                        : 'border-2'
                    }`}
                    style={{
                      width: '24px',
                      height: '24px',
                      backgroundColor: locked ? undefined : `${tool.color}90`,
                      borderColor: locked ? undefined : tool.color,
                      boxShadow: locked ? undefined : `0 0 20px ${tool.color}80, 0 0 40px ${tool.color}40`
                    }}
                    whileHover={{ 
                      scale: 1.3,
                      boxShadow: locked ? undefined : `0 0 30px ${tool.color}, 0 0 60px ${tool.color}60`
                    }}
                    transition={{ type: 'spring', stiffness: 400 }}
                  >
                    {locked ? (
                      <Lock className="w-3 h-3 text-gray-300" />
                    ) : (
                      <motion.div
                        animate={{
                          scale: [1, 1.2, 1],
                        }}
                        transition={{
                          duration: 1.5,
                          repeat: Infinity,
                          ease: "easeInOut"
                        }}
                      >
                        <div 
                          className="w-2 h-2 rounded-full" 
                          style={{ backgroundColor: '#fff' }}
                        />
                      </motion.div>
                    )}
                  </motion.div>
                </div>
              </motion.button>
            );
          })}

          <AnimatePresence>
            {hovered && (
              <motion.div
                key={hovered.id}
                initial={{ opacity: 0, y: 15, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 15, scale: 0.95 }}
                transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                className="absolute left-1/2 top-[18%] -translate-x-1/2 w-full max-w-xl px-6 py-5 rounded-2xl backdrop-blur-xl bg-black/75 border border-white/20 shadow-[0_25px_70px_rgba(0,0,0,0.6)]"
              >
                <div className="flex items-start gap-4">
                  {(() => {
                    const InfoIcon = hovered.locked ? Lock : hovered.icon;
                    return (
                      <motion.div
                        initial={{ scale: 0.8 }}
                        animate={{ scale: 1 }}
                        className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                        style={{ 
                          background: `${hovered.color}20`,
                          boxShadow: `0 0 20px ${hovered.color}40`
                        }}
                      >
                        <InfoIcon className="w-6 h-6" style={{ color: hovered.color }} />
                      </motion.div>
                    );
                  })()}
                  <div className="flex-1">
                    <div className="text-xs uppercase tracking-[0.25em] text-white/50 mb-1">МОДУЛЬ</div>
                    <div className="text-2xl font-black mb-2" style={{ color: hovered.color }}>
                      {hovered.title}
                    </div>
                    <p className="text-white/70 text-sm leading-relaxed">{hovered.description}</p>
                  </div>
                  <div className="text-[10px] uppercase tracking-widest text-white/40 mt-1">
                    {hovered.locked ? 'Закрыто' : 'Активно'}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

export default Laboratory;