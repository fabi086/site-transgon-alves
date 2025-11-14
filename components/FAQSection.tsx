import React, { useState } from 'react';

const faqData = [
    {
        question: "Qual a área de atendimento da Trans Gonçalves?",
        answer: "Atendemos toda a cidade de São Paulo, Grande São Paulo e regiões próximas. Para localidades mais distantes, entre em contato para avaliarmos a disponibilidade."
    },
    {
        question: "Vocês funcionam 24 horas mesmo?",
        answer: "Sim! Nossa equipe está de prontidão 24 horas por dia, 7 dias por semana, incluindo feriados, para atender qualquer emergência com guincho ou necessidade de munck."
    },
    {
        question: "Que tipo de carga o caminhão munck pode içar?",
        answer: "Nossos caminhões munck são versáteis e podem içar uma grande variedade de cargas, como piscinas, caixas d'água, postes, contêineres, materiais de construção e auxiliar na montagem de estruturas metálicas."
    },
    {
        question: "Como posso solicitar um orçamento?",
        answer: "É muito simples! Você pode ligar para nosso número de telefone ou clicar em qualquer um dos botões de WhatsApp em nosso site para falar diretamente com nossa equipe e obter um orçamento rápido e sem compromisso."
    },
    {
        question: "O serviço de transporte de máquinas inclui seguro?",
        answer: "Sim, a segurança é nossa prioridade. Todos os nossos transportes são realizados com seguro para garantir a tranquilidade de nossos clientes e a proteção total do seu equipamento."
    }
];

const PlusIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <line x1="12" y1="5" x2="12" y2="19"></line>
        <line x1="5" y1="12" x2="19" y2="12"></line>
    </svg>
);


const FAQSection: React.FC = () => {
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    const toggleFAQ = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <section id="faq" className="py-20 bg-zinc-900">
            <div className="container mx-auto px-6">
                <div className="text-center mb-12">
                    <h2 className="text-4xl font-black text-white uppercase tracking-tighter">Dúvidas Frequentes</h2>
                    <p className="text-lg text-gray-400 mt-2 max-w-2xl mx-auto">Respostas para as perguntas mais comuns sobre nossos serviços.</p>
                </div>
                <div className="max-w-3xl mx-auto space-y-4">
                    {faqData.map((faq, index) => (
                        <div key={index} className="bg-zinc-800 rounded-lg">
                            <button 
                                onClick={() => toggleFAQ(index)}
                                className="w-full flex justify-between items-center text-left p-6"
                            >
                                <h3 className="text-xl font-semibold text-white">{faq.question}</h3>
                                <PlusIcon className={`w-6 h-6 text-lime-400 flex-shrink-0 faq-icon ${openIndex === index ? 'open' : ''}`} />
                            </button>
                            <div className={`faq-answer ${openIndex === index ? 'open' : ''}`}>
                                <p className="text-gray-400 px-6 pb-6">{faq.answer}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default FAQSection;