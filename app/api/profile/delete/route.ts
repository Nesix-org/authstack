import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function DELETE() {
  const session = await getServerSession(authOptions);

  const userId = session?.user.id;
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  try {
    await prisma.user.delete({
      where: { id: userId },
    });
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
      return NextResponse.json({ message: "Profile deleted successfully" }, { status: 200 })
}