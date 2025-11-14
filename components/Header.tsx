import React, { useState } from 'react';

const HookIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w.org/2000/svg" className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M18 4v7a6 6 0 1 1-12 0V4"/>
        <circle cx="12" cy="4" r="2"/>
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

    // Simplified navigation links
    const navLinks = [
        { href: '#services', label: 'Serviços' },
        { href: '#about', label: 'Sobre Nós' },
        { href: '#contact', label: 'Contato' },
    ];

    const handleLinkClick = (href: string) => {
        setIsMenuOpen(false);
        // This part is handled by the browser's native anchor link behavior
    };

    return (
        <header className="bg-zinc-900/80 backdrop-blur-sm sticky top-0 z-50">
            <div className="max-w-[1200px] mx-auto px-6 py-4 flex justify-between items-center">
                
                {/* Left: Logo */}
                <div className="flex-1 flex justify-start">
                    <a href="/#/" className="flex items-center gap-3 z-50" aria-label="Trans Gonçalves - Página Inicial">
                        <HookIcon className="w-8 h-8 text-lime-400" />
                        <span className="text-2xl font-bold tracking-tighter text-white">
                            TG
                        </span>
                    </a>
                </div>

                {/* Center: Desktop Nav */}
                <nav className="hidden md:flex items-center gap-8">
                    {navLinks.map(link => (
                         <a key={link.href} href={link.href} className="text-gray-300 hover:text-lime-400 transition-colors duration-300 font-medium text-lg">
                            {link.label}
                        </a>
                    ))}
                </nav>

                {/* Right: CTA & Mobile Menu Button */}
                <div className="flex-1 flex justify-end items-center">
                    <a 
                        href={whatsappLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hidden md:block bg-lime-400 text-zinc-900 font-bold py-2 px-6 rounded-lg hover:bg-lime-300 transition-colors duration-300 transform hover:scale-105"
                    >
                        Orçamento Rápido
                    </a>

                    {/* Mobile Menu Button */}
                    <div className="md:hidden z-50">
                        <button onClick={() => setIsMenuOpen(!isMenuOpen)} aria-label="Abrir menu">
                            {isMenuOpen ? <XIcon className="w-8 h-8 text-white" /> : <MenuIcon className="w-8 h-8 text-white" />}
                        </button>
                    </div>
                </div>


                 {/* Mobile Nav */}
                <div className={`fixed top-0 left-0 w-full h-screen bg-zinc-900 transition-transform duration-300 ease-in-out transform ${isMenuOpen ? 'translate-x-0' : '-translate-x-full'} md:hidden`}>
                    <nav className="flex flex-col items-center justify-center h-full gap-8">
                        {navLinks.map(link => (
                            <a 
                                key={link.href} 
                                href={link.href} 
                                className="text-3xl font-bold text-gray-300 hover:text-lime-400 transition-colors duration-300"
                                onClick={() => handleLinkClick(link.href)}
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