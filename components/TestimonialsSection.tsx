import React, { useState } from 'react';

const testimonials = [
    {
        quote: "Serviço impecável! Precisava remover uma máquina pesada e a equipe da Trans Gonçalves foi extremamente profissional e ágil. Recomendo demais!",
        name: "João Silva",
        company: "Construtora Alfa",
        rating: 5,
    },
    {
        quote: "Meu carro quebrou na estrada de madrugada e o guincho chegou muito rápido. Atendimento nota 10, me salvaram de uma situação complicada.",
        name: "Maria Oliveira",
        company: "Cliente Particular",
        rating: 5,
    },
    {
        quote: "Contratamos para o içamento de uma piscina. O operador do munck foi muito habilidoso e cuidadoso. Trabalho executado com perfeição.",
        name: "Carlos Pereira",
        company: "Arquiteto",
        rating: 5,
    },
     {
        quote: "Transporte de maquinário para nossa obra foi um sucesso. Pontualidade e segurança. Com certeza chamaremos de novo.",
        name: "Fernanda Costa",
        company: "Engenharia Beta",
        rating: 5,
    },
];

const StarIcon: React.FC<{ filled: boolean }> = ({ filled }) => (
    <svg className={`w-5 h-5 ${filled ? 'text-yellow-400' : 'text-gray-600'}`} fill="currentColor" viewBox="0 0 20 20">
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.96a1 1 0 00.95.69h4.162c.969 0 1.371 1.24.588 1.81l-3.368 2.448a1 1 0 00-.364 1.118l1.287 3.96c.3.921-.755 1.688-1.54 1.118l-3.368-2.448a1 1 0 00-1.175 0l-3.368 2.448c-.784.57-1.838-.197-1.539-1.118l1.287-3.96a1 1 0 00-.364-1.118L2.07 9.387c-.783-.57-.38-1.81.588-1.81h4.162a1 1 0 00.95-.69L9.049 2.927z" />
    </svg>
);

const ChevronLeftIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"></polyline></svg>
);

const ChevronRightIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
);

const TestimonialsSection: React.FC = () => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const handlePrev = () => {
        setCurrentIndex((prevIndex) => (prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1));
    };

    const handleNext = () => {
        setCurrentIndex((prevIndex) => (prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1));
    };

    return (
        <section id="testimonials" className="py-20 bg-zinc-800">
            <div className="container mx-auto px-6">
                <div className="text-center mb-12">
                    <h2 className="text-4xl font-black text-white uppercase tracking-tighter">O que nossos clientes dizem</h2>
                    <p className="text-lg text-gray-400 mt-2 max-w-2xl mx-auto">A satisfação de quem confia em nosso trabalho.</p>
                </div>

                <div className="relative">
                    <div className="overflow-hidden">
                        <div className="flex testimonial-carousel" style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
                            {testimonials.map((testimonial, index) => (
                                <div key={index} className="w-full flex-shrink-0 px-4">
                                    <div className="bg-zinc-900 p-8 rounded-lg border-t-4 border-lime-400 shadow-xl text-center min-h-[280px] flex flex-col justify-center">
                                        <div className="flex justify-center mb-4">
                                            {[...Array(5)].map((_, i) => <StarIcon key={i} filled={i < testimonial.rating} />)}
                                        </div>
                                        <p className="text-gray-300 italic text-lg">"{testimonial.quote}"</p>
                                        <div className="mt-6">
                                            <p className="font-bold text-white text-xl">{testimonial.name}</p>
                                            <p className="text-lime-400">{testimonial.company}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    
                    <button onClick={handlePrev} className="absolute top-1/2 -translate-y-1/2 left-0 md:-left-6 bg-zinc-700 p-2 rounded-full hover:bg-lime-400 hover:text-zinc-900 transition-colors" aria-label="Depoimento anterior">
                        <ChevronLeftIcon className="w-6 h-6" />
                    </button>
                    <button onClick={handleNext} className="absolute top-1/2 -translate-y-1/2 right-0 md:-right-6 bg-zinc-700 p-2 rounded-full hover:bg-lime-400 hover:text-zinc-900 transition-colors" aria-label="Próximo depoimento">
                        <ChevronRightIcon className="w-6 h-6" />
                    </button>
                </div>
            </div>
        </section>
    );
};

export default TestimonialsSection;