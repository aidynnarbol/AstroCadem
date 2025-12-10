// src/ai/AICharacterEngine.js
// Главный движок для управления AI-персонажем

import { sendMessage } from '../utils/anthropicAPI';
import CharacterMemory from './CharacterMemory';
import MissionGuide from './MissionGuide';

/**
 * Движок AI-персонажа
 * Управляет диалогом, памятью и прогрессом миссии
 */
class AICharacterEngine {
  constructor(characterConfig, user, mission = null) {
    this.character = characterConfig;
    this.user = user;
    this.mission = mission;
    
    // Инициализируем память
    this.memory = new CharacterMemory(
      characterConfig.id, 
      user.userId || user.username
    );
    
    // Инициализируем проводника миссии (если есть)
    this.missionGuide = mission ? 
      new MissionGuide(mission, this.memory) : null;
    
    // Состояние
    this.isProcessing = false;
    this.currentContext = this.buildContext();
  }

  /**
   * Построить контекст для AI
   */
  buildContext() {
    const memoryContext = this.memory.getContextForPrompt(this.mission?.id);
    
    return {
      user: this.user,
      mission: this.mission,
      ...memoryContext,
      missionGuidance: this.missionGuide ? 
        this.missionGuide.getAIGuidance() : null
    };
  }

  /**
   * Отправить сообщение AI
   */
  async sendMessage(userMessage) {
    if (this.isProcessing) {
      throw new Error('Already processing a message');
    }
    
    this.isProcessing = true;
    
    try {
      // 1. Сохраняем сообщение пользователя
      this.memory.addMessage('user', userMessage);
      
      // 2. Анализируем сообщение
      this.analyzeUserMessage(userMessage);
      
      // 3. Обновляем контекст
      this.currentContext = this.buildContext();
      
      // 4. Генерируем system prompt
      const systemPrompt = this.character.getSystemPrompt(this.currentContext);
      
      // 5. Получаем историю для API
      const conversationHistory = this.memory.getAPIFormattedHistory(10);
      
      // 6. Отправляем запрос к AI
      const aiResponse = await sendMessage(
        conversationHistory,
        systemPrompt,
        1500 // max tokens
      );
      
      // 7. Сохраняем ответ AI
      this.memory.addMessage('assistant', aiResponse);
      
      // 8. Анализируем ответ AI (извлекаем информацию)
      this.analyzeAIResponse(aiResponse);
      
      // 9. Обновляем прогресс миссии
      if (this.missionGuide) {
        this.missionGuide.incrementTurn();
      }
      
      return {
        message: aiResponse,
        metadata: this.getResponseMetadata()
      };
      
    } catch (error) {
      console.error('AI Engine Error:', error);
      
      // Fallback на случай ошибки
      return {
        message: this.getFallbackResponse(),
        error: true
      };
      
    } finally {
      this.isProcessing = false;
    }
  }

  /**
   * Анализ сообщения пользователя
   */
  analyzeUserMessage(message) {
    const lowerMessage = message.toLowerCase();
    
    // Определяем вовлечённость
    if (this.missionGuide) {
      this.missionGuide.assessEngagement(message);
    }
    
    // Извлекаем личную информацию
    this.extractPersonalInfo(message);
    
    // Определяем эмоциональное состояние
    if (/скучно|неинтересно|не хочу|устал/i.test(message)) {
      this.missionGuide?.setNeedsHelp(true);
    }
    
    // Запросы помощи
    if (/не понял|объясни|помощь|подсказ/i.test(message)) {
      this.missionGuide?.setNeedsHelp(true);
    }
    
    // Обновляем отношения
    if (/спасибо|круто|супер|отлично/i.test(message)) {
      this.memory.updateRelationship({ 
        friendliness: this.memory.memory.relationship.friendliness + 2 
      });
    }
  }

  /**
   * Извлечение личной информации из сообщения
   */
  extractPersonalInfo(message) {
    // Копит на что-то
    const savingMatch = message.match(/коплю на (.+)|хочу купить (.+)|мечтаю о (.+)/i);
    if (savingMatch) {
      const goal = savingMatch[1] || savingMatch[2] || savingMatch[3];
      this.memory.addGoal(goal.trim());
      this.memory.addPersonalInfo('savingFor', goal.trim());
    }
    
    // Интересы
    const interestMatch = message.match(/люблю (.+)|увлекаюсь (.+)|интересуюсь (.+)/i);
    if (interestMatch) {
      const interest = interestMatch[1] || interestMatch[2] || interestMatch[3];
      this.memory.addInterest(interest.trim());
    }
    
    // Возраст (если упомянул)
    const ageMatch = message.match(/мне (\d+) лет|я (\d+) лет/i);
    if (ageMatch) {
      const age = parseInt(ageMatch[1] || ageMatch[2]);
      this.memory.addPersonalInfo('age', age);
    }
  }

  /**
   * Анализ ответа AI
   */
  analyzeAIResponse(response) {
    // Определяем какие темы были затронуты
    if (this.mission && this.missionGuide) {
      const remainingTopics = this.missionGuide.progress.remainingTopics;
      
      remainingTopics.forEach(topic => {
        const topicKeywords = this.getTopicKeywords(topic);
        const mentioned = topicKeywords.some(keyword => 
          response.toLowerCase().includes(keyword.toLowerCase())
        );
        
        if (mentioned) {
          this.missionGuide.markTopicCovered(topic);
        }
      });
    }
  }

  /**
   * Получить ключевые слова темы
   */
  getTopicKeywords(topic) {
    const keywordMap = {
      'бартер': ['бартер', 'обмен товара', 'меняться', 'яблоки на корову'],
      'деньги': ['деньги', 'монеты', 'средство обмена', 'валюта'],
      'функции денег': ['функции', 'средство обмена', 'мера стоимости', 'накопление'],
      'бюджет': ['бюджет', 'план расходов', 'доходы', 'траты'],
      // ... можно расширять
    };
    
    // Ищем точное совпадение или частичное
    for (const [key, keywords] of Object.entries(keywordMap)) {
      if (topic.toLowerCase().includes(key)) {
        return keywords;
      }
    }
    
    // Если не нашли - используем сам топик
    return [topic];
  }

  /**
   * Метаданные ответа (для UI)
   */
  getResponseMetadata() {
    return {
      characterId: this.character.id,
      characterName: this.character.name,
      characterColor: this.character.color,
      characterEmoji: this.character.emoji,
      conversationTurn: this.memory.memory.conversationHistory.length,
      missionProgress: this.missionGuide ? 
        this.missionGuide.getProgressStatus() : null,
      relationship: this.memory.memory.relationship,
      canProceedToQuiz: this.missionGuide?.canProceedToAssessment() || false
    };
  }

  /**
   * Fallback ответ на случай ошибки
   */
  getFallbackResponse() {
    const responses = [
      "Йо-хо-хо! Кажется что-то пошло не так с моей связью... Попробуй ещё раз, матрос!",
      "Эх, старая голова! Задумался на секунду. Повтори вопрос?",
      "Ой, меня отвлекла чайка! Что ты говорил, юнга?"
    ];
    
    return responses[Math.floor(Math.random() * responses.length)];
  }

  /**
   * Получить быструю фразу персонажа
   */
  getQuickResponse(type) {
    const responses = this.character.quickResponses[type];
    if (!responses || responses.length === 0) return null;
    
    return responses[Math.floor(Math.random() * responses.length)];
  }

  /**
   * Начать миссию (первое приветствие)
   */
  async startMission() {
    if (this.missionGuide) {
      this.missionGuide.updateStage('greeting');
    }
    
    // Генерируем приветствие
    const greeting = await this.sendMessage('Привет!');
    
    return greeting;
  }

  /**
   * Перейти к следующей стадии миссии
   */
  async proceedToNextStage(stage) {
    if (!this.missionGuide) return;
    
    this.missionGuide.updateStage(stage);
    this.currentContext = this.buildContext();
  }

  /**
   * Завершить миссию
   */
  completeMission() {
    if (this.missionGuide) {
      this.missionGuide.completeMission();
    }
    
    // Повышаем отношения
    this.memory.updateRelationship({
      trust: this.memory.memory.relationship.trust + 10,
      respect: this.memory.memory.relationship.respect + 5
    });
    
    // Добавляем значимый момент
    this.memory.addSignificantMoment(
      `Успешно завершили миссию "${this.mission?.title}"`
    );
  }

  /**
   * Получить историю разговора для UI
   */
  getConversationHistory(limit = 20) {
    return this.memory.getConversationHistory(limit);
  }

  /**
   * Очистить память (для отладки)
   */
  clearMemory() {
    this.memory.clearMemory();
  }
}

export default AICharacterEngine;