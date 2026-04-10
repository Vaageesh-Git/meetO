import { useState, useEffect } from 'react';
import { getComments, addComment, deleteComment } from '../api/posts';
import type { Comment } from '../types';
import { useAuth } from '../context/AuthContext';

interface Props {
  postId: string;
  onCountChange: (delta: number) => void;
}

export default function CommentSection({ postId, onCountChange }: Props) {
  const { user } = useAuth();
  const [comments, setComments] = useState<Comment[]>([]);
  const [text, setText] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getComments(postId).then(r => setComments(r.data.comments)).catch(() => {});
  }, [postId]);

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!text.trim()) return;
    setLoading(true);
    try {
      const r = await addComment(postId, text.trim());
      setComments(prev => [...prev, r.data.comment]);
      setText('');
      onCountChange(1);
    } catch {}
    setLoading(false);
  };

  const handleDelete = async (commentId: string) => {
    try {
      await deleteComment(commentId);
      setComments(prev => prev.filter(c => c.id !== commentId));
      onCountChange(-1);
    } catch {}
  };

  return (
    <div className="comment-section">
      <div className="comments-list">
        {comments.map(c => (
          <div key={c.id} className="comment-item">
            <div className="comment-avatar">{c.userId.charAt(0).toUpperCase()}</div>
            <div className="comment-body">
              <p className="comment-text">{c.content}</p>
              <span className="comment-time">{new Date(c.createdAt).toLocaleString()}</span>
            </div>
            {user?.id === c.userId && (
              <button className="comment-delete" onClick={() => handleDelete(c.id)}>✕</button>
            )}
          </div>
        ))}
      </div>
      <form className="comment-form" onSubmit={handleAdd}>
        <input
          className="comment-input"
          value={text}
          onChange={e => setText(e.target.value)}
          placeholder="Add a comment…"
          disabled={loading}
        />
        <button className="comment-submit" type="submit" disabled={loading || !text.trim()}>
          Post
        </button>
      </form>
    </div>
  );
}
