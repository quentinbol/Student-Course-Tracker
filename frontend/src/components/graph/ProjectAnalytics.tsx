import { useState } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  Cell
} from 'recharts';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../ui/card';
import { BarChart3 } from 'lucide-react';
import type { Stats } from '../../hook/useStatistics';

export const ProjectAnalytics = ({ stats }: { stats: Stats }) => {
    
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const { chartData } = stats;

  return (
    <Card className="shadow-lg border-0">
      <CardHeader>
        <CardTitle className="text-lg font-semibold flex items-center gap-2">
          <BarChart3 className="h-5 w-5" />
          Course Enrollment
        </CardTitle>
        <CardDescription>Top courses by student count</CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={chartData} style={{ outline: 'none' }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis
              dataKey="name"
              tick={{ fill: '#6b7280', fontSize: 12 }}
              tickLine={{ stroke: '#e5e7eb' }}
            />
            <YAxis
              tick={{ fill: '#6b7280', fontSize: 12 }}
              tickLine={{ stroke: '#e5e7eb' }}
            />
            <Tooltip 
              cursor={false}
              contentStyle={{ 
                backgroundColor: 'white', 
                border: '1px solid #e5e7eb',
                borderRadius: '8px',
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
              }}
              labelFormatter={(_label, payload) => payload?.[0]?.payload?.fullName ?? ''}
            />
            <Bar
              dataKey="students"
              radius={[8, 8, 0, 0]}
            >
            {chartData.map((_entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={index === activeIndex ? "#059669" : "#10b981"} // couleur barre seule
                onMouseEnter={() => setActiveIndex(index)}
                onMouseLeave={() => setActiveIndex(null)}
              />
            ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};