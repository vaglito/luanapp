"use client";
import React, { useState } from "react";
import {
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Typography,
  Button,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useRouter } from "next/navigation";

interface StoreDialogProps {
  open: boolean;
  handleClose: () => void;
  title: string;
  schedules: string[];
  whatsappNumber?: string; // Opcional si aplica servicio de garantía
}

const StoreDialog: React.FC<StoreDialogProps> = ({
  open,
  handleClose,
  title,
  schedules,
  whatsappNumber,
}) => {
  const router = useRouter();
  const message = "Hola, quiero gestionar mi garantía.";
  const whatsappUrl = whatsappNumber
    ? `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`
    : null;

  return (
    <Dialog open={open} onClose={handleClose} aria-labelledby="responsive-dialog-title">
      <DialogTitle id="responsive-dialog-title">{title}</DialogTitle>
      <DialogContent>
        <DialogContentText>
          {schedules.map((schedule, index) => (
            <Typography key={index} variant="h6" gutterBottom>
              {schedule}
            </Typography>
          ))}
        </DialogContentText>
        {whatsappUrl && (
          <Button
            fullWidth
            variant="contained"
            color="primary"
            sx={{ mt: 2 }}
            onClick={() => router.push(whatsappUrl)}
          >
            Contactar Servicio de Garantía
          </Button>
        )}
      </DialogContent>
      <DialogActions>
        <IconButton color="primary" onClick={handleClose} aria-label="Cerrar">
          <CloseIcon />
        </IconButton>
      </DialogActions>
    </Dialog>
  );
};

interface StoreCardProps {
  title: string;
  description: string;
  image: string;
  schedules: string[];
  whatsappNumber?: string;
}

const StoreCard: React.FC<StoreCardProps> = ({
  title,
  description,
  image,
  schedules,
  whatsappNumber,
}) => {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <Card sx={{ maxWidth: 500, margin: "auto", marginY: 3 }}>
      <CardMedia sx={{ height: 300 }} image={image} title={title} />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {title}
        </Typography>
        <Typography variant="body2" sx={{ color: "text.secondary" }}>
          {description}
        </Typography>
      </CardContent>
      <CardActions>
        <Button variant="outlined" onClick={handleClickOpen}>
          Ver horarios
        </Button>
      </CardActions>
      <StoreDialog
        open={open}
        handleClose={handleClose}
        title="Nuestros horarios"
        schedules={schedules}
        whatsappNumber={whatsappNumber}
      />
    </Card>
  );
};

// Uso de los componentes StoreCard
export function Store118Card() {
  return (
    <StoreCard
      title="Tienda N° 118 - Compuplaza (Principal)"
      description="Ubicada en la Galería Compuplaza en el centro de Lima, esta tienda es la principal. Aquí encontrarás variedad de productos y servicio técnico."
      image="/tiendas/tienda-118-compuplaza.jpg"
      schedules={[
        "Horario de tienda: Lunes a Sábado de 10:00am a 8:00pm.",
        "Horario de garantía: Lunes a Viernes de 10:00am a 6:00pm.",
      ]}
      whatsappNumber="51902719360"
    />
  );
}

export function Store209Card() {
  return (
    <StoreCard
      title="Tienda N° 209 - Compuplaza"
      description="Ubicada en la Galería Compuplaza en el centro de Lima. Aquí encontrarás variedad de productos."
      image="/tiendas/tienda-209-compuplaza.JPEG"
      schedules={["Horario de tienda: Lunes a Sábado de 10:00am a 8:00pm."]}
    />
  );
}
