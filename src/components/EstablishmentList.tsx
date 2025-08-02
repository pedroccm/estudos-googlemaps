import { useState } from "react";
import { EstablishmentCard } from "./EstablishmentCard";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import type { Establishment } from "@/types/establishment";

interface EstablishmentListProps {
  establishments: Establishment[];
  title: string;
}

export function EstablishmentList({ establishments, title }: EstablishmentListProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [viewMode, setViewMode] = useState<"cards" | "table">("cards");
  const [websiteFilter, setWebsiteFilter] = useState<"all" | "with" | "without">("all");
  const [sortBy, setSortBy] = useState<"none" | "reviews" | "rating" | "combined">("none");

  const filteredAndSortedEstablishments = establishments
    .filter(establishment => {
      const matchesSearch = establishment.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (establishment.street && establishment.street.toLowerCase().includes(searchTerm.toLowerCase())) ||
        establishment.categoryName.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesWebsiteFilter = 
        websiteFilter === "all" || 
        (websiteFilter === "with" && establishment.website) ||
        (websiteFilter === "without" && !establishment.website);
      
      return matchesSearch && matchesWebsiteFilter;
    })
    .sort((a, b) => {
      if (sortBy === "none") return 0;
      
      if (sortBy === "reviews") {
        return b.reviewsCount - a.reviewsCount;
      }
      
      if (sortBy === "rating") {
        const aRating = a.totalScore || 0;
        const bRating = b.totalScore || 0;
        return bRating - aRating;
      }
      
      if (sortBy === "combined") {
        // Combina avaliação e número de reviews
        const aScore = (a.totalScore || 0) * 0.7 + (a.reviewsCount * 0.001);
        const bScore = (b.totalScore || 0) * 0.7 + (b.reviewsCount * 0.001);
        return bScore - aScore;
      }
      
      return 0;
    });

  const handleOpenMaps = (url: string) => {
    window.open(url, '_blank');
  };

  const handleCallPhone = (phone: string) => {
    window.open(`tel:${phone}`);
  };


  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-4">{title}</h2>
        
        {/* Controles de filtro e visualização */}
        <div className="flex flex-col sm:flex-row gap-4 mb-4">
          <input
            type="text"
            placeholder="Buscar estabelecimentos..."
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          
          <div className="flex gap-4 items-center">
            {/* Filtro por website */}
            <label className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={websiteFilter === "with"}
                onChange={(e) => setWebsiteFilter(e.target.checked ? "with" : "all")}
                className="rounded"
              />
              Apenas com site
            </label>
            
            {/* Ordenação */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as "none" | "reviews" | "rating" | "combined")}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
            >
              <option value="none">Sem ordenação</option>
              <option value="reviews">Por nº de avaliações</option>
              <option value="rating">Por nota</option>
              <option value="combined">Por relevância</option>
            </select>
            
            {/* Modo de visualização */}
            <div className="flex gap-1">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setViewMode("cards")}
                className={`p-2 ${viewMode === "cards" ? "bg-gray-100" : ""}`}
              >
                📱
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setViewMode("table")}
                className={`p-2 ${viewMode === "table" ? "bg-gray-100" : ""}`}
              >
                📋
              </Button>
            </div>
          </div>
        </div>
        
        <p className="text-sm text-muted-foreground">
          {filteredAndSortedEstablishments.length} de {establishments.length} estabelecimentos
          {websiteFilter === "with" && " com website"}
          {sortBy !== "none" && (
            <>
              {" - "}
              {sortBy === "reviews" && "ordenado por nº de avaliações"}
              {sortBy === "rating" && "ordenado por nota"}
              {sortBy === "combined" && "ordenado por relevância"}
            </>
          )}
        </p>
      </div>
      
      {/* Visualização em Cards */}
      {viewMode === "cards" && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredAndSortedEstablishments.map((establishment, index) => (
            <EstablishmentCard key={index} establishment={establishment} />
          ))}
        </div>
      )}

      {/* Visualização em Tabela */}
      {viewMode === "table" && (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nome</TableHead>
              <TableHead>Avaliação</TableHead>
              <TableHead>Website</TableHead>
              <TableHead>Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredAndSortedEstablishments.map((establishment, index) => (
              <TableRow key={index}>
                <TableCell className="font-medium">{establishment.title}</TableCell>
                <TableCell>
                  {establishment.totalScore ? (
                    <span className="flex items-center gap-1">
                      ⭐ {establishment.totalScore}
                      <span className="text-xs text-muted-foreground">
                        ({establishment.reviewsCount})
                      </span>
                    </span>
                  ) : (
                    <span className="text-xs text-muted-foreground">Sem avaliações</span>
                  )}
                </TableCell>
                <TableCell>
                  {establishment.website ? (
                    <a
                      href={establishment.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-800 underline text-sm max-w-xs block truncate"
                    >
                      {establishment.website}
                    </a>
                  ) : (
                    <span className="text-muted-foreground text-sm">-</span>
                  )}
                </TableCell>
                <TableCell>
                  <div className="flex gap-1">
                    <Button
                      onClick={() => handleOpenMaps(establishment.url)}
                      size="sm"
                      variant="outline"
                      className="text-xs px-2 py-1 h-auto"
                    >
                      Maps
                    </Button>
                    {establishment.phone && (
                      <Button
                        onClick={() => handleCallPhone(establishment.phone!)}
                        size="sm"
                        variant="outline"
                        className="text-xs px-2 py-1 h-auto"
                      >
                        📞
                      </Button>
                    )}
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}

      {filteredAndSortedEstablishments.length === 0 && (
        <div className="text-center py-8 text-muted-foreground">
          <p>Nenhum estabelecimento encontrado com os filtros aplicados.</p>
        </div>
      )}
    </div>
  );
}