import { useState } from "react";
import { motion } from "framer-motion";
import { Gift, Lock, Info } from "lucide-react";
import styles from "./NextLevelReward.module.css";
import { userLevelData, getXPRemaining } from "../../data/levelData";

function NextLevelReward() {
  const [showInfo, setShowInfo] = useState(false);
  const { currentLevel, nextLevel, currentXP, requiredXP, nextLevelReward } = userLevelData;
  const xpRemaining = getXPRemaining();
  const progressPercent = Math.min(100, Math.round((currentXP / requiredXP) * 100));

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2, duration: 0.4 }}
      className={styles.card}
    >
      <div className={styles.glow}></div>

      <div className={styles.headerRow}>
        <div className={styles.titleGroup}>
          <span className={styles.title}>Next Level Reward</span>
        </div>
        <button
          className={styles.infoBtn}
          onClick={() => setShowInfo((s) => !s)}
          aria-label="Reward information"
        >
          <Info size={14} />
        </button>
        {showInfo && (
          <div className={styles.tooltip}>
            The displayed reward is associated with the next level according to
            the current reward configuration.
          </div>
        )}
      </div>

      <div className={styles.body}>
        <div className={styles.lockIconWrap}>
          <Gift size={26} color="#facc15" />
          <div className={styles.lockBadge}>
            <Lock size={11} />
          </div>
        </div>
        <div>
          <div className={styles.rewardValue}>
            +{nextLevelReward.amount} {nextLevelReward.type}
          </div>
          <div className={styles.rewardSub}>
            + {nextLevelReward.secondary?.amount} {nextLevelReward.secondary?.type}{" "}
            bonus included
          </div>
        </div>
      </div>

      <div className={styles.unlockText}>
        Reach <b>Level {String(nextLevel).padStart(2, "0")}</b> to unlock —{" "}
        {xpRemaining.toLocaleString()} XP remaining
      </div>

      <div className={styles.progressTrack}>
        <motion.div
          className={styles.progressFill}
          initial={{ width: 0 }}
          animate={{ width: `${progressPercent}%` }}
          transition={{ delay: 0.4, duration: 0.8, ease: "easeOut" }}
        />
      </div>
      <div className={styles.progressPercent}>{progressPercent}% there</div>
    </motion.div>
  );
}

export default NextLevelReward;
