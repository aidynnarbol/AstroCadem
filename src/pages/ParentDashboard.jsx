import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowLeft, TrendingUp, Trophy, Target, Clock, 
  CheckCircle, Activity, BarChart3, Zap, User,
  Calendar, Award, BookOpen, AlertCircle
} from 'lucide-react';
import CosmicBackgroundAdvanced from '../components/CosmicBackgroundAdvanced';

function ParentDashboard() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');

  const [userData] = useState(() => {
    const saved = JSON.parse(localStorage.getItem('finsmart_user') || '{}');
    const progress = JSON.parse(localStorage.getItem('finsmart_progress') || '{ "xp": 0, "level": 1, "completedMissions": [] }');
    
    return {
      name: saved.name || 'Агент',
      age: saved.age || 12,
      level: Math.floor(progress.xp / 500) + 1,
      xp: progress.xp || 0,
      completedMissions: progress.completedMissions || [],
      streakDays: parseInt(localStorage.getItem('finsmart_streak') || '0'),
      lastActivity: localStorage.getItem('finsmart_last_activity') || new Date().toLocaleDateString('ru-RU')
    };
  });

  const stats = {
    totalMissions: 19,
    completionRate: Math.round((userData.completedMissions.length / 19) * 100),
    timeSpent: userData.completedMissions.length * 15,
    weeklyProgress: [2, 3, 1, 4, 2, 3, 5]
  };

  const skills = [
    { name: 'Финансовая грамотность', level: 60, description: 'Управление деньгами, бюджетирование' },
    { name: 'Цифровая безопасность', level: 30, description: 'Умное использование технологий' },
    { name: 'Критическое мышление', level: 20, description: 'Распознавание маркетинга' },
    { name: 'Планирование и цели', level: 10, description: 'Постановка и достижение целей' }
  ];

  const recentMissions = [
    { title: 'Что такое деньги?', date: '14.11.2024', xp: 100 },
    { title: 'Хочу vs Нужно', date: '13.11.2024', xp: 150 },
    { title: 'Умное время', date: '12.11.2024', xp: 100 },
  ];

  return (
    <div className="relative min-h-screen bg-black text-white">
      <CosmicBackgroundAdvanced />

      {/* Header */}
      <div className="sticky top-0 z-50 bg-white/5 backdrop-blur-xl border-b border-white/10">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <button
            onClick={() => navigate('/dashboard')}
            className="flex items-center gap-2 text-white hover:text-cyan-400 transition-colors font-bold"
          >
            <ArrowLeft className="w-5 h-5" />
            Назад
          </button>
          <div className="flex items-center gap-4">
            <div className="text-right">
              <div className="text-sm text-gray-400">Родительская панель</div>
              <div className="font-bold">{userData.name}</div>
            </div>
            <div className="w-10 h-10 bg-cyan-500 rounded-full flex items-center justify-center">
              <User className="w-6 h-6 text-black" />
            </div>
          </div>
        </div>
      </div>

      <div className="relative z-20 max-w-6xl mx-auto px-6 py-12">
        
        {/* Tabs */}
        <div className="flex gap-3 mb-8">
          {[
            { id: 'overview', label: 'Обзор', icon: BarChart3 },
            { id: 'skills', label: 'Навыки', icon: BookOpen },
            { id: 'activity', label: 'Активность', icon: Activity }
          ].map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-6 py-3 rounded-lg font-bold transition-all flex items-center gap-2 ${
                  activeTab === tab.id
                    ? 'bg-white text-black'
                    : 'bg-white/5 text-white hover:bg-white/10 border border-white/10'
                }`}
              >
                <Icon className="w-5 h-5" />
                {tab.label}
              </button>
            );
          })}
        </div>

        <AnimatePresence mode="wait">
          
          {/* OVERVIEW */}
          {activeTab === 'overview' && (
            <motion.div
              key="overview"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-8"
            >
              {/* Main Stats Grid */}
              <div className="grid md:grid-cols-4 gap-6">
                <div className="p-6 bg-white/5 border border-white/10 rounded-xl">
                  <Trophy className="w-8 h-8 text-cyan-400 mb-3" />
                  <div className="text-sm text-gray-400 mb-1">Миссий завершено</div>
                  <div className="text-3xl font-black">{userData.completedMissions.length}</div>
                  <div className="text-xs text-gray-500 mt-1">из {stats.totalMissions}</div>
                </div>
                
                <div className="p-6 bg-white/5 border border-white/10 rounded-xl">
                  <Target className="w-8 h-8 text-purple-400 mb-3" />
                  <div className="text-sm text-gray-400 mb-1">Прогресс</div>
                  <div className="text-3xl font-black">{stats.completionRate}%</div>
                  <div className="text-xs text-gray-500 mt-1">обучения</div>
                </div>

                <div className="p-6 bg-white/5 border border-white/10 rounded-xl">
                  <Zap className="w-8 h-8 text-yellow-400 mb-3" />
                  <div className="text-sm text-gray-400 mb-1">Опыта</div>
                  <div className="text-3xl font-black">{userData.xp}</div>
                  <div className="text-xs text-gray-500 mt-1">XP</div>
                </div>

                <div className="p-6 bg-white/5 border border-white/10 rounded-xl">
                  <Activity className="w-8 h-8 text-green-400 mb-3" />
                  <div className="text-sm text-gray-400 mb-1">Стрик</div>
                  <div className="text-3xl font-black">{userData.streakDays}</div>
                  <div className="text-xs text-gray-500 mt-1">дней</div>
                </div>
              </div>

              {/* Two Columns */}
              <div className="grid md:grid-cols-2 gap-8">
                
                {/* Left: Info */}
                <div>
                  <h3 className="text-xl font-black mb-6">Общая информация</h3>
                  <div className="space-y-0 border-t border-white/10">
                    <InfoRow label="Уровень" value={userData.level.toString()} />
                    <InfoRow label="Возраст" value={`${userData.age} лет`} />
                    <InfoRow label="Времени потрачено" value={`${stats.timeSpent} минут`} />
                    <InfoRow label="Последняя активность" value={userData.lastActivity} />
                  </div>
                </div>

                {/* Right: Recommendations */}
                <div>
                  <h3 className="text-xl font-black mb-6">Рекомендации</h3>
                  <div className="space-y-4">
                    <div className="flex items-start gap-3 p-4 bg-white/5 border border-white/10 rounded-lg">
                      <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                      <div>
                        <div className="font-bold text-sm mb-1">Отличная регулярность</div>
                        <div className="text-xs text-gray-400">Занимается {userData.streakDays} дней подряд</div>
                      </div>
                    </div>

                    <div className="flex items-start gap-3 p-4 bg-white/5 border border-white/10 rounded-lg">
                      <Target className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-0.5" />
                      <div>
                        <div className="font-bold text-sm mb-1">Обсудите темы</div>
                        <div className="text-xs text-gray-400">Спросите, что нового узнал</div>
                      </div>
                    </div>

                    <div className="flex items-start gap-3 p-4 bg-white/5 border border-white/10 rounded-lg">
                      <AlertCircle className="w-5 h-5 text-yellow-400 flex-shrink-0 mt-0.5" />
                      <div>
                        <div className="font-bold text-sm mb-1">Практика в жизни</div>
                        <div className="text-xs text-gray-400">Привлекайте к планированию бюджета</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* SKILLS */}
          {activeTab === 'skills' && (
            <motion.div
              key="skills"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <h3 className="text-2xl font-black mb-6">Развитие навыков</h3>
              <div className="space-y-6">
                {skills.map((skill, index) => (
                  <motion.div
                    key={skill.name}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="p-6 bg-white/5 border border-white/10 rounded-xl"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h4 className="text-lg font-bold mb-1">{skill.name}</h4>
                        <p className="text-sm text-gray-400">{skill.description}</p>
                      </div>
                      <div className="text-3xl font-black text-cyan-400">{skill.level}%</div>
                    </div>
                    
                    <div className="h-3 bg-white/10 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${skill.level}%` }}
                        transition={{ duration: 1, delay: 0.2 + index * 0.1 }}
                        className="h-full bg-cyan-400 rounded-full"
                      />
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Recent Missions */}
              <div className="mt-8">
                <h3 className="text-xl font-black mb-6">Последние миссии</h3>
                <div className="space-y-3">
                  {recentMissions.map((mission, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-4 bg-white/5 border border-white/10 rounded-lg"
                    >
                      <div>
                        <div className="font-bold text-sm mb-1">{mission.title}</div>
                        <div className="text-xs text-gray-400">{mission.date}</div>
                      </div>
                      <div className="flex items-center gap-2 px-3 py-1 bg-cyan-400/10 rounded-lg">
                        <Zap className="w-4 h-4 text-cyan-400" />
                        <span className="text-cyan-400 font-bold text-sm">+{mission.xp}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {/* ACTIVITY */}
          {activeTab === 'activity' && (
            <motion.div
              key="activity"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <h3 className="text-2xl font-black mb-6">Активность по дням</h3>
              
              <div className="grid grid-cols-7 gap-4 mb-8">
                {['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'].map((day, index) => {
                  const missions = stats.weeklyProgress[index];
                  return (
                    <div key={day} className="text-center">
                      <div className="text-sm text-gray-400 font-bold mb-3">{day}</div>
                      <div className="bg-white/5 border border-white/10 rounded-lg p-4 h-32 flex flex-col items-center justify-end relative overflow-hidden">
                        <motion.div
                          initial={{ height: 0 }}
                          animate={{ height: `${(missions / 5) * 100}%` }}
                          transition={{ duration: 0.8, delay: index * 0.1 }}
                          className="absolute bottom-0 left-0 right-0 bg-cyan-400 rounded-t-lg"
                        />
                        <div className="relative z-10 text-2xl font-black">
                          {missions}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Time Summary */}
              <div className="grid md:grid-cols-3 gap-6">
                <div className="p-6 bg-white/5 border border-white/10 rounded-xl">
                  <Clock className="w-6 h-6 text-blue-400 mb-3" />
                  <div className="text-sm text-gray-400 mb-1">Всего времени</div>
                  <div className="text-3xl font-black">{stats.timeSpent}</div>
                  <div className="text-xs text-gray-500 mt-1">минут</div>
                </div>

                <div className="p-6 bg-white/5 border border-white/10 rounded-xl">
                  <Activity className="w-6 h-6 text-green-400 mb-3" />
                  <div className="text-sm text-gray-400 mb-1">Средняя сессия</div>
                  <div className="text-3xl font-black">15</div>
                  <div className="text-xs text-gray-500 mt-1">минут</div>
                </div>

                <div className="p-6 bg-white/5 border border-white/10 rounded-xl">
                  <Calendar className="w-6 h-6 text-purple-400 mb-3" />
                  <div className="text-sm text-gray-400 mb-1">Эта неделя</div>
                  <div className="text-3xl font-black">{stats.weeklyProgress.reduce((a, b) => a + b, 0)}</div>
                  <div className="text-xs text-gray-500 mt-1">миссий</div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

function InfoRow({ label, value }) {
  return (
    <div className="flex items-center justify-between py-3 border-b border-white/10">
      <span className="text-sm text-gray-400">{label}</span>
      <span className="font-bold">{value}</span>
    </div>
  );
}

export default ParentDashboard;