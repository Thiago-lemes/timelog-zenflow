import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus, FolderOpen, Clock, Eye } from 'lucide-react';
import { Link } from 'react-router-dom';

export const Activities = () => {
  // Mock data - in a real app this would come from state management or API
  const activities = [
    { id: 1, name: 'Projeto Frontend React', totalHours: 45.5, color: 'bg-blue-500' },
    { id: 2, name: 'Reuniões com Cliente', totalHours: 12.0, color: 'bg-green-500' },
    { id: 3, name: 'Estudos e Capacitação', totalHours: 28.5, color: 'bg-purple-500' },
    { id: 4, name: 'Projeto Backend API', totalHours: 67.0, color: 'bg-orange-500' },
    { id: 5, name: 'Documentação Técnica', totalHours: 15.5, color: 'bg-pink-500' },
    { id: 6, name: 'Testes e QA', totalHours: 23.0, color: 'bg-indigo-500' },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Atividades</h1>
          <p className="text-muted-foreground">Gerencie seus projetos e atividades</p>
        </div>
        <Button className="bg-gradient-primary hover:opacity-90 shadow-soft">
          <Plus className="h-4 w-4 mr-2" />
          Nova Atividade
        </Button>
      </div>

      {/* Activities Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {activities.map((activity) => (
          <Card key={activity.id} className="p-6 bg-gradient-card shadow-card border-0 hover:shadow-elevated transition-all duration-200">
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <div className={`${activity.color} p-3 rounded-xl shadow-soft`}>
                  <FolderOpen className="h-6 w-6 text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-lg truncate">{activity.name}</h3>
                </div>
              </div>

              <div className="flex items-center space-x-2 text-muted-foreground">
                <Clock className="h-4 w-4" />
                <span className="text-sm">Total: {activity.totalHours}h</span>
              </div>

              <div className="flex space-x-2">
                <Button variant="outline" size="sm" className="flex-1">
                  <Eye className="h-4 w-4 mr-2" />
                  Detalhes
                </Button>
                <Link to={`/register?activity=${activity.id}`} className="flex-1">
                  <Button size="sm" className="w-full bg-primary/10 text-primary hover:bg-primary hover:text-primary-foreground">
                    <Plus className="h-4 w-4 mr-2" />
                    Registrar
                  </Button>
                </Link>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Empty State (when no activities) - Optional */}
      {activities.length === 0 && (
        <Card className="p-12 text-center bg-gradient-card shadow-card border-0">
          <div className="space-y-4">
            <div className="bg-primary/10 p-4 rounded-full w-16 h-16 mx-auto flex items-center justify-center">
              <FolderOpen className="h-8 w-8 text-primary" />
            </div>
            <div>
              <h3 className="font-semibold text-lg">Nenhuma atividade encontrada</h3>
              <p className="text-muted-foreground">Crie sua primeira atividade para começar a registrar seu tempo</p>
            </div>
            <Button className="bg-gradient-primary hover:opacity-90 shadow-soft">
              <Plus className="h-4 w-4 mr-2" />
              Criar Primeira Atividade
            </Button>
          </div>
        </Card>
      )}
    </div>
  );
};