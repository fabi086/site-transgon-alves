import React, { useState, useRef, useEffect } from 'react';

// NOTE: Image URLs have been verified. If they fail to load on deployment platforms 
// like Vercel, it's likely due to the image host's hotlinking protection policy.
// The most robust, long-term solution is to host images as static assets within the project itself.
const images = [
    { src: 'https://i.postimg.cc/k50bYVz7/trans-goncalves-munck-piscina.jpg', alt: "Caminhão Munck realizando içamento de caixa d'água de concreto." },
    { src: 'https://i.postimg.cc/tJ7k7jcb/trans-goncalves-guincho-carro-antigo.jpg', alt: 'Guincho plataforma transportando um carro clássico Mercedes-Benz.' },
    { src: 'https://i.postimg.cc/j27z0dGj/trans-goncalves-prancha-rolo-compressor.jpg', alt: 'Transporte de rolo compressor em caminhão prancha especializado.' },
    { src: 'https://i.postimg.cc/YC5xJbKz/trans-goncalves-guincho-van.jpg', alt: 'Serviço de guincho para uma van em área urbana.' },
    { src: 'https://i.postimg.cc/QdYQZ1B5/trans-goncalves-munck-obra.jpg', alt: 'Caminhão Munck em operação em canteiro de obras.' },
    { src: 'https://i.postimg.cc/X7Y0XgM9/trans-goncalves-prancha-escavadeira.jpg', alt: 'Transporte de escavadeira em caminhão prancha de grande porte.' },
];

const ShareIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" />
        <polyline points="16 6 12 2 8 6" />
        <line x1="12" y1="2" x2="12" y2="15" />
    </svg>
);

interface ImageItemProps {
    src: string;
    alt: string;
}

const ImageItem: React.FC<ImageItemProps> = ({ src, alt }) => {
    const [isLoaded, setIsLoaded] = useState(false);
    const [isInView, setIsInView] = useState(false);
    const [showCopied, setShowCopied] = useState(false);
    const containerRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsInView(true);
                    observer.disconnect();
                }
            },
            { rootMargin: '100px' }
        );

        if (containerRef.current) {
            observer.observe(containerRef.current);
        }

        return () => {
            if (containerRef.current) {
                // eslint-disable-next-line react-hooks/exhaustive-deps
                observer.unobserve(containerRef.current);
            }
        };
    }, []);

    const handleShare = async (e: React.MouseEvent) => {
        e.stopPropagation(); // Prevent other hover effects from being triggered
        const shareData = {
            title: 'Trans Gonçalves - Munck e Guincho',
            text: alt,
            url: window.location.href,
        };

        if (navigator.share) {
            try {
                await navigator.share(shareData);
            } catch (err) {
                console.error("Error sharing:", err);
            }
        } else {
            try {
                await navigator.clipboard.writeText(window.location.href);
                setShowCopied(true);
                setTimeout(() => setShowCopied(false), 2000);
            } catch (err) {
                console.error('Failed to copy!', err);
                alert("Não foi possível copiar o link.");
            }
        }
    };

    return (
        <div 
            ref={containerRef}
            className="group relative overflow-hidden rounded-lg p-2 border-2 border-zinc-700 hover:border-lime-400 transition-colors duration-300 aspect-w-4 aspect-h-3 min-h-[200px]"
        >
            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/50 transition-all duration-300 z-10"></div>
            
            <button
                onClick={handleShare}
                className="absolute top-4 right-4 z-20 p-2 bg-zinc-900/50 rounded-full text-white hover:bg-lime-400 hover:text-zinc-900 transition-all duration-300 opacity-0 group-hover:opacity-100 focus:opacity-100"
                aria-label="Compartilhar imagem"
            >
                <ShareIcon className="w-5 h-5" />
            </button>

            {showCopied && (
                <div className="absolute top-5 right-14 z-20 bg-lime-400 text-zinc-900 text-xs font-bold px-2 py-1 rounded-md animate-pulse">
                    Link copiado!
                </div>
            )}

            {isInView && (
                <img 
                    src={src}
                    alt={alt} 
                    className={`w-full h-full object-cover rounded-md transform group-hover:scale-105 transition-transform duration-300 lazy-image ${isLoaded ? 'loaded' : ''}`}
                    onLoad={() => setIsLoaded(true)}
                    loading="lazy"
                />
            )}
            <p className="absolute bottom-4 left-4 text-white font-bold z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300">{alt}</p>
        </div>
    );
};


const GallerySection: React.FC = () => {
    return (
        <section id="gallery" className="py-20 bg-zinc-900">
            <div className="container mx-auto px-6">
                <div className="text-center mb-12">
                    <h2 className="text-4xl font-black text-white uppercase tracking-tighter">Nossa Frota</h2>
                    <p className="text-lg text-gray-400 mt-2 max-w-2xl mx-auto">Equipamentos modernos e prontos para atender sua demanda.</p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {images.map((image, index) => (
                        <ImageItem key={index} src={image.src} alt={image.alt} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default GallerySection;