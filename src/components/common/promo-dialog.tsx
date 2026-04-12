"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import Dialog from "@mui/material/Dialog";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import Button from "@mui/material/Button";
import Link from "@mui/material/Link";
import { WhatsAppMenu } from "@/components/ui/whatsapp-menu";

export default function PromoDialog() {
  const [open, setOpen] = useState(false);
  const [time, setTime] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  // State for CSS transitions/animations
  const [mounted, setMounted] = useState(false);

  // State for WhatsApp Menu
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const menuOpen = Boolean(anchorEl);

  useEffect(() => {
    setMounted(true);
    const PROMO_KEY = "promo_shown_at";
    const SHOW_EVERY_MINUTES = 1; // Show every 1 minute

    // Check if we should show the dialog
    const now = Date.now();
    const lastShown = localStorage.getItem(PROMO_KEY);

    let shouldShow = false;
    if (!lastShown) {
      shouldShow = true;
    } else {
      const minutesPassed = (now - Number(lastShown)) / (1000 * 60);
      if (minutesPassed >= SHOW_EVERY_MINUTES) {
        shouldShow = true;
      }
    }

    if (shouldShow) {
      setOpen(true);
      localStorage.setItem(PROMO_KEY, now.toString());
    }

    // Countdown Logic (Ends at Feb 14, 8:00 PM)
    const calculateTimeLeft = () => {
      const now = new Date();
      // Target: Feb 14 at 20:00 (8:00 PM) of the current year
      const currentYear = now.getFullYear();
      const targetDate = new Date(`${currentYear}-02-14T20:00:00`);

      const diff = targetDate.getTime() - now.getTime();

      if (diff > 0) {
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((diff / 1000 / 60) % 60);
        const seconds = Math.floor((diff / 1000) % 60);
        return { days, hours, minutes, seconds };
      }
      return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    };

    setTime(calculateTimeLeft());

    const timer = setInterval(() => {
      setTime(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleClose = () => {
    setOpen(false);
  };

  const handleMenuClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  // Format with leading zeros
  const f = (n: number) => n.toString().padStart(2, "0");

  if (!mounted) return null;

  return (
    <>
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        maxWidth="md"
        PaperProps={{
          sx: {
            borderRadius: 4,
            overflow: 'hidden',
            maxWidth: 900,
            width: '100%',
            bgcolor: "transparent",
            boxShadow: "none",
            m: 2
          },
        }}
        slotProps={{
          backdrop: {
            sx: {
              backdropFilter: "blur(4px)",
              backgroundColor: "rgba(0,0,0,0.7)"
            }
          }
        }}
      >
        <Box sx={{ bgcolor: "white", borderRadius: 4, overflow: "hidden", display: "flex", flexDirection: { xs: "column", md: "row" } }}>
          {/* Close Button */}
          <IconButton
            onClick={() => setOpen(false)}
            sx={{
              position: 'absolute',
              top: 12,
              right: 12,
              zIndex: 20,
              backgroundColor: 'rgba(0,0,0,0.5)',
              color: 'white',
              '&:hover': {
                backgroundColor: 'rgba(0,0,0,0.7)',
              },
            }}
          >
            <CloseIcon />
          </IconButton>

          {/* Promo Image Side (Left on Desktop) */}
          <Box sx={{ position: "relative", width: { xs: "100%", md: "60%" }, lineHeight: 0 }}>
            <Image
              src="/promocion.jpg"
              alt="Oferta Especial"
              width={1079}
              height={1920}
              priority
              style={{
                width: '100%',
                height: '100%',
                objectFit: "cover",
                display: "block"
              }}
            />
          </Box>

          {/* Countdown & Info Side (Right on Desktop) */}
          <Box
            sx={{
              width: { xs: "100%", md: "40%" },
              background: "linear-gradient(135deg, #1a1a1a 0%, #0d0d0d 100%)",
              borderLeft: { md: "4px solid #FFD700" }, // Side border for desktop
              borderTop: { xs: "4px solid #FFD700", md: "none" }, // Top border for mobile
              py: 4,
              px: 3,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              textAlign: "center",
              position: "relative"
            }}
          >
            {/* Decorative Pattern Background (Optional) */}
            <Box sx={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              opacity: 0.05,
              backgroundImage: "radial-gradient(#FFD700 1px, transparent 1px)",
              backgroundSize: "20px 20px"
            }} />

            <Typography
              variant="h5"
              sx={{
                color: "#FFD700",
                fontWeight: 800,
                fontFamily: "var(--font-orbitron)",
                textTransform: "uppercase",
                letterSpacing: "2px",
                mb: 1,
                zIndex: 1,
                textShadow: "0 0 15px rgba(255, 215, 0, 0.4)"
              }}
            >
              Oferta San Valentín
            </Typography>

            <Typography variant="body2" sx={{ color: "#ccc", mb: 4, zIndex: 1, fontFamily: "var(--font-inter)" }}>
              ¡Celebra el amor y la amistad con tecnología de punta!
            </Typography>

            <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 4, zIndex: 1 }}>

              {/* Days */}
              <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                <Box sx={{ bgcolor: "rgba(255,255,255,0.08)", borderRadius: 2, p: 1.5, minWidth: 50, border: "1px solid rgba(255,255,255,0.1)" }}>
                  <Typography variant="h4" sx={{ color: "white", fontWeight: 800, fontFamily: "monospace", lineHeight: 1 }}>{f(time.days)}</Typography>
                </Box>
                <Typography variant="caption" sx={{ color: "#888", mt: 0.5, fontSize: "0.65rem", textTransform: "uppercase", letterSpacing: 1 }}>Días</Typography>
              </Box>

              <Typography variant="h4" sx={{ color: "#444", fontWeight: 300, mb: 3 }}>:</Typography>

              {/* Hours */}
              <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                <Box sx={{ bgcolor: "rgba(255,255,255,0.08)", borderRadius: 2, p: 1.5, minWidth: 50, border: "1px solid rgba(255,255,255,0.1)" }}>
                  <Typography variant="h4" sx={{ color: "white", fontWeight: 800, fontFamily: "monospace", lineHeight: 1 }}>{f(time.hours)}</Typography>
                </Box>
                <Typography variant="caption" sx={{ color: "#888", mt: 0.5, fontSize: "0.65rem", textTransform: "uppercase", letterSpacing: 1 }}>Hr</Typography>
              </Box>

              <Typography variant="h4" sx={{ color: "#444", fontWeight: 300, mb: 3 }}>:</Typography>

              {/* Minutes */}
              <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                <Box sx={{ bgcolor: "rgba(255,255,255,0.08)", borderRadius: 2, p: 1.5, minWidth: 50, border: "1px solid rgba(255,255,255,0.1)" }}>
                  <Typography variant="h4" sx={{ color: "white", fontWeight: 800, fontFamily: "monospace", lineHeight: 1 }}>{f(time.minutes)}</Typography>
                </Box>
                <Typography variant="caption" sx={{ color: "#888", mt: 0.5, fontSize: "0.65rem", textTransform: "uppercase", letterSpacing: 1 }}>Min</Typography>
              </Box>

              <Typography variant="h4" sx={{ color: "#444", fontWeight: 300, mb: 3 }}>:</Typography>

              {/* Seconds */}
              <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                <Box sx={{ bgcolor: "rgba(255,255,255,0.08)", borderRadius: 2, p: 1.5, minWidth: 50, border: "1px solid rgba(255,255,255,0.1)" }}>
                  <Typography variant="h4" sx={{ color: "#FFD700", fontWeight: 800, fontFamily: "monospace", lineHeight: 1 }}>{f(time.seconds)}</Typography>
                </Box>
                <Typography variant="caption" sx={{ color: "#888", mt: 0.5, fontSize: "0.65rem", textTransform: "uppercase", letterSpacing: 1 }}>Seg</Typography>
              </Box>
            </Box>

            {/* Menu Trigger Button */}
            <Button
              variant="contained"
              startIcon={<WhatsAppIcon />}
              onClick={handleMenuClick} // Open menu instead of direct link
              fullWidth
              sx={{
                bgcolor: "#25D366",
                color: "white",
                fontWeight: 700,
                fontSize: "1.1rem",
                borderRadius: "50px",
                py: 2,
                zIndex: 1,
                boxShadow: "0 4px 15px rgba(37, 211, 102, 0.3)",
                "&:hover": {
                  bgcolor: "#128C7E",
                  transform: "scale(1.02)",
                  boxShadow: "0 6px 20px rgba(37, 211, 102, 0.5)"
                },
                transition: "all 0.3s ease"
              }}
            >
              Cotizar Oferta
            </Button>

          </Box>
        </Box>
      </Dialog>

      {/* WhatsApp Menu Component */}
      <WhatsAppMenu
        anchorEl={anchorEl}
        open={menuOpen}
        onClose={handleMenuClose}
        message="Hola, quisiera más información sobre la oferta de San Valentín"
      />
    </>
  );
}
