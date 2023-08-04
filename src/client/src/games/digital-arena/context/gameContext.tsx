import { createContext } from "react";

const GameContext = createContext({
  playerPositionIndex: 0,
  setPlayerPositionIndex: () => {},
  inputFiledText: 0,
  setInputFiledText: () => {},
  targetNumberText: 0,
  setTargetNumberText: () => {},
});

export default GameContext;
