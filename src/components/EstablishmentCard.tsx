import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import type { Establishment } from "@/types/establishment";

interface EstablishmentCardProps {
  establishment: Establishment;
}

export function EstablishmentCard({ establishment }: EstablishmentCardProps) {
  const handleOpenMaps = () => {
    window.open(establishment.url, '_blank');
  };

  const handleCallPhone = () => {
    if (establishment.phone) {
      window.open(`tel:${establishment.phone}`);
    }
  };

  const handleOpenWebsite = () => {
    if (establishment.website) {
      window.open(establishment.website, '_blank');
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-lg">{establishment.title}</CardTitle>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs">
            {establishment.categoryName}
          </span>
          {establishment.totalScore && (
            <span className="flex items-center gap-1">
              ⭐ {establishment.totalScore}
              <span className="text-xs">({establishment.reviewsCount} avaliações)</span>
            </span>
          )}
          {!establishment.totalScore && establishment.reviewsCount === 0 && (
            <span className="text-xs">Sem avaliações</span>
          )}
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <div>
            <p className="text-sm font-medium">Endereço:</p>
            <p className="text-sm text-muted-foreground">
              {establishment.street || "Endereço não informado"}, {establishment.city} - {establishment.state}
            </p>
          </div>
          
          <div className="flex flex-wrap gap-2">
            <Button onClick={handleOpenMaps} size="sm">
              Maps
            </Button>
            
            {establishment.phone && (
              <Button onClick={handleCallPhone} variant="outline" size="sm">
                📞 Ligar
              </Button>
            )}
            
            {establishment.website && (
              <Button onClick={handleOpenWebsite} variant="outline" size="sm">
                🌐 Site
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}