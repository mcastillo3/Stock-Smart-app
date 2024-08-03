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
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";

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
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      <Box>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: 2,
            cursor: "pointer",
            transition: "background-color 0.3s ease",
            "&:hover": {
              backgroundColor: theme.palette.primary.light,
            },
          }}
          onClick={() => router.push("/")}
        >
          <Store sx={{ mr: 1, color: theme.palette.primary.contrastText }} />
          <Typography
            variant="h6"
            component="div"
            sx={{ color: theme.palette.primary.contrastText }}
          >
            StockSmart
          </Typography>
        </Box>
        <SignedIn>
          <List sx={{ width: "100%" }}>
            {navItems.map((item) => (
              <ListItem key={item.text} disablePadding>
                <ListItemButton
                  component={Link}
                  href={item.href}
                  sx={{
                    justifyContent: "center",
                    "&:hover": {
                      backgroundColor: theme.palette.primary.light,
                    },
                  }}
                >
                  <ListItemIcon
                    sx={{
                      color: theme.palette.primary.contrastText,
                      minWidth: "auto",
                      mr: 1,
                    }}
                  >
                    {item.icon}
                  </ListItemIcon>
                  <ListItemText
                    primary={item.text}
                    sx={{
                      color: theme.palette.primary.contrastText,
                      "& .MuiListItemText-primary": { textAlign: "left" },
                    }}
                  />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </SignedIn>
      </Box>
      <Box
        sx={{
          p: 2,
          display: "flex",
          justifyContent: "center",
          marginTop: "auto",
          marginBottom: 4,
        }}
      >
        <SignedOut>
          <SignInButton mode="modal">
            <button
              style={{
                padding: "12px 24px",
                backgroundColor: theme.palette.secondary.main,
                color: theme.palette.secondary.contrastText,
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
                fontSize: "1.1rem",
                fontWeight: "bold",
              }}
            >
              Sign In
            </button>
          </SignInButton>
        </SignedOut>
        <SignedIn>
          <UserButton
            appearance={{
              elements: {
                avatarBox: {
                  width: "50px",
                  height: "50px",
                },
              },
            }}
          />
        </SignedIn>
      </Box>
    </Box>
  );
}
