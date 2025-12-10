// src/data/mentorsData.js
// ДАННЫЕ О ИИ НАСТАВНИКАХ

export const mentors = {
  kapitanMoneti: {
    id: 'kapitanMoneti',
    name: 'Капитан Монети',
    planet: 'finance',
    icon: '💰',
    color: '#10b981',
    avatar: 'https://images.unsplash.com/photo-1578632767115-351597cf2477?w=400&h=400&fit=crop', // Friendly pirate captain
    personality: 'веселый',
    description: 'Опытный капитан-пират, который знает все о сокровищах и финансах! Научит тебя как правильно управлять монетами и копить богатства.',
    greeting: 'Йо-хо-хо, юный матрос! Добро пожаловать на борт финансового корабля!',
    catchphrase: 'Монета любит счет!'
  },

  kiberiya: {
    id: 'kiberiya',
    name: 'Киберия',
    planet: 'cyber',
    icon: '🛡️',
    color: '#3b82f6',
    avatar: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=400&h=400&fit=crop', // Cyber warrior
    personality: 'серьезная',
    description: 'Киберзащитница цифрового мира. Охраняет интернет от опасностей и учит безопасности!',
    greeting: 'Приветствую, агент. Готов защищать цифровой мир?',
    catchphrase: 'Безопасность - превыше всего!'
  },

  tehniya: {
    id: 'tehniya',
    name: 'Техния',
    planet: 'tech',
    icon: '💻',
    color: '#8b5cf6',
    avatar: 'https://images.unsplash.com/photo-1535223289827-42f1e9919769?w=400&h=400&fit=crop', // Tech genius
    personality: 'умная',
    description: 'Гениальная изобретательница технологий будущего. Знает все о гаджетах и программировании!',
    greeting: 'Привет! Готов исследовать мир технологий?',
    catchphrase: 'Технологии делают мир лучше!'
  },

  trikster: {
    id: 'trikster',
    name: 'Трикстер',
    planet: 'ads',
    icon: '🎭',
    color: '#ec4899',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop', // Mysterious trickster
    personality: 'хитрый',
    description: 'Мастер иллюзий и рекламы. Раскроет все секреты манипуляций в интернете!',
    greeting: 'Ха-ха! Готов узнать секреты рекламы?',
    catchphrase: 'Не все то золото, что блестит!'
  }
};

// Получить наставника по ID планеты
export const getMentorByPlanet = (planetId) => {
  const mentorMap = {
    finance: mentors.kapitanMoneti,
    cyber: mentors.kiberiya,
    tech: mentors.tehniya,
    ads: mentors.trikster
  };
  return mentorMap[planetId];
};