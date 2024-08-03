import { NextResponse } from "next/server";
import prisma from "@/lib/db";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";



export async function GET() {
    const session = await getServerSession(authOptions);

    if (!session) {
        return NextResponse.json({ msg: 'UnAuthorized' }, { status: 401 });
    }
    try {

        const posts = await prisma.post.findMany({
            include: {
                user: {
                    select: {
                        id: true,
                        email: true,
                        username: true,
                        password: false
                    },
                },
            },
            orderBy: {
                createdAt: 'desc',
            },
        });
        

        return NextResponse.json(posts, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: "Error fetching posts" }, { status: 500 });
    }
}
