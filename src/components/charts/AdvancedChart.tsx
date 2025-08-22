import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, LineChart, Line } from 'recharts';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Calendar, TrendingUp, BarChart3, LineChart as LineChartIcon } from 'lucide-react';

type ViewType = 'total' | 'by-task';
type PeriodType = 'day' | 'week' | 'month' | 'year';
type ChartType = 'bar' | 'line';

// Mock data for different periods
const mockData = {
  day: [
    { period: '08:00', total: 2, 'Projeto Frontend': 2, 'Reuniões': 0, 'Estudos': 0, 'Backend API': 0 },
    { period: '09:00', total: 1, 'Projeto Frontend': 0, 'Reuniões': 1, 'Estudos': 0, 'Backend API': 0 },
    { period: '10:00', total: 3, 'Projeto Frontend': 1, 'Reuniões': 0, 'Estudos': 2, 'Backend API': 0 },
    { period: '11:00', total: 2, 'Projeto Frontend': 0, 'Reuniões': 0, 'Estudos': 0, 'Backend API': 2 },
    { period: '14:00', total: 4, 'Projeto Frontend': 2, 'Reuniões': 0, 'Estudos': 1, 'Backend API': 1 },
    { period: '15:00', total: 3, 'Projeto Frontend': 1, 'Reuniões': 0, 'Estudos': 0, 'Backend API': 2 },
  ],
  week: [
    { period: 'Dom', total: 0, 'Projeto Frontend': 0, 'Reuniões': 0, 'Estudos': 0, 'Backend API': 0 },
    { period: 'Seg', total: 8.5, 'Projeto Frontend': 4, 'Reuniões': 1, 'Estudos': 2, 'Backend API': 1.5 },
    { period: 'Ter', total: 7.2, 'Projeto Frontend': 3, 'Reuniões': 1.5, 'Estudos': 1.5, 'Backend API': 1.2 },
    { period: 'Qua', total: 6.8, 'Projeto Frontend': 2.5, 'Reuniões': 1, 'Estudos': 2, 'Backend API': 1.3 },
    { period: 'Qui', total: 9.1, 'Projeto Frontend': 4.5, 'Reuniões': 0.5, 'Estudos': 2.5, 'Backend API': 1.6 },
    { period: 'Sex', total: 7.5, 'Projeto Frontend': 3.5, 'Reuniões': 1, 'Estudos': 1.5, 'Backend API': 1.5 },
    { period: 'Sáb', total: 3.2, 'Projeto Frontend': 1, 'Reuniões': 0, 'Estudos': 2.2, 'Backend API': 0 },
  ],
  month: [
    { period: 'Sem 1', total: 35, 'Projeto Frontend': 15, 'Reuniões': 5, 'Estudos': 8, 'Backend API': 7 },
    { period: 'Sem 2', total: 42, 'Projeto Frontend': 18, 'Reuniões': 6, 'Estudos': 10, 'Backend API': 8 },
    { period: 'Sem 3', total: 38, 'Projeto Frontend': 16, 'Reuniões': 4, 'Estudos': 9, 'Backend API': 9 },
    { period: 'Sem 4', total: 41, 'Projeto Frontend': 19, 'Reuniões': 5, 'Estudos': 8, 'Backend API': 9 },
  ],
  year: [
    { period: 'Jan', total: 156, 'Projeto Frontend': 68, 'Reuniões': 20, 'Estudos': 35, 'Backend API': 33 },
    { period: 'Fev', total: 142, 'Projeto Frontend': 62, 'Reuniões': 18, 'Estudos': 32, 'Backend API': 30 },
    { period: 'Mar', total: 168, 'Projeto Frontend': 75, 'Reuniões': 22, 'Estudos': 38, 'Backend API': 33 },
    { period: 'Abr', total: 134, 'Projeto Frontend': 58, 'Reuniões': 16, 'Estudos': 30, 'Backend API': 30 },
    { period: 'Mai', total: 159, 'Projeto Frontend': 71, 'Reuniões': 19, 'Estudos': 35, 'Backend API': 34 },
    { period: 'Jun', total: 145, 'Projeto Frontend': 64, 'Reuniões': 17, 'Estudos': 32, 'Backend API': 32 },
  ],
};

const tasks = ['Projeto Frontend', 'Reuniões', 'Estudos', 'Backend API'];
const taskColors = {
  'Projeto Frontend': 'hsl(var(--primary))',
  'Reuniões': 'hsl(220, 70%, 50%)',
  'Estudos': 'hsl(280, 70%, 50%)',
  'Backend API': 'hsl(140, 70%, 45%)',
};

export const AdvancedChart = () => {
  const [viewType, setViewType] = useState<ViewType>('total');
  const [period, setPeriod] = useState<PeriodType>('week');
  const [chartType, setChartType] = useState<ChartType>('bar');

  const currentData = mockData[period];
  const totalHours = currentData.reduce((sum, item) => sum + item.total, 0);
  const avgHours = totalHours / currentData.length;

  const chartConfig = viewType === 'total' 
    ? {
        total: {
          label: 'Horas Totais',
          color: 'hsl(var(--primary))',
        },
      }
    : Object.fromEntries(
        tasks.map(task => [
          task.replace(' ', ''), 
          { 
            label: task, 
            color: taskColors[task as keyof typeof taskColors] 
          }
        ])
      );

  const periodLabels = {
    day: 'Hoje',
    week: 'Esta Semana',
    month: 'Este Mês',
    year: 'Este Ano',
  };

  const renderChart = () => {
    if (chartType === 'bar') {
      return (
        <BarChart data={currentData}>
          <XAxis 
            dataKey="period" 
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
          {viewType === 'total' ? (
            <Bar 
              dataKey="total" 
              fill="hsl(var(--primary))"
              radius={[4, 4, 0, 0]}
            />
          ) : (
            tasks.map((task, index) => (
              <Bar 
                key={task}
                dataKey={task}
                stackId="tasks"
                fill={taskColors[task as keyof typeof taskColors]}
                radius={index === tasks.length - 1 ? [4, 4, 0, 0] : [0, 0, 0, 0]}
              />
            ))
          )}
        </BarChart>
      );
    } else {
      return (
        <LineChart data={currentData}>
          <XAxis 
            dataKey="period" 
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
            cursor={{ strokeDasharray: '3 3' }}
          />
          {viewType === 'total' ? (
            <Line 
              type="monotone"
              dataKey="total" 
              stroke="hsl(var(--primary))"
              strokeWidth={3}
              dot={{ fill: 'hsl(var(--primary))', strokeWidth: 2, r: 4 }}
            />
          ) : (
            tasks.map((task) => (
              <Line 
                key={task}
                type="monotone"
                dataKey={task}
                stroke={taskColors[task as keyof typeof taskColors]}
                strokeWidth={2}
                dot={{ strokeWidth: 2, r: 3 }}
              />
            ))
          )}
        </LineChart>
      );
    }
  };

  return (
    <Card className="bg-gradient-card shadow-card border-0">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            <span>Métricas de Atividade - {periodLabels[period]}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <TrendingUp className="h-4 w-4" />
            <span>Média: {avgHours.toFixed(1)}h</span>
          </div>
        </CardTitle>
        
        {/* Controls */}
        <div className="flex flex-wrap gap-3 pt-2">
          {/* Period Selector */}
          <Select value={period} onValueChange={(value: PeriodType) => setPeriod(value)}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="day">Dia</SelectItem>
              <SelectItem value="week">Semana</SelectItem>
              <SelectItem value="month">Mês</SelectItem>
              <SelectItem value="year">Ano</SelectItem>
            </SelectContent>
          </Select>

          {/* View Type Selector */}
          <Select value={viewType} onValueChange={(value: ViewType) => setViewType(value)}>
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="total">Total Geral</SelectItem>
              <SelectItem value="by-task">Por Tarefa</SelectItem>
            </SelectContent>
          </Select>

          {/* Chart Type Buttons */}
          <div className="flex gap-1">
            <Button
              variant={chartType === 'bar' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setChartType('bar')}
              className="px-3"
            >
              <BarChart3 className="h-4 w-4" />
            </Button>
            <Button
              variant={chartType === 'line' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setChartType('line')}
              className="px-3"
            >
              <LineChartIcon className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Task Legend for by-task view */}
        {viewType === 'by-task' && (
          <div className="flex flex-wrap gap-2 pt-2">
            {tasks.map((task) => (
              <Badge key={task} variant="outline" className="border" style={{ borderColor: taskColors[task as keyof typeof taskColors] }}>
                <div 
                  className="w-2 h-2 rounded-full mr-2" 
                  style={{ backgroundColor: taskColors[task as keyof typeof taskColors] }}
                />
                {task}
              </Badge>
            ))}
          </div>
        )}
      </CardHeader>
      
      <CardContent>
        <ChartContainer config={chartConfig} className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            {renderChart()}
          </ResponsiveContainer>
        </ChartContainer>
        
        {/* Summary Stats */}
        <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center p-3 rounded-lg bg-primary/5">
            <p className="text-sm text-muted-foreground">Total</p>
            <p className="text-xl font-bold">{totalHours.toFixed(1)}h</p>
          </div>
          <div className="text-center p-3 rounded-lg bg-primary/5">
            <p className="text-sm text-muted-foreground">Média</p>
            <p className="text-xl font-bold">{avgHours.toFixed(1)}h</p>
          </div>
          <div className="text-center p-3 rounded-lg bg-primary/5">
            <p className="text-sm text-muted-foreground">Máximo</p>
            <p className="text-xl font-bold">{Math.max(...currentData.map(d => d.total)).toFixed(1)}h</p>
          </div>
          <div className="text-center p-3 rounded-lg bg-primary/5">
            <p className="text-sm text-muted-foreground">Períodos</p>
            <p className="text-xl font-bold">{currentData.length}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};