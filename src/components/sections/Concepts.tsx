import React, { useState } from 'react';
import { ChevronDown, ChevronRight, RotateCcw, RotateCw, Shuffle } from 'lucide-react';

interface ConceptCardProps {
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
  isOpen: boolean;
  onToggle: () => void;
}

const ConceptCard: React.FC<ConceptCardProps> = ({ title, icon, children, isOpen, onToggle }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <button
        onClick={onToggle}
        className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors duration-200"
      >
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-blue-100 rounded-lg">
            {icon}
          </div>
          <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
        </div>
        {isOpen ? (
          <ChevronDown className="h-5 w-5 text-gray-500" />
        ) : (
          <ChevronRight className="h-5 w-5 text-gray-500" />
        )}
      </button>
      
      {isOpen && (
        <div className="px-6 pb-6">
          <div className="pt-4 border-t border-gray-100">
            {children}
          </div>
        </div>
      )}
    </div>
  );
};

const Concepts: React.FC = () => {
  const [openCards, setOpenCards] = useState<Record<string, boolean>>({
    'balance-factor': true,
    'rotations': false,
    'advantages': false,
    'disadvantages': false
  });

  const toggleCard = (cardId: string) => {
    setOpenCards(prev => ({ ...prev, [cardId]: !prev[cardId] }));
  };

  return (
    <section id="conceitos" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Conceitos Fundamentais
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Entenda os princípios básicos que tornam as árvores AVL tão eficientes
          </p>
        </div>

        <div className="grid gap-6 max-w-4xl mx-auto">
          <ConceptCard
            title="Fator de Balanceamento"
            icon={<RotateCcw className="h-6 w-6 text-blue-600" />}
            isOpen={openCards['balance-factor']}
            onToggle={() => toggleCard('balance-factor')}
          >
            <div className="space-y-4">
              <p className="text-gray-700">
                O <strong>fator de balanceamento</strong> de um nó é a diferença entre a altura da 
                subárvore esquerda e a altura da subárvore direita.
              </p>
              
              <div className="bg-blue-50 p-4 rounded-lg">
                <p className="text-blue-800 font-mono text-center">
                  FB(nó) = altura(esquerda) - altura(direita)
                </p>
              </div>

              <div className="grid sm:grid-cols-3 gap-4">
                <div className="text-center p-3 bg-green-50 rounded-lg">
                  <p className="font-semibold text-green-800">FB = -1</p>
                  <p className="text-sm text-green-600">Balanceado</p>
                </div>
                <div className="text-center p-3 bg-green-50 rounded-lg">
                  <p className="font-semibold text-green-800">FB = 0</p>
                  <p className="text-sm text-green-600">Balanceado</p>
                </div>
                <div className="text-center p-3 bg-green-50 rounded-lg">
                  <p className="font-semibold text-green-800">FB = +1</p>
                  <p className="text-sm text-green-600">Balanceado</p>
                </div>
              </div>

              <p className="text-sm text-gray-600">
                <strong>Importante:</strong> Quando o fator de balanceamento for maior que +1 ou menor que -1, 
                a árvore precisa ser rebalanceada através de rotações.
              </p>
            </div>
          </ConceptCard>

          <ConceptCard
            title="Tipos de Rotação"
            icon={<Shuffle className="h-6 w-6 text-blue-600" />}
            isOpen={openCards['rotations']}
            onToggle={() => toggleCard('rotations')}
          >
            <div className="space-y-6">
              <p className="text-gray-700">
                Existem quatro tipos de rotações utilizadas para rebalancear uma árvore AVL:
              </p>

              <div className="grid sm:grid-cols-2 gap-4">
                <div className="p-4 border border-gray-200 rounded-lg">
                  <h4 className="font-semibold text-gray-900 mb-2">LL - Rotação Simples à Direita</h4>
                  <p className="text-sm text-gray-600">
                    Usada quando o desequilíbrio ocorre na subárvore esquerda do filho esquerdo.
                  </p>
                </div>

                <div className="p-4 border border-gray-200 rounded-lg">
                  <h4 className="font-semibold text-gray-900 mb-2">RR - Rotação Simples à Esquerda</h4>
                  <p className="text-sm text-gray-600">
                    Usada quando o desequilíbrio ocorre na subárvore direita do filho direito.
                  </p>
                </div>

                <div className="p-4 border border-gray-200 rounded-lg">
                  <h4 className="font-semibold text-gray-900 mb-2">LR - Rotação Dupla Esquerda-Direita</h4>
                  <p className="text-sm text-gray-600">
                    Combinação de rotação esquerda seguida de rotação direita.
                  </p>
                </div>

                <div className="p-4 border border-gray-200 rounded-lg">
                  <h4 className="font-semibold text-gray-900 mb-2">RL - Rotação Dupla Direita-Esquerda</h4>
                  <p className="text-sm text-gray-600">
                    Combinação de rotação direita seguida de rotação esquerda.
                  </p>
                </div>
              </div>
            </div>
          </ConceptCard>

          <ConceptCard
            title="Vantagens das Árvores AVL"
            icon={<RotateCw className="h-6 w-6 text-blue-600" />}
            isOpen={openCards['advantages']}
            onToggle={() => toggleCard('advantages')}
          >
            <div className="space-y-4">
              <ul className="space-y-3">
                <li className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <p className="font-medium text-gray-900">Garantia de Performance</p>
                    <p className="text-sm text-gray-600">
                      Todas as operações (busca, inserção, remoção) são garantidamente O(log n)
                    </p>
                  </div>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <p className="font-medium text-gray-900">Auto-balanceamento</p>
                    <p className="text-sm text-gray-600">
                      Não requer intervenção manual para manter o balanceamento
                    </p>
                  </div>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <p className="font-medium text-gray-900">Busca Eficiente</p>
                    <p className="text-sm text-gray-600">
                      Excelente para aplicações que fazem muitas operações de busca
                    </p>
                  </div>
                </li>
              </ul>
            </div>
          </ConceptCard>

          <ConceptCard
            title="Desvantagens das Árvores AVL"
            icon={<RotateCw className="h-6 w-6 text-blue-600" />}
            isOpen={openCards['disadvantages']}
            onToggle={() => toggleCard('disadvantages')}
          >
            <div className="space-y-4">
              <ul className="space-y-3">
                <li className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <p className="font-medium text-gray-900">Overhead de Rotações</p>
                    <p className="text-sm text-gray-600">
                      As rotações podem tornar inserções e remoções mais lentas em alguns casos
                    </p>
                  </div>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <p className="font-medium text-gray-900">Armazenamento Extra</p>
                    <p className="text-sm text-gray-600">
                      Cada nó precisa armazenar informações sobre altura ou fator de balanceamento
                    </p>
                  </div>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <p className="font-medium text-gray-900">Complexidade de Implementação</p>
                    <p className="text-sm text-gray-600">
                      Mais complexa de implementar e debugar comparada a árvores binárias simples
                    </p>
                  </div>
                </li>
              </ul>
            </div>
          </ConceptCard>
        </div>
      </div>
    </section>
  );
};

export default Concepts;