"use client";

import { Button, buttonVariants } from "@/components/ui/button";
import { ThemeToggle } from "@/components/web/theme-toggle";
import { authClient } from "@/lib/auth-client";
import { useConvexAuth } from "convex/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export const Navbar = () => {
  const { isAuthenticated, isLoading } = useConvexAuth();
  const router = useRouter();

  const handleLogout = async () =>
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          toast.success("Logged out successfully");
          router.replace("/auth/login");
        },
        onError: (error) => {
          toast.error("Failed to logout!", {
            description: error.error.message,
          });
        },
      },
    });

  return (
    <nav className="w-full py-5 flex items-center justify-between">
      <div className="flex items-center gap-8">
        <Link href="/">
          <h1 className="text-3xl font-bold">
            Next<span className="text-primary">Pro</span>
          </h1>
        </Link>
      </div>

      <div className="flex items-center gap-2">
        <Link href="/" className={buttonVariants({ variant: "ghost" })}>
          Home
        </Link>
        <Link href="/blog" className={buttonVariants({ variant: "ghost" })}>
          Blog
        </Link>
        <Link href="/create" className={buttonVariants({ variant: "ghost" })}>
          Create
        </Link>
      </div>

      <div className="flex items-center gap-2">
        {isLoading ? null : isAuthenticated ? (
          <Button onClick={handleLogout}>Logout</Button>
        ) : (
          <>
            <Link href="/auth/sign-up" className={buttonVariants()}>
              Sign Up
            </Link>
            <Link
              href="/auth/login"
              className={buttonVariants({ variant: "outline" })}
            >
              Log In
            </Link>
          </>
        )}

        <ThemeToggle />
      </div>
    </nav>
  );
};
