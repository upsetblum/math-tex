import { ConnectDB } from "@/lib/config/db"
import BlogModel from "@/lib/models/BlogModel";
const { NextResponse } = require("next/server")

const LoadDB = async () => {
  await ConnectDB();
}

LoadDB();

// API Endpoint to serve PDF from MongoDB
export async function GET(request, { params }) {
  try {
    const { id } = params;

    if (!id) {
      return NextResponse.json({ error: "Blog ID is required" }, { status: 400 });
    }

    const blog = await BlogModel.findById(id);

    if (!blog || !blog.pdfData) {
      return NextResponse.json({ error: "PDF not found" }, { status: 404 });
    }

    // Create a response with the PDF data
    const response = new NextResponse(blog.pdfData, {
      status: 200,
      headers: {
        'Content-Type': blog.pdfMimeType || 'application/pdf',
        'Content-Disposition': `inline; filename="${blog.pdfFileName}"`,
        'Cache-Control': 'public, max-age=31536000, immutable',
      },
    });

    return response;
  } catch (error) {
    console.error('Error serving PDF:', error);
    return NextResponse.json({ error: "Failed to serve PDF" }, { status: 500 });
  }
}