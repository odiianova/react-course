import { useState } from "react";

import Player from "./components/Payer.jsx";
import GameBoard from "./components/GameBoard.jsx";
import Log from "./components/Log.jsx";
import GameOver from './components/GameOver.jsx';
import { WINNING_COMBINATIONS } from "./winning-combinations.js";

const PLAYERS = {
  X:  'Player 1',
  O: 'Player 2'
}

const INITIAL_GAME_BOARD = [
  [null, null, null],
  [null, null, null],
  [null, null, null]
];

function deriveActivePlayer(gameTurn) {
  let currentPlayer = 'X';

  if (gameTurn.length > 0 && gameTurn[0].player === 'X') {
    currentPlayer = 'O';
  }

  return currentPlayer;
};

function deriveGameBoard(gameTurn) {
  const gameBoard = [...INITIAL_GAME_BOARD.map(array => [...array])];

  for (const turn of gameTurn) {
      const { square, player } = turn;
      const { row, column } = square;

      gameBoard[row][column] = player;
  }

  return gameBoard;
};

function deriveWinner(gameBoard, players) {
  let winner;

  for (const combination of WINNING_COMBINATIONS) {
    const firstSquareSymbol = gameBoard[combination[0].row][combination[0].column];
    const secondSquareSymbol = gameBoard[combination[1].row][combination[1].column];
    const thirdSquareSymbol = gameBoard[combination[2].row][combination[2].column];

    if(firstSquareSymbol && firstSquareSymbol === secondSquareSymbol && firstSquareSymbol === thirdSquareSymbol) {
      winner = players[firstSquareSymbol];
    }
  }

  return winner;
};

function App() {
  const [players, setPlayers] = useState(PLAYERS);
  const [gameTurn, setGameTurn] = useState([]);
  // const [activePlayer, setActivePlayer] = useState('X');

  const activePlayer = deriveActivePlayer(gameTurn);
  const gameBoard = deriveGameBoard(gameTurn);
  const winner = deriveWinner(gameBoard, players);

  const hasDraw = gameTurn.length === 9 && !winner;

  function handleSelectSquare(rowIndex, colIndex) {
    // setActivePlayer((curActivePlayer) => curActivePlayer === 'X' ? 'O' : 'X');

    setGameTurn((prevTurns) => {
      const currentPlayer = deriveActivePlayer(prevTurns);
      
      const updatedTurns = [
        { square: { row: rowIndex, column: colIndex }, player: currentPlayer } ,
        ...prevTurns
      ];

      return updatedTurns;
    })
  }

  function handleRestart() {
    setGameTurn([]);
  }

  function handlePlayerNameChange(symbol, newName) {
    setPlayers ((prevPlayers) => {
      return {
        ...prevPlayers,
        [symbol]: newName
      }
    });
  }
  
  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player 
            initialName={PLAYERS.X}
            symbol="X"  
            isActive={activePlayer === 'X'} 
            onChangeName={handlePlayerNameChange}
          />
          <Player 
            initialName={PLAYERS.O}
            symbol="O" 
            isActive={activePlayer === 'O'} 
            onChangeName={handlePlayerNameChange}
          />
        </ol>
        { (winner || hasDraw) && (
          <GameOver winner={winner} onRestart={handleRestart}/>
        )}
        <GameBoard onSelectSquare={handleSelectSquare} board={gameBoard}/>
      </div>
      <Log turns={gameTurn} />
    </main>
  )
}

export default App
