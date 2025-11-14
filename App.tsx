
import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import ServicesSection from './components/ServicesSection';
import GallerySection from './components/GallerySection';
import ContactFooter from './components/ContactFooter';
import FloatingCTA from './components/FloatingCTA';
import AdminPage from './admin';

const App: React.FC = () => {
  const [route, setRoute] = useState(window.location.hash);

  useEffect(() => {
    const handleHashChange = () => {
      setRoute(window.location.hash);
    };

    window.addEventListener('hashchange', handleHashChange);

    return () => {
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, []);


  if (route === '#/admin') {
    return <AdminPage />;
  }

  return (
    <div className="bg-zinc-900 min-h-screen text-gray-100">
      <Header />
      <main>
        <Hero />
        <ServicesSection />
        <GallerySection />
        <ContactFooter />
      </main>
      <FloatingCTA />
    </div>
  );
};

export default App;
