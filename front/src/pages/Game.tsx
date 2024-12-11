import CardSelection from "../components/game/CardSelection";

const Game = () => {
  const gameState = window.location.pathname.split("/").pop();
  console.info("Game state:", gameState);
  const content = <div></div>;
  switch (gameState) {
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
