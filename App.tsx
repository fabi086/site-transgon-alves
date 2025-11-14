import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import ServicesSection from './components/ServicesSection';
import AboutSection from './components/AboutSection';
import GallerySection from './components/GallerySection';
import TestimonialsSection from './components/TestimonialsSection';
import FAQSection from './components/FAQSection';
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

    // Smooth scroll to anchor
    const smoothScrollTo = (id: string) => {
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    };
    
    if (window.location.hash && window.location.hash.startsWith('#/')) {
        // This is for routing, do nothing
    } else if (window.location.hash) {
      // Delay to allow components to render
      setTimeout(() => smoothScrollTo(window.location.hash.substring(1)), 100);
    }


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
        <AboutSection />
        <GallerySection />
        <TestimonialsSection />
        <FAQSection />
        <ContactFooter />
      </main>
      <FloatingCTA />
    </div>
  );
};

export default App;