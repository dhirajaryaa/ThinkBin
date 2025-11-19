"use client";
import { cn } from "@/lib/utils";
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
  FieldGroup,
  FieldLabel,
  FieldSeparator,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import Google from "@/components/icons/Google";
import Link from "next/link";
import Password from "./Password";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signUpSchema } from "@/schema/auth.schema";
import { Loader2 } from "lucide-react";
import { useActionState, useEffect } from "react";
import { signupUser } from "@/actions/auth/signupUser";

interface Inputs {
  name: string;
  email: string;
  password: string;
}

export function SignUpForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const {
    register,
    setError,
    formState: { errors },
  } = useForm<Inputs>({
    mode: "onBlur",
    resolver: zodResolver(signUpSchema),
  });

  const [state, signupUserAction, isPending] = useActionState(signupUser, {
    success: false,
    error: null,
  });

  useEffect(() => {
    if (state.error) {
      setError("root", {
        type: "server",
        message: state.error,
      });
    }
  }, [state.error, setError]);

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-xl">Welcome back</CardTitle>
          <CardDescription>Signup with your Google account</CardDescription>
        </CardHeader>
        <CardContent>
          <form action={signupUserAction}>
            <FieldGroup>
              <Field>
                <Button
                  variant="outline"
                  className="bg-muted cursor-pointer"
                  type="button"
                >
                  <Google />
                  Signup with Google
                </Button>
              </Field>
              <FieldSeparator className="*:data-[slot=field-separator-content]:bg-card">
                Or continue with
              </FieldSeparator>
              <Field>
                <FieldLabel htmlFor="name">Full Name</FieldLabel>
                <Input
                  {...register("name", { required: "Name is required" })}
                  aria-invalid={errors.name ? "true" : "false"}
                  placeholder="dhiraj arya"
                />
                {errors.name && (
                  <p className="text-destructive text-xs">
                    {errors.name.message}
                  </p>
                )}
              </Field>
              <Field>
                <FieldLabel htmlFor="email">Email</FieldLabel>
                <Input
                  {...register("email", { required: "Email is required" })}
                  aria-invalid={errors.email ? "true" : "false"}
                  placeholder="m@example.com"
                />
                {errors.email && (
                  <p className="text-destructive text-xs">
                    {errors.email.message}
                  </p>
                )}
              </Field>
              <Field>
                <FieldLabel htmlFor="password">Password</FieldLabel>
                <Password register={register} errors={errors} />
              </Field>
              <Field>
                {errors.root && (
                  <p className="text-destructive text-xs text-center">
                    {errors.root.message}
                  </p>
                )}
                <Button type="submit" disabled={isPending}>
                  {isPending ? (
                    <>
                      <Loader2 className="size-7 animate-spin" />
                    </>
                  ) : (
                    <>Signup</>
                  )}
                </Button>
                <FieldDescription className="text-center">
                  already have an account? <Link href="/login">Login</Link>
                </FieldDescription>
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
