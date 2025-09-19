import { ConnectDB } from "@/lib/config/db"
import BlogModel from "@/lib/models/BlogModel";
const { NextResponse } = require("next/server")
import { writeFile } from 'fs/promises'
const fs = require('fs')

const LoadDB = async () => {
  await ConnectDB();
}

LoadDB();


// API Endpoint to get all blogs
export async function GET(request) {

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

  const formData = await request.formData();
  const timestamp = Date.now();

  const pdfFile = formData.get('pdfFile');
  const pdfByteData = await pdfFile.arrayBuffer();
  const pdfBuffer = Buffer.from(pdfByteData);
  const pdfPath = `./public/pdfs/${timestamp}_${pdfFile.name}`;
  await writeFile(pdfPath, pdfBuffer);
  const pdfUrl = `/pdfs/${timestamp}_${pdfFile.name}`;

  const blogData = {
    title: `${formData.get('title')}`,
    description: `${formData.get('description')}`,
    category: `${formData.get('category')}`,
    author: `${formData.get('author')}`,
    image: `${pdfUrl}`,
    authorImg: `${formData.get('authorImg')}`
  }

  await BlogModel.create(blogData);
  console.log("Blog Saved");

  return NextResponse.json({ success: true, msg: "Blog Added" })
}

// Creating API Endpoint to delete Blog

export async function DELETE(request) {
  const id = await request.nextUrl.searchParams.get('id');
  const blog = await BlogModel.findById(id);
  fs.unlink(`./public${blog.image}`, () => { });
  await BlogModel.findByIdAndDelete(id);
  return NextResponse.json({ msg: "Blog Deleted" });
}