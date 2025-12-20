"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import Dialog from "@mui/material/Dialog";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Box from "@mui/material/Box";

export default function PromoDialog() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const PROMO_KEY = "promo_shown_at";
    const SHOW_EVERY_HOURS = 2;

    const now = Date.now();
    const lastShown = localStorage.getItem(PROMO_KEY);

    if (!lastShown) {
      setOpen(true);
      localStorage.setItem(PROMO_KEY, now.toString());
      return;
    }

    const hoursPassed = (now - Number(lastShown)) / (1000 * 60 * 60);

    if (hoursPassed >= SHOW_EVERY_HOURS) {
      setOpen(true);
      localStorage.setItem(PROMO_KEY, now.toString());
    }
  }, []);

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Dialog
      open={open}
      onClose={() => setOpen(false)}
      maxWidth={false}
      PaperProps={{
        sx: {
          borderRadius: 3,
          overflow: 'hidden',
          maxWidth: 420, // 👈 controla tamaño en desktop
          width: '100%',
        },
      }}
    >
      <Box position="relative">
        <IconButton
          onClick={() => setOpen(false)}
          sx={{
            position: 'absolute',
            top: 8,
            right: 8,
            zIndex: 2,
            backgroundColor: 'rgba(0,0,0,0.4)',
            color: 'white',
            '&:hover': {
              backgroundColor: 'rgba(0,0,0,0.6)',
            },
          }}
        >
          <CloseIcon />
        </IconButton>

        <Image
          src="/comunicado-reunion.jpg"
          alt="Promoción"
          width={1079}
          height={1920}
          priority
          style={{
            width: '100%',
            height: 'auto',
          }}
        />
      </Box>
    </Dialog>
  );
}
