import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import styles from "./GameResult.module.css";
import { userLevelData, getXPRemaining } from "../../data/levelData";

function GameResult({ score, onPlayAgain, onBackToDashboard }) {
  const { currentLevel, currentXP, requiredXP } = userLevelData;
  const progressPercent = Math.min(100, Math.round((currentXP / requiredXP) * 100));

  // Demo reward calculation based on score (clearly a dev/demo formula)
  const xpEarned = Math.round(score * 0.4);
  const vesEarned = Math.round(score * 0.15);
  const isNewBest = score >= 90;

  const confettiColors = ["#facc15", "#f59e0b", "#a78bfa", "#34d399", "#60a5fa"];
  const confettiPieces = Array.from({ length: 24 }, (_, i) => ({
    id: i,
    left: Math.random() * 100,
    color: confettiColors[i % confettiColors.length],
    delay: Math.random() * 0.5,
    duration: 2.5 + Math.random() * 1.5,
  }));

  return (
    <div className={styles.page}>
      <div className={styles.confettiWrap}>
        {confettiPieces.map((c) => (
          <div
            key={c.id}
            className={styles.confetti}
            style={{
              left: `${c.left}%`,
              background: c.color,
              animationDelay: `${c.delay}s`,
              animationDuration: `${c.duration}s`,
            }}
          />
        ))}
      </div>

      <div className={styles.topbar}>
        <button className={styles.backBtn} onClick={onBackToDashboard}>
          <ArrowLeft size={18} />
        </button>
      </div>

      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className={styles.center}
      >
        <div className={styles.completeLabel}>Challenge Complete!</div>
        <h1 className={styles.title}>Outstanding!</h1>
        <p className={styles.subtitle}>You crushed it this round</p>
      </motion.div>

      <motion.div
        initial={{ scale: 0, rotate: -15 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ delay: 0.15, duration: 0.5, ease: "backOut" }}
        className={styles.trophyWrap}
      >
        <div className={styles.trophyCircle}>🏆</div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.4 }}
        className={styles.resultCard}
      >
        <div className={styles.scoreRow}>
          <div>
            <div className={styles.scoreLabel}>Final Score</div>
            <div className={styles.scoreValue}>{score}</div>
          </div>
          {isNewBest && <div className={styles.bestBadge}>New Best!</div>}
        </div>

        <div className={styles.rewardsGrid}>
          <div className={styles.rewardBox}>
            <div className={styles.rewardValue}>+{xpEarned} XP</div>
            <div className={styles.rewardLabel}>Experience</div>
          </div>
          <div className={styles.rewardBox}>
            <div className={styles.rewardValue}>+{vesEarned} VEs</div>
            <div className={styles.rewardLabel}>Your Reward</div>
          </div>
        </div>

        <div className={styles.progressSection}>
          <div className={styles.progressLabels}>
            <span>Level {String(currentLevel).padStart(2, "0")}</span>
            <span>Level {String(currentLevel + 1).padStart(2, "0")}</span>
          </div>
          <div className={styles.progressTrack}>
            <motion.div
              className={styles.progressFill}
              initial={{ width: 0 }}
              animate={{ width: `${progressPercent}%` }}
              transition={{ delay: 0.5, duration: 0.8 }}
            />
          </div>
          <div className={styles.progressXP}>
            {currentXP.toLocaleString()} / {requiredXP.toLocaleString()} XP
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.4 }}
        className={styles.actions}
      >
        <button className={styles.playAgainBtn} onClick={onPlayAgain}>
          Play Again
        </button>
        <button className={styles.dashboardBtn} onClick={onBackToDashboard}>
          Back to Dashboard
        </button>
      </motion.div>
    </div>
  );
}

export default GameResult;
