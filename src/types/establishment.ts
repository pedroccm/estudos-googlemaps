export interface Establishment {
  title: string;
  totalScore?: number;
  reviewsCount: number;
  street: string | null;
  city: string;
  state: string;
  countryCode: string;
  phone?: string;
  website?: string;
  categoryName: string;
  url: string;
}