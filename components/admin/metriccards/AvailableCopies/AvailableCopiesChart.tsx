"use client";

import { BarChart } from "@/components/charts/bar-chart";
import { Bar } from "@/components/charts/bar";
import { BarXAxis } from "@/components/charts/bar-x-axis";
import { Grid } from "@/components/charts/grid";
import { ChartTooltip, type TooltipRow } from "@/components/charts/tooltip";

interface AvailableCopiesChartProps {
  data: { title: string; available: number; unavailable: number }[];
}

const tooltipRows = (point: Record<string, unknown>): TooltipRow[] => [
  {
    color: "var(--chart-line-primary)",
    label: "Available",
    value: `${point.available}%`,
  },
  {
    color: "var(--chart-line-secondary)",
    label: "Unavailable",
    value: `${point.unavailable}%`,
  },
];

export default function AvailableCopiesChart({
  data
}: AvailableCopiesChartProps) {
  return (
    <BarChart data={data} xDataKey="title">
      <Grid horizontal />
      <Bar dataKey="available" fill="var(--chart-line-primary)" lineCap="round" />
      <Bar
        dataKey="unavailable"
        fill="var(--chart-line-secondary)"
        lineCap="round"
      />
      <BarXAxis />
      <ChartTooltip rows={tooltipRows} />
    </BarChart>
  );
}
