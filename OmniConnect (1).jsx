import React, { useState, useEffect, useRef, useMemo } from 'react';
import {
  MessageSquare,
  Home,
  Compass,
  User,
  Search,
  PlusCircle,
  Send,
  Heart,
  MessageCircle,
  Share2,
  Camera,
  Phone,
  Video,
  MoreVertical,
  CheckCheck,
  Mic,
  Smile,
  Bell,
  ShieldCheck,
  X,
  ThumbsUp,
  Lock,
  Smartphone,
  Mail,
  ChevronLeft,
  Paperclip,
  UserPlus,
  UserCheck,
  BellRing,
  Radio,
  Trophy,
  Eye,
  Flame,
  Crown,
  PhoneOff,
  MicOff,
  VideoOff,
  Info,
  FileText,
  LockKeyhole, Pencil, Check, Pin } from 'lucide-react';

// ---------------------------------------------------------------
// Sample data
// ---------------------------------------------------------------
const INITIAL_USERS = [
  { id: 'u1', name: 'Alex Rivera', handle: '@alex_r', avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&auto=format&fit=crop&q=80', isFollowing: true, isFollower: true, isFriend: true, notifyOnPost: true, followersCount: 48900, verified: true },
  { id: 'u2', name: 'Elena Rostova', handle: '@elena_ros', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80', isFollowing: true, isFollower: true, isFriend: true, notifyOnPost: true, followersCount: 89400, verified: true },
  { id: 'u3', name: 'Marcus Chen', handle: '@mchen_tech', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80', isFollowing: true, isFollower: false, isFriend: false, notifyOnPost: false, followersCount: 125000, verified: true },
  { id: 'u4', name: 'Sophia Taylor', handle: '@sophiat', avatar: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=150&auto=format&fit=crop&q=80', isFollowing: false, isFollower: true, isFriend: false, notifyOnPost: false, followersCount: 34200, verified: false },
  { id: 'u5', name: 'David Kim', handle: '@dkim_design', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80', isFollowing: false, isFollower: false, isFriend: false, notifyOnPost: false, followersCount: 67100, verified: true },
  { id: 'u6', name: 'Aria Vance', handle: '@aria_vance', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80', isFollowing: false, isFollower: false, isFriend: false, notifyOnPost: false, followersCount: 142000, verified: true }
];

const INITIAL_CHATS = [
  {
    id: 'c1',
    name: 'Elena Rostova',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80',
    lastMessage: 'Watching the sunset over the Aegean Sea! 🌊',
    time: '10:42 AM',
    unread: 2,
    online: true,
    messages: [
      { id: 'm1', text: 'Hey Sarah! Are you ready for the new feature deployment?', sender: 'them', time: '10:30 AM', status: 'read' },
      { id: 'm2', text: 'Yes, all staging tests passed successfully on Cloudflare workers.', sender: 'me', time: '10:35 AM', status: 'read' },
      { id: 'm3', text: 'Watching the sunset over the Aegean Sea! 🌊', sender: 'them', time: '10:42 AM', status: 'delivered' }
    ]
  },
  {
    id: 'c2',
    name: 'Alex Rivera',
    avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&auto=format&fit=crop&q=80',
    lastMessage: 'Got it! This multi-app integration is working super smoothly 🚀',
    time: 'Yesterday',
    unread: 0,
    online: false,
    lastSeen: 'Yesterday at 8:15 PM',
    messages: [
      { id: 'm4', text: 'Did you check the new UI mockups?', sender: 'me', time: 'Yesterday', status: 'read' },
      { id: 'm5', text: 'Got it! This multi-app integration is working super smoothly 🚀', sender: 'them', time: 'Yesterday', status: 'read' }
    ]
  },
  {
    id: 'c3',
    name: 'Marcus Chen',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    lastMessage: 'Let’s sync up for the design review tomorrow morning.',
    time: 'Oct 28',
    unread: 1,
    online: true,
    messages: [
      { id: 'm6', text: 'Let’s sync up for the design review tomorrow morning.', sender: 'them', time: 'Oct 28', status: 'delivered' }
    ]
  }
];

const INITIAL_STORIES = [
  { id: 's1', name: 'My Status', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80', isUser: true },
  { id: 's2', name: 'Elena Rostova', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80', image: 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=800&q=80', viewed: false },
  { id: 's3', name: 'Alex Rivera', avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&auto=format&fit=crop&q=80', image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800&q=80', viewed: false },
  { id: 's4', name: 'Marcus Chen', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80', image: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=800&q=80', viewed: true }
];

const INITIAL_FRIENDS_POSTS = [
  {
    id: 'fp1',
    author: 'Elena Rostova',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80',
    timestamp: '2 hours ago',
    location: 'Santorini, Greece',
    text: 'Watching the sunset over the Aegean Sea. Nothing beats this tranquil view after a long week of work! 🌊☀️ #Wanderlust #TravelVibes',
    media: 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=800&q=80',
    likes: 3420,
    views: 45200,
    liked: false,
    comments: [
      { id: 'cm1', user: 'Alex Rivera', text: 'Absolutely stunning! Take me there 😍' },
      { id: 'cm2', user: 'Marcus Chen', text: 'Great camera framing, what lens did you use?' }
    ]
  },
  {
    id: 'fp2',
    author: 'Marcus Chen',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    timestamp: '5 hours ago',
    text: 'Just launched our new unified messaging interface project! Designed to bridge fast instant messaging with rich social media feeds. What do you guys think?',
    media: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=800&q=80',
    likes: 8940,
    views: 89100,
    liked: true,
    comments: [
      { id: 'cm3', user: 'Sarah Jenkins', text: 'The combination of WhatsApp chat with Instagram explore is super slick!' }
    ]
  },
  {
    id: 'fp3',
    author: 'Aria Vance',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    timestamp: 'Yesterday at 4:15 PM',
    location: 'Tokyo Cyber District',
    text: 'Late night aesthetic walk through Shibuya. Neon light reflections after fresh rain 🌧️✨',
    media: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=800&q=80',
    likes: 12400,
    views: 112000,
    liked: false,
    comments: []
  },
  {
    id: 'fp4',
    author: 'David Kim',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
    timestamp: '1 day ago',
    text: 'Minimalist workspace setup complete for 2026. Clean desk, dual OLED monitors, and zero wire clutter 🖥️🎧',
    media: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=800&q=80',
    likes: 4500,
    views: 38400,
    liked: false,
    comments: []
  },
  {
    id: 'fp5',
    author: 'Alex Rivera',
    avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&auto=format&fit=crop&q=80',
    timestamp: '2 days ago',
    text: 'Aerial drone footage over the Swiss Alps. Snow covered peaks in mid-winter! 🚁🏔️',
    media: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800&q=80',
    likes: 6700,
    views: 62000,
    liked: true,
    comments: []
  }
];

const EXPLORE_ITEMS = [
  { id: 'ex1', title: 'Futuristic Architecture', tag: 'Architecture', likes: '12.4k', comments: '342', media: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?w=600&q=80', type: 'image' },
  { id: 'ex2', title: 'Neon Cyberpunk City', tag: 'Tech', likes: '8.9k', comments: '190', media: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=600&q=80', type: 'image' },
  { id: 'ex3', title: 'Mountain Mist Drone Shot', tag: 'Travel', likes: '24.1k', comments: '850', media: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=600&q=80', type: 'video' },
  { id: 'ex4', title: 'Artisan Coffee Pour', tag: 'Food', likes: '5.2k', comments: '88', media: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=600&q=80', type: 'image' },
  { id: 'ex5', title: 'Minimalist Interior Design', tag: 'Art', likes: '19.8k', comments: '412', media: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=600&q=80', type: 'image' },
  { id: 'ex6', title: 'Wild Forest Trail', tag: 'Nature', likes: '14.3k', comments: '230', media: 'https://images.unsplash.com/photo-1448375240586-882707db888b?w=600&q=80', type: 'image' },
  { id: 'ex7', title: 'Cyber Concept Car', tag: 'Tech', likes: '31.0k', comments: '1.2k', media: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=600&q=80', type: 'image' },
  { id: 'ex8', title: 'Tropical Island Aerial', tag: 'Travel', likes: '45.7k', comments: '2.1k', media: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600&q=80', type: 'video' }
];

const EXPLORE_TAGS = ['All', 'Travel', 'Tech', 'Food', 'Art', 'Architecture', 'Nature'];

const INITIAL_NOTIFICATIONS = [
  { id: 'n1', type: 'friend_post', actor: { name: 'Elena Rostova', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80' }, content: 'published a new update: "Watching the sunset over the Aegean Sea..."', time: '2 hours ago', read: false, postId: 'fp1' },
  { id: 'n2', type: 'follower', actor: { name: 'Sophia Taylor', avatar: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=150&auto=format&fit=crop&q=80' }, content: 'started following your profile.', time: '4 hours ago', read: false },
  { id: 'n3', type: 'like', actor: { name: 'Marcus Chen', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80' }, content: 'liked your post on the unified design system.', time: 'Yesterday', read: true }
];

const nowTime = () => new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

// Collision-proof IDs
const uid = (prefix) =>
  `${prefix}_${
    typeof crypto !== 'undefined' && crypto.randomUUID
      ? crypto.randomUUID()
      : `${Date.now()}_${Math.random().toString(36).slice(2, 10)}`
  }`;

const REACTION_EMOJIS = ['👍', '❤️', '😂', '🔥', '👏'];
const STATUS_RANK = { sent: 0, delivered: 1, read: 2 };

// Neutral avatar shown when an image URL fails to load
const PLACEHOLDER_IMG =
  'data:image/svg+xml;utf8,' +
  encodeURIComponent(
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><rect width="100" height="100" fill="#1e293b"/><circle cx="50" cy="38" r="18" fill="#475569"/><path d="M14 100c0-22 16-36 36-36s36 14 36 36z" fill="#475569"/></svg>'
  );

const Img = ({ onError, ...props }) => (
  <img
    {...props}
    onError={(e) => {
      e.currentTarget.onerror = null;
      e.currentTarget.src = PLACEHOLDER_IMG;
      if (onError) onError(e);
    }}
  />
);

// useState that survives page refreshes (falls back silently if storage is unavailable)
function usePersistentState(key, initial) {
  const [value, setValue] = useState(() => {
    try {
      const raw = window.localStorage.getItem(key);
      return raw ? JSON.parse(raw) : initial;
    } catch {
      return initial;
    }
  });
  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch {
      /* storage unavailable or full */
    }
  }, [key, value]);
  return [value, setValue];
}

// ---------------------------------------------------------------
// App
// ---------------------------------------------------------------
export default function App() {
  // Navigation & view state
  const [activeTab, setActiveTab] = useState('trending');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedChatId, setSelectedChatId] = useState(null);
  const [selectedTag, setSelectedTag] = useState('All');

  // Data state
  const [chats, setChats] = usePersistentState('omni_chats', INITIAL_CHATS);
  const [friendsPosts, setFriendsPosts] = usePersistentState('omni_posts', INITIAL_FRIENDS_POSTS);
  const [stories, setStories] = usePersistentState('omni_stories', INITIAL_STORIES);

  // Social graph & notifications
  const [users, setUsers] = usePersistentState('omni_users', INITIAL_USERS);
  const [notifications, setNotifications] = usePersistentState('omni_notifications', INITIAL_NOTIFICATIONS);
  const [notifFilter, setNotifFilter] = useState('all');
  const [toastNotification, setToastNotification] = useState(null);

  // Chat input / modal state (previously missing)
  const [newMessageText, setNewMessageText] = useState('');
  const [isCreatingPost, setIsCreatingPost] = useState(false);
  const [newPostText, setNewPostText] = useState('');
  const [newPostImage, setNewPostImage] = useState('');
  const [exploreModalItem, setExploreModalItem] = useState(null);
  const [activeStoryModal, setActiveStoryModal] = useState(null);
  const [openCommentsPostId, setOpenCommentsPostId] = useState(null);
  const [commentDraft, setCommentDraft] = useState('');
  const [storyReply, setStoryReply] = useState('');
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [profileDraft, setProfileDraft] = useState(null);
  const [infoToast, setInfoToast] = useState(null);
  const [typingChats, setTypingChats] = useState({});
  const [reactionTarget, setReactionTarget] = useState(null);

  // Calls, voice notes, attachments, contact info
  const [activeCall, setActiveCall] = useState(null);
  const [callTimer, setCallTimer] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOn, setIsVideoOn] = useState(true);
  const [isRecordingAudio, setIsRecordingAudio] = useState(false);
  const [recordTimer, setRecordTimer] = useState(0);
  const [showAttachmentMenu, setShowAttachmentMenu] = useState(false);
  const [showContactInfo, setShowContactInfo] = useState(false);

  // Current user
  const [userProfile, setUserProfile] = usePersistentState('omni_profile', {
    name: 'Sarah Jenkins',
    handle: '@sarah_j',
    phone: '+1 (555) 019-2831',
    email: 'sarah.j@omniconnect.app',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    bio: 'Product Designer & Tech Explorer 🎨⚡ Building the unified social web.',
    postsCount: 24,
    verifiedPhone: true,
    verifiedEmail: true
  });

  // The open chat is derived from `chats`, so it never goes stale
  const selectedChat = chats.find(c => c.id === selectedChatId) || null;

  const messagesEndRef = useRef(null);
  const pendingTimeouts = useRef([]);
  const longPressTimer = useRef(null);

  const q = searchQuery.trim().toLowerCase();

  // ---- Filtered / derived lists (memoised) ----
  const filteredUsers = useMemo(
    () => users.filter(u => !q || u.name.toLowerCase().includes(q) || u.handle.toLowerCase().includes(q)),
    [users, q]
  );

  const filteredPosts = useMemo(
    () => friendsPosts.filter(p => !q || p.author.toLowerCase().includes(q) || (p.text || '').toLowerCase().includes(q)),
    [friendsPosts, q]
  );

  const top5Profiles = useMemo(
    () => [...filteredUsers].sort((a, b) => b.followersCount - a.followersCount).slice(0, 5),
    [filteredUsers]
  );

  const top5Posts = useMemo(
    () => [...filteredPosts].sort((a, b) => (b.views || 0) - (a.views || 0)).slice(0, 5),
    [filteredPosts]
  );

  // Pinned chats float to the top (sort is stable, so order is otherwise preserved)
  const filteredChats = useMemo(
    () =>
      chats
        .filter(c => c.name.toLowerCase().includes(q) || c.lastMessage.toLowerCase().includes(q))
        .sort((a, b) => Number(!!b.pinned) - Number(!!a.pinned)),
    [chats, q]
  );

  const filteredExplore = useMemo(
    () =>
      EXPLORE_ITEMS.filter(item =>
        (selectedTag === 'All' || item.tag === selectedTag) &&
        (!q || item.title.toLowerCase().includes(q) || item.tag.toLowerCase().includes(q))
      ),
    [selectedTag, q]
  );

  const filteredNotifications = useMemo(
    () =>
      notifications.filter(n => {
        if (notifFilter === 'friends_posts' && n.type !== 'friend_post') return false;
        if (notifFilter === 'alerts' && n.type !== 'follower' && n.type !== 'like') return false;
        return !q || n.actor.name.toLowerCase().includes(q) || n.content.toLowerCase().includes(q);
      }),
    [notifications, notifFilter, q]
  );

  const followerCount = users.filter(u => u.isFollower).length + 1420;
  const followingCount = users.filter(u => u.isFollowing).length + 380;
  const unreadNotifCount = notifications.filter(n => !n.read).length;
  const totalUnreadChats = chats.reduce((acc, c) => acc + c.unread, 0);
  const myPostsCount = userProfile.postsCount + friendsPosts.filter(p => p.isMine).length;

  // ---- Effects ----
  useEffect(() => {
    if (selectedChat) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [selectedChat?.messages.length, selectedChatId]);

  useEffect(() => {
    let interval;
    if (activeCall) {
      interval = setInterval(() => setCallTimer(prev => prev + 1), 1000);
    } else {
      setCallTimer(0);
    }
    return () => clearInterval(interval);
  }, [activeCall]);

  useEffect(() => {
    let interval;
    if (isRecordingAudio) {
      interval = setInterval(() => setRecordTimer(prev => prev + 1), 1000);
    } else {
      setRecordTimer(0);
    }
    return () => clearInterval(interval);
  }, [isRecordingAudio]);

  // Start each tab with a clean search box
  useEffect(() => {
    setSearchQuery('');
  }, [activeTab]);

  // Clear any pending timeouts (auto-replies, toast dismissal) on unmount
  useEffect(() => {
    return () => {
      pendingTimeouts.current.forEach(clearTimeout);
      clearTimeout(longPressTimer.current);
    };
  }, []);

  const later = (fn, ms) => {
    const id = setTimeout(() => {
      fn();
      pendingTimeouts.current = pendingTimeouts.current.filter(x => x !== id);
    }, ms);
    pendingTimeouts.current.push(id);
    return id;
  };

  // ---- Helpers ----
  const appendMessage = (chatId, msg, preview) => {
    setChats(prev =>
      prev.map(c =>
        c.id === chatId
          ? { ...c, lastMessage: preview, time: 'Just now', messages: [...c.messages, msg] }
          : c
      )
    );
  };

  // Only ever upgrades status: sent -> delivered -> read
  const markMyMessages = (chatId, status) => {
    setChats(prev =>
      prev.map(c =>
        c.id !== chatId
          ? c
          : {
              ...c,
              messages: c.messages.map(m =>
                m.sender === 'me' && (STATUS_RANK[m.status] ?? 0) < STATUS_RANK[status] ? { ...m, status } : m
              )
            }
      )
    );
  };

  const handleTogglePin = (chatId) => {
    setChats(prev => prev.map(c => (c.id === chatId ? { ...c, pinned: !c.pinned } : c)));
  };

  // One reaction per user per message; tapping the same emoji again removes it
  const handleReact = (chatId, msgId, emoji) => {
    setChats(prev =>
      prev.map(c => {
        if (c.id !== chatId) return c;
        return {
          ...c,
          messages: c.messages.map(m => {
            if (m.id !== msgId) return m;
            const reactions = { ...(m.reactions || {}) };
            if (m.myReaction) {
              reactions[m.myReaction] = (reactions[m.myReaction] || 1) - 1;
              if (reactions[m.myReaction] <= 0) delete reactions[m.myReaction];
            }
            const removing = m.myReaction === emoji;
            if (!removing) reactions[emoji] = (reactions[emoji] || 0) + 1;
            return { ...m, reactions, myReaction: removing ? null : emoji };
          })
        };
      })
    );
    setReactionTarget(null);
  };

  const startLongPress = (msgId) => {
    clearTimeout(longPressTimer.current);
    longPressTimer.current = setTimeout(() => setReactionTarget(msgId), 450);
  };
  const cancelLongPress = () => clearTimeout(longPressTimer.current);

  const openChat = (chat) => {
    setSelectedChatId(chat.id);
    setChats(prev => prev.map(c => (c.id === chat.id ? { ...c, unread: 0 } : c)));
  };

  const closeChat = () => { setReactionTarget(null); setSelectedChatId(null);
    setShowContactInfo(false);
    setShowAttachmentMenu(false);
    setIsRecordingAudio(false);
  };

  // ---- Handlers: calls ----
  const handleStartCall = (type) => {
    if (!selectedChat) return;
    setShowAttachmentMenu(false);
    setActiveCall({
      type,
      contactName: selectedChat.name,
      avatar: selectedChat.avatar
    });
    setIsMuted(false);
    setIsVideoOn(type === 'video');
  };

  const handleEndCall = () => setActiveCall(null);

  // ---- Handlers: voice notes & attachments ----
  const handleStopAndSendAudio = () => {
    if (!selectedChat) return;
    setIsRecordingAudio(false);
    const label = `🎤 Voice note (${recordTimer}s)`;
    appendMessage(
      selectedChat.id,
      {
        id: uid('m_audio'),
        text: label,
        isAudio: true,
        audioDuration: `${recordTimer}s`,
        sender: 'me',
        time: nowTime(),
        status: 'delivered'
      },
      label
    );
  };

  const handleSendAttachment = (type) => {
    if (!selectedChat) return;
    setShowAttachmentMenu(false);
    const label = type === 'image' ? '📸 Photo' : '📄 Document.pdf';
    appendMessage(
      selectedChat.id,
      {
        id: uid('m_att'),
        text: label,
        media: type === 'image' ? 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=600&q=80' : null,
        isFile: type === 'document',
        sender: 'me',
        time: nowTime(),
        status: 'delivered'
      },
      label
    );
  };

  // ---- Handlers: social graph ----
  const handleToggleFollow = (userId) => {
    setUsers(prev =>
      prev.map(u => {
        if (u.id !== userId) return u;
        const nextFollowing = !u.isFollowing;
        return {
          ...u,
          isFollowing: nextFollowing,
          isFriend: nextFollowing && u.isFollower,
          notifyOnPost: nextFollowing ? u.notifyOnPost : false
        };
      })
    );
  };

  const handleToggleNotifyOnPost = (userId) => {
    setUsers(prev => prev.map(u => (u.id === userId ? { ...u, notifyOnPost: !u.notifyOnPost } : u)));
  };

  const handleMarkNotifRead = (notifId) => {
    setNotifications(prev => prev.map(n => (n.id === notifId ? { ...n, read: true } : n)));
  };

  const handleMarkAllRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  // ---- Simulation: friend posts a new update ----
  const triggerSimulatedFriendPost = () => {
    const friend = users.find(u => u.isFriend && u.notifyOnPost) || users[0];
    const captions = [
      'Just finished testing the new real-time notification engine! ⚡️ #OmniConnect',
      'Sunset views from the rooftop office today 🌆 What a vibe!',
      'Exploring new AI tools for UI design. Future is looking super bright ✨'
    ];
    const caption = captions[Math.floor(Math.random() * captions.length)];
    const newPostId = uid('fp');

    setFriendsPosts(prev => [
      {
        id: newPostId,
        author: friend.name,
        avatar: friend.avatar,
        timestamp: 'Just now',
        text: caption,
        likes: 1,
        views: 0,
        liked: false,
        comments: []
      },
      ...prev
    ]);

    setNotifications(prev => [
      {
        id: uid('n'),
        type: 'friend_post',
        actor: { name: friend.name, avatar: friend.avatar },
        content: `published a new update: "${caption.substring(0, 35)}..."`,
        time: 'Just now',
        read: false,
        postId: newPostId
      },
      ...prev
    ]);

    setToastNotification({
      title: `New Post from ${friend.name}`,
      message: caption,
      avatar: friend.avatar,
      postId: newPostId
    });

    later(() => setToastNotification(null), 4500);
  };

  // ---- Handlers: chat ----
  const handleSendMessage = (e) => {
    e.preventDefault();
    const text = newMessageText.trim();
    if (!text || !selectedChat) return;

    const chatId = selectedChat.id;
    appendMessage(
      chatId,
      { id: uid('m'), text, sender: 'me', time: nowTime(), status: 'sent' },
      text
    );
    setNewMessageText('');
    setTypingChats(prev => ({ ...prev, [chatId]: true }));
    later(() => markMyMessages(chatId, 'delivered'), 500);

    // Simulated reply, delivered to the same chat even if the user navigates away
    later(() => {
      const reply = {
        id: uid('m_reply'),
        text: 'Got it! This multi-app integration is working super smoothly 🚀',
        sender: 'them',
        time: nowTime(),
        status: 'read'
      };
      setTypingChats(prev => ({ ...prev, [chatId]: false }));
      markMyMessages(chatId, 'read');
      appendMessage(chatId, reply, reply.text);
    }, 1800);
  };

  // ---- Handlers: posts ----
  const handleToggleLikePost = (postId) => {
    setFriendsPosts(prev =>
      prev.map(p =>
        p.id === postId
          ? { ...p, liked: !p.liked, likes: p.liked ? p.likes - 1 : p.likes + 1 }
          : p
      )
    );
  };

  const handleCreatePost = () => {
    if (!newPostText.trim() && !newPostImage.trim()) return;

    setFriendsPosts(prev => [
      {
        id: uid('fp'),
        isMine: true,
        author: userProfile.name,
        avatar: userProfile.avatar,
        timestamp: 'Just now',
        text: newPostText,
        media: newPostImage.trim() || null,
        likes: 1,
        views: 0,
        liked: true,
        comments: []
      },
      ...prev
    ]);
    setNewPostText('');
    setNewPostImage('');
    setIsCreatingPost(false);
  };

  const showInfo = (message) => {
    setInfoToast(message);
    later(() => setInfoToast(null), 2500);
  };

  // ---- Handlers: comments & sharing ----
  const handleToggleComments = (postId) => {
    setCommentDraft('');
    setOpenCommentsPostId(prev => (prev === postId ? null : postId));
  };

  const handleAddComment = (postId) => {
    const text = commentDraft.trim();
    if (!text) return;
    setFriendsPosts(prev =>
      prev.map(p =>
        p.id === postId
          ? { ...p, comments: [...p.comments, { id: uid('cm'), user: userProfile.name, text }] }
          : p
      )
    );
    setCommentDraft('');
  };

  const handleSharePost = async (post) => {
    const shareText = `${post.author}: ${(post.text || '').slice(0, 120)}`;
    try {
      if (navigator.share) {
        await navigator.share({ title: 'OmniConnect', text: shareText, url: window.location.href });
        return;
      }
      await navigator.clipboard.writeText(`${shareText} ${window.location.href}`);
      showInfo('Post link copied to clipboard');
    } catch (err) {
      if (err?.name !== 'AbortError') showInfo('Sharing is not available here');
    }
  };

  // ---- Handlers: stories ----
  const handleOpenStory = (story) => {
    if (!story.image) return;
    setStoryReply('');
    setActiveStoryModal(story);
    setStories(prev => prev.map(s => (s.id === story.id ? { ...s, viewed: true } : s)));
  };

  const handleSendStoryReply = () => {
    const text = storyReply.trim();
    if (!text || !activeStoryModal) return;
    const chat = chats.find(c => c.name === activeStoryModal.name);
    if (chat) {
      appendMessage(
        chat.id,
        { id: uid('m_story'), text: `↩️ Replied to your status: ${text}`, sender: 'me', time: nowTime(), status: 'delivered' },
        `↩️ ${text}`
      );
    }
    showInfo(`Reply sent to ${activeStoryModal.name.split(' ')[0]}`);
    setStoryReply('');
    setActiveStoryModal(null);
  };

  // ---- Handlers: profile editing ----
  const handleOpenEditProfile = () => {
    setProfileDraft({
      name: userProfile.name,
      handle: userProfile.handle,
      bio: userProfile.bio,
      avatar: userProfile.avatar
    });
    setIsEditingProfile(true);
  };

  const handleSaveProfile = () => {
    if (!profileDraft || !profileDraft.name.trim()) return;
    let handle = profileDraft.handle.trim() || userProfile.handle;
    if (!handle.startsWith('@')) handle = `@${handle}`;
    setUserProfile(prev => ({
      ...prev,
      name: profileDraft.name.trim(),
      handle,
      bio: profileDraft.bio.trim(),
      avatar: profileDraft.avatar.trim() || prev.avatar
    }));
    setIsEditingProfile(false);
    showInfo('Profile updated');
  };

  const searchPlaceholder =
    activeTab === 'trending' ? 'Search top creators & viral posts...' :
    activeTab === 'chats' ? 'Search messages, contacts...' :
    activeTab === 'feed' ? 'Search friends, posts...' :
    activeTab === 'explore' ? 'Search tags, visual trends...' :
    activeTab === 'notifications' ? 'Search alerts...' :
    'Search...';

  const searchEnabled = ['trending', 'chats', 'feed', 'explore', 'notifications'].includes(activeTab);

  return (
    <div className="flex justify-center items-center min-h-screen bg-slate-950 font-sans text-slate-100 p-0 sm:p-4">
      <style>{`
        @keyframes fadeIn { from { opacity: 0 } to { opacity: 1 } }
        @keyframes slideUp { from { transform: translateY(100%) } to { transform: translateY(0) } }
        .animate-fadeIn { animation: fadeIn .25s ease-out }
        .animate-slideUp { animation: slideUp .3s ease-out }
        .scrollbar-none::-webkit-scrollbar { display: none }
        .scrollbar-none { scrollbar-width: none }
      `}</style>

      {/* Phone shell */}
      <div className="w-full max-w-md h-[100vh] sm:h-[880px] bg-slate-900 sm:rounded-[40px] border-0 sm:border-8 sm:border-slate-800 shadow-2xl flex flex-col overflow-hidden relative">

        {/* Live toast */}
        {toastNotification && (
          <div className="absolute top-3 left-3 right-3 bg-slate-900/95 border border-emerald-500/50 backdrop-blur-md rounded-2xl p-3 z-50 shadow-2xl flex items-center justify-between animate-bounce">
            <div className="flex items-center gap-2.5">
              <Img src={toastNotification.avatar} alt="Actor" className="w-10 h-10 rounded-full object-cover border border-emerald-500/50" />
              <div>
                <h5 className="text-xs font-bold text-emerald-400">{toastNotification.title}</h5>
                <p className="text-[11px] text-slate-200 truncate max-w-[210px]">{toastNotification.message}</p>
              </div>
            </div>
            <button
              onClick={() => {
                setToastNotification(null);
                setSearchQuery('');
                setActiveTab('feed');
              }}
              className="bg-emerald-500 text-slate-950 text-[10px] font-extrabold px-2.5 py-1.5 rounded-xl hover:bg-emerald-400 shrink-0"
            >
              View
            </button>
          </div>
        )}

        {/* Header */}
        <header className="bg-slate-900/90 backdrop-blur-md border-b border-slate-800 p-3.5 z-20 sticky top-0 flex flex-col gap-2.5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-xl bg-gradient-to-tr from-amber-500 via-emerald-500 to-pink-500 p-0.5 flex items-center justify-center shadow-lg shadow-amber-500/20">
                <div className="h-full w-full bg-slate-900 rounded-[10px] flex items-center justify-center">
                  <Crown className="w-4 h-4 text-amber-400" />
                </div>
              </div>
              <span className="font-extrabold text-lg tracking-tight bg-gradient-to-r from-amber-400 via-emerald-300 to-pink-400 bg-clip-text text-transparent">
                OmniConnect
              </span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={triggerSimulatedFriendPost}
                className="flex items-center gap-1 bg-gradient-to-r from-emerald-500/20 to-indigo-500/20 border border-emerald-500/40 text-emerald-300 hover:bg-emerald-500/30 text-[10px] font-bold px-2 py-1.5 rounded-full transition-all"
                title="Simulate a Friend Posting in Real-Time"
              >
                <Radio className="w-3 h-3 text-emerald-400 animate-pulse" />
                <span>Test Alert</span>
              </button>

              <button
                aria-label="Open notifications" onClick={() => setActiveTab('notifications')} className={`relative p-2 rounded-full transition-colors ${activeTab === 'notifications' ? 'bg-indigo-600/50 text-indigo-300' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'}`}
              >
                <Bell className="w-4 h-4" />
                {unreadNotifCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-pink-500 text-slate-950 font-extrabold text-[9px] w-4 h-4 rounded-full flex items-center justify-center animate-bounce">
                    {unreadNotifCount}
                  </span>
                )}
              </button>

              <button
                onClick={() => setIsCreatingPost(true)}
                className="p-2 rounded-full bg-indigo-600/30 hover:bg-indigo-600/50 text-indigo-300 transition-colors"
                aria-label="Create post" title="Create Post"
              >
                <PlusCircle className="w-4 h-4" />
              </button>
            </div>
          </div>

          {searchEnabled && (
            <div className="relative w-full">
              <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
              <input
                type="text"
                placeholder={searchPlaceholder}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-slate-800/80 border border-slate-700/60 rounded-xl pl-9 pr-4 py-1.5 text-xs text-slate-200 placeholder-slate-400 focus:outline-none focus:border-indigo-500 transition-all"
              />
              {searchQuery && (
                <button onClick={() => setSearchQuery('')} aria-label="Clear search" className="absolute right-3 top-2 text-slate-400 hover:text-slate-200">
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
          )}
        </header>

        {/* Main content */}
        <main className="flex-1 overflow-y-auto relative scrollbar-none bg-slate-950">

          {/* ---------- TOP 5 / LEADERBOARD ---------- */}
          {activeTab === 'trending' && (
            <div className="p-3.5 space-y-5 animate-fadeIn">

              <div className="bg-gradient-to-r from-amber-500/10 via-purple-500/10 to-pink-500/10 border border-amber-500/20 rounded-3xl p-4 relative overflow-hidden shadow-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="flex items-center gap-1 text-[10px] font-extrabold uppercase tracking-wider text-amber-400 bg-amber-500/10 border border-amber-500/30 px-2.5 py-0.5 rounded-full w-fit mb-1.5">
                      <Trophy className="w-3 h-3" /> Hall of Fame
                    </span>
                    <h2 className="text-base font-extrabold text-white tracking-tight">Launch Leaderboard</h2>
                    <p className="text-[11px] text-slate-300 mt-0.5">Top creators & viral posts today</p>
                  </div>
                  <div className="p-3 bg-slate-900/80 border border-amber-500/30 rounded-2xl">
                    <Flame className="w-6 h-6 text-amber-400 animate-pulse" />
                  </div>
                </div>
              </div>

              {/* Top 5 profiles */}
              <div className="space-y-3">
                <div className="flex items-center justify-between px-1">
                  <h3 className="text-xs font-bold text-slate-200 uppercase tracking-wider flex items-center gap-1.5">
                    <Crown className="w-4 h-4 text-amber-400" /> Top 5 Most Followed Profiles
                  </h3>
                  <span className="text-[10px] text-amber-400 font-semibold bg-amber-500/10 px-2 py-0.5 rounded-full border border-amber-500/20">
                    Verified Creators
                  </span>
                </div>

                <div className="space-y-2">
                  {top5Profiles.length === 0 && (
                    <p className="text-xs text-slate-500 text-center py-4">No creators match “{searchQuery}”.</p>
                  )}
                  {top5Profiles.map((user, index) => (
                    <div
                      key={user.id}
                      className="flex items-center justify-between bg-slate-900 border border-slate-800/80 p-3 rounded-2xl hover:border-amber-500/30 transition-all shadow-md group"
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-6 h-6 rounded-lg flex items-center justify-center text-xs font-extrabold shrink-0 ${
                          index === 0 ? 'bg-gradient-to-tr from-amber-400 to-yellow-300 text-slate-950 shadow-md shadow-amber-500/30' :
                          index === 1 ? 'bg-gradient-to-tr from-slate-300 to-slate-100 text-slate-950' :
                          index === 2 ? 'bg-gradient-to-tr from-amber-700 to-amber-600 text-white' :
                          'bg-slate-800 text-slate-400'
                        }`}>
                          {index + 1}
                        </div>

                        <div className="relative">
                          <Img src={user.avatar} alt={user.name} className="w-10 h-10 rounded-full object-cover border border-slate-700" />
                          {user.verified && (
                            <span className="absolute -bottom-1 -right-1 bg-indigo-500 text-white rounded-full p-0.5">
                              <ShieldCheck className="w-2.5 h-2.5" />
                            </span>
                          )}
                        </div>

                        <div>
                          <h4 className="text-xs font-bold text-slate-100 group-hover:text-amber-300 transition-colors">{user.name}</h4>
                          <div className="flex items-center gap-2 text-[10px] text-slate-400">
                            <span>{user.handle}</span>
                            <span>•</span>
                            <span className="text-amber-400 font-bold">{(user.followersCount / 1000).toFixed(1)}k followers</span>
                          </div>
                        </div>
                      </div>

                      <button
                        onClick={() => handleToggleFollow(user.id)}
                        className={`text-xs px-3 py-1.5 rounded-full font-bold flex items-center gap-1 transition-all ${
                          user.isFollowing
                            ? 'bg-slate-800 text-slate-300 border border-slate-700 hover:bg-slate-700'
                            : 'bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 shadow-md shadow-amber-500/20 hover:opacity-95'
                        }`}
                      >
                        {user.isFollowing ? (
                          <span className="flex items-center gap-1">
                            <UserCheck className="w-3.5 h-3.5 text-emerald-400" />
                            <span>Following</span>
                          </span>
                        ) : (
                          <span className="flex items-center gap-1">
                            <UserPlus className="w-3.5 h-3.5" />
                            <span>Follow</span>
                          </span>
                        )}
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Top 5 posts */}
              <div className="space-y-3 pt-2">
                <div className="flex items-center justify-between px-1">
                  <h3 className="text-xs font-bold text-slate-200 uppercase tracking-wider flex items-center gap-1.5">
                    <Eye className="w-4 h-4 text-emerald-400" /> Top 5 Most Viewed Posts
                  </h3>
                  <span className="text-[10px] text-emerald-400 font-semibold bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
                    Highest Engagement
                  </span>
                </div>

                <div className="space-y-3">
                  {top5Posts.length === 0 && (
                    <p className="text-xs text-slate-500 text-center py-4">No posts match “{searchQuery}”.</p>
                  )}
                  {top5Posts.map((post, index) => (
                    <div
                      key={post.id}
                      className="bg-slate-900 border border-slate-800/80 rounded-2xl overflow-hidden shadow-lg hover:border-emerald-500/30 transition-all"
                    >
                      <div className="p-3 flex items-center justify-between border-b border-slate-800/50">
                        <div className="flex items-center gap-2.5">
                          <span className={`w-5 h-5 rounded-md flex items-center justify-center text-[10px] font-extrabold ${
                            index === 0 ? 'bg-amber-400 text-slate-950' : 'bg-slate-800 text-slate-400'
                          }`}>
                            #{index + 1}
                          </span>
                          <Img src={post.avatar} alt={post.author} className="w-8 h-8 rounded-full object-cover" />
                          <div>
                            <h4 className="text-xs font-bold text-slate-100">{post.author}</h4>
                            <span className="text-[10px] text-slate-400">{post.timestamp}</span>
                          </div>
                        </div>

                        <div className="flex items-center gap-1 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-[10px] font-bold px-2.5 py-1 rounded-full">
                          <Eye className="w-3 h-3" />
                          <span>{((post.views || 0) / 1000).toFixed(1)}k Views</span>
                        </div>
                      </div>

                      <div className="p-3">
                        <p className="text-xs text-slate-200 leading-relaxed mb-2.5 line-clamp-2">{post.text}</p>
                        {post.media && (
                          <div className="rounded-xl overflow-hidden border border-slate-800/80 aspect-video relative">
                            <Img src={post.media} alt="Attachment" className="w-full h-full object-cover" />
                            <div className="absolute bottom-2 right-2 bg-slate-950/80 backdrop-blur-md px-2 py-0.5 rounded-full text-[10px] text-slate-200 flex items-center gap-1">
                              <ThumbsUp className="w-3 h-3 text-indigo-400" /> {post.likes.toLocaleString()} likes
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ---------- CHATS & STATUS ---------- */}
          {activeTab === 'chats' && (
            <div className="divide-y divide-slate-800/60 animate-fadeIn">

              <div className="p-3.5 bg-slate-900/50 border-b border-slate-800/80">
                <div className="text-[11px] font-semibold tracking-wider text-slate-400 uppercase mb-2.5 flex items-center justify-between">
                  <span>Status Updates</span>
                  <span className="text-emerald-400 text-[10px] font-normal">Encrypted 🔒</span>
                </div>

                <div className="flex gap-3 overflow-x-auto scrollbar-none pb-1">
                  {stories.map((story) => (
                    <div
                      key={story.id}
                      onClick={() => handleOpenStory(story)}
                      className="flex flex-col items-center gap-1 cursor-pointer min-w-[62px]"
                    >
                      <div className={`p-0.5 rounded-full ${story.isUser ? 'border-2 border-dashed border-slate-600' : story.viewed ? 'border-2 border-slate-700' : 'bg-gradient-to-tr from-emerald-500 to-teal-400 p-[2px]'}`}>
                        <Img
                          src={story.avatar}
                          alt={story.name}
                          className="w-12 h-12 rounded-full object-cover border-2 border-slate-900"
                        />
                      </div>
                      <span className="text-[10px] text-slate-300 truncate w-14 text-center">
                        {story.isUser ? 'My Status' : story.name.split(' ')[0]}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-1">
                <div className="px-3 py-2 flex justify-between items-center text-xs text-slate-400 font-medium">
                  <span>Direct Chats</span>
                  <span className="bg-emerald-500/20 text-emerald-400 text-[10px] px-2 py-0.5 rounded-full font-bold">
                    {totalUnreadChats} New
                  </span>
                </div>

                {filteredChats.length === 0 && (
                  <p className="text-xs text-slate-500 text-center py-6">No chats match “{searchQuery}”.</p>
                )}

                {filteredChats.map((chat) => (
                  <div
                    key={chat.id}
                    onClick={() => openChat(chat)}
                    className="flex items-center gap-3 p-3 rounded-xl hover:bg-slate-800/60 transition-all cursor-pointer active:scale-[0.99] border-b border-slate-900/40"
                  >
                    <div className="relative">
                      <Img src={chat.avatar} alt={chat.name} className="w-12 h-12 rounded-full object-cover" />
                      {chat.online && (
                        <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 border-2 border-slate-900 rounded-full"></span>
                      )}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-baseline mb-1">
                        <h4 className="text-xs font-bold text-slate-100 truncate">{chat.name}</h4>
                        <span className="flex items-center gap-1.5">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleTogglePin(chat.id);
                            }}
                            aria-label={chat.pinned ? 'Unpin chat' : 'Pin chat'}
                            aria-pressed={!!chat.pinned}
                            className={`p-0.5 rounded ${chat.pinned ? 'text-amber-400' : 'text-slate-600 hover:text-slate-300'}`}
                          >
                            <Pin className={`w-3 h-3 ${chat.pinned ? 'fill-amber-400' : ''}`} />
                          </button>
                          <span className="text-[10px] text-slate-400">{chat.time}</span>
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <p className={`text-xs truncate pr-2 ${typingChats[chat.id] ? 'text-emerald-400 italic' : 'text-slate-400'}`}>
                          {typingChats[chat.id] ? 'typing...' : chat.lastMessage}
                        </p>
                        {chat.unread > 0 ? (
                          <span className="bg-emerald-500 text-slate-950 font-extrabold text-[10px] min-w-[18px] h-[18px] rounded-full flex items-center justify-center px-1">
                            {chat.unread}
                          </span>
                        ) : (
                          <CheckCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ---------- FRIENDS FEED ---------- */}
          {activeTab === 'feed' && (
            <div className="p-3 space-y-4 animate-fadeIn">

              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-3 shadow-sm">
                <div className="flex items-center gap-3">
                  <Img src={userProfile.avatar} alt="Me" className="w-9 h-9 rounded-full border border-slate-700" />
                  <button
                    onClick={() => setIsCreatingPost(true)}
                    className="flex-1 bg-slate-800 hover:bg-slate-700/70 text-slate-400 text-xs text-left px-4 py-2.5 rounded-full transition-colors"
                  >
                    What's on your mind, {userProfile.name.split(' ')[0]}?
                  </button>
                </div>
                <div className="flex justify-between border-t border-slate-800/80 mt-3 pt-2 text-slate-400 text-xs">
                  <button onClick={() => setIsCreatingPost(true)} className="flex items-center gap-1.5 hover:text-emerald-400 px-2 py-1">
                    <Camera className="w-4 h-4 text-emerald-400" /> Photo/Video
                  </button>
                  <button onClick={() => setIsCreatingPost(true)} className="flex items-center gap-1.5 hover:text-purple-400 px-2 py-1">
                    <Smile className="w-4 h-4 text-purple-400" /> Feeling/Activity
                  </button>
                  <button onClick={() => setIsCreatingPost(true)} className="flex items-center gap-1.5 hover:text-pink-400 px-2 py-1">
                    <Lock className="w-4 h-4 text-pink-400" /> Friends Only
                  </button>
                </div>
              </div>

              {filteredPosts.length === 0 && (
                <p className="text-xs text-slate-500 text-center py-6">No posts match “{searchQuery}”.</p>
              )}

              {filteredPosts.map((post) => (
                <div key={post.id} className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-lg">

                  <div className="p-3 flex items-center justify-between border-b border-slate-800/40">
                    <div className="flex items-center gap-2.5">
                      <Img src={post.avatar} alt={post.author} className="w-9 h-9 rounded-full object-cover" />
                      <div>
                        <h4 className="text-xs font-bold text-slate-100">{post.author}</h4>
                        <div className="flex items-center gap-1 text-[10px] text-slate-400">
                          <span>{post.timestamp}</span>
                          {post.location && <span>• 📍 {post.location}</span>}
                        </div>
                      </div>
                    </div>
                    <button aria-label="More options" className="text-slate-400 hover:text-slate-200"> <MoreVertical className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="p-3">
                    <p className="text-xs text-slate-200 leading-relaxed mb-3 whitespace-pre-line">{post.text}</p>
                    {post.media && (
                      <div className="rounded-xl overflow-hidden border border-slate-800">
                        <Img src={post.media} alt="Post attachment" className="w-full h-56 object-cover hover:scale-[1.01] transition-transform" />
                      </div>
                    )}
                  </div>

                  <div className="px-3 py-1.5 flex items-center justify-between text-[11px] text-slate-400 border-t border-b border-slate-800/40">
                    <div className="flex items-center gap-1">
                      <span className="w-4 h-4 bg-indigo-500 rounded-full flex items-center justify-center">
                        <ThumbsUp className="w-2.5 h-2.5 text-white" />
                      </span>
                      <span>{post.likes.toLocaleString()} likes</span>
                    </div>
                    <span>{post.comments.length} comments</span>
                  </div>

                  <div className="px-2 py-1 flex justify-around text-xs font-medium text-slate-400">
                    <button
                      onClick={() => handleToggleLikePost(post.id)}
                      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg hover:bg-slate-800 transition-colors ${post.liked ? 'text-indigo-400 font-bold' : ''}`}
                    >
                      <ThumbsUp className="w-4 h-4" />
                      <span>{post.liked ? 'Liked' : 'Like'}</span>
                    </button>
                    <button
                      onClick={() => handleToggleComments(post.id)}
                      aria-expanded={openCommentsPostId === post.id}
                      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg hover:bg-slate-800 transition-colors ${openCommentsPostId === post.id ? 'text-emerald-400 font-bold' : ''}`}
                    >
                      <MessageCircle className="w-4 h-4" />
                      <span>Comment</span>
                    </button>
                    <button
                      onClick={() => handleSharePost(post)}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg hover:bg-slate-800 transition-colors"
                    >
                      <Share2 className="w-4 h-4" />
                      <span>Share</span>
                    </button>
                  </div>

                  {(post.comments.length > 0 || openCommentsPostId === post.id) && ( <div className="bg-slate-950/60 p-3 border-t border-slate-800/40 space-y-2">
                      {post.comments.map(c => (
                        <div key={c.id} className="text-xs bg-slate-900 border border-slate-800/80 rounded-xl p-2">
                          <span className="font-bold text-slate-200 mr-1.5">{c.user}:</span>
                          <span className="text-slate-300">{c.text}</span>
                        </div>
                      ))}
                      {openCommentsPostId === post.id && (
                        <div className="flex items-center gap-2 pt-1">
                          <input
                            type="text"
                            autoFocus
                            value={commentDraft}
                            onChange={(e) => setCommentDraft(e.target.value)}
                            onKeyDown={(e) => {
                              if (e.key === 'Enter') {
                                e.preventDefault();
                                handleAddComment(post.id);
                              }
                            }}
                            placeholder="Write a comment..."
                            aria-label="Write a comment"
                            className="flex-1 bg-slate-800 border border-slate-700/60 rounded-full px-4 py-2 text-xs text-slate-100 placeholder-slate-400 focus:outline-none focus:border-emerald-500"
                          />
                          <button
                            onClick={() => handleAddComment(post.id)}
                            disabled={!commentDraft.trim()}
                            aria-label="Post comment"
                            className="bg-emerald-500 hover:bg-emerald-400 disabled:opacity-40 text-slate-950 p-2 rounded-full transition-colors"
                          >
                            <Send className="w-4 h-4 fill-slate-950" />
                          </button>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* ---------- EXPLORE ---------- */}
          {activeTab === 'explore' && (
            <div className="p-3 space-y-3 animate-fadeIn">

              <div className="flex gap-2 overflow-x-auto scrollbar-none pb-1">
                {EXPLORE_TAGS.map(tag => (
                  <button
                    key={tag}
                    onClick={() => setSelectedTag(tag)}
                    className={`px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap transition-all ${
                      selectedTag === tag
                        ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-md shadow-pink-500/20'
                        : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                    }`}
                  >
                    #{tag}
                  </button>
                ))}
              </div>

              {filteredExplore.length === 0 && (
                <p className="text-xs text-slate-500 text-center py-6">Nothing found. Try another tag or search.</p>
              )}

              <div className="grid grid-cols-2 gap-2">
                {filteredExplore.map((item) => (
                  <div
                    key={item.id}
                    onClick={() => setExploreModalItem(item)}
                    className="relative group rounded-xl overflow-hidden aspect-square bg-slate-800 cursor-pointer border border-slate-800 shadow-sm"
                  >
                    <Img
                      src={item.media}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />

                    {item.type === 'video' && (
                      <div className="absolute top-2 right-2 bg-slate-950/70 p-1 rounded-full backdrop-blur-md">
                        <Video className="w-3.5 h-3.5 text-pink-400" />
                      </div>
                    )}

                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity p-3 flex flex-col justify-end">
                      <span className="text-[10px] font-bold text-pink-400 uppercase tracking-wider mb-0.5">#{item.tag}</span>
                      <h4 className="text-xs font-semibold text-white truncate">{item.title}</h4>
                      <div className="flex items-center gap-3 text-[11px] text-slate-300 mt-1">
                        <span className="flex items-center gap-1"><Heart className="w-3 h-3 text-pink-500 fill-pink-500" /> {item.likes}</span>
                        <span className="flex items-center gap-1"><MessageCircle className="w-3 h-3" /> {item.comments}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ---------- NOTIFICATIONS ---------- */}
          {activeTab === 'notifications' && (
            <div className="p-3.5 space-y-3 animate-fadeIn">

              <div className="flex items-center justify-between pb-1">
                <div>
                  <h3 className="text-xs font-bold text-slate-100 uppercase tracking-wider">Activity & Alerts</h3>
                  <p className="text-[10px] text-slate-400">Real-time engagement from your network</p>
                </div>
                {unreadNotifCount > 0 && (
                  <button
                    onClick={handleMarkAllRead}
                    className="text-[10px] bg-indigo-600/20 text-indigo-300 border border-indigo-500/40 px-2.5 py-1 rounded-full hover:bg-indigo-600/30 font-bold transition-all"
                  >
                    Mark all read
                  </button>
                )}
              </div>

              <div className="flex gap-2">
                {[
                  { id: 'all', label: 'All Alerts' },
                  { id: 'friends_posts', label: 'Friend Posts' },
                  { id: 'alerts', label: 'Follows & Likes' }
                ].map(tab => (
                  <button
                    key={tab.id}
                    onClick={() => setNotifFilter(tab.id)}
                    className={`px-3 py-1 rounded-full text-xs font-medium transition-all ${
                      notifFilter === tab.id
                        ? 'bg-indigo-600 text-white shadow-md shadow-indigo-500/20'
                        : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              <div className="space-y-2 pt-1">
                {filteredNotifications.length === 0 && (
                  <p className="text-xs text-slate-500 text-center py-6">
                    {q ? `No alerts match “${searchQuery}”.` : 'No alerts here yet.'}
                  </p>
                )}
                {filteredNotifications.map((n) => (
                  <div
                    key={n.id}
                    onClick={() => handleMarkNotifRead(n.id)}
                    className={`flex items-start gap-3 p-3 rounded-2xl border transition-all cursor-pointer ${
                      n.read ? 'bg-slate-900/60 border-slate-800/80 text-slate-300' : 'bg-slate-900 border-indigo-500/40 shadow-lg shadow-indigo-500/5 text-slate-100'
                    }`}
                  >
                    <Img src={n.actor.avatar} alt="Actor" className="w-10 h-10 rounded-full object-cover shrink-0 border border-slate-700" />

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-0.5">
                        <h4 className="text-xs font-bold text-slate-100">{n.actor.name}</h4>
                        <span className="text-[10px] text-slate-400">{n.time}</span>
                      </div>
                      <p className="text-xs text-slate-300 leading-relaxed">
                        <span className="text-indigo-400 font-medium">{n.content}</span>
                      </p>
                    </div>

                    {!n.read && (
                      <span className="w-2.5 h-2.5 bg-indigo-500 rounded-full shrink-0 self-center"></span>
                    )}
                  </div>
                ))}
              </div>

              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-3.5 space-y-3 mt-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <BellRing className="w-4 h-4 text-emerald-400" />
                    <h4 className="text-xs font-bold text-slate-200">Friend Post Instant Alerts</h4>
                  </div>
                  <span className="text-[10px] bg-emerald-500/20 text-emerald-400 px-2 py-0.5 rounded-full font-bold">Enabled</span>
                </div>
                <p className="text-[11px] text-slate-400">
                  Receive instant push alerts and live banner toasts the moment your priority friends publish new status updates or timeline photos.
                </p>

                <div className="space-y-2 pt-1 border-t border-slate-800">
                  {users.filter(u => u.isFriend).map(friend => (
                    <div key={friend.id} className="flex items-center justify-between bg-slate-950 p-2.5 rounded-xl">
                      <div className="flex items-center gap-2.5">
                        <Img src={friend.avatar} alt={friend.name} className="w-8 h-8 rounded-full object-cover" />
                        <div>
                          <h5 className="text-xs font-bold text-slate-100">{friend.name}</h5>
                          <span className="text-[10px] text-slate-400">{friend.handle}</span>
                        </div>
                      </div>

                      <button
                        onClick={() => handleToggleNotifyOnPost(friend.id)}
                        className={`text-[10px] px-3 py-1 rounded-full font-bold transition-all ${
                          friend.notifyOnPost
                            ? 'bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/20'
                            : 'bg-slate-800 text-slate-400 hover:text-white'
                        }`}
                      >
                        {friend.notifyOnPost ? 'Alerts ON' : 'Muted'}
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ---------- PROFILE ---------- */}
          {activeTab === 'profile' && (
            <div className="p-4 space-y-4 animate-fadeIn">

              <div className="bg-slate-900 border border-slate-800 rounded-3xl p-4 text-center relative overflow-hidden shadow-xl">
                <div className="absolute top-0 left-0 right-0 h-16 bg-gradient-to-r from-amber-500 via-indigo-600 to-pink-600 opacity-80"></div>

                <div className="relative pt-6">
                  <Img
                    src={userProfile.avatar}
                    alt={userProfile.name}
                    className="w-20 h-20 rounded-full object-cover border-4 border-slate-900 mx-auto shadow-xl"
                  />
                  <h3 className="text-base font-bold text-slate-100 mt-2">{userProfile.name}</h3>
                  <p className="text-xs text-slate-400">{userProfile.handle}</p>

                  <p className="text-xs text-slate-300 mt-2 px-4 leading-relaxed">{userProfile.bio}</p>

                  <button
                    onClick={handleOpenEditProfile}
                    className="mt-3 inline-flex items-center gap-1.5 text-[11px] font-bold bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 px-3 py-1.5 rounded-full transition-colors"
                  >
                    <Pencil className="w-3 h-3" /> Edit profile
                  </button>

                  <div className="flex justify-center gap-2 mt-3 flex-wrap">
                    <span className="flex items-center gap-1 text-[10px] bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 px-2.5 py-1 rounded-full">
                      <Smartphone className="w-3 h-3" /> {userProfile.phone}
                    </span>
                    <span className="flex items-center gap-1 text-[10px] bg-indigo-500/10 border border-indigo-500/30 text-indigo-400 px-2.5 py-1 rounded-full">
                      <Mail className="w-3 h-3" /> Verified Email
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-2 border-t border-slate-800/80 mt-4 pt-3 text-center">
                  <div>
                    <span className="block text-sm font-bold text-slate-100">{myPostsCount}</span>
                    <span className="text-[10px] text-slate-400">Posts</span>
                  </div>
                  <div>
                    <span className="block text-sm font-bold text-slate-100">{followerCount.toLocaleString()}</span>
                    <span className="text-[10px] text-slate-400">Followers</span>
                  </div>
                  <div>
                    <span className="block text-sm font-bold text-slate-100">{followingCount.toLocaleString()}</span>
                    <span className="text-[10px] text-slate-400">Following</span>
                  </div>
                </div>
              </div>

              <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-3.5 space-y-2">
                <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider">Multi-App Sync Hub</h4>
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between text-xs p-2 bg-slate-950 rounded-xl">
                    <span className="flex items-center gap-2 text-emerald-400 font-medium">
                      <MessageSquare className="w-4 h-4" /> WhatsApp Engine
                    </span>
                    <span className="text-[10px] bg-emerald-500/20 text-emerald-400 px-2 py-0.5 rounded-full">Active Sync</span>
                  </div>
                  <div className="flex items-center justify-between text-xs p-2 bg-slate-950 rounded-xl">
                    <span className="flex items-center gap-2 text-indigo-400 font-medium">
                      <Home className="w-4 h-4" /> Facebook Friends Network
                    </span>
                    <span className="text-[10px] bg-indigo-500/20 text-indigo-400 px-2 py-0.5 rounded-full">Connected</span>
                  </div>
                  <div className="flex items-center justify-between text-xs p-2 bg-slate-950 rounded-xl">
                    <span className="flex items-center gap-2 text-pink-400 font-medium">
                      <Compass className="w-4 h-4" /> Instagram Visual Feed
                    </span>
                    <span className="text-[10px] bg-pink-500/20 text-pink-400 px-2 py-0.5 rounded-full">Connected</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </main>

        {/* ---------- OVERLAY: CHAT ROOM ---------- */}
        {selectedChat && (
          <div className="absolute inset-0 bg-slate-950 z-30 flex flex-col animate-slideUp">

            <div className="bg-slate-900 border-b border-slate-800 p-3 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <button
                  onClick={closeChat} aria-label="Back to chats"
                  className="p-1 rounded-full hover:bg-slate-800 text-slate-300"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
                <div
                  onClick={() => setShowContactInfo(true)}
                  className="flex items-center gap-2.5 cursor-pointer hover:opacity-90 transition-opacity"
                >
                  <Img src={selectedChat.avatar} alt={selectedChat.name} className="w-9 h-9 rounded-full object-cover border border-emerald-500/40" />
                  <div>
                    <h4 className="text-xs font-bold text-slate-100 flex items-center gap-1">
                      {selectedChat.name}
                      <LockKeyhole className="w-2.5 h-2.5 text-emerald-400" />
                    </h4>
                    <span className="text-[10px] text-emerald-400 block">
                      {typingChats[selectedChat.id] ? 'typing...' : selectedChat.online ? 'Online' : selectedChat.lastSeen || 'Offline'}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3 text-slate-300">
                <button onClick={() => handleStartCall('video')} aria-label="Start video call" className="hover:text-emerald-400 p-1 rounded-lg hover:bg-slate-800 transition-colors">
                  <Video className="w-4 h-4" />
                </button>
                <button onClick={() => handleStartCall('voice')} aria-label="Start voice call" className="hover:text-emerald-400 p-1 rounded-lg hover:bg-slate-800 transition-colors">
                  <Phone className="w-4 h-4" />
                </button>
                <button onClick={() => setShowContactInfo(!showContactInfo)} aria-label="Contact info" className="hover:text-slate-100 p-1 rounded-lg hover:bg-slate-800 transition-colors">
                  <Info className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:16px_16px] relative">

              <div className="text-center my-2">
                <span className="bg-slate-900/90 border border-emerald-500/30 text-emerald-400 text-[10px] px-3 py-1 rounded-full shadow-sm flex items-center justify-center gap-1 w-fit mx-auto">
                  <LockKeyhole className="w-3 h-3" /> Messages end-to-end encrypted. No one outside can read.
                </span>
              </div>

              {selectedChat.messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${msg.sender === 'me' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    tabIndex={0}
                    aria-haspopup="menu"
                    onPointerDown={() => startLongPress(msg.id)}
                    onPointerUp={cancelLongPress}
                    onPointerLeave={cancelLongPress}
                    onPointerCancel={cancelLongPress}
                    onContextMenu={(e) => {
                      e.preventDefault();
                      setReactionTarget(msg.id);
                    }}
                    onDoubleClick={() => setReactionTarget(msg.id)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') setReactionTarget(msg.id);
                    }}
                    className={`max-w-[80%] rounded-2xl px-3.5 py-2 text-xs shadow-md focus:outline-none focus:ring-1 focus:ring-emerald-400/60 ${
                    msg.sender === 'me'
                      ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-tr-none'
                      : 'bg-slate-800 text-slate-200 border border-slate-700/60 rounded-tl-none'
                  }`}>
                    {msg.media && (
                      <Img src={msg.media} alt="Attachment" className="w-full h-40 object-cover rounded-xl mb-2 border border-slate-700" />
                    )}

                    {msg.isAudio && (
                      <div className="flex items-center gap-2 bg-slate-900/60 p-2 rounded-xl mb-1">
                        <button aria-label="Play voice note" className="w-7 h-7 bg-emerald-500 rounded-full flex items-center justify-center text-slate-950 font-bold">
                          ▶
                        </button>
                        <div className="flex-1 h-1 bg-slate-700 rounded-full overflow-hidden">
                          <div className="w-1/2 h-full bg-emerald-400"></div>
                        </div>
                        <span className="text-[9px] font-mono">{msg.audioDuration}</span>
                      </div>
                    )}

                    {msg.isFile && (
                      <div className="flex items-center gap-2 bg-slate-900/60 p-2 rounded-xl mb-1 border border-slate-700">
                        <FileText className="w-5 h-5 text-emerald-400" />
                        <span className="font-semibold text-xs text-slate-100">Document.pdf</span>
                      </div>
                    )}

                    <p className="leading-relaxed">{msg.text}</p>

                    {msg.reactions && Object.keys(msg.reactions).length > 0 && (
                      <div className="flex flex-wrap gap-1 mt-1.5">
                        {Object.entries(msg.reactions).map(([emoji, count]) => (
                          <button
                            key={emoji}
                            onClick={() => handleReact(selectedChat.id, msg.id, emoji)}
                            aria-label={`${emoji} ${count}`}
                            className={`text-[10px] px-1.5 py-0.5 rounded-full border ${
                              msg.myReaction === emoji ? 'bg-emerald-500/30 border-emerald-400/60' : 'bg-slate-900/60 border-slate-700'
                            }`}
                          >
                            {emoji} {count}
                          </button>
                        ))}
                      </div>
                    )}

                    {reactionTarget === msg.id && (
                      <div role="menu" aria-label="React to message" className="flex items-center gap-1.5 mt-1.5 bg-slate-900/90 border border-slate-700 rounded-full px-2.5 py-1 w-fit">
                        {REACTION_EMOJIS.map(emoji => (
                          <button
                            key={emoji}
                            role="menuitem"
                            onClick={() => handleReact(selectedChat.id, msg.id, emoji)}
                            aria-label={`React ${emoji}`}
                            className="text-sm hover:scale-125 transition-transform"
                          >
                            {emoji}
                          </button>
                        ))}
                        <button onClick={() => setReactionTarget(null)} aria-label="Close reactions" className="text-slate-400 hover:text-white ml-1">
                          <X className="w-3 h-3" />
                        </button>
                      </div>
                    )}

                    <div className="flex items-center justify-end gap-1 text-[9px] text-slate-300/80 mt-1">
                      <span>{msg.time}</span>
                      {msg.sender === 'me' && (
                        msg.status === 'sent'
                          ? <Check className="w-3.5 h-3.5 text-slate-300" aria-label="Sent" />
                          : <CheckCheck
                              className={`w-3.5 h-3.5 ${msg.status === 'read' ? 'text-sky-300' : 'text-slate-300'}`}
                              aria-label={msg.status === 'read' ? 'Read' : 'Delivered'}
                            />
                      )}
                    </div>
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            {showAttachmentMenu && (
              <div className="bg-slate-900 border-t border-slate-800 p-3 flex justify-around items-center animate-fadeIn">
                <button onClick={() => handleSendAttachment('image')} className="flex flex-col items-center gap-1 text-slate-300 hover:text-emerald-400">
                  <div className="p-3 bg-indigo-600/30 rounded-2xl border border-indigo-500/40">
                    <Camera className="w-5 h-5 text-indigo-400" />
                  </div>
                  <span className="text-[10px]">Photo</span>
                </button>
                <button onClick={() => handleSendAttachment('document')} className="flex flex-col items-center gap-1 text-slate-300 hover:text-emerald-400">
                  <div className="p-3 bg-purple-600/30 rounded-2xl border border-purple-500/40">
                    <FileText className="w-5 h-5 text-purple-400" />
                  </div>
                  <span className="text-[10px]">Document</span>
                </button>
                <button onClick={() => handleStartCall('voice')} className="flex flex-col items-center gap-1 text-slate-300 hover:text-emerald-400">
                  <div className="p-3 bg-emerald-600/30 rounded-2xl border border-emerald-500/40">
                    <Phone className="w-5 h-5 text-emerald-400" />
                  </div>
                  <span className="text-[10px]">Audio Call</span>
                </button>
              </div>
            )}

            {isRecordingAudio ? (
              <div className="p-3 bg-slate-900 border-t border-slate-800 flex items-center justify-between animate-fadeIn">
                <div className="flex items-center gap-2 text-pink-400 font-mono text-xs animate-pulse">
                  <Mic className="w-4 h-4" />
                  <span>Recording voice note... {recordTimer}s</span>
                </div>
                <div className="flex items-center gap-2">
                  <button onClick={() => setIsRecordingAudio(false)} className="text-slate-400 hover:text-slate-200 text-xs px-2.5 py-1">
                    Cancel
                  </button>
                  <button
                    onClick={handleStopAndSendAudio}
                    className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold px-3 py-1 rounded-full text-xs"
                  >
                    Send Voice
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSendMessage} className="p-3 bg-slate-900 border-t border-slate-800 flex items-center gap-2">
                <button type="button" aria-label="Emoji" className="text-slate-400 hover:text-slate-200">
                  <Smile className="w-5 h-5" />
                </button>
                <button
                  type="button"
                  onClick={() => setShowAttachmentMenu(!showAttachmentMenu)} aria-label="Attach file"
                  className={`transition-colors ${showAttachmentMenu ? 'text-emerald-400' : 'text-slate-400 hover:text-slate-200'}`}
                >
                  <Paperclip className="w-5 h-5" />
                </button>

                <input
                  type="text"
                  placeholder="Message..."
                  value={newMessageText}
                  onChange={(e) => setNewMessageText(e.target.value)}
                  className="flex-1 bg-slate-800 border border-slate-700/60 rounded-full px-4 py-2 text-xs text-slate-100 placeholder-slate-400 focus:outline-none focus:border-emerald-500"
                />

                {newMessageText.trim() ? (
                  <button
                    type="submit" aria-label="Send message"
                    className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 p-2 rounded-full transition-colors"
                  >
                    <Send className="w-4 h-4 fill-slate-950" />
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={() => setIsRecordingAudio(true)}
                    className="bg-slate-800 hover:bg-slate-700 text-emerald-400 p-2 rounded-full transition-colors"
                    aria-label="Record voice note" title="Record Voice Note"
                  >
                    <Mic className="w-4 h-4" />
                  </button>
                )}
              </form>
            )}

            {/* Contact info drawer */}
            {showContactInfo && (
              <div className="absolute inset-0 bg-slate-950/95 z-40 p-4 overflow-y-auto animate-fadeIn flex flex-col justify-between">
                <div className="space-y-4">
                  <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                    <h3 className="text-xs font-bold text-slate-100 uppercase tracking-wider">Contact Info</h3>
                    <button onClick={() => setShowContactInfo(false)} aria-label="Close contact info" className="text-slate-400 hover:text-white">
                      <X className="w-5 h-5" />
                    </button>
                  </div>

                  <div className="text-center space-y-2">
                    <Img src={selectedChat.avatar} alt={selectedChat.name} className="w-24 h-24 rounded-full object-cover border-4 border-emerald-500/40 mx-auto shadow-xl" />
                    <h3 className="text-base font-bold text-white">{selectedChat.name}</h3>
                    <p className="text-xs text-emerald-400 font-mono">+1 (555) 349-9182 • Verified</p>
                  </div>

                  <div className="bg-slate-900 border border-slate-800 rounded-2xl p-3 space-y-2 text-xs">
                    <div className="flex items-center justify-between">
                      <span className="text-slate-400">Encryption status:</span>
                      <span className="text-emerald-400 font-bold flex items-center gap-1">
                        <LockKeyhole className="w-3 h-3" /> End-to-End
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-400">Disappearing messages:</span>
                      <span className="text-slate-200">Off</span>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <button onClick={() => { setShowContactInfo(false); handleStartCall('voice'); }} className="py-2.5 bg-slate-900 border border-slate-700 text-slate-200 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 hover:bg-slate-800">
                    <Phone className="w-4 h-4 text-emerald-400" /> Audio Call
                  </button>
                  <button onClick={() => { setShowContactInfo(false); handleStartCall('video'); }} className="py-2.5 bg-slate-900 border border-slate-700 text-slate-200 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 hover:bg-slate-800">
                    <Video className="w-4 h-4 text-emerald-400" /> Video Call
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* ---------- OVERLAY: CALL SCREEN ---------- */}
        {activeCall && (
          <div className="absolute inset-0 bg-slate-950 z-50 flex flex-col justify-between p-6 animate-fadeIn">
            <div className="text-center space-y-2 pt-6">
              <span className="text-[10px] uppercase font-bold text-emerald-400 tracking-widest bg-emerald-500/10 border border-emerald-500/30 px-3 py-1 rounded-full">
                {activeCall.type === 'video' ? 'Video Call' : 'Voice Call'}
              </span>
              <h2 className="text-xl font-extrabold text-white">{activeCall.contactName}</h2>
              <p className="text-xs text-slate-400 font-mono">
                {Math.floor(callTimer / 60)}:{(callTimer % 60).toString().padStart(2, '0')} • End-to-end Encrypted
              </p>
            </div>

            <div className="my-auto flex justify-center items-center">
              {activeCall.type === 'video' && isVideoOn ? (
                <div className="w-full h-64 bg-slate-900 rounded-3xl overflow-hidden border-2 border-emerald-500/40 relative shadow-2xl">
                  <Img src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=800&q=80" alt="Video stream" className="w-full h-full object-cover" />
                  <div className="absolute bottom-3 right-3 w-20 h-28 bg-slate-950 rounded-xl border border-slate-700 overflow-hidden shadow-lg">
                    <Img src={userProfile.avatar} alt="Me" className="w-full h-full object-cover" />
                  </div>
                </div>
              ) : (
                <div className="relative">
                  <Img src={activeCall.avatar} alt={activeCall.contactName} className="w-32 h-32 rounded-full object-cover border-4 border-emerald-500/50 shadow-2xl animate-pulse" />
                </div>
              )}
            </div>

            <div className="flex items-center justify-around bg-slate-900/90 backdrop-blur-md border border-slate-800 p-4 rounded-3xl">
              <button
                onClick={() => setIsMuted(!isMuted)} aria-label={isMuted ? 'Unmute microphone' : 'Mute microphone'}
                className={`p-3 rounded-full transition-colors ${isMuted ? 'bg-red-500/20 text-red-400 border border-red-500/40' : 'bg-slate-800 text-slate-200'}`}
              >
                {isMuted ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
              </button>

              {activeCall.type === 'video' && (
                <button
                  onClick={() => setIsVideoOn(!isVideoOn)} aria-label={isVideoOn ? 'Turn camera off' : 'Turn camera on'}
                  className={`p-3 rounded-full transition-colors ${!isVideoOn ? 'bg-red-500/20 text-red-400 border border-red-500/40' : 'bg-slate-800 text-slate-200'}`}
                >
                  {!isVideoOn ? <VideoOff className="w-5 h-5" /> : <Video className="w-5 h-5" />}
                </button>
              )}

              <button
                onClick={handleEndCall}
                className="p-4 bg-red-600 hover:bg-red-500 text-white rounded-full shadow-lg shadow-red-600/30 transition-all"
                aria-label="End call" title="End Call"
              >
                <PhoneOff className="w-6 h-6" />
              </button>
            </div>
          </div>
        )}

        {/* ---------- MODAL: EDIT PROFILE ---------- */}
        {isEditingProfile && profileDraft && (
          <div
            role="dialog"
            aria-modal="true"
            aria-label="Edit profile"
            className="absolute inset-0 bg-slate-950/90 backdrop-blur-md z-40 p-4 flex flex-col justify-center animate-fadeIn"
          >
            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-4 space-y-3">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <h3 className="text-xs font-bold text-slate-100">Edit Profile</h3>
                <button onClick={() => setIsEditingProfile(false)} aria-label="Close edit profile" className="text-slate-400 hover:text-white">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="flex justify-center">
                <Img src={profileDraft.avatar} alt="Avatar preview" className="w-16 h-16 rounded-full object-cover border-2 border-slate-700" />
              </div>

              {[
                { key: 'name', label: 'Name', placeholder: 'Your name' },
                { key: 'handle', label: 'Handle', placeholder: '@your_handle' },
                { key: 'avatar', label: 'Avatar image URL', placeholder: 'https://...' }
              ].map(field => (
                <div key={field.key} className="space-y-1">
                  <label className="text-[10px] text-slate-400 block font-semibold">{field.label}</label>
                  <input
                    type="text"
                    value={profileDraft[field.key]}
                    onChange={(e) => setProfileDraft(prev => ({ ...prev, [field.key]: e.target.value }))}
                    placeholder={field.placeholder}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-100 focus:outline-none focus:border-indigo-500"
                  />
                </div>
              ))}

              <div className="space-y-1">
                <label className="text-[10px] text-slate-400 block font-semibold">Bio</label>
                <textarea
                  rows={3}
                  value={profileDraft.bio}
                  onChange={(e) => setProfileDraft(prev => ({ ...prev, bio: e.target.value }))}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-slate-100 focus:outline-none focus:border-indigo-500 resize-none"
                ></textarea>
              </div>

              <button
                onClick={handleSaveProfile}
                disabled={!profileDraft.name.trim()}
                className="w-full py-2.5 bg-gradient-to-r from-amber-500 via-indigo-600 to-pink-600 disabled:opacity-40 text-white font-bold text-xs rounded-xl shadow-lg hover:opacity-95 transition-opacity"
              >
                Save changes
              </button>
            </div>
          </div>
        )}

        {/* ---------- MODAL: CREATE POST ---------- */}
        {isCreatingPost && (
          <div className="absolute inset-0 bg-slate-950/90 backdrop-blur-md z-40 p-4 flex flex-col justify-between animate-fadeIn">
            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-4 space-y-4">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <h3 className="text-xs font-bold text-slate-100">Create Unified Post</h3>
                <button onClick={() => setIsCreatingPost(false)} aria-label="Close create post" className="text-slate-400 hover:text-white">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <textarea
                placeholder="Share your thoughts across Friends Timeline & Visual Explore..."
                value={newPostText}
                onChange={(e) => setNewPostText(e.target.value)}
                rows={4}
                aria-label="Post text"
                onKeyDown={(e) => {
                  if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
                    e.preventDefault();
                    handleCreatePost();
                  }
                }}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-indigo-500 resize-none"
              ></textarea>

              <div className="space-y-2">
                <label className="text-[10px] text-slate-400 block font-semibold">Image URL Attachment (Optional)</label>
                <input
                  type="text"
                  placeholder="https://images.unsplash.com/..."
                  value={newPostImage}
                  onChange={(e) => setNewPostImage(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-100 focus:outline-none focus:border-indigo-500"
                />
              </div>

              <button
                onClick={handleCreatePost}
                className="w-full py-2.5 bg-gradient-to-r from-amber-500 via-indigo-600 to-pink-600 text-white font-bold text-xs rounded-xl shadow-lg hover:opacity-95 transition-opacity"
              >
                Publish Everywhere ✨ <span className="opacity-70 font-normal">(Ctrl+Enter)</span>
              </button>
            </div>
          </div>
        )}

        {/* ---------- MODAL: EXPLORE ITEM ---------- */}
        {exploreModalItem && (
          <div className="absolute inset-0 bg-slate-950/95 backdrop-blur-md z-40 p-4 flex flex-col justify-center animate-fadeIn">
            <div className="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-2xl relative">
              <button
                onClick={() => setExploreModalItem(null)} aria-label="Close preview"
                className="absolute top-3 right-3 bg-slate-950/80 p-1.5 rounded-full text-white z-10"
              >
                <X className="w-5 h-5" />
              </button>

              <Img src={exploreModalItem.media} alt={exploreModalItem.title} className="w-full h-64 object-cover" />

              <div className="p-4 space-y-2">
                <span className="text-[10px] font-bold text-pink-400 uppercase tracking-wider">#{exploreModalItem.tag}</span>
                <h3 className="text-sm font-bold text-white">{exploreModalItem.title}</h3>

                <div className="flex items-center gap-4 text-xs text-slate-300 pt-2 border-t border-slate-800">
                  <span className="flex items-center gap-1.5"><Heart className="w-4 h-4 text-pink-500 fill-pink-500" /> {exploreModalItem.likes}</span>
                  <span className="flex items-center gap-1.5"><MessageCircle className="w-4 h-4 text-slate-400" /> {exploreModalItem.comments}</span>
                  <span className="flex items-center gap-1.5"><Share2 className="w-4 h-4 text-slate-400" /> Share</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ---------- MODAL: STORY ---------- */}
        {activeStoryModal && (
          <div className="absolute inset-0 bg-slate-950 z-50 flex flex-col justify-between p-4 animate-fadeIn">
            <div className="flex items-center justify-between z-10">
              <div className="flex items-center gap-2">
                <Img src={activeStoryModal.avatar} alt={activeStoryModal.name} className="w-8 h-8 rounded-full border border-white" />
                <span className="text-xs font-bold text-white">{activeStoryModal.name}</span>
              </div>
              <button onClick={() => setActiveStoryModal(null)} aria-label="Close status" className="text-white">
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="my-auto rounded-2xl overflow-hidden max-h-[70vh] border border-slate-800">
              <Img src={activeStoryModal.image} alt="Story" className="w-full h-full object-cover" />
            </div>

            <div className="flex items-center gap-2">
              <input
                type="text"
                value={storyReply}
                onChange={(e) => setStoryReply(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    handleSendStoryReply();
                  }
                }}
                aria-label="Reply to status"
                placeholder={`Reply to ${activeStoryModal.name.split(' ')[0]}...`}
                className="flex-1 bg-slate-900 border border-slate-700 rounded-full px-4 py-2 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-emerald-500"
              />
              <button
                onClick={handleSendStoryReply}
                disabled={!storyReply.trim()}
                aria-label="Send reply"
                className="p-2 bg-emerald-500 disabled:opacity-40 rounded-full text-slate-950"
              >
                <Send className="w-4 h-4 fill-slate-950" />
              </button>
            </div>
          </div>
        )}

        {/* ---------- BOTTOM NAV ---------- */}
        <nav className="bg-slate-900/95 backdrop-blur-md border-t border-slate-800 px-2 py-2 flex justify-around items-center z-20">

          <button
            onClick={() => setActiveTab('trending')}
            className={`flex flex-col items-center gap-1 relative px-2.5 py-1 rounded-xl transition-all ${
              activeTab === 'trending' ? 'text-amber-400 scale-105' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Trophy className="w-5 h-5" />
            <span className="text-[10px] font-medium">Top 5</span>
          </button>

          <button
            onClick={() => setActiveTab('chats')}
            className={`flex flex-col items-center gap-1 relative px-2.5 py-1 rounded-xl transition-all ${
              activeTab === 'chats' ? 'text-emerald-400 scale-105' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <MessageSquare className="w-5 h-5" />
            <span className="text-[10px] font-medium">Chats</span>
            {totalUnreadChats > 0 && (
              <span className="absolute top-0 right-1 w-2 h-2 bg-emerald-500 rounded-full"></span>
            )}
          </button>

          <button
            onClick={() => setActiveTab('feed')}
            className={`flex flex-col items-center gap-1 px-2.5 py-1 rounded-xl transition-all ${
              activeTab === 'feed' ? 'text-indigo-400 scale-105' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Home className="w-5 h-5" />
            <span className="text-[10px] font-medium">Feed</span>
          </button>

          <button
            onClick={() => setActiveTab('notifications')}
            className={`flex flex-col items-center gap-1 relative px-2.5 py-1 rounded-xl transition-all ${
              activeTab === 'notifications' ? 'text-pink-400 scale-105' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Bell className="w-5 h-5" />
            <span className="text-[10px] font-medium">Alerts</span>
            {unreadNotifCount > 0 && (
              <span className="absolute top-0 right-1 w-2 h-2 bg-pink-500 rounded-full"></span>
            )}
          </button>

          <button
            onClick={() => setActiveTab('explore')}
            className={`flex flex-col items-center gap-1 px-2.5 py-1 rounded-xl transition-all ${
              activeTab === 'explore' ? 'text-purple-400 scale-105' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Compass className="w-5 h-5" />
            <span className="text-[10px] font-medium">Explore</span>
          </button>

          <button
            onClick={() => setActiveTab('profile')}
            className={`flex flex-col items-center gap-1 px-2.5 py-1 rounded-xl transition-all ${
              activeTab === 'profile' ? 'text-teal-400 scale-105' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <User className="w-5 h-5" />
            <span className="text-[10px] font-medium">Profile</span>
          </button>

        </nav>

        {infoToast && (
          <div
            role="status"
            className="absolute bottom-20 left-1/2 -translate-x-1/2 bg-slate-800 border border-slate-700 text-slate-100 text-xs px-4 py-2 rounded-full shadow-xl z-[60] animate-fadeIn whitespace-nowrap"
          >
            {infoToast}
          </div>
        )}
      </div>
    </div>
  );
}
