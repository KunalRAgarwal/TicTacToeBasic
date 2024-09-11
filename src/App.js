import { Grid, Box, Button } from '@mui/material';
import './App.css';
import React, { useState } from 'react';


function App() {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [count, setCount] = useState(0);
  const [winner, setWinner] = useState(null);
  const setBoardValue = (index) => {
    if (board[index] || winner) return;
    const newBoard = [...board];
    newBoard[index] = count % 2 === 0 ? 'X' : 'O';
    setBoard(newBoard);
    setCount(count + 1);

    checkWinner(newBoard); 
  };

  const checkWinner = (newBoard) => {
    if (rowChecker(newBoard, 'X') || columnChecker(newBoard, 'X') || diagonalChecker(newBoard, 'X')) {
      setWinner('X');
    } else if (rowChecker(newBoard, 'O') || columnChecker(newBoard, 'O') || diagonalChecker(newBoard, 'O')) {
      setWinner('O');
    }
  };

  const diagonalChecker = (board, charToCompare) => {
    if (board[0] === charToCompare && board[0] === board[4] && board[0] === board[8]) return true;
    if (board[2] === charToCompare && board[2] === board[4] && board[2] === board[6]) return true;
    return false;
  };

  const rowChecker = (board, charToCompare) => {
    for (let row_start = 0; row_start < 3; row_start++) {
      if (board[row_start * 3] === charToCompare && board[row_start * 3] === board[row_start * 3 + 1] && board[row_start * 3] === board[row_start * 3 + 2]) {
        return true;
      }
    }
    return false;
  };

  const columnChecker = (board, charToCompare) => {
    for (let col_start = 0; col_start < 3; col_start++) {
      if (board[col_start] === charToCompare && board[col_start] === board[col_start + 3] && board[col_start] === board[col_start + 6]) {
        return true;
      }
    }
    return false;
  };

  return (
    <div className="App-header">
      {winner && <h1>Winner: {winner}</h1>}
      {(!winner && count==9) &&<h1>Game Tie</h1>}
      {!(winner || count == 9) && <h1>Next Player: {count % 2 === 0 ? 'X' : 'O'}</h1>}
      {(winner || count==9) && <Button sx={{marginBottom:'50px'}} onClick={()=>{setBoard(Array(9).fill(null));setWinner(null);setCount(0)}}>Restart</Button>}
      <Grid container spacing={2} sx={{ paddingX: '275px' }}>
        {[...Array(9)].map((_, index) => (
          <Grid item xs={4} key={index}>
            <Box
              sx={{
                backgroundColor: '',
                padding: 2,
                border: '1px solid #ccc',
                textAlign: 'center',
                fontSize: '24px',
                height: '48px',
                width: '136px',
                cursor: 'pointer',
              }}
              onClick={() => setBoardValue(index)} 
            >
              {board[index]} 
            </Box>
          </Grid>
        ))}
      </Grid>
    </div>
  );
}

export default App;
