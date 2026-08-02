"use client";

import { useState } from "react";
import { RingChart } from "@/components/charts/ring-chart";
import { Ring } from "@/components/charts/ring";
import { RingCenter } from "@/components/charts/ring-center";

interface PendingApprovalChartProps {
  data: { label: string; value: number; maxValue: number; color: string }[];
}

export default function PendingApprovalChart({ data }: PendingApprovalChartProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <div className="flex w-full max-w-full flex-col items-center overflow-x-auto">
      <RingChart
        data={data}
        size={350}
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
    <div className="flex flex-col items-center" suppressHydrationWarning>
                <span className="text-2xl font-bold text-midnight-ink tabular-nums">{pct}%</span>
                <span className="text-xs text-midnight-ink/50 mt-0.5">{label}</span>
              </div>
            );
          }}
        </RingCenter>
      </RingChart>
    </div>
  );
}
