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
        <div className="container mx-auto px-4 sm:px-6 py-6 sm:py-8">
          <div className="space-y-2">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-medium text-foreground">
              Estabelecimentos de São Paulo
            </h1>
            <p className="text-sm sm:text-base text-muted-foreground">
              Explore e analise dados de {allEstablishments.length.toLocaleString()} estabelecimentos na capital paulista
            </p>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <div className="border-b border-border bg-card">
        <div className="container mx-auto px-4 sm:px-6">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="h-auto bg-transparent border-0 p-0 gap-2 flex-wrap justify-start sm:gap-8 sm:flex-nowrap">
              <TabsTrigger 
                value="dashboard" 
                className="h-10 sm:h-12 px-3 sm:px-0 border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent bg-transparent rounded-none body-medium font-medium flex-shrink-0 whitespace-nowrap"
              >
                <span className="hidden sm:inline">📊 Dashboard</span>
                <span className="sm:hidden">📊</span>
              </TabsTrigger>
              <TabsTrigger 
                value="url-analytics" 
                className="h-10 sm:h-12 px-3 sm:px-0 border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent bg-transparent rounded-none body-medium font-medium flex-shrink-0 whitespace-nowrap"
              >
                <span className="hidden sm:inline">🔗 Análise URLs</span>
                <span className="sm:hidden">🔗</span>
              </TabsTrigger>
              <TabsTrigger 
                value="advogados"
                className="h-10 sm:h-12 px-3 sm:px-0 border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent bg-transparent rounded-none body-medium font-medium flex-shrink-0 whitespace-nowrap"
              >
                <span className="hidden sm:inline">⚖️ Advogados</span>
                <span className="sm:hidden">⚖️</span>
              </TabsTrigger>
              <TabsTrigger 
                value="crossfit"
                className="h-10 sm:h-12 px-3 sm:px-0 border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent bg-transparent rounded-none body-medium font-medium flex-shrink-0 whitespace-nowrap"
              >
                <span className="hidden sm:inline">💪 CrossFit</span>
                <span className="sm:hidden">💪</span>
              </TabsTrigger>
              <TabsTrigger 
                value="dentistas"
                className="h-10 sm:h-12 px-3 sm:px-0 border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent bg-transparent rounded-none body-medium font-medium flex-shrink-0 whitespace-nowrap"
              >
                <span className="hidden sm:inline">🦷 Dentistas</span>
                <span className="sm:hidden">🦷</span>
              </TabsTrigger>
              <TabsTrigger 
                value="oftalmo"
                className="h-10 sm:h-12 px-3 sm:px-0 border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent bg-transparent rounded-none body-medium font-medium flex-shrink-0 whitespace-nowrap"
              >
                <span className="hidden sm:inline">👁️ Oftalmologistas</span>
                <span className="sm:hidden">👁️</span>
              </TabsTrigger>
              <TabsTrigger 
                value="pilates"
                className="h-10 sm:h-12 px-3 sm:px-0 border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent bg-transparent rounded-none body-medium font-medium flex-shrink-0 whitespace-nowrap"
              >
                <span className="hidden sm:inline">🧘 Pilates</span>
                <span className="sm:hidden">🧘</span>
              </TabsTrigger>
              <TabsTrigger 
                value="yoga"
                className="h-10 sm:h-12 px-3 sm:px-0 border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent bg-transparent rounded-none body-medium font-medium flex-shrink-0 whitespace-nowrap"
              >
                <span className="hidden sm:inline">🕉️ Yoga</span>
                <span className="sm:hidden">🕉️</span>
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </div>

      {/* Content */}
      <main className="container mx-auto px-4 sm:px-6 py-6 sm:py-8">
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