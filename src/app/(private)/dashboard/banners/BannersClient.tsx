"use client";

import React, { useState } from "react";
import {
  Box,
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Switch,
  FormControlLabel,
  Typography,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import { Banner } from "@/types/banner.type";
import { createBanner, deleteBanner, updateBanner } from "@/services/dashboard/admin/banner";

interface BannersClientProps {
  initialBanners: Banner[];
}

export const BannersClient = ({ initialBanners }: BannersClientProps) => {
  const [banners, setBanners] = useState<Banner[]>(initialBanners);
  const [openEdit, setOpenEdit] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [currentBanner, setCurrentBanner] = useState<Banner | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  // Modales
  const handleOpenEdit = (banner?: Banner) => {
    if (banner) {
      setCurrentBanner(banner);
    } else {
      // Valores iniciales para un nuevo banner
      setCurrentBanner({ id: 0, title: "", image: "", isActive: true, order: 1, link: "" });
    }
    setOpenEdit(true);
  };

  const handleCloseEdit = () => {
    setOpenEdit(false);
    setCurrentBanner(null);
    setImageFile(null);
  };

  const handleOpenDelete = (banner: Banner) => {
    setCurrentBanner(banner);
    setOpenDelete(true);
  };

  const handleCloseDelete = () => {
    setOpenDelete(false);
    setCurrentBanner(null);
  };

  // Acciones
  const handleSave = async () => {
    if (currentBanner) {
      setLoading(true);
      const formData = new FormData();
      formData.append("title", currentBanner.title);
      formData.append("order", String(currentBanner.order));
      formData.append("isActive", String(currentBanner.isActive));
      if (currentBanner.link) formData.append("link", currentBanner.link);
      if (imageFile) formData.append("image", imageFile);

      if (currentBanner.id !== 0) {
        // Lógica de Actualización
        const updated = await updateBanner(currentBanner.id, formData);
        if (updated) {
          setBanners((prev) => prev.map((b) => (b.id === updated.id ? updated : b)));
          handleCloseEdit();
        } else {
          alert("Error al actualizar. Revisa la consola o asegúrate de tener conexión.");
        }
      } else {
        // Lógica de Creación
        const created = await createBanner(formData);
        if (created) {
          setBanners((prev) => [...prev, created]);
          handleCloseEdit();
        } else {
          alert("Error al crear. Revisa la consola o asegúrate de tener conexión.");
        }
      }
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (currentBanner) {
      setLoading(true);
      const success = await deleteBanner(currentBanner.id);
      if (success) {
        // Lógica de Eliminación local
        setBanners((prev) => prev.filter((b) => b.id !== currentBanner.id));
      }
      setLoading(false);
    }
    handleCloseDelete();
  };

  return (
    <Box>
      <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 3 }}>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => handleOpenEdit()}
          sx={{ borderRadius: "12px", textTransform: "none", fontFamily: "Inter" }}
        >
          Nuevo Banner
        </Button>
      </Box>

      <TableContainer component={Paper} sx={{ borderRadius: "16px", boxShadow: "0 4px 20px rgba(0,0,0,0.05)" }}>
        <Table>
          <TableHead sx={{ bgcolor: "grey.50" }}>
            <TableRow>
              <TableCell sx={{ fontFamily: "Inter", fontWeight: 600 }}>Imagen</TableCell>
              <TableCell sx={{ fontFamily: "Inter", fontWeight: 600 }}>Título</TableCell>
              <TableCell sx={{ fontFamily: "Inter", fontWeight: 600 }} align="center">Orden</TableCell>
              <TableCell sx={{ fontFamily: "Inter", fontWeight: 600 }}>Estado</TableCell>
              <TableCell align="right" sx={{ fontFamily: "Inter", fontWeight: 600 }}>Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {banners.map((banner) => (
              <TableRow key={banner.id} hover>
                <TableCell>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={banner.image} alt={banner.title} width={150} style={{ borderRadius: "8px", objectFit: "cover" }} />
                </TableCell>
                <TableCell><Typography variant="body2">{banner.title}</Typography></TableCell>
                <TableCell align="center"><Typography variant="body2">{banner.order}</Typography></TableCell>
                <TableCell>
                  <Box
                    component="span"
                    sx={{
                      px: 2, py: 0.5, borderRadius: "12px", fontSize: "0.75rem", fontWeight: "bold",
                      bgcolor: banner.isActive ? "success.light" : "error.light",
                      color: banner.isActive ? "success.dark" : "error.dark",
                    }}
                  >
                    {banner.isActive ? "ACTIVO" : "INACTIVO"}
                  </Box>
                </TableCell>
                <TableCell align="right">
                  <IconButton onClick={() => handleOpenEdit(banner)} color="primary">
                    <EditIcon />
                  </IconButton>
                  <IconButton onClick={() => handleOpenDelete(banner)} color="error">
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
            {banners.length === 0 && (
              <TableRow>
                <TableCell colSpan={5} align="center" sx={{ py: 3 }}>No hay banners registrados.</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Modal Editar / Crear */}
      <Dialog open={openEdit} onClose={handleCloseEdit} maxWidth="sm" fullWidth>
        <DialogTitle sx={{ fontFamily: "Orbitron" }}>{currentBanner?.id ? "Editar Banner" : "Nuevo Banner"}</DialogTitle>
        <DialogContent dividers>
          <Box display="flex" flexDirection="column" gap={3} sx={{ pt: 1 }}>
            <TextField label="Título" fullWidth value={currentBanner?.title || ""} onChange={(e) => setCurrentBanner((prev) => prev ? { ...prev, title: e.target.value } : null)} />
            
            <Box>
              <Button variant="outlined" component="label" fullWidth sx={{ textTransform: "none", fontFamily: "Inter" }}>
                {imageFile ? "Cambiar Imagen" : "Subir Imagen"}
                <input
                  type="file"
                  hidden
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      setImageFile(file);
                      setCurrentBanner((prev) => prev ? { ...prev, image: URL.createObjectURL(file) } : null);
                    }
                  }}
                />
              </Button>
              {(imageFile || (currentBanner?.image && currentBanner.image !== "")) && (
                <Box mt={2} display="flex" justifyContent="center">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={currentBanner?.image} alt="Preview" style={{ maxWidth: '100%', maxHeight: '160px', borderRadius: '8px', objectFit: 'contain' }} />
                </Box>
              )}
            </Box>

            <TextField label="Enlace (URL)" fullWidth value={currentBanner?.link || ""} onChange={(e) => setCurrentBanner((prev) => prev ? { ...prev, link: e.target.value } : null)} />
            <TextField label="Orden" type="number" fullWidth value={currentBanner?.order || 1} onChange={(e) => setCurrentBanner((prev) => prev ? { ...prev, order: Number(e.target.value) } : null)} />
            <FormControlLabel control={<Switch checked={currentBanner?.isActive || false} onChange={(e) => setCurrentBanner((prev) => prev ? { ...prev, isActive: e.target.checked } : null)} />} label="Activo" />
          </Box>
        </DialogContent>
        <DialogActions sx={{ p: 2 }}>
          <Button onClick={handleCloseEdit} color="inherit">Cancelar</Button>
          <Button variant="contained" onClick={handleSave} disabled={loading}>
            {loading ? "Guardando..." : "Guardar"}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Modal Eliminar */}
      <Dialog open={openDelete} onClose={handleCloseDelete}>
        <DialogTitle sx={{ fontFamily: "Orbitron" }}>Eliminar Banner</DialogTitle>
        <DialogContent>
          ¿Estás seguro de que deseas eliminar el banner <strong>{currentBanner?.title}</strong>? Esta acción es irreversible.
        </DialogContent>
        <DialogActions sx={{ p: 2 }}>
          <Button onClick={handleCloseDelete} color="inherit">Cancelar</Button>
          <Button variant="contained" color="error" onClick={handleDelete} disabled={loading}>
            {loading ? "Eliminando..." : "Eliminar"}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};