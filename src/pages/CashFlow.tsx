import { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Plus, TrendingUp, TrendingDown, DollarSign, Trash2, Filter } from 'lucide-react';
import { TransactionForm, Transaction } from '@/components/forms/TransactionForm';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const initialTransactions: Transaction[] = [
  {
    id: '1',
    type: 'income',
    amount: 1200.00,
    description: 'Freelance Projeto Web',
    category: 'Freelance',
    date: new Date().toISOString().split('T')[0],
    time: '14:30'
  },
  {
    id: '2',
    type: 'expense',
    amount: 89.90,
    description: 'Hospedagem Servidor',
    category: 'Hospedagem',
    date: new Date(Date.now() - 86400000).toISOString().split('T')[0],
    time: '09:15'
  }
];

export const CashFlow = () => {
  const [transactions, setTransactions] = useState<Transaction[]>(initialTransactions);
  const [filterType, setFilterType] = useState<'all' | 'income' | 'expense'>('all');

  const handleAddTransaction = (transactionData: Omit<Transaction, 'id'>) => {
    const newTransaction: Transaction = {
      ...transactionData,
      id: Date.now().toString()
    };
    setTransactions(prev => [newTransaction, ...prev]);
  };

  const handleDeleteTransaction = (id: string) => {
    setTransactions(prev => prev.filter(t => t.id !== id));
  };

  const filteredTransactions = useMemo(() => {
    if (filterType === 'all') return transactions;
    return transactions.filter(t => t.type === filterType);
  }, [transactions, filterType]);

  const { totalIncome, totalExpense, balance } = useMemo(() => {
    const income = transactions
      .filter(t => t.type === 'income')
      .reduce((acc, t) => acc + t.amount, 0);
    
    const expense = transactions
      .filter(t => t.type === 'expense')
      .reduce((acc, t) => acc + t.amount, 0);
    
    return {
      totalIncome: income,
      totalExpense: expense,
      balance: income - expense
    };
  }, [transactions]);

  return (
    <div className="space-y-4 sm:space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 sm:gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent">
            Fluxo de Caixa
          </h1>
          <p className="text-sm sm:text-base text-muted-foreground">Controle suas receitas e despesas</p>
        </div>
        <TransactionForm onAddTransaction={handleAddTransaction}>
          <Button className="bg-gradient-primary hover:opacity-90 w-full sm:w-auto">
            <Plus className="h-4 w-4 mr-2" />
            Nova Transação
          </Button>
        </TransactionForm>
      </div>

      {/* Cards de resumo */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 lg:gap-6">
        <Card className="bg-gradient-card shadow-card border-0">
          <CardContent className="p-4 sm:p-6">
            <div className="flex items-center gap-2 sm:gap-3">
              <TrendingUp className="h-6 w-6 sm:h-8 sm:w-8 text-success" />
              <div>
                <p className="text-xs sm:text-sm font-medium text-muted-foreground">Receitas</p>
                <p className="text-lg sm:text-2xl font-bold text-success">R$ {totalIncome.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-card shadow-card border-0">
          <CardContent className="p-4 sm:p-6">
            <div className="flex items-center gap-2 sm:gap-3">
              <TrendingDown className="h-6 w-6 sm:h-8 sm:w-8 text-destructive" />
              <div>
                <p className="text-xs sm:text-sm font-medium text-muted-foreground">Despesas</p>
                <p className="text-lg sm:text-2xl font-bold text-destructive">R$ {totalExpense.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-card shadow-card border-0 sm:col-span-2 lg:col-span-1">
          <CardContent className="p-4 sm:p-6">
            <div className="flex items-center gap-2 sm:gap-3">
              <DollarSign className="h-6 w-6 sm:h-8 sm:w-8 text-primary" />
              <div>
                <p className="text-xs sm:text-sm font-medium text-muted-foreground">Saldo</p>
                <p className={`text-lg sm:text-2xl font-bold ${balance >= 0 ? 'text-success' : 'text-destructive'}`}>
                  R$ {balance.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filtros */}
      <Card className="bg-gradient-card shadow-card border-0">
        <CardContent className="p-3 sm:p-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4">
            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm font-medium">Filtrar por:</span>
            </div>
            <Select value={filterType} onValueChange={(value: 'all' | 'income' | 'expense') => setFilterType(value)}>
              <SelectTrigger className="w-full sm:w-48">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todas as transações</SelectItem>
                <SelectItem value="income">Receitas</SelectItem>
                <SelectItem value="expense">Despesas</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Lista de transações */}
      <Card className="bg-gradient-card shadow-card border-0">
        <CardHeader>
          <CardTitle className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <span className="text-lg sm:text-xl">Transações Recentes</span>
            <Badge variant="secondary" className="w-fit">
              {filteredTransactions.length} transações
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="p-3 sm:p-6">
          {filteredTransactions.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-muted-foreground">Nenhuma transação encontrada</p>
            </div>
          ) : (
            <div className="space-y-2 sm:space-y-3">
              {filteredTransactions.map((transaction) => (
                <div key={transaction.id} className="flex flex-col sm:flex-row sm:items-center justify-between p-3 sm:p-4 rounded-lg bg-accent/50 hover:bg-accent transition-colors gap-3">
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-1">
                      <h3 className="font-medium text-sm sm:text-base truncate">{transaction.description}</h3>
                      <Badge variant={transaction.type === 'income' ? 'default' : 'destructive'} className="w-fit text-xs">
                        {transaction.type === 'income' ? 'Receita' : 'Despesa'}
                      </Badge>
                    </div>
                    <p className="text-xs sm:text-sm text-muted-foreground">
                      {transaction.category} • {transaction.date} • {transaction.time}
                    </p>
                  </div>
                  <div className="flex items-center justify-between sm:justify-end gap-3">
                    <p className={`font-bold text-base sm:text-lg ${transaction.type === 'income' ? 'text-success' : 'text-destructive'}`}>
                      {transaction.type === 'income' ? '+' : '-'} R$ {transaction.amount.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                    </p>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDeleteTransaction(transaction.id)}
                      className="text-destructive hover:text-destructive hover:bg-destructive/10 h-8 w-8 p-0"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Aviso sobre funcionalidade */}
      <Card className="bg-warning/10 border-warning/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-warning-foreground">
            <DollarSign className="h-4 w-4 sm:h-5 sm:w-5" />
            Funcionalidade Local
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-xs sm:text-sm text-warning-foreground">
            Este sistema de fluxo de caixa está funcionando localmente. Para persistência de dados real e sincronização entre dispositivos, 
            será necessário conectar ao Supabase futuramente.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};