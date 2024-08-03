import {
  Box,
  Button,
  Modal,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useState, useCallback } from "react";

const style = {
  position: "absolute",
  display: "flex",
  flexDirection: "column",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  gap: 2,
};

export default function AddItemModal({ open, handleClose, handleAddItem }) {
  const [itemName, setItemName] = useState("");

  const handleSubmit = useCallback(() => {
    if (itemName.trim()) {
      handleAddItem(itemName.trim());
      setItemName("");
    }
  }, [itemName, handleAddItem]);

  const handleKeyDown = useCallback(
    (event) => {
      if (event.key === "Enter") {
        handleSubmit();
      }
    },
    [handleSubmit]
  );

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      disableEscapeKeyDown={false}
    >
      <Box sx={style}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          Add Item
        </Typography>
        <Stack width={"100%"} direction={"row"} spacing={2}>
          <TextField
            id="outlined-basic"
            label="Item"
            variant="outlined"
            fullWidth
            value={itemName}
            onChange={(e) => setItemName(e.target.value)}
            onKeyDown={handleKeyDown}
            autoFocus
          />
          <Button variant="contained" onClick={handleSubmit}>
            Add
          </Button>
        </Stack>
      </Box>
    </Modal>
  );
}
