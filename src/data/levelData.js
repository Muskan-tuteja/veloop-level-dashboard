// ============================================
// VELoop Rewards - Level Dashboard Dummy Data
// These are DEVELOPMENT/DEMO values only.
// Structure is designed so backend data can replace these easily.
// ============================================

export const userLevelData = {
  currentLevel: 1,
  currentXP: 0,
  requiredXP: 1000, // apna hisaab se set karo
  nextLevel: 2,
  nextLevelReward: {
    type: "VEs",
    amount: 50,
    secondary: { type: "Gems", amount: 5 },
  },
};

// XP needed remaining (helper - can also be calculated on the fly)
export const getXPRemaining = () =>
  userLevelData.requiredXP - userLevelData.currentXP;

// Level roadmap - shows past, current, and future levels
export const levelRoadmap = [
  { level: 1, status: "current", reward: "50 VEs" },
  { level: 2, status: "locked", reward: "100 VEs" },
  { level: 3, status: "locked", reward: "10 Gems" },
  { level: 4, status: "locked", reward: "150 VEs" },
  { level: 5, status: "locked", reward: "500 VEs + 25 Gems" },
  { level: 6, status: "locked", reward: "600 VEs" },
  { level: 7, status: "locked", reward: "20 Gems" },
];

// Today's boost stats (shown on dashboard home)
export const todaysBoost = {
  xpEarned: 215,
  tasksDone: "4/8",
  streakDays: 7,
};

// Earning feature cards
export const earningFeatures = [
  {
    id: "watch-earn",
    title: "Watch & Earn",
    description: "Watch ads and earn",
    xpReward: 50,
    icon: "play",
    comingSoon: false,
  },
  {
    id: "daily-missions",
    title: "Daily Missions",
    description: "Complete daily tasks",
    xpReward: 30,
    icon: "clipboard",
    comingSoon: false,
  },
  {
    id: "refer-earn",
    title: "Refer & Earn",
    description: "Invite friends & earn",
    xpReward: 100,
    icon: "users",
    comingSoon: false,
  },
 
  {
    id: "streak-bonus",
    title: "Streak Bonus",
    description: "Maintain your streak",
    xpReward: 25,
    icon: "flame",
    comingSoon: false,
  },
  {
    id: "xp-catcher",
    title: "XP Catcher",
    description: "Catch orbs & coins",
    xpReward: 10,
    icon: "magnet",
    comingSoon: false,
  },
];

// Recent XP activity log
export const xpActivity = [
  {
    id: 1,
    type: "referral",
    label: "Referral Bonus",
    xp: 20,
    time: "Today, 10:45 AM",
  },
  {
    id: 2,
    type: "daily-mission",
    label: "Daily Mission Completed",
    xp: 50,
    time: "Today, 09:12 AM",
  },
  
  {
    id: 4,
    type: "xp-catcher",
    label: "XP Catcher Reward",
    xp: 10,
    ve: 10,
    time: "Today, 07:50 AM",
  },
  {
    id: 5,
    type: "streak",
    label: "Streak Bonus",
    xp: 25,
    time: "Today, 07:20 AM",
  },
];

// Today's summary totals
export const todaysSummary = {
  totalXP: 215,
  totalVEs: 35,
};

// Game configuration (XP Catcher mini-game)
export const gameConfig = {
  name: "XP Catcher",
  description: "Catch XP orbs & coins. Score high for better rewards!",
  durationSeconds: 20,
  rewardPerCatch: 10, // XP per item caught (demo value)
  bestScoreRewardVEs: 12,
};