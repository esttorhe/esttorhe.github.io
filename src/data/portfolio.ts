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
  /**
   * 'cover' (default): image fills the 1:1 frame. Right for branded full-bleed
   *   screenshots / branded cards.
   * 'logo': image sits centred with padding on the surface bg. Right for bare
   *   logo PNGs with transparency.
   */
  imageMode?: 'cover' | 'logo';
  /**
   * When true, applies a `filter: invert(1)` to the image in dark mode only.
   * Use for black-on-transparent logos that would disappear on the dark surface.
   */
  imageInvertOnDark?: boolean;
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
