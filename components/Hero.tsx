import React, { useState, useEffect } from 'react';

const Hero: React.FC = () => {
    const phoneNumber = "5511966887073";
    const whatsappLink = `https://wa.me/${phoneNumber}?text=${encodeURIComponent("Olá! Gostaria de solicitar um orçamento para seus serviços.")}`;

    const [backgroundImage, setBackgroundImage] = useState(""); // Start with empty

    useEffect(() => {
        fetch('/db.json')
            .then(res => res.json())
            .then(data => {
                if (data.heroBackgroundImage) {
                    setBackgroundImage(data.heroBackgroundImage);
                }
            })
            .catch(err => console.error("Failed to load hero background image:", err));
    }, []);


    return (
        <section className="relative overflow-hidden min-h-[calc(100vh-80px)] flex items-center bg-zinc-900">
            <div className="absolute inset-0 bg-cover bg-center opacity-10 transition-all duration-1000" style={{ backgroundImage: `url('${backgroundImage}')` }}></div>
            <div className="absolute inset-0 bg-gradient-to-r from-zinc-900 via-zinc-900/80 to-transparent"></div>
            
            <div className="max-w-[1200px] mx-auto px-6 relative z-10 flex">
                <div className="flex items-center justify-center">
                     <h1 className="text-lime-400 font-black text-6xl md:text-8xl uppercase [writing-mode:vertical-rl] transform -rotate-180 whitespace-nowrap select-none opacity-10">
                        Trans Gonçalves
                    </h1>
                </div>

                <div className="flex-1 flex flex-col justify-center items-start pl-8 md:pl-16">
                    <div className="relative border-l-4 border-lime-400 pl-6 py-2">
                        <span className="absolute -top-4 -left-1 text-7xl text-lime-400/20 font-black select-none">“</span>
                        <h2 className="text-4xl md:text-6xl lg:text-7xl font-black uppercase text-white tracking-tighter leading-none">
                            Locação de Munck e Guincho
                        </h2>
                        <p className="text-lg md:text-2xl text-gray-300 mt-2">
                            Soluções em transporte e içamento.
                        </p>
                    </div>

                    <p className="max-w-xl text-gray-400 mt-8 text-lg">
                        Serviço 24 horas para transporte de veículos, máquinas e equipamentos pesados em São Paulo e região. Segurança e agilidade que você pode confiar.
                    </p>
                    
                    <a
                        href={whatsappLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-10 bg-lime-400 text-zinc-900 font-bold py-4 px-10 rounded-lg text-lg hover:bg-lime-300 transition-all duration-300 transform hover:scale-105 shadow-lg shadow-lime-500/20"
                    >
                        Solicitar um Orçamento Agora
                    </a>
                </div>
            </div>
        </section>
    );
};

export default Hero;