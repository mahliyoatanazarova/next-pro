import { NextResponse } from "next/server";

import { connectToDatabase } from "@/lib/db";
import Product from "@/models/Product";

export async function GET() {
  try {
    await connectToDatabase();
    const products = await Product.find({}).sort({ createdAt: -1 }).lean();

    return NextResponse.json({ products });
  } catch (error) {
    console.error("Fetch products error:", error);
    return NextResponse.json({ error: "Unable to load products." }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, category, price, quantity } = body;

    if (!name || !category) {
      return NextResponse.json({ error: "Name and category are required." }, { status: 400 });
    }

    const parsedPrice = Number(price);
    const parsedQuantity = Number(quantity);

    if (Number.isNaN(parsedPrice) || parsedPrice < 0) {
      return NextResponse.json({ error: "Price must be a valid non-negative number." }, { status: 400 });
    }

    if (Number.isNaN(parsedQuantity) || parsedQuantity < 0) {
      return NextResponse.json({ error: "Quantity must be a valid non-negative number." }, { status: 400 });
    }

    await connectToDatabase();

    const product = await Product.create({
      name: String(name).trim(),
      category: String(category).trim(),
      price: parsedPrice,
      quantity: parsedQuantity,
    });

    return NextResponse.json({ success: true, product }, { status: 201 });
  } catch (error) {
    console.error("Create product error:", error);
    return NextResponse.json({ error: "Unable to create product." }, { status: 500 });
  }
}
