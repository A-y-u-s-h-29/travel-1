import cloudinary from "@/lib/cloudinary";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    // Test Cloudinary Connection
    const ping = await cloudinary.api.ping();
    console.log("Cloudinary Ping:", ping);

    const formData = await req.formData();
    const file = formData.get("file");

    if (!file) {
      return NextResponse.json(
        {
          success: false,
          message: "No file selected",
        },
        { status: 400 }
      );
    }

    console.log("========== FILE INFO ==========");
    console.log("Name:", file.name);
    console.log("Type:", file.type);
    console.log("Size:", file.size);
    console.log("===============================");

    if (!file.type.startsWith("image/")) {
      return NextResponse.json(
        {
          success: false,
          message: "Only image files are allowed.",
        },
        { status: 400 }
      );
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const uploadResult = await new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        {
          
          resource_type: "image",
         
        },
        (error, result) => {
          if (error) {
            console.error("========== CLOUDINARY ERROR ==========");
            console.dir(error, { depth: null });
            console.error("======================================");
            return reject(error);
          }

          resolve(result);
        }
      );

      stream.end(buffer);
    });

    return NextResponse.json({
      success: true,
      url: uploadResult.secure_url,
      data: uploadResult,
    });

  } catch (error) {
    console.error("========== API ERROR ==========");
    console.dir(error, { depth: null });
    console.error("===============================");

    return NextResponse.json(
      {
        success: false,
        message: error.message,
        error,
      },
      { status: 500 }
    );
  }
}