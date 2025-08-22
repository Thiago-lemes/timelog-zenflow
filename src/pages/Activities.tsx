
import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Plus, FolderOpen, Clock, Eye, Edit } from 'lucide-react';
import { Link } from 'react-router-dom';
import { ActivityForm, Activity, ActivityStatus } from '@/components/forms/ActivityForm';

const statusConfig = {
  'feito': { label: 'Feito', color: 'bg-green-100 text-green-700 border-green-200' },
  'em-andamento': { label: 'Em Andamento', color: 'bg-blue-100 text-blue-700 border-blue-200' },
  'impedimento': { label: 'Impedimento', color: 'bg-red-100 text-red-700 border-red-200' },
  'estudando': { label: 'Estudando', color: 'bg-purple-100 text-purple-700 border-purple-200' },
  'pausado': { label: 'Pausado', color: 'bg-yellow-100 text-yellow-700 border-yellow-200' },
};

export const Activities = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingActivity, setEditingActivity] = useState<Activity | undefined>();
  
  // Mock data com status
  const [activities, setActivities] = useState<Activity[]>([
    { id: 1, name: 'Projeto Frontend React', totalHours: 45.5, color: 'bg-blue-500', status: 'em-andamento' },
    { id: 2, name: 'Reuniões com Cliente', totalHours: 12.0, color: 'bg-green-500', status: 'feito' },
    { id: 3, name: 'Estudos e Capacitação', totalHours: 28.5, color: 'bg-purple-500', status: 'estudando' },
    { id: 4, name: 'Projeto Backend API', totalHours: 67.0, color: 'bg-orange-500', status: 'impedimento' },
    { id: 5, name: 'Documentação Técnica', totalHours: 15.5, color: 'bg-pink-500', status: 'pausado' },
    { id: 6, name: 'Testes e QA', totalHours: 23.0, color: 'bg-indigo-500', status: 'em-andamento' },
  ]);

  const handleSaveActivity = (activityData: Omit<Activity, 'id' | 'totalHours'>) => {
    if (editingActivity) {
      // Editar atividade existente
      setActivities(prev => prev.map(activity => 
        activity.id === editingActivity.id 
          ? { ...activity, ...activityData }
          : activity
      ));
      setEditingActivity(undefined);
    } else {
      // Criar nova atividade
      const newActivity: Activity = {
        id: Math.max(...activities.map(a => a.id)) + 1,
        totalHours: 0,
        ...activityData,
      };
      setActivities(prev => [...prev, newActivity]);
    }
    setIsFormOpen(false);
  };

  const handleEditActivity = (activity: Activity) => {
    setEditingActivity(activity);
    setIsFormOpen(true);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Atividades</h1>
          <p className="text-muted-foreground">Gerencie seus projetos e atividades</p>
        </div>
        <Button 
          className="bg-gradient-primary hover:opacity-90 shadow-soft"
          onClick={() => setIsFormOpen(true)}
        >
          <Plus className="h-4 w-4 mr-2" />
          Nova Atividade
        </Button>
      </div>

      {/* Activities Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {activities.map((activity) => (
          <Card key={activity.id} className="p-6 bg-gradient-card shadow-card border-0 hover:shadow-elevated transition-all duration-200">
            <div className="space-y-4">
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-3 flex-1 min-w-0">
                  <div className={`${activity.color} p-3 rounded-xl shadow-soft`}>
                    <FolderOpen className="h-6 w-6 text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-lg truncate">{activity.name}</h3>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleEditActivity(activity)}
                  className="h-8 w-8 p-0"
                >
                  <Edit className="h-4 w-4" />
                </Button>
              </div>

              <div className="flex items-center justify-between">
                <Badge className={statusConfig[activity.status].color}>
                  {statusConfig[activity.status].label}
                </Badge>
                <div className="flex items-center space-x-2 text-muted-foreground">
                  <Clock className="h-4 w-4" />
                  <span className="text-sm">{activity.totalHours}h</span>
                </div>
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

      {/* Empty State */}
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
            <Button 
              className="bg-gradient-primary hover:opacity-90 shadow-soft"
              onClick={() => setIsFormOpen(true)}
            >
              <Plus className="h-4 w-4 mr-2" />
              Criar Primeira Atividade
            </Button>
          </div>
        </Card>
      )}

      {/* Activity Form Modal */}
      <ActivityForm
        isOpen={isFormOpen}
        onClose={() => {
          setIsFormOpen(false);
          setEditingActivity(undefined);
        }}
        onSave={handleSaveActivity}
        activity={editingActivity}
      />
    </div>
  );
};
