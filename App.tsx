
import React from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import ServicesSection from './components/ServicesSection';
import GallerySection from './components/GallerySection';
import ContactFooter from './components/ContactFooter';
import FloatingCTA from './components/FloatingCTA';
import AdminPage from './admin';

const App: React.FC = () => {
  // Simple client-side routing to handle the admin page.
  // This avoids server-side 404 errors on platforms like Vercel.
  if (window.location.pathname.startsWith('/admin')) {
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