"use client"

import Link from "next/link"
import Image from "next/image"
import { useState, useRef } from "react"
import { Eye, EyeOff, ChevronDown } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { PhoneInput } from "@/components/ui/phone-input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Checkbox } from "@/components/ui/checkbox"

const TITLES = ["Mr", "Ms", "Mrs", "Dr", "Prof"];
const GENDERS = ["Male", "Female", "Other", "Prefer not to say"];

export function SignUpForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  const [showPassword, setShowPassword] = useState(false)
  const [title, setTitle] = useState("")
  const [gender, setGender] = useState("")
  const [phone, setPhone] = useState("")
  const [month, setMonth] = useState("")
  const [day, setDay] = useState<number | "">("")
  const [year, setYear] = useState<number | "">("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [pfpUrl, setPfpUrl] = useState<string | null>(null)
  const [agreesToTerms, setAgreesToTerms] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handlePfpClick = () => {
    fileInputRef.current?.click()
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (event) => {
        setPfpUrl(event.target?.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <form onSubmit={async (e) => {
        e.preventDefault();
        
        if (!agreesToTerms) {
          alert("You must agree to the Terms of Service and Privacy Policy to create an account.");
          return;
        }
        
        if (password !== confirmPassword) {
          alert("Passwords do not match!");
          return;
        }
        const form = e.target as HTMLFormElement;
        const formData = new FormData(form);
        const requiredFields = ["firstName", "lastName", "title", "gender", "dob", "phone", "email", "username", "password", "confirmPassword"];
        const missingFields = requiredFields.filter(field => !formData.get(field));
        if (missingFields.length > 0) {
          alert("Please fill out all required fields: " + missingFields.join(", "));
          return;
        }
        
        // Prepare user data for backend
        const userData = {
          firstName: formData.get("firstName"),
          lastName: formData.get("lastName"),
          email: formData.get("email"),
          username: formData.get("username"),
          password: formData.get("password"),
          title: (formData.get("title") as string)?.toLowerCase(),
          gender: (formData.get("gender") as string)?.toLowerCase(),
          dob: formData.get("dob"),
          phone: formData.get("phone"),
          profilePicture: pfpUrl // Include the base64 profile picture data
        };

        try {
          const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:8000';
          const response = await fetch(`${backendUrl}/api/signup`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(userData),
          });

          if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.detail || 'Signup failed');
          }

          await response.json();
          alert("Account created successfully!");
          // Redirect to login page
          window.location.href = "/login";
        } catch (error) {
          console.error("Signup error:", error);
          alert(error instanceof Error ? error.message : "Signup failed. Please try again.");
        }
      }}>
        <div className="flex flex-col gap-6">
          {/* Logo, Title, and Login Link */}
          <div className="flex flex-col items-center gap-2">
            <Link
              href="/"
              className="flex flex-col items-center gap-2 font-medium"
            >
              <div className="flex h-16 w-16 items-center justify-center">
                <Image
                  src="/flyte_coin.png" 
                  alt="Flyte AI Logo"
                  width={64}
                  height={64}
                />
              </div>
              <span className="sr-only">Flyte AI</span>
            </Link>
            <h1 className="text-xl font-bold">Create your Flyte AI account</h1>
            <div className="text-center text-sm">
              Already have an account?{" "}
              <Link href="/login" className="text-[#9089fc] underline underline-offset-4">
                Log in
              </Link>
            </div>
          </div>
          {/* Disclaimer */}
          <div className="bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4 text-center max-w-md mx-auto">
            <p className="text-sm text-blue-800 dark:text-blue-200">
              <strong>Important:</strong> We only ask for information that is necessary for airlines to book your flight. 
              Please ensure all details are accurate as they will be used for your flight booking and travel documents.
            </p>
          </div>
          {/* PFP Upload - Centered, full width, round, above name fields */}
          <div className="flex flex-col items-center w-full mb-2">
            <Label className="text-sm font-medium mb-2">Profile Picture</Label>
            <div className="flex items-center justify-center w-full">
              <div className="w-32 h-32 max-w-xs max-h-xs rounded-full overflow-hidden border-2 border-dashed border-[#9089fc] bg-white dark:bg-black flex items-center justify-center hover:border-[#7a75d8] transition-colors">
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  accept="image/*"
                  style={{ display: 'none' }}
                />
                <Avatar className="w-28 h-28 cursor-pointer" onClick={handlePfpClick}>
                  <AvatarImage src={pfpUrl || "https://github.com/shadcn.png"} />
                  <AvatarFallback>📷</AvatarFallback>
                </Avatar>
              </div>
            </div>
            <p className="text-xs text-muted-foreground mt-1 text-center">Click to upload your profile picture</p>
          </div>
          {/* Personal Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="first-name">First Name</Label>
              <Input id="first-name" name="firstName" required />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="last-name">Last Name</Label>
              <Input id="last-name" name="lastName" required />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="title">Title</Label>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="w-full flex justify-between">
                    {title || "Select title"}
                    <ChevronDown className="ml-2 h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent side="bottom" className="w-full">
                  {TITLES.map((t) => (
                    <DropdownMenuItem key={t} onClick={() => setTitle(t)}>
                      {t}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
              <input type="hidden" name="title" value={title} />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="gender">Gender</Label>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="w-full flex justify-between">
                    {gender || "Select gender"}
                    <ChevronDown className="ml-2 h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent side="bottom" className="w-full">
                  {GENDERS.map((g) => (
                    <DropdownMenuItem key={g} onClick={() => setGender(g)}>
                      {g}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
              <input type="hidden" name="gender" value={gender} />
            </div>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="dob">Date of Birth</Label>
            <div className="grid grid-cols-3 gap-2">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="w-full flex justify-between">
                    {month || "Month"}
                    <ChevronDown className="ml-2 h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent side="bottom" className="w-full">
                  {Array.from({ length: 12 }, (_, i) => {
                    const monthName = new Date(2000, i, 1).toLocaleString('default', { month: 'long' });
                    return (
                      <DropdownMenuItem key={i} onClick={() => setMonth(monthName)}>
                        {monthName}
                      </DropdownMenuItem>
                    );
                  })}
                </DropdownMenuContent>
              </DropdownMenu>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="w-full flex justify-between">
                    {day || "Day"}
                    <ChevronDown className="ml-2 h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent side="bottom" className="w-full max-h-64 overflow-y-auto">
                  {Array.from({ length: 31 }, (_, i) => (
                    <DropdownMenuItem key={i} onClick={() => setDay(i + 1)}>
                      {i + 1}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="w-full flex justify-between">
                    {year || "Year"}
                    <ChevronDown className="ml-2 h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent side="bottom" className="w-full max-h-64 overflow-y-auto">
                  {Array.from({ length: 100 }, (_, i) => {
                    const year = new Date().getFullYear() - i;
                    return (
                      <DropdownMenuItem key={year} onClick={() => setYear(year)}>
                        {year}
                      </DropdownMenuItem>
                    );
                  })}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            <input type="hidden" name="dob" value={`${year}-${month ? String(new Date(`${month} 1, 2000`).getMonth() + 1).padStart(2, '0') : ''}-${day ? String(day).padStart(2, '0') : ''}`} />
          </div>
          {/* Contact Info */}
          <div className="grid gap-2">
            <Label htmlFor="phone">Phone Number</Label>
            <PhoneInput
              id="phone"
              name="phone"
              defaultCountry="US"
              value={phone}
              onChange={setPhone}
              international
              countryCallingCodeEditable={false}
              required
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" name="email" type="email" required />
          </div>
          {/* Account Info */}
          <div className="grid gap-2">
            <Label htmlFor="username">Username</Label>
            <Input id="username" name="username" required />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-[#9089fc]"
                  tabIndex={-1}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="confirm-password">Confirm Password</Label>
              <div className="relative">
                <Input
                  id="confirm-password"
                  name="confirmPassword"
                  type={showPassword ? "text" : "password"}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-[#9089fc]"
                  tabIndex={-1}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
            </div>
          </div>
          {/* Terms of Service Agreement */}
          <div className="flex items-start space-x-2">
            <Checkbox
              id="terms"
              checked={agreesToTerms}
              onCheckedChange={(checked) => setAgreesToTerms(checked as boolean)}
              className="mt-1"
            />
            <div className="text-sm leading-5">
              <Label htmlFor="terms" className="cursor-pointer text-muted-foreground">
                I agree to the{" "}
                <Link 
                  href="/terms" 
                  className="text-[#9089fc] hover:text-[#7a75d8] underline underline-offset-4"
                  target="_blank"
                >
                  Terms of Service
                </Link>{" "}
                and{" "}
                <Link 
                  href="/privacy" 
                  className="text-[#9089fc] hover:text-[#7a75d8] underline underline-offset-4"
                  target="_blank"
                >
                  Privacy Policy
                </Link>
              </Label>
            </div>
          </div>

          <Button 
            type="submit" 
            className="w-full bg-[#9089fc] hover:bg-[#7a75d8]"
            disabled={!agreesToTerms}
          >
            Sign Up
          </Button>
        </div>
      </form>
    </div>
  )
} 