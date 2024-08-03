import { NextResponse } from "next/server";
import prisma from "@/lib/db";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export async function POST(req: Request) {

  const session = await getServerSession(authOptions);

  if (!session) {
      return NextResponse.json({ msg: 'UnAuthorized' }, { status: 401 });
  }

  const { title, content } = await req.json();
  try {
    const post = await prisma.post.create({
      data: {
        title,
        content,
        userId: parseInt( session.user.id),
      },
    });
    return NextResponse.json(post, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Error creating post" }, { status: 500 });
  }
}
