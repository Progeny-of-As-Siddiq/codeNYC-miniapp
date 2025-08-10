"use client";

import { useAuth } from "@/contexts/auth-context";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { UserForm } from "@/components/auth/user-form";

export default function EditDetailsPage() {
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push("/");
    }
  }, [user, router]);

  if (!user) {
    return null;
  }

  // Convert phone number to E.164 format by removing spaces and non-digit characters except +
  const formatPhoneToE164 = (phone: string) => {
    if (!phone) return "";
    // Remove all spaces and keep only + and digits
    return phone.replace(/[^\+\d]/g, "");
  };

  return (
    <div className="min-h-screen bg-background pt-24 pb-12 px-4">
      <div className="container mx-auto max-w-4xl">
        <div className="flex flex-col items-center">
          <UserForm 
            mode="edit" 
            initialData={{
              title: user.title,
              given_name: user.firstName,
              family_name: user.lastName,
              gender: user.gender,
              born_on: user.dob,
              phone_number: formatPhoneToE164(user.phone),
              email: user.email,
              username: user.username,
              profilePicture: user.profilePicture,
            }}
          />
        </div>
      </div>
    </div>
  );
} 