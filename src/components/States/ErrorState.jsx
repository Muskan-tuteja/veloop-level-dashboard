import styles from "./States.module.css";

function ErrorState({ onRetry }) {
  return (
    <div className={styles.errorPage}>
      <div className={styles.errorIcon}>⚠️</div>
      <div className={styles.errorTitle}>Unable to Load Level Progress</div>
      <p className={styles.errorText}>
        We couldn't load your level information right now.
      </p>
      <button className={styles.retryBtn} onClick={onRetry}>
        Try Again
      </button>
    </div>
  );
}

export default ErrorState;
