import { Box, Stack, Typography } from "@mui/material";
import PantryItem from "./PantryItem";
import { useTheme } from "@mui/material/styles";

export default function PantryList({ pantryList, handleDeleteItem }) {
  const theme = useTheme();

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100vh",
        width: "100%",
        overflow: "hidden",
      }}
    >
      <Box
        sx={{
          width: "100%",
          bgcolor: theme.palette.primary.main,
          p: 2,
        }}
      >
        <Typography
          variant="h4"
          color={theme.palette.primary.contrastText}
          textAlign="center"
        >
          Pantry Items
        </Typography>
      </Box>
      <Stack
        sx={{
          flexGrow: 1,
          overflowY: "auto",
          p: 2,
        }}
        spacing={2}
      >
        {pantryList.map(({ name, count }) => (
          <PantryItem
            key={name}
            name={name}
            count={count}
            handleDeleteItem={handleDeleteItem}
          />
        ))}
      </Stack>
    </Box>
  );
}
