import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Features from './components/Features';
import Team from './components/Team';
import Footer from './components/Footer';
import AuthPage from './pages/AuthPage';
import PendingCasesPage from './pages/PendingCasesPage';
import Courtroom from './pages/Courtroom';
import './App.css';
import EnterCase from './pages/EnterCase';

function HomePage() {
  return (
    <>
      <Navbar />
      <Hero />
      <About />
      <Features />
      <Team />
      <Footer />
    </>
  );
}

function App() {
  useEffect(() => {
    document.documentElement.style.scrollBehavior = 'smooth';
    return () => {
      document.documentElement.style.scrollBehavior = 'auto';
    };
  }, []);

  return (
    <Router>
      <div className="min-h-screen bg-white">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/auth" element={<AuthPage />} />
          <Route path="/pending-cases" element={<PendingCasesPage />} />
          <Route path="/enter-case" element={<EnterCase />} />
          <Route path="/courtroom/:caseId" element={<Courtroom />} />
        </Routes>
        <Toaster position="top-right" />
      </div>
    </Router>
  );
}

export default App;