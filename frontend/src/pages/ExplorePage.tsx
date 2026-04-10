import { useEffect, useState } from 'react';
import { getAllUsers } from '../api/users';
import type { UserWithProfile } from '../types';
import { Link } from 'react-router-dom';
import FollowButton from '../components/FollowButton';
import { useAuth } from '../context/AuthContext';

export default function ExplorePage() {
  const { user: me } = useAuth();
  const [users, setUsers] = useState<UserWithProfile[]>([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAllUsers()
      .then(r => setUsers(r.data.users.filter((u: UserWithProfile) => u.id !== me?.id)))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const filtered = users.filter(u =>
    u.username.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="explore-page">
      <div className="explore-header">
        <h2>Explore</h2>
        <input
          className="search-input"
          placeholder="Search users…"
          value={search}
          onChange={e => setSearch(e.target.value)}
          id="search-users"
        />
      </div>

      {loading ? (
        <div className="loading-state">{[1,2,3,4,5,6].map(i => <div key={i} className="skeleton-user" />)}</div>
      ) : (
        <div className="users-grid">
          {filtered.map(u => (
            <div className="user-card" key={u.id}>
              <Link to={`/profile/${u.id}`} className="user-card-link">
                {u.profile?.avatarUrl ? (
                  <img src={u.profile.avatarUrl} alt="" className="avatar-img avatar-lg" onError={e => (e.currentTarget.style.display='none')} />
                ) : (
                  <div className="avatar avatar-lg">{u.username.charAt(0).toUpperCase()}</div>
                )}
                <h3 className="user-card-name">{u.username}</h3>
                <p className="user-card-bio">{u.profile?.bio || 'No bio'}</p>
              </Link>
              <FollowButton
                userId={u.id}
                isFollowing={u.isFollowing || false}
                onToggle={f => setUsers(prev => prev.map(p => p.id === u.id ? { ...p, isFollowing: f } : p))}
              />
            </div>
          ))}
          {filtered.length === 0 && <p className="no-results">No users found</p>}
        </div>
      )}
    </div>
  );
}
