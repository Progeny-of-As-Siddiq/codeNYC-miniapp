"use client";

import { UserForm } from "@/components/auth/user-form";

export default function SignUpPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background pt-24 pb-12 px-4">
      <UserForm mode="signup" />
    </div>
  );
} 