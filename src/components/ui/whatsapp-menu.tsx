"use client";

import { useMemo, useState } from "react";
import { MenuItem, Menu, ListItemIcon, ListItemText, Typography } from "@mui/material";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import { SELLERS, Seller } from "@/config/sellers";

interface WhatsAppMenuProps {
    anchorEl: HTMLElement | null;
    open: boolean;
    onClose: () => void;
    message?: string;
}

export const WhatsAppMenu = ({ anchorEl, open, onClose, message }: WhatsAppMenuProps) => {
    const handleSellerClick = (seller: Seller) => {
        // Generate WhatsApp URL
        const baseUrl = `https://wa.me/${seller.phone}`;
        const encodedMessage = message ? `?text=${encodeURIComponent(message)}` : "";
        const fullUrl = `${baseUrl}${encodedMessage}`;

        window.open(fullUrl, "_blank");
        onClose();
    };

    return (
        <Menu
            anchorEl={anchorEl}
            open={open}
            onClose={onClose}
            anchorOrigin={{
                vertical: "top",
                horizontal: "right",
            }}
            transformOrigin={{
                vertical: "bottom",
                horizontal: "right",
            }}
            PaperProps={{
                sx: {
                    width: 280,
                    maxHeight: 400,
                    borderRadius: 2,
                    boxShadow: "0 8px 24px rgba(0,0,0,0.15)",
                },
            }}
        >
            <Typography variant="subtitle2" sx={{ px: 2, py: 1.5, color: "text.secondary", borderBottom: '1px solid #f0f0f0' }}>
                Selecciona un asesor:
            </Typography>
            {SELLERS.map((seller) => (
                <MenuItem
                    key={seller.phone}
                    onClick={() => handleSellerClick(seller)}
                    sx={{
                        py: 1.5,
                        '&:hover': {
                            bgcolor: 'rgba(37, 211, 102, 0.08)',
                        }
                    }}
                >
                    <ListItemIcon>
                        <WhatsAppIcon sx={{ color: "#25D366" }} />
                    </ListItemIcon>
                    <ListItemText
                        primary={seller.name}
                        secondary={seller.phone.replace(/^51/, '')} // Show pretty number
                        primaryTypographyProps={{ fontWeight: 500 }}
                    />
                </MenuItem>
            ))}
        </Menu>
    );
};
