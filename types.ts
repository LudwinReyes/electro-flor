
export interface Product {
  id: string;
  _id?: string; // ID de Sanity
  slug?: string; // Slug para URLs amigables
  name: string;
  brand: string;
  code: string;
  category: string;
  image: string;
  description: string;
  shortDescription?: string;
  specifications: Record<string, string> | Array<{ _key?: string; label: string; value: string }>;
  isFeatured?: boolean;
  isNew?: boolean;
  seo?: {
    title?: string;
    description?: string;
    keywords?: string[];
  };
  displaySections?: string[];
}

export interface Brand {
  name: string;
  logo: string;
}

export interface Category {
  name: string;
  icon: string;
  slug: string;
  image: string;
  parentCategory?: string; // Slug de la categoría padre para subcategorías
  order?: number;
  featured?: boolean;
}

export interface Message {
  role: 'user' | 'assistant' | 'system';
  content: string;
}
