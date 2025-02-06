"use client";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { Button, Menu, MenuItem, Box } from "@mui/material";
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
    event: React.MouseEvent<HTMLButtonElement>,
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
        pagination={{
          clickable: true,
        }}
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
        modules={[Pagination, Navigation]}
        className="mySwiper"
      >
        {categories.map((category) => (
          <SwiperSlide key={category.id}>
            <Box sx={{ display: "flex", justifyContent: "center" }}>
              {/* <Image src="/gpu-mining.png" width={80} height={80} alt="icono" /> */}
            </Box>
            <Button
              variant="text"
              id="demo-positioned-button"
              aria-controls={open ? "demo-positioned-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
              onClick={(event) =>
                handleClick(event, category.subcategory, category.slug)
              } // Pasa el slug de la categoría
              sx={{ width: "100%", height: "100%", mb: 4 }}
            >
              {category.soplinea.nom_line}
            </Button>
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
