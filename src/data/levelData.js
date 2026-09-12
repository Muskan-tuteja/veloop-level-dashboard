// ============================================
// VELoop Rewards - Level Dashboard Data
// Demo / Frontend State
// ============================================

const STORAGE_KEY = "veloop_level_progress";

const XP_PER_LEVEL = 1000;

const DEFAULT_PROGRESS = {
  currentLevel: 1,
  currentXP: 0,
  totalXP: 0,
  requiredXP: XP_PER_LEVEL,
};

// ============================================
// LEVEL REWARDS
// ============================================

const levelRewards = [
  {
    level: 1,
    primary: {
      type: "VEs",
      amount: 50,
    },
    secondary: {
      type: "Gems",
      amount: 5,
    },
  },

  {
    level: 2,
    primary: {
      type: "VEs",
      amount: 100,
    },
    secondary: {
      type: "Gems",
      amount: 10,
    },
  },

  {
    level: 3,
    primary: {
      type: "VEs",
      amount: 150,
    },
    secondary: {
      type: "Gems",
      amount: 10,
    },
  },

  {
    level: 4,
    primary: {
      type: "VEs",
      amount: 250,
    },
    secondary: {
      type: "Gems",
      amount: 15,
    },
  },

  {
    level: 5,
    primary: {
      type: "VEs",
      amount: 500,
    },
    secondary: {
      type: "Gems",
      amount: 25,
    },
  },

  {
    level: 6,
    primary: {
      type: "VEs",
      amount: 600,
    },
    secondary: {
      type: "Gems",
      amount: 20,
    },
  },

  {
    level: 7,
    primary: {
      type: "VEs",
      amount: 750,
    },
    secondary: {
      type: "Gems",
      amount: 30,
    },
  },
];


// ============================================
// ROADMAP REWARD LABELS
// ============================================

const roadmapRewards = [
  "50 VEs + 5 Gems",
  "100 VEs + 10 Gems",
  "150 VEs + 10 Gems",
  "250 VEs + 15 Gems",
  "500 VEs + 25 Gems",
  "600 VEs + 20 Gems",
  "750 VEs + 30 Gems",
];


// ============================================
// LOAD SAVED PROGRESS
// ============================================

const loadProgress = () => {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);

    if (!saved) {
      return {
        ...DEFAULT_PROGRESS,
      };
    }

    const parsed = JSON.parse(saved);

    const totalXP = Math.max(
      0,
      Number(parsed?.totalXP) || 0
    );

    const currentLevel = calculateLevel(totalXP);

    const currentXP =
      totalXP % XP_PER_LEVEL;

    return {
      ...DEFAULT_PROGRESS,

      ...parsed,

      totalXP,
      currentLevel,
      currentXP,
      requiredXP: XP_PER_LEVEL,
    };
  } catch (error) {
    console.error(
      "Unable to load level progress",
      error
    );

    return {
      ...DEFAULT_PROGRESS,
    };
  }
};


// ============================================
// LEVEL CALCULATION
// ============================================

export const calculateLevel = (totalXP) => {
  const safeXP = Math.max(
    0,
    Number(totalXP) || 0
  );

  return (
    Math.floor(safeXP / XP_PER_LEVEL) + 1
  );
};


// ============================================
// USER LEVEL DATA
// ============================================

export const userLevelData = loadProgress();


// ============================================
// GET NEXT LEVEL REWARD
// ============================================

export const getNextLevelReward = (
  currentLevel = userLevelData.currentLevel
) => {
  const nextLevel = currentLevel + 1;

  const reward = levelRewards.find(
    (item) => item.level === nextLevel
  );

  // If level is beyond configured rewards
  if (!reward) {
    return {
      type: "VEs",
      amount: nextLevel * 100,
      secondary: {
        type: "Gems",
        amount: nextLevel * 5,
      },
    };
  }

  return {
    type: reward.primary.type,
    amount: reward.primary.amount,

    secondary: {
      type: reward.secondary.type,
      amount: reward.secondary.amount,
    },
  };
};


// ============================================
// NEXT LEVEL REWARD
// ============================================

userLevelData.nextLevel =
  userLevelData.currentLevel + 1;

userLevelData.nextLevelReward =
  getNextLevelReward(
    userLevelData.currentLevel
  );


// ============================================
// SAVE PROGRESS
// ============================================

const saveProgress = () => {
  try {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({
        currentLevel:
          userLevelData.currentLevel,

        currentXP:
          userLevelData.currentXP,

        totalXP:
          userLevelData.totalXP,

        requiredXP:
          userLevelData.requiredXP,
      })
    );
  } catch (error) {
    console.error(
      "Unable to save level progress",
      error
    );
  }
};


// ============================================
// UPDATE USER LEVEL STATE
// ============================================

const updateLevelState = () => {
  userLevelData.currentLevel =
    calculateLevel(
      userLevelData.totalXP
    );

  userLevelData.currentXP =
    userLevelData.totalXP %
    XP_PER_LEVEL;

  userLevelData.requiredXP =
    XP_PER_LEVEL;

  userLevelData.nextLevel =
    userLevelData.currentLevel + 1;

  userLevelData.nextLevelReward =
    getNextLevelReward(
      userLevelData.currentLevel
    );
};


// ============================================
// ADD XP
// ============================================

export const addXP = (xpAmount) => {
  const amount = Math.max(
    0,
    Number(xpAmount) || 0
  );

  const oldLevel =
    userLevelData.currentLevel;

  userLevelData.totalXP += amount;

  updateLevelState();

  saveProgress();

  return {
    ...userLevelData,

    leveledUp:
      userLevelData.currentLevel >
      oldLevel,
  };
};


// ============================================
// RESET PROGRESS
// ============================================

export const resetLevelProgress = () => {
  Object.assign(
    userLevelData,
    {
      ...DEFAULT_PROGRESS,

      nextLevel: 2,

      nextLevelReward:
        getNextLevelReward(1),
    }
  );

  saveProgress();

  return {
    ...userLevelData,
  };
};


// ============================================
// XP REMAINING
// ============================================

export const getXPRemaining = () => {
  return Math.max(
    0,
    userLevelData.requiredXP -
      userLevelData.currentXP
  );
};


// ============================================
// LEVEL ROADMAP
// ============================================

export const getLevelRoadmap = (
  currentLevel = userLevelData.currentLevel
) => {
  return roadmapRewards.map(
    (reward, index) => {
      const level = index + 1;

      let status = "locked";

      if (level < currentLevel) {
        status = "completed";
      } else if (level === currentLevel) {
        status = "current";
      }

      return {
        level,
        status,
        reward,
      };
    }
  );
};


// ============================================
// TODAY'S BOOST
// ============================================

export const todaysBoost = {
  xpEarned: 215,
  tasksDone: "4/8",
  streakDays: 7,
};


// ============================================
// EARNING FEATURES
// ============================================

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


// ============================================
// RECENT XP ACTIVITY
// ============================================

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


// ============================================
// TODAY'S SUMMARY
// ============================================

export const todaysSummary = {
  totalXP: 215,
  totalVEs: 35,
};


// ============================================
// GAME CONFIG
// ============================================

export const gameConfig = {
  name: "XP Catcher",

  description:
    "Catch XP orbs & coins. Score high for better rewards!",

  durationSeconds: 20,

  rewardPerCatch: 10,

  bestScoreRewardVEs: 12,
};


// ============================================
// INITIAL ROADMAP
// ============================================

export const levelRoadmap =
  getLevelRoadmap(
    userLevelData.currentLevel
  );