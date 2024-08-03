"use client";

import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  useTheme,
} from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/navigation";
import KitchenIcon from "@mui/icons-material/Kitchen";
import {
  FilterCenterFocus,
  Inventory,
  MenuBook,
  Store,
} from "@mui/icons-material";

const navItems = [
  { text: "Pantry", href: "/pantry", icon: <KitchenIcon /> },
  { text: "Inventory", href: "/inventory", icon: <Inventory /> },
  { text: "Recipes", href: "/recipes", icon: <MenuBook /> },
  { text: "Scan", href: "/scan", icon: <FilterCenterFocus /> },
];

export default function Navigation() {
  const router = useRouter();
  const theme = useTheme();
  return (
    <Box
      sx={{
        width: 250,
        height: "100vh",
        bgcolor: theme.palette.primary.main,
        padding: 2,
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          padding: 2,
          cursor: "pointer",
          transition: "background-color 0.3s ease",
          "&:hover": {
            backgroundColor: theme.palette.primary.light,
          },
        }}
        onClick={() => router.push("/")}
      >
        <Store sx={{ mr: 1 }} />
        <Typography variant="h6" component="div">
          StockSmart
        </Typography>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          height: "35%",
        }}
      >
        <List>
          {navItems.map((item) => (
            <ListItem key={item.text} disablePadding>
              <ListItemButton component={Link} href={item.href}>
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Box>
    </Box>
  );
}
