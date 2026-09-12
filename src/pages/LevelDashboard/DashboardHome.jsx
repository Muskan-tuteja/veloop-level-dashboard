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
  Target,
  Sparkles,
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


/* =====================================================
   ICON MAP
===================================================== */

const iconMap = {
  play: Play,
  clipboard: ClipboardList,
  users: Users,
  gamepad: Gamepad2,
  flame: Flame,
  magnet: Magnet,
};


/* =====================================================
   FEATURE COLORS
===================================================== */

const featureColors = [
  "purple",
  "green",
  "orange",
  "blue",
  "red",
  "cyan",
];


/* =====================================================
   COMPONENT
===================================================== */

function DashboardHome({
  onPlayGame,
  onEarnMore,
  onViewActivity,
  onSimulateLevelUp,
  onRewards,
  onWallet,
  onProfile,
  onMenu,
}) {
  const {
    currentLevel,
    currentXP,
    requiredXP,
  } = userLevelData;


  /* ===================================================
     XP CALCULATIONS
  =================================================== */

  const xpRemaining = Math.max(
    0,
    getXPRemaining()
  );

  const safeCurrentXP = Math.max(
    0,
    Number(currentXP) || 0
  );

  const safeRequiredXP = Math.max(
    0,
    Number(requiredXP) || 0
  );

  const progressPercent =
    safeRequiredXP > 0
      ? Math.min(
          100,
          Math.round(
            (safeCurrentXP / safeRequiredXP) * 100
          )
        )
      : 0;

  const nextLevel = currentLevel + 1;

  const isLevelComplete =
    safeRequiredXP > 0 &&
    safeCurrentXP >= safeRequiredXP;


  /* ===================================================
     DYNAMIC GREETING
  =================================================== */

  const currentHour = new Date().getHours();

  let greeting = "Good Morning";

  if (currentHour >= 12 && currentHour < 17) {
    greeting = "Good Afternoon";
  } else if (currentHour >= 17) {
    greeting = "Good Evening";
  }


  /* ===================================================
     HANDLERS
  =================================================== */

  const handleEarnClick = (feature) => {
    if (feature.comingSoon) {
      return;
    }

    if (
      feature.id === "mini-games" ||
      feature.id === "xp-catcher"
    ) {
      onPlayGame?.();
      return;
    }

    onEarnMore?.();
  };


  const handleMenuClick = () => {
    onMenu?.();
  };


  /* ===================================================
     RENDER
  =================================================== */

  return (
    <main
      className={styles.page}
      aria-label="VeLooper Level Dashboard"
    >
      {/* =================================================
          BACKGROUND
      ================================================= */}

      <div
        className={styles.backgroundGlow}
        aria-hidden="true"
      />

      <div
        className={styles.backgroundGlowTwo}
        aria-hidden="true"
      />

      <div
        className={`${styles.bgParticle} ${styles.p1}`}
        aria-hidden="true"
      />

      <div
        className={`${styles.bgParticle} ${styles.p2}`}
        aria-hidden="true"
      />

      <div
        className={`${styles.bgParticle} ${styles.p3}`}
        aria-hidden="true"
      />

      <div
        className={`${styles.bgParticle} ${styles.p4}`}
        aria-hidden="true"
      />


      <div className={styles.content}>

        {/* =================================================
            HEADER
        ================================================= */}

        <header className={styles.topbar}>

          <button
            type="button"
            className={styles.iconBtn}
            onClick={handleMenuClick}
            aria-label="Open navigation menu"
          >
            <Menu size={20} />
          </button>


          <div
            className={styles.logo}
            aria-label="VeLooper"
          >
            <span
              className={styles.logoDot}
              aria-hidden="true"
            />

            <span>VeLooper</span>
          </div>


          <button
            type="button"
            className={styles.iconBtn}
            onClick={onViewActivity}
            aria-label="View notifications and activity"
          >
            <Bell size={19} />

            <span
              className={styles.notifDot}
              aria-hidden="true"
            />
          </button>

        </header>


        {/* =================================================
            HERO
        ================================================= */}

        <motion.section
          className={styles.greeting}
          initial={{
            opacity: 0,
            y: 16,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.45,
          }}
          aria-labelledby="dashboard-title"
        >

          <span className={styles.eyebrow}>
            YOUR DAILY JOURNEY
          </span>


          <h1 id="dashboard-title">
            {greeting},
            <span> VeLooper 👋</span>
          </h1>


          <p>
            Keep your momentum going, earn more XP,
            and unlock your next reward.
          </p>

        </motion.section>


        {/* =================================================
            LEVEL CARD
        ================================================= */}

        <motion.section
          className={styles.levelCard}
          initial={{
            opacity: 0,
            y: 15,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            delay: 0.08,
            duration: 0.45,
          }}
          aria-labelledby="current-level-heading"
        >

          <div
            className={styles.levelCardGlow}
            aria-hidden="true"
          />


          {/* ---------------------------------------------
              LEVEL BADGE
          --------------------------------------------- */}

          <div
            className={styles.hexBadge}
            aria-label={`Current level ${currentLevel}`}
          >

            <svg
              viewBox="0 0 100 100"
              aria-hidden="true"
              focusable="false"
            >
              <defs>
                <linearGradient
                  id="levelGradient"
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
                fill="url(#levelGradient)"
              />
            </svg>


            <div className={styles.hexBadgeContent}>
              <span>LEVEL</span>

              <strong>
                {String(currentLevel).padStart(2, "0")}
              </strong>
            </div>

          </div>


          {/* ---------------------------------------------
              XP INFORMATION
          --------------------------------------------- */}

          <div className={styles.levelInfo}>

            <div className={styles.xpHeader}>

              <div>
                <span className={styles.smallLabel}>
                  CURRENT XP
                </span>

                <strong
                  className={styles.xpValue}
                  id="current-level-heading"
                >
                  {safeCurrentXP.toLocaleString()}
                  <small> XP</small>
                </strong>
              </div>


              <div className={styles.nextLevel}>
                <span>NEXT LEVEL</span>

                <strong>
                  {String(nextLevel).padStart(2, "0")}
                </strong>
              </div>

            </div>


            {/* -------------------------------------------
                XP PROGRESS
            ------------------------------------------- */}

            <div
              className={styles.progressTrack}
              role="progressbar"
              aria-valuenow={progressPercent}
              aria-valuemin="0"
              aria-valuemax="100"
              aria-label={`${progressPercent}% XP progress toward level ${nextLevel}`}
            >

              <motion.div
                className={styles.progressFill}
                initial={{
                  width: 0,
                }}
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
                {safeCurrentXP.toLocaleString()}
                {" / "}
                {safeRequiredXP.toLocaleString()}
                {" XP"}
              </span>

              <strong>
                {progressPercent}%
              </strong>

            </div>


            {/* -------------------------------------------
                REMAINING XP
            ------------------------------------------- */}

            <div
              className={styles.xpRemaining}
              aria-live="polite"
            >
              {isLevelComplete ? (
                <span>
                  <Sparkles size={12} />
                  Level up ready!
                </span>
              ) : (
                <span>
                  <Target size={12} />
                  {xpRemaining.toLocaleString()} XP
                  {" "}to next level
                </span>
              )}
            </div>

          </div>

        </motion.section>


        {/* =================================================
            NEXT LEVEL REWARD
        ================================================= */}

        <section
          className={styles.rewardSection}
          aria-label="Next level reward"
        >
          <NextLevelReward />
        </section>


        {/* =================================================
            TODAY'S BOOST
        ================================================= */}

        <section
          className={styles.section}
          aria-labelledby="boost-heading"
        >

          <div className={styles.sectionHeading}>

            <div className={styles.headingIcon}>
              <Zap size={17} />
            </div>

            <div>
              <h2 id="boost-heading">
                Today's Boost
              </h2>

              <p>
                Your progress today
              </p>
            </div>

          </div>


          <div className={styles.boostGrid}>

            {/* XP */}
            <div className={styles.boostCard}>

              <div
                className={`${styles.boostIcon} ${styles.yellow}`}
              >
                <Zap size={18} />
              </div>

              <strong>
                {todaysBoost.xpEarned} XP
              </strong>

              <span>
                XP Earned
              </span>

            </div>


            {/* TASKS */}
            <div className={styles.boostCard}>

              <div
                className={`${styles.boostIcon} ${styles.purple}`}
              >
                <ListChecks size={18} />
              </div>

              <strong>
                {todaysBoost.tasksDone}
              </strong>

              <span>
                Tasks Done
              </span>

            </div>


            {/* STREAK */}
            <div className={styles.boostCard}>

              <div
                className={`${styles.boostIcon} ${styles.orange}`}
              >
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


        {/* =================================================
            LEVEL ROADMAP
        ================================================= */}

        <section
          className={styles.roadmapSection}
          aria-label="Level progression roadmap"
        >
          <LevelRoadmap />
        </section>


        {/* =================================================
            EARN MORE
        ================================================= */}

        <section
          className={styles.section}
          aria-labelledby="earn-heading"
        >

          <div className={styles.earnHeader}>

            <div className={styles.sectionHeading}>

              <div
                className={`${styles.headingIcon} ${styles.headingPurple}`}
              >
                <Gift size={17} />
              </div>

              <div>
                <h2 id="earn-heading">
                  Earn More
                </h2>

                <p>
                  Complete activities & earn rewards
                </p>
              </div>

            </div>


            <button
              type="button"
              className={styles.arrowBtn}
              onClick={onEarnMore}
              aria-label="View all earning activities"
            >
              <ChevronRight size={19} />
            </button>

          </div>


          <div className={styles.earnGrid}>

            {earningFeatures.map(
              (feature, index) => {

                const Icon =
                  iconMap[feature.icon] || Play;

                const color =
                  featureColors[
                    index % featureColors.length
                  ];


                return (
                  <motion.button
                    type="button"
                    key={feature.id}
                    className={styles.earnCard}
                    onClick={() =>
                      handleEarnClick(feature)
                    }
                    disabled={feature.comingSoon}
                    aria-label={
                      feature.comingSoon
                        ? `${feature.title}, coming soon`
                        : `Open ${feature.title}`
                    }
                    initial={{
                      opacity: 0,
                      y: 12,
                    }}
                    animate={{
                      opacity: 1,
                      y: 0,
                    }}
                    transition={{
                      delay:
                        0.15 + index * 0.05,
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


                    {!feature.comingSoon && (
                      <ChevronRight
                        size={14}
                        className={styles.cardArrow}
                        aria-hidden="true"
                      />
                    )}


                    {feature.comingSoon && (
                      <span
                        className={styles.soonBadge}
                      >
                        SOON
                      </span>
                    )}

                  </motion.button>
                );
              }
            )}

          </div>

        </section>


        {/* =================================================
            LEVEL REWARD
        ================================================= */}

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
            delay: 0.35,
            duration: 0.4,
          }}
          aria-labelledby="reward-title"
        >

          <div className={styles.chestContent}>

            <span className={styles.rewardTag}>
              LEVEL REWARD
            </span>


            <h2 id="reward-title">
              Level{" "}
              {String(currentLevel).padStart(2, "0")}
              {" "}Rewards
            </h2>


            <p>
              {isLevelComplete ? (
                <>
                  <strong>
                    Reward unlocked!
                  </strong>
                  {" "}Your next level is ready.
                </>
              ) : (
                <>
                  <strong>
                    {xpRemaining.toLocaleString()} XP
                  </strong>
                  {" "}remaining to unlock your
                  next reward.
                </>
              )}
            </p>


            <button
              type="button"
              className={styles.chestBtn}
              onClick={onSimulateLevelUp}
              aria-label="View level rewards"
            >
              <Trophy size={15} />
              View Rewards
            </button>

          </div>


          <div
            className={styles.giftBox}
            aria-hidden="true"
          >
            <Gift size={42} />
          </div>

        </motion.section>

      </div>


      {/* =================================================
          BOTTOM NAVIGATION
      ================================================= */}

      <nav
        className={styles.bottomNav}
        aria-label="Main navigation"
      >

        <button
          type="button"
          className={`${styles.navItem} ${styles.active}`}
          aria-current="page"
          aria-label="Home"
        >
          <Home size={19} />
          <span>Home</span>
        </button>


        <button
          type="button"
          className={styles.navItem}
          onClick={onEarnMore}
          aria-label="Earn XP"
        >
          <Zap size={19} />
          <span>Earn</span>
        </button>


        <button
          type="button"
          className={styles.navItem}
          onClick={onRewards}
          aria-label="View rewards"
        >
          <Trophy size={19} />
          <span>Rewards</span>
        </button>


        <button
          type="button"
          className={styles.navItem}
          onClick={onWallet}
          aria-label="Open wallet"
        >
          <Wallet size={19} />
          <span>Wallet</span>
        </button>


        <button
          type="button"
          className={styles.navItem}
          onClick={onProfile}
          aria-label="Open profile"
        >
          <User size={19} />
          <span>Profile</span>
        </button>

      </nav>

    </main>
  );
}


export default DashboardHome;