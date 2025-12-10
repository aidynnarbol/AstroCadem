import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, BookOpen, Sparkles, Lock, Book, Video, FileText, Headphones } from 'lucide-react';
import CosmicBackgroundAdvanced from '../components/CosmicBackgroundAdvanced';

function Library() {
  const navigate = useNavigate();

  const categories = [
    {
      id: 1,
      title: 'Статьи',
      description: 'Полезные материалы о деньгах',
      icon: FileText,
      emoji: '📄',
      color: 'from-yellow-400 to-orange-500',
      count: '24+'
    },
    {
      id: 2,
      title: 'Видео',
      description: 'Обучающие ролики и мультфильмы',
      icon: Video,
      emoji: '🎬',
      color: 'from-purple-400 to-pink-500',
      count: '15+'
    },
    {
      id: 3,
      title: 'Книги',
      description: 'Интересные истории про финансы',
      icon: Book,
      emoji: '📚',
      color: 'from-cyan-400 to-blue-500',
      count: '8+'
    },
    {
      id: 4,
      title: 'Подкасты',
      description: 'Слушай в дороге',
      icon: Headphones,
      emoji: '🎧',
      color: 'from-emerald-400 to-green-500',
      count: '12+'
    }
  ];

  return (
    <div className="min-h-screen bg-black overflow-hidden relative">
      <CosmicBackgroundAdvanced />

      <div className="relative z-10 min-h-screen flex flex-col">
        {/* Хедер */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-6"
        >
          <button
            onClick={() => navigate('/dashboard')}
            className="flex items-center gap-2 text-white/80 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="font-bold">Назад к пульту</span>
          </button>
        </motion.div>

        {/* Основной контент */}
        <div className="flex-1 flex items-center justify-center p-4">
          <div className="max-w-5xl w-full">
            
            {/* Заголовок */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="text-center mb-16"
            >
              {/* Иконка библиотеки */}
              <motion.div
                animate={{
                  rotate: [0, -5, 5, 0],
                  scale: [1, 1.1, 1]
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="inline-block mb-6"
              >
                <div className="relative">
                  <motion.div
                    animate={{
                      scale: [1, 1.5, 1],
                      opacity: [0.3, 0.6, 0.3]
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity
                    }}
                    className="absolute inset-0 bg-cyan-400 rounded-full blur-3xl"
                  />
                  <div className="relative w-32 h-32 rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 flex items-center justify-center shadow-2xl">
                    <BookOpen className="w-16 h-16 text-white" />
                  </div>
                </div>
              </motion.div>

              <h1 className="text-5xl md:text-7xl font-black mb-4">
                <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-cyan-400 bg-clip-text text-transparent">
                  Библиотека
                </span>
              </h1>

              <p className="text-gray-300 text-xl mb-8">
                Статьи, книги, видео и подкасты о финансах
              </p>

              {/* Badge "Скоро" */}
              <motion.div
                animate={{
                  scale: [1, 1.1, 1],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity
                }}
                className="inline-flex items-center gap-2 bg-yellow-400 text-slate-900 px-6 py-3 rounded-full font-black text-lg"
              >
                <Sparkles className="w-5 h-5" />
                НАПОЛНЯЕТСЯ
              </motion.div>
            </motion.div>

            {/* Категории */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="grid md:grid-cols-2 gap-6 mb-12"
            >
              {categories.map((category, index) => {
                const Icon = category.icon;
                
                return (
                  <motion.div
                    key={category.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.5 + index * 0.1 }}
                    className="relative group"
                  >
                    {/* Свечение */}
                    <div className={`absolute inset-0 bg-gradient-to-r ${category.color} opacity-20 blur-2xl rounded-3xl`} />

                    {/* Карточка */}
                    <div className="relative bg-slate-900/60 backdrop-blur-xl rounded-3xl p-8 border border-white/10">
                      
                      <div className="flex items-start justify-between mb-4">
                        {/* Иконка */}
                        <div className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${category.color} flex items-center justify-center`}>
                          <Icon className="w-8 h-8 text-white" />
                        </div>

                        {/* Эмодзи */}
                        <motion.div
                          animate={{
                            rotate: [0, 10, -10, 0]
                          }}
                          transition={{
                            duration: 3,
                            repeat: Infinity,
                            delay: index * 0.5
                          }}
                          className="text-5xl"
                        >
                          {category.emoji}
                        </motion.div>
                      </div>

                      {/* Название и счетчик */}
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="text-2xl font-bold text-white">
                          {category.title}
                        </h3>
                        <div className={`bg-gradient-to-r ${category.color} text-white px-3 py-1 rounded-full text-sm font-bold`}>
                          {category.count}
                        </div>
                      </div>

                      {/* Описание */}
                      <p className="text-gray-400">
                        {category.description}
                      </p>

                      {/* Замок */}
                      <div className="mt-4 flex items-center gap-2 text-gray-500">
                        <Lock className="w-4 h-4" />
                        <span className="text-sm">Контент в разработке</span>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>

            {/* Информация */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
              className="text-center"
            >
              <div className="bg-slate-900/40 backdrop-blur-xl rounded-2xl p-8 border border-white/10 max-w-3xl mx-auto">
                <h3 className="text-2xl font-bold text-white mb-4">
                  📚 Что будет в библиотеке?
                </h3>
                <div className="grid md:grid-cols-2 gap-4 text-left">
                  <div className="flex items-start gap-3">
                    <div className="text-2xl">📄</div>
                    <div>
                      <h4 className="text-white font-bold mb-1">Статьи</h4>
                      <p className="text-gray-400 text-sm">Короткие и понятные материалы о деньгах, накоплениях и инвестициях</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="text-2xl">🎬</div>
                    <div>
                      <h4 className="text-white font-bold mb-1">Видео</h4>
                      <p className="text-gray-400 text-sm">Анимированные уроки и истории про финансы</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="text-2xl">📚</div>
                    <div>
                      <h4 className="text-white font-bold mb-1">Книги</h4>
                      <p className="text-gray-400 text-sm">Рекомендации полезных книг для детей и подростков</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="text-2xl">🎧</div>
                    <div>
                      <h4 className="text-white font-bold mb-1">Подкасты</h4>
                      <p className="text-gray-400 text-sm">Истории и интервью в аудио формате</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Плавающие книги */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute text-4xl"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -30, 0],
            x: [0, 20, 0],
            rotate: [0, 10, 0],
            opacity: [0, 0.3, 0],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            delay: i * 0.8
          }}
        >
          {['📖', '📚', '📓', '📔', '📕', '📗'][i]}
        </motion.div>
      ))}
    </div>
  );
}

export default Library;