import { motion } from "framer-motion";
import { Menu, Bell, Zap, ListChecks, Flame, ChevronRight, Play, ClipboardList, Users, Gamepad2, Magnet } from "lucide-react";
import styles from "./DashboardHome.module.css";
import LevelRoadmap from "../../components/LevelRoadmap/LevelRoadmap";
import NextLevelReward from "../../components/NextLevelReward/NextLevelReward";
import {
  userLevelData,
  getXPRemaining,
  todaysBoost,
  earningFeatures,
} from "../../data/levelData";

const iconMap = {
  play: Play,
  clipboard: ClipboardList,
  users: Users,
  gamepad: Gamepad2,
  flame: Flame,
  magnet: Magnet,
};

function DashboardHome({ onPlayGame, onEarnMore, onViewActivity, onSimulateLevelUp, onRewards, onWallet, onProfile }) {
  const { currentLevel, currentXP, requiredXP } = userLevelData;
  const xpRemaining = getXPRemaining();
  const progressPercent = Math.min(100, Math.round((currentXP / requiredXP) * 100));

  return (
    <div className={styles.page}>
      {/* Top bar */}
      <div className={styles.topbar}>
        <button className={styles.iconBtn}>
          <Menu size={18} />
        </button>
        <button className={styles.iconBtn} onClick={onViewActivity}>
          <Bell size={18} />
          <span className={styles.notifDot}></span>
        </button>
      </div>

      {/* Greeting */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className={styles.greeting}
      >
        <h4>Good Morning, VeLooper 👋</h4>
        <p>Level up your journey and unlock epic rewards every day.</p>
      </motion.div>

      {/* Level Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.1, duration: 0.4 }}
        className={styles.levelCard}
      >
        <div className={styles.hexBadge}>
          <svg viewBox="0 0 100 100">
            <polygon
              points="50,3 93,26 93,74 50,97 7,74 7,26"
              fill="url(#hexGrad)"
            />
            <defs>
              <linearGradient id="hexGrad" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#facc15" />
                <stop offset="100%" stopColor="#f59e0b" />
              </linearGradient>
            </defs>
          </svg>
          <div className={styles.hexBadgeContent}>
            <div className={styles.lvlLabel}>LEVEL</div>
            <div className={styles.lvlNum}>{String(currentLevel).padStart(2, "0")}</div>
          </div>
        </div>

        <div className={styles.levelInfo}>
          <div className={styles.xpRow}>
            <span className={styles.xpValue}>{currentXP.toLocaleString()} XP</span>
            <span className={styles.xpToNext}>to reach Level {String(currentLevel + 1).padStart(2, "0")}</span>
          </div>
          <div className={styles.progressTrack}>
            <motion.div
              className={styles.progressFill}
              initial={{ width: 0 }}
              animate={{ width: `${progressPercent}%` }}
              transition={{ delay: 0.3, duration: 0.9, ease: "easeOut" }}
            />
          </div>
          <div className={styles.progressLabel}>
            {currentXP.toLocaleString()} / {requiredXP.toLocaleString()} XP
          </div>
        </div>
      </motion.div>
      <NextLevelReward />

      {/* Today's Boost */}
      <div className={styles.section}>
        <div className={styles.sectionTitleRow}>
          <Zap size={14} color="#facc15" />
          <span className={styles.sectionTitle}>Today's Boost</span>
        </div>
        <div className={styles.boostGrid}>
          <div className={styles.boostCard}>
            <div className={styles.boostIcon} style={{ background: "rgba(250,204,21,0.15)" }}>
              <Zap size={16} color="#facc15" />
            </div>
            <div className={styles.boostValue}>{todaysBoost.xpEarned} XP</div>
            <div className={styles.boostLabel}>XP Earned</div>
          </div>
          <div className={styles.boostCard}>
            <div className={styles.boostIcon} style={{ background: "rgba(139,92,246,0.15)" }}>
              <ListChecks size={16} color="#a78bfa" />
            </div>
            <div className={styles.boostValue}>{todaysBoost.tasksDone}</div>
            <div className={styles.boostLabel}>Tasks Done</div>
          </div>
          <div className={styles.boostCard}>
            <div className={styles.boostIcon} style={{ background: "rgba(249,115,22,0.15)" }}>
              <Flame size={16} color="#fb923c" />
            </div>
            <div className={styles.boostValue}>{todaysBoost.streakDays} Days</div>
            <div className={styles.boostLabel}>Streak</div>
          </div>
        </div>
      </div>
      <LevelRoadmap />

      {/* Earn More */}
      <div className={styles.section}>
        <div className={styles.earnHeader}>
          <div>
            <h6>Earn More</h6>
            <p>Explore fun activities and earn exciting rewards.</p>
          </div>
          <button className={styles.arrowBtn} onClick={onEarnMore}>
            <ChevronRight size={18} />
          </button>
        </div>

        <div className={styles.earnGrid}>
          {earningFeatures.map((feature, i) => {
            const Icon = iconMap[feature.icon] || Play;
            const colors = ["#a78bfa", "#34d399", "#fb923c", "#60a5fa", "#f87171", "#38bdf8"];
            const onClick = feature.id === "mini-games" || feature.id === "xp-catcher" ? onPlayGame : onEarnMore;
            return (
              <motion.div
                key={feature.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 + i * 0.05, duration: 0.3 }}
                className={styles.earnCard}
                onClick={onClick}
              >
                <div className={styles.earnCardIcon} style={{ background: colors[i % colors.length] }}>
                  <Icon size={16} />
                </div>
                <div className={styles.earnCardLabel}>{feature.title}</div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Level Rewards Chest */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.4 }}
        className={styles.chestCard}
      >
        <div className={styles.chestText}>
          <h6>Level {String(currentLevel).padStart(2, "0")} Rewards</h6>
          <p>Amazing rewards await you! {xpRemaining.toLocaleString()} XP to go.</p>
          <button className={styles.chestBtn} onClick={onSimulateLevelUp}>
            View Rewards
          </button>
        </div>
        <div style={{ fontSize: 40 }}>🎁</div>
      </motion.div>

      {/* Bottom Nav */}
      <div className={styles.bottomNav}>
  <button className={`${styles.navItem} ${styles.active}`}>
    <span>🏠</span>
    Home
  </button>
  <button className={styles.navItem} onClick={onEarnMore}>
    <span>💰</span>
    Earn
  </button>
  <button className={styles.navItem} onClick={onRewards}>
    <span>🏆</span>
    Rewards
  </button>
  <button className={styles.navItem} onClick={onWallet}>
    <span>👛</span>
    Wallet
  </button>
  <button className={styles.navItem} onClick={onProfile}>
    <span>👤</span>
    Profile
  </button>
</div>
    </div>
  );
}

export default DashboardHome;
