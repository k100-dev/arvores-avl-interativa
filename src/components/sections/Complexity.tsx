import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line } from 'recharts';
import { Timer, Search, Plus, Minus, Zap, TrendingUp } from 'lucide-react';

const Complexity: React.FC = () => {
  const operationData = [
    {
      operation: 'Busca',
      BST_Pior: 'O(n)',
      BST_Melhor: 'O(log n)',
      AVL: 'O(log n)',
      RedBlack: 'O(log n)'
    },
    {
      operation: 'Inserção',
      BST_Pior: 'O(n)',
      BST_Melhor: 'O(log n)',
      AVL: 'O(log n)',
      RedBlack: 'O(log n)'
    },
    {
      operation: 'Remoção',
      BST_Pior: 'O(n)',
      BST_Melhor: 'O(log n)',
      AVL: 'O(log n)',
      RedBlack: 'O(log n)'
    }
  ];

  const performanceData = [
    { n: 100, BST: 100, AVL: 7, RedBlack: 7 },
    { n: 1000, BST: 1000, AVL: 10, RedBlack: 10 },
    { n: 10000, BST: 10000, AVL: 14, RedBlack: 14 },
    { n: 100000, BST: 100000, AVL: 17, RedBlack: 17 },
    { n: 1000000, BST: 1000000, AVL: 20, RedBlack: 20 }
  ];

  const spaceData = [
    {
      structure: 'BST Simples',
      space: 'n ponteiros',
      extra: '0',
      description: 'Apenas ponteiros left e right'
    },
    {
      structure: 'Árvore AVL',
      space: 'n ponteiros + n inteiros',
      extra: '4n bytes',
      description: 'Ponteiros + altura de cada nó'
    },
    {
      structure: 'Red-Black',
      space: 'n ponteiros + n bits',
      extra: 'n/8 bytes',
      description: 'Ponteiros + cor de cada nó'
    }
  ];

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-4 border border-gray-200 rounded-lg shadow-lg">
          <p className="font-semibold text-gray-900 mb-2">{`Elementos: ${label.toLocaleString()}`}</p>
          {payload.map((entry: any, index: number) => (
            <p key={index} style={{ color: entry.color }} className="text-sm">
              {`${entry.name}: ${entry.value.toLocaleString()} operações`}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <section id="complexidade" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Análise de Complexidade
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Compare a performance das árvores AVL com outras estruturas de dados
          </p>
        </div>

        {/* Time Complexity Table */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center flex-wrap gap-2">
            <Timer className="h-6 w-6 text-blue-600 flex-shrink-0" />
            <span>Complexidade Temporal</span>
          </h3>
          
          <div className="overflow-x-auto">
            <table className="w-full min-w-[600px]">
              <thead>
                <tr className="border-b-2 border-gray-200">
                  <th className="text-left py-4 px-4 font-semibold text-gray-900">Operação</th>
                  <th className="text-center py-4 px-4 font-semibold text-red-600">BST (Pior Caso)</th>
                  <th className="text-center py-4 px-4 font-semibold text-yellow-600">BST (Melhor Caso)</th>
                  <th className="text-center py-4 px-4 font-semibold text-blue-600">Árvore AVL</th>
                  <th className="text-center py-4 px-4 font-semibold text-green-600">Red-Black</th>
                </tr>
              </thead>
              <tbody>
                {operationData.map((row, index) => (
                  <tr key={index} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                    <td className="py-4 px-4 font-medium text-gray-900">{row.operation}</td>
                    <td className="py-4 px-4 text-center text-red-600 font-mono text-sm sm:text-base">{row.BST_Pior}</td>
                    <td className="py-4 px-4 text-center text-yellow-600 font-mono text-sm sm:text-base">{row.BST_Melhor}</td>
                    <td className="py-4 px-4 text-center text-blue-600 font-mono font-bold text-sm sm:text-base">{row.AVL}</td>
                    <td className="py-4 px-4 text-center text-green-600 font-mono text-sm sm:text-base">{row.RedBlack}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-6 p-4 bg-blue-50 rounded-lg">
            <p className="text-sm text-blue-800 break-words">
              <strong>Destaque:</strong> As árvores AVL garantem complexidade O(log n) para todas as operações,
              diferente das BSTs simples que podem degenerar para O(n) no pior caso.
            </p>
          </div>
        </div>

        {/* Performance Comparison Chart */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center flex-wrap gap-2">
            <TrendingUp className="h-6 w-6 text-green-600 flex-shrink-0" />
            <span>Comparação de Performance (Busca)</span>
          </h3>
          
          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart 
                data={performanceData}
                margin={{ top: 20, right: 30, left: 20, bottom: 60 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis 
                  dataKey="n" 
                  tick={{ fontSize: 12, fill: '#6b7280' }}
                  tickFormatter={(value) => value.toLocaleString()}
                  label={{ 
                    value: 'Número de elementos (n)', 
                    position: 'insideBottom', 
                    offset: -10,
                    style: { textAnchor: 'middle', fill: '#374151', fontSize: '14px', fontWeight: '500' }
                  }}
                />
                <YAxis 
                  tick={{ fontSize: 12, fill: '#6b7280' }}
                  tickFormatter={(value) => value.toLocaleString()}
                  label={{ 
                    value: 'Operações necessárias', 
                    angle: -90, 
                    position: 'insideLeft',
                    style: { textAnchor: 'middle', fill: '#374151', fontSize: '14px', fontWeight: '500' }
                  }}
                />
                <Tooltip content={<CustomTooltip />} />
                <Legend 
                  wrapperStyle={{ paddingTop: '20px' }}
                  iconType="line"
                />
                <Line 
                  type="monotone" 
                  dataKey="BST" 
                  stroke="#ef4444" 
                  strokeWidth={3}
                  name="BST (Pior Caso)"
                  dot={{ fill: '#ef4444', strokeWidth: 2, r: 5 }}
                  activeDot={{ r: 7, stroke: '#ef4444', strokeWidth: 2 }}
                />
                <Line 
                  type="monotone" 
                  dataKey="AVL" 
                  stroke="#3b82f6" 
                  strokeWidth={4}
                  name="Árvore AVL"
                  dot={{ fill: '#3b82f6', strokeWidth: 2, r: 5 }}
                  activeDot={{ r: 7, stroke: '#3b82f6', strokeWidth: 2 }}
                />
                <Line 
                  type="monotone" 
                  dataKey="RedBlack" 
                  stroke="#10b981" 
                  strokeWidth={3}
                  name="Red-Black"
                  dot={{ fill: '#10b981', strokeWidth: 2, r: 5 }}
                  activeDot={{ r: 7, stroke: '#10b981', strokeWidth: 2 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <div className="mt-6 grid sm:grid-cols-3 gap-4">
            <div className="p-4 bg-red-50 rounded-lg text-center">
              <div className="text-red-600 font-bold text-lg">BST Degenerada</div>
              <div className="text-sm text-red-700 mt-1">Pode chegar a O(n)</div>
              <div className="text-xs text-red-600 mt-2">Pior cenário possível</div>
            </div>
            <div className="p-4 bg-blue-50 rounded-lg text-center border-2 border-blue-200">
              <div className="text-blue-600 font-bold text-lg">Árvore AVL</div>
              <div className="text-sm text-blue-700 mt-1">Sempre O(log n)</div>
              <div className="text-xs text-blue-600 mt-2">Performance garantida</div>
            </div>
            <div className="p-4 bg-green-50 rounded-lg text-center">
              <div className="text-green-600 font-bold text-lg">Red-Black</div>
              <div className="text-sm text-green-700 mt-1">Sempre O(log n)</div>
              <div className="text-xs text-green-600 mt-2">Boa alternativa</div>
            </div>
          </div>
        </div>

        {/* Space Complexity */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-6">
            Complexidade Espacial
          </h3>
          
          <div className="grid lg:grid-cols-3 gap-6">
            {spaceData.map((item, index) => (
              <div key={index} className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow duration-200">
                <h4 className="font-bold text-gray-900 mb-4 text-lg">{item.structure}</h4>
                <div className="space-y-3">
                  <div className="flex flex-col gap-1">
                    <span className="text-sm text-gray-600">Espaço base:</span>
                    <span className="font-mono text-sm bg-gray-100 px-2 py-1 rounded break-words">{item.space}</span>
                  </div>
                  <div className="flex flex-col gap-1">
                    <span className="text-sm text-gray-600">Overhead extra:</span>
                    <span className="font-mono text-sm bg-gray-100 px-2 py-1 rounded">{item.extra}</span>
                  </div>
                  <p className="text-xs text-gray-500 mt-3 leading-relaxed break-words">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Key Advantages */}
        <div className="grid lg:grid-cols-2 gap-8">
          <div className="bg-blue-50 p-6 rounded-lg">
            <h3 className="text-xl font-bold text-blue-900 mb-6 flex items-center gap-2">
              <Zap className="h-5 w-5 flex-shrink-0" />
              <span>Vantagens das Árvores AVL</span>
            </h3>
            <div className="space-y-4">
              <div className="flex items-start space-x-4">
                <Search className="h-5 w-5 text-blue-600 mt-1 flex-shrink-0" />
                <div className="min-w-0 flex-1">
                  <p className="font-medium text-blue-800 mb-1">Busca Garantida</p>
                  <p className="text-sm text-blue-700 break-words">Sempre O(log n), nunca degenera</p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <Plus className="h-5 w-5 text-blue-600 mt-1 flex-shrink-0" />
                <div className="min-w-0 flex-1">
                  <p className="font-medium text-blue-800 mb-1">Inserção Eficiente</p>
                  <p className="text-sm text-blue-700 break-words">Auto-balanceamento mantém performance</p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <Minus className="h-5 w-5 text-blue-600 mt-1 flex-shrink-0" />
                <div className="min-w-0 flex-1">
                  <p className="font-medium text-blue-800 mb-1">Remoção Otimizada</p>
                  <p className="text-sm text-blue-700 break-words">Rebalanceamento automático após remoção</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-orange-50 p-6 rounded-lg">
            <h3 className="text-xl font-bold text-orange-900 mb-6">
              Quando Usar Árvores AVL
            </h3>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-orange-600 rounded-full mt-2 flex-shrink-0"></div>
                <p className="text-sm text-orange-800 break-words">Aplicações que fazem muitas buscas</p>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-orange-600 rounded-full mt-2 flex-shrink-0"></div>
                <p className="text-sm text-orange-800 break-words">Quando a performance precisa ser previsível</p>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-orange-600 rounded-full mt-2 flex-shrink-0"></div>
                <p className="text-sm text-orange-800 break-words">Sistemas de indexação de banco de dados</p>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-orange-600 rounded-full mt-2 flex-shrink-0"></div>
                <p className="text-sm text-orange-800 break-words">Implementação de conjuntos ordenados</p>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-orange-600 rounded-full mt-2 flex-shrink-0"></div>
                <p className="text-sm text-orange-800 break-words">Aplicações em tempo real</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Complexity;