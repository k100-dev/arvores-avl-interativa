import React, { useState, useEffect } from 'react';
import { Play, Pause, RotateCcw, RotateCw, Shuffle, ArrowRight } from 'lucide-react';

interface RotationDemoProps {
  type: 'LL' | 'RR' | 'LR' | 'RL';
  isActive: boolean;
  onActivate: () => void;
}

const RotationDemo: React.FC<RotationDemoProps> = ({ type, isActive, onActivate }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [step, setStep] = useState(0);

  const rotationData = {
    LL: {
      title: 'LL - Rotação Simples à Direita',
      description: 'Desequilíbrio na subárvore esquerda do filho esquerdo',
      steps: ['Estado inicial', 'Identificar desequilíbrio', 'Rotação à direita', 'Estado final'],
      icon: <RotateCcw className="h-5 w-5" />
    },
    RR: {
      title: 'RR - Rotação Simples à Esquerda',
      description: 'Desequilíbrio na subárvore direita do filho direito',
      steps: ['Estado inicial', 'Identificar desequilíbrio', 'Rotação à esquerda', 'Estado final'],
      icon: <RotateCw className="h-5 w-5" />
    },
    LR: {
      title: 'LR - Rotação Dupla Esquerda-Direita',
      description: 'Desequilíbrio na subárvore direita do filho esquerdo',
      steps: ['Estado inicial', 'Rotação esquerda', 'Rotação direita', 'Estado final'],
      icon: <Shuffle className="h-5 w-5" />
    },
    RL: {
      title: 'RL - Rotação Dupla Direita-Esquerda',
      description: 'Desequilíbrio na subárvore esquerda do filho direito',
      steps: ['Estado inicial', 'Rotação direita', 'Rotação esquerda', 'Estado final'],
      icon: <Shuffle className="h-5 w-5" />
    }
  };

  const data = rotationData[type];

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying && isActive) {
      interval = setInterval(() => {
        setStep(prev => {
          if (prev >= data.steps.length - 1) {
            setIsPlaying(false);
            return 0;
          }
          return prev + 1;
        });
      }, 1500);
    }
    return () => clearInterval(interval);
  }, [isPlaying, isActive, data.steps.length]);

  const handlePlay = () => {
    if (!isActive) {
      onActivate();
    }
    setIsPlaying(!isPlaying);
    if (!isPlaying) {
      setStep(0);
    }
  };

  const renderTree = () => {
    const treeExamples = {
      LL: [
        // Estado inicial - desequilibrado
        <svg viewBox="0 0 200 120" className="w-full h-24">
          <circle cx="100" cy="20" r="15" fill="#ef4444" stroke="#dc2626" strokeWidth="2" />
          <text x="100" y="25" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">30</text>
          <line x1="100" y1="35" x2="70" y2="50" stroke="#6b7280" strokeWidth="2" />
          <circle cx="70" cy="60" r="15" fill="#ef4444" stroke="#dc2626" strokeWidth="2" />
          <text x="70" y="65" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">20</text>
          <line x1="70" y1="75" x2="50" y2="90" stroke="#6b7280" strokeWidth="2" />
          <circle cx="50" cy="100" r="15" fill="#3b82f6" stroke="#1e40af" strokeWidth="2" />
          <text x="50" y="105" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">10</text>
        </svg>,
        // Identificar desequilíbrio
        <svg viewBox="0 0 200 120" className="w-full h-24">
          <circle cx="100" cy="20" r="15" fill="#ef4444" stroke="#dc2626" strokeWidth="2" />
          <text x="100" y="25" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">30</text>
          <text x="120" y="15" fill="#ef4444" fontSize="10">FB: +2</text>
          <line x1="100" y1="35" x2="70" y2="50" stroke="#6b7280" strokeWidth="2" />
          <circle cx="70" cy="60" r="15" fill="#ef4444" stroke="#dc2626" strokeWidth="2" />
          <text x="70" y="65" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">20</text>
          <text x="90" y="55" fill="#ef4444" fontSize="10">FB: +1</text>
          <line x1="70" y1="75" x2="50" y2="90" stroke="#6b7280" strokeWidth="2" />
          <circle cx="50" cy="100" r="15" fill="#3b82f6" stroke="#1e40af" strokeWidth="2" />
          <text x="50" y="105" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">10</text>
        </svg>,
        // Rotação
        <svg viewBox="0 0 200 120" className="w-full h-24">
          <defs>
            <marker id="arrow" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
              <polygon points="0 0, 10 3.5, 0 7" fill="#f59e0b" />
            </marker>
          </defs>
          <circle cx="70" cy="20" r="15" fill="#f59e0b" stroke="#d97706" strokeWidth="2" />
          <text x="70" y="25" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">20</text>
          <path d="M 85 25 Q 100 35 115 25" stroke="#f59e0b" strokeWidth="2" fill="none" markerEnd="url(#arrow)" />
          <circle cx="130" cy="60" r="15" fill="#10b981" stroke="#059669" strokeWidth="2" />
          <text x="130" y="65" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">30</text>
        </svg>,
        // Estado final
        <svg viewBox="0 0 200 120" className="w-full h-24">
          <circle cx="100" cy="20" r="15" fill="#10b981" stroke="#059669" strokeWidth="2" />
          <text x="100" y="25" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">20</text>
          <line x1="100" y1="35" x2="70" y2="50" stroke="#6b7280" strokeWidth="2" />
          <line x1="100" y1="35" x2="130" y2="50" stroke="#6b7280" strokeWidth="2" />
          <circle cx="70" cy="60" r="15" fill="#3b82f6" stroke="#1e40af" strokeWidth="2" />
          <text x="70" y="65" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">10</text>
          <circle cx="130" cy="60" r="15" fill="#3b82f6" stroke="#1e40af" strokeWidth="2" />
          <text x="130" y="65" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">30</text>
        </svg>
      ],
      RR: [
        <svg viewBox="0 0 200 120" className="w-full h-24">
          <circle cx="100" cy="20" r="15" fill="#ef4444" stroke="#dc2626" strokeWidth="2" />
          <text x="100" y="25" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">10</text>
          <line x1="100" y1="35" x2="130" y2="50" stroke="#6b7280" strokeWidth="2" />
          <circle cx="130" cy="60" r="15" fill="#ef4444" stroke="#dc2626" strokeWidth="2" />
          <text x="130" y="65" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">20</text>
          <line x1="130" y1="75" x2="150" y2="90" stroke="#6b7280" strokeWidth="2" />
          <circle cx="150" cy="100" r="15" fill="#3b82f6" stroke="#1e40af" strokeWidth="2" />
          <text x="150" y="105" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">30</text>
        </svg>,
        <svg viewBox="0 0 200 120" className="w-full h-24">
          <circle cx="100" cy="20" r="15" fill="#ef4444" stroke="#dc2626" strokeWidth="2" />
          <text x="100" y="25" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">10</text>
          <text x="80" y="15" fill="#ef4444" fontSize="10">FB: -2</text>
          <line x1="100" y1="35" x2="130" y2="50" stroke="#6b7280" strokeWidth="2" />
          <circle cx="130" cy="60" r="15" fill="#ef4444" stroke="#dc2626" strokeWidth="2" />
          <text x="130" y="65" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">20</text>
          <text x="110" y="55" fill="#ef4444" fontSize="10">FB: -1</text>
          <line x1="130" y1="75" x2="150" y2="90" stroke="#6b7280" strokeWidth="2" />
          <circle cx="150" cy="100" r="15" fill="#3b82f6" stroke="#1e40af" strokeWidth="2" />
          <text x="150" y="105" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">30</text>
        </svg>,
        <svg viewBox="0 0 200 120" className="w-full h-24">
          <defs>
            <marker id="arrow-rr" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
              <polygon points="0 0, 10 3.5, 0 7" fill="#f59e0b" />
            </marker>
          </defs>
          <circle cx="130" cy="20" r="15" fill="#f59e0b" stroke="#d97706" strokeWidth="2" />
          <text x="130" y="25" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">20</text>
          <path d="M 115 25 Q 100 35 85 25" stroke="#f59e0b" strokeWidth="2" fill="none" markerEnd="url(#arrow-rr)" />
          <circle cx="70" cy="60" r="15" fill="#10b981" stroke="#059669" strokeWidth="2" />
          <text x="70" y="65" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">10</text>
        </svg>,
        <svg viewBox="0 0 200 120" className="w-full h-24">
          <circle cx="100" cy="20" r="15" fill="#10b981" stroke="#059669" strokeWidth="2" />
          <text x="100" y="25" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">20</text>
          <line x1="100" y1="35" x2="70" y2="50" stroke="#6b7280" strokeWidth="2" />
          <line x1="100" y1="35" x2="130" y2="50" stroke="#6b7280" strokeWidth="2" />
          <circle cx="70" cy="60" r="15" fill="#3b82f6" stroke="#1e40af" strokeWidth="2" />
          <text x="70" y="65" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">10</text>
          <circle cx="130" cy="60" r="15" fill="#3b82f6" stroke="#1e40af" strokeWidth="2" />
          <text x="130" y="65" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">30</text>
        </svg>
      ]
    };

    // Para LR e RL, use exemplos similares mas mais complexos
    const trees = treeExamples[type as keyof typeof treeExamples] || treeExamples.LL;
    return trees[step] || trees[0];
  };

  return (
    <div className={`border-2 rounded-lg p-4 md:p-6 transition-all duration-300 ${
      isActive ? 'border-blue-500 bg-blue-50' : 'border-gray-200 bg-white'
    }`}>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
        <div className="flex items-center space-x-3 min-w-0 flex-1">
          <div className="p-2 bg-blue-100 rounded-lg flex-shrink-0">
            {data.icon}
          </div>
          <div className="min-w-0 flex-1">
            <h3 className="font-semibold text-gray-900 text-sm sm:text-base break-words">{data.title}</h3>
          </div>
        </div>
        <button
          onClick={handlePlay}
          disabled={isPlaying && !isActive}
          className={`p-2 rounded-full transition-colors duration-200 flex-shrink-0 ${
            isActive ? 'bg-blue-600 text-white hover:bg-blue-700' : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
          }`}
        >
          {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
        </button>
      </div>

      <p className="text-sm text-gray-600 mb-4 break-words">{data.description}</p>

      <div className="bg-white rounded-lg p-4 mb-4 border min-h-[120px] flex items-center justify-center">
        {renderTree()}
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex flex-wrap gap-2">
          {data.steps.map((stepName, index) => (
            <div
              key={index}
              className={`px-2 py-1 rounded text-xs font-medium transition-colors duration-200 break-words ${
                step === index && isActive
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-600'
              }`}
            >
              {stepName}
            </div>
          ))}
        </div>
        
        {isActive && (
          <div className="text-sm text-blue-600 font-medium flex-shrink-0">
            Passo {step + 1} de {data.steps.length}
          </div>
        )}
      </div>
    </div>
  );
};

const Rotations: React.FC = () => {
  const [activeRotation, setActiveRotation] = useState<'LL' | 'RR' | 'LR' | 'RL'>('LL');

  return (
    <section id="rotacoes" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Visualizador de Rotações
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Veja como cada tipo de rotação funciona para manter o balanceamento da árvore
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-6 mb-8">
          <RotationDemo
            type="LL"
            isActive={activeRotation === 'LL'}
            onActivate={() => setActiveRotation('LL')}
          />
          <RotationDemo
            type="RR"
            isActive={activeRotation === 'RR'}
            onActivate={() => setActiveRotation('RR')}
          />
          <RotationDemo
            type="LR"
            isActive={activeRotation === 'LR'}
            onActivate={() => setActiveRotation('LR')}
          />
          <RotationDemo
            type="RL"
            isActive={activeRotation === 'RL'}
            onActivate={() => setActiveRotation('RL')}
          />
        </div>

        <div className="bg-white rounded-lg p-6 shadow-sm">
          <h3 className="text-xl font-bold text-gray-900 mb-6">
            Como Determinar o Tipo de Rotação
          </h3>
          
          <div className="grid lg:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-blue-600 font-bold text-sm">1</span>
                </div>
                <div className="min-w-0 flex-1">
                  <h4 className="font-medium text-gray-900 mb-2">Calcule o Fator de Balanceamento</h4>
                  <p className="text-sm text-gray-600 break-words">FB = altura(esquerda) - altura(direita)</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-blue-600 font-bold text-sm">2</span>
                </div>
                <div className="min-w-0 flex-1">
                  <h4 className="font-medium text-gray-900 mb-2">Identifique o Desequilíbrio</h4>
                  <p className="text-sm text-gray-600 break-words">Se |FB| &gt; 1, a árvore precisa ser balanceada</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-blue-600 font-bold text-sm">3</span>
                </div>
                <div className="min-w-0 flex-1">
                  <h4 className="font-medium text-gray-900 mb-2">Escolha a Rotação</h4>
                  <p className="text-sm text-gray-600 break-words">Baseado no tipo de desequilíbrio encontrado</p>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 rounded-lg p-6">
              <h4 className="font-medium text-gray-900 mb-4">Regras de Decisão:</h4>
              <div className="space-y-3">
                <div className="grid grid-cols-1 gap-2">
                  <span className="text-sm text-gray-600 break-words">FB &gt; 1 e FB(filho esquerdo) ≥ 0:</span>
                  <span className="font-medium text-blue-600 text-sm">LL</span>
                </div>
                <div className="grid grid-cols-1 gap-2">
                  <span className="text-sm text-gray-600 break-words">FB &gt; 1 e FB(filho esquerdo) &lt; 0:</span>
                  <span className="font-medium text-green-600 text-sm">LR</span>
                </div>
                <div className="grid grid-cols-1 gap-2">
                  <span className="text-sm text-gray-600 break-words">FB &lt; -1 e FB(filho direito) ≤ 0:</span>
                  <span className="font-medium text-orange-600 text-sm">RR</span>
                </div>
                <div className="grid grid-cols-1 gap-2">
                  <span className="text-sm text-gray-600 break-words">FB &lt; -1 e FB(filho direito) &gt; 0:</span>
                  <span className="font-medium text-purple-600 text-sm">RL</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Rotations;