import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  Clock3,
  Info,
  Zap,
  Gem,
  Target,
  Flame,
  Sparkles,
} from "lucide-react";

import styles from "./XPCatcherGame.module.css";
import { gameConfig } from "../../data/levelData";

let itemIdCounter = 0;

// Streak thresholds that bump the score multiplier
const COMBO_TIERS = [
  { streak: 15, multiplier: 3 },
  { streak: 7, multiplier: 2 },
  { streak: 0, multiplier: 1 },
];

function getMultiplier(streak) {
  return COMBO_TIERS.find((tier) => streak >= tier.streak).multiplier;
}

function XPCatcherGame({ onBack, onComplete }) {
  const [started, setStarted] = useState(false);
  const [paused, setPaused] = useState(false);
  const [timeLeft, setTimeLeft] = useState(gameConfig.durationSeconds);
  const [score, setScore] = useState(0);
  const [caughtCount, setCaughtCount] = useState(0);
  const [streak, setStreak] = useState(0);
  const [bestStreak, setBestStreak] = useState(0);
  const [items, setItems] = useState([]);
  const [floatingScores, setFloatingScores] = useState([]);
  const [lastCaught, setLastCaught] = useState(null);
  const [showInfo, setShowInfo] = useState(false);

  const arenaRef = useRef(null);
  const spawnIntervalRef = useRef(null);
  const timerIntervalRef = useRef(null);
  const finishTimeoutRef = useRef(null);

  const spawnItem = useCallback((difficulty) => {
    const isVE = Math.random() > 0.62;
    const id = itemIdCounter++;

    const startX = Math.random() * 78 + 8;
    const baseDuration = 2.4 + Math.random() * 1.4;
    // Items fall faster as the round progresses
    const duration = Math.max(1.3, baseDuration - difficulty * 0.9);

    setItems((prev) => [
      ...prev,
      {
        id,
        type: isVE ? "VE" : "XP",
        x: startX,
        duration,
      },
    ]);

    window.setTimeout(() => {
      setItems((prev) => {
        const wasMissed = prev.some((item) => item.id === id);
        if (wasMissed) {
          // Reached the bottom without being caught — streak resets
          setStreak(0);
        }
        return prev.filter((item) => item.id !== id);
      });
    }, duration * 1000 + 200);
  }, []);

  const handleCatch = (item, e) => {
    e.stopPropagation();

    setItems((prev) =>
      prev.filter((current) => current.id !== item.id)
    );

    const basePoints = item.type === "VE" ? 15 : 10;
    const nextStreak = streak + 1;
    const multiplier = getMultiplier(nextStreak);
    const points = basePoints * multiplier;

    setStreak(nextStreak);
    setBestStreak((prev) => Math.max(prev, nextStreak));
    setScore((prev) => prev + points);
    setCaughtCount((prev) => prev + 1);
    setLastCaught(item.type);

    if (navigator.vibrate) navigator.vibrate(12);

    const rect = arenaRef.current?.getBoundingClientRect();

    const fx = e.clientX - (rect?.left || 0);
    const fy = e.clientY - (rect?.top || 0);

    const floatId = itemIdCounter++;

    setFloatingScores((prev) => [
      ...prev,
      {
        id: floatId,
        x: fx,
        y: fy,
        text: multiplier > 1 ? `+${points} ×${multiplier}` : `+${points}`,
        type: item.type,
      },
    ]);

    window.setTimeout(() => {
      setFloatingScores((prev) =>
        prev.filter((item) => item.id !== floatId)
      );
    }, 750);

    window.setTimeout(() => {
      setLastCaught(null);
    }, 250);
  };

  const startGame = () => {
    clearInterval(timerIntervalRef.current);
    clearInterval(spawnIntervalRef.current);
    clearTimeout(finishTimeoutRef.current);

    setStarted(true);
    setPaused(false);
    setScore(0);
    setCaughtCount(0);
    setStreak(0);
    setBestStreak(0);
    setTimeLeft(gameConfig.durationSeconds);
    setItems([]);
    setFloatingScores([]);
    setLastCaught(null);
    setShowInfo(false);
  };

  // Pause automatically if the tab/app loses focus — avoids the clock
  // burning down while the player isn't actually looking
  useEffect(() => {
    const handleVisibility = () => setPaused(document.hidden);
    document.addEventListener("visibilitychange", handleVisibility);
    return () =>
      document.removeEventListener("visibilitychange", handleVisibility);
  }, []);

  useEffect(() => {
    if (!started || paused) return;

    timerIntervalRef.current = setInterval(() => {
      setTimeLeft((time) => {
        if (time <= 1) {
          clearInterval(timerIntervalRef.current);
          return 0;
        }

        return time - 1;
      });
    }, 1000);

    return () => clearInterval(timerIntervalRef.current);
  }, [started, paused]);

  useEffect(() => {
    if (!started || timeLeft <= 0 || paused) return;

    const difficulty = 1 - timeLeft / gameConfig.durationSeconds;
    const spawnDelay = Math.max(320, 560 - difficulty * 220);

    spawnIntervalRef.current = setInterval(() => {
      spawnItem(difficulty);
    }, spawnDelay);

    return () => clearInterval(spawnIntervalRef.current);
  }, [started, timeLeft, paused, spawnItem]);

  useEffect(() => {
    if (!started || timeLeft !== 0) return;

    clearInterval(spawnIntervalRef.current);

    finishTimeoutRef.current = setTimeout(() => {
      onComplete(score);
    }, 500);

    return () => clearTimeout(finishTimeoutRef.current);
  }, [started, timeLeft, score, onComplete]);

  useEffect(() => {
    return () => {
      clearInterval(timerIntervalRef.current);
      clearInterval(spawnIntervalRef.current);
      clearTimeout(finishTimeoutRef.current);
    };
  }, []);

  const timerDanger = timeLeft <= 5 && started;
  const progressPct = Math.max(
    0,
    Math.min(100, (timeLeft / gameConfig.durationSeconds) * 100)
  );

  return (
    <div className={styles.page}>
      <div className={styles.backgroundGlow} />
      <div className={styles.backgroundGlowTwo} />

      {/* TOP BAR */}
      <header className={styles.topbar}>
        <button
          className={styles.backBtn}
          onClick={onBack}
          aria-label="Back"
        >
          <ArrowLeft size={18} />
        </button>

        {started && (
          <motion.div
            animate={
              timerDanger
                ? {
                    scale: [1, 1.08, 1],
                  }
                : {}
            }
            transition={{
              duration: 0.6,
              repeat: timerDanger ? Infinity : 0,
            }}
            className={`${styles.timer} ${
              timerDanger ? styles.timerDanger : ""
            }`}
          >
            <Clock3 size={15} />

            <span>
              00:{String(timeLeft).padStart(2, "0")}
            </span>
          </motion.div>
        )}
      </header>

      {/* TIMER PROGRESS */}
      {started && (
        <div className={styles.progressTrack}>
          <motion.div
            className={`${styles.progressFill} ${
              timerDanger ? styles.progressDanger : ""
            }`}
            animate={{ width: `${progressPct}%` }}
            transition={{ duration: 0.35, ease: "linear" }}
          />
        </div>
      )}

      {/* HEADER */}
      <section className={styles.header}>
        <div className={styles.gameEyebrow}>
          <Sparkles size={13} />
          QUICK CHALLENGE
        </div>

        <div className={styles.titleLine}>
          <h1>{gameConfig.name}</h1>

          <button
            className={styles.infoBtn}
            aria-label="Game information"
            aria-expanded={showInfo}
            type="button"
            onClick={() => setShowInfo((prev) => !prev)}
          >
            <Info size={15} />
          </button>
        </div>

        <p>{gameConfig.description}</p>

        <AnimatePresence>
          {showInfo && (
            <motion.div
              className={styles.infoPopover}
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              onClick={() => setShowInfo(false)}
              role="note"
            >
              Chain catches without missing to build a streak — 7 in a row
              doubles your points, 15 in a row triples them. Miss one and the
              streak resets.
            </motion.div>
          )}
        </AnimatePresence>
      </section>

      {/* SCORE HUD */}
      <section className={styles.scoreBar}>
        <div className={styles.scoreCard}>
          <div className={`${styles.scoreIcon} ${styles.scorePurple}`}>
            <Zap size={17} />
          </div>

          <div>
            <span>Score</span>
            <strong>{score}</strong>
          </div>
        </div>

        <div className={styles.scoreCard}>
          <div className={`${styles.scoreIcon} ${styles.scoreBlue}`}>
            <Target size={17} />
          </div>

          <div>
            <span>Caught</span>
            <strong>{caughtCount}</strong>
          </div>
        </div>

        <div
          className={`${styles.scoreCard} ${
            streak >= 7 ? styles.scoreCardHot : ""
          }`}
        >
          <div className={`${styles.scoreIcon} ${styles.scoreGold}`}>
            <Flame size={17} />
          </div>

          <div>
            <span>Streak</span>
            <strong>
              {streak}
              {getMultiplier(streak) > 1 ? ` ×${getMultiplier(streak)}` : ""}
            </strong>
          </div>
        </div>
      </section>

      {/* GAME ARENA */}
      <section
        className={`${styles.arena} ${
          lastCaught ? styles.arenaHit : ""
        }`}
        ref={arenaRef}
      >
        <div className={styles.arenaHeader}>
          <span>Catch the rewards</span>

          <div className={styles.legend}>
            <span>
              <i className={styles.legendXP} />
              XP
            </span>

            <span>
              <i className={styles.legendVE} />
              VE
            </span>
          </div>
        </div>

        {!started && (
          <motion.div
            className={styles.startOverlay}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <motion.div
              className={styles.startIcon}
              initial={{ scale: 0.7 }}
              animate={{ scale: 1 }}
              transition={{
                duration: 0.45,
                ease: "backOut",
              }}
            >
              <Zap size={32} fill="currentColor" />
            </motion.div>

            <div className={styles.readyBadge}>
              <Sparkles size={12} />
              READY?
            </div>

            <h2>Catch the XP!</h2>

            <p>
              Tap the falling rewards before they disappear. Chain catches
              to build a streak and multiply your points.
            </p>

            <div className={styles.rules}>
              <div>
                <Zap size={15} />
                <span>XP Orb</span>
                <strong>+10</strong>
              </div>

              <div>
                <Gem size={15} />
                <span>VE Gem</span>
                <strong>+15</strong>
              </div>

              <div>
                <Flame size={15} />
                <span>7 streak</span>
                <strong>×2</strong>
              </div>

              <div>
                <Flame size={15} />
                <span>15 streak</span>
                <strong>×3</strong>
              </div>
            </div>

            <button
              className={styles.startBtn}
              onClick={startGame}
            >
              <Zap size={17} fill="currentColor" />
              Start Game
            </button>

            <small>
              {gameConfig.durationSeconds} seconds challenge
            </small>
          </motion.div>
        )}

        {started && paused && (
          <motion.div
            className={styles.pausedOverlay}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <Clock3 size={26} />
            <h2>Paused</h2>
            <p>Come back to this tab to keep catching.</p>
          </motion.div>
        )}

        {/* FALLING ITEMS */}
        <AnimatePresence>
          {items.map((item) => (
            <motion.button
              key={item.id}
              type="button"
              aria-label={`Catch ${item.type}`}
              className={`${styles.fallingItem} ${
                item.type === "VE"
                  ? styles.itemVE
                  : styles.itemXP
              }`}
              style={{
                left: `${item.x}%`,
              }}
              initial={{
                top: "-12%",
                opacity: 0,
                scale: 0.7,
              }}
              animate={{
                top: "91%",
                opacity: 1,
                scale: 1,
              }}
              exit={{
                opacity: 0,
                scale: 0.35,
              }}
              transition={{
                duration: item.duration,
                ease: "linear",
              }}
              onPointerDown={(e) =>
                started && !paused && handleCatch(item, e)
              }
            >
              <span className={styles.orbShine} />

              {item.type === "VE" ? (
                <Gem size={20} />
              ) : (
                <Zap
                  size={20}
                  fill="currentColor"
                />
              )}

              <span className={styles.itemValue}>
                +{item.type === "VE" ? 15 : 10}
              </span>
            </motion.button>
          ))}
        </AnimatePresence>

        {/* FLOATING SCORE */}
        <AnimatePresence>
          {floatingScores.map((item) => (
            <motion.div
              key={item.id}
              className={`${styles.floatScore} ${
                item.type === "VE"
                  ? styles.floatVE
                  : ""
              }`}
              style={{
                left: item.x,
                top: item.y,
              }}
              initial={{
                opacity: 0,
                scale: 0.7,
                y: 8,
              }}
              animate={{
                opacity: 1,
                scale: 1,
                y: -35,
              }}
              exit={{
                opacity: 0,
                y: -55,
              }}
              transition={{
                duration: 0.7,
              }}
            >
              {item.text}
            </motion.div>
          ))}
        </AnimatePresence>

        {/* BASKET */}
        <div
          className={`${styles.basket} ${
            lastCaught ? styles.basketPulse : ""
          }`}
        >
          <div className={styles.basketGlow} />
          <div className={styles.basketHandle} />
          <div className={styles.basketBody}>
            <Zap size={18} />
          </div>
        </div>

        {/* BOTTOM HINT */}
        {started && !paused && (
          <div className={styles.gameHint}>
            <span>Tap rewards to catch them</span>
          </div>
        )}
      </section>

      {/* FOOTER STATS */}
      <div className={styles.bottomInfo}>
        <div>
          <span>Current score</span>
          <strong>{score} pts</strong>
        </div>

        <div>
          <span>Best streak</span>
          <strong>{bestStreak}</strong>
        </div>

        <div>
          <span>Time</span>
          <strong>{timeLeft}s</strong>
        </div>
      </div>
    </div>
  );
}

export default XPCatcherGame;
