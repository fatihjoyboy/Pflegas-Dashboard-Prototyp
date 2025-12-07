import React from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import OverviewPage from './pages/OverviewPage';
import CandidatesPage from './pages/CandidatesPage';
import EmployersPage from './pages/EmployersPage';
import JobsPage from './pages/JobsPage';
import MatchesPage from './pages/MatchesPage';
import SettingsPage from './pages/SettingsPage';
import ChatPage from './pages/ChatPage';
import ImageAnalysisPage from './pages/ImageAnalysisPage';

const App: React.FC = () => {
  return (
    <HashRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<OverviewPage />} />
          <Route path="/candidates" element={<CandidatesPage />} />
          <Route path="/employers" element={<EmployersPage />} />
          <Route path="/jobs" element={<JobsPage />} />
          <Route path="/matches" element={<MatchesPage />} />
          <Route path="/settings" element={<SettingsPage />} />
          {/* Legacy routes kept accessible */}
          <Route path="/chat" element={<ChatPage />} />
          <Route path="/image-analysis" element={<ImageAnalysisPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Layout>
    </HashRouter>
  );
};

export default App;