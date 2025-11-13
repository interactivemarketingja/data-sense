
'use client'

import { Bar, BarChart, CartesianGrid, XAxis, YAxis, ResponsiveContainer } from 'recharts'
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
} from '@/components/ui/chart'
import type { ChartConfig } from '@/components/ui/chart'

type ResponsiveBarChartProps = {
  data: any[];
  config: ChartConfig;
  dataKey?: string;
  xAxisKey?: string;
}

export function ResponsiveBarChart({ data, config, dataKey = "desktop", xAxisKey = "month" }: ResponsiveBarChartProps) {
  const key = Object.keys(config)[0] || dataKey;
  
  return (
    <ChartContainer config={config} className="min-h-[250px] w-full">
      <BarChart accessibilityLayer data={data}>
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey={xAxisKey}
          tickLine={false}
          tickMargin={10}
          axisLine={false}
          tickFormatter={(value) => typeof value === 'string' ? value.slice(0, 3) : value}
        />
        <YAxis />
        <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
        <ChartLegend content={<ChartLegendContent />} />
        <Bar dataKey={key} fill={`var(--color-${key})`} radius={4} />
      </BarChart>
    </ChartContainer>
  )
}
