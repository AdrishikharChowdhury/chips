"use client";

import AuthForm from "@/components/auth/AuthForm";
import { signInWithCredentials } from "@/lib/actions/auth";
import { signInSchema } from "@/lib/validations";
import { AuthCredentials } from "@/types";

export default function SignInPage() {
  return (
    <AuthForm
      type="SIGN_IN"
      schema={signInSchema}
      defaultValues={{
        email: "",
        password: "",
      }}
      onSubmit={(data) => signInWithCredentials(data as Pick<AuthCredentials, "email" | "password">)}
    />
  );
}
