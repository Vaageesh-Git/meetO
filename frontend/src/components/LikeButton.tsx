import { likePost, unlikePost } from '../api/posts';

interface Props {
  postId: string;
  liked: boolean;
  likeCount: number;
  onToggle: (liked: boolean, count: number) => void;
}

export default function LikeButton({ postId, liked, likeCount, onToggle }: Props) {
  const handleClick = async () => {
    try {
      if (liked) {
        await unlikePost(postId);
        onToggle(false, likeCount - 1);
      } else {
        await likePost(postId);
        onToggle(true, likeCount + 1);
      }
    } catch {}
  };

  return (
    <button className={`like-btn ${liked ? 'liked' : ''}`} onClick={handleClick} id={`like-${postId}`}>
      <svg width="20" height="20" viewBox="0 0 24 24" fill={liked ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2">
        <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/>
      </svg>
      <span>{likeCount}</span>
    </button>
  );
}
