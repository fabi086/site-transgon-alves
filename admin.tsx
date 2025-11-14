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
  const [data, setData] = useState<DbData | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/db.json');
        if (!response.ok) {
          throw new Error('Não foi possível carregar o arquivo db.json. Verifique se ele existe na raiz do projeto.');
        }
        const dbData: DbData = await response.json();
        setData(dbData);
      } catch (e: any) {
        setError(e.message);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="container mx-auto px-6 py-12">
      <div className="mb-8 text-center">
        <h1 className="text-4xl font-black text-lime-400 uppercase tracking-tighter">Painel Administrativo</h1>
        <p className="text-lg text-gray-400 mt-2">Gerencie as imagens do seu site.</p>
        <a href="/" className="text-lime-400 hover:text-lime-300 mt-4 inline-block">&larr; Voltar para o site</a>
      </div>
      
      <div className="bg-zinc-800 p-8 rounded-lg border border-zinc-700">
        <h2 className="text-2xl font-bold text-white mb-4">Como Atualizar as Imagens</h2>
        <div className="space-y-4 text-gray-300">
          <p>Este painel é apenas para visualização. Para atualizar as imagens, você precisa editar diretamente o arquivo <code className="bg-zinc-900 text-lime-400 px-2 py-1 rounded">db.json</code> na raiz do seu projeto.</p>
          <ol className="list-decimal list-inside space-y-3">
            <li>
              <strong>Faça o upload da sua nova imagem:</strong> Use um serviço gratuito como o <a href="https://imgur.com/upload" target="_blank" rel="noopener noreferrer" className="text-lime-400 underline">Imgur</a>.
            </li>
            <li>
              <strong>Copie o link direto da imagem:</strong> Após o upload, clique com o botão direito na imagem e selecione "Copiar endereço da imagem" (ou similar). O link deve terminar com .jpg, .png, .jpeg, etc.
            </li>
            <li>
              <strong>Edite o arquivo <code className="bg-zinc-900 text-lime-400 px-2 py-1 rounded">db.json</code>:</strong> Abra o arquivo no seu editor de código e cole o novo link no campo correspondente, substituindo o link antigo.
            </li>
            <li>
              <strong>Salve e publique novamente:</strong> Após salvar as alterações no arquivo, envie a nova versão para o seu servidor de hospedagem (Vercel, GitHub Pages, etc.). O site será atualizado com as novas imagens.
            </li>
          </ol>
        </div>
      </div>

      <div className="mt-12">
        <h2 className="text-3xl font-bold text-white mb-6">Imagens Atuais no Site</h2>
        {error && <div className="bg-red-500/20 border border-red-500 text-red-300 p-4 rounded-lg">{error}</div>}
        {!data && !error && <div className="text-center text-gray-400">Carregando dados...</div>}
        
        {data && (
          <div className="space-y-10">
            {/* Hero Background */}
            <div>
              <h3 className="text-xl font-bold text-lime-400 mb-4">Imagem de Fundo (Principal)</h3>
              <div className="bg-zinc-800 p-4 rounded-lg">
                <img src={data.heroBackgroundImage} alt="Imagem de fundo atual" className="rounded-md max-h-64 w-full object-cover"/>
                <p className="text-sm text-gray-500 mt-2 break-all">URL: {data.heroBackgroundImage}</p>
              </div>
            </div>

            {/* Gallery Images */}
            <div>
              <h3 className="text-xl font-bold text-lime-400 mb-4">Galeria de Fotos ("Nossa Frota")</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                {data.galleryImages.map((image, index) => (
                  <div key={index} className="bg-zinc-800 p-2 rounded-lg">
                    <img src={image.src} alt={image.alt} className="rounded-md w-full h-32 object-cover"/>
                     <p className="text-xs text-gray-400 mt-2 truncate" title={image.alt}>{image.alt}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminPage;
