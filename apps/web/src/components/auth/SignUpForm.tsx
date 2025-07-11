import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { API_ROUTES } from "@/config/api";
import { apiClient } from "@/lib/api-client";

const formSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
      "Password must contain at least one uppercase letter, one lowercase letter, and one number"
    ),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

interface SignUpResponse {
  access_token?: string;
  message?: string;
}

export function SignUpForm() {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  // Function to get meaningful error message based on error details
  const getErrorMessage = (error: any) => {
    // Check for specific error status codes
    if (error.status === 409) {
      return "An account with this email address already exists. Please use a different email or try logging in.";
    }
    
    if (error.status === 400) {
      return "Please check your email and password format.";
    }
    
    if (error.status === 429) {
      return "Too many signup attempts. Please try again later.";
    }
    
    if (error.status === 500) {
      return "Server error. Please try again later.";
    }
    
    // Check for specific error messages from backend
    if (error.message) {
      const message = error.message.toLowerCase();
      
      if (message.includes("already exists") || message.includes("email taken")) {
        return "An account with this email address already exists. Please use a different email or try logging in.";
      }
      
      if (message.includes("invalid email")) {
        return "Please enter a valid email address.";
      }
      
      if (message.includes("weak password") || message.includes("password too short")) {
        return "Password is too weak. Please use a stronger password with at least 8 characters.";
      }
      
      if (message.includes("validation failed") || message.includes("invalid input")) {
        return "Please check your input and try again.";
      }
    }
    
    // Default fallback message
    return "Failed to create account. Please check your information and try again.";
  };

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    try {
      const response = await apiClient.post<SignUpResponse>(API_ROUTES.auth.signup, {
        email: values.email,
        password: values.password,
      });
      
      // If signup returns a token, store it and redirect to dashboard
      if (response.data.access_token) {
        localStorage.setItem("token", response.data.access_token);
        toast.success("Account created successfully! Welcome to ContentPilot");
        navigate("/dashboard");
      } else {
        // If no token, show verification message and redirect to login
        toast.success("Account created successfully! Please check your email to verify your account");
        navigate("/login");
      }
    } catch (error: any) {
      const errorMessage = getErrorMessage(error);
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="you@example.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input type="password" placeholder="••••••••" {...field} />
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
                <Input type="password" placeholder="••••••••" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? "Creating account..." : "Create account"}
        </Button>
      </form>
    </Form>
  );
} 