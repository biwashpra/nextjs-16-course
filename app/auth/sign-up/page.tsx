"use client";

import { ISignUpForm, signUpSchema } from "@/app/schemas/auth";
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
import { authClient } from "@/lib/auth-client";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";

const SignUpForm = () => {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const form = useForm({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const onSubmit = (data: ISignUpForm) => {
    startTransition(async () => {
      await authClient.signUp.email({
        name: data.name,
        email: data.email,
        password: data.password,

        fetchOptions: {
          onSuccess: () => {
            toast.success("Signed up successfully");
            router.replace("/");
          },
          onError: (error) => {
            toast.error("Failed to sign up!", {
              description: error.error.message,
            });
          },
        },
      });
    });
  };

  return (
    <section className="bg-foreground dark:bg-background min-h-screen relative flex items-center justify-center">
      <div className="py-10 md:py-20 max-w-lg px-4 sm:px-0 mx-auto w-full">
        <Card className="max-w-lg px-6 py-8 sm:p-12 relative">
          <CardHeader className="text-center gap-6 p-0">
            <div className="flex flex-col gap-1">
              <CardTitle className="text-2xl font-medium text-card-foreground">
                Signup to Next Pro
              </CardTitle>
              <CardDescription className="text-sm text-muted-foreground font-normal">
                Signup to your account now
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
                    className="text-sm text-medium text-card-foreground gap-2 cursor-pointer dark:bg-background rounded-lg h-9 shadow-xs"
                  >
                    Sign up with Google
                  </Button>
                  <Button
                    variant="outline"
                    type="button"
                    className="text-sm text-medium text-card-foreground gap-2 cursor-pointer dark:bg-background rounded-lg h-9 shadow-xs"
                  >
                    Sign up with Github
                  </Button>
                </Field>
                <FieldSeparator className="*:data-[slot=field-separator-content]:bg-card text-sm text-muted-foreground bg-transparent">
                  <span className="px-4">or sign up with</span>
                </FieldSeparator>

                <div className="flex flex-col gap-4">
                  <Controller
                    name="name"
                    control={form.control}
                    render={({ field, fieldState }) => (
                      <Field className="gap-1.5">
                        <FieldLabel
                          htmlFor="name"
                          className="text-sm text-muted-foreground font-normal"
                        >
                          Name*
                        </FieldLabel>
                        <Input
                          aria-invalid={fieldState.invalid}
                          type="text"
                          placeholder="enter your name"
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

                <Field className="gap-4">
                  <Button
                    type="submit"
                    size={"lg"}
                    className="rounded-lg cursor-pointer h-10 hover:bg-primary/80"
                  >
                    {isPending ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" /> Signing
                        up...
                      </>
                    ) : (
                      "Sign up"
                    )}
                  </Button>
                  <FieldDescription className="text-center text-sm font-normal text-muted-foreground">
                    Already have an account?{" "}
                    <Link
                      href="/auth/login"
                      className="font-medium text-card-foreground no-underline!"
                    >
                      Log in
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

export default SignUpForm;
