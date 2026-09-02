import styles from "./States.module.css";

function DashboardSkeleton() {
  return (
    <div className={styles.skeletonPage}>
      <div className={styles.skeletonTopbar}>
        <div className={`${styles.skeletonBlock} ${styles.skeletonCircleSm}`}></div>
        <div className={`${styles.skeletonBlock} ${styles.skeletonCircleSm}`}></div>
      </div>

      <div className={`${styles.skeletonBlock} ${styles.skeletonGreeting}`}></div>
      <div className={`${styles.skeletonBlock} ${styles.skeletonSubtext}`}></div>

      <div className={`${styles.skeletonBlock} ${styles.skeletonLevelCard}`}></div>
      <div className={`${styles.skeletonBlock} ${styles.skeletonRewardCard}`}></div>

      <div className={styles.skeletonBoostRow}>
        <div className={`${styles.skeletonBlock} ${styles.skeletonBoostCard}`}></div>
        <div className={`${styles.skeletonBlock} ${styles.skeletonBoostCard}`}></div>
        <div className={`${styles.skeletonBlock} ${styles.skeletonBoostCard}`}></div>
      </div>

      <div className={styles.skeletonRoadmapRow}>
        {[1, 2, 3, 4, 5].map((i) => (
          <div
            key={i}
            className={`${styles.skeletonBlock} ${styles.skeletonRoadmapNode}`}
          ></div>
        ))}
      </div>
    </div>
  );
}

export default DashboardSkeleton;
