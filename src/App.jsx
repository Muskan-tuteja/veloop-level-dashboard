import { useState, useEffect } from "react";

import DashboardHome from "./pages/LevelDashboard/DashboardHome";
import XPCatcherGame from "./pages/LevelDashboard/XPCatcherGame";
import GameResult from "./pages/LevelDashboard/GameResult";
import EarnAndLevelUp from "./pages/LevelDashboard/EarnAndLevelUp";
import RecentActivity from "./pages/LevelDashboard/RecentActivity";

import LevelUpModal from "./components/LevelUpModal/LevelUpModal";
import DashboardSkeleton from "./components/States/DashboardSkeleton";
import ErrorState from "./components/States/ErrorState";
import ComingSoon from "./components/ComingSoon/ComingSoon";

import {
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import {
  userLevelData,
  addXP,
} from "./data/levelData";

const VIEWS = {
  HOME: "HOME",
  GAME_PLAY: "GAME_PLAY",
  GAME_RESULT: "GAME_RESULT",
  EARN_MORE: "EARN_MORE",
  ACTIVITY: "ACTIVITY",
  REWARDS: "REWARDS",
  WALLET: "WALLET",
  PROFILE: "PROFILE",
};

function App() {
  const [view, setView] = useState(VIEWS.HOME);

  const [gameScore, setGameScore] = useState(0);

  const [showLevelUp, setShowLevelUp] =
    useState(false);

  const [isLoading, setIsLoading] =
    useState(true);

  const [hasError, setHasError] =
    useState(false);

  // Forces dashboard to re-render
  const [levelData, setLevelData] =
    useState({
      ...userLevelData,
    });

  // --------------------------------------------
  // INITIAL LOADING
  // --------------------------------------------

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 700);

    return () => clearTimeout(timer);
  }, []);

  // --------------------------------------------
  // RETRY
  // --------------------------------------------

  const handleRetry = () => {
    setHasError(false);
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
    }, 700);
  };

  // --------------------------------------------
  // NAVIGATION
  // --------------------------------------------

  const goHome = () => {
    setView(VIEWS.HOME);
  };

  const goGame = () => {
    setView(VIEWS.GAME_PLAY);
  };

  const goEarnMore = () => {
    setView(VIEWS.EARN_MORE);
  };

  const goActivity = () => {
    setView(VIEWS.ACTIVITY);
  };

  // --------------------------------------------
  // GAME COMPLETE
  // --------------------------------------------

  const handleGameComplete = (score) => {
    const safeScore = Math.max(
      0,
      Number(score) || 0
    );

    setGameScore(safeScore);

    // Add game score as XP
    const oldLevel =
      userLevelData.currentLevel;

    const updatedData = addXP(safeScore);

    setLevelData({
      ...updatedData,
    });

    // Check level up
    if (
      updatedData.currentLevel >
      oldLevel
    ) {
      setTimeout(() => {
        setShowLevelUp(true);
      }, 500);
    }

    setView(VIEWS.GAME_RESULT);
  };

  // --------------------------------------------
  // PLAY AGAIN
  // --------------------------------------------

  const handlePlayAgain = () => {
    setView(VIEWS.GAME_PLAY);
  };

  return (
    <Routes>
      {/* ROOT */}

      <Route
        path="/"
        element={
          <Navigate
            to="/Lvl-Dashboard"
            replace
          />
        }
      />

      {/* DASHBOARD */}

      <Route
        path="/Lvl-Dashboard"
        element={
          <div
            style={{
              minHeight: "100vh",
              background: "#0d1020",
            }}
          >
            {view === VIEWS.HOME &&
              isLoading && (
                <DashboardSkeleton />
              )}

            {view === VIEWS.HOME &&
              !isLoading &&
              hasError && (
                <ErrorState
                  onRetry={handleRetry}
                />
              )}

            {view === VIEWS.HOME &&
              !isLoading &&
              !hasError && (
                <DashboardHome
                  levelData={levelData}
                  onPlayGame={goGame}
                  onEarnMore={goEarnMore}
                  onViewActivity={goActivity}
                  onSimulateLevelUp={() =>
                    setShowLevelUp(true)
                  }
                  onRewards={() =>
                    setView(VIEWS.REWARDS)
                  }
                  onWallet={() =>
                    setView(VIEWS.WALLET)
                  }
                  onProfile={() =>
                    setView(VIEWS.PROFILE)
                  }
                />
              )}

            {view === VIEWS.GAME_PLAY && (
              <XPCatcherGame
                onBack={goHome}
                onComplete={
                  handleGameComplete
                }
              />
            )}

            {view === VIEWS.GAME_RESULT && (
              <GameResult
                score={gameScore}
                onPlayAgain={
                  handlePlayAgain
                }
                onBackToDashboard={
                  goHome
                }
              />
            )}

            {view === VIEWS.EARN_MORE && (
              <EarnAndLevelUp
                onBack={goHome}
                onPlayGame={goGame}
              />
            )}

            {view === VIEWS.ACTIVITY && (
              <RecentActivity
                onBack={goHome}
              />
            )}

            {view === VIEWS.REWARDS && (
              <ComingSoon
                label="Rewards"
                onBack={goHome}
              />
            )}

            {view === VIEWS.WALLET && (
              <ComingSoon
                label="Wallet"
                onBack={goHome}
              />
            )}

            {view === VIEWS.PROFILE && (
              <ComingSoon
                label="Profile"
                onBack={goHome}
              />
            )}

            {showLevelUp && (
              <LevelUpModal
                onClose={() =>
                  setShowLevelUp(false)
                }
              />
            )}
          </div>
        }
      />
    </Routes>
  );
}

export default App;