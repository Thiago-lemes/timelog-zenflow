import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Search, Filter, Clock, Calendar, FolderOpen } from 'lucide-react';
import { useState } from 'react';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

export const History = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activityFilter, setActivityFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [periodFilter, setPeriodFilter] = useState('all');

  // Mock data - in a real app this would come from API
  const activities = [
    { id: '1', name: 'Projeto Frontend React' },
    { id: '2', name: 'Reuniões com Cliente' },
    { id: '3', name: 'Estudos e Capacitação' },
    { id: '4', name: 'Projeto Backend API' },
  ];

  const statusConfig = {
    'feito': { label: 'Feito', color: 'bg-green-100 text-green-700 border-green-200' },
    'em-andamento': { label: 'Em Andamento', color: 'bg-blue-100 text-blue-700 border-blue-200' },
    'impedimento': { label: 'Impedimento', color: 'bg-red-100 text-red-700 border-red-200' },
    'estudando': { label: 'Estudando', color: 'bg-purple-100 text-purple-700 border-purple-200' },
    'pausado': { label: 'Pausado', color: 'bg-yellow-100 text-yellow-700 border-yellow-200' },
  };

  const workLogs = [
    {
      id: 1,
      activity: 'Projeto Frontend React',
      date: new Date(2024, 0, 22),
      hours: 3.5,
      description: 'Implementação dos componentes principais da dashboard',
      nextStep: 'Integrar com API backend',
      activityId: '1',
      status: 'em-andamento' as keyof typeof statusConfig
    },
    {
      id: 2,
      activity: 'Reuniões com Cliente',
      date: new Date(2024, 0, 22),
      hours: 1.0,
      description: 'Alinhamento sobre requisitos do projeto',
      nextStep: 'Preparar protótipo das telas',
      activityId: '2',
      status: 'feito' as keyof typeof statusConfig
    },
    {
      id: 3,
      activity: 'Estudos e Capacitação',
      date: new Date(2024, 0, 21),
      hours: 2.5,
      description: 'Estudo de React Query e gerenciamento de estado',
      nextStep: 'Aplicar conhecimentos no projeto atual',
      activityId: '3',
      status: 'estudando' as keyof typeof statusConfig
    },
    {
      id: 4,
      activity: 'Projeto Backend API',
      date: new Date(2024, 0, 21),
      hours: 4.0,
      description: 'Desenvolvimento das rotas de autenticação',
      nextStep: 'Implementar middleware de autorização',
      activityId: '4',
      status: 'impedimento' as keyof typeof statusConfig
    },
    {
      id: 5,
      activity: 'Projeto Frontend React',
      date: new Date(2024, 0, 20),
      hours: 6.0,
      description: 'Setup inicial do projeto e configuração do ambiente',
      nextStep: 'Criar estrutura de componentes',
      activityId: '1',
      status: 'feito' as keyof typeof statusConfig
    },
  ];

  // Filter logic
  const filteredLogs = workLogs.filter((log) => {
    const matchesSearch = log.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         log.activity.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesActivity = activityFilter === 'all' || log.activityId === activityFilter;
    const matchesStatus = statusFilter === 'all' || log.status === statusFilter;
    // For simplicity, not implementing period filter logic here
    return matchesSearch && matchesActivity && matchesStatus;
  });

  const groupedLogs = filteredLogs.reduce((groups, log) => {
    const dateKey = format(log.date, 'yyyy-MM-dd');
    if (!groups[dateKey]) {
      groups[dateKey] = [];
    }
    groups[dateKey].push(log);
    return groups;
  }, {} as Record<string, typeof workLogs>);

  const getTotalHours = (logs: typeof workLogs) => {
    return logs.reduce((total, log) => total + log.hours, 0);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">Histórico</h1>
        <p className="text-muted-foreground">Visualize todos os seus registros de atividades</p>
      </div>

      {/* Filters */}
      <Card className="p-4 bg-gradient-card shadow-card border-0">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {/* Search */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Buscar</label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Buscar por descrição..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-background border-border"
              />
            </div>
          </div>

          {/* Activity Filter */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Atividade</label>
            <Select value={activityFilter} onValueChange={setActivityFilter}>
              <SelectTrigger className="bg-background border-border">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todas as atividades</SelectItem>
                {activities.map((activity) => (
                  <SelectItem key={activity.id} value={activity.id}>
                    {activity.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Status Filter */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Status</label>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="bg-background border-border">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos os status</SelectItem>
                {Object.entries(statusConfig).map(([key, config]) => (
                  <SelectItem key={key} value={key}>
                    {config.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Period Filter */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Período</label>
            <Select value={periodFilter} onValueChange={setPeriodFilter}>
              <SelectTrigger className="bg-background border-border">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos os períodos</SelectItem>
                <SelectItem value="today">Hoje</SelectItem>
                <SelectItem value="week">Esta semana</SelectItem>
                <SelectItem value="month">Este mês</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </Card>

      {/* Results Summary */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          {filteredLogs.length} registro(s) encontrado(s)
        </p>
        <Badge variant="secondary" className="bg-primary/10 text-primary">
          Total: {getTotalHours(filteredLogs)}h
        </Badge>
      </div>

      {/* History List */}
      <div className="space-y-6">
        {Object.entries(groupedLogs)
          .sort(([a], [b]) => new Date(b).getTime() - new Date(a).getTime())
          .map(([dateKey, logs]) => (
          <div key={dateKey} className="space-y-3">
            {/* Date Header */}
            <div className="flex items-center space-x-3">
              <div className="bg-primary/10 p-2 rounded-lg">
                <Calendar className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold">
                  {format(new Date(dateKey), "EEEE, dd 'de' MMMM 'de' yyyy", { locale: ptBR })}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {getTotalHours(logs)}h trabalhadas
                </p>
              </div>
            </div>

            {/* Logs for this date */}
            <div className="space-y-3 ml-8">
              {logs.map((log) => (
                <Card key={log.id} className="p-4 bg-gradient-card shadow-card border-0 hover:shadow-elevated transition-all duration-200">
                  <div className="space-y-3">
                    {/* Header */}
                    <div className="flex items-start justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="bg-primary/10 p-2 rounded-lg">
                          <FolderOpen className="h-4 w-4 text-primary" />
                        </div>
                        <div>
                          <h4 className="font-medium">{log.activity}</h4>
                          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                            <Clock className="h-3 w-3" />
                            <span>{log.hours}h</span>
                          </div>
                        </div>
                      </div>
                      <Badge className={statusConfig[log.status].color}>
                        {statusConfig[log.status].label}
                      </Badge>
                    </div>

                    {/* Description */}
                    <div className="space-y-2">
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">O que foi feito:</p>
                        <p className="text-sm">{log.description}</p>
                      </div>
                      
                      {log.nextStep && (
                        <div>
                          <p className="text-sm font-medium text-muted-foreground">Próximo passo:</p>
                          <p className="text-sm">{log.nextStep}</p>
                        </div>
                      )}
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {filteredLogs.length === 0 && (
        <Card className="p-12 text-center bg-gradient-card shadow-card border-0">
          <div className="space-y-4">
            <div className="bg-primary/10 p-4 rounded-full w-16 h-16 mx-auto flex items-center justify-center">
              <Search className="h-8 w-8 text-primary" />
            </div>
            <div>
              <h3 className="font-semibold text-lg">Nenhum registro encontrado</h3>
              <p className="text-muted-foreground">
                Tente ajustar os filtros ou adicionar novos registros
              </p>
            </div>
          </div>
        </Card>
      )}
    </div>
  );
};