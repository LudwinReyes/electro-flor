import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { getSiteSettings, getHeaderSettings, getFooterSettings } from '../services/sanity';
import { BRAND_COLORS, CONTACT_INFO, SITE_MESSAGES } from '../config';

interface SiteSettings {
  siteName?: string;
  siteDescription?: string;
  logo?: string; // URL del logo ya proyectada por la query de Sanity
  primaryColor?: string;
  secondaryColor?: string;
  phone?: string;
  whatsapp?: string;
  email?: string;
  address?: string;
  facebook?: string;
  instagram?: string;
  linkedin?: string;
  schedule?: string;
}

interface HeaderSettings {
  menuItems?: Array<{ title: string; url: string }>;
  showSearch?: boolean;
  showCategories?: boolean;
}

interface FooterSettings {
  columns?: Array<{ title: string; links: Array<{ text: string; url: string }> }>;
  copyrightText?: string;
}

interface SiteConfig {
  siteSettings: SiteSettings;
  headerSettings: HeaderSettings;
  footerSettings: FooterSettings;
  isLoading: boolean;
  colors: {
    primary: string;
    secondary: string;
    primaryLight: string;
    primaryDark: string;
    primaryOpacity: typeof BRAND_COLORS.primaryOpacity;
    secondaryLight: string;
    secondaryDark: string;
    secondaryOpacity: typeof BRAND_COLORS.secondaryOpacity;
    success: string;
    error: string;
    warning: string;
    info: string;
    white: string;
    black: string;
    gray: typeof BRAND_COLORS.gray;
    background: typeof BRAND_COLORS.background;
  };
  contact: {
    phone: {
      display: string;
      whatsapp: string;
      full: string;
      formatted: string;
      link: string;
    };
    email: typeof CONTACT_INFO.email | string;
    address: typeof CONTACT_INFO.address | string;
    social: typeof CONTACT_INFO.social;
    schedule: typeof CONTACT_INFO.schedule;
  };
  messages: typeof SITE_MESSAGES;
}

const SiteConfigContext = createContext<SiteConfig | undefined>(undefined);

export const SiteConfigProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [siteSettings, setSiteSettings] = useState<SiteSettings>({});
  const [headerSettings, setHeaderSettings] = useState<HeaderSettings>({});
  const [footerSettings, setFooterSettings] = useState<FooterSettings>({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadConfig = async () => {
      try {
        console.log('🔄 Cargando configuración de Sanity...');
        const [site, header, footer] = await Promise.all([
          getSiteSettings(),
          getHeaderSettings(),
          getFooterSettings()
        ]);

        console.log('📦 Datos recibidos de Sanity:', { site, header, footer });
        console.log('🔍 Site settings COMPLETO:', JSON.stringify(site, null, 2));

        if (site) {
          console.log('✅ Site settings cargados:', site);
          setSiteSettings(site);
        } else {
          console.warn('⚠️ No se encontró documento de Site Settings en Sanity');
        }
        if (header) setHeaderSettings(header);
        if (footer) setFooterSettings(footer);
      } catch (error) {
        console.error('❌ Error loading Sanity config, using defaults:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadConfig();
  }, []);

  // Merge Sanity colors with defaults
  const colors = {
    ...BRAND_COLORS,
    primary: siteSettings.primaryColor || BRAND_COLORS.primary,
    secondary: siteSettings.secondaryColor || BRAND_COLORS.secondary,
  };

  console.log('🎨 Colores finales:', colors);

  // Merge Sanity contact info with defaults
  const contact = {
    ...CONTACT_INFO,
    phone: {
      ...CONTACT_INFO.phone,
      display: siteSettings.phone || CONTACT_INFO.phone.display,
      whatsapp: siteSettings.whatsapp || CONTACT_INFO.phone.whatsapp,
    },
    email: siteSettings.email || CONTACT_INFO.email,
    address: typeof siteSettings.address === 'string' ? siteSettings.address : CONTACT_INFO.address,
  };

  console.log('📞 Contacto final:', contact);

  const value: SiteConfig = {
    siteSettings,
    headerSettings,
    footerSettings,
    isLoading,
    colors,
    contact,
    messages: SITE_MESSAGES,
  };

  return (
    <SiteConfigContext.Provider value={value}>
      {children}
    </SiteConfigContext.Provider>
  );
};

export const useSiteConfig = () => {
  const context = useContext(SiteConfigContext);
  if (!context) {
    throw new Error('useSiteConfig must be used within SiteConfigProvider');
  }
  return context;
};
