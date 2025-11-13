'use client'

import { Pie, PieChart, Cell, Tooltip } from 'recharts'
import {
  ChartContainer,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
} from '@/components/ui/chart'
import type { ChartConfig } from '@/components/ui/chart'

type ResponsivePieChartProps = {
  data: any[];
  config: ChartConfig;
}

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#AF19FF", "#FF1919"];

export function ResponsivePieChart({ data, config }: ResponsivePieChartProps) {
  const dataKey = Object.keys(config)[0] || 'value';
  const nameKey = Object.keys(config)[1] || 'name';

  return (
    <ChartContainer config={config} className="min-h-[250px] w-full">
      <PieChart>
        <Tooltip content={<ChartTooltipContent />} />
        <Pie
          data={data}
          dataKey={dataKey}
          nameKey={nameKey}
          cx="50%"
          cy="50%"
          outerRadius={80}
          label
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <ChartLegend
            content={<ChartLegendContent />}
            wrapperStyle={{
                paddingTop: 20
            }}
        />
      </PieChart>
    </ChartContainer>
  )
}
