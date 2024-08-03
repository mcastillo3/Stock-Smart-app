import { Typography, Box } from "@mui/material";

export default function Home() {
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      minHeight="100vh"
    >
      <Typography variant="h1" component="h1">
        Welcome to StockSmart
      </Typography>
      <Typography variant="h5" component="h2">
        A place to store items and manage your inventory
      </Typography>
    </Box>
  );
}
