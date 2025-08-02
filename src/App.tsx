import { useState, useMemo } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { EstablishmentList } from "@/components/EstablishmentList";
import { Dashboard } from "@/components/Dashboard";
import { UrlAnalyticsDashboard } from "@/components/UrlAnalyticsDashboard";
import { analyzeData } from "@/utils/dataAnalysis";
import type { Establishment } from "@/types/establishment";

// Import data
import advogadosData from "@/data/advohado_trabalhista_sp.json";
import crossfitData from "@/data/crossfit_sp.json";
import dentistaData from "@/data/dentista_sp.json";
import oftalmoData from "@/data/oftalmo_sp.json";
import pilatesData from "@/data/pilates_sp.json";
import yogaData from "@/data/yoga_sp.json";

function App() {
  const [activeTab, setActiveTab] = useState("dashboard");

  // Combine all data
  const allEstablishments = useMemo(() => [
    ...advogadosData,
    ...crossfitData,
    ...dentistaData,
    ...oftalmoData,
    ...pilatesData,
    ...yogaData
  ] as Establishment[], []);

  // Calculate statistics
  const statistics = useMemo(() => analyzeData(allEstablishments), [allEstablishments]);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="container mx-auto px-6 py-8">
          <div className="space-y-2">
            <h1 className="title-large text-foreground">
              Estabelecimentos de São Paulo
            </h1>
            <p className="body-large text-muted-foreground">
              Explore e analise dados de {allEstablishments.length.toLocaleString()} estabelecimentos na capital paulista
            </p>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <div className="border-b border-border bg-card">
        <div className="container mx-auto px-6">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="h-12 bg-transparent border-0 p-0 gap-8">
              <TabsTrigger 
                value="dashboard" 
                className="h-12 px-0 border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent bg-transparent rounded-none body-medium font-medium"
              >
                📊 Dashboard
              </TabsTrigger>
              <TabsTrigger 
                value="url-analytics" 
                className="h-12 px-0 border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent bg-transparent rounded-none body-medium font-medium"
              >
                🔗 Análise URLs
              </TabsTrigger>
              <TabsTrigger 
                value="advogados"
                className="h-12 px-0 border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent bg-transparent rounded-none body-medium font-medium"
              >
                ⚖️ Advogados
              </TabsTrigger>
              <TabsTrigger 
                value="crossfit"
                className="h-12 px-0 border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent bg-transparent rounded-none body-medium font-medium"
              >
                💪 CrossFit
              </TabsTrigger>
              <TabsTrigger 
                value="dentistas"
                className="h-12 px-0 border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent bg-transparent rounded-none body-medium font-medium"
              >
                🦷 Dentistas
              </TabsTrigger>
              <TabsTrigger 
                value="oftalmo"
                className="h-12 px-0 border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent bg-transparent rounded-none body-medium font-medium"
              >
                👁️ Oftalmologistas
              </TabsTrigger>
              <TabsTrigger 
                value="pilates"
                className="h-12 px-0 border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent bg-transparent rounded-none body-medium font-medium"
              >
                🧘 Pilates
              </TabsTrigger>
              <TabsTrigger 
                value="yoga"
                className="h-12 px-0 border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent bg-transparent rounded-none body-medium font-medium"
              >
                🕉️ Yoga
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </div>

      {/* Content */}
      <main className="container mx-auto px-6 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsContent value="dashboard" className="mt-0">
            <Dashboard statistics={statistics} />
          </TabsContent>

          <TabsContent value="url-analytics" className="mt-0">
            <UrlAnalyticsDashboard establishments={allEstablishments} />
          </TabsContent>

          <TabsContent value="advogados" className="mt-0">
            <EstablishmentList 
              establishments={advogadosData as Establishment[]} 
              title="Advogados Trabalhistas"
            />
          </TabsContent>

          <TabsContent value="crossfit" className="mt-0">
            <EstablishmentList 
              establishments={crossfitData as Establishment[]} 
              title="Academias de CrossFit"
            />
          </TabsContent>

          <TabsContent value="dentistas" className="mt-0">
            <EstablishmentList 
              establishments={dentistaData as Establishment[]} 
              title="Dentistas e Clínicas Odontológicas"
            />
          </TabsContent>

          <TabsContent value="oftalmo" className="mt-0">
            <EstablishmentList 
              establishments={oftalmoData as Establishment[]} 
              title="Oftalmologistas"
            />
          </TabsContent>

          <TabsContent value="pilates" className="mt-0">
            <EstablishmentList 
              establishments={pilatesData as Establishment[]} 
              title="Estúdios de Pilates"
            />
          </TabsContent>

          <TabsContent value="yoga" className="mt-0">
            <EstablishmentList 
              establishments={yogaData as Establishment[]} 
              title="Estúdios de Yoga"
            />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}

export default App;