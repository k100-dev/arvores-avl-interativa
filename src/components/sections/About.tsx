import React from 'react';
import { TreePine, RotateCcw, Scale } from 'lucide-react';

const About: React.FC = () => {
  return (
    <section id="sobre" className="py-20 bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-gray-900 mb-6">
            Árvores AVL
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto">
            Aprenda sobre estruturas de dados auto-balanceadas de forma visual e interativa
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              O que é uma Árvore AVL?
            </h2>
            <p className="text-lg text-gray-700 mb-6 leading-relaxed">
              Uma <strong>Árvore AVL</strong> é uma árvore binária de busca auto-balanceada, onde as alturas 
              das duas subárvores de qualquer nó diferem no máximo em uma unidade. Essa propriedade 
              garante que as operações de busca, inserção e remoção sejam sempre eficientes.
            </p>
            <p className="text-lg text-gray-700 mb-8 leading-relaxed">
              Nomeada em homenagem aos matemáticos <strong>Adelson-Velsky</strong> e <strong>Landis</strong>, 
              que a introduziram em 1962, a árvore AVL foi a primeira estrutura de dados de árvore 
              binária auto-balanceada a ser inventada.
            </p>

            <div className="grid sm:grid-cols-2 gap-6">
              <div className="flex items-start space-x-3">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <Scale className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Auto-balanceamento</h3>
                  <p className="text-sm text-gray-600">Mantém a árvore sempre balanceada automaticamente</p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <div className="p-2 bg-green-100 rounded-lg">
                  <TreePine className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Eficiência garantida</h3>
                  <p className="text-sm text-gray-600">Operações sempre em tempo O(log n)</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-xl p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
              Propriedades Fundamentais
            </h3>
            
            <div className="space-y-6">
              <div className="border-l-4 border-blue-500 pl-4">
                <h4 className="font-semibold text-gray-900 mb-2">Fator de Balanceamento</h4>
                <p className="text-gray-700 text-sm">
                  Para cada nó, o fator de balanceamento deve estar entre -1, 0 ou +1
                </p>
              </div>

              <div className="border-l-4 border-green-500 pl-4">
                <h4 className="font-semibold text-gray-900 mb-2">Rotações Automáticas</h4>
                <p className="text-gray-700 text-sm">
                  Quando o fator de balanceamento é violado, a árvore se rebalanceia automaticamente
                </p>
              </div>

              <div className="border-l-4 border-purple-500 pl-4">
                <h4 className="font-semibold text-gray-900 mb-2">Busca Eficiente</h4>
                <p className="text-gray-700 text-sm">
                  A altura é sempre logarítmica, garantindo buscas rápidas
                </p>
              </div>
            </div>

            <div className="mt-8 p-4 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-600 text-center">
                <strong>Fator de Balanceamento = </strong>
                Altura(SubárvoreEsquerda) - Altura(SubárvoreDireita)
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;