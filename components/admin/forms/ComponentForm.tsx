"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, Controller } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import type z from "zod";
import { toast } from "sonner";
import { componentSchema } from "@/lib/validations";
import { InputGroupTextarea } from "@/components/ui/input-group";
import ImageUpload from "./ImageUpload";
import { componentFields } from "@/constants";
import { createComponent } from "@/lib/admin/actions/components";
import { useRouter } from "next/navigation";

interface AuthFormProps {
  type?: "CREATE" | "UPDATE";
}

export default function ComponentForm({ type, ...component }: AuthFormProps) {
  const router = useRouter();
  const form = useForm<z.infer<typeof componentSchema>>({
    resolver: zodResolver(componentSchema),
    defaultValues: {
      title: "",
      manufacturer: "",
      description: "",
      type: "",
      rating: 1,
      totalCopies: 1,
      availableCopies: 1,
      cover: "",
      summary: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof componentSchema>) => {
    const result = await createComponent(values);
    if (result.success) {
      toast.success("Component created successfully");
      router.push("/admin/components");
    } else {
      toast.error(result.message);
    }
  };

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
      {componentFields.map((field) => (
        <FieldGroup key={field.id}>
          <Controller
            name={field.id}
            control={form.control}
            render={({ field: ctrlField, fieldState }) => (
              <Field
                className="flex flex-col gap-1"
                data-invalid={fieldState.invalid}
              >
                <FieldLabel
                  className="capitalize text-base"
                  htmlFor={`form-rhf-demo-${field.id}`}
                >
                  {field.title}
                </FieldLabel>
                {field.type === "textarea" ? (
                  <InputGroupTextarea
                    className="component-form_input pl-4 min-h-50 border bg-midnight-ink/5 text-lg!"
                    {...(ctrlField as any)}
                    id={`form-rhf-demo-${field.id}`}
                    aria-invalid={fieldState.invalid}
                    autoComplete="off"
                    required
                    placeholder={field.placeholder}
                  />
                ) : field.type === "file" ? (
                  <ImageUpload
                    onUpload={(url) => form.setValue(field.id, url)}
                    value={ctrlField.value as string}
                  />
                ) : (
                  <Input
                    className="component-form_input pl-4"
                    {...(ctrlField as any)}
                    id={`form-rhf-demo-${field.id}`}
                    aria-invalid={fieldState.invalid}
                    autoComplete="off"
                    required
                    type={field.type}
                    placeholder={field.placeholder}
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
        Add Component
      </Button>
    </form>
  );
}
