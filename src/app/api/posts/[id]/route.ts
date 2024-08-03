import { NextResponse } from "next/server";
import prisma from "@/lib/db";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export async function GET(req: Request, { params }: { params: { id: string } }) {
    try {


        const session = await getServerSession(authOptions);

        if (!session) {
            return NextResponse.json({ msg: 'UnAuthorized' }, { status: 401 });
        }
        
        const post = await prisma.post.findUnique({
            where: { id: Number(params.id) },
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
        });

        if (!post) {
            return NextResponse.json({ error: "Post not found" }, { status: 404 });
        }
        return NextResponse.json(post, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: "Error fetching post" }, { status: 500 });
    }
}

export async function PUT(req: Request, { params }: { params: { id: string } }) {


    const session = await getServerSession(authOptions);

    if (!session) {
        return NextResponse.json({ msg: 'UnAuthorized' }, { status: 401 });
    }
    

    const post = await prisma.post.findUnique({
        where: { id: Number(params.id) },
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
    });

    if (parseInt(session.user.id) != post?.userId) {
        return NextResponse.json({ msg: 'UnAuthorized' }, { status: 404 });
    }

    
    const { title, content } = await req.json();

    try {
        const post = await prisma.post.update({
            where: { id: Number(params.id) },
            data: { title, content },
        });
        return NextResponse.json(post, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: "Error updating post" }, { status: 500 });
    }
}

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
    try {

        const session = await getServerSession(authOptions);

        if (!session) {
            return NextResponse.json({ msg: 'UnAuthorized' }, { status: 401 });
        }

        const post = await prisma.post.findUnique({
            where: { id: Number(params.id) }
        });

        if (!post) {
            return NextResponse.json({ error: "Post not found" }, { status: 404 });
        }
    
        if (parseInt(session.user.id) != post?.userId) {
            return NextResponse.json({ msg: 'UnAuthorized' }, { status: 401 });
        }


        await prisma.post.delete({
            where: { id: Number(params.id) },
        });
        return NextResponse.json({ message: "Post deleted" }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: "Error deleting post" }, { status: 500 });
    }
}
