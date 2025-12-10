import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  Home, Trophy, Target, Zap, Award, TrendingUp, 
  Coins as CoinsIcon, Lock, Star, Shield, AlertTriangle,
  CheckCircle, XCircle, Clock, Calendar
} from 'lucide-react';
import CosmicBackgroundAdvanced from '../components/CosmicBackgroundAdvanced';
import { useUser } from '../contexts/UserContext';
import { getAllAchievements, xpToNextLevel, progressToNextLevel } from '../utils/storage';

function ProfilePage() {
  const navigate = useNavigate();
  const { user, loading } = useUser();
  const [achievements, setAchievements] = useState([]);
  const [currentTab, setCurrentTab] = useState('overview');

  useEffect(() => {
    if (user) {
      const allAchievements = getAllAchievements();
      setAchievements(allAchievements);
    }
  }, [user]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#1a1410] text-white flex items-center justify-center">
        <CosmicBackgroundAdvanced />
        <motion.div
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="relative z-10 text-center"
        >
          <Shield className="w-20 h-20 text-amber-600 mx-auto mb-4" />
          <div className="font-mono text-xl text-amber-600 font-bold tracking-widest">
            DECRYPTING FILES...
          </div>
        </motion.div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-[#1a1410] text-white flex items-center justify-center">
        <CosmicBackgroundAdvanced />
        <div className="text-center relative z-10">
          <AlertTriangle className="w-20 h-20 text-red-600 mx-auto mb-4" />
          <h2 className="text-4xl font-black mb-6">ACCESS DENIED</h2>
          <button
            onClick={() => navigate('/dashboard')}
            className="px-10 py-4 bg-red-600 text-white font-black text-lg rounded-lg shadow-2xl hover:bg-red-700 transition-all"
          >
            RETURN TO BASE
          </button>
        </div>
      </div>
    );
  }

  const xpNext = xpToNextLevel(user.xp);
  const progressPercent = progressToNextLevel(user.xp);
  const unlockedCount = achievements.filter(a => a.unlocked).length;
  const totalAchievements = achievements.length;

  const agentId = `${String(user.level).padStart(3, '0')}-${String(Math.abs(user.username.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0) % 9999)).padStart(4, '0')}`;
  const fileNumber = `AC-${new Date().getFullYear()}-${String(Math.floor(Math.random() * 10000)).padStart(5, '0')}`;
  const clearanceLevel = user.level >= 10 ? 'OMEGA' : user.level >= 5 ? 'BETA' : 'ALPHA';

  return (
    <div className="relative min-h-screen bg-[#1a1410] overflow-hidden">
      <CosmicBackgroundAdvanced />

      {/* Wooden desk with grain */}
      <div className="fixed inset-0 opacity-25 pointer-events-none z-0">
        <div className="absolute inset-0" style={{
          backgroundImage: `
            repeating-linear-gradient(90deg, 
              rgba(90,60,40,0.4) 0px, 
              rgba(70,50,35,0.4) 2px, 
              rgba(90,60,40,0.4) 4px,
              rgba(80,55,38,0.3) 6px,
              rgba(90,60,40,0.4) 8px
            ),
            repeating-linear-gradient(0deg, 
              rgba(60,40,30,0.2) 0px, 
              transparent 1px, 
              transparent 2px
            )
          `,
          backgroundSize: '100% 100%, 100% 20px'
        }} />
      </div>

      <div className="relative z-20 min-h-screen p-4 md:p-12 lg:p-16">
        
        {/* Back Button - more stylized */}
        <motion.button
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          whileHover={{ scale: 1.05, x: -5 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate('/dashboard')}
          className="mb-8 px-8 py-4 bg-gradient-to-br from-red-600 via-red-700 to-red-800 text-white font-black rounded-xl shadow-2xl hover:shadow-red-900/50 transition-all flex items-center gap-3 border-2 border-red-900"
          style={{
            boxShadow: '0 10px 30px rgba(220, 38, 38, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.2)'
          }}
        >
          <Home className="w-6 h-6" />
          EXIT DOSSIER
        </motion.button>

        {/* Main Dossier Container */}
        <motion.div
          initial={{ opacity: 0, y: 60, rotate: -2 }}
          animate={{ opacity: 1, y: 0, rotate: -0.5 }}
          transition={{ duration: 1, type: "spring", damping: 15 }}
          className="max-w-7xl mx-auto"
        >
          {/* Multiple paper layers */}
          <div className="relative">
            {/* Shadow layers */}
            <div className="absolute inset-0 bg-[#d8cbb8] rounded-lg transform translate-x-6 translate-y-8 rotate-2 opacity-30 blur-xl" />
            <div className="absolute inset-0 bg-[#e0d4c0] rounded-lg transform translate-x-4 translate-y-5 rotate-1.5 opacity-50 shadow-2xl" />
            <div className="absolute inset-0 bg-[#e8dcc8] rounded-lg transform translate-x-2 translate-y-2 rotate-0.5 opacity-70 shadow-xl" />
            
            {/* Main document */}
            <div className="relative bg-gradient-to-br from-[#fbf8f3] via-[#f7f2ea] to-[#f0e8dc] rounded-lg overflow-hidden"
              style={{
                boxShadow: `
                  0 40px 80px -15px rgba(0, 0, 0, 0.6),
                  0 25px 50px -20px rgba(0, 0, 0, 0.5),
                  0 10px 20px -10px rgba(0, 0, 0, 0.4),
                  inset 0 2px 4px rgba(255, 255, 255, 0.6),
                  inset 0 -1px 2px rgba(0, 0, 0, 0.05)
                `
              }}
            >
              {/* Multiple texture layers */}
              <div className="absolute inset-0 opacity-[0.12] pointer-events-none" style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 500 500' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='3' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
                backgroundSize: '150px 150px'
              }} />

              {/* Subtle lines like notebook paper */}
              <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{
                backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 24px, rgba(100, 80, 60, 0.3) 24px, rgba(100, 80, 60, 0.3) 25px)',
                backgroundSize: '100% 25px'
              }} />

              {/* Coffee stains and aging marks */}
              <div className="absolute top-20 right-40 w-40 h-40 rounded-full bg-gradient-radial from-[#8b6f47]/20 via-[#8b6f47]/10 to-transparent blur-3xl" />
              <div className="absolute bottom-60 left-32 w-32 h-32 rounded-full bg-gradient-radial from-[#7a5f3f]/15 via-[#7a5f3f]/8 to-transparent blur-2xl" />
              <div className="absolute top-1/2 left-20 w-24 h-24 rounded-full bg-gradient-radial from-[#6b4f35]/12 to-transparent blur-xl" />

              {/* Aged edges */}
              <div className="absolute top-0 left-0 right-0 h-4 bg-gradient-to-b from-[#c4b5a0]/40 via-[#d4c5a8]/20 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 h-4 bg-gradient-to-t from-[#c4b5a0]/40 via-[#d4c5a8]/20 to-transparent" />
              <div className="absolute left-0 top-0 bottom-0 w-4 bg-gradient-to-r from-[#c4b5a0]/30 via-[#d4c5a8]/15 to-transparent" />
              <div className="absolute right-0 top-0 bottom-0 w-4 bg-gradient-to-l from-[#c4b5a0]/30 via-[#d4c5a8]/15 to-transparent" />

              {/* Red thumbtack - ultra realistic */}
              <div className="absolute top-10 left-10 z-50">
                <div className="relative w-10 h-10">
                  {/* Shadow under pin */}
                  <div className="absolute inset-0 bg-black rounded-full blur-lg opacity-50 transform translate-y-2 scale-110" />
                  {/* Main pin body */}
                  <div className="relative w-10 h-10 rounded-full shadow-2xl"
                    style={{
                      background: 'radial-gradient(circle at 30% 30%, #ff4444, #dc2626, #991b1b)',
                      boxShadow: `
                        0 6px 12px rgba(0, 0, 0, 0.5),
                        0 2px 4px rgba(0, 0, 0, 0.3),
                        inset 0 2px 4px rgba(255, 255, 255, 0.5),
                        inset 0 -2px 4px rgba(0, 0, 0, 0.4)
                      `
                    }}
                  >
                    {/* Highlight */}
                    <div className="absolute top-2 left-2 w-4 h-4 bg-white rounded-full opacity-40 blur-sm" />
                    {/* Inner ring */}
                    <div className="absolute inset-2 rounded-full border-2 border-red-800/30" />
                  </div>
                  {/* Pin needle */}
                  <div className="absolute top-full left-1/2 -translate-x-1/2 w-1 h-4 bg-gradient-to-b from-gray-300 via-gray-500 to-gray-700 shadow-md" />
                </div>
              </div>

              {/* Stamps and marks */}
              <div className="absolute top-32 right-12 text-red-600 font-black text-8xl opacity-[0.06] transform rotate-15 pointer-events-none select-none"
                style={{ fontFamily: 'Impact, sans-serif', letterSpacing: '0.1em' }}
              >
                TOP SECRET
              </div>
              <div className="absolute bottom-32 left-12 text-red-600 font-black text-6xl opacity-[0.05] transform -rotate-12 pointer-events-none select-none"
                style={{ fontFamily: 'Impact, sans-serif' }}
              >
                CLASSIFIED
              </div>

              {/* Barcode - top right */}
              <div className="absolute top-10 right-10 opacity-50">
                <div className="flex gap-[1px] mb-1">
                  {[...Array(30)].map((_, i) => {
                    const heights = [20, 28, 24, 32, 20, 28, 24, 20, 32, 28];
                    const widths = [2, 1, 3, 1, 2, 1, 2, 3, 1, 2];
                    return (
                      <div 
                        key={i} 
                        className="bg-black" 
                        style={{ 
                          width: `${widths[i % widths.length]}px`,
                          height: `${heights[i % heights.length] + Math.random() * 8}px`
                        }} 
                      />
                    );
                  })}
                </div>
                <div className="text-[10px] font-mono text-black text-center tracking-wider font-bold">{fileNumber}</div>
              </div>

              <div className="relative p-10 md:p-16 lg:p-20">
                
                {/* Main Header with stamp effect */}
                <div className="mb-12">
                  <div className="relative bg-gradient-to-r from-black via-gray-900 to-black text-white px-10 py-6 -mx-20 mb-10 overflow-hidden"
                    style={{
                      boxShadow: `
                        0 8px 20px rgba(0, 0, 0, 0.6),
                        inset 0 1px 0 rgba(255, 255, 255, 0.1),
                        inset 0 -1px 0 rgba(0, 0, 0, 0.5)
                      `
                    }}
                  >
                    {/* Metallic shine effect */}
                    <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/40 to-transparent" />
                    <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                    
                    <h1 className="text-4xl md:text-5xl font-black tracking-[0.3em] text-center relative z-10" 
                      style={{ fontFamily: 'Arial Black, sans-serif', textShadow: '2px 2px 4px rgba(0,0,0,0.5)' }}
                    >
                      CLASSIFIED DOSSIER
                    </h1>
                    
                    {/* Security classification */}
                    <div className="text-center mt-3 text-sm tracking-widest text-red-500 font-bold">
                      CLEARANCE LEVEL: {clearanceLevel}
                    </div>
                  </div>

                  {/* Main content grid */}
                  <div className="grid lg:grid-cols-2 gap-10">
                    
                    {/* LEFT COLUMN */}
                    <div className="space-y-6">
                      
                      {/* Agent ID Badge */}
                      <motion.div 
                        whileHover={{ scale: 1.02, rotate: -0.5 }}
                        className="relative bg-gradient-to-br from-gray-950 via-gray-900 to-black text-white p-8 shadow-2xl border-4 border-amber-600/30"
                        style={{
                          boxShadow: `
                            0 15px 35px rgba(0, 0, 0, 0.7),
                            inset 0 1px 0 rgba(255, 255, 255, 0.1),
                            0 0 30px rgba(251, 191, 36, 0.15)
                          `
                        }}
                      >
                        {/* Corner decorations */}
                        <div className="absolute top-2 left-2 w-4 h-4 border-t-2 border-l-2 border-amber-600/50" />
                        <div className="absolute top-2 right-2 w-4 h-4 border-t-2 border-r-2 border-amber-600/50" />
                        <div className="absolute bottom-2 left-2 w-4 h-4 border-b-2 border-l-2 border-amber-600/50" />
                        <div className="absolute bottom-2 right-2 w-4 h-4 border-b-2 border-r-2 border-amber-600/50" />
                        
                        <div className="text-xs tracking-[0.2em] text-amber-600 mb-3 font-black">AGENT IDENTIFICATION</div>
                        <div className="text-5xl font-black tracking-wider mb-2 font-mono bg-gradient-to-r from-amber-200 via-amber-400 to-amber-200 bg-clip-text text-transparent">
                          {agentId}
                        </div>
                        <div className="flex items-center gap-3 text-sm">
                          <Shield className="w-5 h-5 text-amber-600" />
                          <span className="text-amber-500 font-bold tracking-widest">
                            SECURITY CLEARANCE: {clearanceLevel}
                          </span>
                        </div>
                      </motion.div>

                      {/* Personal Information */}
                      <div className="bg-white/95 backdrop-blur border-3 border-black p-6 shadow-xl">
                        <h3 className="text-lg font-black mb-4 tracking-widest border-b-2 border-black pb-2 flex items-center gap-2">
                          <div className="w-1 h-6 bg-black" />
                          PERSONAL DATA
                        </h3>
                        <div className="space-y-3 font-mono text-sm">
                          <DataField label="CODENAME" value={user.username.toUpperCase()} bold />
                          <DataField label="AGE" value={`${user.age} YEARS`} />
                          <DataField label="RANK" value={`LEVEL ${user.level}`} />
                          <DataField label="CITIZENSHIP" value="KAZAKHSTAN" />
                          <DataField label="STATUS" value="ACTIVE" highlight="green" />
                          <DataField label="FILE NO." value={fileNumber} />
                        </div>
                      </div>

                      {/* Quick Stats Grid */}
                      <div className="grid grid-cols-2 gap-4">
                        <MiniStatCard 
                          icon={Target} 
                          label="MISSIONS" 
                          value={user.stats.totalMissions} 
                          color="cyan"
                        />
                        <MiniStatCard 
                          icon={Zap} 
                          label="XP" 
                          value={user.xp} 
                          color="yellow"
                        />
                        <MiniStatCard 
                          icon={CoinsIcon} 
                          label="COINS" 
                          value={user.coins} 
                          color="green"
                        />
                        <MiniStatCard 
                          icon={Trophy} 
                          label="ACHIEVEMENTS" 
                          value={unlockedCount} 
                          color="purple"
                        />
                      </div>

                      {/* Handwritten note */}
                      <div className="relative bg-yellow-50 border-2 border-yellow-200 p-4 shadow-lg transform rotate-1">
                        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-6 bg-yellow-200 border border-yellow-300 shadow-md" />
                        <div className="text-sm" style={{ fontFamily: 'Comic Sans MS, cursive', color: '#1e40af' }}>
                          <div className="mb-2 font-bold">Agent Notes:</div>
                          <div className="leading-relaxed">
                            • Показывает отличные результаты<br />
                            • Текущий стрик: {user.streak.current} дней<br />
                            • Рекомендован к повышению
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* RIGHT COLUMN */}
                    <div className="space-y-6">
                      
                      {/* Polaroid Photo */}
                      <div className="relative flex justify-center">
                        <motion.div
                          whileHover={{ rotate: 2, scale: 1.03, y: -10 }}
                          transition={{ type: "spring", stiffness: 300 }}
                          className="relative cursor-pointer"
                        >
                          <div className="bg-white p-5 pb-16 shadow-2xl transform -rotate-2"
                            style={{
                              boxShadow: `
                                0 25px 50px rgba(0, 0, 0, 0.4),
                                0 10px 20px rgba(0, 0, 0, 0.3),
                                inset 0 2px 4px rgba(255, 255, 255, 0.8),
                                inset 0 -2px 4px rgba(0, 0, 0, 0.1)
                              `
                            }}
                          >
                            <div 
                              className="w-64 h-64 flex items-center justify-center text-8xl border-4 border-gray-100"
                              style={{ 
                                backgroundColor: user.avatarColor || '#fbbf24',
                                boxShadow: 'inset 0 4px 12px rgba(0, 0, 0, 0.2)'
                              }}
                            >
                              {user.avatar}
                            </div>
                            <div className="mt-5 text-center px-2" style={{ fontFamily: 'Brush Script MT, cursive' }}>
                              <div className="text-gray-800 text-xl mb-1">{user.username}</div>
                              <div className="text-gray-600 text-sm">Agent {agentId}</div>
                            </div>
                          </div>
                          
                          {/* Multiple tape pieces */}
                          <div className="absolute -top-4 left-12 w-24 h-10 bg-gradient-to-b from-yellow-100 to-yellow-200 opacity-80 transform -rotate-15 shadow-lg border border-yellow-300"
                            style={{ boxShadow: '0 3px 6px rgba(0, 0, 0, 0.3)' }}
                          />
                          <div className="absolute -top-4 right-12 w-24 h-10 bg-gradient-to-b from-yellow-100 to-yellow-200 opacity-80 transform rotate-15 shadow-lg border border-yellow-300"
                            style={{ boxShadow: '0 3px 6px rgba(0, 0, 0, 0.3)' }}
                          />
                        </motion.div>

                        {/* Paper clip */}
                        <div className="absolute -top-6 -right-6 w-16 h-28 border-4 rounded-full opacity-70 transform rotate-45"
                          style={{ 
                            borderColor: '#9ca3af',
                            boxShadow: '0 6px 12px rgba(0, 0, 0, 0.4), inset 0 2px 4px rgba(255, 255, 255, 0.6)',
                            background: 'linear-gradient(135deg, #e5e7eb 0%, #d1d5db 30%, #9ca3af 70%, #6b7280 100%)'
                          }}
                        />
                      </div>

                      {/* Classification stamp */}
                      <div className="relative">
                        <div className="bg-gradient-to-br from-red-100 to-red-50 border-4 border-red-600 p-6 transform rotate-2"
                          style={{
                            boxShadow: '0 10px 25px rgba(220, 38, 38, 0.3)'
                          }}
                        >
                          <div className="text-center">
                            <div className="text-xs tracking-[0.3em] text-red-800 font-black mb-2">CLASSIFICATION</div>
                            <div className="text-4xl font-black text-red-600 mb-2" style={{ fontFamily: 'Impact, sans-serif' }}>
                              {clearanceLevel}
                            </div>
                            <div className="text-xs text-red-700">LEVEL {user.level} CLEARANCE</div>
                          </div>
                        </div>
                      </div>

                      {/* Fingerprint */}
                      <div className="bg-black p-6 shadow-2xl">
                        <div className="text-xs tracking-widest text-gray-400 mb-4 font-bold">BIOMETRIC DATA</div>
                        <div className="relative w-full h-48 bg-gray-900 overflow-hidden border-2 border-gray-700">
                          {/* Fingerprint pattern */}
                          <div className="absolute inset-0 opacity-30" style={{
                            backgroundImage: `
                              repeating-radial-gradient(circle at 50% 50%, 
                                transparent 0px, 
                                transparent 3px, 
                                rgba(255,255,255,0.15) 3px, 
                                rgba(255,255,255,0.15) 4px
                              )
                            `
                          }} />
                          <div className="absolute inset-0 flex items-center justify-center">
                            <div className="text-gray-600 font-mono text-xs">
                              FINGERPRINT DATA<br />CLASSIFIED
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Tab Navigation */}
                <div className="flex flex-wrap gap-3 mb-8 border-t-4 border-b-4 border-black py-4 -mx-20 px-20 bg-gray-50">
                  {[
                    { id: 'overview', label: 'OVERVIEW', icon: Target },
                    { id: 'missions', label: 'MISSIONS', icon: Star },
                    { id: 'achievements', label: 'ACHIEVEMENTS', icon: Trophy },
                    { id: 'stats', label: 'STATISTICS', icon: TrendingUp }
                  ].map(tab => {
                    const Icon = tab.icon;
                    return (
                      <motion.button
                        key={tab.id}
                        whileHover={{ scale: 1.05, y: -2 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setCurrentTab(tab.id)}
                        className={`px-8 py-3 font-black text-sm tracking-widest transition-all flex items-center gap-2 ${
                          currentTab === tab.id
                            ? 'bg-black text-white shadow-xl border-2 border-black'
                            : 'bg-white text-black border-2 border-black hover:bg-gray-100 shadow-lg'
                        }`}
                      >
                        <Icon className="w-4 h-4" />
                        {tab.label}
                      </motion.button>
                    );
                  })}
                </div>

                {/* Tab Content */}
                <AnimatePresence mode="wait">
                  {currentTab === 'overview' && (
                    <motion.div
                      key="overview"
                      initial={{ opacity: 0, x: 30 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -30 }}
                      transition={{ duration: 0.3 }}
                      className="space-y-8"
                    >
                      {/* Progress Card */}
                      <div className="bg-white border-4 border-black p-8 shadow-2xl">
                        <h3 className="text-2xl font-black mb-6 tracking-wider flex items-center gap-3">
                          <TrendingUp className="w-7 h-7" />
                          PROGRESSION TO NEXT RANK
                        </h3>
                        <div className="flex justify-between items-end text-sm font-mono mb-3">
                          <span className="font-bold">CURRENT: LEVEL {user.level}</span>
                          <span className="text-3xl font-black">{progressPercent}%</span>
                        </div>
                        <div className="relative h-8 bg-gray-200 border-4 border-black shadow-inner overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${progressPercent}%` }}
                            transition={{ duration: 2, ease: "easeOut" }}
                            className="h-full relative"
                            style={{
                              background: 'linear-gradient(90deg, #000000 0%, #1f2937 50%, #000000 100%)'
                            }}
                          >
                            <div className="absolute inset-0 bg-gradient-to-b from-white/30 to-transparent" />
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-pulse" />
                          </motion.div>
                        </div>
                        <div className="text-sm font-mono text-gray-600 mt-3 flex justify-between">
                          <span>{xpNext} XP REQUIRED</span>
                          <span>TARGET: LEVEL {user.level + 1}</span>
                        </div>
                      </div>

                      {/* Recent Achievements */}
                      <div className="bg-white border-4 border-black p-8 shadow-2xl">
                        <h3 className="text-2xl font-black mb-6 tracking-wider flex items-center gap-3">
                          <Star className="w-7 h-7 text-amber-500" />
                          RECENT ACHIEVEMENTS
                        </h3>
                        <div className="space-y-4">
                          {achievements.filter(a => a.unlocked).slice(0, 3).map((achievement, index) => (
                            <motion.div
                              key={achievement.id}
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: index * 0.1 }}
                              className="flex items-center gap-5 p-5 bg-gradient-to-r from-gray-50 to-white border-l-4 border-black shadow-lg hover:shadow-xl transition-shadow"
                            >
                              <div className="w-16 h-16 bg-black flex items-center justify-center shadow-xl flex-shrink-0">
                                <Trophy className="w-8 h-8 text-amber-400" />
                              </div>
                              <div className="flex-1">
                                <div className="font-black text-base mb-1">{achievement.title.toUpperCase()}</div>
                                <div className="text-sm text-gray-600">{achievement.description}</div>
                              </div>
                              <div className="text-right font-mono text-sm">
                                <div className="font-black text-cyan-600 text-lg">+{achievement.reward.xp}</div>
                                <div className="text-gray-600 text-xs">XP</div>
                              </div>
                            </motion.div>
                          ))}
                        </div>
                      </div>

                      {/* Status Grid */}
                      <div className="grid md:grid-cols-3 gap-6">
                        <StatusCard 
                          icon={CheckCircle}
                          label="OPERATIONAL"
                          value="ACTIVE"
                          color="green"
                        />
                        <StatusCard 
                          icon={Clock}
                          label="STREAK"
                          value={`${user.streak.current} DAYS`}
                          color="blue"
                        />
                        <StatusCard 
                          icon={Calendar}
                          label="BEST STREAK"
                          value={`${user.streak.best} DAYS`}
                          color="purple"
                        />
                      </div>
                    </motion.div>
                  )}

                  {currentTab === 'achievements' && (
                    <motion.div
                      key="achievements"
                      initial={{ opacity: 0, x: 30 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -30 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="bg-gradient-to-br from-amber-50 to-white border-4 border-black p-8 shadow-2xl mb-6">
                        <div className="text-center">
                          <div className="text-7xl font-black mb-3">{unlockedCount} <span className="text-gray-400">/ {totalAchievements}</span></div>
                          <div className="text-lg font-mono text-gray-700 tracking-wider">ACHIEVEMENTS UNLOCKED</div>
                          <div className="mt-4 h-3 bg-gray-200 border-2 border-black shadow-inner">
                            <div 
                              className="h-full bg-black transition-all duration-1000"
                              style={{ width: `${(unlockedCount / totalAchievements) * 100}%` }}
                            />
                          </div>
                        </div>
                      </div>

                      <div className="space-y-4">
                        {achievements.map((achievement, index) => (
                          <motion.div
                            key={achievement.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.05 }}
                            className={`flex items-center gap-5 p-6 border-4 border-black shadow-xl ${
                              achievement.unlocked 
                                ? 'bg-white' 
                                : 'bg-gray-100 opacity-60'
                            }`}
                          >
                            <div className={`w-20 h-20 flex items-center justify-center border-4 border-black shadow-lg flex-shrink-0 ${
                              achievement.unlocked ? 'bg-black' : 'bg-gray-400'
                            }`}>
                              {achievement.unlocked ? (
                                <Trophy className="w-10 h-10 text-amber-400" />
                              ) : (
                                <Lock className="w-10 h-10 text-gray-600" />
                              )}
                            </div>
                            <div className="flex-1">
                              <div className="font-black text-lg mb-1">{achievement.title.toUpperCase()}</div>
                              <div className="text-sm text-gray-600 mb-2">{achievement.description}</div>
                              {achievement.unlocked && (
                                <div className="flex gap-4">
                                  <span className="text-xs font-mono font-black px-3 py-1 bg-cyan-100 text-cyan-700 border-2 border-cyan-700">
                                    +{achievement.reward.xp} XP
                                  </span>
                                  <span className="text-xs font-mono font-black px-3 py-1 bg-yellow-100 text-yellow-700 border-2 border-yellow-700">
                                    +{achievement.reward.coins} COINS
                                  </span>
                                </div>
                              )}
                            </div>
                            {achievement.unlocked && (
                              <div className="text-right font-mono text-xs text-gray-500">
                                <div>15 JAN 2024</div>
                                <div>12:34:56</div>
                              </div>
                            )}
                          </motion.div>
                        ))}
                      </div>
                    </motion.div>
                  )}

                  {currentTab === 'stats' && (
                    <motion.div
                      key="stats"
                      initial={{ opacity: 0, x: 30 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -30 }}
                      transition={{ duration: 0.3 }}
                      className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
                    >
                      <DetailedStatCard 
                        icon={Target} 
                        label="TOTAL MISSIONS" 
                        value={user.stats.totalMissions}
                        sublabel="Completed Operations"
                      />
                      <DetailedStatCard 
                        icon={Zap} 
                        label="TOTAL XP" 
                        value={user.stats.totalXP}
                        sublabel="Experience Points"
                      />
                      <DetailedStatCard 
                        icon={CoinsIcon} 
                        label="TOTAL COINS" 
                        value={user.stats.totalCoins}
                        sublabel="Currency Earned"
                      />
                      <DetailedStatCard 
                        icon={Award} 
                        label="PERFECT SCORES" 
                        value={user.stats.perfectScores}
                        sublabel="Flawless Missions"
                      />
                      <DetailedStatCard 
                        icon={TrendingUp} 
                        label="BEST STREAK" 
                        value={`${user.streak.best}`}
                        sublabel="Days Consecutive"
                      />
                      <DetailedStatCard 
                        icon={Trophy} 
                        label="ACHIEVEMENTS" 
                        value={`${unlockedCount}/${totalAchievements}`}
                        sublabel="Unlocked Badges"
                      />
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Footer */}
                <div className="mt-16 pt-8 border-t-4 border-black flex flex-col md:flex-row items-end justify-between gap-8">
                  <div className="text-sm font-mono text-gray-700 leading-relaxed space-y-1">
                    <div className="font-black text-lg mb-2">CLASSIFIED DOCUMENT</div>
                    <div>Organization: <span className="font-bold">Космическая Академия AstroCadem</span></div>
                    <div>File Number: <span className="font-bold">{fileNumber}</span></div>
                    <div>Date Issued: <span className="font-bold">{new Date().toLocaleDateString('en-US', { day: '2-digit', month: 'short', year: 'numeric' }).toUpperCase()}</span></div>
                    <div>Classification: <span className="font-bold text-red-600">{clearanceLevel}</span></div>
                  </div>

                  {/* Official Stamp */}
                  <div className="relative w-40 h-40 flex-shrink-0">
                    <div className="absolute inset-0 rounded-full border-6 border-red-600 flex items-center justify-center transform rotate-12 opacity-40"
                      style={{
                        boxShadow: '0 8px 20px rgba(220, 38, 38, 0.5), inset 0 2px 4px rgba(220, 38, 38, 0.3)'
                      }}
                    >
                      <div className="text-center">
                        <div className="text-sm font-black text-red-600 mb-1">APPROVED</div>
                        <Shield className="w-12 h-12 text-red-600 mx-auto my-2" />
                        <div className="text-xs text-red-600">ASTROCADEM</div>
                        <div className="text-xs text-red-600 mt-1">ACADEMY</div>
                        <div className="text-sm font-black text-red-600 mt-1">2024</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

// Helper Components
function DataField({ label, value, bold, highlight }) {
  return (
    <div className="flex justify-between items-center py-3 border-b-2 border-black">
      <span className="text-xs text-gray-700 font-bold tracking-wider">{label}:</span>
      <span className={`${bold ? 'font-black text-base' : 'font-bold text-sm'} ${
        highlight === 'green' ? 'text-green-600' : 
        highlight === 'red' ? 'text-red-600' : 
        'text-black'
      }`}>
        {value}
      </span>
    </div>
  );
}

function MiniStatCard({ icon: Icon, label, value, color }) {
  const colors = {
    cyan: 'bg-cyan-500',
    yellow: 'bg-yellow-500',
    green: 'bg-green-500',
    purple: 'bg-purple-500'
  };
  
  return (
    <motion.div 
      whileHover={{ scale: 1.05, y: -5 }}
      className="bg-white border-3 border-black p-5 shadow-xl"
    >
      <div className={`w-12 h-12 ${colors[color]} flex items-center justify-center mb-3 shadow-lg`}>
        <Icon className="w-6 h-6 text-white" />
      </div>
      <div className="text-xs font-bold text-gray-600 mb-1">{label}</div>
      <div className="text-3xl font-black">{value}</div>
    </motion.div>
  );
}

function StatusCard({ icon: Icon, label, value, color }) {
  const colors = {
    green: 'border-green-600 bg-green-50',
    blue: 'border-blue-600 bg-blue-50',
    purple: 'border-purple-600 bg-purple-50'
  };
  
  const iconColors = {
    green: 'text-green-600',
    blue: 'text-blue-600',
    purple: 'text-purple-600'
  };
  
  return (
    <div className={`${colors[color]} border-3 p-6 shadow-lg`}>
      <Icon className={`w-10 h-10 ${iconColors[color]} mb-3`} />
      <div className="text-xs font-bold text-gray-700 mb-2">{label}</div>
      <div className="text-2xl font-black">{value}</div>
    </div>
  );
}

function DetailedStatCard({ icon: Icon, label, value, sublabel }) {
  return (
    <motion.div
      whileHover={{ y: -10, scale: 1.02 }}
      className="bg-white border-4 border-black p-6 shadow-2xl"
    >
      <div className="flex items-center gap-4 mb-4">
        <div className="w-14 h-14 bg-black flex items-center justify-center shadow-lg">
          <Icon className="w-7 h-7 text-white" />
        </div>
        <div>
          <h3 className="text-xs font-black tracking-wider text-gray-600 uppercase">{label}</h3>
        </div>
      </div>
      <div className="text-5xl font-black mb-2">{value}</div>
      <div className="text-xs font-mono text-gray-600">{sublabel}</div>
    </motion.div>
  );
}

export default ProfilePage;