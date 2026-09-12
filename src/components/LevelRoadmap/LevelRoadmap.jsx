import { motion } from "framer-motion";
import {
  Milestone,
  Check,
  Lock,
  ChevronRight,
  Sparkles,
} from "lucide-react";

import styles from "./LevelRoadmap.module.css";

import {
  levelRoadmap,
  userLevelData,
} from "../../data/levelData";


function LevelRoadmap() {

  const currentLevel = Number(
    userLevelData.currentLevel
  ) || 1;


  return (
    <div className={styles.wrap}>

      {/* =========================================
          HEADER
      ========================================= */}

      <div className={styles.headerRow}>

        <div className={styles.headerIcon}>
          <Milestone size={16} />
        </div>

        <div>
          <span className={styles.title}>
            Level Roadmap
          </span>

          <span className={styles.subtitle}>
            Your journey to the next reward
          </span>
        </div>

      </div>


      {/* =========================================
          ROADMAP
      ========================================= */}

      <div className={styles.track}>

        {levelRoadmap.map((lvl, index) => {

          const isLast =
            index === levelRoadmap.length - 1;


          /*
           * Dynamic status
           *
           * Level below current = completed
           * Current level = current
           * Above current = locked
           */

          const isCompleted =
            lvl.level < currentLevel;

          const isCurrent =
            lvl.level === currentLevel;

          const isLocked =
            lvl.level > currentLevel;


          /*
           * Connector belongs to the level
           * before the next level.
           */

          const connectorDone =
            lvl.level < currentLevel;


          const circleClass =
            isCompleted
              ? styles.circleCompleted
              : isCurrent
              ? styles.circleCurrent
              : styles.circleLocked;


          return (
            <motion.div
              key={lvl.level}
              className={styles.node}

              initial={{
                opacity: 0,
                y: 12,
              }}

              animate={{
                opacity: 1,
                y: 0,
              }}

              transition={{
                delay: index * 0.07,
                duration: 0.35,
              }}
            >

              {/* =================================
                  CURRENT LABEL
              ================================= */}

              {isCurrent && (
                <motion.div
                  className={styles.youAreHere}

                  initial={{
                    opacity: 0,
                    scale: 0.8,
                    y: 5,
                  }}

                  animate={{
                    opacity: 1,
                    scale: 1,
                    y: 0,
                  }}

                  transition={{
                    delay: 0.2,
                    duration: 0.3,
                  }}
                >
                  <Sparkles size={11} />
                  YOU ARE HERE
                </motion.div>
              )}


              {/* =================================
                  CONNECTOR
              ================================= */}

              {!isLast && (
                <div
                  className={`${styles.connector} ${
                    connectorDone
                      ? styles.connectorDone
                      : ""
                  }`}
                />
              )}


              {/* =================================
                  LEVEL CIRCLE
              ================================= */}

              <motion.div
                className={circleClass}

                whileHover={
                  !isLocked
                    ? {
                        scale: 1.06,
                      }
                    : {}
                }
              >

                {isCompleted ? (
                  <Check size={18} strokeWidth={3} />
                ) : isLocked ? (
                  <Lock size={16} />
                ) : (
                  <span>
                    {String(lvl.level).padStart(2, "0")}
                  </span>
                )}

              </motion.div>


              {/* =================================
                  LEVEL LABEL
              ================================= */}

              <div
                className={`${styles.label} ${
                  isCurrent
                    ? styles.labelCurrent
                    : ""
                } ${
                  isCompleted
                    ? styles.labelCompleted
                    : ""
                }`}
              >
                Level{" "}
                {String(lvl.level).padStart(2, "0")}
              </div>


              {/* =================================
                  REWARD
              ================================= */}

              <div
                className={`${styles.reward} ${
                  isCurrent
                    ? styles.rewardCurrent
                    : ""
                }`}
              >
                {lvl.reward}
              </div>


              {/* =================================
                  STATUS
              ================================= */}

              {isCompleted && (
                <span className={styles.completedText}>
                  Completed
                </span>
              )}

              {isCurrent && (
                <span className={styles.currentText}>
                  Current Level
                </span>
              )}

              {isLocked && (
                <span className={styles.lockedText}>
                  Locked
                </span>
              )}

            </motion.div>
          );
        })}

      </div>


      {/* =========================================
          FOOTER
      ========================================= */}

      <div className={styles.roadmapFooter}>

        <div>
          <span>Current Level</span>

          <strong>
            {String(currentLevel).padStart(2, "0")}
          </strong>
        </div>


        <ChevronRight size={16} />


        <div>
          <span>Next Level</span>

          <strong>
            {String(
              currentLevel + 1
            ).padStart(2, "0")}
          </strong>
        </div>

      </div>

    </div>
  );
}


export default LevelRoadmap;