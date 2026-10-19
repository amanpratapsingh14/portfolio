import { useScrollReveal } from './hooks.js';
import {
  Nav, Hero, Stats, Highlights, Experience, Skills, Education, Contact, Footer, ToTop,
} from './components/Sections.jsx';

export default function App() {
  useScrollReveal();
  return (
    <>
      <Nav />
      <div id="top" />
      <main>
        <Hero />
        <Stats />
        <Highlights />
        <Experience />
        <Skills />
        <Education />
        <Contact />
      </main>
      <Footer />
      <ToTop />
    </>
  );
}
