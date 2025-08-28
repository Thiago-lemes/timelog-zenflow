import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Plus, Target, Calendar, DollarSign, TrendingUp } from 'lucide-react';

export const Goals = () => {
  return (
    <div className="space-y-4 sm:space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 sm:gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent">
            Metas Financeiras
          </h1>
          <p className="text-sm sm:text-base text-muted-foreground">Defina e acompanhe suas metas de economia</p>
        </div>
        <Button className="bg-gradient-primary hover:opacity-90 w-full sm:w-auto">
          <Plus className="h-4 w-4 mr-2" />
          Nova Meta
        </Button>
      </div>

      {/* Resumo das metas */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6">
        <Card className="bg-gradient-card shadow-card border-0">
          <CardContent className="p-6">
            <div className="flex items-center gap-2">
              <Target className="h-8 w-8 text-primary" />
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total de Metas</p>
                <p className="text-2xl font-bold">5</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-card shadow-card border-0">
          <CardContent className="p-6">
            <div className="flex items-center gap-2">
              <TrendingUp className="h-8 w-8 text-success" />
              <div>
                <p className="text-sm font-medium text-muted-foreground">Concluídas</p>
                <p className="text-2xl font-bold">2</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-card shadow-card border-0">
          <CardContent className="p-6">
            <div className="flex items-center gap-2">
              <DollarSign className="h-8 w-8 text-primary" />
              <div>
                <p className="text-sm font-medium text-muted-foreground">Valor Total</p>
                <p className="text-2xl font-bold">R$ 15.000</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-card shadow-card border-0">
          <CardContent className="p-6">
            <div className="flex items-center gap-2">
              <Calendar className="h-8 w-8 text-warning" />
              <div>
                <p className="text-sm font-medium text-muted-foreground">Em Andamento</p>
                <p className="text-2xl font-bold">3</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Lista de metas */}
      <div className="space-y-4">
        <Card className="bg-gradient-card shadow-card border-0">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <Target className="h-5 w-5 text-primary" />
                Reserva de Emergência
              </CardTitle>
              <Badge variant="secondary">Em andamento</Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between text-sm">
              <span>Progresso</span>
              <span>R$ 3.500 / R$ 10.000</span>
            </div>
            <Progress value={35} className="w-full" />
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>Meta: Dezembro 2024</span>
              <span>35% concluído</span>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-card shadow-card border-0">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <Target className="h-5 w-5 text-primary" />
                Viagem Europa
              </CardTitle>
              <Badge variant="secondary">Em andamento</Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between text-sm">
              <span>Progresso</span>
              <span>R$ 1.800 / R$ 5.000</span>
            </div>
            <Progress value={36} className="w-full" />
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>Meta: Junho 2025</span>
              <span>36% concluído</span>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-card shadow-card border-0 opacity-75">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <Target className="h-5 w-5 text-success" />
                Curso Online
              </CardTitle>
              <Badge className="bg-success text-success-foreground">Concluída</Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between text-sm">
              <span>Progresso</span>
              <span>R$ 500 / R$ 500</span>
            </div>
            <Progress value={100} className="w-full" />
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>Concluída em: Outubro 2024</span>
              <span>100% concluído</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Aviso sobre funcionalidade */}
      <Card className="bg-warning/10 border-warning/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-warning-foreground">
            <Target className="h-5 w-5" />
            Funcionalidade em Desenvolvimento
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-warning-foreground">
            Para criar e gerenciar metas financeiras reais com persistência de dados, 
            é necessário conectar ao Supabase primeiro.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};