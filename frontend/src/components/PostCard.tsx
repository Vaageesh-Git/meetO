import { useState } from 'react';
import { Link } from 'react-router-dom';
import type { Post } from '../types';
import { useAuth } from '../context/AuthContext';
import { deletePost } from '../api/posts';
import LikeButton from './LikeButton';
import CommentSection from './CommentSection';

interface Props {
  post: Post;
  onDelete?: (id: string) => void;
  onEdit?: (post: Post) => void;
}

export default function PostCard({ post, onDelete, onEdit }: Props) {
  const { user } = useAuth();
  const [showComments, setShowComments] = useState(false);
  const [liked, setLiked] = useState(post.liked);
  const [likeCount, setLikeCount] = useState(post.likeCount);
  const [commentCount, setCommentCount] = useState(post.commentCount);
  const [menuOpen, setMenuOpen] = useState(false);

  const isOwner = user?.id === post.userId;

  const handleDelete = async () => {
    try {
      await deletePost(post.id);
      onDelete?.(post.id);
    } catch {}
  };

  const handleLikeToggle = (newLiked: boolean, newCount: number) => {
    setLiked(newLiked);
    setLikeCount(newCount);
  };

  return (
    <div className="post-card">
      {/* Header */}
      <div className="post-header">
        <Link to={`/profile/${post.userId}`} className="post-author">
          <div className="avatar avatar-sm">{post.userId.charAt(0).toUpperCase()}</div>
          <span className="post-username">User</span>
        </Link>
        <span className="post-time">{new Date(post.createdAt).toLocaleDateString()}</span>
        {isOwner && (
          <div className="post-menu">
            <button className="menu-btn" onClick={() => setMenuOpen(v => !v)}>⋯</button>
            {menuOpen && (
              <div className="menu-dropdown">
                <button onClick={() => { setMenuOpen(false); onEdit?.(post); }}>Edit</button>
                <button onClick={handleDelete} className="danger">Delete</button>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Image */}
      {post.imageUrl && (
        <div className="post-image-wrap">
          <img src={post.imageUrl} alt="post" className="post-image" onError={e => (e.currentTarget.style.display='none')} />
        </div>
      )}

      {/* Content */}
      <div className="post-content">
        <p>{post.content}</p>
      </div>

      {/* Actions */}
      <div className="post-actions">
        <LikeButton postId={post.id} liked={liked} likeCount={likeCount} onToggle={handleLikeToggle} />
        <button className="comment-toggle" onClick={() => setShowComments(v => !v)}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/></svg>
          <span>{commentCount}</span>
        </button>
      </div>

      {/* Comments */}
      {showComments && (
        <CommentSection postId={post.id} onCountChange={delta => setCommentCount(c => c + delta)} />
      )}
    </div>
  );
}
