
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { Toaster } from '@/components/ui/toaster';
import { AuthProvider } from '@/contexts/AuthContext';
import LandingPage from '@/pages/LandingPage';
import AuthPage from '@/pages/AuthPage';
import Dashboard from '@/pages/Dashboard';
import AIArtStudio from '@/pages/AIArtStudio';
import NFTMinting from '@/pages/NFTMinting';
import Marketplace from '@/pages/Marketplace';
import MyCollection from '@/pages/MyCollection';
import CommunityHub from '@/pages/CommunityHub';
import Profile from '@/pages/Profile';
import Help from '@/pages/Help';
import ProtectedRoute from '@/components/ProtectedRoute';
import Layout from '@/components/Layout';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Helmet>
          <title>ArtsiAI - Create. Mint. Collect.</title>
          <meta name="description" content="Generate AI art, mint NFTs, and trade them on the Ethereum blockchain with ArtsiAI - the future of digital art creation." />
        </Helmet>
        <div className="min-h-screen">
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/auth" element={<AuthPage />} />
            <Route path="/dashboard" element={
              <ProtectedRoute>
                <Layout>
                  <Dashboard />
                </Layout>
              </ProtectedRoute>
            } />
            <Route path="/studio" element={
              <ProtectedRoute>
                <Layout>
                  <AIArtStudio />
                </Layout>
              </ProtectedRoute>
            } />
            <Route path="/mint" element={
              <ProtectedRoute>
                <Layout>
                  <NFTMinting />
                </Layout>
              </ProtectedRoute>
            } />
            <Route path="/marketplace" element={
              <ProtectedRoute>
                <Layout>
                  <Marketplace />
                </Layout>
              </ProtectedRoute>
            } />
            <Route path="/collection" element={
              <ProtectedRoute>
                <Layout>
                  <MyCollection />
                </Layout>
              </ProtectedRoute>
            } />
            <Route path="/community" element={
              <ProtectedRoute>
                <Layout>
                  <CommunityHub />
                </Layout>
              </ProtectedRoute>
            } />
            <Route path="/profile" element={
              <ProtectedRoute>
                <Layout>
                  <Profile />
                </Layout>
              </ProtectedRoute>
            } />
            <Route path="/help" element={
              <ProtectedRoute>
                <Layout>
                  <Help />
                </Layout>
              </ProtectedRoute>
            } />
          </Routes>
          <Toaster />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
