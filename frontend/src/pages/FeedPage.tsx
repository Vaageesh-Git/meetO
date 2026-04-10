import { useEffect, useState } from 'react';
import { getFeed, refreshFeed } from '../api/posts';
import { getAllUsers } from '../api/users';
import type { Post, UserWithProfile } from '../types';
import PostCard from '../components/PostCard';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';

export default function FeedPage() {
  const { user } = useAuth();
  const [posts, setPosts] = useState<Post[]>([]);
  const [users, setUsers] = useState<UserWithProfile[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const loadFeed = async () => {
    setLoading(true);
    try {
      const r = await getFeed();
      setPosts(r.data.posts);
    } catch {}
    setLoading(false);
  };

  const loadUsers = async () => {
    try {
      const r = await getAllUsers();
      setUsers(r.data.users.filter((u: UserWithProfile) => u.id !== user?.id).slice(0, 6));
    } catch {}
  };

  useEffect(() => { loadFeed(); loadUsers(); }, []);

  const handleRefresh = async () => {
    setRefreshing(true);
    try {
      const r = await refreshFeed();
      setPosts(r.data.posts);
    } catch {}
    setRefreshing(false);
  };

  return (
    <div className="feed-layout">
      {/* Feed Column */}
      <div className="feed-column">
        <div className="feed-header">
          <h2>Your Feed</h2>
          <button className="btn-refresh" onClick={handleRefresh} disabled={refreshing} id="refresh-feed">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={refreshing ? 'spin' : ''}><polyline points="23 4 23 10 17 10"/><polyline points="1 20 1 14 7 14"/><path d="M3.51 9a9 9 0 0114.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0020.49 15"/></svg>
            Refresh
          </button>
        </div>

        {loading ? (
          <div className="loading-state">
            {[1,2,3].map(i => <div key={i} className="skeleton-card" />)}
          </div>
        ) : posts.length === 0 ? (
          <div className="empty-state">
            <span className="empty-icon">🌐</span>
            <h3>Your feed is empty</h3>
            <p>Follow some users to see their posts here, or explore all posts below.</p>
            <Link to="/explore" className="btn-primary">Explore Users</Link>
          </div>
        ) : (
          posts.map(post => (
            <PostCard
              key={post.id}
              post={post}
              onDelete={id => setPosts(prev => prev.filter(p => p.id !== id))}
            />
          ))
        )}
      </div>

      {/* Sidebar */}
      <div className="sidebar">
        <div className="sidebar-card">
          <Link to={`/profile/${user?.id}`} className="sidebar-user">
            <div className="avatar avatar-md">{user?.username?.charAt(0).toUpperCase()}</div>
            <div>
              <p className="sidebar-username">{user?.username}</p>
              <p className="sidebar-sub">View profile</p>
            </div>
          </Link>
        </div>

        {users.length > 0 && (
          <div className="sidebar-card">
            <h4 className="sidebar-title">Suggested for you</h4>
            {users.map(u => (
              <Link to={`/profile/${u.id}`} key={u.id} className="suggest-item">
                <div className="avatar avatar-sm">{u.username.charAt(0).toUpperCase()}</div>
                <div>
                  <p className="suggest-name">{u.username}</p>
                </div>
              </Link>
            ))}
            <Link to="/explore" className="sidebar-explore">See all →</Link>
          </div>
        )}
      </div>
    </div>
  );
}
