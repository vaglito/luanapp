import Link from "next/link";
import {
  Box,
  List,
  ListItemButton,
  ListItemText,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

interface NavLink {
  id: number;
  title: string;
  path: string;
}

interface Props {
  navlinks: NavLink[];
  onNavigate: () => void;
  onClose: () => void;
}

export function DrawerMobile({ navlinks, onNavigate, onClose }: Props) {
  return (
    <Box sx={{ p: 2 }}>
      <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
        <IconButton onClick={onClose} sx={{ color: "white" }}>
          <CloseIcon />
        </IconButton>
      </Box>
      <List>
        {navlinks.map((link) => (
          <ListItemButton
            key={link.id}
            component={Link}
            href={link.path}
            onClick={onNavigate}
            sx={{
              borderRadius: 2,
              mb: 0.5,
              "&:hover": {
                backgroundColor: "rgba(255,255,255,0.2)",
              },
            }}
          >
            <ListItemText
              primary={link.title}
              slotProps={{
                primary: {
                  fontWeight: 500,
                  color: "white",
                },
              }}
            />
          </ListItemButton>
        ))}
      </List>
    </Box>
  );
}
