import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { UserProvider } from './contexts/UserContext';
import { GlitchProvider } from './contexts/GlitchContext';
import { LanguageProvider } from './contexts/LanguageContext';
import Landing from './pages/Landing';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import MissionDetail from './pages/MissionDetail';
import ProfilePage from './pages/ProfilePage';
import Library from './pages/Library';
import ParentDashboard from './pages/ParentDashboard';
import MissionMap from './pages/MissionMap';
import PlanetMissions from './pages/PlanetMissions';
import Laboratory from './pages/Laboratory';
import About from './pages/About';
import Login from './pages/Login';
import BudgetSimulator from './pages/lab/BudgetSimulator';
import SavingsCalculator from './pages/lab/SavingsCalculator';
import InvestmentGame from "./pages/lab/InvestmentGame";
import PriceComparison from "./pages/lab/PriceComparison";
import FinanceLab from './pages/lab/FinanceLab';

// 🏦 ПЛАНЕТА ФИНАНСОВ
import FinancePlanet from './pages/FinancePlanet';
import FinanceMission1 from './pages/missions/FinanceMission1.jsx';
import FinanceMission2 from './pages/missions/FinanceMission2.jsx';
import FinanceMission3 from './pages/missions/FinanceMission3.jsx';
import FinanceMission4 from './pages/missions/FinanceMission4.jsx';
import FinanceMission5 from './pages/missions/FinanceMission5.jsx';

// 🛡️ ПЛАНЕТА КИБЕРБЕЗОПАСНОСТИ
import CyberPlanet from './pages/CyberPlanet';
import CyberMission1Premium from './pages/missions/CyberMission1Premium.jsx';
import CyberMission2 from './pages/missions/CyberMission2.jsx';
import CyberMission3 from './pages/missions/CyberMission3.jsx';
import CyberMission4 from './pages/missions/CyberMission4.jsx';
import CyberMission5 from './pages/missions/CyberMission5.jsx';


function App() {
  return (
    <LanguageProvider>
      <UserProvider>
        <GlitchProvider>
          <Router>
          <Routes>
          {/* Главная страница */}
          <Route path="/" element={<Landing />} />
          <Route path="/about" element={<About />} />
          <Route path="/login" element={<Login />} />

          {/* Регистрация */}
          <Route path="/register" element={<Register />} />
          
          {/* Главный дашборд */}
          <Route path="/dashboard" element={<Dashboard />} />
          
          {/* Карта миссий (вселенные и планеты) */}
          <Route path="/mission-map" element={<MissionMap />} />
          
          {/* 🏦 ПЛАНЕТА ФИНАНСОВ */}
          <Route path="/planet/finance" element={<FinancePlanet />} />
          
          {/* 🛡️ ПЛАНЕТА КИБЕРБЕЗОПАСНОСТИ */}
          <Route path="/planet/cyber" element={<CyberPlanet />} />
          
          {/* Миссии планеты (старый способ, оставляем для других планет) */}
          <Route path="/planet/:planetId" element={<PlanetMissions />} />
          <Route path="/missions/:planetId" element={<PlanetMissions />} />
          
          {/* Детали миссии */}
          <Route path="/mission/:id" element={<MissionDetail />} />
          
          {/* Профиль пользователя */}
          <Route path="/profile" element={<ProfilePage />} />
          
          {/* Библиотека */}
          <Route path="/library" element={<Library />} />
          
          {/* Лаборатория */}
          <Route path="/lab" element={<Laboratory />} />
          <Route path="/lab/finance" element={<FinanceLab />} />
          <Route path="/lab/budget-simulator" element={<BudgetSimulator />} />
          <Route path="/lab/savings-calculator" element={<SavingsCalculator />} />
          <Route path="/lab/investment-game" element={<InvestmentGame />} />
          <Route path="/lab/price-comparison" element={<PriceComparison />} />

          {/* Родительская панель */}
          <Route path="/parent-dashboard" element={<ParentDashboard />} />
          
          {/* 🏦 МИССИИ ПЛАНЕТЫ ФИНАНСОВ */}
          <Route path="/mission/finance-1" element={<FinanceMission1 />} />
          <Route path="/mission/finance-2" element={<FinanceMission2 />} />
          <Route path="/mission/finance-3" element={<FinanceMission3 />} />
          <Route path="/mission/finance-4" element={<FinanceMission4 />} />
          <Route path="/mission/finance-5" element={<FinanceMission5 />} />
          
          {/* 🛡️ МИССИИ ПЛАНЕТЫ КИБЕРБЕЗОПАСНОСТИ */}
          <Route path="/mission/cyber-1" element={<CyberMission1Premium />} />
          <Route path="/mission/cyber-2" element={<CyberMission2 />} />
          <Route path="/mission/cyber-3" element={<CyberMission3 />} />
          <Route path="/mission/cyber-4" element={<CyberMission4 />} />
          <Route path="/mission/cyber-5" element={<CyberMission5 />} />
        </Routes>
      </Router>
      </GlitchProvider>
    </UserProvider>
    </LanguageProvider>
  );
}

export default App;