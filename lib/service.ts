import { FormattedPost } from "@/app/types";
import prisma from "./prisma";
import { formatPost } from "./formatPost";

export async function getPosts(): Promise<FormattedPost[]> {
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

    return posts.map(formatPost);
  } catch (error) {
    console.log(error);
    return [];
  }
}
