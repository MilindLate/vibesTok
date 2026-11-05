// ============================================================
//  VibesTok — Mock Data
// ============================================================

export const mockUsers = [
  {
    id: "u1",
    username: "dance_queen_ava",
    displayName: "Ava Martinez",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Ava",
    bio: "Dancing through life 💃 | 2M followers",
    followers: 2100000,
    following: 342,
    likes: 45000000,
    verified: true,
  },
  {
    id: "u2",
    username: "comedy_king_jay",
    displayName: "Jay Thompson",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Jay",
    bio: "Making you laugh one vibe at a time 😂",
    followers: 890000,
    following: 210,
    likes: 12000000,
    verified: false,
  },
  {
    id: "u3",
    username: "foodie_priya",
    displayName: "Priya Sharma",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Priya",
    bio: "🍜 Food & Travel | Mumbai → World 🌏",
    followers: 1500000,
    following: 560,
    likes: 28000000,
    verified: true,
  },
  {
    id: "u4",
    username: "tech_bro_max",
    displayName: "Max Chen",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Max",
    bio: "Gadgets, code & chaos ⚡️",
    followers: 430000,
    following: 120,
    likes: 6500000,
    verified: false,
  },
  {
    id: "u5",
    username: "fitness_sara",
    displayName: "Sara Wilson",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sara",
    bio: "Your daily fitness motivation 💪🔥",
    followers: 3200000,
    following: 890,
    likes: 78000000,
    verified: true,
  },
  {
    id: "u6",
    username: "travel_leo",
    displayName: "Leo Kim",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Leo",
    bio: "60 countries, 0 regrets 🌍",
    followers: 920000,
    following: 455,
    likes: 14000000,
    verified: false,
  },
];

export const mockVideos = [
  {
    id: "v1",
    userId: "u1",
    videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
    thumbnail: "https://picsum.photos/seed/dance1/400/700",
    caption: "This dance challenge is EVERYTHING 🔥 #VibesTok #DanceChallenge",
    sound: "Original Sound - Ava Martinez",
    soundCover: "https://api.dicebear.com/7.x/avataaars/svg?seed=AvaDisc",
    likes: 482000,
    comments: 12400,
    shares: 8900,
    saves: 34000,
    duration: 15,
    tags: ["DanceChallenge", "VibesTok", "Trending"],
    createdAt: "2026-10-30T10:00:00Z",
  },
  {
    id: "v2",
    userId: "u2",
    videoUrl: "https://www.w3schools.com/html/movie.mp4",
    thumbnail: "https://picsum.photos/seed/comedy2/400/700",
    caption: "POV: Monday morning at the office 😭 #Comedy #Relatable",
    sound: "Trending Audio 2026",
    soundCover: "https://api.dicebear.com/7.x/avataaars/svg?seed=JayDisc",
    likes: 1200000,
    comments: 45000,
    shares: 120000,
    saves: 89000,
    duration: 30,
    tags: ["Comedy", "Relatable", "OfficeLife"],
    createdAt: "2026-10-31T14:00:00Z",
  },
  {
    id: "v3",
    userId: "u3",
    videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
    thumbnail: "https://picsum.photos/seed/food3/400/700",
    caption: "Making butter chicken from scratch in 60 seconds! 🍛 #Foodie #CookingHacks",
    sound: "Desi Beats Vol. 3",
    soundCover: "https://api.dicebear.com/7.x/avataaars/svg?seed=PriyaDisc",
    likes: 3400000,
    comments: 78000,
    shares: 245000,
    saves: 180000,
    duration: 60,
    tags: ["Foodie", "CookingHacks", "Indian"],
    createdAt: "2026-11-01T08:00:00Z",
  },
  {
    id: "v4",
    userId: "u4",
    videoUrl: "https://www.w3schools.com/html/movie.mp4",
    thumbnail: "https://picsum.photos/seed/tech4/400/700",
    caption: "Coding a full app in 10 minutes with AI 🤖 #Tech #Coding",
    sound: "Lo-Fi Chill Beats",
    soundCover: "https://api.dicebear.com/7.x/avataaars/svg?seed=MaxDisc",
    likes: 567000,
    comments: 24000,
    shares: 43000,
    saves: 95000,
    duration: 45,
    tags: ["Tech", "Coding", "AI"],
    createdAt: "2026-11-02T16:00:00Z",
  },
  {
    id: "v5",
    userId: "u5",
    videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
    thumbnail: "https://picsum.photos/seed/fitness5/400/700",
    caption: "5 minute morning workout that will change your life! 💪 #Fitness",
    sound: "Workout Anthem 2026",
    soundCover: "https://api.dicebear.com/7.x/avataaars/svg?seed=SaraDisc",
    likes: 8900000,
    comments: 120000,
    shares: 540000,
    saves: 670000,
    duration: 60,
    tags: ["Fitness", "MorningWorkout", "Motivation"],
    createdAt: "2026-11-03T06:00:00Z",
  },
  {
    id: "v6",
    userId: "u6",
    videoUrl: "https://www.w3schools.com/html/movie.mp4",
    thumbnail: "https://picsum.photos/seed/travel6/400/700",
    caption: "Hidden beach in Maldives nobody talks about 🏖️ #Travel #Maldives",
    sound: "Ocean Sounds Mix",
    soundCover: "https://api.dicebear.com/7.x/avataaars/svg?seed=LeoDisc",
    likes: 2100000,
    comments: 56000,
    shares: 98000,
    saves: 210000,
    duration: 28,
    tags: ["Travel", "Maldives", "HiddenGems"],
    createdAt: "2026-11-03T10:00:00Z",
  },
  {
    id: "v7",
    userId: "u1",
    videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
    thumbnail: "https://picsum.photos/seed/dance7/400/700",
    caption: "New trend just dropped! Who's trying this? 🌊 #NewTrend #VibesTok",
    sound: "Summer Vibes 2026",
    soundCover: "https://api.dicebear.com/7.x/avataaars/svg?seed=Ava2Disc",
    likes: 920000,
    comments: 31000,
    shares: 67000,
    saves: 45000,
    duration: 20,
    tags: ["NewTrend", "VibesTok", "Summer"],
    createdAt: "2026-11-03T12:00:00Z",
  },
];

export const mockComments = {
  v1: [
    { id: "c1", userId: "u2", text: "This is absolutely insane!! 🔥🔥", likes: 12400, createdAt: "2026-10-30T11:00:00Z" },
    { id: "c2", userId: "u3", text: "I tried this and fell 😂", likes: 8900, createdAt: "2026-10-30T12:00:00Z" },
    { id: "c3", userId: "u5", text: "Teaching this in my next class!", likes: 5400, createdAt: "2026-10-30T13:00:00Z" },
    { id: "c4", userId: "u6", text: "Literally 10/10 🌟", likes: 3200, createdAt: "2026-10-30T14:00:00Z" },
  ],
  v2: [
    { id: "c5", userId: "u1", text: "Too real 😭😭😭", likes: 45000, createdAt: "2026-10-31T15:00:00Z" },
    { id: "c6", userId: "u4", text: "Every single Monday bro", likes: 23000, createdAt: "2026-10-31T16:00:00Z" },
    { id: "c7", userId: "u5", text: "I felt this in my soul 💀", likes: 18000, createdAt: "2026-10-31T17:00:00Z" },
  ],
  v3: [
    { id: "c8", userId: "u1", text: "Making this tonight!", likes: 34000, createdAt: "2026-11-01T09:00:00Z" },
    { id: "c9", userId: "u2", text: "Smells through the screen 🍛", likes: 21000, createdAt: "2026-11-01T10:00:00Z" },
  ],
  v5: [
    { id: "c10", userId: "u3", text: "Day 1 done! Thanks Sara 💪", likes: 56000, createdAt: "2026-11-03T07:00:00Z" },
    { id: "c11", userId: "u4", text: "Did this and my legs gave out 😅", likes: 43000, createdAt: "2026-11-03T08:00:00Z" },
  ],
};

export const trendingHashtags = [
  { tag: "VibesTok",       count: "2.4B", emoji: "⚡" },
  { tag: "DanceChallenge", count: "1.8B", emoji: "💃" },
  { tag: "FoodTok",        count: "1.2B", emoji: "🍜" },
  { tag: "CodingLife",     count: "890M", emoji: "💻" },
  { tag: "FitnessTok",     count: "760M", emoji: "💪" },
  { tag: "TravelVibes",    count: "640M", emoji: "✈️" },
  { tag: "PetTok",         count: "520M", emoji: "🐾" },
  { tag: "ComedyGold",     count: "480M", emoji: "😂" },
];

export const messages = [
  { id: "m1", from: "u2", preview: "Bro that dance was 🔥🔥", time: "2m ago", unread: true },
  { id: "m2", from: "u3", preview: "Can you share the recipe?", time: "1h ago", unread: true },
  { id: "m3", from: "u5", preview: "Let's collab on a workout!", time: "3h ago", unread: false },
  { id: "m4", from: "u6", preview: "Which beach was that?!", time: "5h ago", unread: false },
];

export const formatNumber = (n) => {
  if (n >= 1_000_000_000) return (n / 1_000_000_000).toFixed(1) + "B";
  if (n >= 1_000_000)     return (n / 1_000_000).toFixed(1) + "M";
  if (n >= 1_000)         return (n / 1_000).toFixed(1) + "K";
  return n.toString();
};

export const timeAgo = (iso) => {
  const diff = Date.now() - new Date(iso).getTime();
  const m = Math.floor(diff / 60000);
  if (m < 1)  return "just now";
  if (m < 60) return `${m}m ago`;
  const h = Math.floor(m / 60);
  if (h < 24) return `${h}h ago`;
  return `${Math.floor(h / 24)}d ago`;
};
