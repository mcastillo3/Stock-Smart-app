import { Box, Stack } from "@mui/material";
import PantryItem from "./PantryItem";

export default function PantryList({ pantryList, handleDeleteItem, onUpdate }) {
  return (
    <Box sx={{ flexGrow: 1, overflow: "auto" }}>
      <Stack spacing={2}>
        {pantryList.map(({ name, count }) => (
          <PantryItem
            key={name}
            name={name}
            count={count}
            handleDeleteItem={handleDeleteItem}
            onUpdate={onUpdate}
          />
        ))}
      </Stack>
    </Box>
  );
}
