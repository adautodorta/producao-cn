"use client";

import Image from "next/image";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "./_components/ui/accordion";
import Link from "next/link";
import { Checkbox } from "./_components/ui/checkbox";
import { useEffect, useState } from "react";
import { Button } from "./_components/ui/button";
import { CalendarIcon, MessageCircle, MessageSquareQuote, Trash2 } from "lucide-react";
import LogoCN from "./_assets/logo.png";
import { Dialog, DialogDescription, DialogHeader, DialogContent, DialogFooter, DialogTitle } from "./_components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./_components/ui/select";
import { Calendar } from "./_components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "./_components/ui/popover";
import { format } from "date-fns";
import { cn } from "./_lib/utils";
import { ptBR } from "date-fns/locale";

export default function Home() {
  const [checkedTasks, setCheckedTasks] = useState<{ [key: string]: boolean }>({});
  const [resetKey, setResetKey] = useState(0);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [sectionToClean, setSectionToClean] = useState<'p1-' | 'stage-' | null>(null);
  const [date, setDate] = useState<Date | undefined>(new Date())

  const [formData, setFormData] = useState({
    oferta: '',
    pregador: '',
    tema: '',
    referencia: '',
    versao: '',
    producao: '',
    tipoCulto: '',
    horario: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [id]: value
    }));
  };
  
  const handleShare = () => {
    const tipoCultoTexto = formData.tipoCulto === 'familia' ? 'CULTO DA FAMÍLIA' : 'CULTO BEM MAIS QUE VENCEDORES';
    const dateString = date?.toLocaleDateString('pt-BR') || '';
    
    const message = `*${tipoCultoTexto} - ${dateString} - ${formData.horario}*
  
  *Oferta:* ${formData.oferta}
  *Pregador:* ${formData.pregador}
  *Tema:* ${formData.tema}
  *Referência:* ${formData.referencia}
  *Versão:* ${formData.versao}
  *Produção:* ${formData.producao}`;
  
    const cleanMessage = message.split('\n').map(line => line.trim()).join('\n');
    
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(cleanMessage)}`;
    window.open(whatsappUrl, '_blank');
  };

  const handleClearChecklist = (prefix: 'p1-' | 'stage-') => {
    setSectionToClean(prefix);
    setDialogOpen(true);
  };

  const confirmClear = () => {
    if (!sectionToClean) return;

    const newCheckedTasks = Object.entries(checkedTasks).reduce((acc, [key, value]) => {
      if (!key.startsWith(sectionToClean)) {
        acc[key] = value;
      }
      return acc;
    }, {} as { [key: string]: boolean });

    setCheckedTasks(newCheckedTasks);
    
    const dataToSave = {
      tasks: newCheckedTasks,
      date: new Date().toISOString()
    };
    
    localStorage.setItem('checkedTasks', JSON.stringify(dataToSave));
    setResetKey(prev => prev + 1);
    setDialogOpen(false);
  };

  useEffect(() => {
    const savedTasks = localStorage.getItem('checkedTasks');
    if (savedTasks) {
      try {
        const {tasks, date} = JSON.parse(savedTasks);
        const savedDate = new Date(date);
        const currentDate = new Date();
        
        const isSameDay = savedDate.getDate() === currentDate.getDate() &&
          savedDate.getMonth() === currentDate.getMonth() &&
          savedDate.getFullYear() === currentDate.getFullYear();
        
        if (isSameDay) {
          setCheckedTasks(tasks);
        } else {
          localStorage.removeItem('checkedTasks');
          setCheckedTasks({});
          setResetKey(prev => prev + 1);
        }
      } catch (error) {
        console.error('Erro ao carregar tarefas:', error);
        localStorage.removeItem('checkedTasks');
        setCheckedTasks({});
        setResetKey(prev => prev + 1);
      }
    }
  }, []);

  const handleCheckChange = (taskId: string, checked: boolean) => {
    const newCheckedTasks = { ...checkedTasks, [taskId]: checked };
    setCheckedTasks(newCheckedTasks);
    
    const dataToSave = {
      tasks: newCheckedTasks,
      date: new Date().toISOString()
    };
    
    localStorage.setItem('checkedTasks', JSON.stringify(dataToSave));
  };

  return (
    <div className="overflow-hidden grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center">
        <Image
          src={LogoCN}
          alt="Logo CN Fortaleza"
          width={180}
          height={38}
          priority
        />
        <Accordion className="w-[84vw] max-w-[400px] sm:w-[400px]" type="single" collapsible>
          <AccordionItem value="item-1">
            <AccordionTrigger>Escala Atualizada</AccordionTrigger>
            <AccordionContent>
              <Link href="https://drive.google.com/drive/folders/1UbyfzMrW4EKw9Qd-KZb2ZEIT0n6Fe67j" target="_blank" className="underline">
                Ver escala
              </Link>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger>Tarefas P1</AccordionTrigger>
            <AccordionContent key={`p1-${resetKey}`}>
              <div className="mt-2 flex flex-col text-sm text-start gap-[22px] font-[family-name:var(--font-geist-mono)]">
                <Button 
                  variant="outline" 
                  className="w-full text-red-500 hover:text-red-600 hover:bg-red-50 gap-2"
                  onClick={() => handleClearChecklist('p1-')}
                >
                  <Trash2 size={16} />
                  Limpar checklist
                </Button>
                <div className="flex items-start space-x-2">
                  <Checkbox
                    id="p1-task-1"
                    checked={checkedTasks['p1-task-1']}
                    onCheckedChange={(checked) => handleCheckChange('p1-task-1', checked as boolean)}
                    className="mt-[3px] data-[state=checked]:bg-green-500 data-[state=checked]:border-green-500"
                  />
                  <label
                    htmlFor="p1-task-1"
                    className="text-sm font-medium leading-[19px] peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Quando culto das 08h, organizar mesa do café (montagem da mesa)
                  </label>
                </div>
                <div className="flex items-start space-x-2">
                  <Checkbox
                    id="p1-task-2"
                    checked={checkedTasks['p1-task-2']}
                    onCheckedChange={(checked) => handleCheckChange('p1-task-2', checked as boolean)}
                    className="mt-[3px] data-[state=checked]:bg-green-500 data-[state=checked]:border-green-500"
                  />
                  <label
                    htmlFor="p1-task-2"
                    className="text-sm font-medium leading-[19px] peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Preparar jarra de água com copos
                  </label>
                </div>
                <div className="flex items-start space-x-2">
                  <Checkbox
                    id="p1-task-3"
                    checked={checkedTasks['p1-task-3']}
                    onCheckedChange={(checked) => handleCheckChange('p1-task-3', checked as boolean)}
                    className="mt-[3px] data-[state=checked]:bg-green-500 data-[state=checked]:border-green-500"
                  />
                  <label
                    htmlFor="p1-task-3"
                    className="text-sm font-medium leading-[19px] peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Quando culto das 10h e 17h, perguntar para o líder da banda a quantidade de pessoas para ajuda de custo e depois passar para o líder da diaconia
                  </label>
                </div>
                <div className="flex items-start space-x-2">
                  <Checkbox
                    id="p1-task-4"
                    checked={checkedTasks['p1-task-4']}
                    onCheckedChange={(checked) => handleCheckChange('p1-task-4', checked as boolean)}
                    className="mt-[3px] data-[state=checked]:bg-green-500 data-[state=checked]:border-green-500"
                  />
                  <label
                    htmlFor="p1-task-4"
                    className="text-sm font-medium leading-[19px] peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Quando 2º domingo do mês, pegar castanha e mel
                  </label>
                </div>
                <div className="flex items-start space-x-2">
                  <Checkbox
                    id="p1-task-5"
                    checked={checkedTasks['p1-task-5']}
                    onCheckedChange={(checked) => handleCheckChange('p1-task-5', checked as boolean)}
                    className="mt-[3px] data-[state=checked]:bg-green-500 data-[state=checked]:border-green-500"
                  />
                  <label
                    htmlFor="p1-task-5"
                    className="text-sm font-medium leading-[19px] peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Descobrir quem irá dar a palavra de oferta
                  </label>
                </div>
                <div className="flex items-start space-x-2">
                  <Checkbox
                    id="p1-task-6"
                    checked={checkedTasks['p1-task-6']}
                    onCheckedChange={(checked) => handleCheckChange('p1-task-6', checked as boolean)}
                    className="mt-[3px] data-[state=checked]:bg-green-500 data-[state=checked]:border-green-500"
                  />
                  <label
                    htmlFor="p1-task-6"
                    className="text-sm font-medium leading-[19px] peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Pegar o versículo bíblico com quem irá fazer a palavra de oferta
                  </label>
                </div>
                <div className="flex items-start space-x-2">
                  <Checkbox
                    id="p1-task-7"
                    checked={checkedTasks['p1-task-7']}
                    onCheckedChange={(checked) => handleCheckChange('p1-task-7', checked as boolean)}
                    className="mt-[3px] data-[state=checked]:bg-green-500 data-[state=checked]:border-green-500"
                  />
                  <label
                    htmlFor="p1-task-7"
                    className="text-sm font-medium leading-[19px] peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Preencher formulário de culto e enviar no grupo do whatsapp
                  </label>
                </div>
                <div className="flex items-start space-x-2">
                  <Checkbox
                    id="p1-task-8"
                    checked={checkedTasks['p1-task-8']}
                    onCheckedChange={(checked) => handleCheckChange('p1-task-8', checked as boolean)}
                    className="mt-[3px] data-[state=checked]:bg-green-500 data-[state=checked]:border-green-500"
                  />
                  <label
                    htmlFor="p1-task-8"
                    className="text-sm font-medium leading-[19px] peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Pegar a santa ceia para produção, pregador e banda (todo culto das 15hs tem santa ceia)
                  </label>
                </div>
                <div className="flex items-start space-x-2">
                  <Checkbox
                    id="p1-task-9"
                    checked={checkedTasks['p1-task-9']}
                    onCheckedChange={(checked) => handleCheckChange('p1-task-9', checked as boolean)}
                    className="mt-[3px] data-[state=checked]:bg-green-500 data-[state=checked]:border-green-500"
                  />
                  <label
                    htmlFor="p1-task-9"
                    className="text-sm font-medium leading-[19px] peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Já deixar a ceia do pregador um pouco aberta para facilitar a abertura
                  </label>
                </div>
                <div className="flex items-start space-x-2">
                  <Checkbox
                    id="p1-task-10"
                    checked={checkedTasks['p1-task-10']}
                    onCheckedChange={(checked) => handleCheckChange('p1-task-10', checked as boolean)}
                    className="mt-[3px] data-[state=checked]:bg-green-500 data-[state=checked]:border-green-500"
                  />
                  <label
                    htmlFor="p1-task-10"
                    className="text-sm font-medium leading-[19px] peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Se houver apresentação de crianças, reservar as cadeiras e recepcionar os pais
                  </label>
                </div>
                <div className="flex items-start space-x-2">
                  <Checkbox
                    id="p1-task-11"
                    checked={checkedTasks['p1-task-11']}
                    onCheckedChange={(checked) => handleCheckChange('p1-task-11', checked as boolean)}
                    className="mt-[3px] data-[state=checked]:bg-green-500 data-[state=checked]:border-green-500"
                  />
                  <label
                    htmlFor="p1-task-11"
                    className="text-sm font-medium leading-[19px] peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Quando culto das 08h, remover mesa do café da manhã
                  </label>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3">
            <AccordionTrigger>Tarefas Stage</AccordionTrigger>
            <AccordionContent key={`stage-${resetKey}`}>
              <div className="mt-2 flex flex-col text-sm text-start gap-[22px] font-[family-name:var(--font-geist-mono)]">
                <Button 
                  variant="outline" 
                  className="w-full text-red-500 hover:text-red-600 hover:bg-red-50 gap-2"
                  onClick={() => handleClearChecklist('stage-')}
                >
                  <Trash2 size={16} />
                  Limpar checklist
                </Button>
                <div className="flex items-start space-x-2">
                  <Checkbox
                    id="stage-task-1"
                    checked={checkedTasks['stage-task-1']}
                    onCheckedChange={(checked) => handleCheckChange('stage-task-1', checked as boolean)}
                    className="mt-[3px] data-[state=checked]:bg-green-500 data-[state=checked]:border-green-500"
                  />
                  <label
                    htmlFor="stage-task-1"
                    className="text-sm font-medium leading-[19px] peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Alinhar com P1 sobre checagem de detalhes e informações do culto
                  </label>
                </div>
                <div className="flex items-start space-x-2">
                  <Checkbox
                    id="stage-task-2"
                    checked={checkedTasks['stage-task-2']}
                    onCheckedChange={(checked) => handleCheckChange('stage-task-2', checked as boolean)}
                    className="mt-[3px] data-[state=checked]:bg-green-500 data-[state=checked]:border-green-500"
                  />
                  <label
                    htmlFor="stage-task-2"
                    className="text-sm font-medium leading-[19px] peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Vistoriar backstage e palco
                  </label>
                </div>
                <div className="flex items-start space-x-2">
                  <Checkbox
                    id="stage-task-3"
                    checked={checkedTasks['stage-task-3']}
                    onCheckedChange={(checked) => handleCheckChange('stage-task-3', checked as boolean)}
                    className="mt-[3px] data-[state=checked]:bg-green-500 data-[state=checked]:border-green-500"
                  />
                  <label
                    htmlFor="stage-task-3"
                    className="text-sm font-medium leading-[19px] peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Ligar ar condicionado do backstage
                  </label>
                </div>
                <div className="flex items-start space-x-2">
                  <Checkbox
                    id="stage-task-4"
                    checked={checkedTasks['stage-task-4']}
                    onCheckedChange={(checked) => handleCheckChange('stage-task-4', checked as boolean)}
                    className="mt-[3px] data-[state=checked]:bg-green-500 data-[state=checked]:border-green-500"
                  />
                  <label
                    htmlFor="stage-task-4"
                    className="text-sm font-medium leading-[19px] peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Checar elementos técnicos (microfones, pilhas, etc...)
                  </label>
                </div>
                <div className="flex items-start space-x-2">
                  <Checkbox
                    id="stage-task-5"
                    checked={checkedTasks['stage-task-5']}
                    onCheckedChange={(checked) => handleCheckChange('stage-task-5', checked as boolean)}
                    className="mt-[3px] data-[state=checked]:bg-green-500 data-[state=checked]:border-green-500"
                  />
                  <label
                    htmlFor="stage-task-5"
                    className="text-sm font-medium leading-[19px] peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Pegar o fone/rádio
                  </label>
                </div>
                <div className="flex items-start space-x-2">
                  <Checkbox
                    id="stage-task-6"
                    checked={checkedTasks['stage-task-6']}
                    onCheckedChange={(checked) => handleCheckChange('stage-task-6', checked as boolean)}
                    className="mt-[3px] data-[state=checked]:bg-green-500 data-[state=checked]:border-green-500"
                  />
                  <label
                    htmlFor="stage-task-6"
                    className="text-sm font-medium leading-[19px] peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Se apresentar a equipe do louvor e perguntar se precisa de alguma ajuda
                  </label>
                </div>
                <div className="flex items-start space-x-2">
                  <Checkbox
                    id="stage-task-7"
                    checked={checkedTasks['stage-task-7']}
                    onCheckedChange={(checked) => handleCheckChange('stage-task-7', checked as boolean)}
                    className="mt-[3px] data-[state=checked]:bg-green-500 data-[state=checked]:border-green-500"
                  />
                  <label
                    htmlFor="stage-task-7"
                    className="text-sm font-medium leading-[19px] peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Se apresentar a House e se colocar à disposição para contribuir com eles. 
                  </label>
                </div>
                <div className="flex items-start space-x-2">
                  <Checkbox
                    id="stage-task-8"
                    checked={checkedTasks['stage-task-8']}
                    onCheckedChange={(checked) => handleCheckChange('stage-task-8', checked as boolean)}
                    className="mt-[3px] data-[state=checked]:bg-green-500 data-[state=checked]:border-green-500"
                  />
                  <label
                    htmlFor="stage-task-8"
                    className="text-sm font-medium leading-[19px] peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Se apresentar a mídia, verificar e bater com a mídia elementos gráficos, vídeos,  versículos e 
                    banners.
                  </label>
                </div>
                <div className="flex items-start space-x-2">
                  <Checkbox
                    id="stage-task-9"
                    checked={checkedTasks['stage-task-9']}
                    onCheckedChange={(checked) => handleCheckChange('stage-task-9', checked as boolean)}
                    className="mt-[3px] data-[state=checked]:bg-green-500 data-[state=checked]:border-green-500"
                  />
                  <label
                    htmlFor="stage-task-9"
                    className="text-sm font-medium leading-[19px] peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Limpar as mesinhas e deixar no ponto de uso.
                  </label>
                </div>
                <div className="flex items-start space-x-2">
                  <Checkbox
                    id="stage-task-10"
                    checked={checkedTasks['stage-task-10']}
                    onCheckedChange={(checked) => handleCheckChange('stage-task-10', checked as boolean)}
                    className="mt-[3px] data-[state=checked]:bg-green-500 data-[state=checked]:border-green-500"
                  />
                  <label
                    htmlFor="stage-task-10"
                    className="text-sm font-medium leading-[19px] peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Posicionar o pastor/orador/ para este momento e comunicar a house quem vai entrar e com qual microfone quando estiver faltando 2 minutos para entrar.     
                  </label>
                </div>
                  <div className="flex items-start space-x-2">
                    <Checkbox
                      id="stage-task-11"
                      checked={checkedTasks['stage-task-11']}
                      onCheckedChange={(checked) => handleCheckChange('stage-task-11', checked as boolean)}
                      className="mt-[3px] data-[state=checked]:bg-green-500 data-[state=checked]:border-green-500"
                    />
                    <label
                      htmlFor="stage-task-11"
                      className="text-sm font-medium leading-[19px] peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Entrar com as mesas e água no 3 vídeo do CN news (conferir último vídeo)
                    </label>
                  </div>
                  <div className="flex items-start space-x-2">
                    <Checkbox
                      id="stage-task-12"
                      checked={checkedTasks['stage-task-12']}
                      onCheckedChange={(checked) => handleCheckChange('stage-task-12', checked as boolean)}
                      className="mt-[3px] data-[state=checked]:bg-green-500 data-[state=checked]:border-green-500"
                    />
                    <label
                      htmlFor="stage-task-12"
                      className="text-sm font-medium leading-[19px] peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Conferir instrumentos ou tripes estão na frente do telão e retirar
                    </label>
                  </div>
                  <div className="flex items-start space-x-2">
                    <Checkbox
                      id="stage-task-13"
                      checked={checkedTasks['stage-task-13']}
                      onCheckedChange={(checked) => handleCheckChange('stage-task-13', checked as boolean)}
                      className="mt-[3px] data-[state=checked]:bg-green-500 data-[state=checked]:border-green-500"
                    />
                    <label
                      htmlFor="stage-task-13"
                      className="text-sm font-medium leading-[19px] peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Receber e preparar pastor/ para próximo momento e entregar
                    </label>
                  </div>
                  <div className="flex items-start space-x-2">
                    <Checkbox
                      id="stage-task-14"
                      checked={checkedTasks['stage-task-14']}
                      onCheckedChange={(checked) => handleCheckChange('stage-task-14', checked as boolean)}
                      className="mt-[3px] data-[state=checked]:bg-green-500 data-[state=checked]:border-green-500"
                    />
                    <label
                      htmlFor="stage-task-14"
                      className="text-sm font-medium leading-[19px] peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Faltando 8 min para o final da palavra - Localizar o tecladista e fazê-lo subir ao backstage;
                    </label>
                  </div>
                  <div className="flex items-start space-x-2">
                    <Checkbox
                      id="stage-task-15"
                      checked={checkedTasks['stage-task-15']}
                      onCheckedChange={(checked) => handleCheckChange('stage-task-15', checked as boolean)}
                      className="mt-[3px] data-[state=checked]:bg-green-500 data-[state=checked]:border-green-500"
                    />
                    <label
                      htmlFor="stage-task-15"
                      className="text-sm font-medium leading-[19px] peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Faltando 5 min para o final da palavra - Autorização para entrada do tecladista e início da  
                      atmosfera;
                    </label>
                  </div>
                  <div className="flex items-start space-x-2">
                    <Checkbox
                      id="stage-task-16"
                      checked={checkedTasks['stage-task-16']}
                      onCheckedChange={(checked) => handleCheckChange('stage-task-16', checked as boolean)}
                      className="mt-[3px] data-[state=checked]:bg-green-500 data-[state=checked]:border-green-500"
                    />
                    <label
                      htmlFor="stage-task-16"
                      className="text-sm font-medium leading-[19px] peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Faltando 3 min para o final da palavra - deixar banda posicionada para entrada de todos
                    </label>
                  </div>
                  <div className="flex items-start space-x-2">
                    <Checkbox
                      id="stage-task-17"
                      checked={checkedTasks['stage-task-17']}
                      onCheckedChange={(checked) => handleCheckChange('stage-task-17', checked as boolean)}
                      className="mt-[3px] data-[state=checked]:bg-green-500 data-[state=checked]:border-green-500"
                    />
                    <label
                      htmlFor="stage-task-17"
                      className="text-sm font-medium leading-[19px] peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Avisar P1 e a house para a entrada da banda.
                    </label>
                  </div>
                  <div className="flex items-start space-x-2">
                    <Checkbox
                      id="stage-task-18"
                      checked={checkedTasks['stage-task-18']}
                      onCheckedChange={(checked) => handleCheckChange('stage-task-18', checked as boolean)}
                      className="mt-[3px] data-[state=checked]:bg-green-500 data-[state=checked]:border-green-500"
                    />
                    <label
                      htmlFor="stage-task-18"
                      className="text-sm font-medium leading-[19px] peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Garantir que todos os microfones estejam desligados e guardados;
                    </label>
                  </div>
                  <div className="flex items-start space-x-2">
                    <Checkbox
                      id="stage-task-19"
                      checked={checkedTasks['stage-task-19']}
                      onCheckedChange={(checked) => handleCheckChange('stage-task-19', checked as boolean)}
                      className="mt-[3px] data-[state=checked]:bg-green-500 data-[state=checked]:border-green-500"
                    />
                    <label
                      htmlFor="stage-task-19"
                      className="text-sm font-medium leading-[19px] peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Retirar as mesas
                    </label>
                  </div>
                  <div className="flex items-start space-x-2">
                    <Checkbox
                      id="stage-task-20"
                      checked={checkedTasks['stage-task-20']}
                      onCheckedChange={(checked) => handleCheckChange('stage-task-20', checked as boolean)}
                      className="mt-[3px] data-[state=checked]:bg-green-500 data-[state=checked]:border-green-500"
                    />
                    <label
                      htmlFor="stage-task-20"
                      className="text-sm font-medium leading-[19px] peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Conferir pilhas e baterias e informar a equipe do próximo culto.
                    </label>
                  </div>
                  <div className="flex items-start space-x-2">
                    <Checkbox
                      id="stage-task-21"
                      checked={checkedTasks['stage-task-21']}
                      onCheckedChange={(checked) => handleCheckChange('stage-task-21', checked as boolean)}
                      className="mt-[3px] data-[state=checked]:bg-green-500 data-[state=checked]:border-green-500"
                    />
                    <label
                      htmlFor="stage-task-21"
                      className="text-sm font-medium leading-[19px] peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Garantir que a produção  permaneça por pelo menos 10 minutos após o  fim do culto, controlando e observando o fluxo de saída e a chegada da próxima equipe. 
                    </label>
                  </div>
                  <div className="flex items-start space-x-2">
                    <Checkbox
                      id="stage-task-22"
                      checked={checkedTasks['stage-task-22']}
                      onCheckedChange={(checked) => handleCheckChange('stage-task-22', checked as boolean)}
                      className="mt-[3px] data-[state=checked]:bg-green-500 data-[state=checked]:border-green-500"
                    />
                    <label
                      htmlFor="stage-task-22"
                      className="text-sm font-medium leading-[19px] peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Devolver ou entregar em mãos a próxima equipe o Rádio/Phone desligado.
                    </label>
                  </div>
              </div>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-4">
            <AccordionTrigger>Formulário do culto</AccordionTrigger>
            <AccordionContent>
              <div className="mt-2 flex flex-col gap-4">
                <div className="space-y-2">
                  <label htmlFor="tipoCulto" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                    Tipo de Culto
                  </label>
                  <Select
                    value={formData.tipoCulto}
                    onValueChange={(value) => setFormData(prev => ({ ...prev, tipoCulto: value }))}
                  >
                    <SelectTrigger className="w-full focus:outline-none focus:ring-0 focus:ring-offset-0">
                      <SelectValue placeholder="Selecione o tipo de culto" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="familia">Culto da Família</SelectItem>
                      <SelectItem value="vencedores">Culto Bem Mais que Vencedores</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <label htmlFor="tipoCulto" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                    Data
                  </label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-full justify-start text-left font-normal",
                          !date && "text-muted-foreground"
                        )}
                      >
                        {date ? (
                          format(date, "PPP", { locale: ptBR })
                        ) : (
                          <span>Selecione uma data</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={date}
                        onSelect={setDate}
                        initialFocus
                        locale={ptBR}
                      />
                    </PopoverContent>
                  </Popover>
                </div>
                <div className="space-y-2">
                  <label htmlFor="tipoCulto" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                    Horário
                  </label>
                  <Select
                    value={formData.horario}
                    onValueChange={(value) => setFormData(prev => ({ ...prev, horario: value }))}
                  >
                    <SelectTrigger className="w-full focus:outline-none focus:ring-0 focus:ring-offset-0">
                      <SelectValue placeholder="Selecione o horário do culto" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="08h">08h</SelectItem>
                      <SelectItem value="10h">10h</SelectItem>
                      <SelectItem value="15h">15h</SelectItem>
                      <SelectItem value="17h">17h</SelectItem>
                      <SelectItem value="19h">19h</SelectItem>
                      <SelectItem value="19h30">19h30</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <label htmlFor="oferta" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                    Oferta
                  </label>
                  <input
                    type="text"
                    id="oferta"
                    value={formData.oferta}
                    onChange={handleInputChange}
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus:bg-accent disabled:cursor-not-allowed disabled:opacity-50"
                    placeholder="Nome de quem fará a oferta"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="pregador" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                    Pregador
                  </label>
                  <input
                    type="text"
                    id="pregador"
                    value={formData.pregador}
                    onChange={handleInputChange}
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus:bg-accent disabled:cursor-not-allowed disabled:opacity-50"
                    placeholder="Nome do pregador"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="tema" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                    Tema da palavra
                  </label>
                  <input
                    type="text"
                    id="tema"
                    value={formData.tema}
                    onChange={handleInputChange}
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus:bg-accent disabled:cursor-not-allowed disabled:opacity-50"
                    placeholder="Tema da pregação"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="referencia" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                    Referência
                  </label>
                  <input
                    type="text"
                    id="referencia"
                    value={formData.referencia}
                    onChange={handleInputChange}
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus:bg-accent disabled:cursor-not-allowed disabled:opacity-50"
                    placeholder="Ex: João 3:16"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="versao" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                    Versão
                  </label>
                  <input
                    type="versao"
                    id="versao"
                    value={formData.versao}
                    onChange={handleInputChange}
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus:bg-accent disabled:cursor-not-allowed disabled:opacity-50"
                    placeholder="Ex: NVI"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="producao" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                    Produção
                  </label>
                  <input
                    type="text"
                    id="producao"
                    value={formData.producao}
                    onChange={handleInputChange}
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus:bg-accent disabled:cursor-not-allowed disabled:opacity-50"
                    placeholder="Nome da produção"
                  />
                </div>

                <Button 
                  className="w-full mt-4 gap-2"
                  onClick={handleShare}
                >
                  <MessageSquareQuote size={16} />
                  Compartilhar no WhatsApp
                </Button>
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>

        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Limpar checklist</DialogTitle>
              <DialogDescription>
                Tem certeza que deseja limpar todas as tarefas desta seção? Esta ação não pode ser desfeita.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button variant="outline" onClick={() => setDialogOpen(false)}>
                Cancelar
              </Button>
              <Button variant="destructive" onClick={confirmClear}>
                Limpar
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        <div className="flex gap-4 items-center flex-col sm:flex-row">
          <Button className="w-[38vw] max-w-[192px] sm:w-[192px]">
            <Link href="https://wa.me/5585999103263" className="flex items-center gap-2" target="_blank">
              <MessageCircle />
              Ariadna
            </Link>
          </Button>
          <Button className="w-[38vw] max-w-[192px] sm:w-[192px]" variant="outline">
            <Link href="https://wa.me/5585994319528" className="flex items-center gap-2" target="_blank">
              <MessageCircle />
              Jaque
            </Link>
          </Button>
        </div>
      </main>
    </div>
  );
}
