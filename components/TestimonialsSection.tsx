import React, { useState, useEffect } from 'react';

interface Testimonial {
  name: string;
  role: string;
  text: string;
  rating: number;
}

const StarIcon: React.FC<{ filled: boolean }> = ({ filled }) => (
    <svg className={`w-5 h-5 ${filled ? 'text-yellow-400' : 'text-gray-600'}`} fill="currentColor" viewBox="0 0 20 20">
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.959a1 1 0 00.95.69h4.168c.969 0 1.371 1.24.588 1.81l-3.37 2.446a1 1 0 00-.364 1.118l1.287 3.959c.3.921-.755 1.688-1.54 1.118l-3.37-2.446a1 1 0 00-1.175 0l-3.37 2.446c-.784.57-1.838-.197-1.539-1.118l1.287-3.959a1 1 0 00-.364-1.118L2.05 9.386c-.783-.57-.38-1.81.588-1.81h4.168a1 1 0 00.95-.69L9.049 2.927z" />
    </svg>
);

const TestimonialsSection: React.FC = () => {
    const [testimonials, setTestimonials] = useState<Testimonial[]>([]);

    useEffect(() => {
        fetch('/db.json')
            .then(res => res.json())
            .then(data => setTestimonials(data.testimonials || []))
            .catch(err => console.error("Failed to load testimonials:", err));
    }, []);

    const renderStars = (rating: number) => {
        return Array.from({ length: 5 }, (_, i) => <StarIcon key={i} filled={i < rating} />);
    };

    if (!testimonials.length) return null;

    return (
        <section id="testimonials" className="py-20 bg-zinc-800">
            <div className="max-w-[1200px] mx-auto px-6">
                 <div className="text-center mb-12">
                    <h2 className="text-4xl font-black text-white uppercase tracking-tighter">O que Nossos Clientes Dizem</h2>
                    <p className="text-lg text-gray-400 mt-2 max-w-2xl mx-auto">Confiança e satisfação a cada serviço prestado.</p>
                </div>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {testimonials.map((testimonial, index) => (
                        <div key={index} className="bg-zinc-900 p-8 rounded-lg flex flex-col">
                            <div className="flex mb-4">{renderStars(testimonial.rating)}</div>
                            <blockquote className="text-gray-300 italic mb-6 flex-grow">"{testimonial.text}"</blockquote>
                            <div>
                                <p className="font-bold text-white text-lg">{testimonial.name}</p>
                                <p className="text-lime-400 text-sm">{testimonial.role}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default TestimonialsSection;