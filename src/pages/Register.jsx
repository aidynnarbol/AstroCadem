import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  User, Calendar, Globe, Rocket, ArrowRight, Lock, AlertCircle, Eye, EyeOff
} from 'lucide-react';
import CosmicBackgroundAdvanced from '../components/CosmicBackgroundAdvanced';
import { useUser } from '../contexts/UserContext';
import { useGlitch } from '../contexts/GlitchContext';
import Glitch from '../components/Glitch';

function Register() {
  const navigate = useNavigate();
  const { login } = useUser();
  const { showTip, wasTipShown, setCurrentPage } = useGlitch();
  
  // Устанавливаем текущую страницу
  useEffect(() => {
    setCurrentPage('register');
  }, [setCurrentPage]);
  
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    language: 'ru',
    avatar: '🚀',
    avatarColor: '#fbbf24',
    password: '',
    confirmPassword: ''
  });
  
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});
  const [selectedCategory, setSelectedCategory] = useState('space');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Подсказки Глюка для каждого шага
  useEffect(() => {
    const timer = setTimeout(() => {
      if (step === 1 && !wasTipShown('register_step1')) {
        showTip('register_step1', {
          id: 'register_step1',
          title: '👋 Привет! Добро пожаловать!',
          message: 'Я помогу тебе создать аккаунт! Сначала напиши своё имя - так тебя будут называть в игре. Можешь использовать настоящее имя или придумать никнейм! 😊',
          buttons: [{ text: 'Понятно!', action: 'dismiss' }]
        });
      } else if (step === 2 && !wasTipShown('register_step2')) {
        showTip('register_step2', {
          id: 'register_step2',
          title: '🎂 Сколько тебе лет?',
          message: 'Выбери свой возраст! Это поможет подобрать задания подходящей сложности. Не волнуйся, эту информацию видишь только ты! 🔒',
          buttons: [{ text: 'Понял!', action: 'dismiss' }]
        });
      } else if (step === 3 && !wasTipShown('register_step3')) {
        showTip('register_step3', {
          id: 'register_step3',
          title: '🎨 Выбери свой стиль!',
          message: 'Время выбрать аватар! Это твой образ в игре - космонавт, робот, планета или что-то ещё! Можешь менять цвет нажимая на палитру. Выбирай что нравится! 🚀',
          buttons: [{ text: 'Круто!', action: 'dismiss' }]
        });
      } else if (step === 4 && !wasTipShown('register_step4')) {
        showTip('register_step4', {
          id: 'register_step4',
          title: '🔐 Защити свой аккаунт!',
          message: 'Придумай надёжный пароль минимум из 6 символов! Используй буквы и цифры. И не забудь его - запиши где-нибудь! Никому не говори пароль, даже друзьям! 🛡️',
          buttons: [{ text: 'Запомнил!', action: 'dismiss' }]
        });
      }
    }, 1000);

    return () => clearTimeout(timer);
  }, [step, showTip, wasTipShown]);

  const content = {
    ru: {
      title: 'Создай свой аккаунт',
      subtitle: 'Твоё космическое приключение начинается здесь',
      step: 'Шаг',
      of: 'из',
      nameLabel: 'Как тебя зовут?',
      namePlaceholder: 'Введи своё имя',
      nameHint: 'Так тебя будут называть в игре',
      ageLabel: 'Сколько тебе лет?',
      ageHint: 'Выбери свой возраст',
      languageLabel: 'Выбери язык',
      languageHint: 'Язык интерфейса',
      avatarLabel: 'Выбери аватар',
      avatarHint: 'Твой образ в игре',
      passwordLabel: 'Придумай пароль',
      passwordPlaceholder: 'Введи пароль',
      passwordHint: 'Минимум 6 символов',
      confirmPasswordLabel: 'Повтори пароль',
      confirmPasswordPlaceholder: 'Введи пароль ещё раз',
      confirmPasswordHint: 'Должен совпадать с первым паролем',
      passwordTip: 'Совет: используй буквы и цифры',
      passwordStrength: {
        weak: 'Слабый пароль',
        medium: 'Средний пароль',
        strong: 'Отличный пароль!'
      },
      continue: 'Продолжить',
      start: 'Начать игру',
      back: 'Назад',
      launching: 'Запуск...',
      preview: 'Твой профиль',
      languages: {
        ru: 'Русский',
        kz: 'Қазақша',
        en: 'English'
      },
      categories: {
        space: 'Космос',
        heroes: 'Герои',
        creatures: 'Существа',
        symbols: 'Символы'
      }
    }
  };

  const t = content[formData.language];

  // Аватары без градиентов
  const avatarCategories = {
    space: [
      { emoji: '🚀', color: '#fbbf24' },
      { emoji: '🛸', color: '#c084fc' },
      { emoji: '🪐', color: '#fb923c' },
      { emoji: '🌟', color: '#fde047' },
      { emoji: '🌙', color: '#cbd5e1' },
      { emoji: '☄️', color: '#67e8f9' },
      { emoji: '🛰️', color: '#34d399' },
      { emoji: '🌌', color: '#a78bfa' }
    ],
    heroes: [
      { emoji: '👨‍🚀', color: '#22d3ee' },
      { emoji: '👩‍🚀', color: '#f472b6' },
      { emoji: '🦸', color: '#f59e0b' },
      { emoji: '🦸‍♀️', color: '#ec4899' },
      { emoji: '🥷', color: '#374151' },
      { emoji: '🧙', color: '#6366f1' },
      { emoji: '🧙‍♀️', color: '#d946ef' },
      { emoji: '🤴', color: '#fbbf24' }
    ],
    creatures: [
      { emoji: '🤖', color: '#60a5fa' },
      { emoji: '👽', color: '#4ade80' },
      { emoji: '🐉', color: '#ef4444' },
      { emoji: '🦄', color: '#f9a8d4' },
      { emoji: '🦊', color: '#fb923c' },
      { emoji: '🐺', color: '#64748b' },
      { emoji: '🦁', color: '#fbbf24' },
      { emoji: '🐼', color: '#e5e7eb' }
    ],
    symbols: [
      { emoji: '⚡', color: '#fde047' },
      { emoji: '🔥', color: '#fb923c' },
      { emoji: '💎', color: '#67e8f9' },
      { emoji: '👑', color: '#fde047' },
      { emoji: '🎯', color: '#ef4444' },
      { emoji: '🎮', color: '#8b5cf6' },
      { emoji: '🎨', color: '#ec4899' },
      { emoji: '🏆', color: '#fbbf24' }
    ]
  };

  // Валидация имени
  const validateName = (name) => {
    if (name.length < 2) return 'Минимум 2 символа';
    if (name.length > 20) return 'Максимум 20 символов';
    if (!/^[а-яА-ЯёЁa-zA-Z\s]+$/.test(name)) return 'Только буквы';
    return null;
  };

  // Валидация пароля
  const validatePassword = (password) => {
    if (password.length < 6) return 'Минимум 6 символов';
    if (password.length > 50) return 'Максимум 50 символов';
    return null;
  };

  // Проверка силы пароля
  const getPasswordStrength = (password) => {
    if (!password) return null;
    
    let strength = 0;
    if (password.length >= 6) strength++;
    if (password.length >= 10) strength++;
    if (/[a-z]/.test(password) && /[A-Z]/.test(password)) strength++;
    if (/\d/.test(password)) strength++;
    if (/[^a-zA-Z0-9]/.test(password)) strength++;

    if (strength <= 2) return 'weak';
    if (strength <= 3) return 'medium';
    return 'strong';
  };

  const handleNext = () => {
    if (step === 1) {
      const nameError = validateName(formData.name);
      if (nameError) {
        setErrors({ name: nameError });
        return;
      }
      setErrors({});
    }

    if (step === 5) {
      const passwordError = validatePassword(formData.password);
      if (passwordError) {
        setErrors({ password: passwordError });
        return;
      }
      if (formData.password !== formData.confirmPassword) {
        setErrors({ confirmPassword: 'Пароли не совпадают' });
        return;
      }
      setErrors({});
    }

    if (step < 5) {
      setStep(step + 1);
    }
  };

  const handleSubmit = () => {
    setIsSubmitting(true);
    
    // Сохраняем данные с паролем
    const userData = {
      username: formData.name,
      age: parseInt(formData.age),
      language: formData.language,
      avatar: formData.avatar,
      avatarColor: formData.avatarColor,
      password: formData.password
    };

    // Сохраняем в localStorage (используем имя как ключ)
    const savedAccounts = JSON.parse(localStorage.getItem('astrocadem_accounts') || '{}');
    savedAccounts[formData.name.toLowerCase()] = userData;
    localStorage.setItem('astrocadem_accounts', JSON.stringify(savedAccounts));

    login(userData);
    
    setTimeout(() => {
      navigate('/dashboard');
    }, 500);
  };

  const passwordStrength = getPasswordStrength(formData.password);

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center p-4 overflow-hidden">
      <CosmicBackgroundAdvanced />

      <div className="w-full max-w-2xl relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl md:text-6xl font-black text-white mb-4">
            {t.title}
          </h1>
          <p className="text-xl text-gray-400">
            {t.subtitle}
          </p>
        </motion.div>

        {/* Progress */}
        <div className="flex items-center justify-center gap-3 mb-12">
          {[1, 2, 3, 4, 5].map((num) => (
            <motion.div
              key={num}
              className="relative"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: step >= num ? 1 : 0.8, opacity: step >= num ? 1 : 0.3 }}
            >
              <div className={`w-12 h-12 rounded-full flex items-center justify-center border-2 font-black ${
                step >= num 
                  ? 'bg-yellow-400 border-yellow-400 text-black' 
                  : 'bg-transparent border-white/20 text-white/50'
              }`}>
                {num}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Form */}
        <motion.div
          className="bg-white/5 backdrop-blur-xl rounded-3xl border border-white/10 p-8 md:p-12"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
        >
          <AnimatePresence mode="wait">
            {/* STEP 1: NAME */}
            {step === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
              >
                <div className="flex items-center gap-3 mb-6">
                  <User className="w-8 h-8 text-yellow-400" />
                  <h2 className="text-3xl font-black">{t.nameLabel}</h2>
                </div>
                <p className="text-gray-400 mb-8">{t.nameHint}</p>

                <div className="relative">
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => {
                      setFormData({ ...formData, name: e.target.value });
                      setErrors({});
                    }}
                    placeholder={t.namePlaceholder}
                    className={`w-full px-6 py-4 bg-white/5 border-2 rounded-2xl text-white text-xl focus:outline-none transition-all ${
                      errors.name 
                        ? 'border-red-500' 
                        : formData.name && !validateName(formData.name)
                        ? 'border-yellow-400'
                        : 'border-white/10 focus:border-yellow-400'
                    }`}
                    autoFocus
                  />
                  {errors.name && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex items-center gap-2 mt-3 text-red-400"
                    >
                      <AlertCircle className="w-5 h-5" />
                      <span>{errors.name}</span>
                    </motion.div>
                  )}
                </div>

                <button
                  onClick={handleNext}
                  disabled={!formData.name || validateName(formData.name)}
                  className="w-full mt-8 px-8 py-4 bg-yellow-400 text-black text-xl font-black rounded-2xl hover:bg-yellow-300 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3"
                >
                  {t.continue}
                  <ArrowRight className="w-6 h-6" />
                </button>
              </motion.div>
            )}

            {/* STEP 2: AGE */}
            {step === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
              >
                <div className="flex items-center gap-3 mb-6">
                  <Calendar className="w-8 h-8 text-yellow-400" />
                  <h2 className="text-3xl font-black">{t.ageLabel}</h2>
                </div>
                <p className="text-gray-400 mb-8">{t.ageHint}</p>

                <div className="grid grid-cols-4 gap-4">
                  {[10, 11, 12, 13, 14, 15, 16, 17].map((age) => (
                    <motion.button
                      key={age}
                      onClick={() => setFormData({ ...formData, age: age.toString() })}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className={`px-6 py-4 rounded-2xl text-2xl font-black transition-all ${
                        formData.age === age.toString()
                          ? 'bg-yellow-400 text-black'
                          : 'bg-white/5 text-white border-2 border-white/10 hover:border-yellow-400'
                      }`}
                    >
                      {age}
                    </motion.button>
                  ))}
                </div>

                <div className="flex gap-4 mt-8">
                  <button
                    onClick={() => setStep(1)}
                    className="px-8 py-4 bg-white/5 text-white text-xl font-black rounded-2xl hover:bg-white/10 transition-all border border-white/10"
                  >
                    {t.back}
                  </button>
                  <button
                    onClick={handleNext}
                    disabled={!formData.age}
                    className="flex-1 px-8 py-4 bg-yellow-400 text-black text-xl font-black rounded-2xl hover:bg-yellow-300 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3"
                  >
                    {t.continue}
                    <ArrowRight className="w-6 h-6" />
                  </button>
                </div>
              </motion.div>
            )}

            {/* STEP 3: LANGUAGE */}
            {step === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
              >
                <div className="flex items-center gap-3 mb-6">
                  <Globe className="w-8 h-8 text-yellow-400" />
                  <h2 className="text-3xl font-black">{t.languageLabel}</h2>
                </div>
                <p className="text-gray-400 mb-8">{t.languageHint}</p>

                <div className="space-y-4">
                  {['ru', 'kz', 'en'].map((lang) => (
                    <motion.button
                      key={lang}
                      onClick={() => setFormData({ ...formData, language: lang })}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className={`w-full px-8 py-4 rounded-2xl text-xl font-black transition-all ${
                        formData.language === lang
                          ? 'bg-yellow-400 text-black'
                          : 'bg-white/5 text-white border-2 border-white/10 hover:border-yellow-400'
                      }`}
                    >
                      {t.languages[lang]}
                    </motion.button>
                  ))}
                </div>

                <div className="flex gap-4 mt-8">
                  <button
                    onClick={() => setStep(2)}
                    className="px-8 py-4 bg-white/5 text-white text-xl font-black rounded-2xl hover:bg-white/10 transition-all border border-white/10"
                  >
                    {t.back}
                  </button>
                  <button
                    onClick={handleNext}
                    className="flex-1 px-8 py-4 bg-yellow-400 text-black text-xl font-black rounded-2xl hover:bg-yellow-300 transition-all flex items-center justify-center gap-3"
                  >
                    {t.continue}
                    <ArrowRight className="w-6 h-6" />
                  </button>
                </div>
              </motion.div>
            )}

            {/* STEP 4: AVATAR */}
            {step === 4 && (
              <motion.div
                key="step4"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
              >
                <div className="flex items-center gap-3 mb-6">
                  <Rocket className="w-8 h-8 text-yellow-400" />
                  <h2 className="text-3xl font-black">{t.avatarLabel}</h2>
                </div>
                <p className="text-gray-400 mb-8">{t.avatarHint}</p>

                {/* Categories */}
                <div className="flex gap-3 mb-6 overflow-x-auto">
                  {Object.keys(avatarCategories).map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setSelectedCategory(cat)}
                      className={`px-4 py-2 rounded-xl text-sm font-bold transition-all whitespace-nowrap ${
                        selectedCategory === cat
                          ? 'bg-yellow-400 text-black'
                          : 'bg-white/5 text-white hover:bg-white/10'
                      }`}
                    >
                      {t.categories[cat]}
                    </button>
                  ))}
                </div>

                {/* Avatars */}
                <div className="grid grid-cols-4 gap-4 mb-8">
                  {avatarCategories[selectedCategory].map((avatar, i) => (
                    <motion.button
                      key={i}
                      onClick={() => setFormData({ 
                        ...formData, 
                        avatar: avatar.emoji,
                        avatarColor: avatar.color 
                      })}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className={`aspect-square rounded-2xl text-5xl flex items-center justify-center transition-all ${
                        formData.avatar === avatar.emoji
                          ? 'ring-4 ring-yellow-400'
                          : 'bg-white/5 hover:bg-white/10'
                      }`}
                      style={{
                        backgroundColor: formData.avatar === avatar.emoji ? avatar.color : undefined
                      }}
                    >
                      {avatar.emoji}
                    </motion.button>
                  ))}
                </div>

                <div className="flex gap-4">
                  <button
                    onClick={() => setStep(3)}
                    className="px-8 py-4 bg-white/5 text-white text-xl font-black rounded-2xl hover:bg-white/10 transition-all border border-white/10"
                  >
                    {t.back}
                  </button>
                  <button
                    onClick={handleNext}
                    className="flex-1 px-8 py-4 bg-yellow-400 text-black text-xl font-black rounded-2xl hover:bg-yellow-300 transition-all flex items-center justify-center gap-3"
                  >
                    {t.continue}
                    <ArrowRight className="w-6 h-6" />
                  </button>
                </div>
              </motion.div>
            )}

            {/* STEP 5: PASSWORD */}
            {step === 5 && (
              <motion.div
                key="step5"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
              >
                <div className="flex items-center gap-3 mb-6">
                  <Lock className="w-8 h-8 text-yellow-400" />
                  <h2 className="text-3xl font-black">{t.passwordLabel}</h2>
                </div>
                <p className="text-gray-400 mb-8">{t.passwordHint}</p>

                {/* Password Input */}
                <div className="relative mb-6">
                  <input
                    type={showPassword ? "text" : "password"}
                    value={formData.password}
                    onChange={(e) => {
                      setFormData({ ...formData, password: e.target.value });
                      setErrors({});
                    }}
                    placeholder={t.passwordPlaceholder}
                    className={`w-full px-6 py-4 bg-white/5 border-2 rounded-2xl text-white text-xl focus:outline-none transition-all pr-14 ${
                      errors.password 
                        ? 'border-red-500' 
                        : formData.password && !validatePassword(formData.password)
                        ? 'border-yellow-400'
                        : 'border-white/10 focus:border-yellow-400'
                    }`}
                    autoFocus
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-6 h-6" /> : <Eye className="w-6 h-6" />}
                  </button>
                  
                  {errors.password && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex items-center gap-2 mt-3 text-red-400"
                    >
                      <AlertCircle className="w-5 h-5" />
                      <span>{errors.password}</span>
                    </motion.div>
                  )}

                  {/* Password Strength */}
                  {formData.password && !errors.password && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="mt-3"
                    >
                      <div className="flex gap-2 mb-2">
                        <div className={`h-2 flex-1 rounded-full ${passwordStrength ? 'bg-yellow-400' : 'bg-white/10'}`} />
                        <div className={`h-2 flex-1 rounded-full ${passwordStrength === 'medium' || passwordStrength === 'strong' ? 'bg-yellow-400' : 'bg-white/10'}`} />
                        <div className={`h-2 flex-1 rounded-full ${passwordStrength === 'strong' ? 'bg-yellow-400' : 'bg-white/10'}`} />
                      </div>
                      <p className="text-sm text-gray-400">
                        {passwordStrength && t.passwordStrength[passwordStrength]}
                      </p>
                    </motion.div>
                  )}
                </div>

                {/* Confirm Password */}
                <div className="relative mb-6">
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    value={formData.confirmPassword}
                    onChange={(e) => {
                      setFormData({ ...formData, confirmPassword: e.target.value });
                      setErrors({});
                    }}
                    placeholder={t.confirmPasswordPlaceholder}
                    className={`w-full px-6 py-4 bg-white/5 border-2 rounded-2xl text-white text-xl focus:outline-none transition-all pr-14 ${
                      errors.confirmPassword 
                        ? 'border-red-500' 
                        : formData.confirmPassword && formData.password === formData.confirmPassword
                        ? 'border-yellow-400'
                        : 'border-white/10 focus:border-yellow-400'
                    }`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                  >
                    {showConfirmPassword ? <EyeOff className="w-6 h-6" /> : <Eye className="w-6 h-6" />}
                  </button>

                  {errors.confirmPassword && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex items-center gap-2 mt-3 text-red-400"
                    >
                      <AlertCircle className="w-5 h-5" />
                      <span>{errors.confirmPassword}</span>
                    </motion.div>
                  )}
                </div>

                {/* Tip */}
                <div className="bg-yellow-400/10 border border-yellow-400/30 rounded-2xl p-4 mb-6">
                  <p className="text-sm text-yellow-400">{t.passwordTip}</p>
                </div>

                <div className="flex gap-4">
                  <button
                    onClick={() => setStep(4)}
                    className="px-8 py-4 bg-white/5 text-white text-xl font-black rounded-2xl hover:bg-white/10 transition-all border border-white/10"
                  >
                    {t.back}
                  </button>
                  <button
                    onClick={handleSubmit}
                    disabled={isSubmitting || !formData.password || !formData.confirmPassword || formData.password !== formData.confirmPassword || validatePassword(formData.password)}
                    className="flex-1 px-8 py-4 bg-yellow-400 text-black text-xl font-black rounded-2xl hover:bg-yellow-300 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3"
                  >
                    {isSubmitting ? t.launching : t.start}
                    <Rocket className="w-6 h-6" />
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
      
      {/* Глюк - помощник по регистрации */}
      <Glitch />
    </div>
  );
}

export default Register;