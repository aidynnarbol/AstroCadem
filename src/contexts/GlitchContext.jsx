// src/contexts/GlitchContext.jsx
// Глобальная система AI-помощника Глюк с мультиязычностью

import { createContext, useContext, useState, useEffect } from 'react';
import { glitchTranslations } from '../locales/glitchTranslations';

const GlitchContext = createContext();

export function GlitchProvider({ children }) {
  const [isActive, setIsActive] = useState(false);
  const [currentTip, setCurrentTip] = useState(null);
  const [completedTips, setCompletedTips] = useState([]);
  const [isMinimized, setIsMinimized] = useState(false);
  const [currentPage, setCurrentPage] = useState('unknown');

  // Загрузка сохраненного прогресса
  useEffect(() => {
    const saved = localStorage.getItem('glitch_completed_tips');
    if (saved) {
      setCompletedTips(JSON.parse(saved));
    }
  }, []);

  // Сохранение прогресса
  useEffect(() => {
    localStorage.setItem('glitch_completed_tips', JSON.stringify(completedTips));
  }, [completedTips]);

  // Получить текущий язык
  const getCurrentLanguage = () => {
    return localStorage.getItem('language') || 'ru';
  };

  // Перевести текст подсказки
  const translateTip = (tipData) => {
    if (!tipData) return null;
    
    const lang = getCurrentLanguage();
    
    // Если это старый формат с полными данными
    if (tipData.title && tipData.message) {
      return tipData; // Возвращаем как есть для обратной совместимости
    }
    
    // Если это ключ для перевода
    if (typeof tipData === 'string') {
      const translation = glitchTranslations[tipData];
      if (translation) {
        return {
          text: translation[lang] || translation.ru,
          key: tipData
        };
      }
    }
    
    return tipData;
  };

  // Показать подсказку
  const showTip = (tipId, tipData) => {
    // Не показывать если уже была показана
    if (completedTips.includes(tipId)) return;

    const translatedTip = translateTip(tipData);

    setCurrentTip({
      id: tipId,
      ...translatedTip
    });
    setIsActive(true);
    setIsMinimized(false);
  };

  // Закрыть подсказку
  const dismissTip = () => {
    setIsActive(false);
    setCurrentTip(null);
  };

  // Отметить как пройденную
  const markAsCompleted = (tipId) => {
    if (!completedTips.includes(tipId)) {
      setCompletedTips(prev => [...prev, tipId]);
    }
    dismissTip();
  };

  // Пропустить всегда
  const skipForever = (tipId) => {
    markAsCompleted(tipId);
  };

  // Свернуть/развернуть
  const toggleMinimize = () => {
    setIsMinimized(prev => !prev);
  };

  // Сбросить прогресс (для дебага)
  const resetProgress = () => {
    setCompletedTips([]);
    localStorage.removeItem('glitch_completed_tips');
  };

  // Проверка была ли показана подсказка
  const wasTipShown = (tipId) => {
    return completedTips.includes(tipId);
  };

  const value = {
    isActive,
    currentTip,
    isMinimized,
    currentPage,
    setCurrentPage,
    showTip,
    dismissTip,
    markAsCompleted,
    skipForever,
    toggleMinimize,
    resetProgress,
    wasTipShown
  };

  return (
    <GlitchContext.Provider value={value}>
      {children}
    </GlitchContext.Provider>
  );
}

export function useGlitch() {
  const context = useContext(GlitchContext);
  if (!context) {
    throw new Error('useGlitch must be used within GlitchProvider');
  }
  return context;
}

// ===== БИБЛИОТЕКА ПОДСКАЗОК С ПЕРЕВОДАМИ =====
export const GLITCH_TIPS = {
  // LANDING
  landing_welcome: {
    title: { 
      ru: "Привет, будущий Агент! 👋",
      kk: "Сәлем, болашақ Агент! 👋",
      en: "Hi, future Agent! 👋"
    },
    message: { 
      ru: "Я Глюк — твой AI-помощник в цифровом мире! Готов научить тебя всему, что нужно знать для безопасности онлайн. Начнём?",
      kk: "Мен Глюк — сенің AI-көмекшің цифрлық әлемде! Онлайн қауіпсіздік үшін білу керек нәрсенің бәріне үйретуге дайынмын. Бастайық па?",
      en: "I'm Glitch — your AI assistant in the digital world! Ready to teach you everything you need to know for online safety. Let's start?"
    },
    buttons: [
      { 
        text: { ru: "Поехали!", kk: "Кеттік!", en: "Let's go!" }, 
        action: "dismiss" 
      },
      { 
        text: { ru: "Расскажи подробнее", kk: "Толығырақ айтып бер", en: "Tell me more" }, 
        action: "next", 
        nextTip: "landing_about" 
      }
    ]
  },

  landing_about: {
    title: { 
      ru: "Что такое FinSmart? 🚀",
      kk: "FinSmart дегеніміз не? 🚀",
      en: "What is FinSmart? 🚀"
    },
    message: { 
      ru: "FinSmart — это космическое приключение, где ты станешь настоящим Агентом! Ты научишься управлять деньгами, защищаться от мошенников, понимать технологии и раскусывать рекламные трюки.",
      kk: "FinSmart — бұл нағыз Агент болатын ғарыштық шытырман оқиға! Ақшаны басқаруды, алаяқтардан қорғануды, технологияларды түсінуді және жарнамалық трюктерді ашуды үйренесің.",
      en: "FinSmart is a space adventure where you'll become a real Agent! You'll learn to manage money, protect yourself from scammers, understand technologies and spot advertising tricks."
    },
    buttons: [
      { 
        text: { ru: "Круто!", kk: "Керемет!", en: "Cool!" }, 
        action: "dismiss" 
      }
    ]
  },

  // REGISTER
  register_start: {
    title: { 
      ru: "Создаём твой профиль Агента 🎭",
      kk: "Агент профиліңді жасаймыз 🎭",
      en: "Creating your Agent profile 🎭"
    },
    message: { 
      ru: "Выбери крутой никнейм и надёжный пароль. Помни: пароль — это первая линия защиты!",
      kk: "Керемет никнейм және сенімді пароль таңда. Есте сақта: пароль — бұрынғы қорғаныс сызығы!",
      en: "Choose a cool nickname and a strong password. Remember: password is your first line of defense!"
    },
    buttons: [
      { 
        text: { ru: "Понятно", kk: "Түсінікті", en: "Got it" }, 
        action: "dismiss" 
      }
    ]
  },

  register_password: {
    title: { 
      ru: "Секреты сильного пароля 🔐",
      kk: "Күшті пароль құпиялары 🔐",
      en: "Secrets of a strong password 🔐"
    },
    message: { 
      ru: "Используй минимум 8 символов: буквы, цифры и спецсимволы. Никогда не используй '12345' или свою дату рождения!",
      kk: "Кемінде 8 таңба қолданыңыз: әріптер, сандар және арнайы таңбалар. Ешқашан '12345' немесе туған күніңізді пайдаланбаңыз!",
      en: "Use at least 8 characters: letters, numbers and special symbols. Never use '12345' or your birthday!"
    },
    buttons: [
      { 
        text: { ru: "Запомнил!", kk: "Есте сақтадым!", en: "Got it!" }, 
        action: "dismiss" 
      }
    ]
  },

  // DASHBOARD (первый визит)
  dashboard_welcome: {
    title: { 
      ru: "Добро пожаловать на станцию, Агент! 🛸",
      kk: "Станцияға қош келдің, Агент! 🛸",
      en: "Welcome to the station, Agent! 🛸"
    },
    message: { 
      ru: "Это твой главный центр управления. Отсюда ты можешь отправиться на миссии, изучить новое в Библиотеке или протестировать навыки в Лаборатории!",
      kk: "Бұл сенің басты басқару орталығың. Осы жерден миссияларға баруға, Кітапханада жаңаны үйренуге немесе Зертханада дағдыларды тексеруге болады!",
      en: "This is your main control center. From here you can go on missions, learn something new in the Library or test your skills in the Laboratory!"
    },
    buttons: [
      { 
        text: { ru: "Покажи всё!", kk: "Бәрін көрсет!", en: "Show me everything!" }, 
        action: "next", 
        nextTip: "dashboard_map" 
      }
    ]
  },

  dashboard_map: {
    title: { 
      ru: "🗺️ Карта Миссий",
      kk: "🗺️ Миссиялар картасы",
      en: "🗺️ Mission Map"
    },
    message: { 
      ru: "Здесь находятся все твои приключения! 4 планеты с заданиями, которые научат тебя важным навыкам. Начни с Планеты Финансов!",
      kk: "Мұнда сенің барлық шытырман оқиғаларың! Маңызды дағдыларға үйрететін тапсырмалары бар 4 планета. Қаржы планетасынан бастаңыз!",
      en: "Here are all your adventures! 4 planets with tasks that will teach you important skills. Start with the Finance Planet!"
    },
    buttons: [
      { 
        text: { ru: "Дальше", kk: "Әрі қарай", en: "Next" }, 
        action: "next", 
        nextTip: "dashboard_lab" 
      }
    ]
  },

  dashboard_lab: {
    title: { 
      ru: "🔬 Лаборатория",
      kk: "🔬 Зертхана",
      en: "🔬 Laboratory"
    },
    message: { 
      ru: "Тут ты можешь протестировать свои знания! Калькуляторы, симуляторы, интерактивные инструменты — всё для практики.",
      kk: "Мұнда білімдеріңді тексере аласың! Калькуляторлар, симуляторлар, интерактивті құралдар — бәрі жаттығу үшін.",
      en: "Here you can test your knowledge! Calculators, simulators, interactive tools — everything for practice."
    },
    buttons: [
      { 
        text: { ru: "Дальше", kk: "Әрі қарай", en: "Next" }, 
        action: "next", 
        nextTip: "dashboard_library" 
      }
    ]
  },

  dashboard_library: {
    title: { 
      ru: "📚 Библиотека",
      kk: "📚 Кітапхана",
      en: "📚 Library"
    },
    message: { 
      ru: "Хочешь узнать больше? Здесь статьи, видео и подкасты на любую тему. Учись в своём темпе!",
      kk: "Көбірек білгің келе ме? Мұнда кез келген тақырыпта мақалалар, бейнелер және подкасттар. Өз қарқынында оқы!",
      en: "Want to learn more? Here are articles, videos and podcasts on any topic. Learn at your own pace!"
    },
    buttons: [
      { 
        text: { ru: "Дальше", kk: "Әрі қарай", en: "Next" }, 
        action: "next", 
        nextTip: "dashboard_profile" 
      }
    ]
  },

  dashboard_profile: {
    title: { 
      ru: "👤 Твоё Досье",
      kk: "👤 Сенің Досье",
      en: "👤 Your Profile"
    },
    message: { 
      ru: "Следи за своим прогрессом: уровень, достижения, статистика. Чем больше учишься, тем сильнее становишься!",
      kk: "Прогресіңді қадағалаңыз: деңгей, жетістіктер, статистика. Қанша көп оқысаң, соншама күшті боласың!",
      en: "Track your progress: level, achievements, statistics. The more you learn, the stronger you become!"
    },
    buttons: [
      { 
        text: { ru: "Всё понятно!", kk: "Бәрі түсінікті!", en: "All clear!" }, 
        action: "dismiss" 
      }
    ]
  },

  // MISSION MAP
  map_universes: {
    title: { 
      ru: "Три Вселенных знаний 🌌",
      kk: "Білімнің үш ғаламы 🌌",
      en: "Three Universes of knowledge 🌌"
    },
    message: { 
      ru: "Каждая вселенная — это новый сезон приключений! Пока открыта только первая. Исследуй 4 планеты и возвращайся за новыми!",
      kk: "Әр ғалам — жаңа шытырман оқиға маусымы! Әзірше тек бірінші ашық. 4 планетаны зерттеп, жаңаларына оралыңыз!",
      en: "Each universe is a new season of adventures! Only the first one is open for now. Explore 4 planets and come back for more!"
    },
    buttons: [
      { 
        text: { ru: "Понял!", kk: "Түсіндім!", en: "Got it!" }, 
        action: "dismiss" 
      }
    ]
  },

  map_first_planet: {
    title: { 
      ru: "Начни с Планеты Финансов 💰",
      kk: "Қаржы планетасынан бастаңыз 💰",
      en: "Start with the Finance Planet 💰"
    },
    message: { 
      ru: "Кликни на первую планету! Капитан Монета научит тебя всему о деньгах. Это твоя первая миссия, Агент!",
      kk: "Бірінші планетаны басыңыз! Капитан Монета ақша туралы бәрін үйретеді. Бұл сенің бірінші миссияң, Агент!",
      en: "Click on the first planet! Captain Coin will teach you everything about money. This is your first mission, Agent!"
    },
    buttons: [
      { 
        text: { ru: "Вперёд!", kk: "Алға!", en: "Let's go!" }, 
        action: "dismiss" 
      }
    ]
  },

  // PLANET
  planet_missions: {
    title: { 
      ru: "Миссии планеты 🎯",
      kk: "Планета миссиялары 🎯",
      en: "Planet missions 🎯"
    },
    message: { 
      ru: "Каждая миссия — это история с уроками и проверкой знаний. Проходи по порядку и получай награды: монеты, опыт и достижения!",
      kk: "Әр миссия — сабақтары мен білімді тексеруі бар тарих. Ретімен өтіп, сыйлықтар алыңыз: монеталар, тәжірибе және жетістіктер!",
      en: "Each mission is a story with lessons and knowledge checks. Complete them in order and get rewards: coins, experience and achievements!"
    },
    buttons: [
      { 
        text: { ru: "Начинаем!", kk: "Бастаймыз!", en: "Let's start!" }, 
        action: "dismiss" 
      }
    ]
  },

  // MISSION
  mission_start: {
    title: { 
      ru: "Готов к испытанию? ⚡",
      kk: "Сынаққа дайынсың ба? ⚡",
      en: "Ready for the challenge? ⚡"
    },
    message: { 
      ru: "Читай внимательно, думай своей головой и отвечай честно. Ошибки — это нормально, главное — учиться!",
      kk: "Мұқият оқыңыз, өз басыңызбен ойланыңыз және шын жүректен жауап беріңіз. Қателер — бұл қалыпты, басты нәрсе — оқу!",
      en: "Read carefully, think for yourself and answer honestly. Mistakes are normal, the main thing is to learn!"
    },
    buttons: [
      { 
        text: { ru: "Поехали!", kk: "Кеттік!", en: "Let's go!" }, 
        action: "dismiss" 
      }
    ]
  },

  mission_complete: {
    title: { 
      ru: "Отлично справился! 🎉",
      kk: "Керемет жасадың! 🎉",
      en: "Great job! 🎉"
    },
    message: { 
      ru: "Ты получил опыт и монеты! Продолжай в том же духе, Агент. Каждая миссия делает тебя сильнее!",
      kk: "Тәжірибе және монеталар алдың! Осылай жалғастыр, Агент. Әр миссия сені күштірек етеді!",
      en: "You got experience and coins! Keep it up, Agent. Each mission makes you stronger!"
    },
    buttons: [
      { 
        text: { ru: "Спасибо!", kk: "Рахмет!", en: "Thanks!" }, 
        action: "dismiss" 
      }
    ]
  },

  // LABORATORY
  lab_tools: {
    title: { 
      ru: "Инструменты Агента 🔧",
      kk: "Агент құралдары 🔧",
      en: "Agent tools 🔧"
    },
    message: { 
      ru: "Используй калькуляторы и симуляторы для практики! Здесь можно экспериментировать без последствий.",
      kk: "Жаттығу үшін калькуляторлар мен симуляторларды пайдаланыңыз! Мұнда салдарсыз эксперимент жасауға болады.",
      en: "Use calculators and simulators for practice! Here you can experiment without consequences."
    },
    buttons: [
      { 
        text: { ru: "Попробую!", kk: "Көремін!", en: "I'll try!" }, 
        action: "dismiss" 
      }
    ]
  },

  // LIBRARY
  library_content: {
    title: { 
      ru: "Океан знаний 📖",
      kk: "Білім мұхиты 📖",
      en: "Ocean of knowledge 📖"
    },
    message: { 
      ru: "Статьи, видео, подкасты — выбирай что нравится! Учись когда удобно и в своём темпе.",
      kk: "Мақалалар, бейнелер, подкасттар — ұнайтынын таңдаңыз! Ыңғайлы кезде және өз қарқынында оқыңыз.",
      en: "Articles, videos, podcasts — choose what you like! Learn when convenient and at your own pace."
    },
    buttons: [
      { 
        text: { ru: "Изучу!", kk: "Үйренемін!", en: "I'll learn!" }, 
        action: "dismiss" 
      }
    ]
  },

  // PROFILE
  profile_progress: {
    title: { 
      ru: "Твой путь Агента 📊",
      kk: "Сенің Агент жолың 📊",
      en: "Your Agent path 📊"
    },
    message: { 
      ru: "Здесь твоя статистика: уровень, достижения, пройденные миссии. Следи за прогрессом и ставь новые цели!",
      kk: "Мұнда статистикаң: деңгей, жетістіктер, өткен миссиялар. Прогресті қадағалаңыз және жаңа мақсаттар қойыңыз!",
      en: "Here's your statistics: level, achievements, completed missions. Track your progress and set new goals!"
    },
    buttons: [
      { 
        text: { ru: "Понял!", kk: "Түсіндім!", en: "Got it!" }, 
        action: "dismiss" 
      }
    ]
  }
};