import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { z, ZodError } from "zod";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth/next";

const BodySchema = z.object({
  username: z
    .string()
    .min(3)
    .max(20)
    .regex(/^[a-zA-Z0-9_]+$/, "Only letters, numbers, and underscore"),
});

// prisma unique constraint error type guard
function isPrismaUniqueConstraintError(err: unknown): err is { code: string } {
  return (
    typeof err === "object" &&
    err !== null &&
    "code" in err &&
    typeof (err as { code?: unknown }).code === "string"
  );
}

export async function PATCH(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const userId = session.user.id;

    const reqBody = await req.json();
    const { username } = BodySchema.parse(reqBody);

    // 1. check if username already exist. if exist return error
    const findUsername = await prisma.user.findUnique({
      where: { username },
    });

    if (findUsername) {
      return NextResponse.json(
        { error: "Username already exists" },
        { status: 400 },
      );
    }

    // 2. update user's username in database with prisma
    await prisma.user.update({
      where: { id: userId },
      data: { username },
      select: { id: true, email: true, name: true, username: true },
    });

    return NextResponse.json(
      { message: "Username updated successfully" },
      { status: 200 },
    );
  } catch (err: unknown) {
    // Username uniqueness error (Postgres unique violation via Prisma)
    if (isPrismaUniqueConstraintError(err) && err.code === "P2002") {
      return NextResponse.json(
        { error: "Username already taken" },
        { status: 409 },
      );
    }

    // Zod validation
    if (err instanceof ZodError) {
      return NextResponse.json({ error: err.issues }, { status: 400 });
    }

    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
