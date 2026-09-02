# VELoop Rewards — Level-Up Dashboard

A premium, gamified progression center for VELoop Rewards where users track their level, XP, and rewards, play a mini-game to earn XP, and discover new earning opportunities.

## Live Demo

[Add your deployed link here]/Lvl-Dashboard

## Project Overview

This dashboard replaces the basic Level Dashboard with a fintech-inspired gamification hub. Users can see their current progress, understand what's needed to level up, play an XP-earning mini-game, and explore multiple ways to earn more XP and rewards.

## Level System

- **Current Level** — displayed prominently with a hexagonal level badge
- **Current XP** — shown with an animated progress bar
- **XP Required for Next Level** — clearly visible, no manual calculation needed
- **Level Roadmap** — horizontal scrollable path showing completed, current, and locked levels with their rewards

## XP System

XP is earned through:
- Daily missions
- Watching ads (demo)
- Referrals
- Playing the mini-game
- Maintaining streaks

All values are demo/development data until backend integration.

## Next-Level Rewards

The next-level reward is displayed as a locked card with a progress bar showing how close the user is to unlocking it, along with an info tooltip explaining the reward configuration.

## Game Concept — XP Catcher

A skill-based catch game (not gambling or chance-based):
- **Objective:** Tap falling XP orbs and VE coins before they disappear
- **Duration:** 20 seconds per round
- **Scoring:** VE coins = 15 points, XP orbs = 10 points
- **Reward:** XP and VEs awarded based on final score
- **Replay:** Unlimited replays via "Play Again"

## Game Rules

- Round lasts 20 seconds
- Tap/click items before they fall past the bottom to catch them
- Reward is calculated from your final score (demo formula, subject to backend rules)
- Game does not use chance, jackpots, or randomized rewards — score is fully skill-based (how many items you catch)

## Earning Features

The "Earn & Level Up" section lists all available ways to earn XP: Watch & Earn, Daily Missions, Refer & Earn, Mini Games, Streak Bonus, and XP Catcher — each with its own XP reward value.

## Technology Stack

- **React** (Vite)
- **Bootstrap** — base styling system
- **CSS Modules** — component-scoped styling
- **React Hooks** — state management
- **Lucide React** — icons
- **Framer Motion** — animations

## Installation