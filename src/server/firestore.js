import { firestore } from "./firebase";
import {
  collection,
  addDoc,
  getDocs,
  query,
  where,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";

export const addPantryItem = async (userId, item) => {
  try {
    const docRef = await addDoc(collection(firestore, "pantryItems"), {
      userId,
      name: item.name,
      count: item.count,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    return { id: docRef.id, ...item };
  } catch (error) {
    console.error("Error adding pantry item: ", error);
    throw error;
  }
};

export const getPantryItems = async (userId) => {
  try {
    const q = query(
      collection(firestore, "pantryItems"),
      where("userId", "==", userId)
    );

    const querySnapshot = await getDocs(q);

    return querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
  } catch (error) {
    console.error("Error getting pantry items: ", error);
    throw error;
  }
};

export const updatePantryItem = async (userId, updates) => {
  try {
    console.log(
      `Updating item: ${updates.name} and ${updates.count} for user: ${userId}`
    );

    const q = query(
      collection(firestore, "pantryItems"),
      where("userId", "==", userId),
      where("name", "==", updates.name)
    );
    const snapshot = await getDocs(q);

    console.log(`Query snapshot size: ${snapshot.size}`);

    if (snapshot.empty) {
      throw new Error("Item not found");
    }

    const doc = snapshot.docs[0]; // Get the first document
    const docRef = doc.ref; // Get the DocumentReference

    console.log("Updating document with data:", {
      ...updates,
      updatedAt: new Date(),
    });

    await updateDoc(docRef, {
      ...updates,
      updatedAt: new Date(),
    });
    return { id: userId, name: updates, count: updates, ...updates };
  } catch (error) {
    console.error("Error updating pantry item: ", error);
    throw error;
  }
};

export const deletePantryItem = async (userId, itemName) => {
  try {
    console.log(
      `Attempting to delete item: ${itemName.name} for user ${userId}`
    );

    const q = query(
      collection(firestore, "pantryItems"),
      where("userId", "==", userId),
      where("name", "==", itemName.name)
    );

    const snapshot = await getDocs(q);

    console.log(`Query snapshot size for delete: ${snapshot.size}`);

    if (snapshot.empty) {
      throw new Error("Item not found");
    }

    const doc = snapshot.docs[0];
    const docRef = doc.ref;

    await deleteDoc(docRef);

    return itemName.name;
  } catch (error) {
    console.error("Error deleting pantry item: ", error);
    throw error;
  }
};
