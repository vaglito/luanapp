"use client";

import { useScrollTrigger, Slide } from "@mui/material";

interface Props {
    children: React.ReactElement;
}

export function ScrollHideWrapper({ children }: Props) {
    const trigger = useScrollTrigger({
        threshold: 150, // Mayor umbral para evitar movimientos involuntarios
        disableHysteresis: false,
    });

    return (
        <Slide
            appear={false}
            direction="down"
            in={!trigger}
            timeout={700} // Duración más larga para suavidad
            easing={{
                enter: "cubic-bezier(0.4, 0, 0.2, 1)",
                exit: "cubic-bezier(0.4, 0, 0.2, 1)"
            }}
        >
            {children}
        </Slide>
    );
}
