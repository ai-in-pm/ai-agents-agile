import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import TeamBuilder from './components/TeamBuilder';
import ScenarioGenerator from './components/ScenarioGenerator';
import PerformanceDashboard from './components/PerformanceDashboard';
import AITeamOptimizer from './components/AITeamOptimizer';
import ExperimentLab from './components/ExperimentLab';
import AdaptiveLearningSystem from './components/AdaptiveLearningSystem';
import ScenarioManagement from './components/ScenarioManagement';
import HumanAICollaboration from './components/HumanAICollaboration';
import ResultsAnalyzer from './components/ResultsAnalyzer';
import AgileMindset from './components/AgileMindset';
import OnboardingTutorial from './components/OnboardingTutorial';
import Introduction from './components/Introduction';
import Help from './components/Help';
import Search from './components/Search';
import Feedback from './components/Feedback';
import DemoAgent from './components/DemoAgent';
import { ThemeProvider } from './contexts/ThemeContext';
import { AuthProvider } from './contexts/AuthContext';

function App() {
  const [isDemoActive, setIsDemoActive] = useState(false);

  return (
    <AuthProvider>
      <ThemeProvider>
        <Router>
          <div className="flex h-screen bg-gray-100 dark:bg-gray-900 transition-colors duration-200">
            <Sidebar />
            <div className="flex-1 flex flex-col overflow-hidden">
              <Header onDemoClick={() => setIsDemoActive(true)} />
              <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-200 dark:bg-gray-800 transition-colors duration-200">
                <AnimatePresence mode="wait">
                  <Routes>
                    <Route path="/" element={<OnboardingTutorial />} />
                    <Route path="/introduction" element={<Introduction />} />
                    <Route path="/team-builder" element={<TeamBuilder />} />
                    <Route path="/scenario-generator" element={<ScenarioGenerator />} />
                    <Route path="/performance-dashboard" element={<PerformanceDashboard />} />
                    <Route path="/ai-team-optimizer" element={<AITeamOptimizer />} />
                    <Route path="/experiment-lab" element={<ExperimentLab />} />
                    <Route path="/adaptive-learning" element={<AdaptiveLearningSystem />} />
                    <Route path="/scenario-management" element={<ScenarioManagement />} />
                    <Route path="/human-ai-collaboration" element={<HumanAICollaboration />} />
                    <Route path="/results-analyzer" element={<ResultsAnalyzer />} />
                    <Route path="/agile-mindset" element={<AgileMindset />} />
                  </Routes>
                </AnimatePresence>
              </main>
            </div>
          </div>
          <Help />
          <Search />
          <Feedback />
          <DemoAgent isActive={isDemoActive} onClose={() => setIsDemoActive(false)} />
        </Router>
      </ThemeProvider>
    </AuthProvider>
  );
}

export default App;