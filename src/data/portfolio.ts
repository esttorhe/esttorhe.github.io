// ABOUTME: Types + loader for portfolio.json. The JSON is the source of truth; this file types it.
// ABOUTME: Adding fields = update both portfolio.json and the interface below.

import portfolioData from './portfolio.json';

export interface FeaturedItem {
  title: string;
  description: string;
  tags: string[];
  url: string;
  /** Role you held at this organisation / on this project. Drives the mono kicker. */
  role: string;
  /** Absolute path under /assets/images/portfolio/ (lives in public/). */
  image: string;
}

export interface LabItem {
  title: string;
  description: string;
  tags: string[];
  /** Project's website. Null for code-only projects. */
  url: string | null;
  /** GitHub URL. Null when not open-source. */
  github: string | null;
  /** Absolute path under /assets/images/portfolio/. SVGs for code-only projects. */
  image: string;
}

export interface PortfolioData {
  featured: FeaturedItem[];
  lab: LabItem[];
}

export const portfolio: PortfolioData = portfolioData as PortfolioData;
