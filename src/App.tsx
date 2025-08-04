import { useMemo } from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
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
  const location = useLocation();

  // Get current tab from URL
  const getCurrentTab = () => {
    const path = location.pathname;
    if (path === '/' || path === '/dashboard') return 'dashboard';
    if (path === '/url-analytics') return 'url-analytics';
    if (path === '/advogados') return 'advogados';
    if (path === '/crossfit') return 'crossfit';
    if (path === '/dentistas') return 'dentistas';
    if (path === '/oftalmo') return 'oftalmo';
    if (path === '/pilates') return 'pilates';
    if (path === '/yoga') return 'yoga';
    return 'dashboard';
  };

  const activeTab = getCurrentTab();

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
          <nav className="h-auto bg-transparent border-0 p-0 gap-2 flex flex-wrap justify-start sm:gap-8 sm:flex-nowrap">
            <Link 
              to="/dashboard"
              className={`h-10 sm:h-12 px-3 sm:px-0 border-b-2 ${activeTab === 'dashboard' ? 'border-primary' : 'border-transparent'} bg-transparent rounded-none body-medium font-medium flex-shrink-0 whitespace-nowrap flex items-center hover:border-primary/50 transition-colors`}
            >
              <span className="hidden sm:inline">📊 Dashboard</span>
              <span className="sm:hidden">📊</span>
            </Link>
            <Link 
              to="/url-analytics"
              className={`h-10 sm:h-12 px-3 sm:px-0 border-b-2 ${activeTab === 'url-analytics' ? 'border-primary' : 'border-transparent'} bg-transparent rounded-none body-medium font-medium flex-shrink-0 whitespace-nowrap flex items-center hover:border-primary/50 transition-colors`}
            >
              <span className="hidden sm:inline">🔗 Análise URLs</span>
              <span className="sm:hidden">🔗</span>
            </Link>
            <Link 
              to="/advogados"
              className={`h-10 sm:h-12 px-3 sm:px-0 border-b-2 ${activeTab === 'advogados' ? 'border-primary' : 'border-transparent'} bg-transparent rounded-none body-medium font-medium flex-shrink-0 whitespace-nowrap flex items-center hover:border-primary/50 transition-colors`}
            >
              <span className="hidden sm:inline">⚖️ Advogados</span>
              <span className="sm:hidden">⚖️</span>
            </Link>
            <Link 
              to="/crossfit"
              className={`h-10 sm:h-12 px-3 sm:px-0 border-b-2 ${activeTab === 'crossfit' ? 'border-primary' : 'border-transparent'} bg-transparent rounded-none body-medium font-medium flex-shrink-0 whitespace-nowrap flex items-center hover:border-primary/50 transition-colors`}
            >
              <span className="hidden sm:inline">💪 CrossFit</span>
              <span className="sm:hidden">💪</span>
            </Link>
            <Link 
              to="/dentistas"
              className={`h-10 sm:h-12 px-3 sm:px-0 border-b-2 ${activeTab === 'dentistas' ? 'border-primary' : 'border-transparent'} bg-transparent rounded-none body-medium font-medium flex-shrink-0 whitespace-nowrap flex items-center hover:border-primary/50 transition-colors`}
            >
              <span className="hidden sm:inline">🦷 Dentistas</span>
              <span className="sm:hidden">🦷</span>
            </Link>
            <Link 
              to="/oftalmo"
              className={`h-10 sm:h-12 px-3 sm:px-0 border-b-2 ${activeTab === 'oftalmo' ? 'border-primary' : 'border-transparent'} bg-transparent rounded-none body-medium font-medium flex-shrink-0 whitespace-nowrap flex items-center hover:border-primary/50 transition-colors`}
            >
              <span className="hidden sm:inline">👁️ Oftalmologistas</span>
              <span className="sm:hidden">👁️</span>
            </Link>
            <Link 
              to="/pilates"
              className={`h-10 sm:h-12 px-3 sm:px-0 border-b-2 ${activeTab === 'pilates' ? 'border-primary' : 'border-transparent'} bg-transparent rounded-none body-medium font-medium flex-shrink-0 whitespace-nowrap flex items-center hover:border-primary/50 transition-colors`}
            >
              <span className="hidden sm:inline">🧘 Pilates</span>
              <span className="sm:hidden">🧘</span>
            </Link>
            <Link 
              to="/yoga"
              className={`h-10 sm:h-12 px-3 sm:px-0 border-b-2 ${activeTab === 'yoga' ? 'border-primary' : 'border-transparent'} bg-transparent rounded-none body-medium font-medium flex-shrink-0 whitespace-nowrap flex items-center hover:border-primary/50 transition-colors`}
            >
              <span className="hidden sm:inline">🕉️ Yoga</span>
              <span className="sm:hidden">🕉️</span>
            </Link>
          </nav>
        </div>
      </div>

      {/* Content */}
      <main className="container mx-auto px-4 sm:px-6 py-6 sm:py-8">
        <Routes>
          <Route path="/" element={<Dashboard statistics={statistics} />} />
          <Route path="/dashboard" element={<Dashboard statistics={statistics} />} />
          <Route path="/url-analytics" element={<UrlAnalyticsDashboard establishments={allEstablishments} />} />
          <Route path="/advogados" element={
            <EstablishmentList 
              establishments={advogadosData as Establishment[]} 
              title="Advogados Trabalhistas"
            />
          } />
          <Route path="/crossfit" element={
            <EstablishmentList 
              establishments={crossfitData as Establishment[]} 
              title="Academias de CrossFit"
            />
          } />
          <Route path="/dentistas" element={
            <EstablishmentList 
              establishments={dentistaData as Establishment[]} 
              title="Dentistas e Clínicas Odontológicas"
            />
          } />
          <Route path="/oftalmo" element={
            <EstablishmentList 
              establishments={oftalmoData as Establishment[]} 
              title="Oftalmologistas"
            />
          } />
          <Route path="/pilates" element={
            <EstablishmentList 
              establishments={pilatesData as Establishment[]} 
              title="Estúdios de Pilates"
            />
          } />
          <Route path="/yoga" element={
            <EstablishmentList 
              establishments={yogaData as Establishment[]} 
              title="Estúdios de Yoga"
            />
          } />
        </Routes>
      </main>
    </div>
  );
}

export default App;