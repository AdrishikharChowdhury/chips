"use client";

import { useState } from "react";
import { RadarChart } from "@/components/charts/radar-chart";
import { RadarGrid } from "@/components/charts/radar-grid";
import { RadarAxis } from "@/components/charts/radar-axis";
import { RadarLabels } from "@/components/charts/radar-labels";
import { RadarArea } from "@/components/charts/radar-area";
import { Legend } from "@/components/charts/legend/legend";
import { LegendItem } from "@/components/charts/legend/legend-item";
import { LegendMarker } from "@/components/charts/legend/legend-marker";
import { LegendLabel } from "@/components/charts/legend/legend-label";
import { LegendValue } from "@/components/charts/legend/legend-value";

interface UsedChartProps {
  metrics: { key: string; label: string }[];
  data: { label: string; color: string; values: Record<string, number> }[];
}

export default function UsedChart({ metrics, data }: UsedChartProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const legendItems = data.map((item) => ({
    label: item.label,
    value: Object.values(item.values).filter((v) => v > 0).length,
    maxValue: metrics.length,
    color: item.color,
  }));

  return (
    <div className="flex flex-col items-center">
      <RadarChart
        data={data}
        metrics={metrics}
        size={500}
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
      <Legend
        items={legendItems}
        hoveredIndex={hoveredIndex}
        onHoverChange={setHoveredIndex}
        className="w-full mt-3"
      >
        <LegendItem>
          <div className="flex items-center gap-2">
            <LegendMarker />
            <LegendLabel className="text-base font-medium" />
            <LegendValue
              className="text-sm tabular-nums ml-auto"
              formatValue={(v) => `${v}/${metrics.length}`}
            />
          </div>
        </LegendItem>
      </Legend>
    </div>
  );
}
