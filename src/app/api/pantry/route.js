import { NextResponse } from "next/server";
import { getAuth } from "@clerk/nextjs/server";
import {
  addPantryItem,
  getPantryItems,
  updatePantryItem,
  deletePantryItem,
} from "../../../server/firestore";

export async function GET(request) {
  const { userId } = getAuth(request);

  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const items = await getPantryItems(userId);
    return NextResponse.json({ pantryItems: items });
  } catch (error) {
    return NextResponse.json(
      { error: "Error fetching pantry items" },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  const { userId } = getAuth(request);

  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { itemName } = await request.json();
    const newItem = await addPantryItem(userId, { name: itemName, count: 1 });
    return NextResponse.json({
      message: "Item added to pantry",
      item: newItem,
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Error adding pantry item" },
      { status: 500 }
    );
  }
}

export async function PUT(request) {
  const { userId } = getAuth(request);

  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { itemName, count } = await request.json();
    const updatedItem = await updatePantryItem(userId, {
      name: itemName,
      count,
    });
    return NextResponse.json({
      message: "Item updated in pantry",
      item: updatedItem,
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Error updating pantry item" },
      { status: 500 }
    );
  }
}

export async function DELETE(request) {
  const { userId } = getAuth(request);

  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { itemName } = await request.json();
    await deletePantryItem(userId, { name: itemName });
    return NextResponse.json({ message: "Item deleted from pantry" });
  } catch (error) {
    return NextResponse.json(
      { error: "Error deleting pantry item" },
      { status: 500 }
    );
  }
}
