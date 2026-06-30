import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Package from "@/models/Package";

export async function POST(req) {
  try {
    await connectDB();

    const body = await req.json();

    const packageData = await Package.create(body);

    return NextResponse.json({
      success: true,
      data: packageData,
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: error.message,
      },
      {
        status: 500,
      }
    );
  }
}

export async function GET() {
  try {
    await connectDB();

    const packages = await Package.find().sort({
      createdAt: -1,
    });

    return NextResponse.json({
      success: true,
      count: packages.length,
      data: packages,
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: error.message,
      },
      {
        status: 500,
      }
    );
  }
}