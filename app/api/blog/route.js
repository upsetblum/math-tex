import { ConnectDB } from "@/lib/config/db"
import BlogModel from "@/lib/models/BlogModel";
const { NextResponse } = require("next/server")

// API Endpoint to get all blogs
export async function GET(request) {
  try {
    await ConnectDB();
  } catch (error) {
    console.error('DB Connection Error in GET:', error);
    return NextResponse.json({ error: "Database connection failed" }, { status: 500 });
  }

  const blogId = request.nextUrl.searchParams.get("id");
  if (blogId && blogId !== 'undefined' && blogId !== 'null') {
    try {
      const blog = await BlogModel.findById(blogId);
      if (!blog) {
        return NextResponse.json({ error: "Blog not found" }, { status: 404 });
      }
      return NextResponse.json(blog);
    } catch (error) {
      console.error('Error fetching blog by ID:', error);
      return NextResponse.json({ error: "Invalid blog ID" }, { status: 400 });
    }
  }
  else {
    try {
      const blogs = await BlogModel.find({});
      return NextResponse.json({ blogs })
    } catch (error) {
      console.error('Error fetching all blogs:', error);
      return NextResponse.json({ error: "Failed to fetch blogs" }, { status: 500 });
    }
  }
}


// API Endpoint For Uploading Blogs
export async function POST(request) {
  try {
    await ConnectDB();

    const formData = await request.formData();

    const pdfFile = formData.get('pdfFile');

    if (!pdfFile) {
      return NextResponse.json({ error: "No PDF file provided" }, { status: 400 });
    }

    // Convert PDF to Buffer for MongoDB storage
    const pdfByteData = await pdfFile.arrayBuffer();
    const pdfBuffer = Buffer.from(pdfByteData);

    const blogData = {
      title: `${formData.get('title')}`,
      description: `${formData.get('description')}`,
      category: `${formData.get('category')}`,
      author: `${formData.get('author')}`,
      pdfData: pdfBuffer,
      pdfFileName: pdfFile.name,
      pdfMimeType: pdfFile.type || 'application/pdf',
      authorImg: `${formData.get('authorImg')}`
    }

    await BlogModel.create(blogData);
    console.log("Blog Saved to MongoDB");

    return NextResponse.json({ success: true, msg: "Blog Added" })
  } catch (error) {
    console.error('Error creating blog:', error);
    return NextResponse.json({ error: "Failed to create blog", details: error.message }, { status: 500 });
  }
}

// Creating API Endpoint to delete Blog
export async function DELETE(request) {
  try {
    await ConnectDB();

    const id = await request.nextUrl.searchParams.get('id');

    if (!id) {
      return NextResponse.json({ error: "Blog ID is required" }, { status: 400 });
    }

    await BlogModel.findByIdAndDelete(id);
    console.log("Blog deleted from MongoDB");

    return NextResponse.json({ msg: "Blog Deleted" });
  } catch (error) {
    console.error('Error deleting blog:', error);
    return NextResponse.json({ error: "Failed to delete blog" }, { status: 500 });
  }
}