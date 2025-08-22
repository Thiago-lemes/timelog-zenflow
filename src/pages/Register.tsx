import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Save, Calendar as CalendarIcon, Clock } from 'lucide-react';
import { useState } from 'react';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';

export const Register = () => {
  const [date, setDate] = useState<Date>(new Date());
  const [hours, setHours] = useState([2]);
  const [activity, setActivity] = useState('');
  const [description, setDescription] = useState('');
  const [nextStep, setNextStep] = useState('');

  // Mock activities
  const activities = [
    { id: '1', name: 'Projeto Frontend React' },
    { id: '2', name: 'Reuniões com Cliente' },
    { id: '3', name: 'Estudos e Capacitação' },
    { id: '4', name: 'Projeto Backend API' },
    { id: '5', name: 'Documentação Técnica' },
    { id: '6', name: 'Testes e QA' },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission here
    console.log({
      activity,
      date,
      hours: hours[0],
      description,
      nextStep,
    });
    // Show success toast or redirect
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">Registrar Trabalho</h1>
        <p className="text-muted-foreground">Adicione um novo registro de atividade</p>
      </div>

      {/* Form */}
      <Card className="p-6 bg-gradient-card shadow-card border-0">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Activity Selection */}
          <div className="space-y-2">
            <Label htmlFor="activity" className="text-sm font-medium">
              Atividade
            </Label>
            <Select value={activity} onValueChange={setActivity} required>
              <SelectTrigger className="bg-background border-border">
                <SelectValue placeholder="Selecione uma atividade" />
              </SelectTrigger>
              <SelectContent>
                {activities.map((act) => (
                  <SelectItem key={act.id} value={act.id}>
                    {act.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Date Selection */}
          <div className="space-y-2">
            <Label className="text-sm font-medium">Data</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-full justify-start text-left font-normal bg-background border-border",
                    !date && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {date ? format(date, "PPP") : <span>Selecione uma data</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={(newDate) => newDate && setDate(newDate)}
                  initialFocus
                  className="pointer-events-auto"
                />
              </PopoverContent>
            </Popover>
          </div>

          {/* Hours Slider */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label className="text-sm font-medium">Horas Trabalhadas</Label>
              <div className="flex items-center space-x-2 bg-primary/10 px-3 py-1 rounded-full">
                <Clock className="h-4 w-4 text-primary" />
                <span className="font-medium text-primary">{hours[0]}h</span>
              </div>
            </div>
            <Slider
              value={hours}
              onValueChange={setHours}
              max={12}
              min={0.5}
              step={0.5}
              className="w-full"
            />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>30min</span>
              <span>12h</span>
            </div>
          </div>

          {/* Time Input Alternative */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="start-time" className="text-sm font-medium">
                Horário Início
              </Label>
              <Input 
                id="start-time"
                type="time" 
                className="bg-background border-border"
                defaultValue="09:00"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="end-time" className="text-sm font-medium">
                Horário Fim
              </Label>
              <Input 
                id="end-time"
                type="time" 
                className="bg-background border-border"
                defaultValue="17:00"
              />
            </div>
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Label htmlFor="description" className="text-sm font-medium">
              O que foi feito
            </Label>
            <Textarea
              id="description"
              placeholder="Descreva as atividades realizadas..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="min-h-[100px] bg-background border-border"
              required
            />
          </div>

          {/* Next Steps */}
          <div className="space-y-2">
            <Label htmlFor="next-step" className="text-sm font-medium">
              Próximo Passo
            </Label>
            <Textarea
              id="next-step"
              placeholder="Descreva os próximos passos ou tarefas pendentes..."
              value={nextStep}
              onChange={(e) => setNextStep(e.target.value)}
              className="min-h-[80px] bg-background border-border"
            />
          </div>

          {/* Submit Button */}
          <Button 
            type="submit" 
            className="w-full bg-gradient-primary hover:opacity-90 shadow-soft"
            size="lg"
          >
            <Save className="h-4 w-4 mr-2" />
            Salvar Registro
          </Button>
        </form>
      </Card>
    </div>
  );
};