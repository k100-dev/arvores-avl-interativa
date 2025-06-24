import React, { useState, useRef, useEffect } from 'react';
import { Plus, Minus, Trash2, Play, AlertCircle } from 'lucide-react';
import { AVLTreeClass } from '../../utils/AVLTree';
import { calculateTreeLayout, getNodeConnections, LayoutNode } from '../../utils/treeLayout';

const Simulator: React.FC = () => {
  const [tree] = useState(() => new AVLTreeClass());
  const [inputValue, setInputValue] = useState('');
  const [message, setMessage] = useState('');
  const [isError, setIsError] = useState(false);
  const [layoutNodes, setLayoutNodes] = useState<LayoutNode[]>([]);
  const [isAnimating, setIsAnimating] = useState(false);
  const svgRef = useRef<SVGSVGElement>(null);

  const updateTreeLayout = () => {
    if (svgRef.current) {
      const rect = svgRef.current.getBoundingClientRect();
      const nodes = calculateTreeLayout(tree.root, rect.width, rect.height);
      setLayoutNodes(nodes);
    }
  };

  useEffect(() => {
    updateTreeLayout();
  }, [tree.root]);

  useEffect(() => {
    const handleResize = () => updateTreeLayout();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const showMessage = (msg: string, error: boolean = false) => {
    setMessage(msg);
    setIsError(error);
    setTimeout(() => setMessage(''), 3000);
  };

  const handleInsert = async () => {
    const value = parseInt(inputValue);
    if (isNaN(value)) {
      showMessage('Por favor, insira um número válido', true);
      return;
    }

    setIsAnimating(true);
    const result = tree.insert(value);
    
    if (result.success) {
      showMessage(result.rotationType ? 
        `${result.message}. ${result.rotationType}` : 
        result.message
      );
      updateTreeLayout();
      setInputValue('');
    } else {
      showMessage(result.message, true);
    }
    
    setTimeout(() => setIsAnimating(false), 500);
  };

  const handleRemove = async () => {
    const value = parseInt(inputValue);
    if (isNaN(value)) {
      showMessage('Por favor, insira um número válido', true);
      return;
    }

    setIsAnimating(true);
    const result = tree.remove(value);
    
    if (result.success) {
      showMessage(result.rotationType ? 
        `${result.message}. ${result.rotationType}` : 
        result.message
      );
      updateTreeLayout();
      setInputValue('');
    } else {
      showMessage(result.message, true);
    }
    
    setTimeout(() => setIsAnimating(false), 500);
  };

  const handleClear = () => {
    tree.clear();
    updateTreeLayout();
    showMessage('Árvore limpa com sucesso');
    setInputValue('');
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleInsert();
    }
  };

  const generateRandomTree = () => {
    const values = Array.from({ length: 7 }, () => Math.floor(Math.random() * 100) + 1);
    tree.clear();
    
    values.forEach(value => {
      tree.insert(value);
    });
    
    updateTreeLayout();
    showMessage('Árvore de exemplo gerada');
  };

  const connections = getNodeConnections(layoutNodes);
  const traversal = tree.getInorderTraversal();

  return (
    <section id="simulador" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Simulador AVL Interativo
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Insira valores e observe como a árvore se balanceia automaticamente
          </p>
        </div>

        {/* Controls */}
        <div className="bg-gray-50 rounded-lg p-6 mb-8">
          <div className="flex flex-col gap-6">
            {/* Input and primary actions */}
            <div className="flex flex-col sm:flex-row gap-4 items-stretch sm:items-center justify-center">
              <div className="flex-1 max-w-xs mx-auto sm:mx-0">
                <input
                  type="number"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Digite um número"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-center sm:text-left"
                  disabled={isAnimating}
                />
              </div>
              
              <div className="flex gap-3 justify-center">
                <button
                  onClick={handleInsert}
                  disabled={isAnimating || !inputValue}
                  className="flex items-center justify-center space-x-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200 min-w-[120px]"
                >
                  <Plus className="h-4 w-4" />
                  <span>Inserir</span>
                </button>
                
                <button
                  onClick={handleRemove}
                  disabled={isAnimating || !inputValue}
                  className="flex items-center justify-center space-x-2 px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200 min-w-[120px]"
                >
                  <Minus className="h-4 w-4" />
                  <span>Remover</span>
                </button>
              </div>
            </div>
            
            {/* Secondary actions */}
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <button
                onClick={generateRandomTree}
                disabled={isAnimating}
                className="flex items-center justify-center space-x-2 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
              >
                <Play className="h-4 w-4" />
                <span>Gerar Exemplo</span>
              </button>
              
              <button
                onClick={handleClear}
                disabled={isAnimating}
                className="flex items-center justify-center space-x-2 px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
              >
                <Trash2 className="h-4 w-4" />
                <span>Limpar Árvore</span>
              </button>
            </div>
          </div>

          {/* Message */}
          {message && (
            <div className={`mt-6 p-4 rounded-lg flex items-start space-x-3 ${
              isError ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'
            }`}>
              <AlertCircle className="h-5 w-5 flex-shrink-0 mt-0.5" />
              <span className="text-sm break-words">{message}</span>
            </div>
          )}
        </div>

        {/* Tree Visualization */}
        <div className="bg-white border border-gray-200 rounded-lg p-6 mb-8 shadow-sm">
          <div className="h-96 w-full relative overflow-hidden">
            <svg
              ref={svgRef}
              className="w-full h-full"
              viewBox="0 0 800 400"
              preserveAspectRatio="xMidYMid meet"
            >
              {/* Connections */}
              {connections.map((connection, index) => (
                <line
                  key={index}
                  x1={connection.from.x}
                  y1={connection.from.y}
                  x2={connection.to.x}
                  y2={connection.to.y}
                  stroke="#6B7280"
                  strokeWidth="2"
                  className="transition-all duration-300"
                />
              ))}

              {/* Nodes */}
              {layoutNodes.map((node) => (
                <g key={node.id} className="transition-all duration-300">
                  <circle
                    cx={node.x}
                    cy={node.y}
                    r="25"
                    fill="#3B82F6"
                    stroke="#1E40AF"
                    strokeWidth="2"
                    className={`transition-all duration-300 ${isAnimating ? 'animate-pulse' : ''}`}
                  />
                  <text
                    x={node.x}
                    y={node.y}
                    textAnchor="middle"
                    dominantBaseline="middle"
                    fill="white"
                    fontSize="14"
                    fontWeight="bold"
                  >
                    {node.value}
                  </text>
                  <text
                    x={node.x + 35}
                    y={node.y - 10}
                    textAnchor="middle"
                    dominantBaseline="middle"
                    fill="#6B7280"
                    fontSize="10"
                  >
                    h:{node.height}
                  </text>
                </g>
              ))}

              {/* Empty tree message */}
              {layoutNodes.length === 0 && (
                <text
                  x="400"
                  y="200"
                  textAnchor="middle"
                  dominantBaseline="middle"
                  fill="#9CA3AF"
                  fontSize="16"
                  className="break-words"
                >
                  Árvore vazia - Insira alguns valores para começar
                </text>
              )}
            </svg>
          </div>
        </div>

        {/* Tree Statistics */}
        {layoutNodes.length > 0 && (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <div className="bg-blue-50 p-4 rounded-lg text-center">
              <div className="text-2xl font-bold text-blue-600">{layoutNodes.length}</div>
              <div className="text-sm text-blue-800 break-words">Nós na árvore</div>
            </div>
            
            <div className="bg-green-50 p-4 rounded-lg text-center">
              <div className="text-2xl font-bold text-green-600">{tree.getTreeHeight()}</div>
              <div className="text-sm text-green-800 break-words">Altura da árvore</div>
            </div>
            
            <div className="bg-purple-50 p-4 rounded-lg text-center">
              <div className="text-2xl font-bold text-purple-600">
                {tree.isBalanced() ? 'Sim' : 'Não'}
              </div>
              <div className="text-sm text-purple-800">Balanceada</div>
            </div>
            
            <div className="bg-orange-50 p-4 rounded-lg text-center">
              <div className="text-xl font-bold text-orange-600">O(log n)</div>
              <div className="text-sm text-orange-800">Complexidade</div>
            </div>
          </div>
        )}

        {/* In-order traversal */}
        {traversal.length > 0 && (
          <div className="p-6 bg-gray-50 rounded-lg">
            <h3 className="font-semibold text-gray-900 mb-4 text-lg">Percurso Em-Ordem:</h3>
            <div className="flex flex-wrap gap-3 justify-center sm:justify-start">
              {traversal.map((value, index) => (
                <span
                  key={index}
                  className="px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-medium"
                >
                  {value}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Simulator;