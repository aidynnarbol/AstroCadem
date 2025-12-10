// src/data/missionsData.js
// ЕДИНСТВЕННЫЙ ИСТОЧНИК ДАННЫХ О ВСЕХ МИССИЯХ И ПЛАНЕТАХ

export const planetsData = {
  finance: {
    id: 'finance',
    name: 'Финансовый мастер',
    emoji: '💰',
    color: '#fbbf24',
    icon: '💰',
    description: 'Изучи основы денег и финансов. Научись копить, планировать бюджет и принимать умные финансовые решения.',
    locked: false,
    missions: 5,
    missionsList: [
      {
        id: 'finance-1',
        character: '🤖',
        title: 'Откуда берутся деньги?',
        characterName: 'Капитан Монети',
        description: 'Узнай откуда появляются деньги и зачем они нужны. Познакомься с Капитаном Монети и отправься в увлекательное путешествие в мир финансов!',
        xpReward: 100,
        coinsReward: 50,
        difficulty: 'easy',
        duration: '5 минут',
        locked: false
      },
      {
        id: 'finance-2',
        character: '💰',
        title: 'Что такое деньги?',
        characterName: 'Профессор Кэш',
        description: 'Разберись что такое деньги и как они работают. Профессор Кэш расскажет тебе историю денег от древности до наших дней.',
        xpReward: 100,
        coinsReward: 50,
        difficulty: 'easy',
        duration: '5 минут',
        locked: false
      },
      {
        id: 'finance-3',
        character: '🏦',
        title: 'Банки и сбережения',
        characterName: 'Мисс Сейвинг',
        description: 'Научись копить и пользоваться банком. Мисс Сейвинг покажет как работают банки и почему важно откладывать деньги.',
        xpReward: 150,
        coinsReward: 75,
        difficulty: 'medium',
        duration: '7 минут',
        locked: false
      },
      {
        id: 'finance-4',
        character: '💳',
        title: 'Карты и платежи',
        characterName: 'Доктор Пэймент',
        description: 'Узнай как работают банковские карты и безопасные платежи. Доктор Пэймент научит тебя пользоваться картами правильно.',
        xpReward: 150,
        coinsReward: 75,
        difficulty: 'medium',
        duration: '7 минут',
        locked: false
      },
      {
        id: 'finance-5',
        character: '📊',
        title: 'Бюджет и планирование',
        characterName: 'Леди Баланс',
        description: 'Научись планировать свои расходы и составлять бюджет. Леди Баланс раскроет секреты финансового планирования.',
        xpReward: 200,
        coinsReward: 100,
        difficulty: 'hard',
        duration: '10 минут',
        locked: false
      }
    ]
  },
  
  cyber: {
    id: 'cyber',
    name: 'Киберщит',
    emoji: '🛡️',
    color: '#ef4444',
    icon: '🛡️',
    description: 'Защити себя в интернете. Научись создавать надёжные пароли, распознавать мошенников и защищать свои данные.',
    locked: false,
    missions: 4,
    missionsList: [
      {
        id: 'cyber-1',
        character: '🔐',
        title: 'Пароли и безопасность',
        characterName: 'Страж Кодов',
        description: 'Создавай надёжные пароли которые невозможно взломать. Страж Кодов научит тебя защищать свои аккаунты.',
        xpReward: 100,
        coinsReward: 50,
        difficulty: 'easy',
        duration: '5 минут',
        locked: false
      },
      {
        id: 'cyber-2',
        character: '🦹',
        title: 'Цифровой след',
        characterName: 'Детектив Трейс',
        description: 'Узнай что о тебе знает интернет и как управлять своим цифровым следом. Детектив Трейс покажет как оставаться анонимным.',
        xpReward: 150,
        coinsReward: 75,
        difficulty: 'medium',
        duration: '7 минут',
        locked: false
      },
      {
        id: 'cyber-3',
        character: '🎣',
        title: 'Фишинг и мошенники',
        characterName: 'Охотник',
        description: 'Научись распознавать обман и мошенничество в интернете. Охотник расскажет о хитростях киберпреступников.',
        xpReward: 150,
        coinsReward: 75,
        difficulty: 'medium',
        duration: '7 минут',
        locked: false
      },
      {
        id: 'cyber-4',
        character: '🔒',
        title: 'Защита данных',
        characterName: 'Хранитель',
        description: 'Защити свою личную информацию от утечек и взломов. Хранитель научит тебя шифровать данные.',
        xpReward: 200,
        coinsReward: 100,
        difficulty: 'hard',
        duration: '10 минут',
        locked: false
      }
    ]
  },

  tech: {
    id: 'tech',
    name: 'Техносфера',
    emoji: '⏰',
    color: '#10b981',
    icon: '⚙️',
    description: 'Научись здоровым отношениям с гаджетами. Контролируй экранное время, находи баланс между играми и жизнью.',
    locked: false,
    missions: 6,
    missionsList: [
      {
        id: 'tech-1',
        character: '📱',
        title: 'Экранное время',
        characterName: 'Тайм Мастер',
        description: 'Научись контролировать время в телефоне и не попадать в зависимость. Тайм Мастер покажет правило 20-20-20.',
        xpReward: 100,
        coinsReward: 50,
        difficulty: 'easy',
        duration: '5 минут',
        locked: false
      },
      {
        id: 'tech-2',
        character: '🎮',
        title: 'Игры и реальность',
        characterName: 'Гейм Сенсей',
        description: 'Найди баланс между играми и реальной жизнью. Гейм Сенсей научит тебя играть с умом.',
        xpReward: 100,
        coinsReward: 50,
        difficulty: 'easy',
        duration: '5 минут',
        locked: false
      },
      {
        id: 'tech-3',
        character: '💬',
        title: 'Онлайн общение',
        characterName: 'Чат Гуру',
        description: 'Общайся безопасно и вежливо в интернете. Чат Гуру расскажет правила сетевого этикета.',
        xpReward: 150,
        coinsReward: 75,
        difficulty: 'medium',
        duration: '7 минут',
        locked: false
      },
      {
        id: 'tech-4',
        character: '📸',
        title: 'Соцсети',
        characterName: 'Инфлюенсер',
        description: 'Используй соцсети с умом и не попадайся на лайки. Инфлюенсер откроет секреты популярности.',
        xpReward: 150,
        coinsReward: 75,
        difficulty: 'medium',
        duration: '7 минут',
        locked: false
      },
      {
        id: 'tech-5',
        character: '🧘',
        title: 'Цифровой детокс',
        characterName: 'Дзен Мастер',
        description: 'Научись отдыхать от гаджетов и восстанавливать энергию. Дзен Мастер научит медитации и осознанности.',
        xpReward: 200,
        coinsReward: 100,
        difficulty: 'hard',
        duration: '10 минут',
        locked: false
      },
      {
        id: 'tech-6',
        character: '🤖',
        title: 'ИИ и будущее',
        characterName: 'Футурист',
        description: 'Узнай как работает искусственный интеллект и что нас ждёт в будущем. Футурист покажет мир технологий будущего.',
        xpReward: 200,
        coinsReward: 100,
        difficulty: 'hard',
        duration: '10 минут',
        locked: false
      }
    ]
  },

  ads: {
    id: 'ads',
    name: 'Планета Иллюзий',
    emoji: '🎭',
    color: '#a855f7',
    icon: '🎭',
    description: 'Научись противостоять рекламе и манипуляциям. Отличай желания от потребностей и принимай умные решения о покупках.',
    locked: false,
    missions: 4,
    missionsList: [
      {
        id: 'ads-1',
        character: '🎪',
        title: 'Что такое реклама?',
        characterName: 'Маркетолог',
        description: 'Разберись как работает реклама и какие приёмы используют маркетологи. Маркетолог раскроет секреты профессии.',
        xpReward: 100,
        coinsReward: 50,
        difficulty: 'easy',
        duration: '5 минут',
        locked: false
      },
      {
        id: 'ads-2',
        character: '🎯',
        title: 'Хочу vs Нужно',
        characterName: 'Мудрец',
        description: 'Научись отличать желания от потребностей и не покупать лишнее. Мудрец научит тебя думать перед покупкой.',
        xpReward: 150,
        coinsReward: 75,
        difficulty: 'medium',
        duration: '7 минут',
        locked: false
      },
      {
        id: 'ads-3',
        character: '🛍️',
        title: 'Умный шоппинг',
        characterName: 'Шоппер',
        description: 'Покупай с умом и экономь на покупках. Шоппер расскажет как находить лучшие цены и избегать импульсивных покупок.',
        xpReward: 150,
        coinsReward: 75,
        difficulty: 'medium',
        duration: '7 минут',
        locked: false
      },
      {
        id: 'ads-4',
        character: '⭐',
        title: 'Инфлюенсеры',
        characterName: 'Звезда',
        description: 'Не попадайся на влияние блогеров и скрытую рекламу. Звезда покажет как блогеры зарабатывают на рекламе.',
        xpReward: 200,
        coinsReward: 100,
        difficulty: 'hard',
        duration: '10 минут',
        locked: false
      }
    ]
  }
};

// ВСПОМОГАТЕЛЬНЫЕ ФУНКЦИИ

// Получить планету по ID
export const getPlanetById = (planetId) => {
  return planetsData[planetId] || null;
};

// Получить миссию по ID
export const getMissionById = (missionId) => {
  for (const planet of Object.values(planetsData)) {
    const mission = planet.missionsList.find(m => m.id === missionId);
    if (mission) {
      return { 
        ...mission, 
        planetId: planet.id,
        planetName: planet.name,
        planetEmoji: planet.emoji 
      };
    }
  }
  return null;
};

// Получить все миссии
export const getAllMissions = () => {
  const allMissions = [];
  for (const planet of Object.values(planetsData)) {
    planet.missionsList.forEach(mission => {
      allMissions.push({
        ...mission,
        planetId: planet.id,
        planetName: planet.name,
        planetEmoji: planet.emoji
      });
    });
  }
  return allMissions;
};

// Получить общее количество миссий
export const getTotalMissionsCount = () => {
  return Object.values(planetsData).reduce(
    (sum, planet) => sum + planet.missions, 
    0
  );
};

// Получить миссии планеты
export const getPlanetMissions = (planetId) => {
  const planet = getPlanetById(planetId);
  return planet ? planet.missionsList : [];
};

// Проверить заблокирована ли миссия
export const isMissionLocked = (missionId, completedMissions = []) => {
  const mission = getMissionById(missionId);
  if (!mission) return true;
  
  // Первые миссии каждой планеты всегда открыты
  if (missionId.endsWith('-1')) return false;
  
  // Для других миссий проверяем предыдущую
  const missionNumber = parseInt(missionId.split('-')[1]);
  const prevMissionId = `${mission.planetId}-${missionNumber - 1}`;
  
  return !completedMissions.includes(prevMissionId);
};

// Посчитать прогресс планеты
export const calculatePlanetProgress = (planetId, completedMissions = []) => {
  const planet = getPlanetById(planetId);
  if (!planet) return { completed: 0, total: 0, percentage: 0 };
  
  const completed = planet.missionsList.filter(
    mission => completedMissions.includes(mission.id)
  ).length;
  
  return {
    completed,
    total: planet.missions,
    percentage: Math.round((completed / planet.missions) * 100)
  };
};

// Посчитать общий прогресс
export const calculateTotalProgress = (completedMissions = []) => {
  const total = getTotalMissionsCount();
  const completed = completedMissions.length;
  
  return {
    completed,
    total,
    percentage: Math.round((completed / total) * 100)
  };
};

// Получить следующую миссию для прохождения
export const getNextMission = (completedMissions = []) => {
  for (const planet of Object.values(planetsData)) {
    for (const mission of planet.missionsList) {
      if (!completedMissions.includes(mission.id)) {
        return {
          ...mission,
          planetId: planet.id,
          planetName: planet.name,
          planetEmoji: planet.emoji
        };
      }
    }
  }
  return null; // Все миссии пройдены!
};

// Экспорт для обратной совместимости
export const missionsData = planetsData;

export default planetsData;