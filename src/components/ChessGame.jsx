import React, { useState, useEffect } from "react";
import { Chess } from "chess.js";
import { Chessboard } from "react-chessboard";

function ChessGame() {
  // State to hold the chess game instance
  const [game, setGame] = useState(null);
  // State to track the current board position
  const [position, setPosition] = useState("start");
  // State to track game status message
  const [status, setStatus] = useState("White to move.");
  // State to track the selected square
  const [selectedSquare, setSelectedSquare] = useState(null);

  // Initialize the chess game on component mount
  useEffect(() => {
    setGame(new Chess());
  }, []);

  // Function to handle piece movement
  const onDrop = (sourceSquare, targetSquare) => {
    if (!game) return false;

    try {
      // Try to make the move
      const move = game.move({
        from: sourceSquare,
        to: targetSquare,
        promotion: "q", // Always promote to queen for simplicity
      });

      // If move is invalid, return false
      if (!move) return false;

      // Update the board position
      setPosition(game.fen());

      // Check game status
      updateGameStatus();

      // Make a random move for the computer after a short delay
      setTimeout(makeRandomMove, 300);
      return true;
    } catch (error) {
      return false;
    }
  };

  // Function to handle square clicks
  const onSquareClick = (square) => {
    if (!game) return;

    // If no square is currently selected
    if (!selectedSquare) {
      // Check if the square has a piece and it's the current player's turn
      const piece = game.get(square);
      if (piece && piece.color === game.turn()) {
        setSelectedSquare(square);
      }
    }
    // If a square is already selected
    else {
      // Try to make a move from the selected square to the clicked square
      const moveSuccess = onDrop(selectedSquare, square);

      // Clear the selected square regardless of whether the move was successful
      setSelectedSquare(null);
    }
  };

  // Function to make a random move for the computer
  const makeRandomMove = () => {
    if (!game || game.isGameOver()) return;

    const possibleMoves = game.moves();
    if (possibleMoves.length === 0) return;

    // Choose a random move
    const randomIndex = Math.floor(Math.random() * possibleMoves.length);
    const move = possibleMoves[randomIndex];

    // Make the move
    game.move(move);
    setPosition(game.fen());

    // Check game status
    updateGameStatus();
  };

  // Function to update game status
  const updateGameStatus = () => {
    if (!game) return;

    if (game.isCheckmate()) {
      setStatus(`Checkmate! ${game.turn() === "w" ? "Black" : "White"} wins.`);
    } else if (game.isDraw()) {
      setStatus("Draw!");
    } else if (game.isCheck()) {
      setStatus(`Check! ${game.turn() === "w" ? "White" : "Black"} to move.`);
    } else {
      setStatus(`${game.turn() === "w" ? "White" : "Black"} to move.`);
    }
  };

  // Function to reset the game
  const resetGame = () => {
    const newGame = new Chess();
    setGame(newGame);
    setPosition(newGame.fen());
    setStatus("White to move.");
    setSelectedSquare(null);
  };

  // Custom square styles to highlight the selected square
  const customSquareStyles = {};
  if (selectedSquare) {
    customSquareStyles[selectedSquare] = {
      background: "rgba(255, 255, 0, 0.4)",
      borderRadius: "4px",
    };
  }

  // If game is not initialized yet, show loading state
  if (!game) {
    return <div>Loading chess board...</div>;
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-zinc-800 text-white">
      <div className="w-full mb-4">
        <Chessboard
          position={position}
          onPieceDrop={onDrop}
          onSquareClick={onSquareClick}
          customSquareStyles={customSquareStyles}
          boardWidth={550}
          customBoardStyle={{
            borderRadius: "8px",
            boxShadow: "0 20px 15px rgba(0, 0, 0, 0.5)",
          }}
        />
      </div>

      <div className="text-lg font-semibold mb-4">{status}</div>

      <button
        onClick={resetGame}
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
      >
        Reset Game
      </button>

      <div className="mb-4 mt-4 text-gray-700 ">
        <h2 className="text-lg font-semibold mb-2 text-white">How to Play:</h2>
        <ul className="list-disc pl-5 text-sm text-gray-300">
          <li>Drag and drop pieces to make a move</li>
          <li>Or click a piece and then click a destination square</li>
          <li>The computer will automatically make a random move after you</li>
          <li>Press the Reset button to start a new game</li>
        </ul>
      </div>
    </div>
  );
}

export default ChessGame;
