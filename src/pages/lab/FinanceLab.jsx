import { ArrowLeft, BarChart3, Calculator, PiggyBank, Target } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const tools = [
  {
    id: 'budget',
    title: 'Планировщик бюджета',
    description: 'Управляй ежедневными доходами и расходами, следи за прибылью и веди историю действий.',
    cta: 'Открыть симулятор',
    icon: Calculator,
    path: '/lab/budget-simulator'
  },
  {
    id: 'savings',
    title: 'Копилка целей',
    description: 'Рассчитай срок и ежемесячный взнос для своей цели, посмотри вехи и дату достижения.',
    cta: 'Рассчитать накопления',
    icon: PiggyBank,
    path: '/lab/savings-calculator'
  },
  {
    id: 'prices',
    title: 'Сравнение цен',
    description: 'Собери товары, сравни магазины, посмотри суммарную экономию и рейтинг выгодных точек.',
    cta: 'Сравнить покупки',
    icon: BarChart3,
    path: '/lab/price-comparison'
  }
];

function FinanceLab() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#0b1120] text-white">
      <div className="max-w-6xl mx-auto px-4 py-10">
        <div className="flex items-center justify-between mb-10">
          <button
            onClick={() => navigate('/lab')}
            className="flex items-center gap-2 text-sm font-semibold text-white/70 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Назад в лабораторию
          </button>
          <div className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-white/50 font-semibold">
            <Target className="w-4 h-4" />
            Финансовые инструменты
          </div>
        </div>

        <div className="mb-8">
          <h1 className="text-3xl font-black mb-2">Панель финансовой планеты</h1>
          <p className="text-white/60 leading-relaxed max-w-3xl">
            Три практических модуля: бюджет, копилка и сравнение цен. Выбирай инструмент и сразу переходи к действиям.
          </p>
        </div>

        <div className="space-y-4">
          {tools.map((tool, index) => {
            const Icon = tool.icon;
            return (
              <motion.div
                key={tool.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="bg-[#0f172a] border border-white/10 rounded-xl p-5"
              >
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <div className="flex items-start gap-3">
                    <div className="w-11 h-11 rounded-lg border border-white/10 bg-white/5 flex items-center justify-center">
                      <Icon className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-white/50 mb-1">Модуль</div>
                      <h2 className="text-xl font-black mb-1">{tool.title}</h2>
                      <p className="text-white/70">{tool.description}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => navigate(tool.path)}
                    className="self-start md:self-center px-4 py-2 border border-white text-white font-bold rounded-lg hover:bg-white hover:text-[#0b1120] transition-colors"
                  >
                    {tool.cta}
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>

        <div className="mt-10 border-t border-white/10 pt-6 text-sm text-white/60 leading-relaxed">
          <div className="font-bold mb-1 text-white">Быстрый порядок работы</div>
          1) Прогоняй бюджет и проверь прибыль. 2) Посчитай цель в копилке. 3) Сравни цены и найди экономию.
        </div>
      </div>
    </div>
  );
}

export default FinanceLab;

