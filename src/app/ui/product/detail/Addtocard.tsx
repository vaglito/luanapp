"use client";
import { useState } from "react";
import { Box, Button, Typography } from "@mui/material";

export function AddToCard() {
  const [counter, setCounter] = useState(0); // contador para stock

  const increment = () => {
    setCounter(counter + 1);
  };
  const decrement = () => {
    setCounter(counter - 1);
  };

  const addproduct = () => {
    alert(`Agrego ${counter} unidades`);
  };
  return (
    <Box>
      <Box sx={{ display: "flex" }}>
        <Button onClick={decrement} variant="outlined">
          -
        </Button>
        <Box >
          <Typography sx={{ p: 3 }}>{counter}</Typography>
        </Box>
        <Button onClick={increment} variant="outlined">
          +
        </Button>
      </Box>
    </Box>
  );
}
