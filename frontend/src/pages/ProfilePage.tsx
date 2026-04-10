import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getUser, updateProfile, getUserPosts } from '../api/users';
import type { UserWithProfile, Post } from '../types';
import { useAuth } from '../context/AuthContext';
import FollowButton from '../components/FollowButton';
import PostCard from '../components/PostCard';

export default function ProfilePage() {
  const { id } = useParams<{ id: string }>();
  const { user: me } = useAuth();
  const [profile, setProfile] = useState<UserWithProfile | null>(null);
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [bioInput, setBioInput] = useState('');
  const [avatarInput, setAvatarInput] = useState('');
  const [isFollowing, setIsFollowing] = useState(false);

  const isMe = me?.id === id;

  const load = async () => {
    if (!id) return;
    try {
      const [userRes, postsRes] = await Promise.all([
        getUser(id),
        getUserPosts(id),
      ]);
      const userData = userRes.data;
      setProfile(userData);
      setIsFollowing(userData.isFollowing);
      setPosts(postsRes.data.posts || []);
      setBioInput(userData.profile?.bio || '');
      setAvatarInput(userData.profile?.avatarUrl || '');
    } catch (err) {
      console.error('Failed to load profile', err);
    }
    setLoading(false);
  };

  useEffect(() => { 
    if (id) load(); 
  }, [id]);

  const handleSaveProfile = async () => {
    if (!id) return;
    try {
      await updateProfile(id, { bio: bioInput, avatarUrl: avatarInput });
      setProfile(prev => prev ? { ...prev, profile: { ...prev.profile!, bio: bioInput, avatarUrl: avatarInput, updatedAt: new Date().toISOString() } } : prev);
      setEditing(false);
    } catch {}
  };

  if (loading) return <div className="page-loading"><div className="spinner" /></div>;
  if (!profile) return <div className="page-error">User not found</div>;

  const avatarUrl = profile.profile?.avatarUrl;
  const bio = profile.profile?.bio;
  const username = profile.username || 'User';

  return (
    <div className="profile-page">
      <div className="profile-header">
        <div className="profile-avatar">
          {avatarUrl ? (
            <img src={avatarUrl} alt="avatar" className="avatar-img" onError={e => (e.currentTarget.style.display='none')} />
          ) : (
            <div className="avatar avatar-xl">{username.charAt(0).toUpperCase()}</div>
          )}
        </div>
        <div className="profile-info">
          <div className="profile-top">
            <h2 className="profile-username">{profile.username}</h2>
            {isMe ? (
              <button className="btn-secondary" onClick={() => setEditing(v => !v)} id="edit-profile-btn">
                {editing ? 'Cancel' : 'Edit Profile'}
              </button>
            ) : (
              <FollowButton userId={profile.id} isFollowing={isFollowing} onToggle={setIsFollowing} />
            )}
          </div>
          <div className="profile-stats">
            <span><strong>{posts.length}</strong> posts</span>
            <span><strong>{profile.followersCount ?? 0}</strong> followers</span>
            <span><strong>{profile.followingCount ?? 0}</strong> following</span>
          </div>
          <p className="profile-bio">{bio || 'No bio yet.'}</p>
        </div>
      </div>

      {editing && (
        <div className="edit-profile-form">
          <div className="form-group">
            <label>Bio</label>
            <textarea
              value={bioInput}
              onChange={e => setBioInput(e.target.value)}
              rows={3}
              placeholder="Tell the world about yourself…"
              id="bio-input"
            />
          </div>
          <div className="form-group">
            <label>Avatar URL</label>
            <input
              type="url"
              value={avatarInput}
              onChange={e => setAvatarInput(e.target.value)}
              placeholder="https://example.com/photo.jpg"
              id="avatar-input"
            />
          </div>
          <button className="btn-primary" onClick={handleSaveProfile} id="save-profile-btn">Save</button>
        </div>
      )}

      <div className="profile-divider" />

      <div className="posts-grid">
        {posts.length === 0 ? (
          <div className="empty-state">
            <span className="empty-icon">📷</span>
            <h3>No posts yet</h3>
          </div>
        ) : (
          posts.map(p => (
            <PostCard key={p.id} post={p} onDelete={id => setPosts(prev => prev.filter(p => p.id !== id))} />
          ))
        )}
      </div>
    </div>
  );
}
