import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Clock, Info } from "lucide-react";
import styles from "./XPCatcherGame.module.css";
import { gameConfig } from "../../data/levelData";

let itemIdCounter = 0;

function XPCatcherGame({ onBack, onComplete }) {
  const [started, setStarted] = useState(false);
  const [timeLeft, setTimeLeft] = useState(gameConfig.durationSeconds);
  const [score, setScore] = useState(0);
  const [caughtCount, setCaughtCount] = useState(0);
  const [items, setItems] = useState([]);
  const [floatingScores, setFloatingScores] = useState([]);
  const arenaRef = useRef(null);
  const spawnIntervalRef = useRef(null);
  const timerIntervalRef = useRef(null);

  // Spawn a new falling item
  const spawnItem = useCallback(() => {
    const isVE = Math.random() > 0.6;
    const id = itemIdCounter++;
    const startX = Math.random() * 80 + 5; // 5% - 85% horizontal
    const duration = 2.5 + Math.random() * 1.5; // fall speed variance

    setItems((prev) => [
      ...prev,
      { id, type: isVE ? "VE" : "XP", x: startX, duration },
    ]);

    // auto-remove item after it falls past the bottom (missed)
    setTimeout(() => {
      setItems((prev) => prev.filter((it) => it.id !== id));
    }, duration * 1000 + 100);
  }, []);

  const handleCatch = (item, e) => {
    e.stopPropagation();
    setItems((prev) => prev.filter((it) => it.id !== item.id));

    const points = item.type === "VE" ? 15 : 10;
    setScore((s) => s + points);
    setCaughtCount((c) => c + 1);

    // floating +score feedback
    const rect = arenaRef.current?.getBoundingClientRect();
    const fx = e.clientX - (rect?.left || 0);
    const fy = e.clientY - (rect?.top || 0);
    const floatId = itemIdCounter++;
    setFloatingScores((prev) => [
      ...prev,
      { id: floatId, x: fx, y: fy, text: `+${points}` },
    ]);
    setTimeout(() => {
      setFloatingScores((prev) => prev.filter((f) => f.id !== floatId));
    }, 700);
  };

  const startGame = () => {
    setStarted(true);
    setScore(0);
    setCaughtCount(0);
    setTimeLeft(gameConfig.durationSeconds);
    setItems([]);
  };

  // Timer countdown
  useEffect(() => {
    if (!started) return;
    timerIntervalRef.current = setInterval(() => {
      setTimeLeft((t) => {
        if (t <= 1) {
          clearInterval(timerIntervalRef.current);
          return 0;
        }
        return t - 1;
      });
    }, 1000);
    return () => clearInterval(timerIntervalRef.current);
  }, [started]);

  // Item spawning
  useEffect(() => {
    if (!started || timeLeft <= 0) return;
    spawnIntervalRef.current = setInterval(spawnItem, 550);
    return () => clearInterval(spawnIntervalRef.current);
  }, [started, timeLeft, spawnItem]);

  // End game when timer hits 0
  useEffect(() => {
    if (started && timeLeft === 0) {
      clearInterval(spawnIntervalRef.current);
      const finalTimer = setTimeout(() => {
        onComplete(score);
      }, 600);
      return () => clearTimeout(finalTimer);
    }
  }, [timeLeft, started, score, onComplete]);

  return (
    <div className={styles.page}>
      <div className={styles.topbar}>
        <button className={styles.backBtn} onClick={onBack}>
          <ArrowLeft size={18} />
        </button>
        {started && (
          <div className={styles.timer}>
            <Clock size={14} />
            00:{String(timeLeft).padStart(2, "0")}
          </div>
        )}
      </div>

      <div className={styles.titleRow}>
        <h4>
          {gameConfig.name} <Info size={15} color="#9294b3" />
        </h4>
        <p>{gameConfig.description}</p>
      </div>

      <div className={styles.scoreBar}>
        <div className={styles.scoreItem}>
          <div className={styles.scoreValue}>{score}</div>
          <div className={styles.scoreLabel}>Score</div>
        </div>
        <div className={styles.scoreItem}>
          <div className={styles.scoreValue}>{caughtCount}</div>
          <div className={styles.scoreLabel}>Caught</div>
        </div>
      </div>

      <div className={styles.arena} ref={arenaRef}>
        {!started && (
          <div className={styles.startOverlay}>
            <h5>Ready to Catch?</h5>
            <p>
              Tap the falling XP orbs and VE coins before they disappear.
              You have {gameConfig.durationSeconds} seconds!
            </p>
            <button className={styles.startBtn} onClick={startGame}>
              Start Game
            </button>
          </div>
        )}

        <AnimatePresence>
          {items.map((item) => (
            <motion.div
              key={item.id}
              className={`${styles.fallingItem} ${
                item.type === "VE" ? styles.itemVE : styles.itemXP
              }`}
              style={{ left: `${item.x}%` }}
              initial={{ top: "-10%" }}
              animate={{ top: "90%" }}
              exit={{ opacity: 0, scale: 0.5 }}
              transition={{ duration: item.duration, ease: "linear" }}
              onClick={(e) => handleCatch(item, e)}
            >
              {item.type}
            </motion.div>
          ))}
        </AnimatePresence>

        {floatingScores.map((f) => (
          <div
            key={f.id}
            className={styles.floatScore}
            style={{ left: f.x, top: f.y }}
          >
            {f.text}
          </div>
        ))}

        <div className={styles.basket}></div>
      </div>
    </div>
  );
}

export default XPCatcherGame;
