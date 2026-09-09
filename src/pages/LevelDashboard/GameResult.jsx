import { motion } from "framer-motion";
import {
  ArrowLeft,
  Trophy,
  RotateCcw,
  LayoutDashboard,
  Zap,
  Gem,
  Target,
  Sparkles,
} from "lucide-react";

import styles from "./GameResult.module.css";
import { userLevelData } from "../../data/levelData";

function GameResult({ score, onPlayAgain, onBackToDashboard }) {
  const { currentLevel, currentXP, requiredXP } = userLevelData;

  // Demo reward calculation
  const xpEarned = Math.round(score * 0.4);
  const vesEarned = Math.round(score * 0.15);

  const isNewBest = score >= 90;

  const progressPercent = Math.min(
    100,
    Math.round((currentXP / requiredXP) * 100)
  );

  const xpRemaining = Math.max(requiredXP - currentXP, 0);

  const confettiColors = [
    "#facc15",
    "#f59e0b",
    "#a78bfa",
    "#34d399",
    "#60a5fa",
    "#fb7185",
  ];

  const confettiPieces = Array.from({ length: 30 }, (_, i) => ({
    id: i,
    left: `${Math.random() * 100}%`,
    delay: `${Math.random() * 0.8}s`,
    duration: `${2.5 + Math.random() * 2}s`,
    color: confettiColors[i % confettiColors.length],
    rotate: `${Math.random() * 360}deg`,
  }));

  return (
    <main className={styles.page}>
      {/* Ambient Background */}
      <div className={styles.bgGlowOne} />
      <div className={styles.bgGlowTwo} />

      {/* Confetti */}
      <div className={styles.confettiWrap} aria-hidden="true">
        {confettiPieces.map((piece) => (
          <span
            key={piece.id}
            className={styles.confetti}
            style={{
              left: piece.left,
              animationDelay: piece.delay,
              animationDuration: piece.duration,
              background: piece.color,
              transform: `rotate(${piece.rotate})`,
            }}
          />
        ))}
      </div>

      {/* Header */}
      <header className={styles.topbar}>
        <button
          type="button"
          className={styles.backBtn}
          onClick={onBackToDashboard}
          aria-label="Back to dashboard"
        >
          <ArrowLeft size={19} />
        </button>

        <div className={styles.headerTitle}>
          <Sparkles size={15} />
          <span>Game Result</span>
        </div>

        <div className={styles.headerSpacer} />
      </header>

      <div className={styles.content}>
        {/* Result Heading */}
        <motion.section
          className={styles.hero}
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
        >
          <div className={styles.completeBadge}>
            <span className={styles.badgeDot} />
            CHALLENGE COMPLETE
          </div>

          <h1 className={styles.title}>
            {isNewBest ? "Outstanding!" : "Well Played!"}
          </h1>

          <p className={styles.subtitle}>
            {isNewBest
              ? "You just smashed your personal best."
              : "Great effort! Keep playing to improve your score."}
          </p>
        </motion.section>

        {/* Trophy */}
        <motion.div
          className={styles.trophySection}
          initial={{ opacity: 0, scale: 0.65, rotate: -8 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{
            delay: 0.1,
            duration: 0.55,
            ease: "backOut",
          }}
        >
          <div className={styles.trophyGlow} />

          <div className={styles.trophyCircle}>
            <div className={styles.trophyRing}>
              <Trophy size={54} strokeWidth={1.8} />
            </div>
          </div>

          {isNewBest && (
            <motion.div
              className={styles.bestFloating}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.6, type: "spring" }}
            >
              <Sparkles size={12} />
              NEW BEST
            </motion.div>
          )}
        </motion.div>

        {/* Main Result Card */}
        <motion.section
          className={styles.resultCard}
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25, duration: 0.45 }}
        >
          {/* Score */}
          <div className={styles.scoreHeader}>
            <div>
              <span className={styles.overline}>FINAL SCORE</span>

              <div className={styles.scoreLine}>
                <strong>{score}</strong>
                <span>/100</span>
              </div>
            </div>

            <div className={styles.scoreIcon}>
              <Target size={19} />
            </div>
          </div>

          {/* Divider */}
          <div className={styles.divider} />

          {/* Rewards */}
          <div className={styles.rewardGrid}>
            <div className={`${styles.rewardBox} ${styles.xpReward}`}>
              <div className={styles.rewardIcon}>
                <Zap size={18} />
              </div>

              <div className={styles.rewardInfo}>
                <span>XP EARNED</span>
                <strong>+{xpEarned}</strong>
              </div>
            </div>

            <div className={`${styles.rewardBox} ${styles.veReward}`}>
              <div className={styles.rewardIcon}>
                <Gem size={18} />
              </div>

              <div className={styles.rewardInfo}>
                <span>VE EARNED</span>
                <strong>+{vesEarned}</strong>
              </div>
            </div>
          </div>

          {/* Level Progress */}
          <div className={styles.levelSection}>
            <div className={styles.levelHeader}>
              <div>
                <span className={styles.overline}>LEVEL PROGRESS</span>
                <strong>
                  Level {String(currentLevel).padStart(2, "0")}
                </strong>
              </div>

              <div className={styles.nextLevel}>
                <span>NEXT</span>
                <strong>
                  {String(currentLevel + 1).padStart(2, "0")}
                </strong>
              </div>
            </div>

            <div className={styles.progressTrack}>
              <motion.div
                className={styles.progressFill}
                initial={{ width: 0 }}
                animate={{ width: `${progressPercent}%` }}
                transition={{
                  delay: 0.65,
                  duration: 1,
                  ease: "easeOut",
                }}
              />

              <motion.div
                className={styles.progressGlow}
                initial={{ left: 0 }}
                animate={{
                  left: `calc(${progressPercent}% - 7px)`,
                }}
                transition={{
                  delay: 0.65,
                  duration: 1,
                  ease: "easeOut",
                }}
              />
            </div>

            <div className={styles.progressBottom}>
              <span>
                {currentXP.toLocaleString()} /{" "}
                {requiredXP.toLocaleString()} XP
              </span>

              <strong>{progressPercent}%</strong>
            </div>

            <div className={styles.remainingText}>
              <Zap size={12} />
              {xpRemaining.toLocaleString()} XP remaining to next level
            </div>
          </div>
        </motion.section>

        {/* Actions */}
        <motion.section
          className={styles.actions}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45, duration: 0.4 }}
        >
          <button
            type="button"
            className={styles.playAgainBtn}
            onClick={onPlayAgain}
          >
            <RotateCcw size={17} />
            <span>Play Again</span>
          </button>

          <button
            type="button"
            className={styles.dashboardBtn}
            onClick={onBackToDashboard}
          >
            <LayoutDashboard size={17} />
            <span>Back to Dashboard</span>
          </button>
        </motion.section>

        {/* Bottom Message */}
        <motion.p
          className={styles.bottomMessage}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
        >
          Keep going — every game gets you closer to the next level 🚀
        </motion.p>
      </div>
    </main>
  );
}

export default GameResult;