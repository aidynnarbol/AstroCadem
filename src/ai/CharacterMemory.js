// src/ai/CharacterMemory.js
// Система памяти AI-персонажей

const MEMORY_STORAGE_KEY = 'finsmart_ai_memory';

/**
 * Управление памятью AI-персонажей
 */
class CharacterMemory {
  constructor(characterId, userId) {
    this.characterId = characterId;
    this.userId = userId;
    this.memory = this.loadMemory();
  }

  /**
   * Загрузить память из localStorage
   */
  loadMemory() {
    try {
      const stored = localStorage.getItem(MEMORY_STORAGE_KEY);
      if (!stored) return this.getDefaultMemory();
      
      const allMemory = JSON.parse(stored);
      const userMemory = allMemory[this.userId] || {};
      const characterMemory = userMemory[this.characterId] || this.getDefaultMemory();
      
      return characterMemory;
    } catch (error) {
      console.error('Error loading memory:', error);
      return this.getDefaultMemory();
    }
  }

  /**
   * Дефолтная структура памяти
   */
  getDefaultMemory() {
    return {
      conversationHistory: [],
      playerProfile: {
        communicationStyle: null, // 'curious' | 'fast' | 'detailed' | 'playful'
        learningSpeed: null, // 'slow' | 'medium' | 'fast'
        preferredExamples: [], // типы примеров которые нравятся
        interests: [], // интересы игрока
        goals: [], // на что копит, чего хочет достичь
        struggles: [] // с чем есть трудности
      },
      relationship: {
        trust: 50, // 0-100
        friendliness: 50, // 0-100
        respect: 50, // 0-100
        lastInteraction: null
      },
      missionProgress: {}, // прогресс по каждой миссии
      personalInfo: {}, // личная информация (приватная)
      significantMoments: [], // важные моменты в общении
      lastTopics: [], // последние 5 тем разговора
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
  }

  /**
   * Сохранить память
   */
  saveMemory() {
    try {
      const stored = localStorage.getItem(MEMORY_STORAGE_KEY);
      const allMemory = stored ? JSON.parse(stored) : {};
      
      if (!allMemory[this.userId]) {
        allMemory[this.userId] = {};
      }
      
      this.memory.updatedAt = new Date().toISOString();
      allMemory[this.userId][this.characterId] = this.memory;
      
      localStorage.setItem(MEMORY_STORAGE_KEY, JSON.stringify(allMemory));
    } catch (error) {
      console.error('Error saving memory:', error);
    }
  }

  /**
   * Добавить сообщение в историю
   */
  addMessage(role, content, metadata = {}) {
    const message = {
      role, // 'user' | 'assistant'
      content,
      timestamp: new Date().toISOString(),
      ...metadata
    };
    
    this.memory.conversationHistory.push(message);
    
    // Храним только последние 50 сообщений (чтобы не раздувать память)
    if (this.memory.conversationHistory.length > 50) {
      this.memory.conversationHistory = this.memory.conversationHistory.slice(-50);
    }
    
    this.saveMemory();
    return message;
  }

  /**
   * Получить историю разговора
   * @param {Number} limit - сколько последних сообщений
   */
  getConversationHistory(limit = 10) {
    return this.memory.conversationHistory.slice(-limit);
  }

  /**
   * Получить историю в формате для API
   */
  getAPIFormattedHistory(limit = 10) {
    return this.getConversationHistory(limit).map(msg => ({
      role: msg.role,
      content: msg.content
    }));
  }

  /**
   * Обновить профиль игрока
   */
  updatePlayerProfile(updates) {
    this.memory.playerProfile = {
      ...this.memory.playerProfile,
      ...updates
    };
    this.saveMemory();
  }

  /**
   * Анализ стиля общения игрока (автоматически)
   */
  analyzePlayerStyle() {
    const recentMessages = this.getConversationHistory(10)
      .filter(m => m.role === 'user');
    
    if (recentMessages.length < 3) return null;
    
    // Анализируем характеристики
    const avgLength = recentMessages.reduce((sum, m) => 
      sum + m.content.length, 0) / recentMessages.length;
    
    const hasQuestions = recentMessages.filter(m => 
      m.content.includes('?')).length / recentMessages.length;
    
    const quickResponses = recentMessages.filter(m => 
      m.content.length < 20).length / recentMessages.length;
    
    // Определяем стиль
    let style = 'medium';
    
    if (hasQuestions > 0.5) {
      style = 'curious'; // много вопросов
    } else if (quickResponses > 0.6) {
      style = 'fast'; // короткие быстрые ответы
    } else if (avgLength > 100) {
      style = 'detailed'; // длинные развёрнутые ответы
    }
    
    this.memory.playerProfile.communicationStyle = style;
    this.saveMemory();
    
    return style;
  }

  /**
   * Добавить личную информацию
   */
  addPersonalInfo(key, value) {
    this.memory.personalInfo[key] = {
      value,
      addedAt: new Date().toISOString()
    };
    this.saveMemory();
  }

  /**
   * Получить личную информацию
   */
  getPersonalInfo(key = null) {
    if (key) {
      return this.memory.personalInfo[key]?.value || null;
    }
    return this.memory.personalInfo;
  }

  /**
   * Добавить интерес игрока
   */
  addInterest(interest) {
    if (!this.memory.playerProfile.interests.includes(interest)) {
      this.memory.playerProfile.interests.push(interest);
      this.saveMemory();
    }
  }

  /**
   * Добавить цель игрока
   */
  addGoal(goal) {
    if (!this.memory.playerProfile.goals.includes(goal)) {
      this.memory.playerProfile.goals.push(goal);
      this.saveMemory();
    }
  }

  /**
   * Обновить отношения
   */
  updateRelationship(changes) {
    this.memory.relationship = {
      ...this.memory.relationship,
      ...changes,
      lastInteraction: new Date().toISOString()
    };
    
    // Ограничиваем 0-100
    Object.keys(changes).forEach(key => {
      if (typeof this.memory.relationship[key] === 'number') {
        this.memory.relationship[key] = Math.max(0, 
          Math.min(100, this.memory.relationship[key]));
      }
    });
    
    this.saveMemory();
  }

  /**
   * Добавить значимый момент
   */
  addSignificantMoment(moment) {
    this.memory.significantMoments.push({
      moment,
      timestamp: new Date().toISOString()
    });
    
    // Храним последние 20
    if (this.memory.significantMoments.length > 20) {
      this.memory.significantMoments = this.memory.significantMoments.slice(-20);
    }
    
    this.saveMemory();
  }

  /**
   * Обновить прогресс миссии
   */
  updateMissionProgress(missionId, progress) {
    if (!this.memory.missionProgress[missionId]) {
      this.memory.missionProgress[missionId] = {
        startedAt: new Date().toISOString(),
        coveredTopics: [],
        remainingTopics: [],
        currentStage: 'start'
      };
    }
    
    this.memory.missionProgress[missionId] = {
      ...this.memory.missionProgress[missionId],
      ...progress,
      updatedAt: new Date().toISOString()
    };
    
    this.saveMemory();
  }

  /**
   * Получить прогресс миссии
   */
  getMissionProgress(missionId) {
    return this.memory.missionProgress[missionId] || null;
  }

  /**
   * Добавить тему разговора
   */
  addTopic(topic) {
    this.memory.lastTopics.push({
      topic,
      timestamp: new Date().toISOString()
    });
    
    // Храним последние 10 тем
    if (this.memory.lastTopics.length > 10) {
      this.memory.lastTopics = this.memory.lastTopics.slice(-10);
    }
    
    this.saveMemory();
  }

  /**
   * Получить контекст для промпта
   */
  getContextForPrompt(missionId = null) {
    const style = this.analyzePlayerStyle();
    
    return {
      playerStyle: style ? this.getStyleDescription(style) : null,
      previousInteractions: this.memory.significantMoments.slice(-5),
      personalInfo: this.memory.personalInfo,
      relationship: this.memory.relationship,
      currentStage: missionId ? 
        this.memory.missionProgress[missionId]?.currentStage : null,
      coveredTopics: missionId ? 
        this.memory.missionProgress[missionId]?.coveredTopics : [],
      remainingTopics: missionId ? 
        this.memory.missionProgress[missionId]?.remainingTopics : [],
      isFirstMeeting: this.memory.conversationHistory.length === 0
    };
  }

  /**
   * Описание стиля общения
   */
  getStyleDescription(style) {
    const descriptions = {
      curious: 'Игрок любознательный, задаёт много вопросов. Давай подробные объяснения и поощряй любопытство.',
      fast: 'Игрок предпочитает быстрый темп, короткие ответы. Будь кратким, больше действия.',
      detailed: 'Игрок любит подробности, развёрнутые ответы. Можешь давать глубокие объяснения.',
      medium: 'Игрок общается в среднем темпе. Баланс между краткостью и подробностями.'
    };
    
    return descriptions[style] || descriptions.medium;
  }

  /**
   * Очистить память (для отладки)
   */
  clearMemory() {
    this.memory = this.getDefaultMemory();
    this.saveMemory();
  }

  /**
   * Экспорт памяти (для бэкапа)
   */
  exportMemory() {
    return JSON.stringify(this.memory, null, 2);
  }
}

export default CharacterMemory;