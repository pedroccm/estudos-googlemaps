import type { Establishment } from "@/types/establishment";

export interface Statistics {
  totalEstablishments: number;
  withWebsite: number;
  withoutWebsite: number;
  withPhone: number;
  withoutPhone: number;
  withFixedPhone: number;
  withWhatsApp: number;
  averageRating: number;
  totalReviews: number;
  categoriesCount: Record<string, number>;
  categoriesReviews: Record<string, number>;
  categoriesWithWebsite: Record<string, number>;
  categoriesWithoutWebsite: Record<string, number>;
  neighborhoods: Record<string, number>;
  ratingDistribution: Record<string, number>;
}

export function analyzeData(establishments: Establishment[]): Statistics {
  const totalEstablishments = establishments.length;
  
  const withWebsite = establishments.filter(e => e.website).length;
  const withoutWebsite = totalEstablishments - withWebsite;
  
  const withPhone = establishments.filter(e => e.phone).length;
  const withoutPhone = totalEstablishments - withPhone;
  
  // Analisa tipo de telefone (celular vs fixo baseado no padrão brasileiro)
  let withFixedPhone = 0;
  let withWhatsApp = 0;
  
  establishments.forEach(e => {
    if (e.phone) {
      // Remove formatação do telefone para análise
      const cleanPhone = e.phone.replace(/\D/g, '');
      
      // Padrão brasileiro: +55 11 9xxxx-xxxx (celular) vs +55 11 xxxx-xxxx (fixo)
      // Celular tem 9 como primeiro dígito após o DDD
      if (cleanPhone.length >= 10) {
        const phoneWithoutCountryCode = cleanPhone.slice(-9); // Pega os últimos 9 dígitos
        if (phoneWithoutCountryCode.startsWith('9')) {
          withWhatsApp++; // Assumindo que celular = WhatsApp potencial
        } else {
          withFixedPhone++;
        }
      }
    }
  });
  
  const ratingsSum = establishments
    .filter(e => e.totalScore)
    .reduce((sum, e) => sum + (e.totalScore || 0), 0);
  const establishmentsWithRating = establishments.filter(e => e.totalScore).length;
  const averageRating = establishmentsWithRating > 0 ? ratingsSum / establishmentsWithRating : 0;
  
  const totalReviews = establishments.reduce((sum, e) => sum + e.reviewsCount, 0);
  
  // Contagem por categoria
  const categoriesCount: Record<string, number> = {};
  const categoriesReviews: Record<string, number> = {};
  const categoriesWithWebsite: Record<string, number> = {};
  const categoriesWithoutWebsite: Record<string, number> = {};
  
  establishments.forEach(e => {
    const category = e.categoryName;
    
    // Contagem de estabelecimentos por categoria
    categoriesCount[category] = (categoriesCount[category] || 0) + 1;
    
    // Contagem de avaliações por categoria
    categoriesReviews[category] = (categoriesReviews[category] || 0) + e.reviewsCount;
    
    // Contagem com/sem website por categoria
    if (e.website) {
      categoriesWithWebsite[category] = (categoriesWithWebsite[category] || 0) + 1;
    } else {
      categoriesWithoutWebsite[category] = (categoriesWithoutWebsite[category] || 0) + 1;
    }
  });
  
  // Análise de bairros (extrair do endereço)
  const neighborhoods: Record<string, number> = {};
  establishments.forEach(e => {
    // Tentar extrair bairro do endereço (simplificado)
    if (e.street) {
      const parts = e.street.split(',');
      const neighborhood = parts[parts.length - 1]?.trim() || "Não identificado";
      neighborhoods[neighborhood] = (neighborhoods[neighborhood] || 0) + 1;
    } else {
      neighborhoods["Endereço não informado"] = (neighborhoods["Endereço não informado"] || 0) + 1;
    }
  });
  
  // Distribuição de avaliações
  const ratingDistribution: Record<string, number> = {
    "Sem avaliação": 0,
    "1-2 estrelas": 0,
    "2-3 estrelas": 0,
    "3-4 estrelas": 0,
    "4-5 estrelas": 0
  };
  
  establishments.forEach(e => {
    if (!e.totalScore || e.totalScore === 0) {
      ratingDistribution["Sem avaliação"]++;
    } else if (e.totalScore < 2) {
      ratingDistribution["1-2 estrelas"]++;
    } else if (e.totalScore < 3) {
      ratingDistribution["2-3 estrelas"]++;
    } else if (e.totalScore < 4) {
      ratingDistribution["3-4 estrelas"]++;
    } else {
      ratingDistribution["4-5 estrelas"]++;
    }
  });
  
  return {
    totalEstablishments,
    withWebsite,
    withoutWebsite,
    withPhone,
    withoutPhone,
    withFixedPhone,
    withWhatsApp,
    averageRating,
    totalReviews,
    categoriesCount,
    categoriesReviews,
    categoriesWithWebsite,
    categoriesWithoutWebsite,
    neighborhoods,
    ratingDistribution
  };
}