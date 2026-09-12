import { motion } from "framer-motion";
import {
  ArrowLeft,
  Play,
  ClipboardList,
  Users,
  Flame,
  Magnet,
  ChevronRight,
  Zap,
  Sparkles,
} from "lucide-react";

import styles from "./EarnAndLevelUp.module.css";
import { earningFeatures } from "../../data/levelData";

const iconMap = {
  play: Play,
  clipboard: ClipboardList,
  users: Users,
  flame: Flame,
  magnet: Magnet,
};

const iconColors = {
  play: "#a78bfa",
  clipboard: "#34d399",
  users: "#fb923c",
  flame: "#f87171",
  magnet: "#38bdf8",
};

const actionMap = {
  "watch-earn": "Start",
  "daily-missions": "View",
  "refer-earn": "Invite",
  "streak-bonus": "View",
  "xp-catcher": "Play",
};

function EarnAndLevelUp({ onBack, onPlayGame }) {
  // ============================================
  // HANDLE ACTIVITY CLICK
  // ============================================

  const handleCardClick = (feature) => {
    // XP Catcher is the actual game
    if (feature.id === "xp-catcher") {
      if (typeof onPlayGame === "function") {
        onPlayGame();
      }

      return;
    }

    // Other activities are currently UI-only
    console.log(`${feature.title} clicked`);
  };

  // ============================================
  // ACTIVITY COUNTS
  // ============================================

  const totalActivities = earningFeatures.length;

  const availableActivities = earningFeatures.length;

  return (
    <div className={styles.page}>
      {/* ========================================
          HEADER
      ======================================== */}

      <header className={styles.topbar}>
        <button
          type="button"
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

      {/* ========================================
          XP MOTIVATION CARD
      ======================================== */}

      <motion.section
        className={styles.progressCard}
        initial={{
          opacity: 0,
          y: 12,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          duration: 0.4,
        }}
      >
        <div className={styles.progressGlow} />

        <div className={styles.progressTop}>
          <div className={styles.xpIcon}>
            <Zap size={19} />
          </div>

          <div className={styles.progressInfo}>
            <span>KEEP GOING</span>

            <strong>
              Earn XP. Reach the next level.
            </strong>
          </div>

          <Sparkles
            size={18}
            className={styles.sparkle}
          />
        </div>

        <div className={styles.progressStats}>
          <div>
            <strong>
              {availableActivities}
            </strong>

            <span>
              Activities available
            </span>
          </div>

          <div
            className={
              styles.progressDivider
            }
          />

          <div>
            <strong>
              {totalActivities}
            </strong>

            <span>
              Total activities
            </span>
          </div>
        </div>
      </motion.section>

      {/* ========================================
          SECTION HEADER
      ======================================== */}

      <div className={styles.sectionHeader}>
        <div>
          <span
            className={
              styles.sectionEyebrow
            }
          >
            EARN XP
          </span>

          <h2>
            Choose an activity
          </h2>
        </div>

        <div
          className={
            styles.activityCount
          }
        >
          {availableActivities}/
          {totalActivities}
        </div>
      </div>

      {/* ========================================
          ACTIVITY LIST
      ======================================== */}

      <div className={styles.list}>
        {earningFeatures.map(
          (feature, index) => {
            const Icon =
              iconMap[feature.icon] ||
              Play;

            const color =
              iconColors[
                feature.icon
              ] || "#a78bfa";

            const action =
              actionMap[
                feature.id
              ] || "Start";

            return (
              <motion.button
                type="button"
                key={feature.id}
                initial={{
                  opacity: 0,
                  y: 12,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                transition={{
                  delay:
                    index * 0.06,
                  duration: 0.3,
                }}
                className={
                  styles.card
                }
                onClick={() =>
                  handleCardClick(
                    feature
                  )
                }
              >
                {/* ==================================
                    ICON
                ================================== */}

                <div
                  className={
                    styles.cardIcon
                  }
                  style={{
                    background: `${color}18`,
                    color: color,
                    borderColor: `${color}30`,
                  }}
                >
                  <Icon size={21} />
                </div>

                {/* ==================================
                    CONTENT
                ================================== */}

                <div
                  className={
                    styles.cardBody
                  }
                >
                  <div
                    className={
                      styles.titleRow
                    }
                  >
                    <p
                      className={
                        styles.cardTitle
                      }
                    >
                      {feature.title}
                    </p>

                    <span
                      className={
                        styles.xpBadge
                      }
                    >
                      +
                      {
                        feature.xpReward
                      }{" "}
                      XP
                    </span>
                  </div>

                  <p
                    className={
                      styles.cardDesc
                    }
                  >
                    {
                      feature.description
                    }
                  </p>

                  <div
                    className={
                      styles.cardBottom
                    }
                  >
                    <span
                      className={
                        styles.actionText
                      }
                    >
                      {action}

                      <ChevronRight
                        size={13}
                      />
                    </span>
                  </div>
                </div>

                {/* ==================================
                    RIGHT ARROW
                ================================== */}

                <div
                  className={
                    styles.cardAction
                  }
                >
                  <ChevronRight
                    size={17}
                  />
                </div>
              </motion.button>
            );
          }
        )}
      </div>

      {/* ========================================
          BOTTOM MOTIVATION
      ======================================== */}

      <motion.div
        className={styles.footer}
        initial={{
          opacity: 0,
          y: 10,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          delay: 0.5,
        }}
      >
        <div
          className={
            styles.footerIcon
          }
        >
          🔥
        </div>

        <div>
          <strong>
            Keep your momentum!
          </strong>

          <span>
            Every activity gets you
            closer to your next reward.
          </span>
        </div>
      </motion.div>
    </div>
  );
}

export default EarnAndLevelUp;