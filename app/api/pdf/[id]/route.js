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
    const { id } = await params;

    console.log('Attempting to serve PDF for ID:', id);

    if (!id) {
      console.error('No ID provided');
      return NextResponse.json({ error: "Blog ID is required" }, { status: 400 });
    }

    // Validate MongoDB ObjectId format
    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
      console.error('Invalid ObjectId format:', id);
      return NextResponse.json({ error: "Invalid blog ID format" }, { status: 400 });
    }

    const blog = await BlogModel.findById(id);

    if (!blog) {
      console.error('Blog not found for ID:', id);
      return NextResponse.json({ error: "Blog not found" }, { status: 404 });
    }

    if (!blog.pdfData) {
      console.error('No PDF data found for blog:', id);
      return NextResponse.json({ error: "PDF data not found" }, { status: 404 });
    }

    console.log('Serving PDF:', blog.pdfFileName, 'Size:', blog.pdfData.length, 'bytes');

    // Create a response with the PDF data
    const response = new NextResponse(blog.pdfData, {
      status: 200,
      headers: {
        'Content-Type': blog.pdfMimeType || 'application/pdf',
        'Content-Disposition': `inline; filename="${blog.pdfFileName || 'document.pdf'}"`,
        'Cache-Control': 'public, max-age=31536000, immutable',
        'Content-Length': blog.pdfData.length.toString(),
      },
    });

    return response;
  } catch (error) {
    console.error('Error serving PDF:', error);
    return NextResponse.json({
      error: "Failed to serve PDF",
      details: error.message,
      stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
    }, { status: 500 });
  }
}