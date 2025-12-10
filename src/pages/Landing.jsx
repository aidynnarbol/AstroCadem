import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Rocket, Sparkles, ChevronRight, ArrowRight, Globe } from 'lucide-react';
import { motion, useScroll, useTransform } from 'framer-motion';
import CosmicBackgroundAdvanced from '../components/CosmicBackgroundAdvanced';
import { useGlitch } from '../contexts/GlitchContext';
import Glitch from '../components/Glitch';

function Landing() {
  const navigate = useNavigate();
  const { showTip, wasTipShown, setCurrentPage } = useGlitch();
  
  // Устанавливаем текущую страницу
  useEffect(() => {
    setCurrentPage('landing');
  }, [setCurrentPage]);
  
  const [language, setLanguage] = useState('ru');
  const [showLanguages, setShowLanguages] = useState(false);
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.2], [1, 0.8]);

  // Приветствие Глюка на главной
  useEffect(() => {
    const timer = setTimeout(() => {
      if (!wasTipShown('landing_welcome')) {
        showTip('landing_welcome', {
          id: 'landing_welcome',
          title: '🚀 Добро пожаловать в FinSmart!',
          message: 'Я Глюк - твой AI-помощник! Здесь ты научишься финансовой грамотности, кибербезопасности и критическому мышлению через космическое приключение! Готов начать? 🌟',
          buttons: [
            { text: 'Начать приключение!', action: 'dismiss' }
          ]
        });
      }
    }, 2000);

    return () => clearTimeout(timer);
  }, [showTip, wasTipShown]);

  const content = {
    ru: {
      hero: {
        preTitle: 'Образовательная платформа',
        title: 'AstroCadem',
        subtitle: 'Космическое путешествие в мир финансов, технологий и критического мышления',
        cta: 'Начать бесплатно',
        learnMore: 'Узнать больше',
        scroll: 'Листай вниз'
      },
      journey: {
        title: 'Твоё космическое путешествие',
        subtitle: 'начинается здесь',
        step1: {
          number: '01',
          title: 'Регистрация',
          desc: 'Создай свой профиль космонавта за одну минуту'
        },
        step2: {
          number: '02',
          title: 'Знакомство с Кораблём',
          desc: 'Исследуй свою базу и познакомься с AI-помощником'
        },
        step3: {
          number: '03',
          title: 'Путешествие по вселенным',
          desc: 'Выбери планету и начни своё приключение'
        },
        step4: {
          number: '04',
          title: 'Обучение навыкам',
          desc: 'Проходи сюжеты, решай задачи и получай награды'
        }
      },
      quick: {
        title: 'Быстрые факты',
        users: '15+',
        usersLabel: 'Учеников',
        missions: '19',
        missionsLabel: 'Миссий',
        planets: '4',
        planetsLabel: 'Планеты',
        free: '100%',
        freeLabel: 'Бесплатно'
      },
      cta: {
        title: 'Начни своё приключение',
        subtitle: 'Присоединяйся к тысячам учеников',
        button: 'Регистрация бесплатна',
        learn: 'Узнать больше о платформе'
      }
    },
    kk: {
      hero: {
        preTitle: 'Білім беру платформасы',
        title: 'AstroCadem',
        subtitle: 'Қаржы, технология және сыни ойлау әлеміне ғарыштық саяхат',
        cta: 'Тегін бастау',
        learnMore: 'Толығырақ',
        scroll: 'Төмен айналдыр'
      }
    },
    en: {
      hero: {
        preTitle: 'Educational platform',
        title: 'AstroCadem',
        subtitle: 'A cosmic journey into the world of finance, technology and critical thinking',
        cta: 'Start for free',
        learnMore: 'Learn more',
        scroll: 'Scroll down'
      }
    }
  };

  const t = content[language];

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden">
      <CosmicBackgroundAdvanced />

      {/* FLOATING NAV */}
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="fixed top-8 left-1/2 -translate-x-1/2 z-50 px-8 py-4 bg-white/5 backdrop-blur-2xl rounded-full border border-white/10"
      >
        <div className="flex items-center gap-8">
          <div className="text-2xl font-black text-yellow-400">
            AstroCadem
          </div>
          <div className="h-6 w-px bg-white/20" />
          <button 
            onClick={() => navigate('/about')}
            className="text-gray-400 hover:text-white transition-colors font-semibold"
          >
            О нас
          </button>
          <button 
            onClick={() => navigate('/login')}
            className="text-gray-400 hover:text-white transition-colors font-semibold"
          >
            Вход
          </button>
        </div>
      </motion.nav>

      {/* LANGUAGE SWITCHER - CORNER */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        onMouseEnter={() => setShowLanguages(true)}
        onMouseLeave={() => setShowLanguages(false)}
        className="fixed top-8 right-8 z-50"
      >
        <div className="relative">
          {/* Current language */}
          <motion.div
            className="w-12 h-12 rounded-full bg-yellow-400 text-black font-black flex items-center justify-center cursor-pointer text-sm"
            whileHover={{ scale: 1.1 }}
          >
            {language.toUpperCase()}
          </motion.div>

          {/* Dropdown */}
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ 
              opacity: showLanguages ? 1 : 0,
              y: showLanguages ? 0 : -10,
              scale: showLanguages ? 1 : 0.95
            }}
            className={`absolute top-16 right-0 bg-white/10 backdrop-blur-2xl rounded-2xl border border-white/20 overflow-hidden ${
              showLanguages ? 'pointer-events-auto' : 'pointer-events-none'
            }`}
          >
            {['ru', 'kk', 'en'].filter(lang => lang !== language).map((lang) => (
              <button
                key={lang}
                onClick={() => setLanguage(lang)}
                className="block w-full px-6 py-3 text-left hover:bg-white/10 transition-colors font-bold text-sm"
              >
                {lang === 'ru' ? 'Русский' : lang === 'kk' ? 'Қазақша' : 'English'}
              </button>
            ))}
          </motion.div>
        </div>
      </motion.div>

      {/* HERO - FULL SCREEN */}
      <section className="relative min-h-screen flex items-center justify-center px-8">
        <motion.div
          style={{ opacity, scale }}
          className="text-center max-w-6xl mx-auto"
        >
          {/* Pre-title */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mb-8"
          >
            <span className="text-cyan-400 font-semibold text-lg tracking-wider uppercase">
              {t.hero.preTitle}
            </span>
          </motion.div>

          {/* Main Title - HUGE */}
          <motion.h1
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-[12vw] md:text-[10vw] lg:text-[8rem] font-black mb-8 leading-none text-white"
          >
            {t.hero.title}
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="text-2xl md:text-3xl text-gray-300 mb-16 max-w-4xl mx-auto leading-relaxed"
          >
            {t.hero.subtitle}
          </motion.p>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-6"
          >
            <motion.button
              onClick={() => navigate('/register')}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="group relative px-12 py-6 bg-yellow-400 text-black text-xl font-black rounded-full overflow-hidden"
            >
              <span className="relative z-10 flex items-center gap-3">
                {t.hero.cta}
                <motion.div
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  <ArrowRight className="w-6 h-6" />
                </motion.div>
              </span>
            </motion.button>
          </motion.div>

          {/* Scroll indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 1 }}
            className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
          >
            <span className="text-sm text-gray-400">{t.hero.scroll}</span>
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <ChevronRight className="w-6 h-6 text-gray-400 rotate-90" />
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Floating elements */}
        <motion.div
          animate={{
            y: [0, -30, 0],
            rotate: [0, 10, 0]
          }}
          transition={{ duration: 6, repeat: Infinity }}
          className="absolute top-1/4 left-1/4 opacity-20"
        >
          <Rocket className="w-32 h-32 text-yellow-400" />
        </motion.div>
        <motion.div
          animate={{
            y: [0, 30, 0],
            rotate: [0, -10, 0]
          }}
          transition={{ duration: 5, repeat: Infinity }}
          className="absolute bottom-1/4 right-1/4 opacity-20"
        >
          <Globe className="w-32 h-32 text-cyan-400" />
        </motion.div>
      </section>

      {/* JOURNEY - TIMELINE STYLE */}
      <section className="relative py-32 px-8">
        <div className="max-w-7xl mx-auto">
          {/* Title */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-32"
          >
            <h2 className="text-6xl md:text-7xl font-black mb-4 text-white">
              {t.journey.title}
            </h2>
            <p className="text-3xl text-gray-400">{t.journey.subtitle}</p>
          </motion.div>

          {/* Timeline */}
          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-white/10" />

            {/* Steps */}
            {[t.journey.step1, t.journey.step2, t.journey.step3, t.journey.step4].map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: i % 2 === 0 ? -100 : 100 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.2 }}
                className={`relative flex items-center mb-32 ${
                  i % 2 === 0 ? 'flex-row' : 'flex-row-reverse'
                }`}
              >
                {/* Content */}
                <div className={`w-5/12 ${i % 2 === 0 ? 'text-right pr-16' : 'text-left pl-16'}`}>
                  <div className="text-8xl font-black text-white/5 mb-4">
                    {step.number}
                  </div>
                  <h3 className="text-4xl font-black mb-4 text-white">{step.title}</h3>
                  <p className="text-xl text-gray-400">{step.desc}</p>
                </div>

                {/* Center dot */}
                <div className="absolute left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-yellow-400 shadow-2xl shadow-yellow-400/50" />

                {/* Spacer */}
                <div className="w-5/12" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* QUICK FACTS */}
      <section className="relative py-32 px-8 bg-white/5">
        <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-16 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            <div className="text-7xl font-black text-yellow-400 mb-4">
              {t.quick.users}
            </div>
            <div className="text-2xl text-gray-400">{t.quick.usersLabel}</div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            <div className="text-7xl font-black text-cyan-400 mb-4">
              {t.quick.missions}
            </div>
            <div className="text-2xl text-gray-400">{t.quick.missionsLabel}</div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <div className="text-7xl font-black text-purple-400 mb-4">
              {t.quick.planets}
            </div>
            <div className="text-2xl text-gray-400">{t.quick.planetsLabel}</div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            <div className="text-7xl font-black text-emerald-400 mb-4">
              {t.quick.free}
            </div>
            <div className="text-2xl text-gray-400">{t.quick.freeLabel}</div>
          </motion.div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="relative py-48 px-8">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-5xl mx-auto text-center"
        >
          <h2 className="text-7xl md:text-8xl font-black mb-8 text-white">
            {t.cta.title}
          </h2>

          <p className="text-3xl text-gray-400 mb-16">
            {t.cta.subtitle}
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <motion.button
              onClick={() => navigate('/register')}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="group relative px-16 py-8 bg-yellow-400 text-black text-2xl font-black rounded-full overflow-hidden"
            >
              <span className="relative z-10 flex items-center gap-4">
                <Rocket className="w-8 h-8" />
                {t.cta.button}
                <Sparkles className="w-8 h-8" />
              </span>
            </motion.button>

            <motion.button
              onClick={() => navigate('/about')}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-16 py-8 bg-white/10 backdrop-blur-xl text-white text-2xl font-black rounded-full border border-white/20 hover:bg-white/20 transition-all"
            >
              {t.cta.learn}
            </motion.button>
          </div>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="relative py-16 px-8 border-t border-white/10">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="text-2xl font-black text-yellow-400">
            AstroCadem
          </div>
          <div className="flex gap-8 text-gray-400">
            <button onClick={() => navigate('/about')} className="hover:text-white transition-colors">О нас</button>
            <button className="hover:text-white transition-colors">Контакты</button>
            <button className="hover:text-white transition-colors">Помощь</button>
          </div>
          <div className="text-gray-400 text-sm">
            © 2025 AstroCadem. Все права защищены.
          </div>
        </div>
      </footer>
      
      {/* Глюк - помощник на главной */}
      <Glitch />
    </div>
  );
}

export default Landing;