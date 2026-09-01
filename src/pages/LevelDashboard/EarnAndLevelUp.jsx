import { motion } from "framer-motion";
import { ArrowLeft, Play, ClipboardList, Users, Gamepad2, Flame, Magnet, ChevronRight } from "lucide-react";
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

function EarnAndLevelUp({ onBack, onPlayGame }) {
  const handleCardClick = (feature) => {
    if (feature.id === "mini-games" || feature.id === "xp-catcher") {
      onPlayGame();
    }
    // other cards are demo/UI-only for now
  };

  return (
    <div className={styles.page}>
      <div className={styles.topbar}>
        <button className={styles.backBtn} onClick={onBack}>
          <ArrowLeft size={18} />
        </button>
        <div className={styles.headerText}>
          <h4>Earn & Level Up</h4>
          <p>Complete activities. Earn XP. Climb levels. Get rewards.</p>
        </div>
      </div>

      <div className={styles.list}>
        {earningFeatures.map((feature, i) => {
          const Icon = iconMap[feature.icon] || Play;
          const color = iconColors[feature.icon] || "#a78bfa";

          return (
            <motion.div
              key={feature.id}
              initial={{ opacity: 0, x: -12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.05, duration: 0.3 }}
              className={styles.card}
              onClick={() => handleCardClick(feature)}
            >
              <div className={styles.cardIcon} style={{ background: color }}>
                <Icon size={20} />
              </div>
              <div className={styles.cardBody}>
                <p className={styles.cardTitle}>{feature.title}</p>
                <p className={styles.cardDesc}>{feature.description}</p>
                <p className={styles.cardReward}>+{feature.xpReward} XP</p>
              </div>
              {feature.comingSoon ? (
                <span className={styles.comingSoonBadge}>Soon</span>
              ) : (
                <ChevronRight size={18} color="#6f7191" />
              )}
            </motion.div>
          );
        })}
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.4 }}
        className={styles.footer}
      >
        Keep going! You're doing great! 📈
      </motion.div>
    </div>
  );
}

export default EarnAndLevelUp;
