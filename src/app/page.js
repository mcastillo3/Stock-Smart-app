import { CheckBox } from "@mui/icons-material";
import { Typography, Box } from "@mui/material";

export default function Home() {
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      minHeight="80vh"
    >
      <Typography variant="h1" component="h1" sx={{ paddingBottom: "10px" }}>
        Welcome to StockSmart
      </Typography>
      <Typography variant="h5" component="h2" sx={{ paddingBottom: "10px" }}>
        A place to store items and manage your inventory. <br />
      </Typography>
      <Typography variant="h6" component="h3" sx={{ fontStyle: "italic" }}>
        <CheckBox /> Add pantry items <br />
        <CheckBox /> Manage your inventory <br />
        <CheckBox /> Get smart recipes recommendations <br />
        <CheckBox /> Smart scan with AI
      </Typography>
    </Box>
  );
}
