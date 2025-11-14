import React, { useState, useEffect } from 'react';

interface FaqItem {
  question: string;
  answer: string;
}

const ChevronDownIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
    </svg>
);

const FAQSection: React.FC = () => {
    const [faq, setFaq] = useState<FaqItem[]>([]);
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    useEffect(() => {
        fetch('/db.json')
            .then(res => res.json())
            .then(data => setFaq(data.faq || []))
            .catch(err => console.error("Failed to load FAQ:", err));
    }, []);

    const toggleFaq = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    if (!faq.length) return null;

    return (
        <section id="faq" className="py-20 bg-zinc-900">
            <div className="max-w-[1200px] mx-auto px-6">
                <div className="text-center mb-12">
                    <h2 className="text-4xl font-black text-white uppercase tracking-tighter">Dúvidas Frequentes</h2>
                    <p className="text-lg text-gray-400 mt-2 max-w-2xl mx-auto">Respostas para as perguntas mais comuns sobre nossos serviços.</p>
                </div>
                <div className="max-w-4xl mx-auto space-y-4">
                    {faq.map((item, index) => (
                        <div key={index} className="border-b-2 border-zinc-700">
                            <button
                                onClick={() => toggleFaq(index)}
                                className={`faq-question w-full flex justify-between items-center text-left py-4 ${openIndex === index ? 'open' : ''}`}
                            >
                                <span className="text-xl font-semibold text-white">{item.question}</span>
                                <ChevronDownIcon className={`faq-icon w-6 h-6 text-lime-400 ${openIndex === index ? 'rotate-180' : ''}`} />
                            </button>
                            <div className={`faq-answer text-gray-400 px-2`}>
                                {item.answer}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default FAQSection;