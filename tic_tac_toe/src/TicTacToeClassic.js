import React, { useState } from "react";

// PUBLIC_INTERFACE
function TicTacToeClassic() {
  /**
   * TicTacToeClassic is the main UI container for the TicTacToe Classic Game.
   * Features:
   * - 3x3 interactive game board
   * - Two player mode (local hot-seat)
   * - Win/draw detection
   * - Status and reset button
   * - Minimalist, light-themed styling following specified palette
   */

  // Define color palette
  const COLORS = {
    primary: "#ffffff",
    secondary: "#222222",
    accent: "#4caf50"
  };

  // Game state
  const [board, setBoard] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);
  const [gameOver, setGameOver] = useState(false);
  const [winner, setWinner] = useState(null);

  // Calculate winner/draw
  function calculateWinner(squares) {
    // winning combinations
    const lines = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
      [0, 3, 6], [1, 4, 7], [2, 5, 8], // cols
      [0, 4, 8], [2, 4, 6]             // diags
    ];
    for (let line of lines) {
      const [a, b, c] = line;
      if (
        squares[a] &&
        squares[a] === squares[b] &&
        squares[a] === squares[c]
      ) {
        return squares[a]; // 'X' or 'O'
      }
    }
    return null;
  }

  // PUBLIC_INTERFACE
  function handleClick(idx) {
    /** Handles click on a board square. */
    if (gameOver || board[idx]) return;
    const newBoard = board.slice();
    newBoard[idx] = xIsNext ? "X" : "O";
    const win = calculateWinner(newBoard);

    if (win) {
      setBoard(newBoard);
      setWinner(win);
      setGameOver(true);
      return;
    } else if (!newBoard.includes(null)) {
      setBoard(newBoard);
      setWinner(null);
      setGameOver(true); // Draw
      return;
    }

    setBoard(newBoard);
    setXIsNext(!xIsNext);
  }

  // PUBLIC_INTERFACE
  function handleReset() {
    /** Resets the game to initial state. */
    setBoard(Array(9).fill(null));
    setXIsNext(true);
    setWinner(null);
    setGameOver(false);
  }

  // Status message logic
  let statusMsg;
  if (gameOver) {
    statusMsg = winner
      ? `Winner: ${winner}`
      : "Draw game!";
  } else {
    statusMsg = `Next: ${xIsNext ? "X" : "O"}`;
  }

  // Inline styling for light theme and palette
  const containerStyle = {
    minHeight: "100vh",
    background: COLORS.primary,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  };

  const titleStyle = {
    fontWeight: 700,
    fontSize: '2.4rem',
    marginBottom: 8,
    color: COLORS.secondary,
    textAlign: "center",
    letterSpacing: "1px",
  };

  const statusStyle = {
    fontSize: '1.1rem',
    color: COLORS.accent,
    marginBottom: 18,
    minHeight: 26,
    fontWeight: 500,
    textAlign: "center",
    transition: "color 0.18s"
  };

  const boardStyle = {
    display: "grid",
    gridTemplateColumns: "repeat(3, 64px)",
    gridTemplateRows: "repeat(3, 64px)",
    gap: "0",
    margin: "0 auto",
    boxShadow: "0 2px 18px 0 rgba(60,60,80,0.04)",
    background: COLORS.primary,
    borderRadius: "12px",
    border: `1.5px solid ${COLORS.secondary}22`,
  };

  const cellStyle = {
    width: 64,
    height: 64,
    background: COLORS.primary,
    color: COLORS.secondary,
    border: `1px solid ${COLORS.secondary}13`,
    fontSize: '2.2rem',
    fontWeight: 600,
    cursor: "pointer",
    outline: "none",
    transition: "background 0.17s, color 0.13s",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    userSelect: "none",
  };

  const resetStyle = {
    marginTop: 25,
    background: COLORS.accent,
    color: COLORS.primary,
    border: "none",
    borderRadius: "5px",
    padding: "10px 32px",
    fontWeight: 600,
    fontSize: "1.06rem",
    cursor: "pointer",
    boxShadow: "0 2px 8px 0 rgba(72,200,80,0.10)",
    outline: "none",
    transition: "background 0.17s, color 0.12s",
  };

  // Render component UI
  return (
    <div style={containerStyle} data-testid="tictactoe-main">
      <div>
        <div style={titleStyle}>TicTacToe Classic</div>
        <div style={statusStyle}>
          {statusMsg}
        </div>
        <div style={boardStyle}>
          {board.map((cell, idx) => (
            <button
              key={idx}
              aria-label={`cell ${idx + 1}`}
              style={{
                ...cellStyle,
                color:
                  cell === "X"
                    ? COLORS.accent
                    : cell === "O"
                    ? COLORS.secondary
                    : COLORS.secondary,
                background:
                  cell
                    ? COLORS.primary
                    : !gameOver
                    ? COLORS.primary
                    : COLORS.primary,
                cursor: cell || gameOver ? "default" : "pointer",
                pointerEvents: cell || gameOver ? "none" : "auto",
                borderLeft: idx % 3 === 0 ? "none" : cellStyle.border,
                borderTop: idx < 3 ? "none" : cellStyle.border,
                borderRight:
                  (idx + 1) % 3 === 0 ? "none" : cellStyle.border,
                borderBottom: idx > 5 ? "none" : cellStyle.border,
              }}
              onClick={() => handleClick(idx)}
              data-testid={`cell-${idx}`}
            >
              {cell}
            </button>
          ))}
        </div>
        <button
          style={resetStyle}
          onClick={handleReset}
          data-testid="reset-btn"
        >
          Reset
        </button>
      </div>
    </div>
  );
}

export default TicTacToeClassic;
