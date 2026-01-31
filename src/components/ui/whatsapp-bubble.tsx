"use client";

import { useState } from "react";
import { Fab, Tooltip, Zoom } from "@mui/material";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import { WhatsAppMenu } from "./whatsapp-menu";

export const WhatsAppBubble = () => {
    const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
    const open = Boolean(anchorEl);

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <>
            <Tooltip title="Chatea con nosotros" arrow placement="left">
                <Fab
                    color="primary"
                    aria-label="whatsapp"
                    onClick={handleClick}
                    sx={{
                        position: "fixed",
                        bottom: 30,
                        right: 30,
                        zIndex: 1100,
                        backgroundColor: "#25D366",
                        color: "white",
                        width: { xs: 56, md: 64 },
                        height: { xs: 56, md: 64 },
                        "&:hover": {
                            backgroundColor: "#1EbE57",
                            transform: "scale(1.1)",
                        },
                        transition: "all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
                        boxShadow: "0 4px 12px rgba(37, 211, 102, 0.4)",
                    }}
                >
                    <WhatsAppIcon sx={{ fontSize: { xs: 32, md: 36 } }} />
                </Fab>
            </Tooltip>

            <WhatsAppMenu
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                message="Hola, estoy interesado en sus productos. ¿Podrían asesorarme?"
            />
        </>
    );
};
