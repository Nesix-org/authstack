"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
// import { formatPost } from "@/lib/formatPost";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";

export async function postAction(formData: FormData): Promise<void> {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    throw new Error("Unauthorized");
  }

   const content = formData.get("content") as string;
   console.log("Post content:", content);

   if (!content || !content.trim()) {
     throw new Error("Content cannot be empty");
   }

   const authorId = session.user.id;

   const dbUser = await prisma.user.findUnique({
     where: { id: authorId },
   });

   console.log("dbUser:", dbUser);

   if (!dbUser) {
     throw new Error("Authenticated user does not exist in database");
   }

  try {

    await prisma.post.create({
      data: {
        content: content.trim(),
        authorId,
      },
      include: {
        _count: {
          select: { likes: true, comment: true, bookmarks: true },
        },
      },
    });

    // formatPost(newPost);
    revalidatePath("/dashboard");
  } catch (error) {
    console.error("Error creating post:", error);
    throw error;
  }
}
