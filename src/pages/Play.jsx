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

  useEffect(() => {
    const authToken = localStorage.getItem("authToken");
    fetch("http://localhost:8000/play", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        console.log(data);
        // Handle the data
      })
      .catch((error) => {
        console.error("Error:", error);
        // Handle the error, e.g., by logging out the user or showing an error message
      });
  }, []); // This empty array makes the effect only run once when the component mounts

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
