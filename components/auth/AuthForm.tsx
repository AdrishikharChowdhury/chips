"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
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
import { sendOtp } from "@/lib/actions/otp";
import OtpInput from "./OtpInput";
import UniversitySelect from "./UniversitySelect";
import { Eye, EyeOff } from "lucide-react";

interface AuthFormProps {
  schema: ZodType;
  defaultValues: Record<string, unknown>;
  onSubmit: (
    data: Record<string, unknown>,
    otp?: string,
    otpExpiry?: number,
    otpHmac?: string,
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
  const [orgMode, setOrgMode] = useState<"CREATE" | "JOIN">("JOIN");
  const router = useRouter();
  const [step, setStep] = useState<"form" | "otp">("form");
  const [isSendingOtp, setIsSendingOtp] = useState(false);
  const [otpExpiry, setOtpExpiry] = useState(0);
  const [otpHmac, setOtpHmac] = useState("");
  const [orgName, setOrgName] = useState("");
  const [orgId, setOrgId] = useState("");
  const [otpValue, setOtpValue] = useState("");
  const [orgLogo, setOrgLogo] = useState("");
  const [slug, setSlug] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const form = useForm({
    resolver: zodResolver(schema as any),
    defaultValues,
  });

  const handleSendOtp = async () => {
    const valid = await form.trigger();
    if (!valid) return;

    setIsSendingOtp(true);
    const email = form.getValues("email") as string;
    const result = await sendOtp(email);

    if (result.success) {
      setOtpExpiry(result.expiry);
      setOtpHmac(result.hmac);
      setStep("otp");
    } else {
      toast.error(result.message);
    }
    setIsSendingOtp(false);
  };

  const handleSubmit = async (data: Record<string, unknown>) => {
    const payload = {
      ...data,
      universityName: orgName,
      ...(orgMode === "CREATE" && { universityLogo: orgLogo }),
      ...(orgMode === "JOIN" && {
        universityId: orgId,
        universityCard: orgLogo,
        universitySlug:slug
      }),
    };
    if (!isSignIn) {
      if (step === "otp") {
        if (otpValue.length < 6) {
          toast.error("Please enter the complete OTP");
          return;
        }
        const result = await onSubmit(payload, otpValue, otpExpiry, otpHmac);
        if (result.success) {
          toast.success(result.message);
          router.push("/");
        } else {
          toast.error(result.message);
        }
      }
      return;
    }

    const result = await onSubmit(data);
    if (result.success) {
      toast.success(result.message);
      router.push("/home");
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

      {step === "otp" && !isSignIn ? (
        <div className="space-y-6">
          <p className="text-sm">
            Enter the 6-digit code sent to{" "}
            <strong>{form.getValues("email") as string}</strong>
          </p>
          <OtpInput value={otpValue} onChange={setOtpValue} />
          <Button
            type="button"
            className="form-btn text-xl font-degular-display font-extrabold"
            onClick={() => handleSubmit(form.getValues() as any)}
          >
            Verify & Sign Up
          </Button>
          <button
            type="button"
            onClick={() => {
              setStep("form");
              setOtpValue("");
            }}
            className="text-sm text-gray-500 underline mx-auto block"
          >
            Back to form
          </button>
        </div>
      ) : (
        <form
          onSubmit={form.handleSubmit((data) => {
            if (isSignIn) {
              handleSubmit(data);
            }
          })}
          className="space-y-6"
        >
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
                      <div className="relative">
                        <Input
                          className={`form-input pl-4 ${field === "password" ? "pr-11" : ""}`}
                          {...(ctrlField as any)}
                          id={`form-rhf-demo-${field}`}
                          aria-invalid={fieldState.invalid}
                          autoComplete="off"
                          required
                          type={
                            field === "password" && showPassword
                              ? "text"
                              : FIELD_TYPES[
                                  field as keyof typeof FIELD_TYPES
                                ]
                          }
                          placeholder={`Enter your ${FIELD_NAMES[field as keyof typeof FIELD_NAMES]}`}
                        />
                        {field === "password" && (
                          <button
                            type="button"
                            onClick={() => setShowPassword((prev) => !prev)}
                            aria-label={
                              showPassword ? "Hide password" : "Show password"
                            }
                            aria-pressed={showPassword}
                            className="absolute inset-y-0 right-3 flex items-center text-midnight-ink/60 transition-colors hover:text-midnight-ink"
                          >
                            {showPassword ? (
                              <EyeOff size={20} />
                            ) : (
                              <Eye size={20} />
                            )}
                          </button>
                        )}
                      </div>
                    )}
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
            </FieldGroup>
          ))}
          {!isSignIn && (
            <FieldGroup className="flex flex-row gap-6 justify-start">
              <Field
                orientation="horizontal"
                className="flex-row items-center gap-2 w-auto"
              >
                <FieldLabel className="cursor-pointer">
                  Create University
                  <Input
                    type="radio"
                    name="orgMode"
                    value="CREATE"
                    checked={orgMode === "CREATE"}
                    onChange={() => setOrgMode("CREATE")}
                    className="size-4 accent-cobalt-blue border-0 p-0 h-auto w-auto"
                  />
                </FieldLabel>
              </Field>
              <Field
                orientation="horizontal"
                className="flex-row items-center gap-2 w-auto"
              >
                <FieldLabel className="cursor-pointer">
                  Join University
                  <Input
                    type="radio"
                    name="orgMode"
                    value="JOIN"
                    checked={orgMode === "JOIN"}
                    onChange={() => setOrgMode("JOIN")}
                    className="size-4 accent-cobalt-blue border-0 p-0 h-auto w-auto"
                  />
                </FieldLabel>
              </Field>
            </FieldGroup>
          )}
          {!isSignIn && (
            <FieldGroup>
              <Field>
                <FieldLabel>University Name</FieldLabel>
                {orgMode === "CREATE" ? (
                  <Input
                    className="form-input pl-4"
                    placeholder="Enter University Name"
                    onChange={(e) => setOrgName(e.target.value)}
                    value={orgName}
                    required
                  />
                ) : (
                  <UniversitySelect
                    value={orgName}
                        onSelect={setOrgName}
                        setSlug={setSlug}
                  />
                )}
              </Field>
            </FieldGroup>
          )}

          {!isSignIn && (
            <>
              {orgMode === "CREATE" ? (
                <>
                  <FieldGroup>
                    <Field>
                      <FieldLabel>University Logo:</FieldLabel>
                      <ImageUpload
                        onUpload={(url) => setOrgLogo(url)}
                        value={orgLogo}
                      />
                    </Field>
                  </FieldGroup>
                </>
              ) : (
                <>
                  <FieldGroup>
                    <Field>
                      <FieldLabel>University ID:</FieldLabel>
                      <Input
                        className="form-input pl-4"
                        placeholder="Enter University ID"
                        onChange={(e) => setOrgId(e.target.value)}
                        value={orgId}
                        required
                      />
                    </Field>
                  </FieldGroup>
                  <FieldGroup>
                    <Field>
                      <FieldLabel>University Card:</FieldLabel>
                      <ImageUpload
                        onUpload={(url) => setOrgLogo(url)}
                        value={orgLogo}
                      />
                    </Field>
                  </FieldGroup>
                </>
              )}
            </>
          )}

          {isSignIn ? (
            <Button
              type="submit"
              className="form-btn text-xl font-degular-display font-extrabold"
            >
              Sign In
            </Button>
          ) : (
            <Button
              type="button"
              className="form-btn text-xl font-degular-display font-extrabold"
              onClick={handleSendOtp}
              disabled={isSendingOtp}
            >
              {isSendingOtp ? "Sending OTP..." : "Send OTP"}
            </Button>
          )}
        </form>
      )}

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
