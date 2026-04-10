import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import Navbar from './components/Navbar';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import FeedPage from './pages/FeedPage';
import ProfilePage from './pages/ProfilePage';
import CreatePostPage from './pages/CreatePostPage';
import MessagesPage from './pages/MessagesPage';
import ExplorePage from './pages/ExplorePage';

function PrivateRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? <>{children}</> : <Navigate to="/login" replace />;
}

function PublicRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useAuth();
  return !isAuthenticated ? <>{children}</> : <Navigate to="/feed" replace />;
}

function AppInner() {
  return (
    <>
      <Navbar />
      <main className="main-content">
        <Routes>
          <Route path="/" element={<Navigate to="/feed" replace />} />
          <Route path="/login" element={<PublicRoute><LoginPage /></PublicRoute>} />
          <Route path="/register" element={<PublicRoute><RegisterPage /></PublicRoute>} />
          <Route path="/feed" element={<PrivateRoute><FeedPage /></PrivateRoute>} />
          <Route path="/explore" element={<PrivateRoute><ExplorePage /></PrivateRoute>} />
          <Route path="/profile/:id" element={<PrivateRoute><ProfilePage /></PrivateRoute>} />
          <Route path="/create" element={<PrivateRoute><CreatePostPage /></PrivateRoute>} />
          <Route path="/messages" element={<PrivateRoute><MessagesPage /></PrivateRoute>} />
        </Routes>
      </main>
    </>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <AppInner />
      </BrowserRouter>
    </AuthProvider>
  );
}
