import React from 'react';

// Updated image URLs to a new, more reliable host.
// Removed srcset for simplicity to ensure images display correctly.
const images = [
    { src: 'https://i.postimg.cc/k50bYVz7/trans-goncalves-munck-piscina.jpg', alt: "Caminhão Munck realizando içamento de caixa d'água de concreto." },
    { src: 'https://i.postimg.cc/tJ7k7jcb/trans-goncalves-guincho-carro-antigo.jpg', alt: 'Guincho plataforma transportando um carro clássico Mercedes-Benz.' },
    { src: 'https://i.postimg.cc/j27z0dGj/trans-goncalves-prancha-rolo-compressor.jpg', alt: 'Transporte de rolo compressor em caminhão prancha especializado.' },
    { src: 'https://i.postimg.cc/YC5xJbKz/trans-goncalves-guincho-van.jpg', alt: 'Serviço de guincho para uma van em área urbana.' },
    { src: 'https://i.postimg.cc/QdYQZ1B5/trans-goncalves-munck-obra.jpg', alt: 'Caminhão Munck em operação em canteiro de obras.' },
    { src: 'https://i.postimg.cc/X7Y0XgM9/trans-goncalves-prancha-escavadeira.jpg', alt: 'Transporte de escavadeira em caminhão prancha de grande porte.' },
];


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
            </div>
        </section>
    );
};

export default GallerySection;