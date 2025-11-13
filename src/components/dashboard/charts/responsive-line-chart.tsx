'use client'

import { Line, LineChart, CartesianGrid, XAxis, YAxis } from 'recharts'
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
} from '@/components/ui/chart'
import type { ChartConfig } from '@/components/ui/chart'

type ResponsiveLineChartProps = {
  data: any[];
  config: ChartConfig;
}

export function ResponsiveLineChart({ data, config }: ResponsiveLineChartProps) {
  return (
    <ChartContainer config={config} className="min-h-[250px] w-full">
      <LineChart accessibilityLayer data={data} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey="date"
          tickLine={false}
          axisLine={false}
          tickMargin={8}
          tickFormatter={(value) => {
              const date = new Date(value);
              return date.toLocaleDateString("en-US", { month: 'short', day: 'numeric' });
          }}
        />
        <YAxis />
        <ChartTooltip cursor={false} content={<ChartTooltipContent indicator="line" />} />
        <ChartLegend content={<ChartLegendContent />} />
        <Line dataKey="visitors" type="monotone" stroke="var(--color-visitors)" strokeWidth={2} dot={true} />
      </LineChart>
    </ChartContainer>
  )
}
