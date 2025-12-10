import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { User, Lock, AlertCircle, Eye, EyeOff, ArrowRight, Rocket } from 'lucide-react';
import CosmicBackgroundAdvanced from '../components/CosmicBackgroundAdvanced';
import { useUser } from '../contexts/UserContext';

function Login() {
  const navigate = useNavigate();
  const { login } = useUser();
  
  const [formData, setFormData] = useState({
    name: '',
    password: ''
  });
  
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const content = {
    ru: {
      title: 'Вход в аккаунт',
      subtitle: 'Продолжи своё космическое путешествие',
      nameLabel: 'Твоё имя',
      namePlaceholder: 'Введи своё имя',
      passwordLabel: 'Пароль',
      passwordPlaceholder: 'Введи пароль',
      loginButton: 'Войти',
      loggingIn: 'Вход...',
      noAccount: 'Ещё нет аккаунта?',
      register: 'Зарегистрируйся',
      errorNotFound: 'Аккаунт не найден',
      errorWrongPassword: 'Неверный пароль',
      errorEmpty: 'Заполни все поля'
    }
  };

  const t = content.ru;

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!formData.name || !formData.password) {
      setError(t.errorEmpty);
      return;
    }

    setIsLoading(true);
    setError('');

    // Получаем сохранённые аккаунты
    const savedAccounts = JSON.parse(localStorage.getItem('astrocadem_accounts') || '{}');
    const account = savedAccounts[formData.name.toLowerCase()];

    setTimeout(() => {
      if (!account) {
        setError(t.errorNotFound);
        setIsLoading(false);
        return;
      }

      if (account.password !== formData.password) {
        setError(t.errorWrongPassword);
        setIsLoading(false);
        return;
      }

      // Успешный вход
      login(account);
      navigate('/dashboard');
    }, 800);
  };

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center p-4 overflow-hidden">
      <CosmicBackgroundAdvanced />

      <div className="w-full max-w-md relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <motion.div
            className="inline-block mb-8"
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
          >
            <Rocket className="w-20 h-20 text-yellow-400 mx-auto" />
          </motion.div>
          
          <h1 className="text-5xl md:text-6xl font-black text-white mb-4">
            {t.title}
          </h1>
          <p className="text-xl text-gray-400">
            {t.subtitle}
          </p>
        </motion.div>

        {/* Form */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white/5 backdrop-blur-xl rounded-3xl border border-white/10 p-8"
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name Input */}
            <div>
              <label className="block text-sm font-bold text-gray-400 mb-3">
                {t.nameLabel}
              </label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => {
                    setFormData({ ...formData, name: e.target.value });
                    setError('');
                  }}
                  placeholder={t.namePlaceholder}
                  className="w-full pl-12 pr-6 py-4 bg-white/5 border-2 border-white/10 rounded-2xl text-white text-lg focus:outline-none focus:border-yellow-400 transition-all"
                  autoFocus
                />
              </div>
            </div>

            {/* Password Input */}
            <div>
              <label className="block text-sm font-bold text-gray-400 mb-3">
                {t.passwordLabel}
              </label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type={showPassword ? "text" : "password"}
                  value={formData.password}
                  onChange={(e) => {
                    setFormData({ ...formData, password: e.target.value });
                    setError('');
                  }}
                  placeholder={t.passwordPlaceholder}
                  className="w-full pl-12 pr-14 py-4 bg-white/5 border-2 border-white/10 rounded-2xl text-white text-lg focus:outline-none focus:border-yellow-400 transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center gap-3 p-4 bg-red-500/10 border border-red-500/30 rounded-2xl"
              >
                <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0" />
                <span className="text-red-400">{error}</span>
              </motion.div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full px-8 py-4 bg-yellow-400 text-black text-xl font-black rounded-2xl hover:bg-yellow-300 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3"
            >
              {isLoading ? t.loggingIn : t.loginButton}
              <ArrowRight className="w-6 h-6" />
            </button>

            {/* Register Link */}
            <div className="text-center pt-4">
              <p className="text-gray-400 mb-3">
                {t.noAccount}
              </p>
              <button
                type="button"
                onClick={() => navigate('/register')}
                className="text-yellow-400 font-bold hover:text-yellow-300 transition-colors"
              >
                {t.register} →
              </button>
            </div>
          </form>
        </motion.div>

        {/* Back to Home */}
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          onClick={() => navigate('/')}
          className="w-full mt-6 text-gray-400 hover:text-white transition-colors text-center"
        >
          ← Вернуться на главную
        </motion.button>
      </div>
    </div>
  );
}

export default Login;