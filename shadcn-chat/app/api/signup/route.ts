import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

interface User {
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  title: string;
  gender: string;
  dob: string;
  phone: string;
  password: string;
  twitter?: string;
}

interface FormData {
  username: string;
  email: string;
  given_name: string;
  family_name: string;
  title: string;
  gender: string;
  born_on: string;
  phone_number: string;
  password: string;
  twitterHandle?: string;
  confirmPassword: string;
}

export async function POST(request: Request) {
  try {
    const formData: FormData = await request.json();

    // Read existing users
    const dbPath = path.join(process.cwd(), "../backend-shadcn-chat", "user_database.json");
    const dbContent = fs.readFileSync(dbPath, "utf-8");
    const db = JSON.parse(dbContent);

    // Check if username or email already exists
    const existingUser = db.users.find(
      (user: User) => user.username === formData.username || user.email === formData.email
    );

    if (existingUser) {
      return NextResponse.json(
        { message: "Username or email already exists" },
        { status: 400 }
      );
    }

    // Transform form data to match database schema
    const userToStore: User = {
      username: formData.username,
      email: formData.email,
      firstName: formData.given_name,
      lastName: formData.family_name,
      title: formData.title,
      gender: formData.gender,
      dob: formData.born_on,
      phone: formData.phone_number,
      password: formData.password,
      twitter: formData.twitterHandle || undefined,
    };

    // Add new user
    db.users.push(userToStore);

    // Write back to file
    fs.writeFileSync(dbPath, JSON.stringify(db, null, 2));

    return NextResponse.json({ message: "User created successfully" });
  } catch (error) {
    console.error("Signup error:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
} 