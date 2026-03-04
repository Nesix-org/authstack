import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth/next";

const BodySchema = z.object({
  username: z
    .string()
    .min(3)
    .max(20)
    .regex(/^[a-zA-Z0-9_]+$/, "Only letters, numbers, and underscore"),
});

export async function PATCH(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions); 

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const userId = session.user.id;

    const json = await req.json();
    const { username } = BodySchema.parse(json);

    console.log("Received username update request:", { username });

    // 1. check if username already exist. if exist return error
    const findUsername = await prisma.user.findUnique({
      where: { username: username.toLowerCase() },
    });

    if (findUsername) {
      return NextResponse.json(
        { error: "Username already exists" },
        { status: 400 },
      );
    }

    // 2. update user's username in database with prisma
    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: { username },
      select: { id: true, email: true, name: true, username: true },
    });

    return NextResponse.json(
      { message: "Username updated successfully", user: updatedUser },
      { status: 200 },
    );
  } catch (err: any) {
    // Username uniqueness error (Postgres unique violation via Prisma)
    if (err?.code === "P2002") {
      return NextResponse.json(
        { error: "Username already taken" },
        { status: 409 },
      );
    }

    // Zod validation
    if (err?.name === "ZodError") {
      return NextResponse.json({ error: err.issues }, { status: 400 });
    }

    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}