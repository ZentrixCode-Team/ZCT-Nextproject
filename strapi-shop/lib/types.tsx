import type { BlocksContent } from "@strapi/blocks-react-renderer";

/* --------------------------------
   Product
-------------------------------- */

export interface ProductImage {
  id: number;
  documentId?: string;
  url: string;
  alternativeText?: string | null;
  width?: number;
  height?: number;
}

export interface Category {
  id: number;
  documentId?: string;
  name: string;
  slug: string;
  description?: string | null;
}

export interface Product {
  id: number;
  documentId: string;

  Title: string;
  slug: string;

  ShortDescription?: string | null;
  Description?: BlocksContent | null;

  Price: string | number;
  OldPrice?: string | number | null;

  Picture?: ProductImage | null;
  Gallery?: ProductImage[] | null;

  Category?: Category | null;

  Featured?: boolean | null;
  InStock?: boolean | null;
  Badge?: string | null;
}

export interface ProductsResponse {
  data: Product[];
  meta: {
    pagination: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}

/* --------------------------------
   Category
-------------------------------- */

export interface CategoryResponse {
  data: Category | null;
  meta: Record<string, unknown>;
}

export interface CategoriesResponse {
  data: Category[];
  meta: Record<string, unknown>;
}

/* --------------------------------
   About Page
-------------------------------- */

export interface AboutPage {
  id: number;
  documentId: string;

  title: string;

  heroTitle: string;
  heroHighlight: string;

  storyTitle: string;
  storyContent: BlocksContent;

  qualityTitle: string;
  qualityDescription: string;

  simplicityTitle: string;
  simplicityDescription: string;

  designTitle: string;
  designDescription: string;

  ctaTitle: string;
  ctaDescription: string;
}

export interface AboutPageResponse {
  data: AboutPage | null;
  meta: Record<string, unknown>;
}

/* --------------------------------
   Contact Page
-------------------------------- */

export interface ContactPage {
  id: number;
  documentId: string;

  title: string;
  description: string;

  email: string;
  responseTime: string;
  location: string;

  formTitle: string;
  namePlaceholder: string;
  emailPlaceholder: string;
  messagePlaceholder: string;
  buttonText: string;

  bottomText: string;
  bottomLinkText: string;
}

export interface ContactPageResponse {
  data: ContactPage | null;
  meta: Record<string, unknown>;
}

/* --------------------------------
   Navbar
-------------------------------- */

export interface NavbarLink {
  id: number;
  label: string;
  url: string;
  openNewTab: boolean | null;
}

/* --------------------------------
   Footer
-------------------------------- */

export interface FooterLink {
  id: number;
  label: string;
  url: string;
  openNewTab: boolean | null;
}

export interface FooterColumn {
  id: number;
  title: string;
  links: FooterLink[];
}

/* --------------------------------
   Site Settings
-------------------------------- */

export interface SiteLogo {
  id: number;
  documentId?: string;
  url: string;
  alternativeText?: string | null;
  width?: number;
  height?: number;
}

export interface SiteSettings {
  id: number;
  documentId: string;

  siteName: string;
  siteDescription: string;

  logo?: SiteLogo | null;

  navbarLinks: NavbarLink[];

  showContactButton: boolean;
  contactText: string;
  contactUrl: string;

  footerColumns: FooterColumn[];

  copyright: string;
}

export interface SiteSettingsResponse {
  data: SiteSettings;
  meta: Record<string, unknown>;
}