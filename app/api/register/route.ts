import { hashPassword } from "@/lib/helper";
import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST (req: NextRequest) {
  try {
    const {name, email, password} = await req.json()

    console.log("Received registration data:", { name, email, password })
    // 1. check main user with email already exist. if user exist return error
    const findUser = await prisma.user.findUnique({
      where: {
        email
      }
    })

    if (findUser) {
      return NextResponse.json({ error: "User with email already exists" }, { status: 400 })
    }
    // 2. hash password with bcrypt
    const userHashedPassword = await hashPassword(password)

    // 3. create new user object with hashed password and create user in database with prisma

    const user = {
      name, 
      email,
      password: userHashedPassword
    }

    await prisma.user.create({
      data: {
        ...user
      }
    })

    // 4. return success response with status 201
    return NextResponse.json({ message: "User registered successfully" }, { status: 201 })

  } catch (error) {
    console.log(error)
    return NextResponse.json({ error: error,  }, { status: 500 })
  }
}