import prisma from "@/lib/db";
import { NextResponse } from "next/server";
import { hash } from "bcrypt";

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { email, password, username } = body;


        if (!email || !password || !username) {
            return NextResponse.json({ msg: "Email,username,password are required" }, { status: 400 });
        }

        const registeredUser = await prisma.user.findUnique({
            where: {
                email
            }
        })



        if (registeredUser) {
            return NextResponse.json({ msg: "user alread exists " }, { status: 409 });
        }

        const hashedPassword = await hash(password, 10);

        const newUser = await prisma.user.create({
            data: {
                email, username, password: hashedPassword
            }
        });

        const { password: haspassword, ...updatedUser } = newUser;

        return NextResponse.json({ user: updatedUser, msg: "user created" }, { status: 201 })


    } catch (error) {
        return NextResponse.json({ msg: "Error Server" }, { status: 500 })

    }
}
