
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Filter, X } from 'lucide-react';
import { ActivityStatus } from '@/components/forms/ActivityForm';

interface DashboardFiltersProps {
  selectedStatus: ActivityStatus | 'todos';
  onStatusChange: (status: ActivityStatus | 'todos') => void;
  onClearFilters: () => void;
}

const statusOptions = [
  { value: 'todos', label: 'Todos os Status', color: 'text-foreground' },
  { value: 'feito', label: 'Feito', color: 'text-green-600' },
  { value: 'em-andamento', label: 'Em Andamento', color: 'text-blue-600' },
  { value: 'impedimento', label: 'Impedimento', color: 'text-red-600' },
  { value: 'estudando', label: 'Estudando', color: 'text-purple-600' },
  { value: 'pausado', label: 'Pausado', color: 'text-yellow-600' },
];

export const DashboardFilters = ({ selectedStatus, onStatusChange, onClearFilters }: DashboardFiltersProps) => {
  const hasActiveFilters = selectedStatus !== 'todos';

  return (
    <div className="flex items-center gap-4 p-4 bg-gradient-card rounded-lg shadow-card border-0">
      <div className="flex items-center gap-2">
        <Filter className="h-4 w-4 text-muted-foreground" />
        <span className="text-sm font-medium">Filtros:</span>
      </div>
      
      <Select value={selectedStatus} onValueChange={onStatusChange}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Status" />
        </SelectTrigger>
        <SelectContent>
          {statusOptions.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              <span className={option.color}>{option.label}</span>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {hasActiveFilters && (
        <Button
          variant="outline"
          size="sm"
          onClick={onClearFilters}
          className="h-8"
        >
          <X className="h-3 w-3 mr-1" />
          Limpar
        </Button>
      )}
    </div>
  );
};
