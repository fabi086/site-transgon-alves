import React, { useState, useEffect } from 'react';

interface ImageData {
    src: string;
    alt: string;
}

const GallerySection: React.FC = () => {
    const [images, setImages] = useState<ImageData[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchImages = async () => {
            try {
                const response = await fetch('/db.json');
                if (!response.ok) {
                    throw new Error('Falha ao carregar as imagens da galeria.');
                }
                const data = await response.json();
                setImages(data.galleryImages || []);
            } catch (err: any) {
                setError(err.message);
                console.error("Failed to load gallery images:", err);
            } finally {
                setLoading(false);
            }
        };
        fetchImages();
    }, []);


    return (
        <section id="gallery" className="py-20 bg-zinc-900">
            <div className="container mx-auto px-6">
                <div className="text-center mb-12">
                    <h2 className="text-4xl font-black text-white uppercase tracking-tighter">Nossa Frota</h2>
                    <p className="text-lg text-gray-400 mt-2 max-w-2xl mx-auto">Equipamentos modernos e prontos para atender sua demanda.</p>
                </div>

                {loading && <div className="text-center text-gray-400">Carregando galeria...</div>}
                {error && <div className="text-center text-red-400 bg-red-500/10 p-4 rounded-lg">{error}</div>}
                
                {!loading && !error && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {images.map((image, index) => (
                            <div key={index} className="group relative overflow-hidden rounded-lg p-2 border-2 border-zinc-700 hover:border-lime-400 transition-colors duration-300 aspect-w-4 aspect-h-3">
                                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/50 transition-all duration-300 z-10"></div>
                                <img 
                                    src={image.src} 
                                    alt={image.alt} 
                                    className="w-full h-full object-cover rounded-md transform group-hover:scale-105 transition-transform duration-300" 
                                    loading="lazy"
                                />
                                <p className="absolute bottom-4 left-4 text-white font-bold z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300">{image.alt}</p>
                            </div>
                        ))}
                    </div>
                )}
                 {(!loading && !error && images.length === 0) && <div className="text-center text-gray-500">Nenhuma imagem na galeria. Adicione imagens no arquivo db.json.</div>}
            </div>
        </section>
    );
};

export default GallerySection;
