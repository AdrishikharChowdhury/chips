"use client";
import React from "react";
import { Button } from "../ui/button";
import { addToCart } from "@/lib/actions/component";
import { toast } from "sonner";
import { ShoppingCart } from "lucide-react";

export default function AddToCartButton({id}: {id: string}) {
  return (
    <Button
      onClick={async () => {
        const result = await addToCart(id);
        if (result?.success) {
          toast.success(result.message);
        } else {
          toast.error("An Error Occurred while adding to cart");
        }
      }}
    className="bg-poppy-red text-cream-paper hover:bg-poppy-red/90 py-6 px-8 w-fit cursor-pointer">
      <ShoppingCart />
      <span className="font-degular-display text-lg">
        Add to Cart
      </span>
    </Button>
  );
}