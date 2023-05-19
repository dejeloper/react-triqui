import { useState } from 'react';
import confetti from 'canvas-confetti';
import { Board } from './components/Board';
import { Turns } from './components/Turns';
import { WinnerModal } from './components/WinnerModal';
import { TURNS } from './constants';
import { checkEndGame, checkWinnerFrom } from './logic/board';
import { removeGameToStorage, saveGameToStorage } from './logic/storage';

function App() {
  const [board, setBoard] = useState(() => {
    const boardFromStorage = window.localStorage.getItem('board')
    return boardFromStorage ? JSON.parse(boardFromStorage) : Array(9).fill(null)
  });

  const [turn, setTurn] = useState(() => {
    const turnFromStorage = window.localStorage.getItem('turn')
    return turnFromStorage ? JSON.parse(turnFromStorage) : TURNS.X
  });

  const [winner, setWinner] = useState(null)

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setTurn(TURNS.X);
    setWinner(null);

    removeGameToStorage();
  }

  const updateBoard = (index) => {
    if (board[index] || winner) return

    const newBoard = [...board]
    newBoard[index] = turn
    setBoard(newBoard)

    const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X;
    setTurn(newTurn);

    saveGameToStorage(newBoard, newTurn)

    const newWinner = checkWinnerFrom(newBoard)
    if (newWinner) {
      confetti();
      setWinner(newWinner);
    } else if (checkEndGame(newBoard)) {
      setWinner(false);
    }
  }

  return (
    <main className="board">
      <h1>Triqui</h1>
      <button onClick={resetGame}>Empezar de nuevo</button>

      <Board board={board} updateBoard={updateBoard} />

      <Turns turn={turn} />

      <WinnerModal winner={winner} resetGame={resetGame} />
    </main>
  )
}

export default App
