"use client";
import { setCookie } from "cookies-next";
import Image from "next/image";
import { useRouter } from "next/navigation";

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
import { useForm } from "react-hook-form";

import { apiClient } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { z } from "zod";
import { useUserStore } from "@/hooks/userStore";
import { useEffect } from "react";

const formSchema = z.object({
  email: z.string(),

  password: z.string().min(1, "Please enter the correct password"),
});

interface SignInResponse {
  token: string;
  message?: string;
}

export default function SignIn() {
  const { setUser } = useUserStore();
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  useEffect(() => {
    router.refresh();
  }, [router]);

  const isSubmitting = form.formState.isSubmitting;
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      console.log("values", values);
      const response = await apiClient.post("/auth/login", values);

      console.log("response", response);
      if (response.data.success) {
        const setTokenCookie = (token: string) => {
          setCookie("token", token);
        };
        setTokenCookie(response.data.token);
        await new Promise<void>((resolve) => {
          toast.success("Logged in successfully!", {
            onAutoClose: () => resolve(),
          });
        });
      } else {
        toast.error("Failed to log in");
      }

      setTimeout(() => {
        router.push("/");
        router.refresh();
      }, 50);
    } catch (error) {
      toast.error("Failed to log in");
      console.log("error", error);
    }
  };

  return (
    <div className="bg-blue-500 min-h-screen flex justify-center items-center p-4">
      <div className="w-[85vw] h-[85vh] mx-auto flex flex-col md:flex-row rounded-2xl bg-white overflow-hidden shadow-lg">
        <div className="w-full md:w-1/2 flex flex-col p-8 relative">
          <div className="text-center mt-7  sm:-mb-[7rem] ">
            <h1 className="text-3xl mb-2 tracking-tighter text-blue-400 font-bold">
              HEC GROUP
            </h1>
            <h2 className="text-5xl tracking-tighter font-bold">
              Welcome Back
            </h2>
          </div>
          <div className="flex-grow flex items-center justify-center">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-4 w-full max-w-sm"
              >
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input placeholder="Email" {...field} />
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
                        <Input
                          type="password"
                          placeholder="Password"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="flex flex-col items-end">
                  <Button variant="link" className="mb-2">
                    Forgot password?
                  </Button>
                  <Button
                    type="submit"
                    className="w-full"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Signing in..." : "Sign In"}
                  </Button>
                </div>
              </form>
            </Form>
          </div>
        </div>
        <div className="hidden md:block w-1/2 bg-gray-100 relative">
          <Image
            src="/signin.png"
            alt="Sign In"
            layout="fill"
            objectFit="cover"
            className="rounded-r-2xl"
          />
        </div>
      </div>
    </div>
  );
}
