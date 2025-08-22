
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';

export type ActivityStatus = 'feito' | 'em-andamento' | 'impedimento' | 'estudando' | 'pausado';

export interface Activity {
  id: number;
  name: string;
  totalHours: number;
  color: string;
  status: ActivityStatus;
}

interface ActivityFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (activity: Omit<Activity, 'id' | 'totalHours'>) => void;
  activity?: Activity;
}

const statusOptions: { value: ActivityStatus; label: string; color: string }[] = [
  { value: 'feito', label: 'Feito', color: 'text-green-600' },
  { value: 'em-andamento', label: 'Em Andamento', color: 'text-blue-600' },
  { value: 'impedimento', label: 'Impedimento', color: 'text-red-600' },
  { value: 'estudando', label: 'Estudando', color: 'text-purple-600' },
  { value: 'pausado', label: 'Pausado', color: 'text-yellow-600' },
];

const colorOptions = [
  'bg-blue-500',
  'bg-green-500',
  'bg-purple-500',
  'bg-orange-500',
  'bg-pink-500',
  'bg-indigo-500',
  'bg-red-500',
  'bg-teal-500',
];

export const ActivityForm = ({ isOpen, onClose, onSave, activity }: ActivityFormProps) => {
  const [name, setName] = useState(activity?.name || '');
  const [status, setStatus] = useState<ActivityStatus>(activity?.status || 'em-andamento');
  const [color, setColor] = useState(activity?.color || 'bg-blue-500');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim()) {
      onSave({ name: name.trim(), status, color });
      handleClose();
    }
  };

  const handleClose = () => {
    setName('');
    setStatus('em-andamento');
    setColor('bg-blue-500');
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>
            {activity ? 'Editar Atividade' : 'Nova Atividade'}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Nome da Atividade</Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Digite o nome da atividade"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="status">Status</Label>
            <Select value={status} onValueChange={(value: ActivityStatus) => setStatus(value)}>
              <SelectTrigger>
                <SelectValue placeholder="Selecione o status" />
              </SelectTrigger>
              <SelectContent>
                {statusOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    <span className={option.color}>{option.label}</span>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Cor</Label>
            <div className="flex flex-wrap gap-2">
              {colorOptions.map((colorOption) => (
                <button
                  key={colorOption}
                  type="button"
                  className={`w-8 h-8 rounded-full ${colorOption} ${
                    color === colorOption ? 'ring-2 ring-primary ring-offset-2' : ''
                  }`}
                  onClick={() => setColor(colorOption)}
                />
              ))}
            </div>
          </div>

          <div className="flex justify-end space-x-2 pt-4">
            <Button type="button" variant="outline" onClick={handleClose}>
              Cancelar
            </Button>
            <Button type="submit">
              {activity ? 'Salvar' : 'Criar Atividade'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
