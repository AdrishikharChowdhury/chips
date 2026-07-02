"use client";

import { useState } from "react";
import { RingChart } from "@/components/charts/ring-chart";
import { Ring } from "@/components/charts/ring";
import { RingCenter } from "@/components/charts/ring-center";
import { Legend } from "@/components/charts/legend/legend";
import { LegendItem } from "@/components/charts/legend/legend-item";
import { LegendMarker } from "@/components/charts/legend/legend-marker";
import { LegendLabel } from "@/components/charts/legend/legend-label";
import { LegendValue } from "@/components/charts/legend/legend-value";

interface PendingApprovalChartProps {
  data: { label: string; value: number; maxValue: number; color: string }[];
}

export default function PendingApprovalChart({ data }: PendingApprovalChartProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <div className="flex flex-col items-center">
      <RingChart
        data={data}
        size={450}
        strokeWidth={20}
        ringGap={8}
        baseInnerRadius={80}
        hoveredIndex={hoveredIndex}
        onHoverChange={setHoveredIndex}
      >
        {data.map((item, index) => (
          <Ring key={item.label} index={index} />
        ))}
        <RingCenter defaultLabel="Pending">
          {({ value, label, data }) => {
            const pct = data.maxValue > 0 ? ((value / data.maxValue) * 100).toFixed(1) : "0";
            return (
              <div className="flex flex-col items-center">
                <span className="text-2xl font-bold text-midnight-ink tabular-nums">{pct}%</span>
                <span className="text-xs text-midnight-ink/50 mt-0.5">{label}</span>
              </div>
            );
          }}
        </RingCenter>
      </RingChart>
      <Legend
        items={data}
        hoveredIndex={hoveredIndex}
        onHoverChange={setHoveredIndex}
        className="w-full mt-3"
      >
        <LegendItem>
          <div className="flex items-center gap-2">
            <LegendMarker />
            <LegendLabel className="text-base font-medium truncate" />
            <LegendValue
              className="text-sm tabular-nums ml-auto gap-1 shrink-0"
              showPercentage
              formatValue={(v) => `x${v}`}
              formatPercentage={(p) => `${p.toFixed(1)}%`}
            />
          </div>
        </LegendItem>
      </Legend>
    </div>
  );
}
