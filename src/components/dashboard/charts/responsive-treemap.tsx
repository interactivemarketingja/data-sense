'use client'

import { Treemap, ResponsiveContainer } from 'recharts';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';

type ResponsiveTreeMapProps = {
  data: any[];
  config: any; // Not using ChartConfig here as it's more complex for treemap colors
};

// A custom content renderer for the treemap
const CustomizedContent = (props: any) => {
  const { root, depth, x, y, width, height, index, payload, rank, name } = props;
  const isLeaf = depth === 1;

  return (
    <g>
      <rect
        x={x}
        y={y}
        width={width}
        height={height}
        style={{
          fill: `hsl(var(--chart-${index + 1}))`,
          stroke: 'hsl(var(--card))',
          strokeWidth: 2,
          strokeOpacity: 1,
        }}
      />
      {isLeaf && width > 50 && height > 25 ? (
        <text 
            x={x + width / 2} 
            y={y + height / 2} 
            textAnchor="middle" 
            dominantBaseline="middle" 
            className="fill-primary-foreground text-sm font-medium"
        >
          {name}
        </text>
      ) : null}
    </g>
  );
};


export function ResponsiveTreeMap({ data }: ResponsiveTreeMapProps) {
  return (
    <ChartContainer config={{}} className="min-h-[250px] w-full">
      <ResponsiveContainer width="100%" height={250}>
        <Treemap
          data={data}
          dataKey="size"
          aspectRatio={4 / 3}
          stroke="hsl(var(--card))"
          fill="hsl(var(--primary))"
          content={<CustomizedContent />}
        >
           <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent 
                    labelKey="name"
                    formatter={(value, name) => [`${value}`, name]}
                    indicator='dot'
                />}
            />
        </Treemap>
      </ResponsiveContainer>
    </ChartContainer>
  );
}
