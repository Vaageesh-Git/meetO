import { useState } from 'react';
import { followUser, unfollowUser } from '../api/follows';

interface Props {
  userId: string;
  isFollowing: boolean;
  onToggle: (following: boolean) => void;
}

export default function FollowButton({ userId, isFollowing, onToggle }: Props) {
  const [loading, setLoading] = useState(false);

  const handleClick = async () => {
    setLoading(true);
    try {
      if (isFollowing) {
        await unfollowUser(userId);
        onToggle(false);
      } else {
        await followUser(userId);
        onToggle(true);
      }
    } catch {}
    setLoading(false);
  };

  return (
    <button
      className={`follow-btn ${isFollowing ? 'following' : ''}`}
      onClick={handleClick}
      disabled={loading}
      id={`follow-${userId}`}
    >
      {loading ? '...' : isFollowing ? 'Following' : 'Follow'}
    </button>
  );
}
