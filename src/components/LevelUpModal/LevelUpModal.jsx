import { motion } from "framer-motion";
import { TrendingUp, Target, Gift } from "lucide-react";
import styles from "./LevelUpModal.module.css";
import { userLevelData } from "../../data/levelData";

function LevelUpModal({ onClose }) {
  const { currentLevel, nextLevel, nextLevelReward } = userLevelData;

  const confettiColors = ["#facc15", "#f59e0b", "#a78bfa", "#34d399", "#60a5fa"];
  const confettiPieces = Array.from({ length: 30 }, (_, i) => ({
    id: i,
    left: Math.random() * 100,
    color: confettiColors[i % confettiColors.length],
    delay: Math.random() * 0.6,
    duration: 2.5 + Math.random() * 1.5,
  }));

  return (
    <>
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

      <div className={styles.overlay} onClick={onClose}>
        <motion.div
          initial={{ opacity: 0, scale: 0.85, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.4, ease: "backOut" }}
          className={styles.modal}
          onClick={(e) => e.stopPropagation()}
        >
          <div className={styles.eyebrow}>Achievement Unlocked</div>
          <h2 className={styles.title}>LEVEL UP!</h2>
          <p className={styles.subtitle}>You've reached</p>

          <div className={styles.badgeWrap}>
            <motion.div
              initial={{ scale: 0, rotate: -20 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ delay: 0.15, duration: 0.5, ease: "backOut" }}
              className={styles.badgeCircle}
            >
              <span className={styles.badgeLevelLabel}>LEVEL</span>
              <span className={styles.badgeLevelNum}>
                {String(nextLevel).padStart(2, "0")}
              </span>
            </motion.div>
          </div>

          <div className={styles.rewardsGrid}>
            <div className={styles.rewardBox}>
              <div className={styles.rewardValue}>
                +{nextLevelReward.amount} {nextLevelReward.type}
              </div>
              <div className={styles.rewardLabel}>Reward</div>
            </div>
            <div className={styles.rewardBox}>
              <div className={styles.rewardValue}>
                +{nextLevelReward.secondary?.amount || 0}{" "}
                {nextLevelReward.secondary?.type || "Gems"}
              </div>
              <div className={styles.rewardLabel}>Bonus</div>
            </div>
          </div>

          <div className={styles.perksList}>
            <div className={styles.perkItem}>
              <TrendingUp size={15} color="#facc15" />
              Higher daily XP limit
            </div>
            <div className={styles.perkItem}>
              <Target size={15} color="#facc15" />
              Access to new challenges
            </div>
            <div className={styles.perkItem}>
              <Gift size={15} color="#facc15" />
              Better reward opportunities
            </div>
          </div>

          <button className={styles.claimBtn} onClick={onClose}>
            Claim Rewards
          </button>
        </motion.div>
      </div>
    </>
  );
}

export default LevelUpModal;
