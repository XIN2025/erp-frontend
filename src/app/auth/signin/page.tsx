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
      console.log("pusignggg");
      setTimeout(() => {
        router.push("/");
        router.refresh();
      }, 50);
      console.log("pushed");
    } catch (error) {
      console.log("error", error);
    }
  };

  return (
    <div className="bg-blue-500 min-h-screen flex justify-center items-center">
      <div className="h-[calc(100vh-10rem)] flex w-[85vw] mx-auto rounded-2xl bg-white overflow-hidden relative">
        <div className="h-full flex flex-col items-center justify-center sm:w-1/2 bg-white gap-3 p-4 relative z-10">
          <div className="absolute top-8 left-0   right-0 flex flex-col items-center justify-center gap-4">
            <h1 className="text-3xl mb-4 tracking-tighter text-blue-400 font-bold">
              hec group
            </h1>
            <h1 className="text-5xl tracking-tighter font-bold">
              Welcome Back
            </h1>
          </div>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-2 w-3/4 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
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
                <Button variant="link">Forgot passowrd?</Button>
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
        <div className="sm:w-1/2 h-full bg-gray-100 relative">
          <Image
            src="/signin.png"
            alt="image"
            fill
            objectFit="cover"
            className="rounded-2xl"
          />
        </div>
      </div>
    </div>
  );
}
