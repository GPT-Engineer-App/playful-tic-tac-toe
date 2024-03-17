import React, { useState } from "react";
import { Box, Button, Center, Grid, Heading, Text } from "@chakra-ui/react";

const Index = () => {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [player, setPlayer] = useState("X");

  const handleClick = (index) => {
    if (board[index] === null && !calculateWinner(board)) {
      const newBoard = [...board];
      newBoard[index] = player;
      setBoard(newBoard);
      setPlayer(player === "X" ? "O" : "X");
    }
  };

  const calculateWinner = (board) => {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        return board[a];
      }
    }
    return null;
  };

  const winner = calculateWinner(board);
  const isBoardFull = board.every((cell) => cell !== null);

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setPlayer("X");
  };

  return (
    <Center h="100vh">
      <Box>
        <Heading mb={4} textAlign="center">
          Tic Tac Toe
        </Heading>
        <Grid templateColumns="repeat(3, 1fr)" gap={2} mb={4}>
          {board.map((cell, index) => (
            <Button key={index} onClick={() => handleClick(index)} variant="outline" size="lg" fontSize="4xl" fontWeight="bold" h="100px" w="100px" disabled={cell !== null || winner !== null}>
              {cell}
            </Button>
          ))}
        </Grid>
        {winner && (
          <Text mb={4} fontSize="2xl" fontWeight="bold" textAlign="center">
            Player {winner} wins!
          </Text>
        )}
        {isBoardFull && !winner && (
          <Text mb={4} fontSize="2xl" fontWeight="bold" textAlign="center">
            It's a draw!
          </Text>
        )}
        <Center>
          <Button onClick={resetGame} colorScheme="blue">
            Reset Game
          </Button>
        </Center>
      </Box>
    </Center>
  );
};

export default Index;
