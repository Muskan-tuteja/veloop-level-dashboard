import { ArrowLeft } from "lucide-react";
import styles from "./ComingSoon.module.css";

function ComingSoon({ label, onBack }) {
  return (
    <div className={styles.page}>
      <div className={styles.icon}>🚧</div>
      <div className={styles.title}>{label} — Coming Soon</div>
      <p className={styles.text}>
        This section is under development and will be available soon.
      </p>
      <button className={styles.backBtn} onClick={onBack}>
        <ArrowLeft size={14} style={{ marginRight: 6, verticalAlign: "middle" }} />
        Back to Dashboard
      </button>
    </div>
  );
}

export default ComingSoon;
