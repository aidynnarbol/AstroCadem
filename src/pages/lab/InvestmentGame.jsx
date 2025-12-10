import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, Shield, ShieldCheck, TrendingUp, TrendingDown,
  BarChart3, AlertTriangle, RefreshCw, Activity, Crosshair, Radar
} from 'lucide-react';

function InvestmentGame() {
  const navigate = useNavigate();
  
  const [balance, setBalance] = useState(100000);
  const [portfolio, setPortfolio] = useState({});
  const [history, setHistory] = useState([]);
  const [currentMonth, setCurrentMonth] = useState(1);
  const [showTips, setShowTips] = useState(true);

  const assets = [
    { 
      id: 'shield-grid', 
      name: 'Щитовая решётка', 
      risk: 'low', 
      minReturn: 3, 
      maxReturn: 10,
      description: 'Стабильная защита, минимум утечек энергии',
      icon: '🛡️'
    },
    { 
      id: 'defense-drones', 
      name: 'Дроны обороны', 
      risk: 'medium', 
      minReturn: -8, 
      maxReturn: 18,
      description: 'Гибкая оборона, возможны перебои',
      icon: '🤖'
    },
    { 
      id: 'laser-net', 
      name: 'Лазерная сеть', 
      risk: 'high', 
      minReturn: -25, 
      maxReturn: 40,
      description: 'Высокая мощность, риск перегрева',
      icon: '🔺'
    },
    {
      id: 'quantum-core',
      name: 'Квантовый блок',
      risk: 'extreme',
      minReturn: -50,
      maxReturn: 80,
      description: 'Экстремальная сила, нестабильные колебания',
      icon: '⚡'
    }
  ];

  const getRiskColor = (risk) => {
    if (risk === 'low') return '#34d399';
    if (risk === 'medium') return '#fbbf24';
    if (risk === 'high') return '#ef4444';
    return '#a855f7';
  };

  const getRiskLabel = (risk) => {
    if (risk === 'low') return 'Низкий';
    if (risk === 'medium') return 'Средний';
    if (risk === 'high') return 'Высокий';
    return 'Экстремальный';
  };

  const invest = (assetId, amount) => {
    amount = parseFloat(amount);
    if (amount > 0 && amount <= balance) {
      setBalance(balance - amount);
      setPortfolio({
        ...portfolio,
        [assetId]: (portfolio[assetId] || 0) + amount
      });
    }
  };

  const nextMonth = () => {
    const newPortfolio = { ...portfolio };
    let totalChange = 0;
    const changes = {};

    Object.keys(newPortfolio).forEach(assetId => {
      const asset = assets.find(a => a.id === assetId);
      if (asset && newPortfolio[assetId] > 0) {
        const returnPercent = Math.random() * (asset.maxReturn - asset.minReturn) + asset.minReturn;
        const change = (newPortfolio[assetId] * returnPercent) / 100;
        newPortfolio[assetId] += change;
        totalChange += change;
        changes[assetId] = { amount: change, percent: returnPercent };
      }
    });

    setPortfolio(newPortfolio);
    setCurrentMonth(currentMonth + 1);
    
    const portfolioValue = Object.values(newPortfolio).reduce((sum, val) => sum + val, 0);
    setHistory([
      {
        month: currentMonth,
        totalChange,
        changes,
        portfolioValue,
        balance: balance,
        totalAssets: balance + portfolioValue
      },
      ...history
    ]);
  };

  const cashOut = (assetId) => {
    if (portfolio[assetId]) {
      setBalance(balance + portfolio[assetId]);
      const newPortfolio = { ...portfolio };
      delete newPortfolio[assetId];
      setPortfolio(newPortfolio);
    }
  };

  const reset = () => {
    setBalance(100000);
    setPortfolio({});
    setHistory([]);
    setCurrentMonth(1);
  };

  const totalPortfolioValue = Object.values(portfolio).reduce((sum, val) => sum + val, 0);
  const totalValue = balance + totalPortfolioValue;
  const totalReturn = totalValue - 100000;
  const returnPercent = ((totalValue - 100000) / 100000) * 100;

  const bestPerformer = history.length > 0 
    ? Object.entries(history[0].changes)
        .sort((a, b) => b[1].percent - a[1].percent)[0]
    : null;

  const worstPerformer = history.length > 0
    ? Object.entries(history[0].changes)
        .sort((a, b) => a[1].percent - b[1].percent)[0]
    : null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0b1224] via-[#0f1a32] to-[#0a0f1a] text-white">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -left-24 top-8 w-80 h-80 rounded-full bg-purple-500/15 blur-3xl" />
        <div className="absolute right-0 bottom-0 w-96 h-96 rounded-full bg-cyan-500/12 blur-3xl" />
      </div>

      <div className="relative z-10 min-h-screen p-6 md:p-8">
        {/* Header */}
        <div className="max-w-7xl mx-auto mb-8">
          <button
            onClick={() => navigate('/lab')}
            className="flex items-center gap-2 text-white/80 hover:text-white transition-colors font-bold mb-6"
          >
            <ArrowLeft className="w-5 h-5" />
            В лабораторию
          </button>

          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-purple-500 rounded-xl flex items-center justify-center">
                <Shield className="w-7 h-7 text-black" />
              </div>
              <div>
                <h1 className="text-3xl font-black">Кибер-щит: симуляция</h1>
                <p className="text-gray-400">Энергия штаба: 100,000 ед.</p>
              </div>
            </div>

            <button
              onClick={() => setShowTips(!showTips)}
              className="px-6 py-3 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 transition-all font-bold"
            >
              {showTips ? 'Скрыть протокол' : 'Показать протокол'}
            </button>
          </div>
        </div>

        <div className="max-w-7xl mx-auto">
          
          {/* Stats Bar */}
          <div className="grid md:grid-cols-5 gap-4 mb-8">
            <div className="p-6 bg-white/5 border border-white/10 rounded-xl">
              <div className="text-sm text-gray-400 mb-1 flex items-center gap-2">
                <Activity className="w-4 h-4" />
                Цикл
              </div>
              <div className="text-3xl font-black">{currentMonth}</div>
            </div>

            <div className="p-6 bg-white/5 border border-white/10 rounded-xl">
              <div className="text-sm text-gray-400 mb-1">Резерв энергии</div>
              <div className="text-2xl font-black text-cyan-300">{balance.toFixed(0)} ед.</div>
            </div>

            <div className="p-6 bg-white/5 border border-white/10 rounded-xl">
              <div className="text-sm text-gray-400 mb-1">В системах</div>
              <div className="text-2xl font-black text-cyan-400">{totalPortfolioValue.toFixed(0)} ед.</div>
            </div>

            <div className="p-6 bg-white/5 border border-white/10 rounded-xl">
              <div className="text-sm text-gray-400 mb-1">Суммарная мощность</div>
              <div className="text-2xl font-black">{totalValue.toFixed(0)} ед.</div>
            </div>

            <div className={`p-6 border-2 rounded-xl ${
              returnPercent >= 0 
                ? 'bg-green-500/10 border-green-500' 
                : 'bg-red-500/10 border-red-500'
            }`}>
              <div className="text-sm text-gray-400 mb-1 flex items-center gap-2">
                {returnPercent >= 0 ? <ShieldCheck className="w-4 h-4" /> : <AlertTriangle className="w-4 h-4" />}
                Эффективность
              </div>
              <div className={`text-2xl font-black ${returnPercent >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                {returnPercent >= 0 ? '+' : ''}{returnPercent.toFixed(1)}%
              </div>
              <div className="text-xs text-gray-500 mt-1">
                {returnPercent >= 0 ? '+' : ''}{totalReturn.toFixed(0)} ед.
              </div>
            </div>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            
            {/* Left: Assets */}
            <div className="lg:col-span-2 space-y-4">
              
              {/* Tips */}
              <AnimatePresence>
                {showTips && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="p-6 bg-purple-500/10 border border-purple-500/30 rounded-xl"
                  >
                    <div className="flex items-start gap-3">
                      <ShieldCheck className="w-5 h-5 text-purple-400 flex-shrink-0 mt-1" />
                      <div>
                        <div className="font-bold mb-2">Протокол обороны</div>
                        <div className="text-sm text-gray-400 space-y-1">
                          <p>• Распределяй мощность между системами</p>
                          <p>• Высокая сила = высокий риск перегрева</p>
                          <p>• Держи буфер энергии на непредвиденные атаки</p>
                          <p>• Отслеживай лучшие и худшие системы каждый цикл</p>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Assets */}
              <h3 className="text-xl font-black mb-4 flex items-center gap-2">
                <Crosshair className="w-6 h-6 text-cyan-400" />
                Доступные системы
              </h3>
              
              <div className="space-y-4">
                {assets.map((asset) => {
                  const invested = portfolio[asset.id] || 0;
                  const investedPercent = invested > 0 ? (invested / totalPortfolioValue) * 100 : 0;
                  
                  return (
                    <div key={asset.id} className="p-6 bg-white/5 border border-white/10 rounded-xl">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <span className="text-3xl">{asset.icon}</span>
                            <div>
                              <h4 className="font-black text-lg">{asset.name}</h4>
                              <p className="text-sm text-gray-400">{asset.description}</p>
                            </div>
                          </div>
                          
                          <div className="flex items-center gap-3 mt-3">
                            <span className="text-xs font-bold px-3 py-1 rounded-full" style={{ 
                              backgroundColor: `${getRiskColor(asset.risk)}20`,
                              color: getRiskColor(asset.risk),
                              border: `1px solid ${getRiskColor(asset.risk)}40`
                            }}>
                              Риск: {getRiskLabel(asset.risk)}
                            </span>
                            <span className="text-xs text-gray-500">
                              Стабильность: {asset.minReturn}% — {asset.maxReturn}%
                            </span>
                          </div>
                        </div>
                      </div>

                      {invested > 0 && (
                        <div className="mb-4 p-4 bg-white/5 rounded-lg">
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-sm text-gray-400">Выделено энергии</span>
                            <span className="font-black text-lg">{invested.toFixed(0)} ед.</span>
                          </div>
                          <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                            <motion.div
                              initial={{ width: 0 }}
                              animate={{ width: `${investedPercent}%` }}
                              className="h-full rounded-full"
                              style={{ backgroundColor: getRiskColor(asset.risk) }}
                            />
                          </div>
                          <div className="text-xs text-gray-500 mt-1">
                            {investedPercent.toFixed(1)}% мощности
                          </div>
                        </div>
                      )}

                      <div className="flex gap-2">
                        <input
                          type="number"
                          placeholder="Энергия..."
                          id={`invest-${asset.id}`}
                          className="flex-1 px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white text-sm focus:outline-none focus:border-cyan-400"
                        />
                        <button
                          onClick={() => {
                            const input = document.getElementById(`invest-${asset.id}`);
                            invest(asset.id, input.value);
                            input.value = '';
                          }}
                          className="px-4 py-3 bg-cyan-500 text-black font-bold rounded-lg hover:bg-cyan-400 transition-all text-sm"
                        >
                          Подать энергию
                        </button>
                        {invested > 0 && (
                          <button
                            onClick={() => cashOut(asset.id)}
                            className="px-4 py-3 bg-white/5 border border-white/10 text-white font-bold rounded-lg hover:bg-white/10 transition-all text-sm"
                          >
                            Отключить
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="flex gap-3">
                <button
                  onClick={nextMonth}
                  disabled={totalPortfolioValue === 0}
                  className={`flex-1 px-8 py-4 font-black rounded-xl transition-all flex items-center justify-center gap-2 text-lg ${
                    totalPortfolioValue > 0
                      ? 'bg-purple-500 text-white hover:bg-purple-400'
                      : 'bg-white/5 text-gray-600 cursor-not-allowed'
                  }`}
                >
                  <BarChart3 className="w-6 h-6" />
                  Следующий цикл
                </button>
                <button
                  onClick={reset}
                  className="px-6 py-4 bg-white/5 border border-white/10 text-white font-bold rounded-xl hover:bg-white/10 transition-all"
                >
                  <RefreshCw className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Right: History & Stats */}
            <div className="space-y-6">
              
              {/* Performance */}
              {history.length > 0 && (
                <div className="p-6 bg-white/5 border border-white/10 rounded-xl">
                  <h3 className="font-black mb-4 flex items-center gap-2">
                    <Radar className="w-5 h-5 text-yellow-400" />
                    Последний цикл
                  </h3>
                  
                  {bestPerformer && (
                    <div className="mb-3 p-3 bg-green-500/10 border border-green-500/30 rounded-lg">
                      <div className="flex items-center gap-2 text-sm text-gray-400 mb-1">
                        <ShieldCheck className="w-4 h-4 text-green-400" />
                        Лучшая система
                      </div>
                      <div className="font-bold">
                        {assets.find(a => a.id === bestPerformer[0])?.name}
                      </div>
                      <div className="text-green-400 font-black">
                        +{bestPerformer[1].percent.toFixed(1)}%
                      </div>
                    </div>
                  )}

                  {worstPerformer && (
                    <div className="p-3 bg-red-500/10 border border-red-500/30 rounded-lg">
                      <div className="flex items-center gap-2 text-sm text-gray-400 mb-1">
                        <AlertTriangle className="w-4 h-4 text-red-400" />
                        Слабое звено
                      </div>
                      <div className="font-bold">
                        {assets.find(a => a.id === worstPerformer[0])?.name}
                      </div>
                      <div className="text-red-400 font-black">
                        {worstPerformer[1].percent.toFixed(1)}%
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* History */}
              <div className="p-6 bg-white/5 border border-white/10 rounded-xl">
                <h3 className="font-black mb-4 flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-purple-400" />
                  История
                </h3>
                
                {history.length === 0 ? (
                  <div className="text-center py-8 text-gray-500">
                    <AlertTriangle className="w-10 h-10 mx-auto mb-3 opacity-50" />
                    <p className="text-sm">Подай энергию и запусти<br/>"Следующий цикл"</p>
                  </div>
                ) : (
                  <div className="space-y-3 max-h-[400px] overflow-y-auto">
                    {history.map((record, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className={`p-4 rounded-xl border ${
                          record.totalChange >= 0
                            ? 'bg-green-500/10 border-green-500/30'
                            : 'bg-red-500/10 border-red-500/30'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center gap-2">
                            {record.totalChange >= 0 ? (
                              <TrendingUp className="w-5 h-5 text-green-400" />
                            ) : (
                              <TrendingDown className="w-5 h-5 text-red-400" />
                            )}
                            <span className="font-bold">Цикл {record.month}</span>
                          </div>
                          <span className={`font-black text-lg ${
                            record.totalChange >= 0 ? 'text-green-400' : 'text-red-400'
                          }`}>
                            {record.totalChange >= 0 ? '+' : ''}{record.totalChange.toFixed(0)} ед.
                          </span>
                        </div>

                        <div className="space-y-2 text-sm">
                          {Object.entries(record.changes).map(([assetId, change]) => {
                            const asset = assets.find(a => a.id === assetId);
                            return (
                              <div key={assetId} className="flex justify-between items-center text-gray-400">
                                <span className="flex items-center gap-2">
                                  <span>{asset?.icon}</span>
                                  {asset?.name}
                                </span>
                                <span className={change.percent >= 0 ? 'text-green-400 font-bold' : 'text-red-400 font-bold'}>
                                  {change.percent >= 0 ? '+' : ''}{change.percent.toFixed(1)}%
                                </span>
                              </div>
                            );
                          })}
                        </div>

                        <div className="mt-3 pt-3 border-t border-white/10 text-xs text-gray-500 flex justify-between">
                          <span>В системах: {record.portfolioValue.toFixed(0)} ед.</span>
                          <span>Сумма: {record.totalAssets.toFixed(0)} ед.</span>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default InvestmentGame;