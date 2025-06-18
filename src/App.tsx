import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { HomePage } from './pages/HomePage';
import { DashboardPage } from './pages/DashboardPage';
import { BookingPage } from './pages/BookingPage';
import { TeamMatchingPage } from './pages/TeamMatchingPage';
import { ProfilePage } from './pages/ProfilePage';
import { FieldDiscoveryPage } from './pages/FieldDiscoveryPage';
import { AuthModal } from './components/AuthModal';
import { useAuthStore } from './store/authStore';

function App() {
  const { showAuthModal } = useAuthStore();

  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Header />
        <main className="pb-16">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/booking" element={<BookingPage />} />
            <Route path="/teams" element={<TeamMatchingPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/fields" element={<FieldDiscoveryPage />} />
          </Routes>
        </main>
        <Footer />
        {showAuthModal && <AuthModal />}
      </div>
    </Router>
  );
}

export default App;