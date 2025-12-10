import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Map, Beaker, BookOpen, User, Radio, LogOut } from 'lucide-react';
import CosmicBackgroundAdvanced from '../components/CosmicBackgroundAdvanced';
import { useUser } from '../contexts/UserContext';
import { xpToNextLevel, progressToNextLevel } from '../utils/storage';
import { useGlitch, GLITCH_TIPS } from '../contexts/GlitchContext';
import Glitch from '../components/Glitch';
import { useLanguage } from '../contexts/LanguageContext';
import LanguageSwitcher from '../components/LanguageSwitcher';

function Dashboard() {
  const navigate = useNavigate();
  const { user, loading, logout } = useUser();
  const { showTip, wasTipShown, setCurrentPage } = useGlitch();
  const { t } = useLanguage();

  // Устанавливаем текущую страницу
  useEffect(() => {
    setCurrentPage('dashboard');
  }, [setCurrentPage]);

  // Глюк приветствие при первом визите
  useEffect(() => {
    if (!loading && user) {
      const timer = setTimeout(() => {
        if (!wasTipShown('dashboard_welcome')) {
          showTip('dashboard_welcome', GLITCH_TIPS.dashboard_welcome);
        }
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [loading, user, showTip, wasTipShown]);

  // Функция выхода
  const handleLogout = () => {
    logout();
    navigate('/');
  };

  // Конфигурация размеров голограмм
  const getSizeConfig = (size) => {
    const configs = {
      xl: { width: 240, height: 280, iconSize: 80 },
      lg: { width: 200, height: 240, iconSize: 64 },
      md: { width: 180, height: 220, iconSize: 56 },
      sm: { width: 160, height: 200, iconSize: 48 }
    };
    return configs[size] || configs.md;
  };

  // Секции дашборда
  const sections = [
    {
      id: 'map',
      title: t('dashboard.mission_map'),
      description: t('dashboard.mission_map_desc'),
      icon: Map,
      path: '/mission-map',
      size: 'xl',
      position: { x: '15%', y: '20%' },
      delay: 0.2,
      color: '#3b82f6' // Яркий синий
    },
    {
      id: 'lab',
      title: t('dashboard.laboratory'),
      description: t('dashboard.laboratory_desc'),
      icon: Beaker,
      path: '/lab',
      size: 'lg',
      position: { x: '70%', y: '15%' },
      delay: 0.4,
      color: '#8b5cf6' // Яркий фиолетовый
    },
    {
      id: 'library',
      title: t('dashboard.library'),
      description: t('dashboard.library_desc'),
      icon: BookOpen,
      path: '/library',
      size: 'md',
      position: { x: '25%', y: '65%' },
      delay: 0.6,
      color: '#10b981' // Яркий зеленый
    },
    {
      id: 'profile',
      title: t('dashboard.profile'),
      description: t('dashboard.profile_desc'),
      icon: User,
      path: '/profile',
      size: 'md',
      position: { x: '65%', y: '70%' },
      delay: 0.8,
      color: '#f59e0b' // Яркий оранжевый
    },
    {
      id: 'parent',
      title: t('dashboard.parents_panel'),
      description: t('dashboard.parents_panel_desc'),
      icon: Radio,
      path: '/parent-dashboard',
      size: 'sm',
      position: { x: '85%', y: '50%' },
      delay: 1.0,
      color: '#ec4899' // Яркий розовый
    }
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <CosmicBackgroundAdvanced />
        <div className="text-2xl font-bold">Загрузка...</div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <CosmicBackgroundAdvanced />
        <div className="text-center">
          <h1 className="text-3xl font-black mb-4">Нет доступа</h1>
          <button
            onClick={() => navigate('/login')}
            className="px-8 py-3 bg-yellow-400 text-black font-black rounded-full hover:bg-yellow-300 transition-all"
          >
            Войти
          </button>
        </div>
      </div>
    );
  }

  const xpNext = xpToNextLevel(user.xp);
  const progress = progressToNextLevel(user.xp);

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden">
      <CosmicBackgroundAdvanced />

      {/* TOP BAR */}
      <motion.div 
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="fixed top-0 left-0 right-0 z-40 px-8 py-6"
      >
        <div className="max-w-[2000px] mx-auto flex items-center justify-between">
          
          {/* Left: User Info */}
          <div className="flex items-center gap-6">
            <motion.div 
              whileHover={{ scale: 1.05 }}
              className="w-20 h-20 rounded-full flex items-center justify-center text-4xl border-2 border-white/10 cursor-pointer"
              style={{ backgroundColor: user.avatarColor || '#fbbf24' }}
              onClick={() => navigate('/profile')}
            >
              {user.avatar || '🚀'}
            </motion.div>
            
            <div>
              <div className="text-2xl font-black mb-1">{user.username}</div>
              <div className="flex items-center gap-4 text-sm text-gray-400">
                <span>{t.level} {user.level}</span>
                <span>•</span>
                <span>{user.stats.totalMissions} {t.missions}</span>
              </div>
            </div>

            {/* XP Progress */}
            <div className="ml-8 w-48">
              <div className="flex items-center justify-between text-xs text-gray-400 mb-1">
                <span>{user.xp}</span>
                <span>{user.xp + xpNext}</span>
              </div>
              <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 1, delay: 0.5 }}
                  className="h-full bg-cyan-400 rounded-full"
                />
              </div>
            </div>
          </div>

          {/* Right: Stats & Actions */}
          <div className="flex items-center gap-8">
            {/* Stats */}
            <div className="flex items-center gap-6 text-right">
              <div>
                <div className="text-2xl font-black text-cyan-400">{user.xp}</div>
                <div className="text-xs text-gray-400">{t.xp}</div>
              </div>
              <div className="w-px h-10 bg-white/20" />
              <div>
                <div className="text-2xl font-black text-yellow-400">{user.coins}</div>
                <div className="text-xs text-gray-400">{t.coins}</div>
              </div>
            </div>

            {/* Language Switcher */}
            <LanguageSwitcher />

            {/* Logout */}
            <button
              onClick={handleLogout}
              className="w-12 h-12 rounded-full bg-white/5 backdrop-blur-xl flex items-center justify-center hover:bg-red-500/20 transition-all border border-white/10"
            >
              <LogOut className="w-5 h-5" />
            </button>
          </div>
        </div>
      </motion.div>

      {/* HOLOGRAM SPACE */}
      <div className="relative w-full h-screen pt-32">
        <div className="relative w-full h-full max-w-[2000px] mx-auto">
          
          {/* Holograms */}
          {sections.map((section, index) => {
            const Icon = section.icon;
            const config = getSizeConfig(section.size);
            
            return (
              <motion.div
                key={section.id}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ 
                  delay: section.delay, 
                  type: 'spring',
                  stiffness: 100,
                  damping: 15
                }}
                className="absolute"
                style={{
                  left: section.position.x,
                  top: section.position.y,
                  transform: 'translate(-50%, -50%)',
                  zIndex: 10
                }}
              >
                {/* Floating Animation */}
                <motion.div
                  animate={{
                    y: [0, -12, 0],
                  }}
                  transition={{
                    duration: 3.5 + index * 0.5,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  {/* Hologram Button */}
                  <motion.button
                    whileHover={{ 
                      scale: 1.08,
                      transition: { duration: 0.3 }
                    }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => navigate(section.path)}
                    className="relative cursor-pointer group"
                  >
                    {/* Hologram Projector Base */}
                    <div 
                      className="absolute bottom-0 left-1/2 -translate-x-1/2"
                      style={{ 
                        width: config.projectorSize,
                        height: 8,
                        transform: 'translateX(-50%) translateZ(0) perspective(500px) rotateX(60deg)',
                        zIndex: 5
                      }}
                    >
                      <div 
                        className="w-full h-full rounded-full opacity-40"
                        style={{ 
                          backgroundColor: section.color,
                          boxShadow: `0 0 30px ${section.color}`
                        }}
                      />
                    </div>

                    {/* Light Beam */}
                    <div 
                      className="absolute bottom-0 left-1/2 -translate-x-1/2 pointer-events-none"
                      style={{
                        width: 2,
                        height: config.height + 20,
                        background: `linear-gradient(180deg, ${section.color}00, ${section.color}60, ${section.color}00)`,
                        filter: 'blur(2px)',
                        zIndex: 1
                      }}
                    />

                    {/* Hologram Panel */}
                    <div 
                      className="relative backdrop-blur-sm rounded-lg overflow-hidden"
                      style={{ 
                        width: config.width,
                        height: config.height,
                        backgroundColor: `${section.color}05`,
                        border: `1px solid ${section.color}20`,
                        zIndex: 10
                      }}
                    >
                      {/* Scan Lines Effect */}
                      <div 
                        className="absolute inset-0 pointer-events-none"
                        style={{
                          backgroundImage: `repeating-linear-gradient(
                            0deg,
                            ${section.color}20 0px,
                            transparent 1px,
                            transparent 2px,
                            ${section.color}20 3px
                          )`,
                          opacity: 0.3
                        }}
                      />

                      {/* Moving Scan Line */}
                      <motion.div
                        className="absolute inset-0"
                        animate={{
                          y: ['-100%', '200%']
                        }}
                        transition={{
                          duration: 4,
                          repeat: Infinity,
                          ease: "linear",
                          repeatDelay: 1
                        }}
                        style={{
                          background: `linear-gradient(180deg, transparent, ${section.color}40, transparent)`,
                          height: '20%',
                          filter: 'blur(4px)'
                        }}
                      />

                      {/* Content */}
                      <div className="relative z-10 h-full flex flex-col items-center justify-center p-4">
                        {/* Icon */}
                        <motion.div
                          animate={{
                            opacity: [0.6, 1, 0.6]
                          }}
                          transition={{
                            duration: 2.5,
                            repeat: Infinity,
                            ease: "easeInOut"
                          }}
                        >
                          <Icon 
                            style={{ 
                              color: section.color,
                              width: config.iconSize,
                              height: config.iconSize,
                              filter: `drop-shadow(0 0 8px ${section.color})`
                            }}
                          />
                        </motion.div>

                        {/* Text */}
                        <div className="mt-3 text-center">
                          <div 
                            className="text-base font-black mb-1"
                            style={{ 
                              color: section.color,
                              textShadow: `0 0 10px ${section.color}80`
                            }}
                          >
                            {section.title}
                          </div>
                          <div 
                            className="text-xs opacity-60"
                            style={{ color: section.color }}
                          >
                            {section.description}
                          </div>
                        </div>
                      </div>

                      {/* Corner Brackets */}
                      <div 
                        className="absolute top-1 left-1 w-2 h-2 border-t border-l opacity-40"
                        style={{ borderColor: section.color }}
                      />
                      <div 
                        className="absolute top-1 right-1 w-2 h-2 border-t border-r opacity-40"
                        style={{ borderColor: section.color }}
                      />
                      <div 
                        className="absolute bottom-1 left-1 w-2 h-2 border-b border-l opacity-40"
                        style={{ borderColor: section.color }}
                      />
                      <div 
                        className="absolute bottom-1 right-1 w-2 h-2 border-b border-r opacity-40"
                        style={{ borderColor: section.color }}
                      />

                      {/* Hover Glow */}
                      <div 
                        className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-300 pointer-events-none"
                        style={{ 
                          backgroundColor: section.color,
                          filter: 'blur(15px)'
                        }}
                      />
                    </div>
                  </motion.button>
                </motion.div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Глюк - AI помощник (всегда справа снизу) */}
      <Glitch />
    </div>
  );
}

export default Dashboard;