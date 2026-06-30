import { Separator } from "@/components/ui/separator";

interface CartListProps {
  componentTitle: string;
  componentType: string;
  amount: number;
}

export function CartList({ componentTitle, amount }: CartListProps) {
  return (
    <>
      <dl className="flex items-center justify-between mx-4">
        <dt>{componentTitle}</dt>
        <dd className="text-muted-foreground">{amount}</dd>
      </dl>
      <Separator />
    </>
  );
}
