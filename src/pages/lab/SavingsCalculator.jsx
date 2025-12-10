import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, Rocket, Calendar, DollarSign, 
  TrendingUp, Target, CheckCircle, Sparkles, Award, PiggyBank
} from 'lucide-react';

function SavingsCalculator() {
  const navigate = useNavigate();
  
  const [goalAmount, setGoalAmount] = useState('');
  const [goalName, setGoalName] = useState('');
  const [currentSavings, setCurrentSavings] = useState('');
  const [monthlyContribution, setMonthlyContribution] = useState('');
  const [weeklyAllowance, setWeeklyAllowance] = useState('');
  const [result, setResult] = useState(null);

  const handleCalculate = () => {
    const goal = parseFloat(goalAmount);
    const current = parseFloat(currentSavings) || 0;
    const monthly = parseFloat(monthlyContribution) || 0;
    const weekly = parseFloat(weeklyAllowance) || 0;
    
    const totalMonthly = monthly + (weekly * 4);

    if (goal && totalMonthly > 0 && goal > current) {
      const remaining = goal - current;
      const months = Math.ceil(remaining / totalMonthly);
      const years = Math.floor(months / 12);
      const remainingMonths = months % 12;
      
      const progressPercent = (current / goal) * 100;
      
      // Calculate milestones
      const milestones = [
        { percent: 25, amount: goal * 0.25, label: 'Четверть пути' },
        { percent: 50, amount: goal * 0.5, label: 'Половина пути' },
        { percent: 75, amount: goal * 0.75, label: 'Три четверти' },
        { percent: 100, amount: goal, label: 'Цель достигнута!' }
      ];

      setResult({
        months,
        years,
        remainingMonths,
        remaining,
        totalMonthly,
        progressPercent,
        milestones,
        endDate: new Date(Date.now() + months * 30 * 24 * 60 * 60 * 1000).toLocaleDateString('ru-RU', {
          day: 'numeric',
          month: 'long',
          year: 'numeric'
        })
      });
    }
  };

  const handleReset = () => {
    setGoalAmount('');
    setGoalName('');
    setCurrentSavings('');
    setMonthlyContribution('');
    setWeeklyAllowance('');
    setResult(null);
  };

  const presets = [
    { name: 'Новый смартфон', amount: 150000 },
    { name: 'Игровая консоль', amount: 180000 },
    { name: 'Велосипед', amount: 80000 },
    { name: 'Ноутбук', amount: 250000 },
    { name: 'Путешествие', amount: 200000 },
    { name: 'Планшет', amount: 120000 }
  ];

  return (
    <div className="min-h-screen bg-[#0b1120] text-white">
      <div className="min-h-screen p-6 md:p-8">
        {/* Header */}
        <div className="max-w-6xl mx-auto mb-8">
          <button
            onClick={() => navigate('/lab')}
            className="flex items-center gap-2 text-white/70 hover:text-white transition-colors font-bold mb-6"
          >
            <ArrowLeft className="w-5 h-5" />
            В лабораторию
          </button>

          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-white/5 border border-white/15 rounded-xl flex items-center justify-center">
              <Rocket className="w-7 h-7 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-black text-white">План накоплений</h1>
              <p className="text-white/70">Считаем сроки и сумму для твоей цели</p>
            </div>
          </div>
        </div>

        <div className="max-w-6xl mx-auto">
          
          <div className="grid lg:grid-cols-5 gap-6">
            
            {/* Left: Inputs */}
            <div className="lg:col-span-2 space-y-6">
              
              {/* Goal Name */}
              <div className="p-6 bg-[#0f172a] border border-white/10 rounded-xl">
                <label className="block text-sm font-bold text-white/70 mb-3">
                  Название цели
                </label>
                <input
                  type="text"
                  value={goalName}
                  onChange={(e) => setGoalName(e.target.value)}
                  placeholder="Например: Новый телефон"
                  className="w-full px-4 py-3 bg-white/5 border border-white/15 rounded-lg text-white placeholder-white/40 focus:outline-none focus:border-white"
                />
              </div>

              {/* Quick Presets */}
              <div className="p-6 bg-[#0f172a] border border-white/10 rounded-xl">
                <label className="block text-sm font-bold text-white/70 mb-3">
                  Быстрый выбор
                </label>
                <div className="grid grid-cols-2 gap-3">
                  {presets.map((preset) => (
                    <button
                      key={preset.name}
                      onClick={() => {
                        setGoalName(preset.name);
                        setGoalAmount(preset.amount.toString());
                      }}
                      className="px-4 py-3 bg-white/5 border border-white/15 rounded-lg hover:border-white transition-all text-sm font-bold text-left text-white"
                    >
                      {preset.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Goal Amount */}
              <div className="p-6 bg-[#0f172a] border border-white/10 rounded-xl">
                <label className="block text-sm font-bold text-white/70 mb-3">
                  Стоимость цели (₸)
                </label>
                <div className="flex items-center gap-3">
                  <DollarSign className="w-5 h-5 text-white" />
                  <input
                    type="number"
                    value={goalAmount}
                    onChange={(e) => setGoalAmount(e.target.value)}
                    placeholder="150000"
                    className="flex-1 px-4 py-3 bg-white/5 border border-white/15 rounded-lg text-white placeholder-white/40 focus:outline-none focus:border-white"
                  />
                </div>
              </div>

              {/* Current Savings */}
              <div className="p-6 bg-[#0f172a] border border-white/10 rounded-xl">
                <label className="block text-sm font-bold text-white/70 mb-3">
                  Уже накоплено (₸)
                </label>
                <input
                  type="number"
                  value={currentSavings}
                  onChange={(e) => setCurrentSavings(e.target.value)}
                  placeholder="0"
                  className="w-full px-4 py-3 bg-white/5 border border-white/15 rounded-lg text-white placeholder-white/40 focus:outline-none focus:border-white"
                />
              </div>

              {/* Monthly & Weekly */}
              <div className="p-6 bg-[#0f172a] border border-white/10 rounded-xl space-y-4">
                <div>
                  <label className="block text-sm font-bold text-white/70 mb-3">
                    Откладывать в месяц (₸)
                  </label>
                  <input
                    type="number"
                    value={monthlyContribution}
                    onChange={(e) => setMonthlyContribution(e.target.value)}
                    placeholder="5000"
                    className="w-full px-4 py-3 bg-white/5 border border-white/15 rounded-lg text-white placeholder-white/40 focus:outline-none focus:border-white"
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-white/70 mb-3">
                    Карманные деньги в неделю (₸)
                  </label>
                  <input
                    type="number"
                    value={weeklyAllowance}
                    onChange={(e) => setWeeklyAllowance(e.target.value)}
                    placeholder="1000"
                    className="w-full px-4 py-3 bg-white/5 border border-white/15 rounded-lg text-white placeholder-white/40 focus:outline-none focus:border-white"
                  />
                </div>

                {(monthlyContribution || weeklyAllowance) && (
                  <div className="pt-4 border-t border-white/10">
                    <div className="text-sm text-white/60 mb-1">Итого в месяц:</div>
                    <div className="text-2xl font-black text-white">
                      {((parseFloat(monthlyContribution) || 0) + (parseFloat(weeklyAllowance) || 0) * 4).toFixed(0)} ₸
                    </div>
                  </div>
                )}
              </div>

              {/* Buttons */}
              <div className="flex gap-3">
                <button
                  onClick={handleCalculate}
                  className="flex-1 px-6 py-4 bg-white text-[#0b1120] font-black rounded-xl hover:bg-white/80 transition-all flex items-center justify-center gap-2"
                >
                  <Target className="w-5 h-5" />
                  Рассчитать
                </button>
                <button
                  onClick={handleReset}
                  className="px-6 py-4 bg-white/5 border border-white/15 text-white font-bold rounded-xl hover:border-white transition-all"
                >
                  Сбросить
                </button>
              </div>
            </div>

            {/* Right: Results */}
            <div className="lg:col-span-3">
              <AnimatePresence mode="wait">
                {result ? (
                  <motion.div
                    key="result"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="space-y-6"
                  >
                    {/* Main Result */}
                    <div className="p-8 bg-[#0f172a] border border-white/10 rounded-2xl">
                      <div className="text-center mb-6">
                        <motion.div
                          animate={{ rotate: [0, 10, -10, 0] }}
                          transition={{ duration: 2, repeat: Infinity }}
                          className="inline-block mb-4"
                        >
                          <Target className="w-16 h-16 text-white" />
                        </motion.div>
                        <h3 className="text-2xl font-black mb-2 text-white">{goalName || 'Твоя цель'}</h3>
                        <div className="text-5xl font-black text-white mb-2">
                          {parseFloat(goalAmount).toLocaleString()} ₸
                        </div>
                      </div>

                      <div className="grid md:grid-cols-2 gap-4 mb-6">
                        <div className="p-4 bg-white/5 rounded-xl border border-white/10">
                          <div className="text-sm text-white/60 mb-1">Осталось накопить</div>
                          <div className="text-2xl font-black text-white">{result.remaining.toLocaleString()} ₸</div>
                        </div>
                        <div className="p-4 bg-white/5 rounded-xl border border-white/10">
                          <div className="text-sm text-white/60 mb-1">В месяц откладывать</div>
                          <div className="text-2xl font-black text-white">{result.totalMonthly.toLocaleString()} ₸</div>
                        </div>
                      </div>

                      {/* Time Display */}
                      <div className="text-center py-6 bg-white/5 rounded-xl border border-white/10">
                        <div className="flex items-center justify-center gap-2 mb-2">
                          <Calendar className="w-6 h-6 text-white" />
                          <span className="text-sm font-bold text-white/60">Время до цели</span>
                        </div>
                        <div className="text-4xl font-black mb-2 text-white">
                          {result.years > 0 && `${result.years}г `}
                          {result.remainingMonths}м
                        </div>
                        <div className="text-sm text-white/60">
                          Достигнешь: {result.endDate}
                        </div>
                      </div>
                    </div>

                    {/* Progress Bar */}
                    <div className="p-6 bg-[#0f172a] border border-white/10 rounded-xl">
                      <div className="flex items-center justify-between mb-4">
                        <h4 className="font-bold text-white">Текущий прогресс</h4>
                        <span className="text-2xl font-black text-white">
                          {result.progressPercent.toFixed(1)}%
                        </span>
                      </div>
                      
                      <div className="h-6 bg-white/10 rounded-full overflow-hidden mb-2">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${result.progressPercent}%` }}
                          transition={{ duration: 1.5, ease: "easeOut" }}
                          className="h-full bg-white rounded-full relative overflow-hidden"
                        />
                      </div>
                    </div>

                    {/* Milestones */}
                    <div className="p-6 bg-[#0f172a] border border-white/10 rounded-xl">
                      <div className="flex items-center gap-2 mb-4">
                        <Award className="w-6 h-6 text-white" />
                        <h4 className="font-black text-white">Вехи на пути к цели</h4>
                      </div>
                      
                      <div className="space-y-3">
                        {result.milestones.map((milestone, index) => {
                          const isReached = result.progressPercent >= milestone.percent;
                          const monthsToMilestone = Math.ceil((milestone.amount - (parseFloat(currentSavings) || 0)) / result.totalMonthly);
                          
                          return (
                            <div
                              key={index}
                              className={`p-4 rounded-xl border ${
                                isReached 
                                  ? 'bg-emerald-500/10 border-emerald-400/40' 
                                  : 'bg-white/5 border-white/10'
                              }`}
                            >
                              <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                  {isReached && <CheckCircle className="w-5 h-5 text-emerald-200" />}
                                  <div>
                                    <div className="font-bold text-white">{milestone.label}</div>
                                    <div className="text-sm text-white/60">
                                      {milestone.amount.toLocaleString()} ₸
                                    </div>
                                  </div>
                                </div>
                                {!isReached && monthsToMilestone > 0 && (
                                  <div className="text-sm text-white/60">
                                    Через {monthsToMilestone} мес
                                  </div>
                                )}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    {/* Savings Plan */}
                    <div className="p-6 bg-[#0f172a] border border-white/10 rounded-xl">
                      <div className="flex items-start gap-3">
                        <Sparkles className="w-5 h-5 text-white flex-shrink-0 mt-1" />
                        <div>
                          <div className="font-bold mb-2 text-white">Совет для ускорения</div>
                          <div className="text-sm text-white/70 space-y-1 leading-relaxed">
                            <p>• Откладывай {(result.totalMonthly * 1.2).toFixed(0)} ₸ в месяц → достигнешь цели на {Math.ceil(result.months * 0.2)} месяцев раньше!</p>
                            <p>• Найди подработку или продай ненужные вещи</p>
                            <p>• Сократи необязательные траты (сладости, игры)</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    key="empty"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="h-full flex items-center justify-center p-12 bg-[#0f172a] border border-white/10 rounded-2xl"
                  >
                    <div className="text-center text-white/60">
                      <PiggyBank className="w-20 h-20 mx-auto mb-6 opacity-60" />
                      <p className="text-xl font-bold mb-2 text-white">Готов считать?</p>
                      <p>Заполни данные слева и нажми "Рассчитать"</p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Tips */}
          <div className="mt-8 p-6 bg-[#0f172a] border border-white/10 rounded-xl">
            <div className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-white flex-shrink-0 mt-1" />
              <div>
                <div className="font-bold mb-1 text-white">Золотое правило накоплений</div>
                <div className="text-sm text-white/70 leading-relaxed">
                  Сначала откладывай, потом трать! Как только получишь деньги — сразу переложи часть в копилку. 
                  Лучше копить понемногу, но регулярно. Заведи отдельную копилку для цели и не трогай эти деньги!
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SavingsCalculator;