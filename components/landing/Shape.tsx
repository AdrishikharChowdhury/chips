import React from 'react';

export default function Shape({ type, accent }: { type: string; accent: string }) {
  if (type === "circle") {
    return <span className="size-4 rounded-full" style={{ backgroundColor: accent }} />;
  }
  if (type === "triangle") {
    return (
      <span
        className="size-0"
        style={{
          borderLeft: "8px solid transparent",
          borderRight: "8px solid transparent",
          borderBottom: `14px solid ${accent}`,
        }}
      />
    );
  }
  return <span className="size-4" style={{ backgroundColor: accent }} />;
}