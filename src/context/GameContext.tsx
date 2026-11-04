"use client";

import React, { createContext, useContext, useState, useCallback } from "react";

interface GameContextType {
  isGameMode: boolean;
  toggleGame: () => void;
  setGameMode: (mode: boolean) => void;
}

const GameContext = createContext<GameContextType | undefined>(undefined);

export function GameProvider({ children }: { children: React.ReactNode }) {
  const [isGameMode, setIsGameMode] = useState(false);
  const toggleGame = useCallback(() => setIsGameMode((m) => !m), []);
  const setGameMode = useCallback((m: boolean) => setIsGameMode(m), []);

  return (
    <GameContext.Provider value={{ isGameMode, toggleGame, setGameMode }}>
      {children}
    </GameContext.Provider>
  );
}

export function useGame() {
  const ctx = useContext(GameContext);
  if (!ctx) throw new Error("useGame must be used within GameProvider");
  return ctx;
}
