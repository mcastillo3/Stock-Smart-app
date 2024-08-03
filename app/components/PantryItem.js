import { Box, Button, Typography } from "@mui/material";

export default function PantryItem({ name, count, handleDeleteItem }) {
  return (
    <Box
      key={name}
      width="100%"
      minHeight="150px"
      display={"flex"}
      justifyContent={"space-between"}
      paddingX={5}
      paddingLeft={5}
      alignItems={"center"}
      bgcolor={"#f0f0f0"}
    >
      <Typography variant={"h3"} color={"#333"} textAlign={"center"}>
        {
          // Capitalize the first letter of the item
          name.charAt(0).toUpperCase() + name.slice(1)
        }
      </Typography>
      <Typography variant={"h3"} color={"#333"} textAlign={"center"}>
        Quantity: {count}
      </Typography>
      <Button
        variant="contained"
        color="error"
        onClick={() => handleDeleteItem(name)}
      >
        Delete
      </Button>
    </Box>
  );
}
