// src/contexts/UserContext.jsx
import { createContext, useContext, useState, useEffect } from 'react';
import { 
  loadProgress, 
  saveProgress, 
  completeMission as completeM,
  updateStreak,
  checkAchievements,
  addAchievement
} from '../utils/storage';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Загрузить прогресс при монтировании
  useEffect(() => {
    const progress = loadProgress();
    setUser(progress);
    setIsAuthenticated(progress.userId !== 'guest');
    setLoading(false);
    
    // Обновить стрик при загрузке
    if (progress.userId !== 'guest') {
      updateStreak();
    }
  }, []);

  // Сохранять при изменении пользователя
  useEffect(() => {
    if (user && !loading) {
      saveProgress(user);
    }
  }, [user, loading]);

  // Обновить данные пользователя
  const updateUser = (updates) => {
    setUser(prev => {
      if (!prev) return null;
      return { ...prev, ...updates };
    });
  };

  // Завершить миссию
  const completeMission = (missionId, xpEarned, coinsEarned, planetId) => {
    if (!user) return;

    // Проверка - не пройдена ли уже
    if (user.completedMissions.includes(missionId)) {
      console.log('Миссия уже пройдена:', missionId);
      return;
    }

    // Обновить прогресс
    const updated = completeM(missionId, xpEarned, coinsEarned, planetId);
    setUser(updated);

    // Обновить стрик
    updateStreak();

    // Проверить достижения
    const newAchievements = checkAchievements(updated);
    if (newAchievements.length > 0) {
      // Добавить новые достижения
      newAchievements.forEach(achievement => {
        addAchievement(achievement.id);
      });
      
      // Обновить юзера с новыми достижениями
      const progressWithAchievements = loadProgress();
      setUser(progressWithAchievements);
      
      // Вернуть достижения для показа уведомления
      return { 
        success: true, 
        newAchievements,
        updated: progressWithAchievements 
      };
    }

    return { success: true, updated };
  };

  // Добавить монеты
  const addCoins = (amount) => {
    if (!user) return;
    const newCoins = user.coins + amount;
    updateUser({ 
      coins: newCoins,
      stats: {
        ...user.stats,
        totalCoins: user.stats.totalCoins + amount
      }
    });
  };

  // Отнять монеты
  const spendCoins = (amount) => {
    if (!user || user.coins < amount) return false;
    updateUser({ 
      coins: user.coins - amount 
    });
    return true;
  };

  // Добавить XP
  const addXP = (amount) => {
    if (!user) return;
    const newXP = user.xp + amount;
    const newLevel = calculateLevel(newXP);
    const leveledUp = newLevel > user.level;

    updateUser({ 
      xp: newXP,
      level: newLevel,
      stats: {
        ...user.stats,
        totalXP: user.stats.totalXP + amount
      }
    });

    return { leveledUp, newLevel };
  };

  // Добавить значок/бейдж
  const addBadge = (badgeId) => {
    if (!user || user.badges.includes(badgeId)) return;
    updateUser({
      badges: [...user.badges, badgeId]
    });
  };

  // Обновить настройки
  const updateSettings = (settings) => {
    if (!user) return;
    updateUser({
      settings: { ...user.settings, ...settings }
    });
  };

  // Войти (установить юзера)
  const login = (userData) => {
    const userWithDefaults = {
      ...loadProgress(),
      ...userData,
      userId: userData.userId || Date.now().toString(),
      createdAt: userData.createdAt || new Date().toISOString(),
      lastActivity: new Date().toISOString()
    };
    setUser(userWithDefaults);
    setIsAuthenticated(true);
    saveProgress(userWithDefaults);
  };

  // Выйти
  const logout = () => {
    setUser(loadProgress()); // Вернуться к гостю
    setIsAuthenticated(false);
  };

  // Проверить завершена ли миссия
  const isMissionCompleted = (missionId) => {
    return user?.completedMissions?.includes(missionId) || false;
  };

  // Получить прогресс планеты
  const getPlanetProgress = (planetId) => {
    return user?.planetProgress?.[planetId] || { completed: 0, total: 0 };
  };

  // Проверить разблокирована ли планета
  const isPlanetUnlocked = (planetId) => {
    // Пока все планеты разблокированы
    // TODO: Добавить логику разблокировки
    return true;
  };

  // Вычислить уровень по XP
  const calculateLevel = (xp) => {
    return Math.floor(Math.sqrt(xp / 100)) + 1;
  };

  const value = {
    user,
    setUser,
    updateUser,
    completeMission,
    addCoins,
    spendCoins,
    addXP,
    addBadge,
    updateSettings,
    login,
    logout,
    isMissionCompleted,
    getPlanetProgress,
    isPlanetUnlocked,
    isAuthenticated,
    loading
  };

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
};

// Хук для использования контекста
export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within UserProvider');
  }
  return context;
};

export default UserContext;