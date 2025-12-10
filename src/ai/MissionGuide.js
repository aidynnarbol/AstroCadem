// src/ai/MissionGuide.js
// Отслеживание и управление прогрессом миссии

/**
 * Проводник по миссии - следит чтобы AI достиг обучающих целей
 */
class MissionGuide {
  constructor(mission, characterMemory) {
    this.mission = mission;
    this.memory = characterMemory;
    this.missionId = mission.id;
    
    // Загружаем или инициализируем прогресс
    this.progress = this.memory.getMissionProgress(this.missionId) || 
      this.initializeProgress();
  }

  /**
   * Инициализация прогресса миссии
   */
  initializeProgress() {
    const progress = {
      startedAt: new Date().toISOString(),
      currentStage: 'greeting', // greeting → explanation → practice → assessment → completion
      coveredTopics: [],
      remainingTopics: [...(this.mission.learningGoals || [])],
      conversationTurns: 0,
      playerEngagement: 'medium', // low | medium | high
      needsHelp: false,
      assessmentAttempts: 0,
      completed: false
    };
    
    this.memory.updateMissionProgress(this.missionId, progress);
    return progress;
  }

  /**
   * Обновить стадию миссии
   */
  updateStage(newStage) {
    this.progress.currentStage = newStage;
    this.memory.updateMissionProgress(this.missionId, this.progress);
  }

  /**
   * Отметить тему как объяснённую
   */
  markTopicCovered(topic) {
    if (!this.progress.coveredTopics.includes(topic)) {
      this.progress.coveredTopics.push(topic);
      
      // Убираем из оставшихся
      this.progress.remainingTopics = this.progress.remainingTopics
        .filter(t => t !== topic);
      
      this.memory.updateMissionProgress(this.missionId, this.progress);
      
      // Также добавляем в общие темы разговора
      this.memory.addTopic(topic);
    }
  }

  /**
   * Проверить - все ли темы покрыты
   */
  areAllTopicsCovered() {
    return this.progress.remainingTopics.length === 0;
  }

  /**
   * Получить следующую тему для объяснения
   */
  getNextTopic() {
    return this.progress.remainingTopics[0] || null;
  }

  /**
   * Инкремент счётчика разговоров
   */
  incrementTurn() {
    this.progress.conversationTurns++;
    this.memory.updateMissionProgress(this.missionId, this.progress);
  }

  /**
   * Оценить вовлечённость игрока
   */
  assessEngagement(userMessage) {
    const length = userMessage.length;
    const hasQuestions = userMessage.includes('?');
    const enthusiasm = /(!|круто|интересно|супер|вау)/i.test(userMessage);
    
    let engagement = 'medium';
    
    if (length < 10 && !hasQuestions) {
      engagement = 'low'; // короткие незаинтересованные ответы
    } else if ((length > 50 || hasQuestions) && enthusiasm) {
      engagement = 'high'; // длинные вопросы с энтузиазмом
    }
    
    this.progress.playerEngagement = engagement;
    this.memory.updateMissionProgress(this.missionId, this.progress);
    
    return engagement;
  }

  /**
   * Отметить что игроку нужна помощь
   */
  setNeedsHelp(needs) {
    this.progress.needsHelp = needs;
    this.memory.updateMissionProgress(this.missionId, this.progress);
  }

  /**
   * Добавить попытку оценки (квиз)
   */
  addAssessmentAttempt(success) {
    this.progress.assessmentAttempts++;
    
    if (success) {
      this.progress.lastAssessmentSuccess = true;
    }
    
    this.memory.updateMissionProgress(this.missionId, this.progress);
  }

  /**
   * Завершить миссию
   */
  completeMission() {
    this.progress.completed = true;
    this.progress.completedAt = new Date().toISOString();
    this.progress.currentStage = 'completed';
    this.memory.updateMissionProgress(this.missionId, this.progress);
    
    // Добавляем значимый момент
    this.memory.addSignificantMoment(`Завершена миссия: ${this.mission.title}`);
  }

  /**
   * Получить подсказки для AI на основе прогресса
   */
  getAIGuidance() {
    const guidance = [];
    
    // Подсказки по стадии
    switch (this.progress.currentStage) {
      case 'greeting':
        guidance.push('Поприветствуй игрока, представься, создай атмосферу');
        break;
      case 'explanation':
        guidance.push(`Объясни следующую тему: ${this.getNextTopic()}`);
        break;
      case 'practice':
        guidance.push('Дай практический пример или задание');
        break;
      case 'assessment':
        guidance.push('Проверь понимание через вопросы или диалог');
        break;
    }
    
    // Подсказки по вовлечённости
    if (this.progress.playerEngagement === 'low') {
      guidance.push('ВНИМАНИЕ: Игрок не очень вовлечён. Попробуй заинтересовать историей или вопросом.');
    } else if (this.progress.playerEngagement === 'high') {
      guidance.push('Игрок очень заинтересован! Можешь давать более глубокие объяснения.');
    }
    
    // Подсказки по оставшимся темам
    if (this.progress.remainingTopics.length > 0) {
      guidance.push(`Ещё нужно объяснить: ${this.progress.remainingTopics.join(', ')}`);
    } else if (!this.progress.completed) {
      guidance.push('Все темы объяснены! Пора проверить понимание и завершить миссию.');
    }
    
    // Подсказки по попыткам оценки
    if (this.progress.assessmentAttempts > 2) {
      guidance.push('Игрок несколько раз ошибался. Возможно нужно упростить или повторить материал.');
    }
    
    return guidance.join('\n');
  }

  /**
   * Получить статус миссии для UI
   */
  getProgressStatus() {
    const total = this.mission.learningGoals?.length || 1;
    const covered = this.progress.coveredTopics.length;
    const percentage = Math.round((covered / total) * 100);
    
    return {
      percentage,
      covered,
      total,
      currentStage: this.progress.currentStage,
      needsHelp: this.progress.needsHelp,
      engagement: this.progress.playerEngagement
    };
  }

  /**
   * Проверить можно ли переходить к оценке
   */
  canProceedToAssessment() {
    // Все темы покрыты И игрок достаточно вовлечён
    return this.areAllTopicsCovered() && 
           this.progress.playerEngagement !== 'low';
  }

  /**
   * Сброс прогресса (для перепрохождения)
   */
  resetProgress() {
    this.progress = this.initializeProgress();
  }
}

export default MissionGuide;