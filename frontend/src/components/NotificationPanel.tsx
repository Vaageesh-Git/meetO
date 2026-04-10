import { useEffect, useState, useRef } from 'react';
import { getNotifications, markAsRead } from '../api/notifications';
import type { Notification } from '../types';

interface Props { onClose: () => void; }

export default function NotificationPanel({ onClose }: Props) {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    getNotifications().then(r => setNotifications(r.data.notifications)).catch(() => {});
  }, []);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) onClose();
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [onClose]);

  const handleRead = async (id: string) => {
    await markAsRead(id);
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, isRead: true } : n));
  };

  const icon = (type: Notification['type']) => {
    if (type === 'like') return '❤️';
    if (type === 'comment') return '💬';
    return '👤';
  };

  const label = (type: Notification['type']) => {
    if (type === 'like') return 'liked your post';
    if (type === 'comment') return 'commented on your post';
    return 'started following you';
  };

  return (
    <div className="notif-panel" ref={ref}>
      <div className="notif-header">
        <h3>Notifications</h3>
        <span className="badge">{notifications.filter(n => !n.isRead).length}</span>
      </div>
      <div className="notif-list">
        {notifications.length === 0 && (
          <p className="notif-empty">No notifications yet</p>
        )}
        {notifications.map(n => (
          <div key={n.id} className={`notif-item ${n.isRead ? 'read' : 'unread'}`} onClick={() => !n.isRead && handleRead(n.id)}>
            <span className="notif-icon">{icon(n.type)}</span>
            <div className="notif-body">
              <p>Someone <strong>{label(n.type)}</strong></p>
              <span className="notif-time">{new Date(n.createdAt).toLocaleString()}</span>
            </div>
            {!n.isRead && <span className="unread-dot" />}
          </div>
        ))}
      </div>
    </div>
  );
}
