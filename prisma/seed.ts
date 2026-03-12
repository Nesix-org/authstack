import "dotenv/config";
import { PrismaClient } from "../app/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";
import bcrypt from "bcrypt";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

const rawUsers = [
  {
    name: "Alice Johnson",
    email: "alice@example.com",
    username: "alicejohnson",
    password: "password123",
  },
  {
    name: "Brian Smith",
    email: "brian@example.com",
    username: "briansmith",
    password: "password123",
  },
  {
    name: "Cynthia Brown",
    email: "cynthia@example.com",
    username: "cynthiabrown",
    password: "password123",
  },
  {
    name: "David Wilson",
    email: "david@example.com",
    username: "davidwilson",
    password: "password123",
  },
  {
    name: "Ella Davis",
    email: "ella@example.com",
    username: "elladavis",
    password: "password123",
  },
  {
    name: "Frank Miller",
    email: "frank@example.com",
    username: "frankmiller",
    password: "password123",
  },
  {
    name: "Grace Moore",
    email: "grace@example.com",
    username: "gracemoore",
    password: "password123",
  },
  {
    name: "Henry Taylor",
    email: "henry@example.com",
    username: "henrytaylor",
    password: "password123",
  },
  {
    name: "Isabella Anderson",
    email: "isabella@example.com",
    username: "isabellaanderson",
    password: "password123",
  },
  {
    name: "James Thomas",
    email: "james@example.com",
    username: "jamesthomas",
    password: "password123",
  },
  {
    name: "Karen Jackson",
    email: "karen@example.com",
    username: "karenjackson",
    password: "password123",
  },
  {
    name: "Liam White",
    email: "liam@example.com",
    username: "liamwhite",
    password: "password123",
  },
  {
    name: "Mia Harris",
    email: "mia@example.com",
    username: "miaharris",
    password: "password123",
  },
  {
    name: "Noah Martin",
    email: "noah@example.com",
    username: "noahmartin",
    password: "password123",
  },
  {
    name: "Olivia Thompson",
    email: "olivia@example.com",
    username: "oliviathompson",
    password: "password123",
  },
  {
    name: "Paul Garcia",
    email: "paul@example.com",
    username: "paulgarcia",
    password: "password123",
  },
  {
    name: "Queen Lee",
    email: "queen@example.com",
    username: "queenlee",
    password: "password123",
  },
  {
    name: "Ryan Martinez",
    email: "ryan@example.com",
    username: "ryanmartinez",
    password: "password123",
  },
  {
    name: "Sophia Robinson",
    email: "sophia@example.com",
    username: "sophiarobinson",
    password: "password123",
  },
  {
    name: "Daniel Walker",
    email: "daniel@example.com",
    username: "danielwalker",
    password: "password123",
  },
];

async function main() {
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

  await prisma.user.createMany({
    data: seededUsers,
    skipDuplicates: true,
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
