import React, { useState, useEffect } from 'react';

interface AboutData {
  title: string;
  paragraphs: string[];
  image: {
    src: string;
    alt: string;
  };
}

const AboutSection: React.FC = () => {
    const [data, setData] = useState<AboutData | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('/db.json')
            .then(res => res.json())
            .then(dbData => {
                setData(dbData.aboutSection);
                setLoading(false);
            })
            .catch(err => {
                console.error("Failed to load about section data:", err);
                setLoading(false);
            });
    }, []);

    if (loading) return <div className="text-center py-20">Carregando...</div>;
    if (!data) return null;

    return (
        <section id="about" className="py-20 bg-zinc-900">
            <div className="max-w-[1200px] mx-auto px-6">
                <div className="grid md:grid-cols-2 gap-12 items-center">
                    <div className="order-2 md:order-1">
                        <h2 className="text-4xl font-black text-white uppercase tracking-tighter mb-6">{data.title}</h2>
                        <div className="space-y-4 text-gray-400 text-lg">
                           {data.paragraphs.map((p, i) => <p key={i}>{p}</p>)}
                        </div>
                    </div>
                    <div className="order-1 md:order-2">
                        <img 
                            src={data.image.src} 
                            alt={data.image.alt}
                            className="rounded-lg shadow-xl w-full h-auto object-cover"
                            loading="lazy"
                        />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AboutSection;