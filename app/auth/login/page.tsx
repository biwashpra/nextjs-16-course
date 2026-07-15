"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import Link from "next/link";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ILoginForm, loginSchema } from "@/app/auth/schemas/auth";
import { authClient } from "@/lib/auth-client";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { Loader2 } from "lucide-react";

const LoginForm = () => {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const form = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (data: ILoginForm) => {
    startTransition(async () => {
      await authClient.signIn.email({
        email: data.email,
        password: data.password,

        fetchOptions: {
          onSuccess: () => {
            toast.success("Logged in successfully");
            router.replace("/");
          },
          onError: (error) => {
            toast.error("Failed to log in!", {
              description: error.error.message,
            });
          },
        },
      });
    });
  };

  return (
    <section className="bg-foreground dark:bg-background min-h-screen flex items-center justify-center relative">
      <div className="py-10 md:py-20 max-w-lg px-4 sm:px-0 mx-auto w-full">
        <Card className="max-w-lg px-6 py-8 sm:p-12 relative gap-6">
          <CardHeader className="text-center gap-6 p-0">
            <div className="flex flex-col gap-1">
              <CardTitle className="text-2xl font-medium text-card-foreground">
                Welcome to Next Pro
              </CardTitle>
              <CardDescription className="text-sm text-muted-foreground font-normal">
                Login to your account now
              </CardDescription>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <FieldGroup className="gap-6">
                <Field className="grid md:grid-cols-2 md:gap-6 gap-3">
                  <Button
                    variant="outline"
                    type="button"
                    className="text-sm text-medium text-card-foreground gap-2 dark:bg-background rounded-lg h-9 shadow-xs cursor-pointer"
                  >
                    Sign in with Google
                  </Button>
                  <Button
                    variant="outline"
                    type="button"
                    className="text-sm text-medium text-card-foreground gap-2 dark:bg-background rounded-lg h-9 shadow-xs cursor-pointer"
                  >
                    Sign in with Github
                  </Button>
                </Field>
                <FieldSeparator className="*:data-[slot=field-separator-content]:bg-card text-sm text-muted-foreground bg-transparent">
                  <span className="px-4">or sign in with</span>
                </FieldSeparator>

                <div className="flex flex-col gap-4">
                  <Controller
                    name="email"
                    control={form.control}
                    render={({ field, fieldState }) => (
                      <Field className="gap-1.5">
                        <FieldLabel
                          htmlFor="email"
                          className="text-sm text-muted-foreground font-normal"
                        >
                          Email*
                        </FieldLabel>
                        <Input
                          aria-invalid={fieldState.invalid}
                          id="email"
                          type="email"
                          placeholder="example@nextpro.com"
                          className="dark:bg-background shadow-xs h-9"
                          {...field}
                        />
                        {fieldState.invalid && (
                          <FieldError errors={[fieldState.error]} />
                        )}
                      </Field>
                    )}
                  />

                  <Controller
                    name="password"
                    control={form.control}
                    render={({ field, fieldState }) => (
                      <Field className="gap-1.5">
                        <FieldLabel
                          htmlFor="password"
                          className="text-sm text-muted-foreground font-normal"
                        >
                          Password*
                        </FieldLabel>

                        <Input
                          aria-invalid={fieldState.invalid}
                          id="password"
                          type="password"
                          placeholder="Enter your password"
                          className="dark:bg-background shadow-xs h-9"
                          {...field}
                        />
                        {fieldState.invalid && (
                          <FieldError errors={[fieldState.error]} />
                        )}
                      </Field>
                    )}
                  />
                </div>

                <Field orientation="horizontal" className="justify-between">
                  <div className="flex items-center gap-3">
                    <Checkbox
                      id="terms"
                      defaultChecked
                      className="cursor-pointer"
                    />
                    <FieldLabel
                      htmlFor="terms"
                      className="text-sm text-primary font-normal cursor-pointer"
                    >
                      Remember this device
                    </FieldLabel>
                  </div>
                  <Link
                    href="/"
                    className="text-sm text-card-foreground font-medium text-end"
                  >
                    Forgot password?
                  </Link>
                </Field>

                <Field className="gap-4">
                  <Button
                    type="submit"
                    size={"lg"}
                    className="rounded-lg h-10 hover:bg-primary/80 cursor-pointer"
                    disabled={isPending}
                  >
                    {isPending ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" /> Logging
                        in...
                      </>
                    ) : (
                      "Log in"
                    )}
                  </Button>
                  <FieldDescription className="text-center text-sm font-normal text-muted-foreground">
                    Don&apos;t have an account?{" "}
                    <Link
                      href="/auth/sign-up"
                      className="font-medium text-card-foreground no-underline!"
                    >
                      Create an account
                    </Link>
                  </FieldDescription>
                </Field>
              </FieldGroup>
            </form>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default LoginForm;
