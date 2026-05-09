import React from 'react';
import Navbar           from '../components/landing/Navbar';
import HeroSection      from '../components/landing/HeroSection';
import ManifestoSection from '../components/landing/ManifestoSection';
import ProblemSection   from '../components/landing/ProblemSection';
import ServicesSection  from '../components/landing/ServicesSection';
import PerformanceSection from '../components/landing/PerformanceSection';
import CasesSection     from '../components/landing/CasesSection';
import MethodSection    from '../components/landing/MethodSection';
import ComparisonSection from '../components/landing/ComparisonSection';
import CTASection       from '../components/landing/CTASection';
import ContactForm      from '../components/landing/ContactForm';
import Footer           from '../components/landing/Footer';

export default function Home() {
  return (
    <div className="min-h-screen bg-[#070707] overflow-x-hidden">
      <Navbar />
      <HeroSection />
      <ManifestoSection />
      <ProblemSection />
      <PerformanceSection />
      <CasesSection />
      <CTASection />
      <ContactForm />
      <Footer />
    </div>
  );
}