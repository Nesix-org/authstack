import { Post } from "@/app/types";
import prisma from "./prisma";

export async function getPosts(): Promise<Post[]> {
  try {
    const posts = await prisma.post.findMany({
      include: {
        author: true,
        _count: {
          select: { likes: true, comment: true, bookmarks: true },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return posts;
  } catch (error) {
    console.log(error);
    return [];
  }
}
