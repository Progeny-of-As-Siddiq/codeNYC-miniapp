"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Checkbox } from "@/components/ui/checkbox";
import Link from "next/link";
import { useToast } from "@/components/ui/use-toast";
import { Eye, EyeOff, Camera, ChevronDown } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { PhoneInput } from "@/components/ui/phone-input";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/auth-context";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const formSchema = z.object({
  title: z.string().min(1, "Please select a title"),
  given_name: z.string()
    .min(2, "First name must be at least 2 characters")
    .max(50, "First name must be less than 50 characters")
    .regex(/^[a-zA-Z\s-']+$/, "First name can only contain letters, spaces, hyphens, and apostrophes"),
  family_name: z.string()
    .min(2, "Last name must be at least 2 characters")
    .max(50, "Last name must be less than 50 characters")
    .regex(/^[a-zA-Z\s-']+$/, "Last name can only contain letters, spaces, hyphens, and apostrophes"),
  gender: z.string().min(1, "Please select a gender"),
  born_on: z.string()
    .min(1, "Date of birth is required")
    .refine((date) => {
      const today = new Date()
      const birthDate = new Date(date)
      const age = today.getFullYear() - birthDate.getFullYear()
      const monthDiff = today.getMonth() - birthDate.getMonth()
      if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
        return age - 1 >= 13
      }
      return age >= 13
    }, "You must be at least 13 years old"),
  phone_number: z.string()
    .min(10, "Phone number must be at least 10 digits")
    .regex(/^\+?[1-9]\d{1,14}$/, "Please enter a valid phone number"),
  email: z.string()
    .min(1, "Email is required")
    .email("Please enter a valid email address")
    .max(100, "Email must be less than 100 characters"),
  username: z.string()
    .min(3, "Username must be at least 3 characters")
    .max(30, "Username must be less than 30 characters")
    .regex(/^[a-zA-Z0-9_-]+$/, "Username can only contain letters, numbers, underscores, and hyphens"),
  password: z.string().optional(),
  confirmPassword: z.string().optional(),
  twitterHandle: z.string()
    .regex(/^@?[A-Za-z0-9_]+$/, "Please enter a valid Twitter handle")
    .optional()
    .or(z.literal("")),
  profilePicture: z.string().optional(),
  terms: z.boolean().optional(),
}).refine((data) => {
  // Only validate password match if both passwords are provided
  if (data.password && data.confirmPassword) {
    return data.password === data.confirmPassword;
  }
  return true;
}, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
});

type FormValues = z.infer<typeof formSchema>;

interface UserFormProps {
  mode: "signup" | "edit";
  initialData?: Partial<FormValues>;
}

export function UserForm({ mode, initialData }: UserFormProps) {
  const { toast } = useToast();
  const router = useRouter();
  const { login, logout, user } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  // Add state for date picker
  const [month, setMonth] = useState("");
  const [day, setDay] = useState<number | "">("");
  const [year, setYear] = useState<number | "">("");

  // Create a default date
  const defaultDate = new Date();
  if (mode === "signup") {
    defaultDate.setUTCFullYear(2000);
    defaultDate.setUTCMonth(0);
    defaultDate.setUTCDate(1);
    defaultDate.setUTCHours(12, 0, 0, 0);
  } else {
    defaultDate.setUTCMonth(0);
    defaultDate.setUTCDate(1);
    defaultDate.setUTCHours(12, 0, 0, 0);
  }

  const formattedDefaultDate = defaultDate.toISOString().split("T")[0];

  // Initialize date picker values from initial data
  useEffect(() => {
    if (initialData?.born_on) {
      const [yearVal, monthVal, dayVal] = initialData.born_on.split("-");
      setYear(parseInt(yearVal));
      setMonth(new Date(parseInt(yearVal), parseInt(monthVal) - 1, 1).toLocaleString('default', { month: 'long' }));
      setDay(parseInt(dayVal));
    }
  }, [initialData]);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    mode: "onChange", // Enable real-time validation
    defaultValues: {
      title: initialData?.title || "",
      given_name: initialData?.given_name || "",
      family_name: initialData?.family_name || "",
      gender: initialData?.gender || "",
      born_on: initialData?.born_on || formattedDefaultDate,
      phone_number: initialData?.phone_number || "",
      email: initialData?.email || "",
      username: initialData?.username || "",
      password: "",
      confirmPassword: "",
      twitterHandle: "",
      profilePicture: initialData?.profilePicture || "",
      terms: true,
    },
  });

  const handleProfilePictureClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        form.setValue("profilePicture", result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Debug form validation in development
  if (process.env.NODE_ENV === "development") {
    console.log("Form errors:", form.formState.errors);
    console.log("Form is valid:", form.formState.isValid);
    console.log("Form values:", form.getValues());
  }

  async function onSubmit(values: FormValues) {
    try {
      // Only require password for new signups
      if (mode === "signup" && !values.password) {
        toast({
          variant: "destructive",
          title: "Password Required",
          description: "Please enter a password",
        });
        return;
      }

      // If password is provided, validate it
      if (values.password && values.password !== values.confirmPassword) {
        toast({
          variant: "destructive",
          title: "Password Mismatch",
          description: "Passwords do not match",
        });
        return;
      }

      const baseUrl = process.env.NEXT_PUBLIC_BACKEND_URL || '';
      const endpoint = mode === "edit" ? "/api/update-user" : "/api/signup";
      
      // Transform the data to match backend expectations
      const transformedData = {
        firstName: values.given_name,
        lastName: values.family_name,
        email: values.email,
        username: values.username,
        password: values.password,
        title: values.title,
        gender: values.gender,
        dob: values.born_on,
        phone: values.phone_number,
        originalUsername: mode === "edit" ? user?.username : undefined,
        profilePicture: values.profilePicture,
      };

      console.log('Sending data to backend:', transformedData);

      const response = await fetch(`${baseUrl}${endpoint}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(transformedData),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.detail || "Failed to register");
      }

      if (mode === "edit") {
        // For edit mode: Show success message, logout, and redirect to login
        toast({
          title: "Success!",
          description: "Your details have been updated successfully. Please log in again with your updated credentials.",
        });
        
        // Add a small delay to ensure user sees the success message before logout
        setTimeout(() => {
          // Force logout and redirect to login page
          logout();
          router.push("/login");
        }, 1500);
      } else {
        // For signup mode: Log the user in with their data and redirect to home
        login({
          username: values.username,
          email: values.email,
          firstName: values.given_name,
          lastName: values.family_name,
          title: values.title,
          gender: values.gender,
          dob: values.born_on,
          phone: values.phone_number,
          profilePicture: values.profilePicture,
        });

        toast({
          title: "Success!",
          description: "Your account has been created successfully.",
        });

        router.push("/");
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: error instanceof Error ? error.message : (mode === "edit" ? "Failed to update details. Please try again." : "Failed to create account. Please try again."),
      });
      console.error(mode === "edit" ? "Update error:" : "Sign up error:", error);
    }
  }

  return (
    <Card className="w-full max-w-2xl p-6 shadow-lg">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl">{mode === "edit" ? "Edit Your Details" : "Create your account"}</CardTitle>
        <CardDescription>{mode === "edit" ? "Update your information below" : "Sign up with your details below"}</CardDescription>
      </CardHeader>
      {mode === "edit" && (
        <div className="bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4 mx-6 mb-4 text-center max-w-md mx-auto">
          <p className="text-sm text-blue-800 dark:text-blue-200">
            <strong>Important:</strong> Please ensure all information is accurate as this will be used for your flight and booking details.
          </p>
        </div>
      )}
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/* Profile Picture Section */}
            <div className="flex flex-col items-center space-y-4">
              <FormField
                control={form.control}
                name="profilePicture"
                render={({ field }) => (
                  <FormItem className="flex flex-col items-center">
                    <FormLabel>Profile Picture</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <input
                          type="file"
                          ref={fileInputRef}
                          onChange={handleFileChange}
                          accept="image/*"
                          className="hidden"
                        />
                        <div 
                          className="relative cursor-pointer group"
                          onClick={handleProfilePictureClick}
                        >
                          <Avatar className="w-24 h-24">
                            <AvatarImage 
                              src={field.value || "/defaultpfp.jpeg"} 
                              alt="Profile picture" 
                            />
                            <AvatarFallback>
                              {user?.firstName?.[0] || "U"}
                            </AvatarFallback>
                          </Avatar>
                          <div className="absolute inset-0 bg-black bg-opacity-50 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                            <Camera className="w-6 h-6 text-white" />
                          </div>
                        </div>
                      </div>
                    </FormControl>
                    <p className="text-xs text-muted-foreground text-center">
                      Click to upload a new profile picture
                    </p>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="given_name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>First Name</FormLabel>
                    <FormControl>
                      <Input placeholder="John" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="family_name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Last Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Doe" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Title</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a title" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="mr">Mr.</SelectItem>
                        <SelectItem value="mrs">Mrs.</SelectItem>
                        <SelectItem value="ms">Ms.</SelectItem>
                        <SelectItem value="dr">Dr.</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="gender"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Gender</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select gender" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="male">Male</SelectItem>
                        <SelectItem value="female">Female</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="born_on"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Date of Birth</FormLabel>
                    <FormControl>
                      <div className="grid grid-cols-3 gap-2">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="outline" className="w-full justify-between px-3">
                              <span>{month || "Month"}</span>
                              <ChevronDown className="h-4 w-4 shrink-0" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent side="bottom" className="w-full">
                            {Array.from({ length: 12 }, (_, i) => {
                              const monthName = new Date(2000, i, 1).toLocaleString('default', { month: 'long' });
                              return (
                                <DropdownMenuItem key={i} onClick={() => {
                                  setMonth(monthName);
                                  const monthNum = String(i + 1).padStart(2, '0');
                                  const dayStr = day ? String(day).padStart(2, '0') : '01';
                                  if (year && monthNum && dayStr) {
                                    field.onChange(`${year}-${monthNum}-${dayStr}`);
                                  }
                                }}>
                                  {monthName}
                                </DropdownMenuItem>
                              );
                            })}
                          </DropdownMenuContent>
                        </DropdownMenu>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="outline" className="w-full justify-between px-3">
                              <span>{day || "Day"}</span>
                              <ChevronDown className="h-4 w-4 shrink-0" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent side="bottom" className="w-full max-h-64 overflow-y-auto">
                            {Array.from({ length: 31 }, (_, i) => (
                              <DropdownMenuItem key={i} onClick={() => {
                                setDay(i + 1);
                                const monthNum = month ? String(new Date(`${month} 1, 2000`).getMonth() + 1).padStart(2, '0') : '01';
                                const dayStr = String(i + 1).padStart(2, '0');
                                if (year && monthNum && dayStr) {
                                  field.onChange(`${year}-${monthNum}-${dayStr}`);
                                }
                              }}>
                                {i + 1}
                              </DropdownMenuItem>
                            ))}
                          </DropdownMenuContent>
                        </DropdownMenu>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="outline" className="w-full justify-between px-3">
                              <span>{year || "Year"}</span>
                              <ChevronDown className="h-4 w-4 shrink-0" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent side="bottom" className="w-full max-h-64 overflow-y-auto">
                            {Array.from({ length: 100 }, (_, i) => {
                              const yearValue = new Date().getFullYear() - i;
                              return (
                                <DropdownMenuItem key={yearValue} onClick={() => {
                                  setYear(yearValue);
                                  const monthNum = month ? String(new Date(`${month} 1, 2000`).getMonth() + 1).padStart(2, '0') : '01';
                                  const dayStr = day ? String(day).padStart(2, '0') : '01';
                                  if (yearValue && monthNum && dayStr) {
                                    field.onChange(`${yearValue}-${monthNum}-${dayStr}`);
                                  }
                                }}>
                                  {yearValue}
                                </DropdownMenuItem>
                              );
                            })}
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="phone_number"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone Number</FormLabel>
                    <FormControl>
                      <PhoneInput
                        international
                        defaultCountry="US"
                        value={field.value}
                        onChange={field.onChange}
                        placeholder="Enter phone number"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input type="email" placeholder="john.doe@example.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input placeholder="johndoe" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {mode === "signup" && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Input
                            type={showPassword ? "text" : "password"}
                            {...field}
                          />
                          <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                          >
                            {showPassword ? (
                              <EyeOff className="h-4 w-4" />
                            ) : (
                              <Eye className="h-4 w-4" />
                            )}
                          </button>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="confirmPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Confirm Password</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Input
                            type={showConfirmPassword ? "text" : "password"}
                            {...field}
                          />
                          <button
                            type="button"
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                          >
                            {showConfirmPassword ? (
                              <EyeOff className="h-4 w-4" />
                            ) : (
                              <Eye className="h-4 w-4" />
                            )}
                          </button>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            )}

            <FormField
              control={form.control}
              name="twitterHandle"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Twitter Handle (Optional)</FormLabel>
                  <FormControl>
                    <Input placeholder="@johndoe" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {mode === "signup" && (
              <FormField
                control={form.control}
                name="terms"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel>
                        I agree to the terms and conditions
                      </FormLabel>
                      <FormMessage />
                    </div>
                  </FormItem>
                )}
              />
            )}

            <Button 
              type="submit" 
              className="w-full" 
              disabled={mode === "signup" ? !form.formState.isValid : form.formState.isSubmitting}
            >
              {form.formState.isSubmitting 
                ? (mode === "edit" ? "Updating..." : "Signing up...") 
                : (mode === "edit" ? "Update Details" : "Sign up")
              }
            </Button>

            {mode === "signup" && (
              <div className="text-center text-sm">
                Already have an account?{' '}
                <Link href="/" className="underline underline-offset-4 text-primary hover:text-primary/80">
                  Login
                </Link>
              </div>
            )}
          </form>
        </Form>
      </CardContent>
    </Card>
  );
} 