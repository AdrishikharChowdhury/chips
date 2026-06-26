"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, Controller, Path } from "react-hook-form";
import type { FieldValues } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import type { ZodType } from "zod";
import ImageUpload from "./ImageUpload";
import { FIELD_NAMES, FIELD_TYPES } from "@/constants";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

interface AuthFormProps {
  schema: ZodType;
  defaultValues: Record<string, unknown>;
  onSubmit: (
    data: Record<string, unknown>,
  ) => Promise<{ success: boolean; message: string }>;
  type: "SIGN_IN" | "SIGN_UP";
}

export default function AuthForm({
  type,
  schema,
  defaultValues,
  onSubmit,
}: AuthFormProps) {
  const isSignIn = type === "SIGN_IN";
  const router = useRouter();
  const form = useForm({
    resolver: zodResolver(schema as any),
    defaultValues,
  });

  const handleSubmit = async (data: Record<string, unknown>) => {
    const result = await onSubmit(data);
    if (result.success) {
      toast.success(result.message);
      router.push("/");
    } else {
      toast.error(result.message);
    }
    
  };

  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-2xl font-semibold">
        {isSignIn ? "Welcome back to CHIPS" : "Create your CHIPS account"}
      </h1>
      <p className="text-sm text-gray-500">
        {isSignIn
          ? "Access vast collection of Electronics Components and Stay Updated"
          : "Please complete all fields and upload a valid university ID to gain access to the Inventory"}
      </p>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
        {Object.keys(defaultValues).map((field) => (
          <FieldGroup key={field}>
            <Controller
              name={field as Path<FieldValues>}
              control={form.control}
              render={({ field: ctrlField, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel
                    className="capitalize"
                    htmlFor={`form-rhf-demo-${field}`}
                  >
                    {FIELD_NAMES[field as keyof typeof FIELD_NAMES]}:
                  </FieldLabel>
                  {field === "universityCard" ? (
                    <ImageUpload
                      onUpload={(url) => form.setValue(field as any, url)}
                      value={ctrlField.value as string}
                    />
                  ) : (
                    <Input
                      className="form-input pl-4"
                      {...(ctrlField as any)}
                      id={`form-rhf-demo-${field}`}
                      aria-invalid={fieldState.invalid}
                      autoComplete="off"
                      required
                      type={FIELD_TYPES[field as keyof typeof FIELD_TYPES]}
                      placeholder={`Enter your ${FIELD_NAMES[field as keyof typeof FIELD_NAMES]}`}
                    />
                  )}
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
          </FieldGroup>
        ))}
        <Button
          type="submit"
          className="form-btn text-xl font-degular-display font-extrabold"
        >
          {isSignIn ? "Sign In" : "Sign Up"}
        </Button>
      </form>
      <p className="text-center text-base font-medium">
        {isSignIn ? "New to CHIPS?" : "Already have an account?"}
        <Link
          href={isSignIn ? "/sign-up" : "/sign-in"}
          className="font-bold ml-2"
        >
          {isSignIn ? "Create Account" : "Sign In"}
        </Link>
      </p>
    </div>
  );
}
