import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import About from './components/sections/About';
import Concepts from './components/sections/Concepts';
import Simulator from './components/sections/Simulator';
import Rotations from './components/sections/Rotations';
import Code from './components/sections/Code';
import Complexity from './components/sections/Complexity';
import Footer from './components/Footer';

function App() {
  const [activeSection, setActiveSection] = useState('sobre');

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['sobre', 'conceitos', 'simulador', 'rotacoes', 'codigo', 'complexidade'];
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const offsetTop = element.offsetTop;
          const offsetBottom = offsetTop + element.offsetHeight;

          if (scrollPosition >= offsetTop && scrollPosition < offsetBottom) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <Navbar activeSection={activeSection} onSectionChange={setActiveSection} />
      
      <main>
        <About />
        <Concepts />
        <Simulator />
        <Rotations />
        <Code />
        <Complexity />
      </main>

      <Footer />
    </div>
  );
}

export default App;