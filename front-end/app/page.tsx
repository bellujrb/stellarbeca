'use client';

  import Header from '@/components/header';
import HeroSection from '@/components/hero-section';
import FAQ from '@/components/faq';
import Footer from '@/components/footer';

export default function Home() {

  return (
    <main className="min-h-screen bg-stellar-white-600">
      <Header />
      <HeroSection />
      <FAQ />
      <Footer />
    </main>
  );
}