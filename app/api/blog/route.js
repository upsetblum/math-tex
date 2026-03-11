import { prisma } from "@/lib/prisma";
import { put } from "@vercel/blob";
const { NextResponse } = require("next/server");

// API Endpoint to get all blogs
export async function GET(request) {
  const blogId = request.nextUrl.searchParams.get("id");

  if (blogId && blogId !== 'undefined' && blogId !== 'null') {
    try {
      const blog = await prisma.blog.findUnique({ where: { id: blogId } });
      if (!blog) {
        return NextResponse.json({ error: "Blog not found" }, { status: 404 });
      }
      return NextResponse.json(blog);
    } catch (error) {
      console.error('Error fetching blog by ID:', error);
      return NextResponse.json({ error: "Invalid blog ID" }, { status: 400 });
    }
  } else {
    try {
      const blogs = await prisma.blog.findMany({ orderBy: { date: 'desc' } });
      return NextResponse.json({ blogs });
    } catch (error) {
      console.error('Error fetching all blogs:', error);
      return NextResponse.json({ error: "Failed to fetch blogs" }, { status: 500 });
    }
  }
}

// API Endpoint For Uploading Blogs
export async function POST(request) {
  try {
    const formData = await request.formData();
    const pdfFile = formData.get('pdfFile');

    if (!pdfFile) {
      return NextResponse.json({ error: "No PDF file provided" }, { status: 400 });
    }

    const blob = await put(pdfFile.name, pdfFile.stream(), { access: 'public' });

    await prisma.blog.create({
      data: {
        title: formData.get('title'),
        description: formData.get('description'),
        category: formData.get('category'),
        author: formData.get('author'),
        authorImg: formData.get('authorImg'),
        pdfUrl: blob.url,
        pdfFileName: pdfFile.name,
      },
    });

    console.log("Blog Saved to Postgres, PDF at:", blob.url);
    return NextResponse.json({ success: true, msg: "Blog Added" });
  } catch (error) {
    console.error('Error creating blog:', error);
    return NextResponse.json({ error: "Failed to create blog", details: error.message }, { status: 500 });
  }
}

// API Endpoint to delete Blog
export async function DELETE(request) {
  try {
    const id = request.nextUrl.searchParams.get('id');

    if (!id) {
      return NextResponse.json({ error: "Blog ID is required" }, { status: 400 });
    }

    await prisma.blog.delete({ where: { id } });
    console.log("Blog deleted from Postgres");

    return NextResponse.json({ msg: "Blog Deleted" });
  } catch (error) {
    console.error('Error deleting blog:', error);
    return NextResponse.json({ error: "Failed to delete blog" }, { status: 500 });
  }
}
