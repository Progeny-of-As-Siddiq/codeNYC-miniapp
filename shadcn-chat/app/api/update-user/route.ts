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
  given_name: string;
  family_name: string;
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
  password?: string;
  confirmPassword?: string;
  originalUsername?: string;
}

export async function POST(request: Request) {
  try {
    const formData: FormData = await request.json();

    // Read existing users
    const dbPath = path.join(process.cwd(), "../backend-shadcn-chat", "user_database.json");
    const dbContent = fs.readFileSync(dbPath, "utf-8");
    const db = JSON.parse(dbContent);

    // Find the user using the original username
    const userIndex = db.users.findIndex((user: User) => user.username === formData.originalUsername);

    if (userIndex === -1) {
      return NextResponse.json(
        { message: "User not found" },
        { status: 404 }
      );
    }

    // Update user data
    const user = db.users[userIndex];
    
    // Only update password if a new one is provided
    if (formData.password) {
      user.password = formData.password;
    }

    // Update all other fields
    user.username = formData.username;
    user.title = formData.title;
    user.given_name = formData.given_name;
    user.family_name = formData.family_name;
    user.firstName = formData.given_name;
    user.lastName = formData.family_name;
    user.gender = formData.gender;
    user.dob = formData.born_on;
    user.phone = formData.phone_number;
    user.email = formData.email;

    // Write back to file
    fs.writeFileSync(dbPath, JSON.stringify(db, null, 2));

    return NextResponse.json({
      message: "User updated successfully",
      user: {
        username: user.username,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        title: user.title,
        gender: user.gender,
        dob: user.dob,
        phone: user.phone,
      }
    });
  } catch (error) {
    console.error("Update error:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
} 