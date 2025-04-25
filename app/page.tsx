"use client";

import Image from "next/image";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "./_components/ui/accordion";
import Link from "next/link";
import { Checkbox } from "./_components/ui/checkbox";
import { useEffect, useState } from "react";
import { Button } from "./_components/ui/button";
import { MessageCircle } from "lucide-react";
import LogoCN from "./_assets/logo.png";

export default function Home() {
  const [checkedTasks, setCheckedTasks] = useState<{ [key: string]: boolean }>({});

  useEffect(() => {
    const savedTasks = localStorage.getItem('checkedTasks');
    if (savedTasks) {
      setCheckedTasks(JSON.parse(savedTasks));
    }
  }, []);

  const handleCheckChange = (taskId: string, checked: boolean) => {
    const newCheckedTasks = { ...checkedTasks, [taskId]: checked };
    setCheckedTasks(newCheckedTasks);
    localStorage.setItem('checkedTasks', JSON.stringify(newCheckedTasks));
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
            <AccordionTrigger>Escala Março-Abril</AccordionTrigger>
            <AccordionContent>
              <Link href="https://drive.google.com/drive/folders/1UbyfzMrW4EKw9Qd-KZb2ZEIT0n6Fe67j" target="_blank" className="underline">
                Ver escala
              </Link>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger>Tarefas P1</AccordionTrigger>
            <AccordionContent>
              <div className="flex flex-col gap-2 text-sm text-start font-[family-name:var(--font-geist-mono)]">
                <div className="flex items-start space-x-2">
                  <Checkbox
                    id="task-1"
                    checked={checkedTasks['task-1']}
                    onCheckedChange={(checked) => handleCheckChange('task-1', checked as boolean)}
                    className="mt-[3px] data-[state=checked]:bg-green-500 data-[state=checked]:border-green-500"
                  />
                  <label
                    htmlFor="task-1"
                    className="text-sm font-medium leading-[19px] peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Quando culto das 08h, organizar mesa do café (montagem da mesa)
                  </label>
                </div>
                <div className="flex items-start space-x-2">
                  <Checkbox
                    id="task-2"
                    checked={checkedTasks['task-2']}
                    onCheckedChange={(checked) => handleCheckChange('task-2', checked as boolean)}
                    className="mt-[3px] data-[state=checked]:bg-green-500 data-[state=checked]:border-green-500"
                  />
                  <label
                    htmlFor="task-2"
                    className="text-sm font-medium leading-[19px] peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Preparar jarra de água com copos
                  </label>
                </div>
                <div className="flex items-start space-x-2">
                  <Checkbox
                    id="task-3"
                    checked={checkedTasks['task-3']}
                    onCheckedChange={(checked) => handleCheckChange('task-3', checked as boolean)}
                    className="mt-[3px] data-[state=checked]:bg-green-500 data-[state=checked]:border-green-500"
                  />
                  <label
                    htmlFor="task-3"
                    className="text-sm font-medium leading-[19px] peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Quando culto das 10h e 17h, ajuda de custo do louvor (perguntar para o líder da banda a quantidade de louvores e depois passar para o líder da diaconia)
                  </label>
                </div>
                <div className="flex items-start space-x-2">
                  <Checkbox
                    id="task-4"
                    checked={checkedTasks['task-4']}
                    onCheckedChange={(checked) => handleCheckChange('task-4', checked as boolean)}
                    className="mt-[3px] data-[state=checked]:bg-green-500 data-[state=checked]:border-green-500"
                  />
                  <label
                    htmlFor="task-4"
                    className="text-sm font-medium leading-[19px] peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Quando 2º e 4º domingo do mês, pegar castanha e mel
                  </label>
                </div>
                <div className="flex items-start space-x-2">
                  <Checkbox
                    id="task-5"
                    checked={checkedTasks['task-5']}
                    onCheckedChange={(checked) => handleCheckChange('task-5', checked as boolean)}
                    className="mt-[3px] data-[state=checked]:bg-green-500 data-[state=checked]:border-green-500"
                  />
                  <label
                    htmlFor="task-5"
                    className="text-sm font-medium leading-[19px] peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Descobrir quem irá dar a palavra de oferta
                  </label>
                </div>
                <div className="flex items-start space-x-2">
                  <Checkbox
                    id="task-6"
                    checked={checkedTasks['task-6']}
                    onCheckedChange={(checked) => handleCheckChange('task-6', checked as boolean)}
                    className="mt-[3px] data-[state=checked]:bg-green-500 data-[state=checked]:border-green-500"
                  />
                  <label
                    htmlFor="task-6"
                    className="text-sm font-medium leading-[19px] peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Pegar o versículo bíblico com quem irá fazer a palavra de oferta
                  </label>
                </div>
                <div className="flex items-start space-x-2">
                  <Checkbox
                    id="task-7"
                    checked={checkedTasks['task-7']}
                    onCheckedChange={(checked) => handleCheckChange('task-7', checked as boolean)}
                    className="mt-[3px] data-[state=checked]:bg-green-500 data-[state=checked]:border-green-500"
                  />
                  <label
                    htmlFor="task-7"
                    className="text-sm font-medium leading-[19px] peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Preencher formulário de culto e enviar no grupo do whatsapp
                  </label>
                </div>
                <div className="flex items-start space-x-2">
                  <Checkbox
                    id="task-8"
                    checked={checkedTasks['task-8']}
                    onCheckedChange={(checked) => handleCheckChange('task-8', checked as boolean)}
                    className="mt-[3px] data-[state=checked]:bg-green-500 data-[state=checked]:border-green-500"
                  />
                  <label
                    htmlFor="task-8"
                    className="text-sm font-medium leading-[19px] peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Pegar a santa ceia para produção, pregador e banda (todo culto das 15hs tem santa ceia)
                  </label>
                </div>
                <div className="flex items-start space-x-2">
                  <Checkbox
                    id="task-9"
                    checked={checkedTasks['task-9']}
                    onCheckedChange={(checked) => handleCheckChange('task-9', checked as boolean)}
                    className="mt-[3px] data-[state=checked]:bg-green-500 data-[state=checked]:border-green-500"
                  />
                  <label
                    htmlFor="task-9"
                    className="text-sm font-medium leading-[19px] peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Já deixar a ceia do pregador um pouco aberta para facilitar a abertura
                  </label>
                </div>
                <div className="flex items-start space-x-2">
                  <Checkbox
                    id="task-10"
                    checked={checkedTasks['task-10']}
                    onCheckedChange={(checked) => handleCheckChange('task-10', checked as boolean)}
                    className="mt-[3px] data-[state=checked]:bg-green-500 data-[state=checked]:border-green-500"
                  />
                  <label
                    htmlFor="task-10"
                    className="text-sm font-medium leading-[19px] peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Se houver apresentação de crianças, reservar as cadeiras e recepcionar os pais
                  </label>
                </div>
                <div className="flex items-start space-x-2">
                  <Checkbox
                    id="task-11"
                    checked={checkedTasks['task-11']}
                    onCheckedChange={(checked) => handleCheckChange('task-11', checked as boolean)}
                    className="mt-[3px] data-[state=checked]:bg-green-500 data-[state=checked]:border-green-500"
                  />
                  <label
                    htmlFor="task-11"
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
            <AccordionContent>
              <div className="flex flex-col gap-2 text-sm text-start font-[family-name:var(--font-geist-mono)]">
                <div className="flex items-start space-x-2">
                  <Checkbox
                    id="task-1"
                    checked={checkedTasks['task-1']}
                    onCheckedChange={(checked) => handleCheckChange('task-1', checked as boolean)}
                    className="mt-[3px] data-[state=checked]:bg-green-500 data-[state=checked]:border-green-500"
                  />
                  <label
                    htmlFor="task-1"
                    className="text-sm font-medium leading-[19px] peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Alinhar com P1 sobre checagem de detalhes e informações do culto
                  </label>
                </div>
                <div className="flex items-start space-x-2">
                  <Checkbox
                    id="task-2"
                    checked={checkedTasks['task-2']}
                    onCheckedChange={(checked) => handleCheckChange('task-2', checked as boolean)}
                    className="mt-[3px] data-[state=checked]:bg-green-500 data-[state=checked]:border-green-500"
                  />
                  <label
                    htmlFor="task-2"
                    className="text-sm font-medium leading-[19px] peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Vistoriar backstage e palco
                  </label>
                </div>
                <div className="flex items-start space-x-2">
                  <Checkbox
                    id="task-3"
                    checked={checkedTasks['task-3']}
                    onCheckedChange={(checked) => handleCheckChange('task-3', checked as boolean)}
                    className="mt-[3px] data-[state=checked]:bg-green-500 data-[state=checked]:border-green-500"
                  />
                  <label
                    htmlFor="task-3"
                    className="text-sm font-medium leading-[19px] peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Ligar ar condicionado do backstage
                  </label>
                </div>
                <div className="flex items-start space-x-2">
                  <Checkbox
                    id="task-4"
                    checked={checkedTasks['task-4']}
                    onCheckedChange={(checked) => handleCheckChange('task-4', checked as boolean)}
                    className="mt-[3px] data-[state=checked]:bg-green-500 data-[state=checked]:border-green-500"
                  />
                  <label
                    htmlFor="task-4"
                    className="text-sm font-medium leading-[19px] peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Checar elementos técnicos (microfones, pilhas, etc...)
                  </label>
                </div>
                <div className="flex items-start space-x-2">
                  <Checkbox
                    id="task-5"
                    checked={checkedTasks['task-5']}
                    onCheckedChange={(checked) => handleCheckChange('task-5', checked as boolean)}
                    className="mt-[3px] data-[state=checked]:bg-green-500 data-[state=checked]:border-green-500"
                  />
                  <label
                    htmlFor="task-5"
                    className="text-sm font-medium leading-[19px] peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Pegar o fone/rádio
                  </label>
                </div>
                <div className="flex items-start space-x-2">
                  <Checkbox
                    id="task-6"
                    checked={checkedTasks['task-6']}
                    onCheckedChange={(checked) => handleCheckChange('task-6', checked as boolean)}
                    className="mt-[3px] data-[state=checked]:bg-green-500 data-[state=checked]:border-green-500"
                  />
                  <label
                    htmlFor="task-6"
                    className="text-sm font-medium leading-[19px] peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Se apresentar a equipe do louvor e perguntar se precisa de alguma ajuda
                  </label>
                </div>
                <div className="flex items-start space-x-2">
                  <Checkbox
                    id="task-7"
                    checked={checkedTasks['task-7']}
                    onCheckedChange={(checked) => handleCheckChange('task-7', checked as boolean)}
                    className="mt-[3px] data-[state=checked]:bg-green-500 data-[state=checked]:border-green-500"
                  />
                  <label
                    htmlFor="task-7"
                    className="text-sm font-medium leading-[19px] peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Se apresentar a House e se colocar à disposição para contribuir com eles. 
                  </label>
                </div>
                <div className="flex items-start space-x-2">
                  <Checkbox
                    id="task-8"
                    checked={checkedTasks['task-8']}
                    onCheckedChange={(checked) => handleCheckChange('task-8', checked as boolean)}
                    className="mt-[3px] data-[state=checked]:bg-green-500 data-[state=checked]:border-green-500"
                  />
                  <label
                    htmlFor="task-8"
                    className="text-sm font-medium leading-[19px] peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Se apresentar a mídia, verificar e bater com a mídia elementos gráficos, vídeos,  versículos e 
                    banners.
                  </label>
                </div>
                <div className="flex items-start space-x-2">
                  <Checkbox
                    id="task-9"
                    checked={checkedTasks['task-9']}
                    onCheckedChange={(checked) => handleCheckChange('task-9', checked as boolean)}
                    className="mt-[3px] data-[state=checked]:bg-green-500 data-[state=checked]:border-green-500"
                  />
                  <label
                    htmlFor="task-9"
                    className="text-sm font-medium leading-[19px] peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Limpar as mesinhas e deixar no ponto de uso.
                  </label>
                </div>
                <div className="flex items-start space-x-2">
                  <Checkbox
                    id="task-10"
                    checked={checkedTasks['task-10']}
                    onCheckedChange={(checked) => handleCheckChange('task-10', checked as boolean)}
                    className="mt-[3px] data-[state=checked]:bg-green-500 data-[state=checked]:border-green-500"
                  />
                  <label
                    htmlFor="task-10"
                    className="text-sm font-medium leading-[19px] peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Posicionar o pastor/orador/ para este momento e comunicar a house quem vai entrar e com qual microfone quando estiver faltando 2 minutos para entrar.     
                  </label>
                </div>
                  <div className="flex items-start space-x-2">
                    <Checkbox
                      id="task-11"
                      checked={checkedTasks['task-11']}
                      onCheckedChange={(checked) => handleCheckChange('task-11', checked as boolean)}
                      className="mt-[3px] data-[state=checked]:bg-green-500 data-[state=checked]:border-green-500"
                    />
                    <label
                      htmlFor="task-11"
                      className="text-sm font-medium leading-[19px] peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Entrar com as mesas e água no 3 vídeo do CN news (conferir último vídeo)
                    </label>
                  </div>
                  <div className="flex items-start space-x-2">
                    <Checkbox
                      id="task-12"
                      checked={checkedTasks['task-12']}
                      onCheckedChange={(checked) => handleCheckChange('task-12', checked as boolean)}
                      className="mt-[3px] data-[state=checked]:bg-green-500 data-[state=checked]:border-green-500"
                    />
                    <label
                      htmlFor="task-12"
                      className="text-sm font-medium leading-[19px] peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Conferir instrumentos ou tripes estão na frente do telão e retirar
                    </label>
                  </div>
                  <div className="flex items-start space-x-2">
                    <Checkbox
                      id="task-13"
                      checked={checkedTasks['task-13']}
                      onCheckedChange={(checked) => handleCheckChange('task-13', checked as boolean)}
                      className="mt-[3px] data-[state=checked]:bg-green-500 data-[state=checked]:border-green-500"
                    />
                    <label
                      htmlFor="task-13"
                      className="text-sm font-medium leading-[19px] peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Receber e preparar pastor/ para próximo momento e entregar
                    </label>
                  </div>
                  <div className="flex items-start space-x-2">
                    <Checkbox
                      id="task-14"
                      checked={checkedTasks['task-14']}
                      onCheckedChange={(checked) => handleCheckChange('task-14', checked as boolean)}
                      className="mt-[3px] data-[state=checked]:bg-green-500 data-[state=checked]:border-green-500"
                    />
                    <label
                      htmlFor="task-14"
                      className="text-sm font-medium leading-[19px] peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Faltando 8 min para o final da palavra - Localizar o tecladista e fazê-lo subir ao backstage;
                    </label>
                  </div>
                  <div className="flex items-start space-x-2">
                    <Checkbox
                      id="task-15"
                      checked={checkedTasks['task-15']}
                      onCheckedChange={(checked) => handleCheckChange('task-15', checked as boolean)}
                      className="mt-[3px] data-[state=checked]:bg-green-500 data-[state=checked]:border-green-500"
                    />
                    <label
                      htmlFor="task-15"
                      className="text-sm font-medium leading-[19px] peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Faltando 5 min para o final da palavra - Autorização para entrada do tecladista e início da  
                      atmosfera;
                    </label>
                  </div>
                  <div className="flex items-start space-x-2">
                    <Checkbox
                      id="task-16"
                      checked={checkedTasks['task-16']}
                      onCheckedChange={(checked) => handleCheckChange('task-16', checked as boolean)}
                      className="mt-[3px] data-[state=checked]:bg-green-500 data-[state=checked]:border-green-500"
                    />
                    <label
                      htmlFor="task-16"
                      className="text-sm font-medium leading-[19px] peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Faltando 3 min para o final da palavra - deixar banda posicionada para entrada de todos
                    </label>
                  </div>
                  <div className="flex items-start space-x-2">
                    <Checkbox
                      id="task-17"
                      checked={checkedTasks['task-17']}
                      onCheckedChange={(checked) => handleCheckChange('task-17', checked as boolean)}
                      className="mt-[3px] data-[state=checked]:bg-green-500 data-[state=checked]:border-green-500"
                    />
                    <label
                      htmlFor="task-17"
                      className="text-sm font-medium leading-[19px] peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Avisar P1 e a house para a entrada da banda.
                    </label>
                  </div>
                  <div className="flex items-start space-x-2">
                    <Checkbox
                      id="task-18"
                      checked={checkedTasks['task-18']}
                      onCheckedChange={(checked) => handleCheckChange('task-18', checked as boolean)}
                      className="mt-[3px] data-[state=checked]:bg-green-500 data-[state=checked]:border-green-500"
                    />
                    <label
                      htmlFor="task-18"
                      className="text-sm font-medium leading-[19px] peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Garantir que todos os microfones estejam desligados e guardados;
                    </label>
                  </div>
                  <div className="flex items-start space-x-2">
                    <Checkbox
                      id="task-19"
                      checked={checkedTasks['task-19']}
                      onCheckedChange={(checked) => handleCheckChange('task-19', checked as boolean)}
                      className="mt-[3px] data-[state=checked]:bg-green-500 data-[state=checked]:border-green-500"
                    />
                    <label
                      htmlFor="task-19"
                      className="text-sm font-medium leading-[19px] peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Retirar as mesas
                    </label>
                  </div>
                  <div className="flex items-start space-x-2">
                    <Checkbox
                      id="task-20"
                      checked={checkedTasks['task-20']}
                      onCheckedChange={(checked) => handleCheckChange('task-20', checked as boolean)}
                      className="mt-[3px] data-[state=checked]:bg-green-500 data-[state=checked]:border-green-500"
                    />
                    <label
                      htmlFor="task-20"
                      className="text-sm font-medium leading-[19px] peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Conferir pilhas e baterias e informar a equipe do próximo culto.
                    </label>
                  </div>
                  <div className="flex items-start space-x-2">
                    <Checkbox
                      id="task-21"
                      checked={checkedTasks['task-21']}
                      onCheckedChange={(checked) => handleCheckChange('task-21', checked as boolean)}
                      className="mt-[3px] data-[state=checked]:bg-green-500 data-[state=checked]:border-green-500"
                    />
                    <label
                      htmlFor="task-21"
                      className="text-sm font-medium leading-[19px] peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Garantir que a produção  permaneça por pelo menos 10 minutos após o  fim do culto, controlando e observando o fluxo de saída e a chegada da próxima equipe. 
                    </label>
                  </div>
                  <div className="flex items-start space-x-2">
                    <Checkbox
                      id="task-22"
                      checked={checkedTasks['task-22']}
                      onCheckedChange={(checked) => handleCheckChange('task-22', checked as boolean)}
                      className="mt-[3px] data-[state=checked]:bg-green-500 data-[state=checked]:border-green-500"
                    />
                    <label
                      htmlFor="task-22"
                      className="text-sm font-medium leading-[19px] peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Devolver ou entregar em mãos a próxima equipe o Rádio/Phone desligado.
                    </label>
                  </div>
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
        {/* <ol className="list-inside list-decimal text-sm text-center sm:text-left font-[family-name:var(--font-geist-mono)]">
          <li className="mb-2">
            Get started by editing{" "}
            <code className="bg-black/[.05] dark:bg-white/[.06] px-1 py-0.5 rounded font-semibold">
              app/page.tsx
            </code>
            .
          </li>
          <li>Save and see your changes instantly.</li>
        </ol> */}

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
      {/* <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="https://nextjs.org/icons/file.svg"
            alt="File icon"
            width={16}
            height={16}
          />
          Learn
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="https://nextjs.org/icons/window.svg"
            alt="Window icon"
            width={16}
            height={16}
          />
          Examples
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://nextjs.org?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="https://nextjs.org/icons/globe.svg"
            alt="Globe icon"
            width={16}
            height={16}
          />
          Go to nextjs.org →
        </a>
      </footer> */}
    </div>
  );
}
