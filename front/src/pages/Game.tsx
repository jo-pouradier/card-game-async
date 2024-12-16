import CardSelection from "../components/game/CardSelection";
import WaitingPage from "./WaitingPage.tsx";
import {useEffect, useState} from "react";

const Game = () => {
  const [gameState, setGameState] = useState(window.location.pathname.split("/").pop());
  useEffect(() => {
    console.log("Game page mounted");
    setGameState( window.location.pathname.split("/").pop());
  }, [gameState]);
  console.info("Game state:", gameState);
  const content = <div></div>;
  switch (gameState) {
    case "waiting":
        return <WaitingPage />;
    case "selection":
      return <CardSelection />;
    case "playing":
      return content;
    case "gameOver":
      return content;
    default:
      return <div>Invalid game state</div>;
  }
};

export default Game;
