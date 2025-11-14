
import React from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import ServicesSection from './components/ServicesSection';
import AboutSection from './components/AboutSection';
import GallerySection from './components/GallerySection';
import TestimonialsSection from './components/TestimonialsSection';
import FAQSection from './components/FAQSection';
import ContactFooter from './components/ContactFooter';
import FloatingCTA from './components/FloatingCTA';

const App: React.FC = () => {
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