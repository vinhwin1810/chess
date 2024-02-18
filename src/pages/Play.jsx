import { useState, useCallback, useEffect } from "react";
import { Chessboard } from "react-chessboard";
import { Chess } from "chess.js";
import CustomDialog from "../components/CustomDialog";
// import socket from "../socket";

function Play() {
  const [game, setGame] = useState(new Chess());
  const [fen, setFen] = useState(game.fen());
  const [over, setOver] = useState("");
  // const [gameId, setGameId] = useState("your-game-id"); // You need to manage game IDs

  // useEffect(() => {
  //   // Join a game when the component mounts
  //   socket.emit("joinGame", gameId);

  //   // Listen for moves made by the opponent
  //   socket.on("moveMade", (move) => {
  //     game.move(move);
  //     setFen(game.fen());
  //   });

  //   return () => {
  //     socket.off("moveMade");
  //   };
  // }, [game, gameId]);

  // Reset game state
  const resetGame = useCallback(() => {
    const newGame = new Chess();
    setGame(newGame);
    setFen(newGame.fen());
    setOver("");
  }, []);

  const makeAMove = useCallback(
    (move) => {
      try {
        const result = game.move(move);
        setFen(game.fen());
        // socket.emit("makeMove", { gameId, move });

        if (game.isGameOver()) {
          if (game.isCheckmate()) {
            setOver(
              `Checkmate! ${game.turn() === "w" ? "black" : "white"} wins!`
            );
          } else if (game.isDraw()) {
            setOver("Draw");
          } else {
            setOver("Game over");
          }
        }

        return result;
      } catch (e) {
        return null;
      }
    },
    [game]
  );

  // Adjust onDrop function to use `game` from state instead of `chess`
  function onDrop(sourceSquare, targetSquare) {
    const moveData = {
      from: sourceSquare,
      to: targetSquare,
      promotion: "q", // This is a typical promotion choice, but adjust as needed
    };

    const move = makeAMove(moveData);

    if (move === null) return false;

    return true;
  }

  return (
    <section className="bg-gray-800">
      <div className="flex flex-col justify-center items-center h-screen overflow-hidden">
        <div className="border-black w-full rounded-lg shadow-lg border-8 md:mt-0 sm:max-w-md xl:p-0 ">
          <Chessboard position={fen} onPieceDrop={onDrop} />
        </div>
        {game.isGameOver() && <CustomDialog over={over} onClose={resetGame} />}
      </div>
    </section>
  );
}

export default Play;
