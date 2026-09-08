import { motion } from "framer-motion";
import {
  Menu,
  Bell,
  Zap,
  ListChecks,
  Flame,
  ChevronRight,
  Play,
  ClipboardList,
  Users,
  Gamepad2,
  Magnet,
  Trophy,
  Wallet,
  User,
  Home,
  Gift,
} from "lucide-react";

import styles from "./DashboardHome.module.css";

import LevelRoadmap from "../../components/LevelRoadmap/LevelRoadmap";
import NextLevelReward from "../../components/NextLevelReward/NextLevelReward";

import {
  userLevelData,
  getXPRemaining,
  todaysBoost,
  earningFeatures,
} from "../../data/levelData";

const iconMap = {
  play: Play,
  clipboard: ClipboardList,
  users: Users,
  gamepad: Gamepad2,
  flame: Flame,
  magnet: Magnet,
};

const featureColors = [
  "purple",
  "green",
  "orange",
  "blue",
  "red",
  "cyan",
];

function DashboardHome({
  onPlayGame,
  onEarnMore,
  onViewActivity,
  onSimulateLevelUp,
  onRewards,
  onWallet,
  onProfile,
}) {
  const { currentLevel, currentXP, requiredXP } = userLevelData;

  const xpRemaining = getXPRemaining();

  const progressPercent = Math.min(
    100,
    Math.round((currentXP / requiredXP) * 100)
  );

  return (
    <div className={styles.page}>

      {/* Background */}
      <div className={styles.backgroundGlow} />
      <div className={styles.backgroundGlowTwo} />

      {/* Floating particles */}
      <div className={`${styles.bgParticle} ${styles.p1}`} />
      <div className={`${styles.bgParticle} ${styles.p2}`} />
      <div className={`${styles.bgParticle} ${styles.p3}`} />
      <div className={`${styles.bgParticle} ${styles.p4}`} />
      <div className={`${styles.bgParticle} ${styles.p5}`} />

      <div className={styles.content}>

        {/* ================= TOP BAR ================= */}

        <header className={styles.topbar}>

          <button
            className={styles.iconBtn}
            aria-label="Open menu"
          >
            <Menu size={20} />
          </button>

          <div className={styles.logo}>
            <span className={styles.logoDot} />
            VeLooper
          </div>

          <button
            className={styles.iconBtn}
            onClick={onViewActivity}
            aria-label="Notifications"
          >
            <Bell size={19} />

            <span className={styles.notifDot} />
          </button>

        </header>


        {/* ================= GREETING ================= */}

        <motion.section
          className={styles.greeting}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
        >
          <span className={styles.eyebrow}>
            YOUR DAILY JOURNEY
          </span>

          <h1>
            Good Morning,
            <span> VeLooper 👋</span>
          </h1>

          <p>
            Level up your journey and unlock epic rewards every day.
          </p>
        </motion.section>


        {/* ================= LEVEL CARD ================= */}

        <motion.section
          className={styles.levelCard}
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            delay: 0.1,
            duration: 0.45,
          }}
        >

          <div className={styles.levelCardGlow} />

          {/* Badge */}
          <div className={styles.hexBadge}>

            <svg viewBox="0 0 100 100">
              <defs>
                <linearGradient
                  id="hexGrad"
                  x1="0"
                  y1="0"
                  x2="1"
                  y2="1"
                >
                  <stop
                    offset="0%"
                    stopColor="#fde047"
                  />

                  <stop
                    offset="100%"
                    stopColor="#f59e0b"
                  />
                </linearGradient>
              </defs>

              <polygon
                points="50,3 93,26 93,74 50,97 7,74 7,26"
                fill="url(#hexGrad)"
              />
            </svg>

            <div className={styles.hexBadgeContent}>
              <span>LEVEL</span>

              <strong>
                {String(currentLevel).padStart(2, "0")}
              </strong>
            </div>

          </div>


          {/* XP */}
          <div className={styles.levelInfo}>

            <div className={styles.xpHeader}>

              <div>
                <span className={styles.smallLabel}>
                  CURRENT XP
                </span>

                <strong className={styles.xpValue}>
                  {currentXP.toLocaleString()}
                  <small> XP</small>
                </strong>
              </div>

              <div className={styles.nextLevel}>
                <span>Next Level</span>
                <strong>
                  {String(currentLevel + 1).padStart(2, "0")}
                </strong>
              </div>

            </div>


            <div className={styles.progressTrack}>

              <motion.div
                className={styles.progressFill}
                initial={{ width: 0 }}
                animate={{
                  width: `${progressPercent}%`,
                }}
                transition={{
                  delay: 0.35,
                  duration: 1,
                  ease: "easeOut",
                }}
              />

            </div>


            <div className={styles.progressBottom}>

              <span>
                {currentXP.toLocaleString()} /
                {" "}
                {requiredXP.toLocaleString()} XP
              </span>

              <strong>
                {progressPercent}%
              </strong>

            </div>

          </div>

        </motion.section>


        {/* ================= NEXT REWARD ================= */}

        <NextLevelReward />


        {/* ================= TODAY BOOST ================= */}

        <section className={styles.section}>

          <div className={styles.sectionHeading}>

            <div className={styles.headingIcon}>
              <Zap size={16} />
            </div>

            <div>
              <h2>Today's Boost</h2>
              <p>Your progress today</p>
            </div>

          </div>


          <div className={styles.boostGrid}>

            <div className={styles.boostCard}>

              <div className={`${styles.boostIcon} ${styles.yellow}`}>
                <Zap size={18} />
              </div>

              <strong>
                {todaysBoost.xpEarned} XP
              </strong>

              <span>
                XP Earned
              </span>

            </div>


            <div className={styles.boostCard}>

              <div className={`${styles.boostIcon} ${styles.purple}`}>
                <ListChecks size={18} />
              </div>

              <strong>
                {todaysBoost.tasksDone}
              </strong>

              <span>
                Tasks Done
              </span>

            </div>


            <div className={styles.boostCard}>

              <div className={`${styles.boostIcon} ${styles.orange}`}>
                <Flame size={18} />
              </div>

              <strong>
                {todaysBoost.streakDays} Days
              </strong>

              <span>
                Streak
              </span>

            </div>

          </div>

        </section>


        {/* ================= ROADMAP ================= */}

        <section className={styles.roadmapSection}>
          <LevelRoadmap />
        </section>


        {/* ================= EARN MORE ================= */}

        <section className={styles.section}>

          <div className={styles.earnHeader}>

            <div className={styles.sectionHeading}>

              <div className={`${styles.headingIcon} ${styles.headingPurple}`}>
                <Gift size={16} />
              </div>

              <div>
                <h2>Earn More</h2>

                <p>
                  Complete activities & earn rewards
                </p>
              </div>

            </div>


            <button
              className={styles.arrowBtn}
              onClick={onEarnMore}
              aria-label="View all earning activities"
            >
              <ChevronRight size={19} />
            </button>

          </div>


          <div className={styles.earnGrid}>

            {earningFeatures.map((feature, i) => {

              const Icon =
                iconMap[feature.icon] || Play;

              const color =
                featureColors[i % featureColors.length];

              const onClick =
                feature.id === "mini-games" ||
                feature.id === "xp-catcher"
                  ? onPlayGame
                  : onEarnMore;

              return (
                <motion.button
                  type="button"
                  key={feature.id}
                  className={styles.earnCard}
                  onClick={onClick}
                  initial={{
                    opacity: 0,
                    y: 15,
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                  }}
                  transition={{
                    delay: 0.15 + i * 0.05,
                    duration: 0.3,
                  }}
                >

                  <div
                    className={`${styles.earnCardIcon} ${styles[color]}`}
                  >
                    <Icon size={18} />
                  </div>

                  <span>
                    {feature.title}
                  </span>

                  <ChevronRight
                    className={styles.cardArrow}
                    size={14}
                  />

                </motion.button>
              );
            })}

          </div>

        </section>


        {/* ================= REWARD CARD ================= */}

        <motion.section
          className={styles.chestCard}
          initial={{
            opacity: 0,
            y: 15,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            delay: 0.4,
            duration: 0.4,
          }}
        >

          <div className={styles.chestContent}>

            <span className={styles.rewardTag}>
              LEVEL REWARD
            </span>

            <h2>
              Level{" "}
              {String(currentLevel).padStart(2, "0")}
              {" "}Rewards
            </h2>

            <p>
              Amazing rewards await you!
              {" "}
              <strong>
                {xpRemaining.toLocaleString()} XP
              </strong>
              {" "}to go.
            </p>

            <button
              className={styles.chestBtn}
              onClick={onSimulateLevelUp}
            >
              <Trophy size={15} />
              View Rewards
            </button>

          </div>


          <div className={styles.giftBox}>
            🎁
          </div>

        </motion.section>

      </div>


      {/* ================= BOTTOM NAV ================= */}

      <nav className={styles.bottomNav}>

        <button
          className={`${styles.navItem} ${styles.active}`}
        >
          <Home size={19} />
          <span>Home</span>
        </button>


        <button
          className={styles.navItem}
          onClick={onEarnMore}
        >
          <Zap size={19} />
          <span>Earn</span>
        </button>


        <button
          className={styles.navItem}
          onClick={onRewards}
        >
          <Trophy size={19} />
          <span>Rewards</span>
        </button>


        <button
          className={styles.navItem}
          onClick={onWallet}
        >
          <Wallet size={19} />
          <span>Wallet</span>
        </button>


        <button
          className={styles.navItem}
          onClick={onProfile}
        >
          <User size={19} />
          <span>Profile</span>
        </button>

      </nav>

    </div>
  );
}

export default DashboardHome;