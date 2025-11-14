import React from 'react';

const CheckIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="20 6 9 17 4 12"></polyline>
    </svg>
);

const AboutSection: React.FC = () => {
    return (
        <section id="about" className="py-20 bg-zinc-900">
            <div className="container mx-auto px-6">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    <div className="text-center lg:text-left">
                        <h2 className="text-4xl font-black text-white uppercase tracking-tighter">Sobre Nós</h2>
                        <p className="text-lg text-gray-400 mt-4 max-w-2xl mx-auto lg:mx-0">
                            Com anos de experiência no mercado, a Trans Gonçalves é sua parceira de confiança para serviços de munck e guincho. Nossa missão é oferecer soluções rápidas, seguras e eficientes, com atendimento 24 horas por dia.
                        </p>
                        <ul className="mt-8 space-y-4 text-left inline-block">
                            <li className="flex items-center gap-3">
                                <CheckIcon className="w-6 h-6 text-lime-400" />
                                <span className="text-lg text-gray-300">Compromisso com a segurança</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <CheckIcon className="w-6 h-6 text-lime-400" />
                                <span className="text-lg text-gray-300">Agilidade e pontualidade</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <CheckIcon className="w-6 h-6 text-lime-400" />
                                <span className="text-lg text-gray-300">Atendimento 24 horas</span>
                            </li>
                        </ul>
                    </div>
                    <div className="relative h-80 rounded-lg overflow-hidden shadow-xl">
                         <img 
                            src="https://i.postimg.cc/X7Y0XgM9/trans-goncalves-prancha-escavadeira.jpg" 
                            alt="Caminhão prancha transportando escavadeira"
                            className="w-full h-full object-cover"
                            loading="lazy"
                        />
                         <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 to-transparent"></div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AboutSection;