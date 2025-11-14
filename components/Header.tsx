
import React, { useState } from 'react';

const CraneIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2v4"/>
        <path d="M12 10v4"/>
        <path d="M12 18v2"/>
        <path d="M12 6H8.5a3.5 3.5 0 1 0 0 7H12"/>
        <path d="M12 6h2a4 4 0 0 1 4 4v0a4 4 0 0 1-4 4h-2"/>
        <path d="M12 14h-2a4 4 0 0 0-4 4v0a4 4 0 0 0 4 4h2"/>
        <path d="M12 14h6a2 2 0 0 1 2 2v0a2 2 0 0 1-2 2h-6"/>
        <path d="M15 10a3 3 0 1 0-6 0 3 3 0 0 0 6 0Z"/>
    </svg>
);

const MenuIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <line x1="3" y1="12" x2="21" y2="12"></line>
        <line x1="3" y1="6" x2="21" y2="6"></line>
        <line x1="3" y1="18" x2="21" y2="18"></line>
    </svg>
);

const XIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <line x1="18" y1="6" x2="6" y2="18"></line>
        <line x1="6" y1="6" x2="18" y2="18"></line>
    </svg>
);


const Header: React.FC = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const phoneNumber = "5511941810939";
    const whatsappLink = `https://wa.me/${phoneNumber}?text=${encodeURIComponent("Olá! Gostaria de solicitar um orçamento.")}`;

    const navLinks = [
        { href: '#services', label: 'Serviços' },
        { href: '#about', label: 'Sobre Nós' },
        { href: '#gallery', label: 'Nossa Frota' },
        { href: '#testimonials', label: 'Depoimentos' },
        { href: '#faq', label: 'Dúvidas' },
        { href: '#contact', label: 'Contato' },
    ];

    return (
        <header className="bg-zinc-900/80 backdrop-blur-sm sticky top-0 z-50">
            <div className="container mx-auto px-6 py-4 flex justify-between items-center">
                <a href="#" className="flex items-center gap-3 z-50">
                    <CraneIcon className="w-8 h-8 text-lime-400" />
                    <span className="text-2xl font-bold tracking-tighter text-white">
                        Trans Gonçalves
                    </span>
                </a>

                {/* Desktop Nav */}
                <nav className="hidden md:flex items-center gap-6">
                    {navLinks.map(link => (
                         <a key={link.href} href={link.href} className="text-gray-300 hover:text-lime-400 transition-colors duration-300 font-medium text-sm">
                            {link.label}
                        </a>
                    ))}
                    <a 
                        href={whatsappLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-lime-400 text-zinc-900 font-bold py-2 px-6 rounded-lg hover:bg-lime-300 transition-colors duration-300 transform hover:scale-105 ml-4"
                    >
                        Orçamento Rápido
                    </a>
                </nav>

                {/* Mobile Menu Button */}
                <div className="md:hidden z-50">
                    <button onClick={() => setIsMenuOpen(!isMenuOpen)} aria-label="Abrir menu">
                        {isMenuOpen ? <XIcon className="w-8 h-8 text-white" /> : <MenuIcon className="w-8 h-8 text-white" />}
                    </button>
                </div>

                 {/* Mobile Nav */}
                <div className={`fixed top-0 left-0 w-full h-screen bg-zinc-900 transition-transform duration-300 ease-in-out transform ${isMenuOpen ? 'translate-x-0' : '-translate-x-full'} md:hidden`}>
                    <nav className="flex flex-col items-center justify-center h-full gap-6">
                        {navLinks.map(link => (
                            <a 
                                key={link.href} 
                                href={link.href} 
                                className="text-2xl font-bold text-gray-300 hover:text-lime-400 transition-colors duration-300"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                {link.label}
                            </a>
                        ))}
                        <a 
                            href={whatsappLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="mt-8 bg-lime-400 text-zinc-900 font-bold py-4 px-10 rounded-lg text-xl hover:bg-lime-300 transition-colors duration-300 transform hover:scale-105"
                            onClick={() => setIsMenuOpen(false)}
                        >
                            Orçamento Rápido
                        </a>
                    </nav>
                </div>
            </div>
        </header>
    );
};

export default Header;