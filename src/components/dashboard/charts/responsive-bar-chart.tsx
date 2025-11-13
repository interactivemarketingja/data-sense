
'use client'

import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from 'recharts'
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
}

export function ResponsiveBarChart({ data, config }: ResponsiveBarChartProps) {
  const dataKey = Object.keys(config)[0];
  const xAxisKey = data.length > 0 ? Object.keys(data[0]).find(key => key !== dataKey) || '' : '';

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
        <ChartTooltip cursor={false} content={<ChartTooltipContent indicator="dot" />} />
        <ChartLegend content={<ChartLegendContent />} />
        <Bar dataKey={dataKey} fill={`var(--color-${dataKey})`} radius={4} />
      </BarChart>
    </ChartContainer>
  )
}
