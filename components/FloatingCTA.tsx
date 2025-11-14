
import React from 'react';

const WhatsAppIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="currentColor">
        <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.894 11.892-1.99 0-3.903-.52-5.687-1.475L.057 24zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.886-.001 2.267.655 4.398 1.803 6.243l.494.882-1.144 4.155 4.272-1.122.833.491z"/>
    </svg>
);

const FloatingCTA: React.FC = () => {
    const phoneNumber = "5511941810939";
    const whatsappLink = `https://wa.me/${phoneNumber}?text=${encodeURIComponent("Olá! Preciso de um orçamento.")}`;
    
    return (
        <a 
            href={whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="fixed bottom-6 right-6 bg-green-500 w-16 h-16 rounded-full flex items-center justify-center text-white shadow-xl hover:bg-green-600 transition-all duration-300 transform hover:scale-110 z-50 group"
            aria-label="Fale conosco no WhatsApp"
        >
            <WhatsAppIcon className="w-9 h-9" />
            <span className="absolute -left-4 top-1/2 -translate-y-1/2 -translate-x-full bg-zinc-700 text-white text-sm rounded-md px-3 py-1 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                WhatsApp
            </span>
        </a>
    );
};

export default FloatingCTA;
