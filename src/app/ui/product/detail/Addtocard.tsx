"use client";
import { useState } from "react";
import { Box, Button, Typography } from "@mui/material";
import WhatsAppIcon from '@mui/icons-material/WhatsApp';

export function AddToCard() {
  const [counter, setCounter] = useState(0);

  const increment = () => {
    setCounter(counter + 1);
  };
  const decrement = () => {
    if (counter > 0) setCounter(counter - 1); // Evitar que el contador sea negativo
  };

  const addproduct = () => {
    alert(`Agrego ${counter} unidades`);
  };

  return (
    <Box
      sx={{
        maxWidth: 350,
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 2,
        }}
      >
        <Button
          onClick={decrement}
          variant="contained"
          sx={{
            backgroundColor: "#ff6b6b",
            color: "white",
            "&:hover": {
              backgroundColor: "#ff5252",
            },
          }}
        >
          -
        </Button>
        <Typography
          sx={{
            fontSize: "1.5rem",
            fontWeight: "bold",
            padding: "0 20px",
            textAlign: "center",
          }}
        >
          {counter}
        </Typography>
        <Button
          onClick={increment}
          variant="contained"
          sx={{
            backgroundColor: "#1e90ff",
            color: "white",
            "&:hover": {
              backgroundColor: "#1c7ed6",
            },
          }}
        >
          +
        </Button>
      </Box>
      <Button
        onClick={addproduct}
        variant="contained"
        fullWidth
        startIcon={<WhatsAppIcon />}
        sx={{
          backgroundColor: "#38d9a9",
          color: "white",
          "&:hover": {
            backgroundColor: "#20c997",
          },
        }}
      >
        Comprar por WhatsApp
      </Button>
    </Box>
  );
}
