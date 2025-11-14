import React from 'react';

const WhatsAppIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="currentColor">
        <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.894 11.892-1.99 0-3.903-.52-5.687-1.475L.057 24zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.886-.001 2.267.655 4.398 1.803 6.243l.494.882-1.144 4.155 4.272-1.122.833.491z"/>
    </svg>
);

const ContactFooter: React.FC = () => {
    const phoneNumber = "5511941810939";
    const displayPhoneNumber = "(11) 94181-0939";
    const whatsappLink = `https://wa.me/${phoneNumber}?text=${encodeURIComponent("Olá! Vi seu site e gostaria de um orçamento.")}`;
    const year = new Date().getFullYear();

    return (
        <footer id="contact" className="bg-zinc-800 border-t-4 border-lime-400">
            <div className="container mx-auto px-6 py-16 text-center">
                <h2 className="text-4xl font-black text-white uppercase tracking-tighter">Precisa de Ajuda?</h2>
                <p className="text-lg text-gray-400 mt-2">Entre em contato conosco agora mesmo. Atendimento 24 horas!</p>
                
                <div className="my-10">
                    <p className="text-gray-300 text-xl">Ligue ou chame no WhatsApp:</p>
                    <a href={`tel:${displayPhoneNumber.replace(/\D/g, '')}`} className="text-4xl md:text-6xl font-black text-lime-400 my-2 inline-block hover:text-lime-300 transition-colors">
                        {displayPhoneNumber}
                    </a>
                </div>

                <a 
                    href={whatsappLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-4 bg-green-500 text-white font-bold py-4 px-10 rounded-lg text-lg hover:bg-green-600 transition-all duration-300 transform hover:scale-105 shadow-lg shadow-green-500/30"
                >
                    <WhatsAppIcon className="w-8 h-8" />
                    <span>Chamar no WhatsApp</span>
                </a>

                <p className="text-gray-500 mt-12">Atendemos toda São Paulo e Grande São Paulo.</p>
            </div>
            <div className="bg-zinc-900 py-4">
                <div className="container mx-auto px-6 text-center text-gray-500 text-sm">
                    <p>&copy; {year} Trans Gonçalves - Munck e Guincho. Todos os direitos reservados.</p>
                    <a href="/admin" className="text-zinc-700 hover:text-zinc-600 transition-colors text-xs mt-2 inline-block">Admin</a>
                </div>
            </div>
        </footer>
    );
};

export default ContactFooter;