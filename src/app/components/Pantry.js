"use client";

import { Box, Button, Typography } from "@mui/material";
import { useEffect, useState, useCallback } from "react";
import AddItemModal from "../components/AddItemModal";
import PantryList from "../components/PantryList";
import { useTheme } from "@mui/material/styles";

export default function Pantry() {
  const [pantryList, setPantryList] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const theme = useTheme();

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = useCallback(() => setIsModalOpen(false), []);

  const fetchData = useCallback(async () => {
    const response = await fetch("/api/pantry");
    const data = await response.json();
    setPantryList(data);
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleAddItem = useCallback(
    async (itemName) => {
      await fetch("/api/pantry", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ itemName }),
      });
      fetchData();
    },
    [fetchData]
  );

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

  const handleUpdate = useCallback(
    async (name, newCount) => {
      if (newCount <= 0) {
        await fetch("/api/pantry", {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ itemName: name }),
        });
      } else {
        await fetch("/api/pantry", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ itemName: name, count: newCount }),
        });
      }
      fetchData();
    },
    [fetchData]
  );

  const handleAddItemAndCloseModal = useCallback(
    (itemName) => {
      handleAddItem(itemName);
      handleCloseModal();
    },
    [handleAddItem, handleCloseModal]
  );

  return (
    <Box display="flex" flexDirection="column" gap={2} p={3}>
      <Box
        sx={{
          alignSelf: "flex-start",
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
      <Box alignSelf="flex-start">
        <AddItemModal
          open={isModalOpen}
          handleClose={handleCloseModal}
          handleAddItem={handleAddItemAndCloseModal}
        />
        <Button variant="contained" color="primary" onClick={handleOpenModal}>
          Add Item
        </Button>
      </Box>

      <PantryList
        pantryList={pantryList}
        handleDeleteItem={handleDeleteItem}
        onUpdate={handleUpdate}
      />
    </Box>
  );
}
