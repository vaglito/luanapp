import { Chip } from "@mui/material";
import type { ReactElement } from "react";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import NewReleasesIcon from "@mui/icons-material/NewReleases";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";

type BadgeType = "discount" | "new" | "bestseller";

interface ProductBadgeProps {
  type: BadgeType;
  label?: string;
}

interface BadgeStyle {
  bg: string;
  icon: ReactElement;
  defaultLabel: string;
}

const badgeConfig: Record<BadgeType, BadgeStyle> = {
  discount: {
    bg: "error.main",
    icon: <LocalOfferIcon sx={{ fontSize: 12 }} />,
    defaultLabel: "",
  },
  new: {
    bg: "primary.main",
    icon: <NewReleasesIcon sx={{ fontSize: 12 }} />,
    defaultLabel: "Nuevo",
  },
  bestseller: {
    bg: "secondary.main",
    icon: <TrendingUpIcon sx={{ fontSize: 12 }} />,
    defaultLabel: "Más vendido",
  },
};

export function ProductBadge({ type, label }: ProductBadgeProps) {
  const config = badgeConfig[type];

  return (
    <Chip
      label={label || config.defaultLabel}
      size="small"
      sx={{
        position: "absolute",
        top: 12,
        left: 12,
        zIndex: 10,
        bgcolor: config.bg,
        color: "white",
        fontWeight: 800,
        fontSize: "0.75rem",
        borderRadius: "6px",
        height: 24,
        boxShadow: `0 2px 8px rgba(89, 20, 163, 0.3)`,
        pointerEvents: "none",
        "& .MuiChip-icon": { color: "white", ml: 0.5 },
        "& .MuiChip-label": { px: 1 },
      }}
    />
  );
}
