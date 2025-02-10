"use client";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { Typography, Menu, MenuItem, Box } from "@mui/material";
import { Categories, Subcategory } from "../../types/categories";

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

// import required modules
import { Pagination, Navigation } from "swiper/modules";

const CategoriesComponent = ({ categories }: { categories: Categories[] }) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [open, setOpen] = useState(false);
  const [selectedSubcategories, setSelectedSubcategories] = useState<
    Subcategory[]
  >([]);
  const [selectedCategorySlug, setSelectedCategorySlug] = useState<string>("");

  const handleClick = (
    event: React.MouseEvent<HTMLImageElement>,
    subcategories: Subcategory[],
    categorySlug: string
  ) => {
    setAnchorEl(event.currentTarget);
    setSelectedSubcategories(subcategories);
    setSelectedCategorySlug(categorySlug); // Guarda el slug de la categoría seleccionada
    setOpen(true);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setOpen(false);
  };

  return (
    <div>
      <Swiper
        slidesPerView={2}
        spaceBetween={10}
        navigation={true}
        breakpoints={{
          640: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          768: {
            slidesPerView: 3,
            spaceBetween: 20,
          },
          1024: {
            slidesPerView: 4,
            spaceBetween: 20,
          },
          1280: {
            slidesPerView: 5,
            spaceBetween: 20,
          },
        }}
        modules={[Navigation]}
        className="mySwiper"
      >
        {categories.map((category) => (
          <SwiperSlide key={category.id} className="py-6">
            <Box
              sx={{
                bgcolor: "#e1e1e1",
                borderRadius: "50%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                padding: 2,
                width: { xs: 190, sm: 190, md: 250 }, // Tamaño ajustable según el viewport
                height: { xs: 190, sm: 190, md: 250 },
                overflow: "hidden", // Evita que la imagen sobresalga del borde redondo
              }}
            >
              {category.image ? (
                <Image
                  src={category.image}
                  alt={`Imagen de ${category.soplinea.nom_line ?? "categoría"}`}
                  sizes="100vw"
                  width={250}
                  height={250}
                  className="transition duration-150 ease-in-out hover:scale-110"
                  style={{
                    width: "100%", // Ajustar a contenedor
                    height: "100%", // Ajustar a contenedor
                    objectFit: "cover", // Evitar distorsión
                    borderRadius: "50%", // Hacer la imagen redonda
                    cursor: "pointer",
                  }}
                  id={`category-${category.id}`}
                  aria-controls={open ? "demo-positioned-menu" : undefined}
                  aria-haspopup="true"
                  aria-expanded={open ? "true" : undefined}
                  onClick={(event: React.MouseEvent<HTMLImageElement>) =>
                    handleClick(event, category.subcategory, category.slug)
                  }
                />
              ) : (
                <Typography variant="body2" color="text.secondary">
                  No existe imagen
                </Typography>
              )}
            </Box>
          </SwiperSlide>
        ))}
      </Swiper>
      <Menu
        id="demo-positioned-menu"
        aria-labelledby="demo-positioned-button"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
      >
        {selectedSubcategories.map((subcategory) => (
          <Link
            href={`/productos/${selectedCategorySlug}/${subcategory.slug}`}
            key={subcategory.sopsub1.cod_sub1}
          >
            <MenuItem onClick={handleClose}>
              {subcategory.sopsub1.nom_sub1}
            </MenuItem>
          </Link>
        ))}
      </Menu>
    </div>
  );
};

export default CategoriesComponent;
