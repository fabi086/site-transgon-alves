import React from 'react';

const TowingIcon = ({ className = '' }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M2 17h14v-5H2v5zm0 0l-2-5h20l-2 5H2z" />
        <path d="M6 17v-5" />
        <path d="M18 17v-5" />
        <path d="M4 12V7h16v5" />
        <path d="M22 17H12l-2-5h12l-2 5z" />
        <path d="M14 12V7" />
        <circle cx="6" cy="19" r="2" />
        <circle cx="18" cy="19" r="2" />
    </svg>
);

const MachineryIcon = ({ className = '' }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M2 22h20" />
        <path d="M14 18v-4h-4v4h4z" />
        <path d="M4 18h6v-6H4v6zm10 0h6v-6h-6v6zM7 12V6l5-4 5 4v6" />
        <path d="M12 12V2" />
    </svg>
);

const CraneServiceIcon = ({ className = '' }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 18V6H2v12h20z" />
        <path d="M16 6V2h-8v4" />
        <path d="M2 18v-5l4 2v3H2z" />
        <path d="M22 18v-5l-4 2v3h4z" />
        <path d="M12 18v-5" />
        <path d="M10 13h4" />
        <path d="M14 13l4-4" />
        <path d="M10 13L6 9" />
    </svg>
);

const services = [
    {
        icon: <TowingIcon className="w-12 h-12 text-lime-400" />,
        title: "Guincho 24 Horas",
        description: "Socorro rápido e eficiente para veículos leves e pesados, a qualquer hora do dia ou da noite."
    },
    {
        icon: <MachineryIcon className="w-12 h-12 text-lime-400" />,
        title: "Transporte de Máquinas",
        description: "Transportamos máquinas industriais e equipamentos pesados com total segurança e pontualidade."
    },
    {
        icon: <CraneServiceIcon className="w-12 h-12 text-lime-400" />,
        title: "Serviços de Munck",
        description: "Içamento e movimentação de cargas diversas, montagem de estruturas e muito mais."
    }
];

const ServicesSection: React.FC = () => {
    return (
        <section id="services" className="py-20 bg-zinc-800">
            <div className="max-w-[1200px] mx-auto px-6">
                <div className="text-center mb-12">
                    <h2 className="text-4xl font-black text-white uppercase tracking-tighter">Nossos Serviços</h2>
                    <p className="text-lg text-gray-400 mt-2 max-w-2xl mx-auto">Oferecemos soluções completas para suas necessidades de transporte e içamento.</p>
                </div>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {services.map((service, index) => (
                        <div key={index} className="bg-zinc-900 p-8 rounded-lg border-t-4 border-lime-400 shadow-xl transform transition-transform duration-300 hover:-translate-y-2">
                            <div className="mb-4">{service.icon}</div>
                            <h3 className="text-2xl font-bold text-white mb-2">{service.title}</h3>
                            <p className="text-gray-400">{service.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default ServicesSection;