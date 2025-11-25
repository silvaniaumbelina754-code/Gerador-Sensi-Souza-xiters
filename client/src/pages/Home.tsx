import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { APP_TITLE } from "@/const";
import { Copy, Crosshair, Info, Target, Zap } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

interface SensitivitySettings {
  geral: number;
  pontoVermelho: number;
  mira2x: number;
  mira4x: number;
  miraAWM: number;
  olhadinha: number;
}

const presets: Record<string, SensitivitySettings> = {
  iniciante: {
    geral: 90,
    pontoVermelho: 85,
    mira2x: 80,
    mira4x: 75,
    miraAWM: 50,
    olhadinha: 70,
  },
  balanceado: {
    geral: 120,
    pontoVermelho: 110,
    mira2x: 100,
    mira4x: 90,
    miraAWM: 70,
    olhadinha: 80,
  },
  agressivo: {
    geral: 180,
    pontoVermelho: 165,
    mira2x: 150,
    mira4x: 145,
    miraAWM: 100,
    olhadinha: 90,
  },
  proPlayer: {
    geral: 195,
    pontoVermelho: 190,
    mira2x: 180,
    mira4x: 170,
    miraAWM: 120,
    olhadinha: 100,
  },
};

const sensitivityInfo = [
  {
    name: "Geral",
    key: "geral" as keyof SensitivitySettings,
    description: "Controla a velocidade da câmera quando você está sem mira aberta. Essencial para movimentação e puxar capa.",
    icon: Target,
  },
  {
    name: "Ponto Vermelho",
    key: "pontoVermelho" as keyof SensitivitySettings,
    description: "Controla a velocidade da mira simples (Red Dot). Fundamental em combates de curta e média distância.",
    icon: Crosshair,
  },
  {
    name: "Mira 2x",
    key: "mira2x" as keyof SensitivitySettings,
    description: "Ajusta a velocidade ao usar mira de 2x. Ideal para confrontos de média distância.",
    icon: Crosshair,
  },
  {
    name: "Mira 4x",
    key: "mira4x" as keyof SensitivitySettings,
    description: "Controla a velocidade da mira 4x. Muito usada para tiros de longa distância com mais estabilidade.",
    icon: Crosshair,
  },
  {
    name: "Mira AWM",
    key: "miraAWM" as keyof SensitivitySettings,
    description: "Específica para snipers (AWM, M82B, Kar98k). Ajuda na precisão dos tiros de longo alcance.",
    icon: Zap,
  },
  {
    name: "Olhadinha",
    key: "olhadinha" as keyof SensitivitySettings,
    description: "Ajusta a velocidade ao usar o botão de olhar, permitindo observar sem mover o personagem.",
    icon: Info,
  },
];

export default function Home() {
  const [settings, setSettings] = useState<SensitivitySettings>(presets.balanceado);

  const handleSliderChange = (key: keyof SensitivitySettings, value: number[]) => {
    setSettings((prev) => ({ ...prev, [key]: value[0] }));
  };

  const applyPreset = (presetName: string) => {
    setSettings(presets[presetName]);
    toast.success(`Preset "${presetName.charAt(0).toUpperCase() + presetName.slice(1)}" aplicado!`);
  };

  const copySettings = () => {
    const text = `🎮 Configurações de Sensibilidade Free Fire 🎮

📊 Geral: ${settings.geral}
🔴 Ponto Vermelho: ${settings.pontoVermelho}
🔍 Mira 2x: ${settings.mira2x}
🎯 Mira 4x: ${settings.mira4x}
⚡ Mira AWM: ${settings.miraAWM}
👀 Olhadinha: ${settings.olhadinha}

Gerado em: ${APP_TITLE}`;

    navigator.clipboard.writeText(text);
    toast.success("Configurações copiadas para a área de transferência!");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-background/80">
      {/* Header */}
      <header className="border-b border-border/50 backdrop-blur-sm bg-background/80 sticky top-0 z-50">
        <div className="container py-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center">
              <Target className="w-7 h-7 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
                {APP_TITLE}
              </h1>
              <p className="text-sm text-muted-foreground">Encontre sua sensi perfeita</p>
            </div>
          </div>
        </div>
      </header>

      <main className="container py-12 space-y-12">
        {/* Hero Section */}
        <section className="text-center space-y-4 max-w-3xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight">
            Configure sua <span className="text-primary">Sensibilidade</span> Ideal
          </h2>
          <p className="text-lg text-muted-foreground">
            Ajuste cada parâmetro de sensibilidade do Free Fire e encontre a configuração perfeita para seu estilo de jogo.
            Use os presets ou personalize manualmente.
          </p>
        </section>

        {/* Presets */}
        <section>
          <h3 className="text-2xl font-bold mb-6 text-center">Presets Rápidos</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
            <Button
              variant="outline"
              className="h-auto py-6 flex flex-col gap-2 hover:border-primary hover:bg-primary/10 transition-all"
              onClick={() => applyPreset("iniciante")}
            >
              <Info className="w-6 h-6 text-primary" />
              <span className="font-semibold">Iniciante</span>
              <span className="text-xs text-muted-foreground">Controle e precisão</span>
            </Button>
            <Button
              variant="outline"
              className="h-auto py-6 flex flex-col gap-2 hover:border-primary hover:bg-primary/10 transition-all"
              onClick={() => applyPreset("balanceado")}
            >
              <Target className="w-6 h-6 text-accent" />
              <span className="font-semibold">Balanceado</span>
              <span className="text-xs text-muted-foreground">Equilíbrio ideal</span>
            </Button>
            <Button
              variant="outline"
              className="h-auto py-6 flex flex-col gap-2 hover:border-primary hover:bg-primary/10 transition-all"
              onClick={() => applyPreset("agressivo")}
            >
              <Zap className="w-6 h-6 text-primary" />
              <span className="font-semibold">Agressivo</span>
              <span className="text-xs text-muted-foreground">Alta velocidade</span>
            </Button>
            <Button
              variant="outline"
              className="h-auto py-6 flex flex-col gap-2 hover:border-primary hover:bg-primary/10 transition-all"
              onClick={() => applyPreset("proPlayer")}
            >
              <Crosshair className="w-6 h-6 text-accent" />
              <span className="font-semibold">Pro Player</span>
              <span className="text-xs text-muted-foreground">Máxima agilidade</span>
            </Button>
          </div>
        </section>

        {/* Sensitivity Controls */}
        <section className="max-w-5xl mx-auto">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-2xl font-bold">Ajuste Manual</h3>
            <Button onClick={copySettings} className="gap-2">
              <Copy className="w-4 h-4" />
              Copiar Configurações
            </Button>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {sensitivityInfo.map((info) => {
              const Icon = info.icon;
              return (
                <Card key={info.key} className="bg-card/50 backdrop-blur border-border/50 hover:border-primary/50 transition-all">
                  <CardHeader>
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <Icon className="w-5 h-5 text-primary" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <CardTitle className="text-lg">{info.name}</CardTitle>
                        <CardDescription className="text-sm mt-1">{info.description}</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-muted-foreground">Valor:</span>
                        <span className="text-3xl font-bold text-primary">{settings[info.key]}</span>
                      </div>
                      <Slider
                        value={[settings[info.key]]}
                        onValueChange={(value) => handleSliderChange(info.key, value)}
                        min={1}
                        max={200}
                        step={1}
                        className="cursor-pointer"
                      />
                      <div className="flex justify-between text-xs text-muted-foreground">
                        <span>1 (Lento)</span>
                        <span>200 (Rápido)</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </section>

        {/* Info Section */}
        <section className="max-w-3xl mx-auto">
          <Card className="bg-gradient-to-br from-primary/10 to-accent/10 border-primary/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Info className="w-5 h-5 text-primary" />
                Dicas Importantes
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm text-muted-foreground">
              <p>
                <strong className="text-foreground">• Teste gradualmente:</strong> Não mude todos os valores de uma vez. Ajuste um
                parâmetro por vez e teste em partidas casuais.
              </p>
              <p>
                <strong className="text-foreground">• Dispositivo importa:</strong> A sensibilidade ideal varia de acordo com o
                tamanho da tela e taxa de atualização do seu celular.
              </p>
              <p>
                <strong className="text-foreground">• Estilo de jogo:</strong> Jogadores agressivos preferem sensibilidade alta para
                puxar capa rapidamente. Jogadores mais táticos preferem valores menores para maior precisão.
              </p>
              <p>
                <strong className="text-foreground">• Pratique:</strong> Use o modo treinamento para testar suas configurações antes
                de entrar em partidas ranqueadas.
              </p>
            </CardContent>
          </Card>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-border/50 mt-20">
        <div className="container py-8 text-center text-sm text-muted-foreground">
          <p>Gerador de Sensibilidade Free Fire - Encontre sua sensi perfeita e domine o jogo! 🎮</p>
        </div>
      </footer>
    </div>
  );
}
