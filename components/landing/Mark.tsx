import React from "react";

export function Mark({ shape, color }: { shape: string; color: string }) {
  if (shape === "circle") {
    return <span className="size-6 rounded-full" style={{ backgroundColor: color }} />;
  }
  if (shape === "triangle") {
    return (
      <span
        className="size-0"
        style={{
          borderLeft: "12px solid transparent",
          borderRight: "12px solid transparent",
          borderBottom: `20px solid ${color}`,
        }}
      />
    );
  }
  return <span className="size-6" style={{ backgroundColor: color }} />;
}
