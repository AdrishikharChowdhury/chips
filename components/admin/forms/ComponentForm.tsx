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
import {
  createComponent,
  updateComponentDetails,
} from "@/lib/admin/actions/components";
import { Components } from "@/types";
import { useRouter } from "next/navigation";

interface ComponentFormProps {
  type?: "CREATE" | "UPDATE";
  component?: Components;
  componentId?: string;
}

export default function ComponentForm({
  type = "CREATE",
  component,
  componentId,
}: ComponentFormProps) {
  const isUpdate = type === "UPDATE";
  const router = useRouter();
  const form = useForm<
    z.input<typeof componentSchema>,
    unknown,
    z.output<typeof componentSchema>
  >({
    resolver: zodResolver(componentSchema),
    defaultValues: {
      title: component?.title ?? "",
      manufacturer: component?.manufacturer ?? "",
      description: component?.description ?? "",
      type: component?.type ?? "",
      rating: component?.rating ?? 1,
      totalCopies: component?.totalCopies ?? 1,
      availableCopies: component?.availableCopies ?? 1,
      cover: component?.cover ?? "",
      summary: component?.summary ?? "",
    },
  });

  const onSubmit = async (values: z.infer<typeof componentSchema>) => {
    const result =
      isUpdate && componentId
        ? await updateComponentDetails(componentId, values)
        : await createComponent(values);

    if (result.success) {
      toast.success(
        isUpdate
          ? "Component updated successfully"
          : "Component created successfully",
      );
      router.push("/admin/components");
      router.refresh();
    } else {
      toast.error(result.message ?? "Something went wrong");
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
                    {...ctrlField}
                    value={ctrlField.value as string | number}
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
                    {...ctrlField}
                    value={ctrlField.value as string | number}
                    id={`form-rhf-demo-${field.id}`}
                    aria-invalid={fieldState.invalid}
                    autoComplete="off"
                    required
                    type={field.type}
                    step={field.id === "rating" ? "0.1" : undefined}
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
        {isUpdate ? "Update Component" : "Add Component"}
      </Button>
    </form>
  );
}
