import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Play, Pause, Star, TrendingUp, Award, Zap } from 'lucide-react';

// Изометрия
const TILE_W = 70;
const TILE_H = 35;

const isoToScreen = (x, y) => ({
  x: (x - y) * (TILE_W / 2),
  y: (x + y) * (TILE_H / 2)
});

// ТОВАРЫ
const PRODUCTS = [
  { id: 'apple', name: 'Яблоки', icon: '🍎', buy: 5, sell: 15, color: '#ef4444' },
  { id: 'bread', name: 'Хлеб', icon: '🍞', buy: 8, sell: 20, color: '#f59e0b' },
  { id: 'milk', name: 'Молоко', icon: '🥛', buy: 10, sell: 25, color: '#3b82f6' },
  { id: 'candy', name: 'Конфеты', icon: '🍬', buy: 3, sell: 10, color: '#ec4899' },
  { id: 'cheese', name: 'Сыр', icon: '🧀', buy: 15, sell: 40, color: '#fbbf24' },
  { id: 'carrot', name: 'Морковь', icon: '🥕', buy: 4, sell: 12, color: '#f97316' }
];

// УРОВНИ
const LEVELS = [
  { level: 1, goal: 300, reward: 100, title: 'Новичок' },
  { level: 2, goal: 800, reward: 200, title: 'Продавец' },
  { level: 3, goal: 1500, reward: 400, title: 'Менеджер' },
  { level: 4, goal: 3000, reward: 800, title: 'Директор' },
  { level: 5, goal: 5000, reward: 1500, title: 'Владелец' }
];

function SpaceShopSimulator() {
  const navigate = useNavigate();
  const canvasRef = useRef(null);
  const animFrameRef = useRef(null);
  
  const [money, setMoney] = useState(200);
  const [level, setLevel] = useState(1);
  const [totalEarned, setTotalEarned] = useState(0);
  const [customersServed, setCustomersServed] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [showTutorial, setShowTutorial] = useState(true);
  
  const [inventory, setInventory] = useState(
    PRODUCTS.reduce((acc, p) => ({ ...acc, [p.id]: 10 }), {})
  );
  
  const [shelves] = useState([
    { x: 3, y: 2, productId: 'apple' },
    { x: 5, y: 2, productId: 'bread' },
    { x: 7, y: 2, productId: 'milk' },
    { x: 3, y: 5, productId: 'candy' },
    { x: 5, y: 5, productId: 'cheese' },
    { x: 7, y: 5, productId: 'carrot' }
  ]);
  
  const [cashier] = useState({ x: 9, y: 4 });
  const [entrance] = useState({ x: 1, y: 4 });
  const [customers, setCustomers] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [achievements, setAchievements] = useState([]);
  
  // Проверка уровня
  useEffect(() => {
    const currentLevelData = LEVELS.find(l => l.level === level);
    if (currentLevelData && totalEarned >= currentLevelData.goal) {
      levelUp();
    }
  }, [totalEarned, level]);
  
  const levelUp = () => {
    const nextLevel = level + 1;
    const levelData = LEVELS.find(l => l.level === level);
    
    if (levelData && nextLevel <= LEVELS.length) {
      setMoney(m => m + levelData.reward);
      setLevel(nextLevel);
      addNotification(`УРОВЕНЬ ${nextLevel}!`, 'level');
      addAchievement(`Достиг уровня ${nextLevel}!`);
    }
  };
  
  const addAchievement = (text) => {
    const id = Date.now();
    setAchievements(prev => [...prev, { id, text }]);
    setTimeout(() => {
      setAchievements(prev => prev.filter(a => a.id !== id));
    }, 4000);
  };
  
  // Генерация клиентов
  useEffect(() => {
    if (isPaused || showTutorial) return;
    
    const interval = setInterval(() => {
      if (customers.length < 4 && Math.random() > 0.6) {
        spawnCustomer();
      }
    }, 2500);
    
    return () => clearInterval(interval);
  }, [customers, isPaused, showTutorial, inventory]);
  
  const spawnCustomer = useCallback(() => {
    const availableProducts = PRODUCTS.filter(p => inventory[p.id] > 0);
    if (availableProducts.length === 0) {
      addNotification('Пополни товары!', 'warn');
      return;
    }
    
    const wantedProduct = availableProducts[Math.floor(Math.random() * availableProducts.length)];
    const targetShelf = shelves.find(s => s.productId === wantedProduct.id);
    const customerEmojis = ['👦', '👧', '👨', '👩', '🧓'];
    
    setCustomers(prev => [...prev, {
      id: Date.now() + Math.random(),
      emoji: customerEmojis[Math.floor(Math.random() * customerEmojis.length)],
      x: entrance.x,
      y: entrance.y,
      targetX: entrance.x,
      targetY: entrance.y,
      wantedProduct,
      targetShelf,
      state: 'entering',
      hasProduct: false,
      patience: 100,
      timer: 0,
      speed: 0.04
    }]);
  }, [inventory, shelves, entrance]);
  
  // Логика клиентов
  useEffect(() => {
    if (isPaused || showTutorial) return;
    
    const interval = setInterval(() => {
      setCustomers(prev => prev.map(customer => {
        const c = { ...customer };
        c.patience = Math.max(0, c.patience - 0.3);
        c.timer += 1;
        
        if (c.patience <= 0) {
          addNotification('Клиент ушел!', 'warn');
          return null;
        }
        
        const dx = c.targetX - c.x;
        const dy = c.targetY - c.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        
        if (dist > 0.1) {
          c.x += (dx / dist) * c.speed;
          c.y += (dy / dist) * c.speed;
        } else {
          switch (c.state) {
            case 'entering':
              c.state = 'to_shelf';
              c.targetX = c.targetShelf.x + 0.5;
              c.targetY = c.targetShelf.y + 1.5;
              break;
            case 'to_shelf':
              c.state = 'at_shelf';
              c.timer = 0;
              break;
            case 'at_shelf':
              if (c.timer > 40) {
                if (inventory[c.wantedProduct.id] > 0) {
                  setInventory(prev => ({
                    ...prev,
                    [c.wantedProduct.id]: prev[c.wantedProduct.id] - 1
                  }));
                  c.hasProduct = true;
                  c.state = 'to_cash';
                  c.targetX = cashier.x - 1;
                  c.targetY = cashier.y;
                } else {
                  return null;
                }
              }
              break;
            case 'to_cash':
              c.state = 'at_cash';
              c.timer = 0;
              break;
            case 'at_cash':
              if (c.timer > 30) {
                setMoney(m => m + c.wantedProduct.sell);
                setTotalEarned(e => e + c.wantedProduct.sell);
                setCustomersServed(s => s + 1);
                addNotification(`+${c.wantedProduct.sell}₵`, 'success');
                c.state = 'leaving';
                c.targetX = entrance.x - 2;
                c.targetY = entrance.y;
                
                // Достижения
                if (customersServed + 1 === 10) addAchievement('Обслужил 10 клиентов!');
                if (customersServed + 1 === 50) addAchievement('Обслужил 50 клиентов!');
              }
              break;
            case 'leaving':
              if (c.x < -1) return null;
              break;
          }
        }
        
        return c;
      }).filter(Boolean));
    }, 50);
    
    return () => clearInterval(interval);
  }, [isPaused, showTutorial, inventory, cashier, entrance, customersServed]);
  
  // Рендеринг
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    
    const render = () => {
      ctx.clearRect(0, 0, 1000, 650);
      
      ctx.save();
      ctx.translate(500, 50);
      
      // Пол
      for (let y = 0; y < 9; y++) {
        for (let x = 0; x < 12; x++) {
          const s = isoToScreen(x, y);
          ctx.fillStyle = (x + y) % 2 === 0 ? '#fef3c7' : '#fde68a';
          ctx.beginPath();
          ctx.moveTo(s.x, s.y);
          ctx.lineTo(s.x + TILE_W/2, s.y + TILE_H/2);
          ctx.lineTo(s.x, s.y + TILE_H);
          ctx.lineTo(s.x - TILE_W/2, s.y + TILE_H/2);
          ctx.closePath();
          ctx.fill();
          ctx.strokeStyle = '#fbbf24';
          ctx.lineWidth = 1;
          ctx.stroke();
        }
      }
      
      // Полки
      shelves.forEach(shelf => {
        const s = isoToScreen(shelf.x, shelf.y);
        const product = PRODUCTS.find(p => p.id === shelf.productId);
        const stock = inventory[shelf.productId];
        
        // Тень
        ctx.fillStyle = 'rgba(0,0,0,0.15)';
        ctx.beginPath();
        ctx.ellipse(s.x, s.y + 35, 40, 18, 0, 0, Math.PI * 2);
        ctx.fill();
        
        // Полка 3D
        ctx.fillStyle = '#9ca3af';
        ctx.fillRect(s.x - 35, s.y - 8, 70, 35);
        ctx.fillStyle = '#d1d5db';
        ctx.fillRect(s.x - 35, s.y - 15, 70, 7);
        ctx.fillStyle = '#6b7280';
        ctx.fillRect(s.x + 35, s.y - 8, 10, 35);
        
        // Товар
        ctx.font = '40px Arial';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(product.icon, s.x, s.y + 5);
        
        // Количество
        ctx.fillStyle = stock === 0 ? '#ef4444' : stock < 3 ? '#fbbf24' : '#22c55e';
        ctx.font = 'bold 18px sans-serif';
        ctx.fillText(stock, s.x, s.y + 30);
      });
      
      // Касса
      const cs = isoToScreen(cashier.x, cashier.y);
      ctx.fillStyle = 'rgba(0,0,0,0.15)';
      ctx.beginPath();
      ctx.ellipse(cs.x, cs.y + 40, 45, 20, 0, 0, Math.PI * 2);
      ctx.fill();
      
      ctx.fillStyle = '#3b82f6';
      ctx.fillRect(cs.x - 40, cs.y - 12, 80, 40);
      ctx.fillStyle = '#60a5fa';
      ctx.fillRect(cs.x - 40, cs.y - 20, 80, 8);
      ctx.fillStyle = '#1e40af';
      ctx.fillRect(cs.x + 40, cs.y - 12, 10, 40);
      ctx.fillStyle = '#fff';
      ctx.font = 'bold 16px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('КАССА', cs.x, cs.y + 8);
      
      // Клиенты
      customers.forEach(customer => {
        const s = isoToScreen(customer.x, customer.y);
        
        ctx.fillStyle = 'rgba(0,0,0,0.2)';
        ctx.beginPath();
        ctx.ellipse(s.x, s.y + 15, 18, 10, 0, 0, Math.PI * 2);
        ctx.fill();
        
        ctx.font = '40px Arial';
        ctx.textAlign = 'center';
        ctx.fillText(customer.emoji, s.x, s.y - 8);
        
        if (customer.hasProduct) {
          ctx.font = '24px Arial';
          ctx.fillText(customer.wantedProduct.icon, s.x + 18, s.y - 22);
        }
        
        const pW = (customer.patience / 100) * 36;
        ctx.fillStyle = customer.patience > 50 ? '#22c55e' : customer.patience > 25 ? '#fbbf24' : '#ef4444';
        ctx.fillRect(s.x - 18, s.y - 45, pW, 5);
        ctx.strokeStyle = 'rgba(0,0,0,0.3)';
        ctx.lineWidth = 2;
        ctx.strokeRect(s.x - 18, s.y - 45, 36, 5);
      });
      
      ctx.restore();
      
      if (!isPaused && !showTutorial) {
        animFrameRef.current = requestAnimationFrame(render);
      }
    };
    
    render();
    
    return () => {
      if (animFrameRef.current) {
        cancelAnimationFrame(animFrameRef.current);
      }
    };
  }, [customers, inventory, shelves, cashier, isPaused, showTutorial]);
  
  const addNotification = (text, type) => {
    const id = Date.now();
    setNotifications(prev => [...prev, { id, text, type }]);
    setTimeout(() => {
      setNotifications(prev => prev.filter(n => n.id !== id));
    }, type === 'level' ? 4000 : 2500);
  };
  
  const buyProduct = (productId, amount = 10) => {
    const product = PRODUCTS.find(p => p.id === productId);
    const cost = product.buy * amount;
    
    if (money < cost) {
      addNotification('Недостаточно денег!', 'error');
      return;
    }
    
    setMoney(m => m - cost);
    setInventory(prev => ({
      ...prev,
      [productId]: prev[productId] + amount
    }));
    addNotification(`Куплено ${amount}x ${product.name}`, 'info');
  };
  
  const currentLevelData = LEVELS.find(l => l.level === level) || LEVELS[LEVELS.length - 1];
  const progress = Math.min((totalEarned / currentLevelData.goal) * 100, 100);
  
  return (
    <div style={{ minHeight: '100vh', background: '#fffbeb' }}>
      {/* Tutorial */}
      <AnimatePresence>
        {showTutorial && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
              position: 'fixed',
              inset: 0,
              background: 'rgba(0,0,0,0.85)',
              zIndex: 100,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '2rem'
            }}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              style={{
                background: 'white',
                borderRadius: '2rem',
                padding: '3rem',
                maxWidth: '600px',
                textAlign: 'center',
                boxShadow: '0 25px 50px rgba(0,0,0,0.3)'
              }}
            >
              <div style={{ fontSize: '5rem', marginBottom: '1.5rem' }}>🏪</div>
              <h2 style={{ fontSize: '2.5rem', fontWeight: 900, marginBottom: '1rem', color: '#1f2937' }}>
                Добро пожаловать!
              </h2>
              <div style={{ fontSize: '1.125rem', color: '#6b7280', marginBottom: '2rem', lineHeight: 1.7 }}>
                <p style={{ marginBottom: '1rem' }}>🎯 Обслуживай клиентов и зарабатывай деньги!</p>
                <p style={{ marginBottom: '1rem' }}>📦 Покупай товары дешево, продавай дороже</p>
                <p>⭐ Достигай целей и повышай уровень!</p>
              </div>
              <button
                onClick={() => setShowTutorial(false)}
                style={{
                  width: '100%',
                  padding: '1.25rem',
                  background: '#3b82f6',
                  color: 'white',
                  border: 'none',
                  borderRadius: '1rem',
                  fontSize: '1.25rem',
                  fontWeight: 900,
                  cursor: 'pointer'
                }}
              >
                Начать игру! 🚀
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Notifications */}
      <div style={{ position: 'fixed', top: '1.5rem', right: '1.5rem', zIndex: 50, display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
        <AnimatePresence>
          {notifications.map(n => (
            <motion.div
              key={n.id}
              initial={{ opacity: 0, x: 100, scale: 0.8 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 100, scale: 0.8 }}
              style={{
                padding: n.type === 'level' ? '1.5rem 2rem' : '1rem 1.5rem',
                background: 
                  n.type === 'success' ? '#22c55e' : 
                  n.type === 'error' ? '#ef4444' : 
                  n.type === 'warn' ? '#fbbf24' : 
                  n.type === 'level' ? '#a855f7' : '#3b82f6',
                color: 'white',
                borderRadius: '1rem',
                fontWeight: 900,
                fontSize: n.type === 'level' ? '1.5rem' : '1rem',
                boxShadow: '0 10px 25px rgba(0,0,0,0.3)'
              }}
            >
              {n.text}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Achievements */}
      <div style={{ position: 'fixed', top: '1.5rem', left: '1.5rem', zIndex: 50 }}>
        <AnimatePresence>
          {achievements.map(a => (
            <motion.div
              key={a.id}
              initial={{ opacity: 0, x: -100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              style={{
                padding: '1rem 1.5rem',
                background: '#fbbf24',
                color: 'white',
                borderRadius: '1rem',
                fontWeight: 900,
                fontSize: '1rem',
                boxShadow: '0 10px 25px rgba(0,0,0,0.3)',
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem'
              }}
            >
              <Award size={24} />
              {a.text}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Header */}
      <div style={{ background: 'white', borderBottom: '3px solid #e5e7eb', padding: '1.5rem 2rem' }}>
        <div style={{ maxWidth: '1600px', margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <button
            onClick={() => navigate('/lab')}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem',
              background: 'transparent',
              border: '2px solid #e5e7eb',
              borderRadius: '0.75rem',
              padding: '0.75rem 1.5rem',
              cursor: 'pointer',
              fontSize: '1.125rem',
              fontWeight: 700,
              color: '#6b7280'
            }}
          >
            <ArrowLeft size={22} />
            Назад
          </button>
          
          <div style={{ fontSize: '2rem', fontWeight: 900, color: '#1f2937' }}>
            🏪 МОЙ МАГАЗИН
          </div>
          
          <button
            onClick={() => setIsPaused(!isPaused)}
            style={{
              padding: '0.75rem 1.5rem',
              background: isPaused ? '#22c55e' : '#fbbf24',
              border: 'none',
              borderRadius: '0.75rem',
              cursor: 'pointer',
              color: 'white',
              fontWeight: 900,
              fontSize: '1.125rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem',
              boxShadow: '0 4px 12px rgba(0,0,0,0.15)'
            }}
          >
            {isPaused ? <Play size={20} /> : <Pause size={20} />}
            {isPaused ? 'Продолжить' : 'Пауза'}
          </button>
        </div>
      </div>

      {/* Stats */}
      <div style={{ background: 'white', borderBottom: '3px solid #e5e7eb', padding: '1.5rem 2rem' }}>
        <div style={{ maxWidth: '1600px', margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '1.5rem', marginBottom: '1.5rem' }}>
            <div style={{ background: '#dcfce7', padding: '1.5rem', borderRadius: '1rem', textAlign: 'center', border: '3px solid #22c55e' }}>
              <div style={{ fontSize: '3rem', marginBottom: '0.5rem' }}>💰</div>
              <div style={{ fontSize: '0.875rem', color: '#166534', fontWeight: 700, marginBottom: '0.25rem' }}>ДЕНЬГИ</div>
              <div style={{ fontSize: '2.5rem', fontWeight: 900, color: '#22c55e' }}>{money}₵</div>
            </div>
            
            <div style={{ background: '#fef3c7', padding: '1.5rem', borderRadius: '1rem', textAlign: 'center', border: '3px solid #fbbf24' }}>
              <div style={{ fontSize: '3rem', marginBottom: '0.5rem' }}>⭐</div>
              <div style={{ fontSize: '0.875rem', color: '#92400e', fontWeight: 700, marginBottom: '0.25rem' }}>УРОВЕНЬ</div>
              <div style={{ fontSize: '2.5rem', fontWeight: 900, color: '#fbbf24' }}>{level}</div>
            </div>
            
            <div style={{ background: '#dbeafe', padding: '1.5rem', borderRadius: '1rem', textAlign: 'center', border: '3px solid #3b82f6' }}>
              <div style={{ fontSize: '3rem', marginBottom: '0.5rem' }}>👥</div>
              <div style={{ fontSize: '0.875rem', color: '#1e40af', fontWeight: 700, marginBottom: '0.25rem' }}>КЛИЕНТОВ</div>
              <div style={{ fontSize: '2.5rem', fontWeight: 900, color: '#3b82f6' }}>{customers.length}/4</div>
            </div>
            
            <div style={{ background: '#f3e8ff', padding: '1.5rem', borderRadius: '1rem', textAlign: 'center', border: '3px solid #a855f7' }}>
              <div style={{ fontSize: '3rem', marginBottom: '0.5rem' }}>📊</div>
              <div style={{ fontSize: '0.875rem', color: '#6b21a8', fontWeight: 700, marginBottom: '0.25rem' }}>ОБСЛУЖЕНО</div>
              <div style={{ fontSize: '2.5rem', fontWeight: 900, color: '#a855f7' }}>{customersServed}</div>
            </div>
            
            <div style={{ background: '#ffedd5', padding: '1.5rem', borderRadius: '1rem', textAlign: 'center', border: '3px solid #f97316' }}>
              <div style={{ fontSize: '3rem', marginBottom: '0.5rem' }}>💎</div>
              <div style={{ fontSize: '0.875rem', color: '#9a3412', fontWeight: 700, marginBottom: '0.25rem' }}>ЗАРАБОТАНО</div>
              <div style={{ fontSize: '2.5rem', fontWeight: 900, color: '#f97316' }}>{totalEarned}₵</div>
            </div>
          </div>
          
          {/* Progress */}
          <div style={{ background: 'white', padding: '1.5rem', borderRadius: '1rem', border: '3px solid #e5e7eb' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <TrendingUp size={24} color="#a855f7" />
                <span style={{ fontWeight: 900, fontSize: '1.25rem', color: '#1f2937' }}>
                  Цель: {currentLevelData.goal}₵
                </span>
              </div>
              <span style={{ fontWeight: 900, fontSize: '1.25rem', color: '#a855f7' }}>
                {Math.round(progress)}%
              </span>
            </div>
            <div style={{ width: '100%', height: '16px', background: '#f3f4f6', borderRadius: '999px', overflow: 'hidden', border: '2px solid #d1d5db' }}>
              <motion.div
                style={{ height: '100%', background: 'linear-gradient(90deg, #a855f7, #ec4899)', borderRadius: '999px' }}
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.5 }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Game */}
      <div style={{ maxWidth: '1600px', margin: '0 auto', padding: '2rem', display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: '2rem' }}>
        {/* Canvas */}
        <div>
          <canvas
            ref={canvasRef}
            width={1000}
            height={650}
            style={{
              width: '100%',
              background: 'white',
              borderRadius: '1.5rem',
              boxShadow: '0 8px 30px rgba(0,0,0,0.12)',
              border: '3px solid #e5e7eb'
            }}
          />
        </div>

        {/* Shop */}
        <div>
          <h3 style={{ fontSize: '1.75rem', fontWeight: 900, marginBottom: '1.5rem', color: '#1f2937', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <Zap size={28} color="#f59e0b" />
            СКЛАД ТОВАРОВ
          </h3>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', maxHeight: '570px', overflowY: 'auto', paddingRight: '0.5rem' }}>
            {PRODUCTS.map(product => {
              const stock = inventory[product.id];
              const cost = product.buy * 10;
              
              return (
                <motion.div
                  key={product.id}
                  whileHover={{ scale: 1.02 }}
                  style={{
                    background: 'white',
                    padding: '1.5rem',
                    borderRadius: '1.25rem',
                    border: '3px solid #e5e7eb',
                    boxShadow: '0 4px 15px rgba(0,0,0,0.08)'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem', marginBottom: '1rem' }}>
                    <div style={{ fontSize: '3.5rem' }}>{product.icon}</div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontWeight: 900, fontSize: '1.375rem', marginBottom: '0.25rem', color: '#1f2937' }}>{product.name}</div>
                      <div style={{ fontSize: '0.875rem', color: '#6b7280', fontWeight: 600 }}>
                        Покупка: {product.buy}₵ → Продажа: {product.sell}₵
                      </div>
                    </div>
                    <div style={{
                      fontSize: '2rem',
                      fontWeight: 900,
                      color: stock === 0 ? '#ef4444' : stock < 3 ? '#fbbf24' : '#22c55e',
                      background: stock === 0 ? '#fee2e2' : stock < 3 ? '#fef3c7' : '#dcfce7',
                      padding: '0.75rem 1.25rem',
                      borderRadius: '0.75rem',
                      border: `3px solid ${stock === 0 ? '#ef4444' : stock < 3 ? '#fbbf24' : '#22c55e'}`
                    }}>
                      {stock}
                    </div>
                  </div>
                  
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => buyProduct(product.id, 10)}
                    disabled={money < cost}
                    style={{
                      width: '100%',
                      padding: '1rem',
                      background: money < cost ? '#f3f4f6' : '#3b82f6',
                      color: money < cost ? '#9ca3af' : 'white',
                      border: money < cost ? '3px solid #d1d5db' : '3px solid #2563eb',
                      borderRadius: '0.75rem',
                      fontWeight: 900,
                      fontSize: '1.125rem',
                      cursor: money < cost ? 'not-allowed' : 'pointer',
                      boxShadow: money < cost ? 'none' : '0 4px 12px rgba(59, 130, 246, 0.3)'
                    }}
                  >
                    Купить 10 шт - {cost}₵
                  </motion.button>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default SpaceShopSimulator;