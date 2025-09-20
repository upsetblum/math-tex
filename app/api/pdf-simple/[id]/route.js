import { ConnectDB } from "@/lib/config/db"
import BlogModel from "@/lib/models/BlogModel";

// Simple PDF endpoint with better error handling
export async function GET(request, { params }) {
  try {
    console.log('=== PDF Simple API Called ===');

    // Connect to database
    await ConnectDB();
    console.log('Database connected');

    // Get params
    const resolvedParams = await params;
    const { id } = resolvedParams;
    console.log('Blog ID:', id);

    if (!id) {
      console.error('No ID provided');
      return new Response(JSON.stringify({ error: "Blog ID is required" }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Validate ObjectId format
    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
      console.error('Invalid ObjectId format:', id);
      return new Response(JSON.stringify({ error: "Invalid blog ID format" }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Find blog
    const blog = await BlogModel.findById(id);
    console.log('Blog found:', !!blog);

    if (!blog) {
      console.error('Blog not found for ID:', id);
      return new Response(JSON.stringify({ error: "Blog not found" }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    console.log('Blog title:', blog.title);
    console.log('Has pdfData:', !!blog.pdfData);
    console.log('pdfData type:', typeof blog.pdfData);
    console.log('pdfData length:', blog.pdfData?.length);

    if (!blog.pdfData) {
      console.error('No PDF data found for blog:', id);
      return new Response(JSON.stringify({
        error: "PDF data not found",
        debug: {
          blogFields: Object.keys(blog.toObject())
        }
      }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Create response with PDF data
    console.log('Serving PDF:', blog.pdfFileName, 'Size:', blog.pdfData.length, 'bytes');

    return new Response(blog.pdfData, {
      status: 200,
      headers: {
        'Content-Type': blog.pdfMimeType || 'application/pdf',
        'Content-Disposition': `inline; filename="${blog.pdfFileName || 'document.pdf'}"`,
        'Cache-Control': 'public, max-age=31536000, immutable',
        'Content-Length': blog.pdfData.length.toString(),
      },
    });

  } catch (error) {
    console.error('=== PDF API Error ===');
    console.error('Error message:', error.message);
    console.error('Error stack:', error.stack);
    console.error('Error name:', error.name);

    return new Response(JSON.stringify({
      error: "Failed to serve PDF",
      details: error.message,
      name: error.name,
      stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}