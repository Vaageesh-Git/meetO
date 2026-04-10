import { useEffect, useState, useRef } from 'react';
import { getConversationPartners, getConversation, sendMessage } from '../api/messages';
import { getAllUsers } from '../api/users';
import type { Message, UserWithProfile } from '../types';
import { useAuth } from '../context/AuthContext';

export default function MessagesPage() {
  const { user: me } = useAuth();
  const [partners, setPartners] = useState<UserWithProfile[]>([]);
  const [allUsers, setAllUsers] = useState<UserWithProfile[]>([]);
  const [selected, setSelected] = useState<UserWithProfile | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [text, setText] = useState('');
  const [loading, setLoading] = useState(false);
  const [showNewChat, setShowNewChat] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    getConversationPartners().then(r => setPartners(r.data.partners)).catch(() => {});
    getAllUsers().then(r => setAllUsers(r.data.users.filter((u: UserWithProfile) => u.id !== me?.id))).catch(() => {});
  }, []);

  useEffect(() => {
    if (selected) {
      getConversation(selected.id).then(r => setMessages(r.data.messages)).catch(() => {});
    }
  }, [selected]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!text.trim() || !selected) return;
    setLoading(true);
    try {
      const r = await sendMessage(selected.id, text.trim());
      setMessages(prev => [...prev, r.data.message]);
      setText('');
      // Add to partners if new
      if (!partners.find(p => p.id === selected.id)) {
        setPartners(prev => [selected, ...prev]);
      }
    } catch {}
    setLoading(false);
  };

  const selectUser = (u: UserWithProfile) => {
    setSelected(u);
    setShowNewChat(false);
  };

  return (
    <div className="messages-page">
      {/* Sidebar */}
      <div className="msg-sidebar">
        <div className="msg-sidebar-header">
          <h3>Messages</h3>
          <button className="icon-btn" onClick={() => setShowNewChat(v => !v)} id="new-chat-btn">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
          </button>
        </div>

        {showNewChat && (
          <div className="new-chat-list">
            <p className="new-chat-label">Start a conversation</p>
            {allUsers.map(u => (
              <div key={u.id} className="msg-item" onClick={() => selectUser(u)}>
                <div className="avatar avatar-sm">{u.username.charAt(0).toUpperCase()}</div>
                <span>{u.username}</span>
              </div>
            ))}
          </div>
        )}

        {partners.map(p => (
          <div key={p.id} className={`msg-item ${selected?.id === p.id ? 'active' : ''}`} onClick={() => selectUser(p)}>
            <div className="avatar avatar-sm">{p.username.charAt(0).toUpperCase()}</div>
            <span>{p.username}</span>
          </div>
        ))}

        {partners.length === 0 && !showNewChat && (
          <p className="msg-empty">No conversations yet</p>
        )}
      </div>

      {/* Chat area */}
      <div className="msg-chat">
        {!selected ? (
          <div className="msg-placeholder">
            <span className="empty-icon">💬</span>
            <p>Select a conversation or start a new one</p>
          </div>
        ) : (
          <>
            <div className="msg-chat-header">
              <div className="avatar avatar-sm">{selected.username.charAt(0).toUpperCase()}</div>
              <h4>{selected.username}</h4>
            </div>
            <div className="msg-body">
              {messages.map(m => (
                <div key={m.id} className={`msg-bubble ${m.senderId === me?.id ? 'mine' : 'theirs'}`}>
                  <p>{m.content}</p>
                  <span className="msg-time">{new Date(m.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                </div>
              ))}
              <div ref={bottomRef} />
            </div>
            <form className="msg-form" onSubmit={handleSend}>
              <input
                className="msg-input"
                value={text}
                onChange={e => setText(e.target.value)}
                placeholder="Type a message…"
                disabled={loading}
                id="msg-input"
              />
              <button type="submit" className="btn-send" disabled={loading || !text.trim()} id="msg-send">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
