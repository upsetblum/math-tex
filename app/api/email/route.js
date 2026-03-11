export const dynamic = 'force-dynamic';

import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(request) {
  const formData = await request.formData();
  const email = formData.get('email');
  await prisma.email.create({ data: { email } });
  return NextResponse.json({ success: true, msg: "Email Subscribed" });
}

export async function GET(request) {
  const emails = await prisma.email.findMany();
  return NextResponse.json({ emails });
}

export async function DELETE(request) {
  const id = request.nextUrl.searchParams.get("id");
  await prisma.email.delete({ where: { id } });
  return NextResponse.json({ success: true, msg: "Email Deleted" });
}
