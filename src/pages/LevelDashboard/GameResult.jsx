import { motion } from "framer-motion";
import {
  ArrowLeft,
  Trophy,
  Frown,
  Meh,
  Sparkles,
  Zap,
  Gem,
  TrendingUp,
} from "lucide-react";

import styles from "./GameResult.module.css";
import { userLevelData } from "../../data/levelData";

function GameResult({
  score = 0,
  xpEarned = 0,
  levelUpInfo = null,
  onPlayAgain,
  onBackToDashboard,
}) {
  // ============================================
  // GAME VALUES
  // ============================================

  const safeScore = Math.max(0, Number(score) || 0);

  const safeXP = Math.max(0, Number(xpEarned) || 0);

  // IMPORTANT:
  // Always take latest level data from levelData.js
  // instead of defaulting to Level 01.
  const currentLevel = Math.max(
    1,
    Number(userLevelData.currentLevel) || 1
  );

  const currentXP = Math.max(
    0,
    Number(userLevelData.currentXP) || 0
  );

  const requiredXP = Math.max(
    1,
    Number(userLevelData.requiredXP) || 1000
  );

  const nextLevel = currentLevel + 1;

  // ============================================
  // SCORE STATES
  // ============================================

  const isZeroScore = safeScore === 0;

  const isLowScore =
    safeScore > 0 && safeScore < 30;

  const isGoodScore =
    safeScore >= 30 && safeScore < 60;

  const isGreatScore =
    safeScore >= 60 && safeScore < 90;

  const isExcellentScore =
    safeScore >= 90;

  const isNewBest = safeScore >= 90;

  // ============================================
  // VE REWARD
  // ============================================

  const vesEarned = Math.round(safeScore * 0.15);

  // ============================================
  // PROGRESS
  // ============================================

  const progressPercent = Math.min(
    100,
    Math.round((currentXP / requiredXP) * 100)
  );

  const xpRemaining = Math.max(
    0,
    requiredXP - currentXP
  );

  // ============================================
  // RESULT CONTENT
  // ============================================

  let icon = <Trophy size={38} />;
  let title = "Outstanding!";
  let subtitle = "You crushed it this round.";

  let message =
    "Amazing performance! Keep building your streak.";

  let messageType = "success";

  if (isZeroScore) {
    icon = <Frown size={38} />;

    title = "Oh no... 😔";

    subtitle =
      "No rewards were caught this round.";

    message =
      "Don't worry. Everyone has a tough round. Try again and catch as many rewards as you can!";

    messageType = "sad";
  } else if (isLowScore) {
    icon = <Frown size={38} />;

    title = "Tough Round 😔";

    subtitle =
      "This one didn't go your way.";

    message =
      "You can do better! Keep practicing and try to build a longer streak.";

    messageType = "sad";
  } else if (isGoodScore) {
    icon = <Meh size={38} />;

    title = "Good Effort!";

    subtitle =
      "You're getting the hang of it.";

    message =
      "Nice start! A few more catches and your score can go much higher.";

    messageType = "normal";
  } else if (isGreatScore) {
    icon = <Sparkles size={38} />;

    title = "Nice Work! ✨";

    subtitle =
      "You're getting really good at this.";

    message =
      "Great job! Keep your streak alive and aim for an even higher score.";

    messageType = "great";
  } else if (isExcellentScore) {
    icon = <Trophy size={38} />;

    title = "Outstanding! 🏆";

    subtitle =
      "You crushed it this round.";

    message =
      "Fantastic performance! You showed great speed and consistency.";

    messageType = "success";
  }

  const hasLeveledUp = Boolean(levelUpInfo);

  return (
    <main
      className={`${styles.page} ${
        messageType === "sad"
          ? styles.sadPage
          : ""
      }`}
    >
      {/* ========================================
          BACKGROUND
      ======================================== */}

      <div className={styles.backgroundGlow} />
      <div className={styles.backgroundGlowTwo} />

      {/* ========================================
          CONFETTI
      ======================================== */}

      {!isZeroScore && !isLowScore && (
        <div className={styles.confettiWrap}>
          {Array.from(
            { length: 30 },
            (_, index) => (
              <span
                key={index}
                className={styles.confetti}
                style={{
                  left: `${(index * 17) % 100}%`,
                  animationDelay: `${
                    (index % 8) * 0.12
                  }s`,
                }}
              />
            )
          )}
        </div>
      )}

      {/* ========================================
          TOP BAR
      ======================================== */}

      <header className={styles.topbar}>
        <button
          type="button"
          className={styles.backBtn}
          onClick={onBackToDashboard}
          aria-label="Back to dashboard"
        >
          <ArrowLeft size={19} />
        </button>

        <div className={styles.topLabel}>
          <Sparkles size={14} />
          GAME RESULT
        </div>
      </header>

      {/* ========================================
          HERO
      ======================================== */}

      <motion.section
        className={styles.center}
        initial={{
          opacity: 0,
          y: -20,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          duration: 0.5,
        }}
      >
        <div
          className={`${styles.completeLabel} ${
            messageType === "sad"
              ? styles.sadLabel
              : ""
          }`}
        >
          {isZeroScore
            ? "CHALLENGE MISSED"
            : "CHALLENGE COMPLETE"}
        </div>

        <h1
          className={`${styles.title} ${
            messageType === "sad"
              ? styles.sadTitle
              : ""
          }`}
        >
          {title}
        </h1>

        <p className={styles.subtitle}>
          {subtitle}
        </p>
      </motion.section>

      {/* ========================================
          RESULT ICON
      ======================================== */}

      <motion.div
        className={styles.trophyWrap}
        initial={{
          scale: 0,
          rotate: -15,
        }}
        animate={{
          scale: 1,
          rotate: 0,
        }}
        transition={{
          delay: 0.15,
          duration: 0.55,
          ease: "backOut",
        }}
      >
        <div
          className={`${styles.trophyCircle} ${
            messageType === "sad"
              ? styles.resultIconSad
              : ""
          }`}
        >
          {icon}
        </div>
      </motion.div>

      {/* ========================================
          MESSAGE
      ======================================== */}

      <motion.div
        className={`${styles.resultMessage} ${
          messageType === "sad"
            ? styles.sadMessage
            : ""
        }`}
        initial={{
          opacity: 0,
          y: 10,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          delay: 0.25,
          duration: 0.4,
        }}
      >
        {message}
      </motion.div>

      {/* ========================================
          LEVEL UP BANNER
      ======================================== */}

      {hasLeveledUp && (
        <motion.div
          className={styles.levelUpBanner}
          initial={{
            opacity: 0,
            scale: 0.9,
            y: 10,
          }}
          animate={{
            opacity: 1,
            scale: 1,
            y: 0,
          }}
          transition={{
            delay: 0.35,
            duration: 0.45,
          }}
        >
          <div className={styles.levelUpIcon}>
            <TrendingUp size={22} />
          </div>

          <div>
            <span>LEVEL UP!</span>

            <strong>
              Level {levelUpInfo.previousLevel} → Level{" "}
              {levelUpInfo.currentLevel}
            </strong>

            <small>
              Congratulations! You unlocked the next level.
            </small>
          </div>
        </motion.div>
      )}

      {/* ========================================
          RESULT CARD
      ======================================== */}

      <motion.div
        className={styles.resultCard}
        initial={{
          opacity: 0,
          y: 25,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          delay: 0.3,
          duration: 0.45,
        }}
      >
        {/* SCORE */}

        <div className={styles.scoreRow}>
          <div>
            <div className={styles.scoreLabel}>
              Final Score
            </div>

            <div className={styles.scoreValue}>
              {safeScore}
            </div>
          </div>

          {isNewBest && (
            <div className={styles.bestBadge}>
              <Trophy size={13} />
              NEW BEST
            </div>
          )}
        </div>

        {/* REWARDS */}

        <div className={styles.rewardsGrid}>
          <div className={styles.rewardBox}>
            <div className={styles.rewardIconXP}>
              <Zap
                size={17}
                fill="currentColor"
              />
            </div>

            <div className={styles.rewardValue}>
              +{safeXP} XP
            </div>

            <div className={styles.rewardLabel}>
              Experience earned
            </div>
          </div>

          <div className={styles.rewardBox}>
            <div className={styles.rewardIconVE}>
              <Gem size={17} />
            </div>

            <div className={styles.rewardValue}>
              +{vesEarned} VEs
            </div>

            <div className={styles.rewardLabel}>
              Your reward
            </div>
          </div>
        </div>

        {/* ======================================
            LEVEL PROGRESS
        ====================================== */}

        <div className={styles.progressSection}>
          <div className={styles.progressHeader}>
            <div>
              <span>LEVEL</span>

              <strong>
                {String(currentLevel).padStart(
                  2,
                  "0"
                )}
              </strong>
            </div>

            <div className={styles.nextLevelText}>
              {hasLeveledUp
                ? "Level unlocked!"
                : `${xpRemaining.toLocaleString()} XP to next level`}
            </div>
          </div>

          <div className={styles.progressTrack}>
            <motion.div
              className={`${styles.progressFill} ${
                messageType === "sad"
                  ? styles.progressSad
                  : ""
              }`}
              initial={{
                width: 0,
              }}
              animate={{
                width: `${progressPercent}%`,
              }}
              transition={{
                delay: 0.5,
                duration: 0.9,
                ease: "easeOut",
              }}
            />
          </div>

          <div className={styles.progressBottom}>
            <span>
              {currentXP.toLocaleString()} XP
            </span>

            <span>
              {requiredXP.toLocaleString()} XP
            </span>
          </div>
        </div>
      </motion.div>

      {/* ========================================
          ACTIONS
      ======================================== */}

      <motion.div
        className={styles.actions}
        initial={{
          opacity: 0,
          y: 15,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          delay: 0.55,
          duration: 0.4,
        }}
      >
        <button
          type="button"
          className={styles.playAgainBtn}
          onClick={onPlayAgain}
        >
          <Zap
            size={18}
            fill="currentColor"
          />

          {isZeroScore || isLowScore
            ? "Try Again"
            : "Play Again"}
        </button>

        <button
          type="button"
          className={styles.dashboardBtn}
          onClick={onBackToDashboard}
        >
          <ArrowLeft size={17} />
          Back to Dashboard
        </button>
      </motion.div>

      {/* ========================================
          LOW SCORE FOOTER
      ======================================== */}

      {(isZeroScore || isLowScore) && (
        <motion.p
          className={styles.sadFooter}
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: 1,
          }}
          transition={{
            delay: 0.8,
          }}
        >
          💜 Every attempt counts. Keep going —
          your next round can be better.
        </motion.p>
      )}
    </main>
  );
}

export default GameResult;