import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

interface User {
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  password: string;
}

export async function POST(request: Request) {
  try {
    const { username, password } = await request.json();

    // Read users from database
    const dbPath = path.join(process.cwd(), "../backend-shadcn-chat", "user_database.json");
    const dbContent = fs.readFileSync(dbPath, "utf-8");
    const db = JSON.parse(dbContent);

    // Find user by username or email (case-insensitive for email)
    const user = db.users.find(
      (u: User) => 
        (u.username === username || u.email.toLowerCase() === username.toLowerCase()) && 
        u.password === password
    );

    if (!user) {
      return NextResponse.json(
        { message: "Invalid credentials" },
        { status: 401 }
      );
    }

    // Return user data (excluding password)
    const userData = { ...user };
    delete userData.password;
    return NextResponse.json({ user: userData });
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
} 