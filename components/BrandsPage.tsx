import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Building2, ArrowRight, Sparkles } from 'lucide-react';
import { getBrands } from '../services/sanity';
import { useSiteConfig } from '../contexts/SiteConfigContext';

interface Brand {
    _id: string;
    name: string;
    slug: string;
    logo?: string;
    description?: string;
}

const BrandsPage: React.FC = () => {
    const { colors, siteSettings } = useSiteConfig();
    const [brands, setBrands] = useState<Brand[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchBrands = async () => {
            try {
                const data = await getBrands();
                if (data) {
                    setBrands(data);
                }
            } catch (error) {
                console.error('Error fetching brands:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchBrands();
    }, []);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#f8fafc' }}>
                <div className="text-center">
                    <div
                        className="w-16 h-16 border-4 rounded-full animate-spin mx-auto mb-4"
                        style={{ borderColor: colors.secondary, borderTopColor: 'transparent' }}
                    ></div>
                    <p className="text-gray-500 font-medium">Cargando marcas...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen" style={{ backgroundColor: '#f8fafc' }}>
            {/* Hero Section */}
            <div
                className="relative py-20 overflow-hidden"
                style={{ backgroundColor: colors.primary }}
            >
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute top-10 left-10 w-32 h-32 rounded-full" style={{ backgroundColor: colors.secondary }}></div>
                    <div className="absolute bottom-10 right-20 w-48 h-48 rounded-full" style={{ backgroundColor: colors.secondary }}></div>
                    <div className="absolute top-1/2 left-1/2 w-64 h-64 rounded-full transform -translate-x-1/2 -translate-y-1/2" style={{ backgroundColor: colors.secondary }}></div>
                </div>

                <div className="max-w-7xl mx-auto px-4 relative z-10">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="p-3 rounded-xl" style={{ backgroundColor: colors.secondary }}>
                            <Building2 size={28} style={{ color: colors.primary }} />
                        </div>
                        <span className="text-xs font-black uppercase tracking-[0.3em]" style={{ color: colors.secondary }}>
                            Nuestras Alianzas
                        </span>
                    </div>
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-4">
                        Marcas que <span style={{ color: colors.secondary }}>Distribuimos</span>
                    </h1>
                    <p className="text-lg text-gray-300 max-w-2xl">
                        Trabajamos con las mejores marcas del sector eléctrico y de iluminación para ofrecerte productos de calidad garantizada.
                    </p>
                </div>
            </div>

            {/* Brands Grid */}
            <div className="max-w-7xl mx-auto px-4 py-16">
                <div className="flex items-center gap-3 mb-8">
                    <Sparkles size={20} style={{ color: colors.secondary }} />
                    <span className="text-xs font-black uppercase tracking-widest" style={{ color: colors.primary }}>
                        {brands.length} Marcas Disponibles
                    </span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
                    {brands.map((brand) => (
                        <Link
                            key={brand._id}
                            to={`/productos?brand=${encodeURIComponent(brand.name)}`}
                            className="group relative bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-xl hover:border-transparent transition-all duration-300 flex flex-col items-center justify-center min-h-[160px]"
                            style={{
                                '--hover-border': colors.secondary
                            } as React.CSSProperties}
                        >
                            {/* Hover Effect Border */}
                            <div
                                className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                                style={{
                                    border: `2px solid ${colors.secondary}`,
                                    boxShadow: `0 0 20px ${colors.secondary}30`
                                }}
                            ></div>

                            {/* Logo */}
                            <div className="relative z-10 w-full h-20 flex items-center justify-center mb-4">
                                {brand.logo ? (
                                    <img
                                        src={brand.logo}
                                        alt={brand.name}
                                        className="max-h-full max-w-full object-contain group-hover:scale-105 transition-all duration-300"
                                    />
                                ) : (
                                    <div
                                        className="w-16 h-16 rounded-xl flex items-center justify-center"
                                        style={{ backgroundColor: `${colors.primary}10` }}
                                    >
                                        <Building2 size={32} style={{ color: colors.primary }} />
                                    </div>
                                )}
                            </div>

                            {/* Brand Name */}
                            <h3
                                className="relative z-10 text-xs font-black uppercase tracking-wide text-center group-hover:text-opacity-100 transition-colors"
                                style={{ color: colors.primary }}
                            >
                                {brand.name}
                            </h3>

                            {/* Arrow on Hover */}
                            <div
                                className="absolute bottom-3 right-3 w-8 h-8 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300"
                                style={{ backgroundColor: colors.secondary }}
                            >
                                <ArrowRight size={16} style={{ color: colors.primary }} />
                            </div>
                        </Link>
                    ))}
                </div>

                {brands.length === 0 && (
                    <div className="text-center py-16">
                        <Building2 size={64} className="mx-auto mb-4 text-gray-300" />
                        <h3 className="text-xl font-bold text-gray-400 mb-2">No hay marcas disponibles</h3>
                        <p className="text-gray-400">Las marcas aparecerán aquí cuando se agreguen al sistema.</p>
                    </div>
                )}
            </div>

            {/* CTA Section */}
            <div
                className="py-16"
                style={{ backgroundColor: `${colors.primary}05` }}
            >
                <div className="max-w-4xl mx-auto px-4 text-center">
                    <h2 className="text-2xl md:text-3xl font-black mb-4" style={{ color: colors.primary }}>
                        ¿Buscas una marca específica?
                    </h2>
                    <p className="text-gray-600 mb-8">
                        Contáctanos y te ayudamos a encontrar el producto que necesitas de tu marca favorita.
                    </p>
                    <Link
                        to="/contacto"
                        className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-bold text-sm uppercase tracking-wide transition-all hover:scale-105"
                        style={{
                            backgroundColor: colors.secondary,
                            color: colors.primary
                        }}
                    >
                        Contáctanos
                        <ArrowRight size={18} />
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default BrandsPage;
