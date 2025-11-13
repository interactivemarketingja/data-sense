'use client'

import * as React from 'react';
import { Pie, PieChart, Cell } from 'recharts'
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
} from '@/components/ui/chart'
import type { ChartConfig } from '@/components/ui/chart'

type ResponsivePieChartProps = {
  data: any[];
  config: ChartConfig;
}

export function ResponsivePieChart({ data, config }: ResponsivePieChartProps) {
  const dataKey = "value";
  const nameKey = "name";

  // Assign a color to each data item from the config
  const chartData = React.useMemo(() => {
    return data.map(item => ({
      ...item,
      fill: `var(--color-${item.name})`
    }));
  }, [data]);
  
  return (
    <ChartContainer config={config} className="min-h-[250px] w-full flex items-center justify-center">
      <PieChart>
        <ChartTooltip
          cursor={false}
          content={<ChartTooltipContent hideLabel />}
        />
        <Pie
          data={chartData}
          dataKey={dataKey}
          nameKey={nameKey}
          cx="50%"
          cy="50%"
          outerRadius={80}
          innerRadius={60}
          labelLine={false}
          label={({
            cx,
            cy,
            midAngle,
            innerRadius,
            outerRadius,
            value,
            index,
          }) => {
            const RADIAN = Math.PI / 180
            const radius = 12 + innerRadius + (outerRadius - innerRadius)
            const x = cx + radius * Math.cos(-midAngle * RADIAN)
            const y = cy + radius * Math.sin(-midAngle * RADIAN)

            return (
              <text
                x={x}
                y={y}
                className="fill-muted-foreground text-xs"
                textAnchor={x > cx ? 'start' : 'end'}
                dominantBaseline="central"
              >
                {chartData[index].name} ({value}%)
              </text>
            )
          }}
        >
          {chartData.map((entry) => (
            <Cell key={`cell-${entry.name}`} fill={entry.fill} />
          ))}
        </Pie>
        <ChartLegend
          content={<ChartLegendContent nameKey="name" />}
          verticalAlign="bottom"
          align="center"
          iconType="circle"
        />
      </PieChart>
    </ChartContainer>
  )
}
