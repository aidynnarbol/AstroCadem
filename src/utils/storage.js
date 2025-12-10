// src/utils/storage.js
// УЛУЧШЕННАЯ СИСТЕМА ХРАНЕНИЯ ПРОГРЕССА

const STORAGE_KEY = 'finsmart_user_progress';

// Дефолтный прогресс для нового пользователя
const defaultProgress = {
  userId: 'guest',
  username: 'Гость',
  avatar: '🚀',
  age: null,
  level: 1,
  xp: 0,
  coins: 0,
  completedMissions: [],
  planetProgress: {
    finance: { completed: 0, total: 5 },
    cyber: { completed: 0, total: 4 },
    tech: { completed: 0, total: 6 },
    ads: { completed: 0, total: 4 }
  },
  badges: [],
  achievements: [], // Новое: достижения
  streak: {
    current: 0,
    best: 0,
    lastDate: null
  },
  stats: {
    totalMissions: 0,
    totalXP: 0,
    totalCoins: 0,
    perfectScores: 0,
    totalTimeSpent: 0 // Новое: время в приложении
  },
  settings: {
    soundEnabled: true,
    musicEnabled: true,
    notificationsEnabled: true
  },
  createdAt: new Date().toISOString(),
  lastActivity: new Date().toISOString()
};

// СИСТЕМА ДОСТИЖЕНИЙ
const ACHIEVEMENTS = [
  {
    id: 'first_mission',
    title: 'Первый шаг',
    description: 'Завершите первую миссию',
    icon: '🎯',
    condition: (progress) => progress.stats.totalMissions >= 1,
    reward: { xp: 50, coins: 25 }
  },
  {
    id: 'mission_master_5',
    title: 'Начинающий исследователь',
    description: 'Завершите 5 миссий',
    icon: '⭐',
    condition: (progress) => progress.stats.totalMissions >= 5,
    reward: { xp: 100, coins: 50 }
  },
  {
    id: 'mission_master_10',
    title: 'Опытный исследователь',
    description: 'Завершите 10 миссий',
    icon: '🌟',
    condition: (progress) => progress.stats.totalMissions >= 10,
    reward: { xp: 200, coins: 100 }
  },
  {
    id: 'level_5',
    title: 'Уровень 5',
    description: 'Достигните 5 уровня',
    icon: '🔥',
    condition: (progress) => progress.level >= 5,
    reward: { xp: 150, coins: 75 }
  },
  {
    id: 'level_10',
    title: 'Уровень 10',
    description: 'Достигните 10 уровня',
    icon: '💎',
    condition: (progress) => progress.level >= 10,
    reward: { xp: 300, coins: 150 }
  },
  {
    id: 'rich_student',
    title: 'Богатый студент',
    description: 'Накопите 1000 монет',
    icon: '💰',
    condition: (progress) => progress.stats.totalCoins >= 1000,
    reward: { xp: 250, coins: 100 }
  },
  {
    id: 'streak_3',
    title: 'Постоянство',
    description: '3 дня подряд',
    icon: '🔥',
    condition: (progress) => progress.streak.current >= 3,
    reward: { xp: 100, coins: 50 }
  },
  {
    id: 'streak_7',
    title: 'Неделя силы',
    description: '7 дней подряд',
    icon: '⚡',
    condition: (progress) => progress.streak.current >= 7,
    reward: { xp: 300, coins: 150 }
  },
  {
    id: 'perfect_score',
    title: 'Перфекционист',
    description: 'Получите 100% в миссии',
    icon: '🎖️',
    condition: (progress) => progress.stats.perfectScores >= 1,
    reward: { xp: 150, coins: 75 }
  },
  {
    id: 'planet_finance_complete',
    title: 'Финансовый мастер',
    description: 'Завершите все миссии планеты Финансы',
    icon: '💵',
    condition: (progress) => progress.planetProgress.finance?.completed >= progress.planetProgress.finance?.total,
    reward: { xp: 500, coins: 250 }
  },
  {
    id: 'planet_cyber_complete',
    title: 'Киберщит',
    description: 'Завершите все миссии планеты Кибербезопасность',
    icon: '🛡️',
    condition: (progress) => progress.planetProgress.cyber?.completed >= progress.planetProgress.cyber?.total,
    reward: { xp: 500, coins: 250 }
  },
  {
    id: 'planet_tech_complete',
    title: 'Технологический гений',
    description: 'Завершите все миссии планеты Технологии',
    icon: '💻',
    condition: (progress) => progress.planetProgress.tech?.completed >= progress.planetProgress.tech?.total,
    reward: { xp: 500, coins: 250 }
  },
  {
    id: 'planet_ads_complete',
    title: 'Рекламный эксперт',
    description: 'Завершите все миссии планеты Реклама',
    icon: '📱',
    condition: (progress) => progress.planetProgress.ads?.completed >= progress.planetProgress.ads?.total,
    reward: { xp: 500, coins: 250 }
  },
  {
    id: 'all_planets_complete',
    title: 'Мастер вселенной',
    description: 'Завершите все планеты первого сезона',
    icon: '🌌',
    condition: (progress) => {
      return Object.values(progress.planetProgress).every(
        planet => planet.completed >= planet.total
      );
    },
    reward: { xp: 2000, coins: 1000 }
  }
];

// Сохранить прогресс
export const saveProgress = (progress) => {
  try {
    const dataToSave = {
      ...progress,
      lastActivity: new Date().toISOString()
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(dataToSave));
    return true;
  } catch (error) {
    console.error('Ошибка сохранения:', error);
    return false;
  }
};

// Загрузить прогресс
export const loadProgress = () => {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (!saved) {
      return defaultProgress;
    }
    const parsed = JSON.parse(saved);
    // Объединяем с дефолтом на случай если структура изменилась
    return { 
      ...defaultProgress, 
      ...parsed,
      // Убедимся что новые поля есть
      achievements: parsed.achievements || [],
      stats: {
        ...defaultProgress.stats,
        ...parsed.stats
      }
    };
  } catch (error) {
    console.error('Ошибка загрузки:', error);
    return defaultProgress;
  }
};

// Обновить прогресс
export const updateProgress = (updates) => {
  const current = loadProgress();
  const updated = { ...current, ...updates };
  saveProgress(updated);
  return updated;
};

// Завершить миссию
export const completeMission = (missionId, xpEarned, coinsEarned, planetId) => {
  const current = loadProgress();
  
  // Проверка - не пройдена ли уже
  if (current.completedMissions.includes(missionId)) {
    return current;
  }

  // Если planetId не передан, пытаемся определить из missionId
  if (!planetId) {
    if (missionId.startsWith('finance-')) planetId = 'finance';
    else if (missionId.startsWith('cyber-')) planetId = 'cyber';
    else if (missionId.startsWith('tech-')) planetId = 'tech';
    else if (missionId.startsWith('ads-')) planetId = 'ads';
  }

  const updated = {
    ...current,
    completedMissions: [...current.completedMissions, missionId],
    xp: current.xp + xpEarned,
    coins: current.coins + coinsEarned,
    stats: {
      ...current.stats,
      totalMissions: current.stats.totalMissions + 1,
      totalXP: current.stats.totalXP + xpEarned,
      totalCoins: current.stats.totalCoins + coinsEarned
    }
  };

  // Обновить прогресс планеты
  if (planetId && updated.planetProgress[planetId]) {
    updated.planetProgress[planetId].completed += 1;
  }

  // Проверить уровень
  updated.level = calculateLevel(updated.xp);

  saveProgress(updated);
  return updated;
};

// Добавить перфектный счёт
export const addPerfectScore = () => {
  const current = loadProgress();
  const updated = {
    ...current,
    stats: {
      ...current.stats,
      perfectScores: current.stats.perfectScores + 1
    }
  };
  saveProgress(updated);
  return updated;
};

// Проверить достижения
export const checkAchievements = (progress) => {
  const newAchievements = [];
  
  ACHIEVEMENTS.forEach(achievement => {
    // Если достижение уже есть - пропускаем
    if (progress.achievements.includes(achievement.id)) {
      return;
    }
    
    // Проверяем условие
    if (achievement.condition(progress)) {
      newAchievements.push(achievement);
    }
  });
  
  return newAchievements;
};

// Добавить достижение
export const addAchievement = (achievementId) => {
  const current = loadProgress();
  
  // Если уже есть - не добавляем
  if (current.achievements.includes(achievementId)) {
    return current;
  }
  
  // Найти достижение
  const achievement = ACHIEVEMENTS.find(a => a.id === achievementId);
  if (!achievement) {
    return current;
  }
  
  // Добавить награду
  const updated = {
    ...current,
    achievements: [...current.achievements, achievementId],
    xp: current.xp + (achievement.reward.xp || 0),
    coins: current.coins + (achievement.reward.coins || 0)
  };
  
  // Пересчитать уровень
  updated.level = calculateLevel(updated.xp);
  
  saveProgress(updated);
  return updated;
};

// Получить все достижения с их статусом
export const getAllAchievements = () => {
  const progress = loadProgress();
  
  return ACHIEVEMENTS.map(achievement => ({
    ...achievement,
    unlocked: progress.achievements.includes(achievement.id),
    progress: achievement.condition(progress) ? 100 : 0 // TODO: добавить частичный прогресс
  }));
};

// Рассчитать уровень по XP
export const calculateLevel = (xp) => {
  return Math.floor(Math.sqrt(xp / 100)) + 1;
};

// XP до следующего уровня
export const xpToNextLevel = (currentXP) => {
  const currentLevel = calculateLevel(currentXP);
  const nextLevelXP = currentLevel * currentLevel * 100;
  return nextLevelXP - currentXP;
};

// Процент до следующего уровня
export const progressToNextLevel = (currentXP) => {
  const currentLevel = calculateLevel(currentXP);
  const currentLevelXP = (currentLevel - 1) * (currentLevel - 1) * 100;
  const nextLevelXP = currentLevel * currentLevel * 100;
  const progress = currentXP - currentLevelXP;
  const required = nextLevelXP - currentLevelXP;
  return Math.round((progress / required) * 100);
};

// Обновить стрик
export const updateStreak = () => {
  const current = loadProgress();
  const today = new Date().toDateString();
  const lastDate = current.streak.lastDate;

  // Если уже обновляли сегодня - не обновляем
  if (lastDate === today) {
    return current;
  }

  // Проверяем было ли вчера
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  const wasYesterday = lastDate === yesterday.toDateString();

  const updated = {
    ...current,
    streak: {
      current: wasYesterday ? current.streak.current + 1 : 1,
      best: Math.max(
        current.streak.best, 
        wasYesterday ? current.streak.current + 1 : 1
      ),
      lastDate: today
    }
  };

  saveProgress(updated);
  return updated;
};

// Добавить время проведённое в приложении (в минутах)
export const addTimeSpent = (minutes) => {
  const current = loadProgress();
  const updated = {
    ...current,
    stats: {
      ...current.stats,
      totalTimeSpent: current.stats.totalTimeSpent + minutes
    }
  };
  saveProgress(updated);
  return updated;
};

// Сбросить прогресс (для тестирования)
export const resetProgress = () => {
  localStorage.removeItem(STORAGE_KEY);
  return defaultProgress;
};

// Экспортировать данные в JSON файл
export const exportProgress = () => {
  const progress = loadProgress();
  const dataStr = JSON.stringify(progress, null, 2);
  const dataBlob = new Blob([dataStr], { type: 'application/json' });
  const url = URL.createObjectURL(dataBlob);
  
  const link = document.createElement('a');
  link.href = url;
  link.download = `finsmart_backup_${Date.now()}.json`;
  link.click();
  
  URL.revokeObjectURL(url);
};

// Импортировать данные из JSON файла
export const importProgress = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    
    reader.onload = (e) => {
      try {
        const imported = JSON.parse(e.target.result);
        saveProgress(imported);
        resolve(imported);
      } catch (error) {
        reject(error);
      }
    };
    
    reader.onerror = reject;
    reader.readAsText(file);
  });
};

// Проверить есть ли сохранённый прогресс
export const hasSavedProgress = () => {
  return localStorage.getItem(STORAGE_KEY) !== null;
};

// Получить время последней активности
export const getLastActivity = () => {
  const progress = loadProgress();
  return progress.lastActivity;
};

// Получить статистику для родительской панели
export const getParentStats = () => {
  const progress = loadProgress();
  
  return {
    totalMissions: progress.stats.totalMissions,
    totalXP: progress.stats.totalXP,
    totalCoins: progress.stats.totalCoins,
    level: progress.level,
    currentStreak: progress.streak.current,
    bestStreak: progress.streak.best,
    achievements: progress.achievements.length,
    totalAchievements: ACHIEVEMENTS.length,
    totalTimeSpent: progress.stats.totalTimeSpent,
    planetProgress: progress.planetProgress,
    lastActivity: progress.lastActivity
  };
};

// Экспорт всех функций по умолчанию
export default {
  saveProgress,
  loadProgress,
  updateProgress,
  completeMission,
  addPerfectScore,
  checkAchievements,
  addAchievement,
  getAllAchievements,
  calculateLevel,
  xpToNextLevel,
  progressToNextLevel,
  updateStreak,
  addTimeSpent,
  resetProgress,
  exportProgress,
  importProgress,
  hasSavedProgress,
  getLastActivity,
  getParentStats,
  ACHIEVEMENTS
};