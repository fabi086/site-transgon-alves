
import React, { useState, useEffect } from 'react';

interface ImageData {
  src: string;
  alt: string;
}

interface DbData {
  heroBackgroundImage: string;
  galleryImages: ImageData[];
}

const AdminPage: React.FC = () => {
  const [editedData, setEditedData] = useState<DbData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [generatedJson, setGeneratedJson] = useState<string>('');
  const [copySuccess, setCopySuccess] = useState<string>('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Appending a timestamp to bypass browser cache for db.json
        const response = await fetch('/db.json?' + new Date().getTime());
        if (!response.ok) {
          throw new Error('Não foi possível carregar o arquivo db.json. Verifique se ele existe na raiz do projeto.');
        }
        const dbData: DbData = await response.json();
        setEditedData(dbData);
      } catch (e: any) {
        setError(e.message);
      }
    };
    fetchData();
  }, []);
  
  const handleHeroChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (editedData) {
      setEditedData({ ...editedData, heroBackgroundImage: e.target.value });
    }
  };

  const handleGalleryChange = (index: number, field: keyof ImageData, value: string) => {
    if (editedData) {
      const newGalleryImages = [...editedData.galleryImages];
      newGalleryImages[index] = { ...newGalleryImages[index], [field]: value };
      setEditedData({ ...editedData, galleryImages: newGalleryImages });
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
        console.error('Could not copy text: ', err);
      });
    }
  };

  return (
    <div className="container mx-auto px-6 py-12">
       <div className="mb-8 text-center">
        <h1 className="text-4xl font-black text-lime-400 uppercase tracking-tighter">Painel Administrativo</h1>
        <p className="text-lg text-gray-400 mt-2">Gerencie as imagens do seu site de forma visual.</p>
        <a href="/#/" className="text-lime-400 hover:text-lime-300 mt-4 inline-block">&larr; Voltar para o site</a>
      </div>
      
      <div className="bg-zinc-800 p-8 rounded-lg border border-zinc-700 mb-12">
        <h2 className="text-2xl font-bold text-white mb-4">Como Atualizar as Imagens</h2>
        <div className="space-y-4 text-gray-300">
          <ol className="list-decimal list-inside space-y-3">
            <li>
              <strong>Faça o upload da sua nova imagem:</strong> Use um serviço gratuito como o <a href="https://imgur.com/upload" target="_blank" rel="noopener noreferrer" className="text-lime-400 underline">Imgur</a> e copie o "Direct Link" da imagem (deve terminar com .jpg, .png, etc.).
            </li>
            <li>
              <strong>Cole o novo link:</strong> Role para baixo e cole o novo link no campo de texto correspondente à imagem que você quer alterar. A pré-visualização será atualizada na hora.
            </li>
            <li>
              <strong>Gere e copie o código:</strong> Após fazer suas alterações, clique no botão verde "Gerar Código de Atualização". Em seguida, clique em "Copiar Código".
            </li>
            <li>
              <strong>Atualize o arquivo <code className="bg-zinc-900 text-lime-400 px-2 py-1 rounded">db.json</code>:</strong> Abra o arquivo no seu editor, apague TODO o conteúdo antigo e cole o novo código que você copiou.
            </li>
             <li>
              <strong>Salve e publique novamente:</strong> Envie a nova versão do site para sua hospedagem. As novas imagens estarão no ar!
            </li>
          </ol>
        </div>
      </div>
      
      {error && <div className="bg-red-500/20 border border-red-500 text-red-300 p-4 rounded-lg">{error}</div>}
      {!editedData && !error && <div className="text-center text-gray-400">Carregando editor...</div>}

      {editedData && (
        <>
        <div className="space-y-12">
            {/* Hero Background Editor */}
            <div>
              <h3 className="text-xl font-bold text-lime-400 mb-4">Imagem de Fundo (Principal)</h3>
              <div className="bg-zinc-800 p-4 rounded-lg grid md:grid-cols-2 gap-4 items-center">
                <img src={editedData.heroBackgroundImage} alt="Pré-visualização" className="rounded-md max-h-64 w-full object-cover"/>
                <div>
                    <label htmlFor="hero-bg" className="block text-sm font-medium text-gray-300 mb-1">URL da Imagem</label>
                    <input 
                        type="text"
                        id="hero-bg"
                        value={editedData.heroBackgroundImage}
                        onChange={handleHeroChange}
                        className="w-full bg-zinc-900 border border-zinc-700 rounded-md p-2 text-gray-200 focus:ring-lime-400 focus:border-lime-400"
                    />
                </div>
              </div>
            </div>

            {/* Gallery Images Editor */}
            <div>
              <h3 className="text-xl font-bold text-lime-400 mb-4">Galeria de Fotos ("Nossa Frota")</h3>
              <div className="space-y-6">
                {editedData.galleryImages.map((image, index) => (
                   <div key={index} className="bg-zinc-800 p-4 rounded-lg grid md:grid-cols-2 gap-6 items-center">
                        <img src={image.src} alt={image.alt} className="rounded-md w-full h-48 object-cover"/>
                        <div className="space-y-3">
                             <div>
                                <label htmlFor={`gallery-src-${index}`} className="block text-sm font-medium text-gray-300 mb-1">URL da Imagem</label>
                                <input 
                                    type="text"
                                    id={`gallery-src-${index}`}
                                    value={image.src}
                                    onChange={(e) => handleGalleryChange(index, 'src', e.target.value)}
                                    className="w-full bg-zinc-900 border border-zinc-700 rounded-md p-2 text-gray-200 focus:ring-lime-400 focus:border-lime-400"
                                />
                            </div>
                             <div>
                                <label htmlFor={`gallery-alt-${index}`} className="block text-sm font-medium text-gray-300 mb-1">Texto Alternativo (Descrição)</label>
                                <input 
                                    type="text"
                                    id={`gallery-alt-${index}`}
                                    value={image.alt}
                                    onChange={(e) => handleGalleryChange(index, 'alt', e.target.value)}
                                    className="w-full bg-zinc-900 border border-zinc-700 rounded-md p-2 text-gray-200 focus:ring-lime-400 focus:border-lime-400"
                                />
                            </div>
                        </div>
                   </div>
                ))}
              </div>
            </div>
        </div>

        <div className="mt-12 text-center">
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
                    <pre className="bg-zinc-900 text-white p-4 rounded-md overflow-x-auto max-h-96">
                        <code>{generatedJson}</code>
                    </pre>
                    <button
                        onClick={handleCopyJson}
                        className="absolute top-2 right-2 bg-zinc-700 hover:bg-zinc-600 text-white text-sm font-semibold py-1 px-3 rounded-md transition-colors"
                    >
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
