import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { formatPost } from "@/lib/formatPost";

// export async function POST(request: NextRequest) {
//     try {
//         const body = await request.json();
//         const { content } = body;

//         if (!content || !content.trim()) {
//             return NextResponse.json({ error: 'Content cannot be empty' }, { status: 400 });
//         }



//         const authorId = "clh9j1l8c0000qz6m9v5y7x3"; 

//         const newPost = await prisma.post.create({
//             data: {
//                 content: content.trim(),
//                 authorId,
//             },
//             include: {
//                 author: true,
//                 _count: {
//                     select: { likes: true, comment: true, bookmarks: true },
//                 },
//             },
//         });

//         const formattedPost = formatPost(newPost);

//         return NextResponse.json(formattedPost, { status: 201 });
           
//     } catch (error) {
//         console.error('Error creating post:', error);
//         return NextResponse.json({ error: 'Failed to create post' }, { status: 500 });
//     }
// }

export async function GET() {
  try {
    const posts = await prisma.post.findMany({
      include: {
        author: true,
        _count: {
          select: { likes: true, comment: true, bookmarks: true },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
    

    return NextResponse.json(posts);
  } catch (error) {
    console.error('Error fetching posts:', error);
    return NextResponse.json({ error: 'Failed to fetch posts' }, { status: 500 });
  }
}