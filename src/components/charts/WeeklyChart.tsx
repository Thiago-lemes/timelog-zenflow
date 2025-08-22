
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer } from 'recharts';

const weeklyData = [
  { day: 'Dom', hours: 0 },
  { day: 'Seg', hours: 8.5 },
  { day: 'Ter', hours: 7.2 },
  { day: 'Qua', hours: 6.8 },
  { day: 'Qui', hours: 9.1 },
  { day: 'Sex', hours: 7.5 },
  { day: 'Sáb', hours: 3.2 },
];

const chartConfig = {
  hours: {
    label: 'Horas',
    color: 'hsl(var(--primary))',
  },
};

export const WeeklyChart = () => {
  const totalWeekHours = weeklyData.reduce((sum, day) => sum + day.hours, 0);
  const avgDailyHours = totalWeekHours / 7;

  return (
    <Card className="bg-gradient-card shadow-card border-0">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>Métricas Semanais</span>
          <div className="text-sm text-muted-foreground">
            Média: {avgDailyHours.toFixed(1)}h/dia
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-[200px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={weeklyData}>
              <XAxis 
                dataKey="day" 
                axisLine={false}
                tickLine={false}
                className="text-xs"
              />
              <YAxis 
                axisLine={false}
                tickLine={false}
                className="text-xs"
              />
              <ChartTooltip 
                content={<ChartTooltipContent />}
                cursor={{ fill: 'hsl(var(--muted))' }}
              />
              <Bar 
                dataKey="hours" 
                fill="hsl(var(--primary))"
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};
