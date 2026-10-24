import { Locale, PortfolioContent, PortfolioData } from "@/types/portfolio";
import { enContent } from "./locales/en";
import { ptContent } from "./locales/pt";

export { enContent, ptContent };

export const contentByLocale: Record<Locale, PortfolioContent> = {
  pt: ptContent,
  en: enContent,
};

// Default export for backwards compatibility or static SSR fallback
export const portfolioData: PortfolioData = ptContent.data;
