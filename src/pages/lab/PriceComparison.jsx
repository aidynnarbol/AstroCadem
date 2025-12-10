import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, Truck, Plus, Trash2, 
  CheckCircle, TrendingDown, Award, Store,
  Percent, BarChart3, Crown
} from 'lucide-react';

function PriceComparison() {
  const navigate = useNavigate();
  
  const [products, setProducts] = useState([]);
  const [productName, setProductName] = useState('');
  const [store1Name, setStore1Name] = useState('Магазин А');
  const [store1Price, setStore1Price] = useState('');
  const [store2Name, setStore2Name] = useState('Магазин Б');
  const [store2Price, setStore2Price] = useState('');
  const [store3Name, setStore3Name] = useState('Магазин В');
  const [store3Price, setStore3Price] = useState('');
  const [showStats, setShowStats] = useState(false);

  const addProduct = () => {
    if (productName && store1Price && store2Price && store3Price) {
      const prices = [
        { store: store1Name, price: parseFloat(store1Price) },
        { store: store2Name, price: parseFloat(store2Price) },
        { store: store3Name, price: parseFloat(store3Price) }
      ].sort((a, b) => a.price - b.price);

      const bestPrice = prices[0].price;
      const worstPrice = prices[2].price;
      const savings = worstPrice - bestPrice;
      const savingsPercent = ((worstPrice - bestPrice) / worstPrice) * 100;

      setProducts([
        ...products,
        {
          id: Date.now(),
          name: productName,
          prices,
          bestPrice,
          worstPrice,
          savings,
          savingsPercent
        }
      ]);

      setProductName('');
      setStore1Price('');
      setStore2Price('');
      setStore3Price('');
    }
  };

  const removeProduct = (id) => {
    setProducts(products.filter(p => p.id !== id));
  };

  const totalSavings = products.reduce((sum, p) => sum + p.savings, 0);
  const totalBestPrice = products.reduce((sum, p) => sum + p.bestPrice, 0);
  const totalWorstPrice = products.reduce((sum, p) => sum + p.worstPrice, 0);
  const avgSavingsPercent = products.length > 0 
    ? products.reduce((sum, p) => sum + p.savingsPercent, 0) / products.length 
    : 0;

  // Store rankings
  const storeWins = {};
  products.forEach(product => {
    const winner = product.prices[0].store;
    storeWins[winner] = (storeWins[winner] || 0) + 1;
  });

  const storeRankings = Object.entries(storeWins)
    .sort((a, b) => b[1] - a[1])
    .map(([store, wins]) => ({ store, wins }));

  const quickProducts = [
    { name: 'Молоко 1л', category: 'Продукты' },
    { name: 'Хлеб', category: 'Продукты' },
    { name: 'Шоколадка', category: 'Сладости' },
    { name: 'Сок 1л', category: 'Напитки' },
    { name: 'Тетрадь', category: 'Канцелярия' },
    { name: 'Ручка', category: 'Канцелярия' }
  ];

  return (
    <div className="min-h-screen bg-[#0b1120] text-white">
      <div className="min-h-screen p-6 md:p-8">
        <div className="max-w-7xl mx-auto mb-8">
          <button
            onClick={() => navigate('/lab')}
            className="flex items-center gap-2 text-white/70 hover:text-white transition-colors font-bold mb-6"
          >
            <ArrowLeft className="w-5 h-5" />
            В лабораторию
          </button>

          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-white/5 border border-white/15 rounded-xl flex items-center justify-center">
                <Truck className="w-7 h-7 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-black text-white">Логистика и снабжение</h1>
                <p className="text-white/70">Сравни маршруты, экономь топливо</p>
              </div>
            </div>

            {products.length > 0 && (
              <button
                onClick={() => setShowStats(!showStats)}
                className="px-6 py-3 bg-white/5 border border-white/15 rounded-xl hover:border-white transition-all font-bold flex items-center gap-2 text-white"
              >
                <BarChart3 className="w-5 h-5" />
                {showStats ? 'Скрыть статистику' : 'Показать сводку'}
              </button>
            )}
          </div>
        </div>

        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-5 gap-6">
            <div className="lg:col-span-2 space-y-6">
              <div className="p-6 bg-white border border-[#e5e7eb] rounded-xl">
                <h3 className="font-black text-xl mb-6 text-[#111827]">Добавить товар</h3>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-bold text-[#6b7280] mb-2">
                      Название товара
                    </label>
                    <input
                      type="text"
                      value={productName}
                      onChange={(e) => setProductName(e.target.value)}
                      placeholder="Например: Молоко 1л"
                      className="w-full px-4 py-3 bg-white border border-[#d1d5db] rounded-lg text-[#111827] placeholder-[#9ca3af] focus:outline-none focus:border-[#111827]"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-[#6b7280] mb-2">
                      Быстрый выбор
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      {quickProducts.map((qp) => (
                        <button
                          key={qp.name}
                          onClick={() => setProductName(qp.name)}
                          className="px-3 py-2 bg-white border border-[#d1d5db] rounded-lg hover:border-[#111827] transition-all text-xs font-bold text-left text-[#111827]"
                        >
                          {qp.name}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="p-4 bg-[#f9fafb] rounded-lg border border-[#e5e7eb]">
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-bold text-[#6b7280] mb-2">
                          Магазин 1
                        </label>
                        <input
                          type="text"
                          value={store1Name}
                          onChange={(e) => setStore1Name(e.target.value)}
                          className="w-full px-3 py-2 bg-white border border-[#d1d5db] rounded-lg text-[#111827] text-sm focus:outline-none focus:border-[#111827]"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-[#6b7280] mb-2">
                          Цена (₸)
                        </label>
                        <input
                          type="number"
                          value={store1Price}
                          onChange={(e) => setStore1Price(e.target.value)}
                          placeholder="500"
                          className="w-full px-3 py-2 bg-white border border-[#d1d5db] rounded-lg text-[#111827] placeholder-[#9ca3af] text-sm focus:outline-none focus:border-[#111827]"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="p-4 bg-[#f9fafb] rounded-lg border border-[#e5e7eb]">
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-bold text-[#6b7280] mb-2">
                          Магазин 2
                        </label>
                        <input
                          type="text"
                          value={store2Name}
                          onChange={(e) => setStore2Name(e.target.value)}
                          className="w-full px-3 py-2 bg-white border border-[#d1d5db] rounded-lg text-[#111827] text-sm focus:outline-none focus:border-[#111827]"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-[#6b7280] mb-2">
                          Цена (₸)
                        </label>
                        <input
                          type="number"
                          value={store2Price}
                          onChange={(e) => setStore2Price(e.target.value)}
                          placeholder="550"
                          className="w-full px-3 py-2 bg-white border border-[#d1d5db] rounded-lg text-[#111827] placeholder-[#9ca3af] text-sm focus:outline-none focus:border-[#111827]"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="p-4 bg-[#f9fafb] rounded-lg border border-[#e5e7eb]">
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-bold text-[#6b7280] mb-2">
                          Магазин 3
                        </label>
                        <input
                          type="text"
                          value={store3Name}
                          onChange={(e) => setStore3Name(e.target.value)}
                          className="w-full px-3 py-2 bg-white border border-[#d1d5db] rounded-lg text-[#111827] text-sm focus:outline-none focus:border-[#111827]"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-[#6b7280] mb-2">
                          Цена (₸)
                        </label>
                        <input
                          type="number"
                          value={store3Price}
                          onChange={(e) => setStore3Price(e.target.value)}
                          placeholder="480"
                          className="w-full px-3 py-2 bg-white border border-[#d1d5db] rounded-lg text-[#111827] placeholder-[#9ca3af] text-sm focus:outline-none focus:border-[#111827]"
                        />
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={addProduct}
                    className="w-full px-6 py-4 bg-[#111827] text-white font-black rounded-xl hover:bg-[#0b1220] transition-all flex items-center justify-center gap-2"
                  >
                    <Plus className="w-5 h-5" />
                    Добавить товар
                  </button>
                </div>
              </div>

              {products.length > 0 && (
                <div className="p-8 bg-white border border-[#e5e7eb] rounded-xl">
                  <div className="flex items-center gap-3 mb-4">
                    <Award className="w-10 h-10 text-[#111827]" />
                    <h3 className="font-black text-2xl text-[#111827]">Твоя экономия</h3>
                  </div>

                  <div className="text-6xl font-black text-[#111827] mb-6">
                    {totalSavings.toFixed(0)} ₸
                  </div>

                  <div className="space-y-3 pt-6 border-t border-[#e5e7eb]">
                    <div className="flex justify-between items-center">
                      <span className="text-[#6b7280]">Лучшие цены:</span>
                      <span className="font-black text-xl text-[#111827]">{totalBestPrice.toFixed(0)} ₸</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-[#6b7280]">Худшие цены:</span>
                      <span className="font-black text-xl text-[#b91c1c]">{totalWorstPrice.toFixed(0)} ₸</span>
                    </div>
                    <div className="flex justify-between items-center pt-3 border-t border-[#e5e7eb]">
                      <span className="text-[#6b7280]">Процент экономии:</span>
                      <div className="flex items-center gap-2">
                        <Percent className="w-5 h-5 text-[#111827]" />
                        <span className="font-black text-2xl text-[#111827]">
                          {((totalSavings / totalWorstPrice) * 100).toFixed(1)}%
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="lg:col-span-3 space-y-6">
              <AnimatePresence>
                {showStats && storeRankings.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="p-6 bg-white border border-[#e5e7eb] rounded-xl"
                  >
                    <h3 className="font-black text-xl mb-6 flex items-center gap-2 text-[#111827]">
                      <Crown className="w-6 h-6 text-[#111827]" />
                      Рейтинг магазинов
                    </h3>

                    <div className="space-y-4">
                      {storeRankings.map((ranking, index) => {
                        const percent = (ranking.wins / products.length) * 100;
                        return (
                          <div key={ranking.store}>
                            <div className="flex items-center justify-between mb-2">
                              <div className="flex items-center gap-3">
                                {index === 0 && <Crown className="w-5 h-5 text-[#111827]" />}
                                <span className="font-bold text-[#111827]">{ranking.store}</span>
                              </div>
                              <span className="text-[#6b7280]">
                                {ranking.wins} {ranking.wins === 1 ? 'победа' : 'побед'} ({percent.toFixed(0)}%)
                              </span>
                            </div>
                            <div className="h-3 bg-[#e5e7eb] rounded-full overflow-hidden">
                              <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: `${percent}%` }}
                                transition={{ duration: 1 }}
                                className={`h-full rounded-full ${
                                  index === 0 ? 'bg-[#111827]' : 
                                  index === 1 ? 'bg-[#4b5563]' : 
                                  'bg-[#9ca3af]'
                                }`}
                              />
                            </div>
                          </div>
                        );
                      })}
                    </div>

                    <div className="mt-6 p-4 bg-[#f9fafb] border border-[#e5e7eb] rounded-lg">
                      <div className="flex items-center gap-2 text-sm text-[#4b5563]">
                        <Store className="w-4 h-4 text-[#111827]" />
                        <span>
                          <span className="font-bold text-[#111827]">{storeRankings[0]?.store}</span> — самый выгодный магазин!
                        </span>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <div>
                <h3 className="font-black text-xl mb-4 flex items-center gap-2 text-[#111827]">
                  <ShoppingCart className="w-6 h-6 text-[#111827]" />
                  Список товаров ({products.length})
                </h3>

                {products.length === 0 ? (
                  <div className="p-16 bg-white border border-[#e5e7eb] rounded-xl text-center text-[#6b7280]">
                    <ShoppingCart className="w-16 h-16 mx-auto mb-4 opacity-50" />
                    <p className="text-lg">Добавь товары для сравнения</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {products.map((product, index) => (
                      <motion.div
                        key={product.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.05 }}
                        className="p-6 bg-white border border-[#e5e7eb] rounded-xl"
                      >
                        <div className="flex items-start justify-between mb-4">
                          <h4 className="font-black text-xl text-[#111827]">{product.name}</h4>
                          <button
                            onClick={() => removeProduct(product.id)}
                            className="p-2 bg-white border border-[#e5e7eb] text-[#b91c1c] rounded-lg hover:border-[#b91c1c] transition-all"
                          >
                            <Trash2 className="w-5 h-5" />
                          </button>
                        </div>

                        <div className="space-y-3 mb-4">
                          {product.prices.map((priceInfo, idx) => (
                            <div
                              key={idx}
                              className={`flex items-center justify-between p-4 rounded-xl ${
                                idx === 0
                                  ? 'bg-[#f0fdf4] border-2 border-[#bbf7d0]'
                                  : idx === 2
                                  ? 'bg-[#fef2f2] border border-[#fecdd3]'
                                  : 'bg-[#f9fafb] border border-[#e5e7eb]'
                              }`}
                            >
                              <div className="flex items-center gap-3">
                                {idx === 0 && <CheckCircle className="w-5 h-5 text-[#166534]" />}
                                {idx === 2 && <TrendingDown className="w-5 h-5 text-[#b91c1c]" />}
                                <div>
                                  <div className={`font-bold ${idx === 0 ? 'text-[#166534]' : idx === 2 ? 'text-[#b91c1c]' : 'text-[#111827]'}`}>
                                    {priceInfo.store}
                                  </div>
                                  {idx === 0 && <div className="text-xs text-[#166534]">Лучшая цена</div>}
                                  {idx === 2 && <div className="text-xs text-[#b91c1c]">Самый дорогой</div>}
                                </div>
                              </div>
                              <div className="text-right">
                                <div className={`font-black text-2xl ${idx === 0 ? 'text-[#166534]' : idx === 2 ? 'text-[#b91c1c]' : 'text-[#111827]'}`}>
                                  {priceInfo.price.toFixed(0)} ₸
                                </div>
                                {idx === 2 && (
                                  <div className="text-xs text-[#6b7280]">
                                    +{(priceInfo.price - product.bestPrice).toFixed(0)} ₸
                                  </div>
                                )}
                              </div>
                            </div>
                          ))}
                        </div>

                        <div className="flex items-center justify-between pt-4 border-t border-[#e5e7eb]">
                          <div className="flex items-center gap-2">
                            <DollarSign className="w-5 h-5 text-[#111827]" />
                            <span className="font-bold text-[#6b7280]">Экономия</span>
                          </div>
                          <div className="text-right">
                            <div className="text-2xl font-black text-[#111827]">
                              {product.savings.toFixed(0)} ₸
                            </div>
                            <div className="text-sm text-[#6b7280]">
                              {product.savingsPercent.toFixed(1)}%
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="mt-8 p-6 bg-white border border-[#e5e7eb] rounded-xl">
            <div className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-[#111827] flex-shrink-0 mt-1" />
              <div>
                <div className="font-bold mb-1 text-[#111827]">Как экономить на покупках</div>
                <div className="text-sm text-[#4b5563] leading-relaxed">
                  Всегда сравнивай цены в разных магазинах перед покупкой.
                  Используй акции и скидки. Покупай больше там, где дешевле — экономия накапливается!
                  Средняя экономия {avgSavingsPercent.toFixed(1)}% может показаться мелочью, но за год это тысячи тенге!
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PriceComparison;