"use client";

import { Box, Button } from "@mui/material";
import { useEffect, useState } from "react";
import AddItemModal from "../components/AddItemModal";
import PantryList from "../components/PantryList";

export default function Pantry() {
  const [pantryList, setPantryList] = useState([]);
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const fetchData = async () => {
    const response = await fetch("/api/pantry");
    const data = await response.json();
    setPantryList(data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleAddItem = async (itemName) => {
    await fetch("/api/pantry", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ itemName }),
    });
    fetchData();
  };

  const handleDeleteItem = async (itemName) => {
    await fetch("/api/pantry", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ itemName }),
    });
    fetchData();
  };
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      gap={2}
      p={3}
    >
      <AddItemModal
        open={open}
        onClose={handleClose}
        handleAddItem={handleAddItem}
      />
      <Button variant="contained" color="primary" onClick={handleOpen}>
        Add Item
      </Button>
      <PantryList pantryList={pantryList} handleDeleteItem={handleDeleteItem} />
    </Box>
  );
}
