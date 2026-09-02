import styles from "./States.module.css";

function EmptyGameState() {
  return (
    <div className={styles.emptyGameWrap}>
      <div className={styles.emptyGameIcon}>🎮</div>
      <div className={styles.emptyGameTitle}>New challenge coming soon.</div>
      <p className={styles.emptyGameText}>
        Check back later for a new way to earn XP.
      </p>
    </div>
  );
}

export default EmptyGameState;
