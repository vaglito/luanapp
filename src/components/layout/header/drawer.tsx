import Link from "next/link";
import {
  Box,
  List,
  ListItemButton,
  ListItemText,
  Divider,
} from "@mui/material";

interface NavLink {
  id: number;
  title: string;
  path: string;
}

interface Props {
  navlinks: NavLink[];
  onNavigate: () => void;
}

export function DrawerMobile({ navlinks, onNavigate }: Props) {
  return (
    <Box sx={{ p: 2 }}>
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
            }}
          >
            <ListItemText
              primary={link.title}
              primaryTypographyProps={{
                fontWeight: 500,
              }}
            />
          </ListItemButton>
        ))}
      </List>

      <Divider sx={{ my: 2 }} />
    </Box>
  );
}
