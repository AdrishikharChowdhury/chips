"use client";

import AuthForm from '@/components/auth/AuthForm';
import { signUpSchema } from '@/lib/validations';

export default function SignUpPage() {
  return (
    <AuthForm
      type="SIGN_UP"
      schema={signUpSchema}
      defaultValues={{
        email: "",
        password: "",
        fullName: "",
        universityId: 0,
        universityCard: "",
      }}
      onSubmit={async () => ({ success: true })}
    />
  );
}