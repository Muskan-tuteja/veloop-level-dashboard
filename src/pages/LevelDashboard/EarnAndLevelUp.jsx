import { motion } from "framer-motion";
import {
  ArrowLeft,
  Play,
  ClipboardList,
  Users,
  Gamepad2,
  Flame,
  Magnet,
  ChevronRight,
  Zap,
  Lock,
  Sparkles,
} from "lucide-react";

import styles from "./EarnAndLevelUp.module.css";
import { earningFeatures } from "../../data/levelData";

const iconMap = {
  play: Play,
  clipboard: ClipboardList,
  users: Users,
  gamepad: Gamepad2,
  flame: Flame,
  magnet: Magnet,
};

const iconColors = {
  play: "#a78bfa",
  clipboard: "#34d399",
  users: "#fb923c",
  gamepad: "#60a5fa",
  flame: "#f87171",
  magnet: "#38bdf8",
};

const actionMap = {
  "watch-earn": "Start",
  "daily-missions": "View",
  referral: "Invite",
  "mini-games": "Play",
  "streak-bonus": "View",
  "xp-catcher": "Play",
};

function EarnAndLevelUp({ onBack, onPlayGame }) {
  const handleCardClick = (feature) => {
    if (feature.comingSoon) return;

    if (
      feature.id === "mini-games" ||
      feature.id === "xp-catcher"
    ) {
      onPlayGame();
    }
  };

  const totalActivities = earningFeatures.length;
  const availableActivities = earningFeatures.filter(
    (feature) => !feature.comingSoon
  ).length;

  return (
    <div className={styles.page}>
      {/* Header */}
      <header className={styles.topbar}>
        <button
          className={styles.backBtn}
          onClick={onBack}
          aria-label="Go back"
        >
          <ArrowLeft size={18} />
        </button>

        <div className={styles.headerText}>
          <span className={styles.eyebrow}>
            LEVEL UP YOUR JOURNEY
          </span>

          <h1>Earn & Level Up</h1>

          <p>
            Complete activities, earn XP and unlock amazing rewards.
          </p>
        </div>
      </header>

      {/* XP Motivation Card */}
      <motion.section
        className={styles.progressCard}
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <div className={styles.progressGlow} />

        <div className={styles.progressTop}>
          <div className={styles.xpIcon}>
            <Zap size={19} />
          </div>

          <div className={styles.progressInfo}>
            <span>KEEP GOING</span>
            <strong>Earn XP. Reach the next level.</strong>
          </div>

          <Sparkles
            size={18}
            className={styles.sparkle}
          />
        </div>

        <div className={styles.progressStats}>
          <div>
            <strong>{availableActivities}</strong>
            <span>Activities available</span>
          </div>

          <div className={styles.progressDivider} />

          <div>
            <strong>{totalActivities}</strong>
            <span>Total activities</span>
          </div>
        </div>
      </motion.section>

      {/* Section Heading */}
      <div className={styles.sectionHeader}>
        <div>
          <span className={styles.sectionEyebrow}>
            EARN XP
          </span>

          <h2>Choose an activity</h2>
        </div>

        <div className={styles.activityCount}>
          {availableActivities}/{totalActivities}
        </div>
      </div>

      {/* Activity Cards */}
      <div className={styles.list}>
        {earningFeatures.map((feature, i) => {
          const Icon = iconMap[feature.icon] || Play;
          const color = iconColors[feature.icon] || "#a78bfa";
          const action = actionMap[feature.id] || "Start";

          return (
            <motion.button
              type="button"
              key={feature.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: i * 0.06,
                duration: 0.3,
              }}
              className={`${styles.card} ${
                feature.comingSoon ? styles.disabledCard : ""
              }`}
              onClick={() => handleCardClick(feature)}
              disabled={feature.comingSoon}
            >
              {/* Icon */}
              <div
                className={styles.cardIcon}
                style={{
                  background: `${color}18`,
                  color: color,
                  borderColor: `${color}30`,
                }}
              >
                <Icon size={21} />
              </div>

              {/* Content */}
              <div className={styles.cardBody}>
                <div className={styles.titleRow}>
                  <p className={styles.cardTitle}>
                    {feature.title}
                  </p>

                  {!feature.comingSoon && (
                    <span className={styles.xpBadge}>
                      +{feature.xpReward} XP
                    </span>
                  )}
                </div>

                <p className={styles.cardDesc}>
                  {feature.description}
                </p>

                <div className={styles.cardBottom}>
                  {feature.comingSoon ? (
                    <span className={styles.comingSoon}>
                      <Lock size={11} />
                      Coming soon
                    </span>
                  ) : (
                    <span className={styles.actionText}>
                      {action}
                      <ChevronRight size={13} />
                    </span>
                  )}
                </div>
              </div>

              {/* Arrow / Lock */}
              <div className={styles.cardAction}>
                {feature.comingSoon ? (
                  <Lock size={14} />
                ) : (
                  <ChevronRight size={17} />
                )}
              </div>
            </motion.button>
          );
        })}
      </div>

      {/* Bottom Motivation */}
      <motion.div
        className={styles.footer}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <div className={styles.footerIcon}>
          🔥
        </div>

        <div>
          <strong>Keep your momentum!</strong>
          <span>
            Every activity gets you closer to your next reward.
          </span>
        </div>
      </motion.div>
    </div>
  );
}

export default EarnAndLevelUp;