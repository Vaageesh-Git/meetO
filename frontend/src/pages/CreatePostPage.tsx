import { useState } from 'react';
import type { FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { createPost } from '../api/posts';

export default function CreatePostPage() {
  const navigate = useNavigate();
  const [content, setContent] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!content.trim()) return;
    setLoading(true);
    setError('');
    try {
      await createPost({ content: content.trim(), imageUrl: imageUrl.trim() || undefined });
      navigate('/feed');
    } catch (err: any) {
      setError(err.response?.data?.error || 'Failed to create post');
    }
    setLoading(false);
  };

  return (
    <div className="create-page">
      <div className="create-card">
        <h2 className="create-title">New Post</h2>

        {imageUrl && (
          <div className="preview-wrap">
            <img src={imageUrl} alt="preview" className="preview-img" onError={e => (e.currentTarget.style.display='none')} />
          </div>
        )}

        <form className="create-form" onSubmit={handleSubmit}>
          {error && <div className="error-banner">{error}</div>}
          <div className="form-group">
            <label>Image URL <span className="optional">(optional)</span></label>
            <input
              id="post-image-url"
              type="url"
              value={imageUrl}
              onChange={e => setImageUrl(e.target.value)}
              placeholder="https://example.com/photo.jpg"
            />
          </div>
          <div className="form-group">
            <label>Caption</label>
            <textarea
              id="post-content"
              value={content}
              onChange={e => setContent(e.target.value)}
              placeholder="What's on your mind?"
              rows={5}
              required
            />
            <span className="char-count">{content.length} / 2200</span>
          </div>
          <div className="create-actions">
            <button type="button" className="btn-secondary" onClick={() => navigate(-1)}>
              Cancel
            </button>
            <button type="submit" className="btn-primary" disabled={loading || !content.trim()} id="post-submit">
              {loading ? 'Posting…' : 'Share Post'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
