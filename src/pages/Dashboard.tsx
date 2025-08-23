
import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Clock, Plus, Calendar, TrendingUp } from 'lucide-react';
import { Link } from 'react-router-dom';
import { DashboardFilters } from '@/components/filters/DashboardFilters';
import { AdvancedChart } from '@/components/charts/AdvancedChart';
import { ActivityStatus } from '@/components/forms/ActivityForm';

const statusConfig = {
  'feito': { label: 'Feito', color: 'bg-green-100 text-green-700 border-green-200' },
  'em-andamento': { label: 'Em Andamento', color: 'bg-blue-100 text-blue-700 border-blue-200' },
  'impedimento': { label: 'Impedimento', color: 'bg-red-100 text-red-700 border-red-200' },
  'estudando': { label: 'Estudando', color: 'bg-purple-100 text-purple-700 border-purple-200' },
  'pausado': { label: 'Pausado', color: 'bg-yellow-100 text-yellow-700 border-yellow-200' },
};

export const Dashboard = () => {
  console.log('Dashboard is rendering');
  const [selectedStatus, setSelectedStatus] = useState<ActivityStatus | 'todos'>('todos');
  
  // Mock data - in a real app this would come from state management or API
  const todayHours = 6.5;
  const weekHours = 32.5;
  const monthHours = 142.5;

  const allActivities = [
    { id: 1, project: 'Projeto Frontend', hours: 2.5, task: 'Implementação de componentes', time: '14:30', status: 'em-andamento' as ActivityStatus },
    { id: 2, project: 'Reunião Cliente', hours: 1.0, task: 'Revisão de requisitos', time: '10:00', status: 'feito' as ActivityStatus },
    { id: 3, project: 'Estudos React', hours: 3.0, task: 'Aprendizado de hooks avançados', time: '09:00', status: 'estudando' as ActivityStatus },
    { id: 4, project: 'Backend API', hours: 4.0, task: 'Desenvolvimento de endpoints', time: '15:30', status: 'impedimento' as ActivityStatus },
    { id: 5, project: 'Documentação', hours: 1.5, task: 'Atualização de docs', time: '16:00', status: 'pausado' as ActivityStatus },
  ];

  const filteredActivities = selectedStatus === 'todos' 
    ? allActivities 
    : allActivities.filter(activity => activity.status === selectedStatus);

  const handleStatusChange = (status: ActivityStatus | 'todos') => {
    setSelectedStatus(status);
  };

  const handleClearFilters = () => {
    setSelectedStatus('todos');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <p className="text-muted-foreground">Visão geral das suas atividades</p>
        </div>
        <Link to="/register">
          <Button className="bg-gradient-primary hover:opacity-90 shadow-soft">
            <Plus className="h-4 w-4 mr-2" />
            Novo Registro
          </Button>
        </Link>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="p-6 bg-gradient-card shadow-card border-0">
          <div className="flex items-center space-x-3">
            <div className="bg-primary/10 p-3 rounded-xl">
              <Clock className="h-6 w-6 text-primary" />
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Hoje</p>
              <p className="text-2xl font-bold">{todayHours}h</p>
            </div>
          </div>
        </Card>

        <Card className="p-6 bg-gradient-card shadow-card border-0">
          <div className="flex items-center space-x-3">
            <div className="bg-primary/10 p-3 rounded-xl">
              <Calendar className="h-6 w-6 text-primary" />
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Esta Semana</p>
              <p className="text-2xl font-bold">{weekHours}h</p>
            </div>
          </div>
        </Card>

        <Card className="p-6 bg-gradient-card shadow-card border-0">
          <div className="flex items-center space-x-3">
            <div className="bg-primary/10 p-3 rounded-xl">
              <TrendingUp className="h-6 w-6 text-primary" />
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Este Mês</p>
              <p className="text-2xl font-bold">{monthHours}h</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Advanced Chart */}
      <AdvancedChart />

      {/* Filters */}
      <DashboardFilters 
        selectedStatus={selectedStatus}
        onStatusChange={handleStatusChange}
        onClearFilters={handleClearFilters}
      />

      {/* Recent Activities */}
      <Card className="p-6 bg-gradient-card shadow-card border-0">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">
            Atividades Recentes
            {selectedStatus !== 'todos' && (
              <span className="ml-2 text-sm text-muted-foreground">
                ({filteredActivities.length} de {allActivities.length})
              </span>
            )}
          </h2>
          <Link to="/history">
            <Button variant="ghost" size="sm" className="text-primary hover:bg-primary/10">
              Ver todas
            </Button>
          </Link>
        </div>
        
        <div className="space-y-3">
          {filteredActivities.length > 0 ? (
            filteredActivities.map((activity) => (
              <div key={activity.id} className="flex items-center justify-between p-4 rounded-lg bg-accent/50 hover:bg-accent transition-colors">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="font-medium">{activity.project}</h3>
                    <Badge className={statusConfig[activity.status].color}>
                      {statusConfig[activity.status].label}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">{activity.task}</p>
                </div>
                <div className="text-right">
                  <p className="font-medium">{activity.hours}h</p>
                  <p className="text-sm text-muted-foreground">{activity.time}</p>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-8">
              <p className="text-muted-foreground">
                Nenhuma atividade encontrada para o status selecionado.
              </p>
            </div>
          )}
        </div>
      </Card>
    </div>
  );
};
