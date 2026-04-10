import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { logout as apiLogout } from '../api/auth';
import NotificationPanel from './NotificationPanel';

export default function Navbar() {
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [showNotif, setShowNotif] = useState(false);

  const handleLogout = async () => {
    try { await apiLogout(); } catch {}
    logout();
    navigate('/login');
  };

  const isActive = (path: string) => location.pathname === path;

  if (!isAuthenticated) return null;

  return (
    <nav className="navbar">
      <div className="navbar-inner">
        <Link to="/feed" className="navbar-logo">
          <span className="logo-icon">◎</span>
          <span className="logo-text">MeetO</span>
        </Link>

        <div className="navbar-links">
          <Link to="/feed" className={`nav-link ${isActive('/feed') ? 'active' : ''}`}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
            <span>Home</span>
          </Link>
          <Link to="/explore" className={`nav-link ${isActive('/explore') ? 'active' : ''}`}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
            <span>Explore</span>
          </Link>
          <Link to="/create" className={`nav-link ${isActive('/create') ? 'active' : ''}`}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="16"/><line x1="8" y1="12" x2="16" y2="12"/></svg>
            <span>Create</span>
          </Link>
          <Link to="/messages" className={`nav-link ${isActive('/messages') ? 'active' : ''}`}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/></svg>
            <span>Messages</span>
          </Link>
        </div>

        <div className="navbar-right">
          <div className="notif-wrapper">
            <button className="icon-btn" onClick={() => setShowNotif(v => !v)} id="notif-btn">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 01-3.46 0"/></svg>
            </button>
            {showNotif && <NotificationPanel onClose={() => setShowNotif(false)} />}
          </div>

          {user?.id && (
            <Link to={`/profile/${user.id}`} className="avatar-link">
              <div className="avatar avatar-sm">
                {user.username?.charAt(0).toUpperCase()}
              </div>
            </Link>
          )}

          <button className="btn-logout" onClick={handleLogout}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>
          </button>
        </div>
      </div>
    </nav>
  );
}
