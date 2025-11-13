
'use client'

import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from 'recharts'
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
} from '@/components/ui/chart'
import type { ChartConfig } from '@/components/ui/chart'

type ResponsiveAreaChartProps = {
  data: any[];
  config: ChartConfig;
}

export function ResponsiveAreaChart({ data, config }: ResponsiveAreaChartProps) {
  const dataKey = Object.keys(config)[0];

  return (
    <ChartContainer config={config} className="min-h-[250px] w-full">
      <AreaChart accessibilityLayer data={data} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
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
        <ChartTooltip cursor={true} content={<ChartTooltipContent indicator="line" />} />
        <defs>
            <linearGradient id={`color-${dataKey}`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={`var(--color-${dataKey})`} stopOpacity={0.8}/>
                <stop offset="95%" stopColor={`var(--color-${dataKey})`} stopOpacity={0.1}/>
            </linearGradient>
        </defs>
        <Area dataKey={dataKey} type="monotone" fill={`url(#color-${dataKey})`} stroke={`var(--color-${dataKey})`} strokeWidth={2} dot={true} />
      </AreaChart>
    </ChartContainer>
  )
}
