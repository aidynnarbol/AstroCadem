import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Rocket, Sparkles, Target, Shield, Zap, Users, Award, TrendingUp, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import CosmicBackgroundAdvanced from '../components/CosmicBackgroundAdvanced';

function About() {
  const navigate = useNavigate();
  const [language, setLanguage] = useState('ru');
  const [showLanguages, setShowLanguages] = useState(false);

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const content = {
    ru: {
      nav: {
        home: 'Главная',
        about: 'О нас'
      },
      hero: {
        title: 'Образовательная платформа нового поколения',
        subtitle: 'Мы учим детей важным навыкам через космические приключения'
      },
      approach: {
        title: 'Наш подход',
        items: [
          {
            title: 'Через игру',
            text: 'Никаких скучных уроков. Только захватывающие сюжеты, персонажи и миссии, где каждое решение имеет значение.'
          },
          {
            title: 'С помощью AI',
            text: 'Персональный наставник всегда рядом. Он понимает контекст, отвечает на вопросы и помогает разобраться в сложных темах.'
          },
          {
            title: 'С наградами',
            text: 'Система мотивации работает. Монеты, уровни, достижения — всё это держит интерес и помогает видеть прогресс.'
          }
        ]
      },
      planets: {
        title: 'Четыре направления',
        subtitle: 'Каждая планета — это отдельный мир с уникальными миссиями',
        items: [
          {
            name: 'Финансовая грамотность',
            missions: '5 миссий',
            topics: ['Управление деньгами', 'Составление бюджета', 'Основы инвестиций', 'Банки и кредиты', 'Сбережения'],
            color: 'yellow'
          },
          {
            name: 'Кибербезопасность',
            missions: '5 миссий',
            topics: ['Надёжные пароли', 'Распознавание фишинга', 'Защита данных', 'Безопасность в соцсетях', 'Что делать при взломе'],
            color: 'cyan'
          },
          {
            name: 'Технологии',
            missions: '5 миссий',
            topics: ['Как работают гаджеты', 'Интернет изнутри', 'Основы программирования', 'Создание первого кода', 'Современные технологии'],
            color: 'purple'
          },
          {
            name: 'Критическое мышление',
            missions: '4 миссии',
            topics: ['Манипуляции в рекламе', 'Анализ информации', 'Осознанные решения', 'Уловки маркетологов'],
            color: 'emerald'
          }
        ]
      },
      why: {
        title: 'Почему это работает',
        items: [
          {
            number: '01',
            title: 'Вовлечение',
            text: 'Ребёнок не просто читает текст — он принимает решения, влияет на сюжет и видит последствия своих действий.'
          },
          {
            number: '02',
            title: 'Персонализация',
            text: 'AI-помощник адаптируется под темп каждого ученика, давая подсказки именно тогда, когда они нужны.'
          },
          {
            number: '03',
            title: 'Практика',
            text: 'Навыки отрабатываются на реальных сценариях, а не на абстрактных примерах из учебника.'
          },
          {
            number: '04',
            title: 'Мотивация',
            text: 'Система наград и видимый прогресс поддерживают интерес и желание двигаться дальше.'
          }
        ]
      },
      mission: {
        title: 'Наша миссия',
        text: 'Мы создаём пространство, где дети получают навыки, которые реально пригодятся в жизни. Финансовая грамотность, безопасность в интернете, понимание технологий и умение мыслить критически — это не просто темы из программы, а инструменты для будущего.',
        pillars: [
          {
            title: 'Доступность',
            text: 'Платформа бесплатная для всех. Качественное образование не должно зависеть от достатка семьи.'
          },
          {
            title: 'Безопасность',
            text: 'Никакой рекламы, трекинга или неподходящего контента. Только обучение в безопасной среде.'
          },
          {
            title: 'Эффективность',
            text: 'Игровой формат не означает легковесность. Мы учим серьёзным вещам через интересный контент.'
          }
        ]
      },
      features: {
        title: 'Что получает ученик',
        items: [
          'Понимание финансов на базовом уровне',
          'Навыки защиты себя в интернете',
          'Представление о том, как работают технологии',
          'Умение распознавать манипуляции',
          'Практический опыт принятия решений',
          'Видимый прогресс и награды за достижения'
        ]
      },
      cta: {
        title: 'Начни прямо сейчас',
        subtitle: 'Регистрация занимает меньше минуты',
        button: 'Создать аккаунт'
      }
    }
  };

  const t = content[language];

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden">
      <CosmicBackgroundAdvanced />

      {/* NAV */}
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="fixed top-8 left-1/2 -translate-x-1/2 z-50 px-8 py-4 bg-white/5 backdrop-blur-2xl rounded-full border border-white/10"
      >
        <div className="flex items-center gap-8">
          <button 
            onClick={() => navigate('/')}
            className="text-2xl font-black text-yellow-400 hover:text-yellow-300 transition-colors"
          >
            AstroCadem
          </button>
          <div className="h-6 w-px bg-white/20" />
          <button 
            onClick={() => navigate('/')}
            className="text-gray-400 hover:text-white transition-colors font-semibold"
          >
            {t.nav.home}
          </button>
          <span className="text-white font-semibold">{t.nav.about}</span>
          <button 
            onClick={() => navigate('/login')}
            className="text-gray-400 hover:text-white transition-colors font-semibold"
          >
            Вход
          </button>
        </div>
      </motion.nav>

      {/* LANGUAGE SWITCHER */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        onMouseEnter={() => setShowLanguages(true)}
        onMouseLeave={() => setShowLanguages(false)}
        className="fixed top-8 right-8 z-50"
      >
        <div className="relative">
          <motion.div
            className="w-12 h-12 rounded-full bg-yellow-400 text-black font-black flex items-center justify-center cursor-pointer text-sm"
            whileHover={{ scale: 1.1 }}
          >
            {language.toUpperCase()}
          </motion.div>

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

      {/* HERO */}
      <section className="relative pt-48 pb-24 px-8">
        <div className="max-w-6xl mx-auto">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-6xl md:text-8xl font-black mb-8 text-white leading-tight"
          >
            {t.hero.title}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-2xl md:text-3xl text-gray-400 leading-relaxed"
          >
            {t.hero.subtitle}
          </motion.p>
        </div>
      </section>

      {/* APPROACH - 3 COLUMNS */}
      <section className="relative py-24 px-8">
        <div className="max-w-7xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-5xl md:text-6xl font-black mb-24 text-white"
          >
            {t.approach.title}
          </motion.h2>

          <div className="grid md:grid-cols-3 gap-12">
            {t.approach.items.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
              >
                <div className="h-1 w-16 bg-yellow-400 mb-8" />
                <h3 className="text-3xl font-black mb-6 text-white">{item.title}</h3>
                <p className="text-xl text-gray-400 leading-relaxed">{item.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* PLANETS - CLEAN LIST */}
      <section className="relative py-24 px-8 bg-white/5">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-24"
          >
            <h2 className="text-5xl md:text-6xl font-black mb-6 text-white">
              {t.planets.title}
            </h2>
            <p className="text-2xl text-gray-400">{t.planets.subtitle}</p>
          </motion.div>

          <div className="space-y-16">
            {t.planets.items.map((planet, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="border-l-4 border-yellow-400 pl-12 py-8"
              >
                <div className="flex items-center gap-4 mb-6">
                  <h3 className="text-4xl font-black text-white">{planet.name}</h3>
                  <span className="text-cyan-400 font-bold flex items-center gap-2">
                    <Target className="w-5 h-5" />
                    {planet.missions}
                  </span>
                </div>

                <div className="grid md:grid-cols-2 gap-x-8 gap-y-3">
                  {planet.topics.map((topic, j) => (
                    <div key={j} className="flex items-center gap-3 text-gray-300">
                      <div className="w-2 h-2 bg-yellow-400 rounded-full flex-shrink-0" />
                      <span className="text-lg">{topic}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* WHY IT WORKS - NUMBERED */}
      <section className="relative py-24 px-8">
        <div className="max-w-7xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-5xl md:text-6xl font-black mb-24 text-white"
          >
            {t.why.title}
          </motion.h2>

          <div className="grid md:grid-cols-2 gap-16">
            {t.why.items.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="relative"
              >
                <div className="text-8xl font-black text-white/5 mb-4">
                  {item.number}
                </div>
                <h3 className="text-3xl font-black mb-4 text-white">{item.title}</h3>
                <p className="text-xl text-gray-400 leading-relaxed">{item.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* MISSION */}
      <section className="relative py-24 px-8 bg-white/5">
        <div className="max-w-5xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-5xl md:text-6xl font-black mb-12 text-white"
          >
            {t.mission.title}
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-2xl text-gray-300 leading-relaxed mb-24"
          >
            {t.mission.text}
          </motion.p>

          <div className="space-y-12">
            {t.mission.pillars.map((pillar, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                className="flex items-start gap-6"
              >
                <div className="w-3 h-3 bg-yellow-400 rounded-full mt-2 flex-shrink-0" />
                <div>
                  <h3 className="text-2xl font-black mb-3 text-white">{pillar.title}</h3>
                  <p className="text-lg text-gray-400 leading-relaxed">{pillar.text}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURES - SIMPLE LIST */}
      <section className="relative py-24 px-8">
        <div className="max-w-5xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-5xl md:text-6xl font-black mb-16 text-white"
          >
            {t.features.title}
          </motion.h2>

          <div className="grid md:grid-cols-2 gap-8">
            {t.features.items.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="flex items-start gap-4 group"
              >
                <ArrowRight className="w-6 h-6 text-yellow-400 mt-1 flex-shrink-0 group-hover:translate-x-2 transition-transform" />
                <span className="text-xl text-gray-300">{item}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="relative py-32 px-8">
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

          <motion.button
            onClick={() => navigate('/register')}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-16 py-8 bg-yellow-400 text-black text-2xl font-black rounded-full"
          >
            {t.cta.button}
          </motion.button>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="relative py-16 px-8 border-t border-white/10">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="text-2xl font-black text-yellow-400">
            AstroCadem
          </div>
          <div className="flex gap-8 text-gray-400">
            <button onClick={() => navigate('/')} className="hover:text-white transition-colors">Главная</button>
            <button className="hover:text-white transition-colors">Контакты</button>
            <button className="hover:text-white transition-colors">Помощь</button>
          </div>
          <div className="text-gray-400 text-sm">
            © 2025 AstroCadem. Все права защищены.
          </div>
        </div>
      </footer>
    </div>
  );
}

export default About;