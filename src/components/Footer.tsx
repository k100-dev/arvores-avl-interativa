import React from 'react';
import { TreePine, Github, Mail, Heart } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <TreePine className="h-8 w-8 text-blue-400" />
              <span className="text-xl font-bold">Árvores AVL</span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              Plataforma educativa para aprender sobre árvores AVL de forma visual e interativa. 
              Perfeita para estudantes e desenvolvedores.
            </p>
          </div>

          {/* Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Navegação</h3>
            <div className="space-y-2">
              {[
                { name: 'Sobre', id: 'sobre' },
                { name: 'Conceitos', id: 'conceitos' },
                { name: 'Simulador', id: 'simulador' },
                { name: 'Rotações', id: 'rotacoes' },
                { name: 'Código', id: 'codigo' },
                { name: 'Complexidade', id: 'complexidade' }
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    const element = document.getElementById(item.id);
                    if (element) {
                      element.scrollIntoView({ behavior: 'smooth' });
                    }
                  }}
                  className="block text-gray-400 hover:text-white transition-colors duration-200 text-sm"
                >
                  {item.name}
                </button>
              ))}
            </div>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Recursos</h3>
            <div className="space-y-2">
              <a
                href="#"
                className="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors duration-200 text-sm"
              >
                <Github className="h-4 w-4" />
                <span>Código fonte</span>
              </a>
              <a
                href="#"
                className="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors duration-200 text-sm"
              >
                <Mail className="h-4 w-4" />
                <span>Feedback</span>
              </a>
            </div>

            <div className="mt-6 pt-6 border-t border-gray-800">
              <h4 className="text-sm font-medium mb-2">Tecnologias usadas:</h4>
              <div className="flex flex-wrap gap-2">
                {['React', 'TypeScript', 'Tailwind CSS', 'Recharts'].map((tech) => (
                  <span
                    key={tech}
                    className="px-2 py-1 bg-gray-800 text-gray-300 text-xs rounded"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 pt-8 border-t border-gray-800 text-center">
          <div className="flex items-center justify-center space-x-1 text-sm text-gray-400">
            <span>Feito com</span>
            <Heart className="h-4 w-4 text-red-500" />
            <span>para educação em ciência da computação</span>
          </div>
          <p className="mt-2 text-xs text-gray-500">
            © 2025 Árvores AVL. Projeto educativo de código aberto.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;