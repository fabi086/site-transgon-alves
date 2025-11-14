import React, { useState, useEffect } from 'react';

interface ImageData {
  src: string;
  alt: string;
}

interface AboutData {
  title: string;
  paragraphs: string[];
  image: ImageData;
}

interface Testimonial {
  name: string;
  role: string;
  text: string;
  rating: number;
}

interface FaqItem {
  question: string;
  answer: string;
}

interface DbData {
  heroBackgroundImage: string;
  galleryImages: ImageData[];
  aboutSection: AboutData;
  testimonials: Testimonial[];
  faq: FaqItem[];
}

const AdminPage: React.FC = () => {
  const [editedData, setEditedData] = useState<DbData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [generatedJson, setGeneratedJson] = useState<string>('');
  const [copySuccess, setCopySuccess] = useState<string>('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/db.json?' + new Date().getTime());
        if (!response.ok) {
          throw new Error('Não foi possível carregar o arquivo db.json.');
        }
        const dbData: DbData = await response.json();
        setEditedData(dbData);
      } catch (e: any) {
        setError(e.message);
      }
    };
    fetchData();
  }, []);
  
  const handleValueChange = (path: (string | number)[], value: any) => {
    setEditedData(prevData => {
        if (!prevData) return null;
        const newData = JSON.parse(JSON.stringify(prevData)); // Deep copy
        let current = newData;
        for (let i = 0; i < path.length - 1; i++) {
            current = current[path[i]];
        }
        current[path[path.length - 1]] = value;
        return newData;
    });
  };

  const addTestimonial = () => {
    if (editedData) {
      const newTestimonials = [...editedData.testimonials, { name: "Novo Nome", role: "Nova Função", text: "Novo depoimento.", rating: 5 }];
      setEditedData({ ...editedData, testimonials: newTestimonials });
    }
  };

  const removeTestimonial = (index: number) => {
    if (editedData) {
      const newTestimonials = editedData.testimonials.filter((_, i) => i !== index);
      setEditedData({ ...editedData, testimonials: newTestimonials });
    }
  };
  
  const addFaq = () => {
     if (editedData) {
      const newFaqs = [...editedData.faq, { question: "Nova Pergunta?", answer: "Nova resposta." }];
      setEditedData({ ...editedData, faq: newFaqs });
    }
  };

  const removeFaq = (index: number) => {
    if (editedData) {
      const newFaqs = editedData.faq.filter((_, i) => i !== index);
      setEditedData({ ...editedData, faq: newFaqs });
    }
  };


  const handleGenerateJson = () => {
    if (editedData) {
      const jsonString = JSON.stringify(editedData, null, 2);
      setGeneratedJson(jsonString);
      setCopySuccess('');
    }
  };

  const handleCopyJson = () => {
    if (generatedJson) {
      navigator.clipboard.writeText(generatedJson).then(() => {
        setCopySuccess('Copiado!');
        setTimeout(() => setCopySuccess(''), 2000);
      }, (err) => {
        setCopySuccess('Falha ao copiar!');
      });
    }
  };

  return (
    <div className="max-w-[1200px] mx-auto px-6 py-12">
       <div className="mb-8 text-center">
        <h1 className="text-4xl font-black text-lime-400 uppercase tracking-tighter">Painel Administrativo</h1>
        <p className="text-lg text-gray-400 mt-2">Gerencie o conteúdo do seu site de forma visual.</p>
        <a href="/#/" className="text-lime-400 hover:text-lime-300 mt-4 inline-block">&larr; Voltar para o site</a>
      </div>
      
      <div className="bg-zinc-800 p-8 rounded-lg border border-zinc-700 mb-12">
        <h2 className="text-2xl font-bold text-white mb-4">Como Atualizar o Conteúdo</h2>
        <ol className="list-decimal list-inside space-y-3 text-gray-300">
            <li>Altere os textos ou links nos campos abaixo. Para listas (Avaliações, Dúvidas), você pode adicionar ou remover itens.</li>
            <li>Clique no botão verde "Gerar Código de Atualização".</li>
            <li>Clique em "Copiar Código".</li>
            <li>Abra o arquivo <code className="bg-zinc-900 text-lime-400 px-2 py-1 rounded">db.json</code>, apague TODO o conteúdo antigo e cole o novo código.</li>
            <li>Salve e publique o site novamente para ver as alterações.</li>
        </ol>
      </div>
      
      {error && <div className="bg-red-500/20 border border-red-500 text-red-300 p-4 rounded-lg">{error}</div>}
      {!editedData && !error && <div className="text-center text-gray-400">Carregando editor...</div>}

      {editedData && (
        <>
        <div className="space-y-16">
            {/* Hero Background Editor */}
            <div>
              <h3 className="text-2xl font-bold text-lime-400 mb-4 border-l-4 border-lime-400 pl-4">Imagem de Fundo (Principal)</h3>
              <div className="bg-zinc-800 p-4 rounded-lg grid md:grid-cols-2 gap-4 items-center">
                <img src={editedData.heroBackgroundImage} alt="Pré-visualização" className="rounded-md max-h-64 w-full object-cover"/>
                 <input type="text" value={editedData.heroBackgroundImage} onChange={(e) => handleValueChange(['heroBackgroundImage'], e.target.value)} className="w-full bg-zinc-900 border border-zinc-700 rounded-md p-2 text-gray-200 focus:ring-lime-400 focus:border-lime-400"/>
              </div>
            </div>

            {/* About Section Editor */}
            <div>
              <h3 className="text-2xl font-bold text-lime-400 mb-4 border-l-4 border-lime-400 pl-4">Seção "Sobre Nós"</h3>
              <div className="bg-zinc-800 p-6 rounded-lg space-y-4">
                  <input type="text" value={editedData.aboutSection.title} onChange={(e) => handleValueChange(['aboutSection', 'title'], e.target.value)} className="w-full bg-zinc-900 border border-zinc-700 rounded-md p-2 text-gray-200 font-bold"/>
                  <textarea value={editedData.aboutSection.paragraphs.join('\n\n')} onChange={(e) => handleValueChange(['aboutSection', 'paragraphs'], e.target.value.split('\n\n'))} rows={4} className="w-full bg-zinc-900 border border-zinc-700 rounded-md p-2 text-gray-200"/>
                  <img src={editedData.aboutSection.image.src} alt="Pré-visualização" className="rounded-md max-h-64 w-full object-cover"/>
                  <input type="text" value={editedData.aboutSection.image.src} onChange={(e) => handleValueChange(['aboutSection', 'image', 'src'], e.target.value)} className="w-full bg-zinc-900 border border-zinc-700 rounded-md p-2 text-gray-200"/>
              </div>
            </div>

            {/* Gallery Images Editor */}
            <div>
              <h3 className="text-2xl font-bold text-lime-400 mb-4 border-l-4 border-lime-400 pl-4">Galeria de Fotos</h3>
              <div className="space-y-6">
                {editedData.galleryImages.map((image, index) => (
                   <div key={index} className="bg-zinc-800 p-4 rounded-lg grid md:grid-cols-2 gap-6 items-center">
                        <img src={image.src} alt={image.alt} className="rounded-md w-full h-48 object-cover"/>
                        <div className="space-y-3">
                            <input type="text" value={image.src} onChange={(e) => handleValueChange(['galleryImages', index, 'src'], e.target.value)} className="w-full bg-zinc-900 border border-zinc-700 rounded-md p-2 text-gray-200" />
                            <input type="text" value={image.alt} onChange={(e) => handleValueChange(['galleryImages', index, 'alt'], e.target.value)} className="w-full bg-zinc-900 border border-zinc-700 rounded-md p-2 text-gray-200" />
                        </div>
                   </div>
                ))}
              </div>
            </div>
            
            {/* Testimonials Editor */}
            <div>
                <h3 className="text-2xl font-bold text-lime-400 mb-4 border-l-4 border-lime-400 pl-4">Avaliações de Clientes</h3>
                <div className="space-y-4">
                    {editedData.testimonials.map((item, index) => (
                        <div key={index} className="bg-zinc-800 p-4 rounded-lg space-y-2 relative">
                            <input type="text" value={item.name} onChange={(e) => handleValueChange(['testimonials', index, 'name'], e.target.value)} placeholder="Nome" className="w-full bg-zinc-900 border border-zinc-700 rounded-md p-2 font-bold"/>
                            <input type="text" value={item.role} onChange={(e) => handleValueChange(['testimonials', index, 'role'], e.target.value)} placeholder="Função" className="w-full bg-zinc-900 border border-zinc-700 rounded-md p-2 text-sm"/>
                            <textarea value={item.text} onChange={(e) => handleValueChange(['testimonials', index, 'text'], e.target.value)} placeholder="Depoimento" rows={3} className="w-full bg-zinc-900 border border-zinc-700 rounded-md p-2"/>
                            <input type="number" value={item.rating} onChange={(e) => handleValueChange(['testimonials', index, 'rating'], parseInt(e.target.value, 10))} min="1" max="5" className="w-full bg-zinc-900 border border-zinc-700 rounded-md p-2"/>
                            <button onClick={() => removeTestimonial(index)} className="absolute top-2 right-2 bg-red-600 hover:bg-red-700 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold">&times;</button>
                        </div>
                    ))}
                </div>
                <button onClick={addTestimonial} className="mt-4 bg-lime-500/20 hover:bg-lime-500/40 text-lime-300 font-semibold py-2 px-4 rounded-lg">+ Adicionar Avaliação</button>
            </div>
            
            {/* FAQ Editor */}
            <div>
                <h3 className="text-2xl font-bold text-lime-400 mb-4 border-l-4 border-lime-400 pl-4">Dúvidas Frequentes (FAQ)</h3>
                <div className="space-y-4">
                    {editedData.faq.map((item, index) => (
                         <div key={index} className="bg-zinc-800 p-4 rounded-lg space-y-2 relative">
                            <input type="text" value={item.question} onChange={(e) => handleValueChange(['faq', index, 'question'], e.target.value)} placeholder="Pergunta" className="w-full bg-zinc-900 border border-zinc-700 rounded-md p-2 font-bold"/>
                            <textarea value={item.answer} onChange={(e) => handleValueChange(['faq', index, 'answer'], e.target.value)} placeholder="Resposta" rows={3} className="w-full bg-zinc-900 border border-zinc-700 rounded-md p-2"/>
                            <button onClick={() => removeFaq(index)} className="absolute top-2 right-2 bg-red-600 hover:bg-red-700 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold">&times;</button>
                        </div>
                    ))}
                </div>
                <button onClick={addFaq} className="mt-4 bg-lime-500/20 hover:bg-lime-500/40 text-lime-300 font-semibold py-2 px-4 rounded-lg">+ Adicionar Pergunta</button>
            </div>
        </div>

        <div className="mt-16 text-center">
            <button
                onClick={handleGenerateJson}
                className="bg-lime-500 text-zinc-900 font-bold py-3 px-8 rounded-lg text-lg hover:bg-lime-400 transition-all duration-300 transform hover:scale-105"
            >
                Gerar Código de Atualização
            </button>
        </div>

        {generatedJson && (
            <div className="mt-8 bg-zinc-800 p-6 rounded-lg">
                <h3 className="text-lg font-bold text-white mb-2">Código Gerado</h3>
                <p className="text-gray-400 mb-4">Copie este código e cole no seu arquivo <code className="bg-zinc-900 text-lime-400 px-2 py-1 rounded">db.json</code>.</p>
                <div className="relative">
                    <pre className="bg-zinc-900 text-white p-4 rounded-md overflow-x-auto max-h-96"><code>{generatedJson}</code></pre>
                    <button onClick={handleCopyJson} className="absolute top-2 right-2 bg-zinc-700 hover:bg-zinc-600 text-white text-sm font-semibold py-1 px-3 rounded-md transition-colors">
                       {copySuccess ? copySuccess : 'Copiar Código'}
                    </button>
                </div>
            </div>
        )}
        </>
      )}
    </div>
  );
};

export default AdminPage;