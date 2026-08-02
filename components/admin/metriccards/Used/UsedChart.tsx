"use client";

import { useState } from "react";
import { RadarChart } from "@/components/charts/radar-chart";
import { RadarGrid } from "@/components/charts/radar-grid";
import { RadarAxis } from "@/components/charts/radar-axis";
import { RadarLabels } from "@/components/charts/radar-labels";
import { RadarArea } from "@/components/charts/radar-area";

interface UsedChartProps {
  metrics: { key: string; label: string }[];
  data: { label: string; color: string; values: Record<string, number> }[];
}

export default function UsedChart({ metrics, data }: UsedChartProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <div className="flex w-full max-w-full flex-col items-center overflow-x-auto">
      <RadarChart
        data={data}
        metrics={metrics}
        size={350}
        hoveredIndex={hoveredIndex}
        onHoverChange={setHoveredIndex}
      >
        <RadarGrid />
        <RadarAxis />
        <RadarLabels />
        {data.map((item, index) => (
          <RadarArea key={item.label} index={index} />
        ))}
      </RadarChart>
    </div>
  );
}
