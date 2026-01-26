import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Box, Typography, Menu, MenuItem } from "@mui/material";
import { Categories, SubCategories } from "@/types/categories.type";
import { styled } from "@mui/material/styles";
import Tooltip, { TooltipProps, tooltipClasses } from "@mui/material/Tooltip";

const BootstrapTooltip = styled(({ className, ...props }: TooltipProps) => (
  <Tooltip {...props} arrow classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.arrow}`]: {
    color: theme.palette.common.black,
  },
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: theme.palette.common.black,
  },
}));

export const CardCategory = ({ category }: { category: Categories }) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [open, setOpen] = useState(false);
  const [selectedSubcategories, setSelectedSubcategories] = useState<SubCategories[]>([]);
  const [selectedCategorySlug, setSelectedCategorySlug] = useState<string>("");

  const handleClick = (
    event: React.MouseEvent<HTMLImageElement>,
    subcategories: SubCategories[],
    categorySlug: string
  ) => {
    setAnchorEl(event.currentTarget);
    setSelectedSubcategories(subcategories);
    setSelectedCategorySlug(categorySlug);
    setOpen(true);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setOpen(false);
  };

  return (
    <>
      <BootstrapTooltip title={category.relay.categoryName} placement="top" arrow>
        <Box
          sx={{
            position: "relative",
            width: { xs: 120, sm: 140, md: 200 },
            height: { xs: 120, sm: 140, md: 200 },
            mx: "auto",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {/* Decorative Gradient Ring */}
          <Box
            sx={{
              position: "absolute",
              inset: 0,
              borderRadius: "50%",
              background: "linear-gradient(135deg, #5914A3 0%, #A3147F 100%)",
              opacity: 0.1,
              transform: "scale(0.9)",
              transition: "transform 0.4s ease-out, opacity 0.4s ease-out",
              ".group:hover &": {
                transform: "scale(1.1)",
                opacity: 0.2,
              }
            }}
          />

          <Box
            className="group"
            sx={{
              position: "relative",
              width: "100%",
              height: "100%",
              borderRadius: "50%",
              backgroundColor: "white",
              padding: 0.5, // Border gap
              boxShadow: "0 8px 24px rgba(0,0,0,0.08)",
              cursor: "pointer",
              transition: "transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 0.3s ease",
              "&:hover": {
                transform: "translateY(-5px) scale(1.02)",
                boxShadow: "0 12px 30px rgba(89, 20, 163, 0.15)",
                "& .gradient-border": {
                  opacity: 1,
                }
              },
            }}
            onClick={(event: React.MouseEvent<HTMLDivElement>) =>
              handleClick(event as any, category.categoriesWeb, category.relay.categoryweb)
            }
          >
            {/* Gradient Border Overlay */}
            <Box
              className="gradient-border"
              sx={{
                position: "absolute",
                inset: 0,
                borderRadius: "50%",
                padding: "3px", // Border width
                background: "linear-gradient(135deg, #5914A3, #A3147F)",
                WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                WebkitMaskComposite: "xor",
                maskComposite: "exclude",
                opacity: 0,
                transition: "opacity 0.3s ease",
              }}
            />

            <Box
              sx={{
                width: "100%",
                height: "100%",
                borderRadius: "50%",
                overflow: "hidden",
                bgcolor: "#f5f5f5",
                position: "relative",
              }}
            >
              {category.image ? (
                <Image
                  src={category.image}
                  alt={category.relay.categoryName}
                  fill
                  sizes="(max-width: 768px) 150px, 200px"
                  style={{
                    objectFit: "cover",
                    transition: "transform 0.5s ease",
                  }}
                  className="group-hover:scale-110"
                />
              ) : (
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    height: "100%",
                    background: "linear-gradient(135deg, #f3e8ff 0%, #fce7f3 100%)"
                  }}
                >
                  <Typography
                    variant="body1"
                    sx={{
                      fontWeight: 700,
                      color: "primary.main",
                      textAlign: "center",
                      px: 1,
                      fontSize: "0.9rem"
                    }}
                  >
                    {category.relay.categoryName}
                  </Typography>
                </Box>
              )}
            </Box>
          </Box>

          {/* Label below circle */}
          <Typography
            variant="subtitle2"
            sx={{
              position: "absolute",
              bottom: { xs: -35, md: -40 },
              width: "140%",
              textAlign: "center",
              fontWeight: 700,
              color: "text.primary",
              opacity: 0.9,
              transition: "all 0.3s ease",
              fontSize: { xs: "0.75rem", sm: "0.85rem", md: "1rem" },
              lineHeight: 1.2,
              letterSpacing: "0.01em",
              ".group:hover + &": {
                transform: "translateY(5px)",
                color: "#5914A3",
              }
            }}
          >
            {category.relay.categoryName}
          </Typography>
        </Box>
      </BootstrapTooltip>

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
        {selectedSubcategories
          .filter((subcategory) => subcategory.isActive)
          .map((subcategory) => (
            <Link
              href={`/productos/${selectedCategorySlug}/${subcategory.relay.subcategoryweb}`}
              key={subcategory.id}
            >
              <MenuItem onClick={handleClose}>
                {subcategory.relay.subcategoryName}
              </MenuItem>
            </Link>
          ))}
      </Menu>
    </>
  );
};
