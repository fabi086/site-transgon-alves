import React, { useState, FormEvent } from 'react';

const WhatsAppIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="currentColor">
        <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.894 11.892-1.99 0-3.903-.52-5.687-1.475L.057 24zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.886-.001 2.267.655 4.398 1.803 6.243l.494.882-1.144 4.155 4.272-1.122.833.491z"/>
    </svg>
);

interface FormState {
    name: string;
    email: string;
    phone: string;
    message: string;
}

interface FormErrors {
    name?: string;
    email?: string;
    message?: string;
}

const ContactFooter: React.FC = () => {
    const [formData, setFormData] = useState<FormState>({ name: '', email: '', phone: '', message: '' });
    const [errors, setErrors] = useState<FormErrors>({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitSuccess, setSubmitSuccess] = useState(false);

    const phoneNumber = "5511941810939";
    const whatsappLink = `https://wa.me/${phoneNumber}?text=${encodeURIComponent("Olá! Gostaria de mais informações.")}`;

    const validateForm = (): FormErrors => {
        const newErrors: FormErrors = {};
        if (!formData.name.trim()) newErrors.name = 'O nome é obrigatório.';
        if (!formData.email.trim()) {
            newErrors.email = 'O email é obrigatório.';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'O formato do email é inválido.';
        }
        if (!formData.message.trim()) newErrors.message = 'A mensagem é obrigatória.';
        return newErrors;
    };

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        const validationErrors = validateForm();
        setErrors(validationErrors);

        if (Object.keys(validationErrors).length === 0) {
            setIsSubmitting(true);
            setSubmitSuccess(false);
            // Simulate API call
            setTimeout(() => {
                setIsSubmitting(false);
                setSubmitSuccess(true);
                setFormData({ name: '', email: '', phone: '', message: '' });
                setTimeout(() => setSubmitSuccess(false), 5000);
            }, 1500);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    return (
        <footer id="contact" className="bg-zinc-800 border-t-4 border-lime-400">
            <div className="max-w-[1200px] mx-auto px-6 py-16">
                <div className="grid md:grid-cols-2 gap-12">
                    <div>
                        <h2 className="text-4xl font-black text-white uppercase tracking-tighter">Entre em Contato</h2>
                        <p className="text-lg text-gray-400 mt-4 mb-8">
                            Pronto para começar? Fale conosco para um orçamento rápido e sem compromisso.
                        </p>
                        <div className="space-y-4">
                            <p className="text-xl text-gray-300">
                                <strong>Telefone / WhatsApp:</strong>
                                <a href={whatsappLink} target="_blank" rel="noopener noreferrer" className="ml-2 text-lime-400 hover:text-lime-300 transition-colors">(11) 94181-0939</a>
                            </p>
                            <p className="text-lg text-gray-400">
                                <strong>Atendimento:</strong> 24 horas, 7 dias por semana
                            </p>
                            <a 
                                href={whatsappLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-3 bg-green-500 text-white font-bold py-3 px-6 rounded-lg hover:bg-green-600 transition-colors duration-300 transform hover:scale-105"
                            >
                                <WhatsAppIcon className="w-6 h-6" />
                                Chamar no WhatsApp
                            </a>
                        </div>
                    </div>
                    <div>
                        <form onSubmit={handleSubmit} noValidate className="space-y-4">
                            <div>
                                <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-1">Nome</label>
                                <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} className="w-full bg-zinc-900 border border-zinc-700 rounded-md p-3 text-gray-200 focus:ring-lime-400 focus:border-lime-400" required />
                                {errors.name && <p className="text-red-400 text-sm mt-1">{errors.name}</p>}
                            </div>
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">Email</label>
                                <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} className="w-full bg-zinc-900 border border-zinc-700 rounded-md p-3 text-gray-200 focus:ring-lime-400 focus:border-lime-400" required />
                                {errors.email && <p className="text-red-400 text-sm mt-1">{errors.email}</p>}
                            </div>
                            <div>
                                <label htmlFor="phone" className="block text-sm font-medium text-gray-300 mb-1">Telefone (Opcional)</label>
                                <input type="tel" id="phone" name="phone" value={formData.phone} onChange={handleChange} className="w-full bg-zinc-900 border border-zinc-700 rounded-md p-3 text-gray-200 focus:ring-lime-400 focus:border-lime-400" />
                            </div>
                            <div>
                                <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-1">Mensagem</label>
                                <textarea id="message" name="message" value={formData.message} onChange={handleChange} rows={4} className="w-full bg-zinc-900 border border-zinc-700 rounded-md p-3 text-gray-200 focus:ring-lime-400 focus:border-lime-400" required></textarea>
                                {errors.message && <p className="text-red-400 text-sm mt-1">{errors.message}</p>}
                            </div>
                            <div>
                                <button type="submit" disabled={isSubmitting} className="w-full bg-lime-400 text-zinc-900 font-bold py-3 px-6 rounded-lg hover:bg-lime-300 transition-colors duration-300 disabled:bg-zinc-700 disabled:cursor-not-allowed">
                                    {isSubmitting ? 'Enviando...' : 'Enviar Mensagem'}
                                </button>
                            </div>
                            {submitSuccess && <p className="text-green-400 text-center font-semibold mt-2">Mensagem enviada com sucesso! Entraremos em contato em breve.</p>}
                        </form>
                    </div>
                </div>
            </div>
            <div className="bg-zinc-900 py-4 border-t border-zinc-700">
                <div className="max-w-[1200px] mx-auto px-6 text-center text-gray-500 text-sm flex justify-between items-center">
                   <p>&copy; {new Date().getFullYear()} Trans Gonçalves. Todos os direitos reservados.</p>
                   <a href="/#/admin" className="hover:text-lime-400 transition-colors">Admin</a>
                </div>
            </div>
        </footer>
    );
};

export default ContactFooter;
