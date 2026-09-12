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
  Trophy,
} from "lucide-react";

import styles from "./XPCatcherGame.module.css";
import { gameConfig } from "../../data/levelData";

let itemIdCounter = 0;

const COMBO_TIERS = [
  { streak: 15, multiplier: 3 },
  { streak: 7, multiplier: 2 },
  { streak: 0, multiplier: 1 },
];

function getMultiplier(streak) {
  return (
    COMBO_TIERS.find((tier) => streak >= tier.streak)?.multiplier || 1
  );
}

function XPCatcherGame({ onBack, onComplete }) {
  const [started, setStarted] = useState(false);
  const [paused, setPaused] = useState(false);

  const [timeLeft, setTimeLeft] = useState(
    gameConfig.durationSeconds || 30
  );

  const [score, setScore] = useState(0);
  const [caughtCount, setCaughtCount] = useState(0);
  const [streak, setStreak] = useState(0);
  const [bestStreak, setBestStreak] = useState(0);

  const [items, setItems] = useState([]);
  const [floatingScores, setFloatingScores] = useState([]);

  const [lastCaught, setLastCaught] = useState(null);
  const [missed, setMissed] = useState(false);
  const [comboMessage, setComboMessage] = useState(null);
  const [showInfo, setShowInfo] = useState(false);

  const arenaRef = useRef(null);

  const timerRef = useRef(null);
  const spawnRef = useRef(null);
  const finishRef = useRef(null);

  const gameFinishedRef = useRef(false);
  const latestScoreRef = useRef(0);

  /* ================= SPAWN ITEM ================= */

  const spawnItem = useCallback((difficulty) => {
    const isVE = Math.random() > 0.64;

    const id = itemIdCounter++;

    const x = Math.random() * 82 + 5;

    const duration = Math.max(
      1.55,
      2.9 - difficulty * 1.1 + Math.random() * 0.65
    );

    const item = {
      id,
      type: isVE ? "VE" : "XP",
      x,
      duration,
    };

    setItems((prev) => [...prev, item]);

    window.setTimeout(() => {
      setItems((prev) => {
        const exists = prev.some(
          (current) => current.id === id
        );

        if (exists) {
          setStreak(0);
          setMissed(true);

          window.setTimeout(() => {
            setMissed(false);
          }, 350);
        }

        return prev.filter(
          (current) => current.id !== id
        );
      });
    }, duration * 1000 + 300);
  }, []);

  /* ================= FLOATING SCORE ================= */

  const showFloatingScore = useCallback(
    (item, event, points, multiplier) => {
      const rect =
        arenaRef.current?.getBoundingClientRect();

      const x =
        event.clientX - (rect?.left || 0);

      const y =
        event.clientY - (rect?.top || 0);

      const id = itemIdCounter++;

      setFloatingScores((prev) => [
        ...prev,
        {
          id,
          x,
          y,
          text:
            multiplier > 1
              ? `+${points} ×${multiplier}`
              : `+${points}`,
          type: item.type,
        },
      ]);

      window.setTimeout(() => {
        setFloatingScores((prev) =>
          prev.filter(
            (entry) => entry.id !== id
          )
        );
      }, 700);
    },
    []
  );

  /* ================= CATCH ================= */

  const handleCatch = (item, event) => {
    if (!started || paused) return;

    event.stopPropagation();

    setItems((prev) =>
      prev.filter(
        (current) => current.id !== item.id
      )
    );

    const basePoints =
      item.type === "VE" ? 15 : 10;

    const nextStreak = streak + 1;

    const multiplier =
      getMultiplier(nextStreak);

    const points =
      basePoints * multiplier;

    const nextScore =
      latestScoreRef.current + points;

    latestScoreRef.current = nextScore;

    setScore(nextScore);

    setCaughtCount((prev) => prev + 1);

    setStreak(nextStreak);

    setBestStreak((prev) =>
      Math.max(prev, nextStreak)
    );

    setLastCaught(item.type);
    setMissed(false);

    if (nextStreak === 7) {
      setComboMessage("2× COMBO!");
    }

    if (nextStreak === 15) {
      setComboMessage("3× COMBO!");
    }

    if (
      nextStreak === 7 ||
      nextStreak === 15
    ) {
      window.setTimeout(() => {
        setComboMessage(null);
      }, 900);
    }

    if (navigator.vibrate) {
      navigator.vibrate(12);
    }

    showFloatingScore(
      item,
      event,
      points,
      multiplier
    );

    window.setTimeout(() => {
      setLastCaught(null);
    }, 260);
  };

  /* ================= START GAME ================= */

  const startGame = () => {
    clearInterval(timerRef.current);
    clearInterval(spawnRef.current);
    clearTimeout(finishRef.current);

    gameFinishedRef.current = false;

    latestScoreRef.current = 0;

    setStarted(true);
    setPaused(false);

    setTimeLeft(
      gameConfig.durationSeconds || 30
    );

    setScore(0);
    setCaughtCount(0);
    setStreak(0);
    setBestStreak(0);

    setItems([]);
    setFloatingScores([]);

    setLastCaught(null);
    setMissed(false);
    setComboMessage(null);
    setShowInfo(false);
  };

  /* ================= VISIBILITY / PAUSE ================= */

  useEffect(() => {
    const handleVisibility = () => {
      if (!started) return;

      setPaused(document.hidden);
    };

    document.addEventListener(
      "visibilitychange",
      handleVisibility
    );

    return () => {
      document.removeEventListener(
        "visibilitychange",
        handleVisibility
      );
    };
  }, [started]);

  /* ================= TIMER ================= */

  useEffect(() => {
    if (
      !started ||
      paused ||
      timeLeft <= 0
    ) {
      return;
    }

    clearInterval(timerRef.current);

    timerRef.current =
      window.setInterval(() => {
        setTimeLeft((previous) => {
          if (previous <= 1) {
            clearInterval(
              timerRef.current
            );

            return 0;
          }

          return previous - 1;
        });
      }, 1000);

    return () => {
      clearInterval(timerRef.current);
    };
  }, [
    started,
    paused,
    timeLeft,
  ]);

  /* ================= SPAWNING ================= */

  useEffect(() => {
    if (
      !started ||
      paused ||
      timeLeft <= 0
    ) {
      clearInterval(spawnRef.current);
      return;
    }

    const duration =
      gameConfig.durationSeconds || 30;

    const difficulty =
      1 - timeLeft / duration;

    const spawnDelay = Math.max(
      380,
      650 - difficulty * 230
    );

    clearInterval(spawnRef.current);

    spawnRef.current =
      window.setInterval(() => {
        spawnItem(difficulty);
      }, spawnDelay);

    return () => {
      clearInterval(spawnRef.current);
    };
  }, [
    started,
    paused,
    timeLeft,
    spawnItem,
  ]);

  /* ================= GAME FINISH ================= */

  useEffect(() => {
    if (
      !started ||
      timeLeft !== 0 ||
      gameFinishedRef.current
    ) {
      return;
    }

    gameFinishedRef.current = true;

    clearInterval(timerRef.current);
    clearInterval(spawnRef.current);

    /*
      Use the latest score from ref.
      This prevents result screen from receiving
      an old score value.
    */

    const finalScore =
      latestScoreRef.current;

    finishRef.current =
      window.setTimeout(() => {
        onComplete(finalScore);
      }, 500);

    return () => {
      clearTimeout(
        finishRef.current
      );
    };
  }, [
    started,
    timeLeft,
    onComplete,
  ]);

  /* ================= CLEANUP ================= */

  useEffect(() => {
    return () => {
      clearInterval(timerRef.current);
      clearInterval(spawnRef.current);
      clearTimeout(finishRef.current);
    };
  }, []);

  /* ================= UI VALUES ================= */

  const timerDanger =
    timeLeft <= 5 && started;

  const duration =
    gameConfig.durationSeconds || 30;

  const progressPct = Math.max(
    0,
    Math.min(
      100,
      (timeLeft / duration) * 100
    )
  );

  const multiplier =
    getMultiplier(streak);

  return (
    <main className={styles.page}>
      <div
        className={styles.backgroundGlow}
      />

      <div
        className={styles.backgroundGlowTwo}
      />

      {/* ================= TOP BAR ================= */}

      <header className={styles.topbar}>
        <button
          type="button"
          className={styles.backBtn}
          onClick={onBack}
          aria-label="Back to dashboard"
        >
          <ArrowLeft size={18} />
        </button>

        {started ? (
          <motion.div
            className={`${styles.timer} ${
              timerDanger
                ? styles.timerDanger
                : ""
            }`}
            animate={
              timerDanger
                ? {
                    scale: [1, 1.08, 1],
                  }
                : { scale: 1 }
            }
            transition={{
              duration: 0.6,
              repeat: timerDanger
                ? Infinity
                : 0,
            }}
          >
            <Clock3 size={15} />

            <span>
              00:
              {String(timeLeft).padStart(
                2,
                "0"
              )}
            </span>
          </motion.div>
        ) : (
          <div
            className={styles.topStatus}
          >
            <Sparkles size={13} />
            QUICK PLAY
          </div>
        )}
      </header>

      {/* ================= TIMER BAR ================= */}

      {started && (
        <div
          className={styles.progressTrack}
          aria-label="Time remaining"
        >
          <motion.div
            className={`${styles.progressFill} ${
              timerDanger
                ? styles.progressDanger
                : ""
            }`}
            animate={{
              width: `${progressPct}%`,
            }}
            transition={{
              duration: 0.3,
              ease: "linear",
            }}
          />
        </div>
      )}

      {/* ================= HEADER ================= */}

      <section className={styles.header}>
        <div
          className={styles.gameEyebrow}
        >
          <Sparkles size={13} />
          QUICK CHALLENGE
        </div>

        <div
          className={styles.titleLine}
        >
          <h1>{gameConfig.name}</h1>

          <button
            type="button"
            className={styles.infoBtn}
            onClick={() =>
              setShowInfo(
                (prev) => !prev
              )
            }
            aria-label="Game information"
            aria-expanded={showInfo}
          >
            <Info size={15} />
          </button>
        </div>

        <p>
          {gameConfig.description}
        </p>

        <AnimatePresence>
          {showInfo && (
            <motion.div
              className={
                styles.infoPopover
              }
              initial={{
                opacity: 0,
                y: -6,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              exit={{
                opacity: 0,
                y: -6,
              }}
            >
              Catch rewards before
              they reach the bottom.
              Chain catches to build
              your streak. At 7 catches
              you get 2× points, and at
              15 catches you get 3×
              points.
            </motion.div>
          )}
        </AnimatePresence>
      </section>

      {/* ================= SCORE HUD ================= */}

      <section className={styles.scoreBar}>
        <div
          className={styles.scoreCard}
        >
          <div
            className={`${styles.scoreIcon} ${styles.scorePurple}`}
          >
            <Zap size={16} />
          </div>

          <div>
            <span>Score</span>
            <strong>{score}</strong>
          </div>
        </div>

        <div
          className={`${styles.scoreCard} ${
            streak >= 7
              ? styles.scoreCardHot
              : ""
          }`}
        >
          <div
            className={`${styles.scoreIcon} ${styles.scoreGold}`}
          >
            <Flame size={16} />
          </div>

          <div>
            <span>Streak</span>

            <strong>
              {streak}

              {multiplier > 1
                ? ` ×${multiplier}`
                : ""}
            </strong>
          </div>
        </div>

        <div
          className={styles.scoreCard}
        >
          <div
            className={`${styles.scoreIcon} ${styles.scoreBlue}`}
          >
            <Target size={16} />
          </div>

          <div>
            <span>Caught</span>
            <strong>
              {caughtCount}
            </strong>
          </div>
        </div>
      </section>

      {/* ================= ARENA ================= */}

      <section
        ref={arenaRef}
        className={`${styles.arena} ${
          lastCaught
            ? styles.arenaHit
            : ""
        } ${
          missed
            ? styles.arenaMiss
            : ""
        }`}
      >
        <div
          className={styles.arenaHeader}
        >
          <div
            className={
              styles.arenaTitle
            }
          >
            <span
              className={
                styles.liveDot
              }
            />
            Catch the rewards
          </div>

          <div
            className={styles.legend}
          >
            <span>
              <i
                className={
                  styles.legendXP
                }
              />
              XP
            </span>

            <span>
              <i
                className={
                  styles.legendVE
                }
              />
              VE
            </span>
          </div>
        </div>

        {/* ================= START SCREEN ================= */}

        {!started && (
          <motion.div
            className={
              styles.startOverlay
            }
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
            }}
          >
            <motion.div
              className={
                styles.startIcon
              }
              initial={{
                scale: 0.7,
                rotate: -8,
              }}
              animate={{
                scale: 1,
                rotate: 0,
              }}
              transition={{
                duration: 0.45,
                ease: "backOut",
              }}
            >
              <Zap
                size={31}
                fill="currentColor"
              />
            </motion.div>

            <div
              className={
                styles.readyBadge
              }
            >
              <Sparkles size={12} />
              READY TO PLAY?
            </div>

            <h2>Catch the XP</h2>

            <p>
              Tap the falling rewards
              before they disappear.
              Keep your streak alive
              to earn bigger scores.
            </p>

            <div
              className={styles.rules}
            >
              <div
                className={
                  styles.ruleXP
                }
              >
                <Zap size={15} />
                <span>XP Orb</span>
                <strong>+10</strong>
              </div>

              <div
                className={
                  styles.ruleVE
                }
              >
                <Gem size={15} />
                <span>VE Gem</span>
                <strong>+15</strong>
              </div>

              <div
                className={
                  styles.ruleCombo
                }
              >
                <Flame size={15} />
                <span>7 streak</span>
                <strong>×2</strong>
              </div>

              <div
                className={
                  styles.ruleCombo
                }
              >
                <Trophy size={15} />
                <span>15 streak</span>
                <strong>×3</strong>
              </div>
            </div>

            <button
              type="button"
              className={
                styles.startBtn
              }
              onClick={startGame}
            >
              <Zap
                size={17}
                fill="currentColor"
              />
              Start Game
            </button>

            <small>
              {duration}s challenge
            </small>
          </motion.div>
        )}

        {/* ================= PAUSED ================= */}

        {started && paused && (
          <motion.div
            className={
              styles.pausedOverlay
            }
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
            }}
          >
            <div
              className={
                styles.pauseIcon
              }
            >
              <Clock3 size={26} />
            </div>

            <h2>Game Paused</h2>

            <p>
              Return to this tab to
              continue playing.
            </p>
          </motion.div>
        )}

        {/* ================= COMBO ================= */}

        <AnimatePresence>
          {comboMessage && (
            <motion.div
              className={
                styles.comboMessage
              }
              initial={{
                opacity: 0,
                scale: 0.7,
                y: 10,
              }}
              animate={{
                opacity: 1,
                scale: 1,
                y: 0,
              }}
              exit={{
                opacity: 0,
                scale: 0.8,
                y: -15,
              }}
            >
              <Flame size={17} />
              {comboMessage}
            </motion.div>
          )}
        </AnimatePresence>

        {/* ================= FALLING ITEMS ================= */}

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
                top: "-10%",
                opacity: 0,
                scale: 0.65,
              }}
              animate={{
                top: "84%",
                opacity: 1,
                scale: 1,
              }}
              exit={{
                opacity: 0,
                scale: 0.4,
              }}
              transition={{
                duration: item.duration,
                ease: "linear",
              }}
              onPointerDown={(event) =>
                handleCatch(
                  item,
                  event
                )
              }
            >
              <span
                className={
                  styles.orbShine
                }
              />

              <span
                className={
                  styles.orbIcon
                }
              >
                {item.type === "VE" ? (
                  <Gem size={20} />
                ) : (
                  <Zap
                    size={20}
                    fill="currentColor"
                  />
                )}
              </span>

              <span
                className={
                  styles.itemValue
                }
              >
                +
                {item.type === "VE"
                  ? 15
                  : 10}
              </span>
            </motion.button>
          ))}
        </AnimatePresence>

        {/* ================= FLOATING SCORE ================= */}

        <AnimatePresence>
          {floatingScores.map(
            (item) => (
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
                  y: -38,
                }}
                exit={{
                  opacity: 0,
                  y: -55,
                }}
                transition={{
                  duration: 0.65,
                }}
              >
                {item.text}
              </motion.div>
            )
          )}
        </AnimatePresence>

        {/* ================= CATCH ZONE ================= */}

        <div
          className={styles.catchZone}
        >
          <span>DROP ZONE</span>
        </div>

        {/* ================= BASKET ================= */}

        <div
          className={`${styles.basket} ${
            lastCaught
              ? styles.basketPulse
              : ""
          }`}
        >
          <div
            className={
              styles.basketGlow
            }
          />

          <div
            className={
              styles.basketHandle
            }
          />

          <div
            className={
              styles.basketBody
            }
          >
            <Zap
              size={19}
              fill="currentColor"
            />
          </div>
        </div>

        {/* ================= HINT ================= */}

        {started && !paused && (
          <div
            className={
              styles.gameHint
            }
          >
            Tap a reward to catch
            it
          </div>
        )}

        {missed && (
          <motion.div
            className={
              styles.missMessage
            }
            initial={{
              opacity: 0,
              y: 5,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            exit={{
              opacity: 0,
            }}
          >
            MISS · STREAK RESET
          </motion.div>
        )}
      </section>

      {/* ================= BOTTOM STATS ================= */}

      <div
        className={styles.bottomInfo}
      >
        <div>
          <span>
            Current score
          </span>

          <strong>
            {score} pts
          </strong>
        </div>

        <div>
          <span>
            Best streak
          </span>

          <strong>
            {bestStreak}
          </strong>
        </div>

        <div>
          <span>
            Time left
          </span>

          <strong>
            {timeLeft}s
          </strong>
        </div>
      </div>
    </main>
  );
}

export default XPCatcherGame;