import { motion } from "framer-motion";
import { Milestone, Check, Lock } from "lucide-react";
import styles from "./LevelRoadmap.module.css";
import { levelRoadmap } from "../../data/levelData";

function LevelRoadmap() {
  return (
    <div className={styles.wrap}>
      <div className={styles.headerRow}>
        <Milestone size={14} color="#facc15" />
        <span className={styles.title}>Level Roadmap</span>
      </div>

      <div className={styles.track}>
        {levelRoadmap.map((lvl, i) => {
          const isLast = i === levelRoadmap.length - 1;
          const isCompleted = lvl.status === "completed";
          const isCurrent = lvl.status === "current";
          const isLocked = lvl.status === "locked";

          const circleClass = isCompleted
            ? styles.circleCompleted
            : isCurrent
            ? styles.circleCurrent
            : styles.circleLocked;

          return (
            <motion.div
              key={lvl.level}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05, duration: 0.3 }}
              className={styles.node}
            >
              {isCurrent && (
                <div className={styles.youAreHere}>YOU ARE HERE</div>
              )}

              {!isLast && (
                <div
                  className={`${styles.connector} ${
                    isCompleted ? styles.connectorDone : ""
                  }`}
                />
              )}

              <div className={circleClass}>
                {isCompleted ? (
                  <Check size={18} />
                ) : isLocked ? (
                  <Lock size={16} />
                ) : (
                  String(lvl.level).padStart(2, "0")
                )}
              </div>

              <div className={`${styles.label} ${isCurrent ? styles.labelCurrent : ""}`}>
                Level {String(lvl.level).padStart(2, "0")}
              </div>
              <div className={styles.reward}>{lvl.reward}</div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

export default LevelRoadmap;
