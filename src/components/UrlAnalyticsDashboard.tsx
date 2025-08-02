import { useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { Establishment } from "@/types/establishment";

interface UrlAnalyticsDashboardProps {
  establishments: Establishment[];
}

interface UrlAnalytics {
  total: number;
  withWebsite: number;
  instagram: number;
  linktree: number;
  whatsapp: number;
  other: number;
  noWebsite: number;
}

export function UrlAnalyticsDashboard({ establishments }: UrlAnalyticsDashboardProps) {
  const analytics = useMemo((): UrlAnalytics => {
    const total = establishments.length;
    let withWebsite = 0;
    let instagram = 0;
    let linktree = 0;
    let whatsapp = 0;
    let other = 0;

    establishments.forEach(establishment => {
      if (establishment.website) {
        withWebsite++;
        const url = establishment.website.toLowerCase();
        
        if (url.includes('instagram.com') || url.includes('instagr.am')) {
          instagram++;
        } else if (url.includes('linktr.ee') || url.includes('linktree')) {
          linktree++;
        } else if (url.includes('wa.me') || url.includes('whatsapp') || url.includes('api.whatsapp.com')) {
          whatsapp++;
        } else {
          other++;
        }
      }
    });

    return {
      total,
      withWebsite,
      instagram,
      linktree,
      whatsapp,
      other,
      noWebsite: total - withWebsite
    };
  }, [establishments]);

  const getPercentage = (value: number, total: number) => {
    if (total === 0) return 0;
    return ((value / total) * 100).toFixed(1);
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-4">Análise de URLs dos Websites</h2>
        <p className="text-muted-foreground">
          Análise dos tipos de websites cadastrados nos estabelecimentos
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Total de Estabelecimentos */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total de Estabelecimentos
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{analytics.total}</div>
          </CardContent>
        </Card>

        {/* Com Website */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Com Website
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{analytics.withWebsite}</div>
            <p className="text-xs text-muted-foreground">
              {getPercentage(analytics.withWebsite, analytics.total)}% do total
            </p>
          </CardContent>
        </Card>

        {/* Sem Website */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Sem Website
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-500">{analytics.noWebsite}</div>
            <p className="text-xs text-muted-foreground">
              {getPercentage(analytics.noWebsite, analytics.total)}% do total
            </p>
          </CardContent>
        </Card>

        {/* Instagram */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              📸 Instagram
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-pink-600">{analytics.instagram}</div>
            <div className="space-y-1">
              <p className="text-xs text-muted-foreground">
                {getPercentage(analytics.instagram, analytics.total)}% do total
              </p>
              <p className="text-xs text-muted-foreground">
                {getPercentage(analytics.instagram, analytics.withWebsite)}% dos que têm website
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Linktree */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              🌳 Linktree
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-500">{analytics.linktree}</div>
            <div className="space-y-1">
              <p className="text-xs text-muted-foreground">
                {getPercentage(analytics.linktree, analytics.total)}% do total
              </p>
              <p className="text-xs text-muted-foreground">
                {getPercentage(analytics.linktree, analytics.withWebsite)}% dos que têm website
              </p>
            </div>
          </CardContent>
        </Card>

        {/* WhatsApp */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              💬 WhatsApp
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{analytics.whatsapp}</div>
            <div className="space-y-1">
              <p className="text-xs text-muted-foreground">
                {getPercentage(analytics.whatsapp, analytics.total)}% do total
              </p>
              <p className="text-xs text-muted-foreground">
                {getPercentage(analytics.whatsapp, analytics.withWebsite)}% dos que têm website
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Outros Sites */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              🌐 Outros Sites
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">{analytics.other}</div>
            <div className="space-y-1">
              <p className="text-xs text-muted-foreground">
                {getPercentage(analytics.other, analytics.total)}% do total
              </p>
              <p className="text-xs text-muted-foreground">
                {getPercentage(analytics.other, analytics.withWebsite)}% dos que têm website
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Gráfico de Pizza Simples */}
      <Card>
        <CardHeader>
          <CardTitle>Distribuição dos Tipos de Website</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-pink-600 rounded"></div>
                <span className="text-sm">Instagram</span>
              </div>
              <span className="text-sm font-medium">
                {analytics.instagram} ({getPercentage(analytics.instagram, analytics.withWebsite)}%)
              </span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-green-500 rounded"></div>
                <span className="text-sm">Linktree</span>
              </div>
              <span className="text-sm font-medium">
                {analytics.linktree} ({getPercentage(analytics.linktree, analytics.withWebsite)}%)
              </span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-green-600 rounded"></div>
                <span className="text-sm">WhatsApp</span>
              </div>
              <span className="text-sm font-medium">
                {analytics.whatsapp} ({getPercentage(analytics.whatsapp, analytics.withWebsite)}%)
              </span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-blue-600 rounded"></div>
                <span className="text-sm">Outros Sites</span>
              </div>
              <span className="text-sm font-medium">
                {analytics.other} ({getPercentage(analytics.other, analytics.withWebsite)}%)
              </span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-gray-500 rounded"></div>
                <span className="text-sm">Sem Website</span>
              </div>
              <span className="text-sm font-medium">
                {analytics.noWebsite} ({getPercentage(analytics.noWebsite, analytics.total)}%)
              </span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}