"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */

import AuthForm from '@/components/auth/AuthForm';
import { signUp } from '@/lib/actions/auth';
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
      onSubmit={(data, otp, otpExpiry, otpHmac) =>
        signUp({ ...(data as any), otp, otpExpiry, otpHmac })
      }
    />
  );
}