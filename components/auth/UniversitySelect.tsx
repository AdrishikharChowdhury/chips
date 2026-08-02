"use client";

import { useEffect, useState } from "react";
import { fetchUniversities } from "@/lib/actions/university";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function UniversitySelect({
  value,
  onSelect,
  setSlug
}: {
  value: string;
  onSelect: (name: string) => void;
  setSlug: (slug: string) => void;
}) {
  const [universities, setUniversities] = useState<{ name: string; slug: string }[]>([]);

  useEffect(() => {
    fetchUniversities().then((data) => {
      if (data) setUniversities(data);
    });
  }, []);

  const handleSelect = (name: string) => {
    const u = universities.find((u) => u.name === name);
    if (u) setSlug(u.slug);
    onSelect(name);
  };

  return (
    <Select value={value} onValueChange={handleSelect}>
      <SelectTrigger className="form-input pl-4">
        <SelectValue placeholder="Select a University" />
      </SelectTrigger>
      <SelectContent>
        {universities.length === 0 && (
          <SelectItem value="__none" disabled>
            No universities found
          </SelectItem>
        )}
        {universities.map((u) => (
          <SelectItem key={u.name} value={u.name}>
            {u.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
