import { Box, Typography, Paper } from "@mui/material";
import { typeComputer } from "@/app/types/computer.type";
import Image from "next/image";
import Link from "next/link";

export function Computer({ data }: { data: typeComputer[] }) {
  return (
    <Box
      sx={{ display: "flex", flexDirection: "row", justifyContent: "center" }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          justifyContent: { xs: "center", md: "space-around" },
          gap: { xs: 5, md: 10, lg: 10 },
        }}
      >
        {data.map((item) => (
          <Box key={item.id}>
            <Link href={`/computadoras/${item.slug}`}>
              <Paper elevation={24} sx={{ borderRadius: 5 }}>
                <Box
                  sx={{
                    position: "relative",
                    width: "100%",
                    height: "100%",
                    overflow: "hidden",
                    borderRadius: 5,
                    "& img": {
                      transition:
                        "transform 0.6s cubic-bezier(0.22, 1, 0.36, 1), filter 0.6s ease, box-shadow 0.6s ease",
                      transform: "scale(1)",
                      filter: "blur(2px)",
                      boxShadow: "none",
                    },
                    "&:hover img": {
                      transform: "scale(1.1)",
                      filter: "blur(0px)",
                      boxShadow: "0 10px 20px rgba(0, 0, 0, 0.3)",
                    },
                  }}
                >
                  <Image
                    src={item.image}
                    alt={`Imagen de ${item.title}`}
                    width={440}
                    height={550}
                    style={{ borderRadius: 5, objectFit: "cover" }}
                  />
                  {/* Overlay */}
                  <Box
                    sx={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                      width: "100%",
                      height: "100%",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "flex-end",
                      alignItems: "center",
                      bgcolor: "rgba(0,0,0,0.3)",
                      borderRadius: 5,
                      p: 3,
                    }}
                  >
                    <Box>
                      <Typography
                        sx={{
                          color: "white",
                          fontWeight: "bold",
                          textShadow: "1px 1px 4px rgba(0,0,0,0.8)",
                          mb: 2,
                          fontSize: 30,
                          textAlign: "center",
                        }}
                      >
                        {item.title}
                      </Typography>
                      <Typography
                        sx={{
                          color: "white",
                          fontSize: 19,
                          textAlign: "justify",
                        }}
                      >
                        {item.description}
                      </Typography>
                    </Box>
                  </Box>
                </Box>
              </Paper>
            </Link>
          </Box>
        ))}
      </Box>
    </Box>
  );
}