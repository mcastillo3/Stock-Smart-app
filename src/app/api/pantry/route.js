import { firestore } from "../../../server/firebase";
import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  query,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { NextResponse } from "next/server";

export async function GET() {
  const snapshot = query(collection(firestore, "Pantry"));
  const docs = await getDocs(snapshot);
  const pantryList = [];
  docs.forEach((doc) => {
    pantryList.push({ name: doc.id, ...doc.data() });
  });
  return NextResponse.json(pantryList);
}

export async function POST(request) {
  const { itemName } = await request.json();
  const docRef = doc(collection(firestore, "Pantry"), itemName);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    await updateDoc(docRef, { count: docSnap.data().count + 1 });
  } else {
    await setDoc(docRef, { count: 1 });
  }
  return NextResponse.json({ message: "Item added to pantry" });
}

export async function PUT(request) {
  const { itemName, count } = await request.json();
  const docRef = doc(collection(firestore, "Pantry"), itemName);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    await updateDoc(docRef, { count });
  } else {
    await setDoc(docRef, { count });
  }

  return NextResponse.json({ message: "Item updated in pantry" });
}

export async function DELETE(request) {
  const { itemName } = await request.json();
  const docRef = doc(collection(firestore, "Pantry"), itemName);
  await deleteDoc(docRef);
  return NextResponse.json({ message: "Item deleted from pantry" });
}
