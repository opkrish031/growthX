import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Stats from '@/components/Stats';
import Services from '@/components/Services';
import Process from '@/components/Process';
import WhyUs from '@/components/WhyUs';
import Pricing from '@/components/Pricing';
import FAQ from '@/components/FAQ';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import Chatbot from '@/components/Chatbot';
import Preloader from '@/components/Preloader';

const Divider = () => (
  <div
    style={{
      height: '1px',
      background:
        'linear-gradient(to right, transparent, rgba(108,99,255,0.20), transparent)',
    }}
  />
);

export default function Home() {
  return (
    <>
      <Preloader />
      <Navbar />
      <Hero />
      <Stats />
      <Divider />
      <section id="services">
        <Services />
      </section>
      <Divider />
      <section id="process">
        <Process />
      </section>
      <Divider />
      <WhyUs />
      <Divider />
      <section id="pricing">
        <Pricing />
      </section>
      <Divider />
      <FAQ />
      <Divider />
      <section id="contact">
        <Contact />
      </section>
      <Footer />
      <Chatbot />
    </>
  );
}
