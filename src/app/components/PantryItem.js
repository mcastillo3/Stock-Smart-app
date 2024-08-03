import { Box, Button, IconButton, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

export default function PantryItem({ name, count, onUpdate }) {
  const handleIncrement = () => {
    onUpdate(name, count + 1);
  };

  const handleDecrement = () => {
    onUpdate(name, count - 1);
  };

  return (
    <Box
      key={name}
      width="100%"
      minHeight="auto"
      display={"flex"}
      justifyContent={"space-between"}
      paddingX={5}
      paddingLeft={5}
      alignItems={"center"}
      bgcolor={"#f0f0f0"}
    >
      <Box flexBasis={"30%"} flexGrow={0}>
        <Typography variant={"h5"} color={"#333"} textAlign={"center"}>
          {name.charAt(0).toUpperCase() + name.slice(1)}
        </Typography>
      </Box>
      <Box flexBasis={"30%"} flexGrow={0} display="flex" alignItems="center">
        <IconButton onClick={handleDecrement} size="small">
          <RemoveIcon />
        </IconButton>
        <Typography variant="body1" sx={{ mx: 1 }}>
          {count}
        </Typography>
        <IconButton onClick={handleIncrement} size="small">
          <AddIcon />
        </IconButton>
      </Box>
      <Box flexBasis={"10%"} flexGrow={0} textAlign={"right"}>
        <Button
          variant="contained"
          color="error"
          onClick={() => onUpdate(name, 0)}
        >
          Delete
        </Button>
      </Box>
    </Box>
  );
}
