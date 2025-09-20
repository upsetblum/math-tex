import { ConnectDB } from "@/lib/config/db"
import BlogModel from "@/lib/models/BlogModel";
const { NextResponse } = require("next/server")

const LoadDB = async () => {
  await ConnectDB();
}

LoadDB();

// Debug endpoint to check database connection and blog data
export async function GET(request) {
  try {
    console.log('Debug endpoint called');

    // Test database connection
    const blogs = await BlogModel.find({}).limit(5);

    console.log('Found blogs:', blogs.length);

    const debugInfo = {
      status: "Database connected",
      totalBlogs: blogs.length,
      blogs: blogs.map(blog => ({
        id: blog._id,
        title: blog.title,
        hasImage: !!blog.image,
        hasPdfData: !!blog.pdfData,
        authorImg: blog.authorImg,
        fields: Object.keys(blog.toObject())
      }))
    };

    return NextResponse.json(debugInfo);
  } catch (error) {
    console.error('Debug endpoint error:', error);
    return NextResponse.json({
      status: "Error",
      error: error.message,
      stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
    }, { status: 500 });
  }
}