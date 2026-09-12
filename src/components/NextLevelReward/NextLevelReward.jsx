import { useState } from "react";
import { motion } from "framer-motion";
import { Gift, Lock, Info, Sparkles } from "lucide-react";

import styles from "./NextLevelReward.module.css";

import {
  userLevelData,
  getXPRemaining,
} from "../../data/levelData";

function NextLevelReward() {
  const [showInfo, setShowInfo] = useState(false);

  /* ============================================
     SAFE DATA
  ============================================ */

  const currentLevel =
    Number(userLevelData?.currentLevel) || 1;

  const currentXP =
    Math.max(0, Number(userLevelData?.currentXP) || 0);

  const requiredXP =
    Math.max(1, Number(userLevelData?.requiredXP) || 1000);

  const nextLevel =
    Number(userLevelData?.nextLevel) || currentLevel + 1;

  const nextLevelReward =
    userLevelData?.nextLevelReward || {};

  const primaryAmount =
    Number(nextLevelReward?.amount) || 0;

  const primaryType =
    nextLevelReward?.type || "VEs";

  const secondaryAmount =
    Number(nextLevelReward?.secondary?.amount) || 0;

  const secondaryType =
    nextLevelReward?.secondary?.type || "Gems";

  /* ============================================
     XP CALCULATION
  ============================================ */

  const xpRemaining = Math.max(
    0,
    Number(getXPRemaining?.()) ||
      Math.max(0, requiredXP - currentXP)
  );

  const progressPercent = Math.min(
    100,
    Math.max(
      0,
      Math.round((currentXP / requiredXP) * 100)
    )
  );

  /* ============================================
     RENDER
  ============================================ */

  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 10,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      transition={{
        delay: 0.2,
        duration: 0.4,
      }}
      className={styles.card}
    >

      {/* ========================================
          BACKGROUND GLOW
      ======================================== */}

      <div
        className={styles.glow}
        aria-hidden="true"
      />


      {/* ========================================
          HEADER
      ======================================== */}

      <div className={styles.headerRow}>

        <div className={styles.titleGroup}>

          <div className={styles.titleIcon}>
            <Sparkles size={14} />
          </div>

          <div>
            <span className={styles.title}>
              Next Level Reward
            </span>

            <span className={styles.subtitle}>
              Unlock something special
            </span>
          </div>

        </div>


        {/* INFO BUTTON */}

        <button
          type="button"
          className={styles.infoBtn}
          onClick={() =>
            setShowInfo((previous) => !previous)
          }
          aria-label="Reward information"
          aria-expanded={showInfo}
        >
          <Info size={14} />
        </button>


        {/* TOOLTIP */}

        {showInfo && (
          <div className={styles.tooltip}>
            The reward shown here is for Level{" "}
            {String(nextLevel).padStart(2, "0")}.
            Keep earning XP to unlock it.
          </div>
        )}

      </div>


      {/* ========================================
          LEVEL / REWARD BODY
      ======================================== */}

      <div className={styles.body}>

        {/* GIFT ICON */}

        <div className={styles.lockIconWrap}>

          <div className={styles.giftCircle}>
            <Gift size={27} />
          </div>

          <div className={styles.lockBadge}>
            <Lock size={11} />
          </div>

        </div>


        {/* REWARD INFORMATION */}

        <div className={styles.rewardInfo}>

          <span className={styles.levelHint}>
            LEVEL{" "}
            {String(nextLevel).padStart(2, "0")}
          </span>

          <div className={styles.rewardValue}>
            +{primaryAmount} {primaryType}
          </div>


          {/* SECONDARY REWARD */}

          {secondaryAmount > 0 && (
            <div className={styles.rewardSub}>
              +{secondaryAmount} {secondaryType}
              <span> bonus included</span>
            </div>
          )}

        </div>

      </div>


      {/* ========================================
          UNLOCK TEXT
      ======================================== */}

      <div className={styles.unlockText}>

        <span>
          Reach{" "}
          <b>
            Level {String(nextLevel).padStart(2, "0")}
          </b>
        </span>

        <span className={styles.remainingXP}>
          {xpRemaining.toLocaleString()} XP remaining
        </span>

      </div>


      {/* ========================================
          PROGRESS BAR
      ======================================== */}

      <div
        className={styles.progressTrack}
        role="progressbar"
        aria-valuenow={progressPercent}
        aria-valuemin="0"
        aria-valuemax="100"
        aria-label={`${progressPercent}% progress toward next level`}
      >

        <motion.div
          className={styles.progressFill}
          initial={{
            width: 0,
          }}
          animate={{
            width: `${progressPercent}%`,
          }}
          transition={{
            delay: 0.4,
            duration: 0.8,
            ease: "easeOut",
          }}
        />

      </div>


      {/* ========================================
          PROGRESS FOOTER
      ======================================== */}

      <div className={styles.progressFooter}>

        <span>
          {currentXP.toLocaleString()} /{" "}
          {requiredXP.toLocaleString()} XP
        </span>

        <strong>
          {progressPercent}%
        </strong>

      </div>

    </motion.div>
  );
}

export default NextLevelReward;