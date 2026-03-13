"use client";

import {
    Box,
    TextField,
    Button,
    MenuItem,
    Select,
    FormControl,
    InputLabel,
    Stack,
    InputAdornment,
    Collapse,
    Typography,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import TuneIcon from "@mui/icons-material/Tune";
import ClearIcon from "@mui/icons-material/Clear";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { useState, useCallback } from "react";

const DOC_TYPES = [
    { value: "", label: "Todos los tipos" },
    { value: "01", label: "Factura" },
    { value: "03", label: "Boleta" },
    { value: "07", label: "Nota de Crédito" },
    { value: "08", label: "Nota de Débito" },
];

export default function InvoicesSearch() {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const [secuencial, setSecuencial] = useState(searchParams.get("SECUENCIAL") || "");
    const [ptoemi, setPtoemi] = useState(searchParams.get("PTOEMI") || "");
    const [cod, setCod] = useState(searchParams.get("COD") || "");
    const [fecha1, setFecha1] = useState(searchParams.get("fecha1") || "");
    const [fecha2, setFecha2] = useState(searchParams.get("fecha2") || "");
    const [showAdvanced, setShowAdvanced] = useState(
        !!(searchParams.get("COD") || searchParams.get("fecha1") || searchParams.get("PTOEMI"))
    );

    const handleSearch = useCallback(() => {
        const params = new URLSearchParams();
        if (secuencial) params.set("SECUENCIAL", secuencial);
        if (ptoemi) params.set("PTOEMI", ptoemi);
        if (cod) params.set("COD", cod);
        if (fecha1) params.set("fecha1", fecha1);
        if (fecha2) params.set("fecha2", fecha2);
        // Reset to page 1 on new search
        router.push(`${pathname}?${params.toString()}`);
    }, [router, pathname, secuencial, ptoemi, cod, fecha1, fecha2]);

    const handleClear = useCallback(() => {
        setSecuencial("");
        setPtoemi("");
        setCod("");
        setFecha1("");
        setFecha2("");
        router.push(pathname);
    }, [router, pathname]);

    const hasFilters = secuencial || ptoemi || cod || fecha1 || fecha2;

    return (
        <Box
            sx={{
                mb: 4,
                p: 3,
                borderRadius: 3,
                border: "1px solid",
                borderColor: "divider",
                backgroundColor: "background.paper",
                boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
            }}
        >
            {/* Main search row */}
            <Stack direction={{ xs: "column", sm: "row" }} spacing={2} alignItems="flex-start">
                <TextField
                    value={secuencial}
                    onChange={(e) => setSecuencial(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                    placeholder="Buscar por N° correlativo (ej: 0040497)"
                    size="small"
                    fullWidth
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <SearchIcon fontSize="small" color="action" />
                            </InputAdornment>
                        ),
                    }}
                    sx={{ "& .MuiOutlinedInput-root": { borderRadius: 2 } }}
                />
                <Button
                    onClick={handleSearch}
                    variant="contained"
                    disableElevation
                    sx={{ borderRadius: 2, textTransform: "none", fontWeight: "bold", minWidth: 110, height: 40 }}
                >
                    Buscar
                </Button>
                <Button
                    onClick={() => setShowAdvanced((v) => !v)}
                    variant="outlined"
                    startIcon={<TuneIcon />}
                    sx={{ borderRadius: 2, textTransform: "none", height: 40, minWidth: 120, whiteSpace: "nowrap" }}
                >
                    {showAdvanced ? "Ocultar" : "Filtros"}
                </Button>
                {hasFilters && (
                    <Button
                        onClick={handleClear}
                        color="inherit"
                        startIcon={<ClearIcon />}
                        sx={{ borderRadius: 2, textTransform: "none", height: 40, color: "text.secondary" }}
                    >
                        Limpiar
                    </Button>
                )}
            </Stack>

            {/* Advanced filters */}
            <Collapse in={showAdvanced}>
                <Stack direction={{ xs: "column", sm: "row" }} spacing={2} sx={{ mt: 2 }}>
                    <TextField
                        label="Serie (ej: F001)"
                        value={ptoemi}
                        onChange={(e) => setPtoemi(e.target.value.toUpperCase())}
                        size="small"
                        sx={{ flex: 1, "& .MuiOutlinedInput-root": { borderRadius: 2 } }}
                    />
                    <FormControl size="small" sx={{ flex: 1, "& .MuiOutlinedInput-root": { borderRadius: 2 } }}>
                        <InputLabel>Tipo de documento</InputLabel>
                        <Select
                            value={cod}
                            label="Tipo de documento"
                            onChange={(e) => setCod(e.target.value)}
                        >
                            {DOC_TYPES.map((t) => (
                                <MenuItem key={t.value} value={t.value}>
                                    {t.label}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <TextField
                        label="Fecha desde"
                        type="date"
                        value={fecha1}
                        onChange={(e) => setFecha1(e.target.value)}
                        size="small"
                        InputLabelProps={{ shrink: true }}
                        sx={{ flex: 1, "& .MuiOutlinedInput-root": { borderRadius: 2 } }}
                    />
                    <TextField
                        label="Fecha hasta"
                        type="date"
                        value={fecha2}
                        onChange={(e) => setFecha2(e.target.value)}
                        size="small"
                        InputLabelProps={{ shrink: true }}
                        sx={{ flex: 1, "& .MuiOutlinedInput-root": { borderRadius: 2 } }}
                    />
                </Stack>
            </Collapse>
        </Box>
    );
}
