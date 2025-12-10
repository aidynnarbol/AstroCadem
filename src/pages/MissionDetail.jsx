// src/pages/MissionDetail-COMPLETE.jsx
// ПОЛНЫЙ КОМПОНЕНТ МИССИИ С СЮЖЕТОМ

import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, CheckCircle, XCircle, Star, Play, Book } from 'lucide-react';
import CosmicBackgroundAdvanced from '../components/CosmicBackgroundAdvanced';
import DialogSystem from '../components/DialogSystem';
import ContentRenderer from '../components/ContentRenderer';
import { getMissionById } from '../data/missionsData';
import { getMissionContent } from '../data/missionContent-FULL';
import { useUser } from '../contexts/UserContext';

function MissionDetailComplete() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, completeMission } = useUser();
  
  const [mission, setMission] = useState(null);
  const [missionContent, setMissionContent] = useState(null);
  const [loading, setLoading] = useState(true);
  
  // Этапы миссии
  const [currentStage, setCurrentStage] = useState('arrival'); // arrival, lesson, video, examples, quiz, completion
  const [currentSectionIndex, setCurrentSectionIndex] = useState(0);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [answers, setAnswers] = useState([]);
  const [score, setScore] = useState(0);
  const [showExplanation, setShowExplanation] = useState(false);

  useEffect(() => {
    const foundMission = getMissionById(id);
    const content = getMissionContent(id);
    
    if (!foundMission) {
      alert('Миссия не найдена!');
      navigate('/mission-map');
      return;
    }
    
    if (!content) {
      alert('Контент миссии пока не готов!');
      navigate('/mission-map');
      return;
    }
    
    setMission(foundMission);
    setMissionContent(content);
    setLoading(false);
  }, [id, navigate]);

  const handleArrivalComplete = () => {
    setCurrentStage('lesson');
  };

  const handleNextSection = () => {
    if (currentSectionIndex < missionContent.lesson.sections.length - 1) {
      setCurrentSectionIndex(currentSectionIndex + 1);
    } else {
      setCurrentStage('video');
    }
  };

  const handlePrevSection = () => {
    if (currentSectionIndex > 0) {
      setCurrentSectionIndex(currentSectionIndex - 1);
    }
  };

  const handleVideoComplete = () => {
    setCurrentStage('examples');
  };

  const handleExamplesComplete = () => {
    setCurrentStage('quiz');
  };

  const handleAnswer = (optionIndex) => {
    if (selectedAnswer !== null) return; // Уже ответил
    
    const currentQuestion = missionContent.quiz[currentQuestionIndex];
    const isCorrect = optionIndex === currentQuestion.correct;
    
    setSelectedAnswer(optionIndex);
    setShowExplanation(true);
    
    setAnswers([...answers, {
      questionIndex: currentQuestionIndex,
      selected: optionIndex,
      correct: isCorrect
    }]);
    
    if (isCorrect) {
      setScore(score + 1);
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < missionContent.quiz.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedAnswer(null);
      setShowExplanation(false);
    } else {
      setCurrentStage('completion');
    }
  };

  const handleComplete = () => {
    if (mission && user) {
      const finalScore = Math.round((score / missionContent.quiz.length) * 100);
      
      const result = completeMission(
        mission.id,
        mission.xpReward,
        mission.coinsReward,
        mission.planetId
      );

      if (finalScore === 100) {
        import('../utils/storage').then(({ addPerfectScore }) => {
          addPerfectScore();
        });
      }
      
      if (result?.newAchievements && result.newAchievements.length > 0) {
        const achievementTexts = result.newAchievements.map(a => 
          `🏆 ${a.title}\n${a.description}\n+${a.reward.xp} XP, +${a.reward.coins} монет`
        ).join('\n\n');
        
        setTimeout(() => {
          alert(`🎉 НОВЫЕ ДОСТИЖЕНИЯ!\n\n${achievementTexts}`);
        }, 500);
      }
    }
    
    navigate('/mission-map');
  };

  if (loading) {
    return (
      <div style={{ minHeight: '100vh', background: '#000', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <CosmicBackgroundAdvanced />
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          style={{ fontSize: '4rem', position: 'relative', zIndex: 10 }}
        >
          ⚡
        </motion.div>
      </div>
    );
  }

  if (!mission || !missionContent) return null;

  const currentSection = missionContent.lesson?.sections[currentSectionIndex];
  const currentQuestion = missionContent.quiz?.[currentQuestionIndex];

  return (
    <div style={{ position: 'relative', minHeight: '100vh', background: '#000', overflow: 'hidden' }}>
      <CosmicBackgroundAdvanced />

      <div style={{ position: 'relative', zIndex: 20, minHeight: '100vh', padding: '2rem', paddingBottom: currentStage === 'arrival' || currentStage === 'completion' ? '10rem' : '2rem' }}>
        
        {/* Header - скрыт во время диалогов */}
        {currentStage !== 'arrival' && currentStage !== 'completion' && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '2rem',
              maxWidth: '1200px',
              margin: '0 auto 2rem'
            }}
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate('/mission-map')}
              style={{
                background: 'rgba(31, 41, 55, 0.95)',
                backdropFilter: 'blur(20px)',
                color: 'white',
                padding: '0.75rem 1.25rem',
                borderRadius: '0.75rem',
                border: '2px solid rgba(255, 255, 255, 0.1)',
                fontWeight: 700,
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                cursor: 'pointer'
              }}
            >
              <ArrowLeft size={18} />
              Назад
            </motion.button>

            <div style={{
              background: 'rgba(31, 41, 55, 0.95)',
              backdropFilter: 'blur(20px)',
              padding: '0.75rem 1.5rem',
              borderRadius: '0.75rem',
              border: `2px solid ${missionContent.mentor.color}40`
            }}>
              <div style={{
                fontSize: '0.875rem',
                color: missionContent.mentor.color,
                fontWeight: 700,
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem'
              }}>
                <span style={{ fontSize: '1.5rem' }}>{missionContent.mentor.icon}</span>
                {mission.title}
              </div>
            </div>
          </motion.div>
        )}

        {/* Content Area */}
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          
          {/* STAGE: ARRIVAL */}
          {currentStage === 'arrival' && (
            <DialogSystem
              character={missionContent.mentor}
              messages={missionContent.arrival.dialog}
              onComplete={handleArrivalComplete}
            />
          )}

          {/* STAGE: LESSON */}
          {currentStage === 'lesson' && currentSection && (
            <motion.div
              key={currentSectionIndex}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
            >
              <div style={{
                background: 'rgba(31, 41, 55, 0.95)',
                backdropFilter: 'blur(20px)',
                borderRadius: '1.5rem',
                border: '2px solid rgba(255, 255, 255, 0.1)',
                padding: '2rem',
                marginBottom: '2rem'
              }}>
                {/* Section Title */}
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '1rem',
                  marginBottom: '2rem'
                }}>
                  <Book size={28} style={{ color: missionContent.mentor.color }} />
                  <h2 style={{
                    fontSize: '2rem',
                    fontWeight: 900,
                    color: 'white'
                  }}>
                    {currentSection.title}
                  </h2>
                </div>

                {/* Section Content */}
                <div>
                  {currentSection.content.map((item, index) => (
                    <ContentRenderer key={index} content={item} />
                  ))}
                </div>

                {/* Navigation */}
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginTop: '2rem',
                  paddingTop: '1.5rem',
                  borderTop: '1px solid rgba(255, 255, 255, 0.1)'
                }}>
                  <motion.button
                    whileHover={{ scale: currentSectionIndex > 0 ? 1.05 : 1 }}
                    whileTap={{ scale: currentSectionIndex > 0 ? 0.95 : 1 }}
                    onClick={handlePrevSection}
                    disabled={currentSectionIndex === 0}
                    style={{
                      background: currentSectionIndex > 0 ? 'rgba(55, 65, 81, 0.8)' : 'rgba(55, 65, 81, 0.3)',
                      color: currentSectionIndex > 0 ? 'white' : '#6b7280',
                      padding: '0.75rem 1.5rem',
                      borderRadius: '0.75rem',
                      border: '2px solid rgba(255, 255, 255, 0.1)',
                      fontWeight: 700,
                      cursor: currentSectionIndex > 0 ? 'pointer' : 'not-allowed'
                    }}
                  >
                    Назад
                  </motion.button>

                  <div style={{ fontSize: '0.875rem', color: '#9ca3af' }}>
                    Раздел {currentSectionIndex + 1} из {missionContent.lesson.sections.length}
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleNextSection}
                    style={{
                      background: `linear-gradient(135deg, ${missionContent.mentor.color}, ${missionContent.mentor.color}cc)`,
                      color: 'white',
                      padding: '0.75rem 1.5rem',
                      borderRadius: '0.75rem',
                      border: 'none',
                      fontWeight: 700,
                      cursor: 'pointer',
                      boxShadow: `0 10px 30px ${missionContent.mentor.color}60`
                    }}
                  >
                    {currentSectionIndex < missionContent.lesson.sections.length - 1 ? 'Далее' : 'К видео →'}
                  </motion.button>
                </div>
              </div>
            </motion.div>
          )}

          {/* STAGE: VIDEO */}
          {currentStage === 'video' && missionContent.video && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
            >
              <div style={{
                background: 'rgba(31, 41, 55, 0.95)',
                backdropFilter: 'blur(20px)',
                borderRadius: '1.5rem',
                border: '2px solid rgba(255, 255, 255, 0.1)',
                padding: '2rem',
                marginBottom: '2rem'
              }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '1rem',
                  marginBottom: '1.5rem'
                }}>
                  <Play size={28} style={{ color: missionContent.mentor.color }} />
                  <div>
                    <h2 style={{
                      fontSize: '1.75rem',
                      fontWeight: 900,
                      color: 'white',
                      marginBottom: '0.25rem'
                    }}>
                      {missionContent.video.title}
                    </h2>
                    <p style={{ fontSize: '0.875rem', color: '#9ca3af' }}>
                      {missionContent.video.description} • {missionContent.video.duration}
                    </p>
                  </div>
                </div>

                <div style={{
                  position: 'relative',
                  paddingBottom: '56.25%',
                  height: 0,
                  overflow: 'hidden',
                  borderRadius: '1rem',
                  marginBottom: '1.5rem'
                }}>
                  <iframe
                    src={missionContent.video.url}
                    title={missionContent.video.title}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      width: '100%',
                      height: '100%'
                    }}
                  />
                </div>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleVideoComplete}
                  style={{
                    background: `linear-gradient(135deg, ${missionContent.mentor.color}, ${missionContent.mentor.color}cc)`,
                    color: 'white',
                    padding: '0.75rem 2rem',
                    borderRadius: '0.75rem',
                    border: 'none',
                    fontWeight: 700,
                    cursor: 'pointer',
                    width: '100%',
                    fontSize: '1rem',
                    boxShadow: `0 10px 30px ${missionContent.mentor.color}60`
                  }}
                >
                  Продолжить к примерам →
                </motion.button>
              </div>
            </motion.div>
          )}

          {/* STAGE: EXAMPLES */}
          {currentStage === 'examples' && missionContent.lifeExamples && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <div style={{
                background: 'rgba(31, 41, 55, 0.95)',
                backdropFilter: 'blur(20px)',
                borderRadius: '1.5rem',
                border: '2px solid rgba(255, 255, 255, 0.1)',
                padding: '2rem',
                marginBottom: '2rem'
              }}>
                <h2 style={{
                  fontSize: '2rem',
                  fontWeight: 900,
                  color: 'white',
                  marginBottom: '1rem'
                }}>
                  {missionContent.lifeExamples.title}
                </h2>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', marginBottom: '2rem' }}>
                  {missionContent.lifeExamples.scenarios.map((scenario, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.2 }}
                      style={{
                        background: 'rgba(55, 65, 81, 0.5)',
                        padding: '1.5rem',
                        borderRadius: '1rem',
                        border: '1px solid rgba(255, 255, 255, 0.1)'
                      }}
                    >
                      <h3 style={{
                        fontSize: '1.25rem',
                        fontWeight: 800,
                        color: missionContent.mentor.color,
                        marginBottom: '0.75rem'
                      }}>
                        {scenario.situation}
                      </h3>
                      <p style={{
                        fontSize: '1rem',
                        color: '#d1d5db',
                        marginBottom: '1rem',
                        lineHeight: 1.6
                      }}>
                        {scenario.description}
                      </p>
                      
                      <div style={{
                        background: 'rgba(31, 41, 55, 0.5)',
                        padding: '1rem',
                        borderRadius: '0.75rem',
                        marginBottom: '1rem'
                      }}>
                        <div style={{
                          fontSize: '0.875rem',
                          color: '#fbbf24',
                          fontWeight: 700,
                          marginBottom: '0.5rem'
                        }}>
                          Подумай:
                        </div>
                        <ul style={{ margin: 0, paddingLeft: '1.5rem', color: '#e5e7eb' }}>
                          {scenario.questions.map((q, qi) => (
                            <li key={qi} style={{ marginBottom: '0.5rem' }}>{q}</li>
                          ))}
                        </ul>
                      </div>

                      <div style={{
                        background: `linear-gradient(135deg, ${missionContent.mentor.color}20, ${missionContent.mentor.color}10)`,
                        padding: '1rem',
                        borderRadius: '0.75rem',
                        borderLeft: `4px solid ${missionContent.mentor.color}`
                      }}>
                        <div style={{
                          fontSize: '0.875rem',
                          color: missionContent.mentor.color,
                          fontWeight: 700,
                          marginBottom: '0.5rem'
                        }}>
                          💡 Ответ:
                        </div>
                        <p style={{ fontSize: '0.9375rem', color: '#e5e7eb', lineHeight: 1.6, margin: 0 }}>
                          {scenario.answer}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </div>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleExamplesComplete}
                  style={{
                    background: `linear-gradient(135deg, ${missionContent.mentor.color}, ${missionContent.mentor.color}cc)`,
                    color: 'white',
                    padding: '0.75rem 2rem',
                    borderRadius: '0.75rem',
                    border: 'none',
                    fontWeight: 700,
                    cursor: 'pointer',
                    width: '100%',
                    fontSize: '1rem',
                    boxShadow: `0 10px 30px ${missionContent.mentor.color}60`
                  }}
                >
                  Перейти к тесту →
                </motion.button>
              </div>
            </motion.div>
          )}

          {/* STAGE: QUIZ */}
          {currentStage === 'quiz' && currentQuestion && (
            <motion.div
              key={currentQuestionIndex}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.05 }}
            >
              <div style={{
                background: 'rgba(31, 41, 55, 0.95)',
                backdropFilter: 'blur(20px)',
                borderRadius: '1.5rem',
                border: '2px solid rgba(255, 255, 255, 0.1)',
                padding: '2rem',
                marginBottom: '2rem'
              }}>
                {/* Progress */}
                <div style={{ marginBottom: '2rem' }}>
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    marginBottom: '0.5rem'
                  }}>
                    <span style={{ fontSize: '0.875rem', color: '#9ca3af' }}>
                      Вопрос {currentQuestionIndex + 1} из {missionContent.quiz.length}
                    </span>
                    <span style={{ fontSize: '0.875rem', color: missionContent.mentor.color, fontWeight: 700 }}>
                      Правильных: {score} / {currentQuestionIndex + (selectedAnswer !== null ? 1 : 0)}
                    </span>
                  </div>
                  <div style={{
                    height: '8px',
                    background: 'rgba(55, 65, 81, 0.5)',
                    borderRadius: '9999px',
                    overflow: 'hidden'
                  }}>
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${((currentQuestionIndex + 1) / missionContent.quiz.length) * 100}%` }}
                      style={{
                        height: '100%',
                        background: `linear-gradient(90deg, ${missionContent.mentor.color}, ${missionContent.mentor.color}cc)`,
                        borderRadius: '9999px'
                      }}
                    />
                  </div>
                </div>

                {/* Question */}
                <h3 style={{
                  fontSize: '1.5rem',
                  fontWeight: 800,
                  color: 'white',
                  marginBottom: '1.5rem',
                  lineHeight: 1.4
                }}>
                  {currentQuestion.question}
                </h3>

                {/* Options */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '1.5rem' }}>
                  {currentQuestion.options.map((option, index) => {
                    const isSelected = selectedAnswer === index;
                    const isCorrect = index === currentQuestion.correct;
                    const showResult = selectedAnswer !== null;

                    let bgColor = 'rgba(55, 65, 81, 0.5)';
                    let borderColor = 'rgba(255, 255, 255, 0.1)';
                    let icon = null;

                    if (showResult) {
                      if (isSelected && isCorrect) {
                        bgColor = 'rgba(16, 185, 129, 0.2)';
                        borderColor = '#10b981';
                        icon = <CheckCircle size={20} style={{ color: '#10b981' }} />;
                      } else if (isSelected && !isCorrect) {
                        bgColor = 'rgba(239, 68, 68, 0.2)';
                        borderColor = '#ef4444';
                        icon = <XCircle size={20} style={{ color: '#ef4444' }} />;
                      } else if (isCorrect) {
                        bgColor = 'rgba(16, 185, 129, 0.1)';
                        borderColor = '#10b98180';
                        icon = <CheckCircle size={20} style={{ color: '#10b981' }} />;
                      }
                    }

                    return (
                      <motion.button
                        key={index}
                        whileHover={{ scale: selectedAnswer === null ? 1.02 : 1 }}
                        whileTap={{ scale: selectedAnswer === null ? 0.98 : 1 }}
                        onClick={() => handleAnswer(index)}
                        disabled={selectedAnswer !== null}
                        style={{
                          background: bgColor,
                          border: `2px solid ${borderColor}`,
                          borderRadius: '1rem',
                          padding: '1.25rem',
                          fontSize: '1rem',
                          color: 'white',
                          textAlign: 'left',
                          cursor: selectedAnswer === null ? 'pointer' : 'default',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '1rem',
                          transition: 'all 0.3s'
                        }}
                      >
                        <div style={{
                          width: '2rem',
                          height: '2rem',
                          borderRadius: '50%',
                          background: 'rgba(255, 255, 255, 0.1)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontWeight: 700,
                          flexShrink: 0
                        }}>
                          {icon || String.fromCharCode(65 + index)}
                        </div>
                        <span style={{ flex: 1 }}>{option}</span>
                      </motion.button>
                    );
                  })}
                </div>

                {/* Explanation */}
                <AnimatePresence>
                  {showExplanation && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      style={{
                        background: `linear-gradient(135deg, ${missionContent.mentor.color}20, ${missionContent.mentor.color}10)`,
                        border: `2px solid ${missionContent.mentor.color}40`,
                        borderRadius: '1rem',
                        padding: '1.25rem',
                        marginBottom: '1rem'
                      }}
                    >
                      <div style={{
                        fontSize: '0.875rem',
                        color: missionContent.mentor.color,
                        fontWeight: 700,
                        marginBottom: '0.5rem'
                      }}>
                        💡 Объяснение:
                      </div>
                      <p style={{
                        fontSize: '1rem',
                        color: '#e5e7eb',
                        lineHeight: 1.6,
                        margin: 0
                      }}>
                        {currentQuestion.explanation}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Next Button */}
                {selectedAnswer !== null && (
                  <motion.button
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleNextQuestion}
                    style={{
                      background: `linear-gradient(135deg, ${missionContent.mentor.color}, ${missionContent.mentor.color}cc)`,
                      color: 'white',
                      padding: '0.75rem 2rem',
                      borderRadius: '0.75rem',
                      border: 'none',
                      fontWeight: 700,
                      cursor: 'pointer',
                      width: '100%',
                      fontSize: '1rem',
                      boxShadow: `0 10px 30px ${missionContent.mentor.color}60`
                    }}
                  >
                    {currentQuestionIndex < missionContent.quiz.length - 1 ? 'Следующий вопрос →' : 'Завершить тест →'}
                  </motion.button>
                )}
              </div>
            </motion.div>
          )}

          {/* STAGE: COMPLETION */}
          {currentStage === 'completion' && (
            <DialogSystem
              character={missionContent.mentor}
              messages={missionContent.completion.dialog}
              onComplete={handleComplete}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default MissionDetailComplete;