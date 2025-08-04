import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import type { Statistics } from "@/utils/dataAnalysis";

interface DashboardProps {
  statistics: Statistics;
}

export function Dashboard({ statistics }: DashboardProps) {
  // Categorias ordenadas
  const categoriesByCount = Object.entries(statistics.categoriesCount)
    .sort(([,a], [,b]) => b - a);

  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <h2 className="title-medium text-foreground">Dashboard - Análise dos Dados</h2>
        <p className="body-medium text-muted-foreground">
          Visão geral dos estabelecimentos cadastrados na plataforma
        </p>
      </div>
      
      {/* Métricas Principais */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4">
        <Card className="border-border">
          <CardContent className="p-6">
            <div className="space-y-2">
              <p className="text-xs text-muted-foreground font-medium uppercase tracking-wide">Total</p>
              <div className="text-3xl font-medium text-foreground">{statistics.totalEstablishments.toLocaleString()}</div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="border-border">
          <CardContent className="p-6">
            <div className="space-y-2">
              <p className="text-xs text-muted-foreground font-medium uppercase tracking-wide">Com Site</p>
              <div className="text-3xl font-medium text-primary">{statistics.withWebsite.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">
                {((statistics.withWebsite / statistics.totalEstablishments) * 100).toFixed(1)}%
              </p>
            </div>
          </CardContent>
        </Card>
        
        <Card className="border-border">
          <CardContent className="p-6">
            <div className="space-y-2">
              <p className="text-xs text-muted-foreground font-medium uppercase tracking-wide">Sem Site</p>
              <div className="text-3xl font-medium text-destructive">{statistics.withoutWebsite.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">
                {((statistics.withoutWebsite / statistics.totalEstablishments) * 100).toFixed(1)}%
              </p>
            </div>
          </CardContent>
        </Card>
        
        <Card className="border-border">
          <CardContent className="p-6">
            <div className="space-y-2">
              <p className="text-xs text-muted-foreground font-medium uppercase tracking-wide">Tel. Fixo</p>
              <div className="text-3xl font-medium text-orange">{statistics.withFixedPhone.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">
                {((statistics.withFixedPhone / statistics.totalEstablishments) * 100).toFixed(1)}%
              </p>
            </div>
          </CardContent>
        </Card>
        
        <Card className="border-border">
          <CardContent className="p-6">
            <div className="space-y-2">
              <p className="text-xs text-muted-foreground font-medium uppercase tracking-wide">WhatsApp</p>
              <div className="text-3xl font-medium text-orange">{statistics.withWhatsApp.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">
                {((statistics.withWhatsApp / statistics.totalEstablishments) * 100).toFixed(1)}%
              </p>
            </div>
          </CardContent>
        </Card>
        
        <Card className="border-border">
          <CardContent className="p-6">
            <div className="space-y-2">
              <p className="text-xs text-muted-foreground font-medium uppercase tracking-wide">Avaliações</p>
              <div className="text-3xl font-medium text-foreground">{statistics.totalReviews.toLocaleString()}</div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Análise por Setor/Categoria */}
      <Card className="border-border">
        <CardHeader>
          <CardTitle className="title-small text-foreground">Análise por Setor</CardTitle>
          <p className="body-medium text-muted-foreground">
            Distribuição de estabelecimentos, avaliações e presença online por categoria
          </p>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Setor</TableHead>
                  <TableHead className="text-right">Estabelecimentos</TableHead>
                  <TableHead className="text-right hidden sm:table-cell">Total de Avaliações</TableHead>
                  <TableHead className="text-right">Com Site</TableHead>
                  <TableHead className="text-right hidden md:table-cell">Sem Site</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {categoriesByCount.map(([category, count]) => (
                  <TableRow key={category}>
                    <TableCell className="font-medium">{category}</TableCell>
                    <TableCell className="text-right">{count}</TableCell>
                    <TableCell className="text-right hidden sm:table-cell">
                      {(statistics.categoriesReviews[category] || 0).toLocaleString()}
                    </TableCell>
                    <TableCell className="text-right text-green-600">
                      {statistics.categoriesWithWebsite[category] || 0}
                    </TableCell>
                    <TableCell className="text-right text-red-600 hidden md:table-cell">
                      {statistics.categoriesWithoutWebsite[category] || 0}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Distribuição de Avaliações */}
      <Card className="border-border">
        <CardHeader>
          <CardTitle className="title-small text-foreground">Distribuição por Faixa de Avaliação</CardTitle>
          <p className="body-medium text-muted-foreground">
            Como os estabelecimentos se distribuem por faixas de nota
          </p>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {Object.entries(statistics.ratingDistribution).map(([range, count]) => (
              <div key={range} className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="body-medium text-foreground">{range}</span>
                  <span className="body-medium font-medium text-foreground">{count}</span>
                </div>
                <div className="w-full bg-secondary rounded-full h-2">
                  <div 
                    className="bg-primary h-2 rounded-full transition-all duration-300" 
                    style={{
                      width: `${(count / statistics.totalEstablishments) * 100}%`
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

    </div>
  );
}