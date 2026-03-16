import "dotenv/config";
import { PrismaClient } from "../app/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";
import bcrypt from "bcrypt";
import { rawUsers } from "@/lib/data";
import { fakerEN as faker } from "@faker-js/faker";


const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

function generatePosts(users: { id: string }[]) {
  const numberOfPostByUser = 2
  return users.flatMap((user) => {
    return Array.from({length: numberOfPostByUser}).map(() => ({
      content: faker.hacker.phrase(),
      authorId: user.id,
    }));
  });
}

async function main() {

  await prisma.user.deleteMany();
  await prisma.post.deleteMany();

  const seededUsers = await Promise.all(
    rawUsers.map(async (user) => {
      const hashedPassword = await bcrypt.hash(user.password, 10);
      return {
        name: user.name,
        email: user.email,
        username: user.username,
        password: hashedPassword,
        emailVerified: new Date(),
      };
    }),
  );

  const users = await prisma.user.createManyAndReturn({
    data: seededUsers,
    skipDuplicates: true,
    select: {
      id: true
    }
  });

  //  const users = await prisma.user.createMany({
  //    data: seededUsers,
  //    skipDuplicates: true,
  //  });

  // console.log(users)

  // fetch the users to get their ids for seeding related data
  // const users = await prisma.user.findMany({
  //   where: {
  //     email: {
  //       in: rawUsers.map((user) => user.email),
  //     },
  //   },
  //   select: {
  //     id: true,
  //   },
  // });

  const post = generatePosts(users);

  await prisma.post.createMany({
    data: post,
  });
}

main()
  .catch((error) => {
    console.error("Error seeding data:", error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
