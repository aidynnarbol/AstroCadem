import { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, TrendingUp, TrendingDown, 
  Zap, ShoppingBag, Gamepad2, Pizza, Car, Shirt, Gift, Wallet
} from 'lucide-react';

function BudgetSimulator() {
  const navigate = useNavigate();
  
  const [money, setMoney] = useState(5000);
  const [day, setDay] = useState(1);
  const [dailyIncome, setDailyIncome] = useState(500);
  const [totalEarned, setTotalEarned] = useState(0);
  const [totalSpent, setTotalSpent] = useState(0);
  const [log, setLog] = useState([]);

  const expenses = [
    { id: 'food', name: 'Еда', icon: Pizza, cost: 200, color: '#34d399' },
    { id: 'transport', name: 'Транспорт', icon: Car, cost: 150, color: '#60a5fa' },
    { id: 'entertainment', name: 'Развлечения', icon: Gamepad2, cost: 300, color: '#f472b6' },
    { id: 'clothes', name: 'Одежда', icon: Shirt, cost: 500, color: '#a78bfa' },
    { id: 'gifts', name: 'Подарки', icon: Gift, cost: 400, color: '#fbbf24' }
  ];

  const incomeUpgrades = [
    { id: 1, name: 'Карманные +100₸/день', cost: 1000, bonus: 100, purchased: false },
    { id: 2, name: 'Подработка +300₸/день', cost: 3000, bonus: 300, purchased: false },
    { id: 3, name: 'Фриланс +500₸/день', cost: 8000, bonus: 500, purchased: false }
  ];

  const [upgrades, setUpgrades] = useState(incomeUpgrades);

  const nextDay = () => {
    const earned = dailyIncome;
    setMoney(prev => prev + earned);
    setTotalEarned(prev => prev + earned);
    setDay(prev => prev + 1);
    addLog(`День ${day + 1}: получено ${earned}₸`, 'income');
  };

  const buyExpense = (expense) => {
    if (money >= expense.cost) {
      setMoney(prev => prev - expense.cost);
      setTotalSpent(prev => prev + expense.cost);
      addLog(`Куплено: ${expense.name} (-${expense.cost}₸)`, 'expense');
    }
  };

  const buyUpgrade = (upgrade) => {
    if (money >= upgrade.cost && !upgrade.purchased) {
      setMoney(prev => prev - upgrade.cost);
      setDailyIncome(prev => prev + upgrade.bonus);
      setUpgrades(upgrades.map(u => 
        u.id === upgrade.id ? { ...u, purchased: true } : u
      ));
      addLog(`Апгрейд: ${upgrade.name}`, 'upgrade');
    }
  };

  const addLog = (text, type) => {
    setLog(prev => [{ text, type, time: new Date().toLocaleTimeString() }, ...prev].slice(0, 10));
  };

  const profit = totalEarned - totalSpent;

  return (
    <div className="min-h-screen bg-[#0b1120] text-white">
      <div className="min-h-screen p-6 lg:p-10">
        {/* Header */}
        <div className="max-w-6xl mx-auto mb-8">
          <button
            onClick={() => navigate('/lab')}
            className="flex items-center gap-2 text-white/70 hover:text-white transition-colors font-bold mb-4"
          >
            <ArrowLeft className="w-5 h-5" />
            В лабораторию
          </button>

          <div className="flex flex-wrap items-center gap-4 justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-white/60 font-semibold mb-2">Практика бюджета</p>
              <h1 className="text-4xl sm:text-5xl font-black leading-tight text-white">Симулятор бюджета</h1>
              <p className="text-white/70 mt-2">Планируй дни, контролируй траты, усиливай доход.</p>
            </div>
            <span className="px-3 py-2 rounded-full border border-white/20 text-xs font-bold text-white/70">5–7 минут</span>
          </div>
        </div>

        <div className="max-w-6xl mx-auto space-y-8">
          {/* Stats */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="p-5 rounded-2xl bg-[#0f172a] border border-white/10">
              <div className="text-xs text-white/60 mb-1">День</div>
              <div className="text-3xl font-black text-white">{day}</div>
            </div>
            <div className="p-5 rounded-2xl bg-[#0f172a] border border-white/10">
              <div className="text-xs text-white/60 mb-1 flex items-center gap-2">
                <Wallet className="w-4 h-4" />
                Деньги
              </div>
              <div className="text-3xl font-black text-white">{money}₸</div>
            </div>
            <div className="p-5 rounded-2xl bg-[#0f172a] border border-white/10">
              <div className="text-xs text-white/60 mb-1">Доход/день</div>
              <div className="text-3xl font-black text-white">+{dailyIncome}₸</div>
            </div>
            <div className="p-5 rounded-2xl bg-[#0f172a] border border-white/10">
              <div className="text-xs text-white/60 mb-1">Прибыль</div>
              <div className={`text-3xl font-black ${profit >= 0 ? 'text-white' : 'text-rose-300'}`}>
                {profit >= 0 ? '+' : ''}{profit}₸
              </div>
            </div>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Actions */}
            <div className="lg:col-span-2 space-y-6">
              <motion.button
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                onClick={nextDay}
                className="w-full p-6 rounded-2xl bg-white/10 text-white border border-white/15 flex items-center justify-between"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center text-white">
                    <Zap className="w-7 h-7" />
                  </div>
                  <div>
                    <div className="text-sm uppercase tracking-[0.1em] text-white/80">Следующий день</div>
                    <div className="text-2xl font-black">+{dailyIncome}₸</div>
                  </div>
                </div>
                <span className="text-sm font-bold text-white/80">→</span>
              </motion.button>

              {/* Expenses */}
              <div className="p-6 rounded-2xl bg-[#0f172a] border border-white/10">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <ShoppingBag className="w-6 h-6 text-white" />
                    <h2 className="text-xl font-black text-white">Магазин</h2>
                  </div>
                  <span className="text-xs text-white/60">Контролируй импульсивные траты</span>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  {expenses.map((expense) => {
                    const Icon = expense.icon;
                    const canAfford = money >= expense.cost;

                    return (
                      <motion.button
                        key={expense.id}
                        whileHover={canAfford ? { y: -2, scale: 1.01 } : {}}
                        whileTap={canAfford ? { scale: 0.99 } : {}}
                        onClick={() => buyExpense(expense)}
                        disabled={!canAfford}
                        className={`p-4 rounded-xl border text-left transition-all ${
                          canAfford
                            ? 'bg-white/5 border-white/15 hover:border-white/30'
                            : 'bg-white/5 border-white/10 opacity-60 cursor-not-allowed'
                        }`}
                        style={{ boxShadow: 'none' }}
                      >
                        <div className="flex items-center gap-3 mb-2">
                          <div
                            className="w-12 h-12 rounded-xl flex items-center justify-center text-white"
                            style={{ backgroundColor: expense.color }}
                          >
                            <Icon className="w-7 h-7" />
                          </div>
                          <div className="flex-1">
                            <div className="text-lg font-black text-white">{expense.name}</div>
                            <div className="text-lg font-black text-rose-200">-{expense.cost}₸</div>
                          </div>
                        </div>
                        {!canAfford && (
                          <div className="text-xs text-rose-200 font-bold">
                            Не хватает {expense.cost - money}₸
                          </div>
                        )}
                      </motion.button>
                    );
                  })}
                </div>
              </div>

              {/* Upgrades */}
              <div className="p-6 rounded-2xl bg-[#0f172a] border border-white/10">
                <div className="flex items-center gap-3 mb-4">
                  <TrendingUp className="w-6 h-6 text-white" />
                  <h2 className="text-xl font-black text-white">Апгрейды дохода</h2>
                </div>

                <div className="space-y-4">
                  {upgrades.map((upgrade) => {
                    const canAfford = money >= upgrade.cost && !upgrade.purchased;

                    return (
                      <motion.button
                        key={upgrade.id}
                        whileHover={canAfford ? { x: 4 } : {}}
                        onClick={() => buyUpgrade(upgrade)}
                        disabled={!canAfford || upgrade.purchased}
                        className={`w-full p-4 rounded-xl border text-left transition-all ${
                          upgrade.purchased
                            ? 'bg-emerald-500/10 border-emerald-400/40'
                            : canAfford
                            ? 'bg-white/5 border-white/15 hover:border-white/30'
                            : 'bg-white/5 border-white/10 opacity-60 cursor-not-allowed'
                        }`}
                      >
                        <div className="flex items-center justify-between gap-3">
                          <div className="flex-1">
                          <div className="text-lg font-black text-white">{upgrade.name}</div>
                            {upgrade.purchased ? (
                              <div className="text-emerald-200 font-bold text-sm">✓ Куплено</div>
                            ) : (
                              <div className="text-lg font-black text-white">{upgrade.cost}₸</div>
                            )}
                          </div>
                          <div className="text-right">
                          <div className="text-xl font-black text-white">+{upgrade.bonus}₸</div>
                          <div className="text-xs text-white/60">в день</div>
                          </div>
                        </div>
                      </motion.button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              <div className="p-6 rounded-2xl bg-[#0f172a] border border-white/10">
                <h3 className="text-lg font-black mb-4 text-white">Итоги</h3>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between text-white/70">
                    <span>Всего заработано</span>
                    <span className="font-black text-white">+{totalEarned}₸</span>
                  </div>
                  <div className="flex justify-between text-white/70">
                    <span>Всего потрачено</span>
                    <span className="font-black text-rose-200">-{totalSpent}₸</span>
                  </div>
                  <div className="flex justify-between text-white/70">
                    <span>Чистая прибыль</span>
                    <span className={`font-black ${profit >= 0 ? 'text-white' : 'text-rose-200'}`}>
                      {profit >= 0 ? '+' : ''}{profit}₸
                    </span>
                  </div>
                  <div className="flex justify-between text-white/70">
                    <span>Прожито дней</span>
                    <span className="font-black text-white">{day}</span>
                  </div>
                </div>
              </div>

              <div className="p-6 rounded-2xl bg-[#0f172a] border border-white/10">
                <h3 className="text-lg font-black mb-4 text-white">Активность</h3>
                <div className="space-y-2 max-h-96 overflow-y-auto pr-1">
                  {log.length === 0 ? (
                    <div className="text-center text-white/60 py-6 text-sm">
                      Пока нет действий — сделай первый ход
                    </div>
                  ) : (
                    log.map((entry, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        className={`p-3 rounded-lg border ${
                          entry.type === 'income'
                            ? 'bg-emerald-500/10 border-emerald-400/40'
                            : entry.type === 'expense'
                            ? 'bg-rose-500/10 border-rose-400/30'
                            : 'bg-white/5 border-white/10'
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          {entry.type === 'income' && <TrendingUp className="w-4 h-4 text-emerald-200" />}
                          {entry.type === 'expense' && <TrendingDown className="w-4 h-4 text-rose-200" />}
                          {entry.type === 'upgrade' && <Zap className="w-4 h-4 text-white" />}
                          <div className="flex-1 text-xs font-bold text-white">{entry.text}</div>
                        </div>
                        <div className="text-[11px] text-white/50 mt-1">{entry.time}</div>
                      </motion.div>
                    ))
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BudgetSimulator;