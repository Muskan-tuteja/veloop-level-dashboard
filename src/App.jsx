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
import { Routes, Route, Navigate } from "react-router-dom";
// Views this dashboard supports
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
  const [showLevelUp, setShowLevelUp] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  // Simulate initial data fetch on first load
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1200);
    return () => clearTimeout(timer);
  }, []);

  const handleRetry = () => {
    setHasError(false);
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 1000);
  };

  const goHome = () => setView(VIEWS.HOME);
  const goGame = () => setView(VIEWS.GAME_PLAY);
  const goEarnMore = () => setView(VIEWS.EARN_MORE);
  const goActivity = () => setView(VIEWS.ACTIVITY);

  const handleGameComplete = (score) => {
    setGameScore(score);
    setView(VIEWS.GAME_RESULT);
  };

  const handlePlayAgain = () => {
    setView(VIEWS.GAME_PLAY);
  };

   return (
  <Routes>
    <Route path="/" element={<Navigate to="/Lvl-Dashboard" replace />} />
    <Route
      path="/Lvl-Dashboard"
      element={
        <div style={{ minHeight: "100vh", background: "#161827" }}>
          {view === VIEWS.HOME && isLoading && <DashboardSkeleton />}

          {view === VIEWS.HOME && !isLoading && hasError && (
            <ErrorState onRetry={handleRetry} />
          )}

          {view === VIEWS.HOME && !isLoading && !hasError && (
            <DashboardHome
              onPlayGame={goGame}
              onEarnMore={goEarnMore}
              onViewActivity={goActivity}
              onSimulateLevelUp={() => setShowLevelUp(true)}
              onRewards={() => setView(VIEWS.REWARDS)}
              onWallet={() => setView(VIEWS.WALLET)}
              onProfile={() => setView(VIEWS.PROFILE)}
            />
          )}

          {view === VIEWS.GAME_PLAY && (
            <XPCatcherGame onBack={goHome} onComplete={handleGameComplete} />
          )}

          {view === VIEWS.GAME_RESULT && (
            <GameResult
              score={gameScore}
              onPlayAgain={handlePlayAgain}
              onBackToDashboard={goHome}
            />
          )}

          {view === VIEWS.EARN_MORE && (
            <EarnAndLevelUp onBack={goHome} onPlayGame={goGame} />
          )}

          {view === VIEWS.ACTIVITY && <RecentActivity onBack={goHome} />}

          {view === VIEWS.REWARDS && (
            <ComingSoon label="Rewards" onBack={goHome} />
          )}
          {view === VIEWS.WALLET && (
            <ComingSoon label="Wallet" onBack={goHome} />
          )}
          {view === VIEWS.PROFILE && (
            <ComingSoon label="Profile" onBack={goHome} />
          )}

          {showLevelUp && <LevelUpModal onClose={() => setShowLevelUp(false)} />}
        </div>
      }
    />
  </Routes>
);
}

export default App;
