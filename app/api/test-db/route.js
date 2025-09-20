import { ConnectDB } from "@/lib/config/db"
import BlogModel from "@/lib/models/BlogModel";
const { NextResponse } = require("next/server")

// Simple test endpoint
export async function GET() {
  try {
    console.log('Testing DB connection...');

    await ConnectDB();
    console.log('Connected to DB');

    const count = await BlogModel.countDocuments();
    console.log('Blog count:', count);

    const blog = await BlogModel.findById('68ce79178eff08c3d9599004');
    console.log('Blog found:', !!blog);
    console.log('Blog has pdfData:', !!blog?.pdfData);
    console.log('pdfData length:', blog?.pdfData?.length);

    return NextResponse.json({
      status: 'success',
      dbConnected: true,
      totalBlogs: count,
      blogFound: !!blog,
      hasPdfData: !!blog?.pdfData,
      pdfDataLength: blog?.pdfData?.length || 0
    });
  } catch (error) {
    console.error('Test endpoint error:', error);
    return NextResponse.json({
      status: 'error',
      error: error.message,
      stack: error.stack
    }, { status: 500 });
  }
}