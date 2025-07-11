import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useNavigate, useLocation } from "react-router-dom";
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
  password: z.string().min(8, "Password must be at least 8 characters"),
});

interface LoginResponse {
  access_token: string;
}

export function LoginForm() {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // Get the intended destination from location state, default to dashboard
  const from = location.state?.from?.pathname || "/dashboard";

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // Function to get meaningful error message based on error details
  const getErrorMessage = (error: any) => {
    // Check for specific error status codes
    if (error.status === 401) {
      return "Invalid email or password. Please check your credentials and try again.";
    }
    
    if (error.status === 404) {
      return "User with this email address does not exist. Please check your email or sign up for a new account.";
    }
    
    if (error.status === 400) {
      return "Please check your email and password format.";
    }
    
    if (error.status === 429) {
      return "Too many login attempts. Please try again later.";
    }
    
    if (error.status === 500) {
      return "Server error. Please try again later.";
    }
    
    // Check for specific error messages from backend
    if (error.message) {
      const message = error.message.toLowerCase();
      
      if (message.includes("user not found") || message.includes("does not exist")) {
        return "User with this email address does not exist. Please check your email or sign up for a new account.";
      }
      
      if (message.includes("invalid password") || message.includes("incorrect password")) {
        return "Incorrect password. Please check your password and try again.";
      }
      
      if (message.includes("invalid credentials") || message.includes("authentication failed")) {
        return "Invalid email or password. Please check your credentials and try again.";
      }
      
      if (message.includes("account disabled") || message.includes("account suspended")) {
        return "Your account has been disabled. Please contact support.";
      }
      
      if (message.includes("email not verified")) {
        return "Please verify your email address before logging in. Check your inbox for the verification email.";
      }
    }
    
    // Default fallback message
    return "Login failed. Please check your email and password and try again.";
  };

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    try {
      const response = await apiClient.post<LoginResponse>(API_ROUTES.auth.login, values);
      localStorage.setItem("token", response.data.access_token);
      toast.success("Logged in successfully");
      
      // Redirect to intended page or dashboard
      navigate(from, { replace: true });
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
        <div className="flex items-center justify-between">
          <Button
            type="button"
            variant="link"
            className="px-0"
            onClick={() => navigate("/forgot-password")}
          >
            Forgot password?
          </Button>
        </div>
        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? "Signing in..." : "Sign in"}
        </Button>
      </form>
    </Form>
  );
} 