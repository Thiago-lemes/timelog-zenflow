import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Plus, TrendingUp, TrendingDown, DollarSign, Target } from 'lucide-react';

export const CashFlow = () => {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent">
            Fluxo de Caixa
          </h1>
          <p className="text-muted-foreground">Gerencie suas finanças, metas e orçamento</p>
        </div>
        <Button className="bg-gradient-primary hover:opacity-90">
          <Plus className="h-4 w-4 mr-2" />
          Nova Transação
        </Button>
      </div>

      {/* Cards de resumo */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-gradient-card shadow-card border-0">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Receitas</CardTitle>
            <TrendingUp className="h-4 w-4 text-success" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-success">+R$ 5.420,00</div>
            <p className="text-xs text-muted-foreground">Este mês</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-card shadow-card border-0">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Despesas</CardTitle>
            <TrendingDown className="h-4 w-4 text-destructive" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-destructive">-R$ 2.850,00</div>
            <p className="text-xs text-muted-foreground">Este mês</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-card shadow-card border-0">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Saldo</CardTitle>
            <DollarSign className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">R$ 2.570,00</div>
            <p className="text-xs text-muted-foreground">Disponível</p>
          </CardContent>
        </Card>
      </div>

      {/* Transações recentes */}
      <Card className="bg-gradient-card shadow-card border-0">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            Transações Recentes
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 rounded-lg bg-primary/5">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-success"></div>
                <div>
                  <p className="font-medium">Freelance Projeto Web</p>
                  <p className="text-sm text-muted-foreground">Hoje, 14:30</p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-medium text-success">+R$ 1.200,00</p>
                <Badge variant="secondary" className="text-xs">Receita</Badge>
              </div>
            </div>

            <div className="flex items-center justify-between p-4 rounded-lg bg-primary/5">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-destructive"></div>
                <div>
                  <p className="font-medium">Hospedagem Servidor</p>
                  <p className="text-sm text-muted-foreground">Ontem, 09:15</p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-medium text-destructive">-R$ 89,90</p>
                <Badge variant="outline" className="text-xs">Despesa</Badge>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

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
            Para implementar o sistema completo de fluxo de caixa com armazenamento de dados, 
            criação de metas e controle de dívidas, é necessário conectar ao Supabase primeiro.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};