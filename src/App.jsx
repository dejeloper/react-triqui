import { useState } from 'react';
import confetti from 'canvas-confetti';
import { Board } from './components/Board';
import { Turns } from './components/Turns';
import { WinnerModal } from './components/WinnerModal';
import { TURNS } from './constants';
import { checkEndGame, checkWinnerFrom } from './logic/board';

function App() {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [turn, setTurn] = useState(TURNS.X);
  const [winner, setWinner] = useState(null)

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setTurn(TURNS.X);
    setWinner(null);
  }

  const updateBoard = (index) => {
    if (board[index] || winner) return

    const newBoard = [...board]
    newBoard[index] = turn
    setBoard(newBoard)

    const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X;
    setTurn(newTurn);

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
