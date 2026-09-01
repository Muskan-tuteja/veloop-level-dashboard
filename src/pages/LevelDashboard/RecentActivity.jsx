import { motion } from "framer-motion";
import { ArrowLeft, Filter, Users, ClipboardList, Gamepad2, Magnet, Flame, Zap } from "lucide-react";
import styles from "./RecentActivity.module.css";
import { xpActivity, todaysSummary } from "../../data/levelData";

const typeIconMap = {
  referral: { icon: Users, color: "#fb923c" },
  "daily-mission": { icon: ClipboardList, color: "#34d399" },
  "mini-game": { icon: Gamepad2, color: "#60a5fa" },
  "xp-catcher": { icon: Magnet, color: "#38bdf8" },
  streak: { icon: Flame, color: "#f87171" },
};

function RecentActivity({ onBack }) {
  const hasActivity = xpActivity && xpActivity.length > 0;

  return (
    <div className={styles.page}>
      <div className={styles.topbar}>
        <div className={styles.leftGroup}>
          <button className={styles.backBtn} onClick={onBack}>
            <ArrowLeft size={18} />
          </button>
          <h4 className={styles.title}>Recent Activity</h4>
        </div>
        <button className={styles.filterBtn}>
          <Filter size={16} />
        </button>
      </div>

      {/* Today's Summary */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className={styles.summaryCard}
      >
        <div className={styles.summaryTitle}>Today's Summary</div>
        <div className={styles.summaryRow}>
          <div className={styles.summaryItem}>
            <div className={styles.summaryIcon} style={{ background: "rgba(139,92,246,0.15)" }}>
              <Zap size={16} color="#a78bfa" />
            </div>
            <div>
              <div className={styles.summaryValue}>{todaysSummary.totalXP} XP</div>
              <div className={styles.summaryLabel}>Total Earned</div>
            </div>
          </div>
          <div className={styles.summaryItem}>
            <div className={styles.summaryIcon} style={{ background: "rgba(250,204,21,0.15)" }}>
              <span style={{ fontSize: 15 }}>💎</span>
            </div>
            <div>
              <div className={styles.summaryValue}>{todaysSummary.totalVEs} VEs</div>
              <div className={styles.summaryLabel}>Total Earned</div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Activity List */}
      {hasActivity ? (
        <div className={styles.list}>
          {xpActivity.map((activity, i) => {
            const config = typeIconMap[activity.type] || typeIconMap.streak;
            const Icon = config.icon;
            return (
              <motion.div
                key={activity.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05, duration: 0.3 }}
                className={styles.item}
              >
                <div className={styles.itemIcon} style={{ background: config.color }}>
                  <Icon size={17} />
                </div>
                <div className={styles.itemBody}>
                  <p className={styles.itemLabel}>{activity.label}</p>
                  <p className={styles.itemTime}>{activity.time}</p>
                </div>
                <div className={styles.itemXP}>+{activity.xp} XP</div>
              </motion.div>
            );
          })}
        </div>
      ) : (
        <div className={styles.emptyState}>
          <div className={styles.emptyIcon}>📊</div>
          <div className={styles.emptyTitle}>No XP Activity</div>
          <p className={styles.emptyText}>Your XP journey starts here.</p>
          <button className={styles.emptyCta} onClick={onBack}>
            Start Earning XP →
          </button>
        </div>
      )}
    </div>
  );
}

export default RecentActivity;
