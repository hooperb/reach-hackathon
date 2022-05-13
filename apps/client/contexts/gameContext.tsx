import { createContext, ReactChild, useState } from "react";

export interface IGameContext {
  setGame: (game: string) => void;
  game?: string;
}

export const GameContext = createContext({} as IGameContext);

export const GameContextProvider = ({ children }: { children: ReactChild }) => {
  const [game, setGame] = useState<string>();
  return (
    <GameContext.Provider value={{ game, setGame }}>
      {children}
    </GameContext.Provider>
  );
};
