import { Box, Stack } from "@mui/material";
import PantryItem from "./PantryItem";

export default function PantryList({ pantryList, onUpdate }) {
  const { pantryItems = [] } = pantryList || {};
  console.log("items", pantryItems);

  return (
    <Box sx={{ flexGrow: 1, overflow: "auto" }}>
      <Stack spacing={2}>
        {pantryItems.map(({ name, count }) => (
          <PantryItem
            key={name}
            name={name}
            count={count}
            onUpdate={onUpdate}
          />
        ))}
      </Stack>
    </Box>
  );
}
