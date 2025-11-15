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
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signUpSchema } from "@/schema/auth.schema";
import { useState } from "react";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { ApiResponse } from "@/lib/api-response";

interface Inputs {
  name: string;
  email: string;
  password: string;
}

export function SignUpForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm<Inputs>({
    mode: "onChange",
    resolver: zodResolver(signUpSchema),
  });

  // form submit
  const onSubmit: SubmitHandler<Inputs> = async (userInput) => {
    try {
      setLoading(true);
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        body: JSON.stringify(userInput),
      });
      const data: ApiResponse = await res.json();
      // api error handling
      if (!res.ok || !data.success) {
        toast.error(data.message || "Signup failed");
        return; 
      }
      // ✅ Success
      toast.success(data.message || "Signup successful");
      reset();
    } catch (error: any) {
      toast.error(error.message || "Something went wrong!");
      console.error("Signup Error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-xl">Welcome back</CardTitle>
          <CardDescription>Signup with your Google account</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)}>
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
                <Button type="submit" disabled={!isValid || loading}>
                  {loading ? (
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
