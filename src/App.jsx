import './index.css';
import useLenis from './hooks/useLenis';
import CustomCursor from './components/CustomCursor';
import Navbar from './components/Navbar';
import ScrollProgress from './components/ScrollProgress';
import Hero from './sections/Hero';
import Marquee from './sections/Marquee';
import About from './sections/About';
import Services from './sections/Services';
import Work from './sections/Work';
import Skills from './sections/Skills';
import Experience from './sections/Experience';
import Process from './sections/Process';
import WhyMe from './sections/WhyMe';
import Reviews from './sections/Reviews';
import CTA from './sections/CTA';
import Contact from './sections/Contact';
import Footer from './sections/Footer';

export default function App() {
  useLenis();

  return (
    <>
      <ScrollProgress />
      <CustomCursor />
      <Navbar />
      <main>
        <Hero />
        <Marquee />
        <About />
        <Services />
        <Work />
        <Skills />
        <Experience />
        <Process />
        <WhyMe />
        <Reviews />
        <CTA />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
