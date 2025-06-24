import React, { useState, useEffect } from 'react';
import { Copy, Download, Check, Code as CodeIcon } from 'lucide-react';

const Code: React.FC = () => {
  const [copied, setCopied] = useState(false);

  const javaCode = `public class AVLTree {
    private class Node {
        int data;
        Node left, right;
        int height;
        
        Node(int data) {
            this.data = data;
            this.height = 1;
        }
    }
    
    private Node root;
    
    // Obter altura do nó
    private int height(Node node) {
        return node == null ? 0 : node.height;
    }
    
    // Calcular fator de balanceamento
    private int getBalance(Node node) {
        return node == null ? 0 : height(node.left) - height(node.right);
    }
    
    // Atualizar altura do nó
    private void updateHeight(Node node) {
        node.height = Math.max(height(node.left), height(node.right)) + 1;
    }
    
    // Rotação à direita (LL)
    private Node rotateRight(Node y) {
        Node x = y.left;
        Node T2 = x.right;
        
        // Realizar rotação
        x.right = y;
        y.left = T2;
        
        // Atualizar alturas
        updateHeight(y);
        updateHeight(x);
        
        return x; // Nova raiz
    }
    
    // Rotação à esquerda (RR)
    private Node rotateLeft(Node x) {
        Node y = x.right;
        Node T2 = y.left;
        
        // Realizar rotação
        y.left = x;
        x.right = T2;
        
        // Atualizar alturas
        updateHeight(x);
        updateHeight(y);
        
        return y; // Nova raiz
    }
    
    // Inserir um valor na árvore AVL
    public void insert(int data) {
        root = insertNode(root, data);
    }
    
    private Node insertNode(Node node, int data) {
        // 1. Inserção normal em BST
        if (node == null) {
            return new Node(data);
        }
        
        if (data < node.data) {
            node.left = insertNode(node.left, data);
        } else if (data > node.data) {
            node.right = insertNode(node.right, data);
        } else {
            return node; // Valores duplicados não são permitidos
        }
        
        // 2. Atualizar altura do nó ancestral
        updateHeight(node);
        
        // 3. Obter fator de balanceamento
        int balance = getBalance(node);
        
        // 4. Se desequilibrado, há 4 casos:
        
        // Caso LL
        if (balance > 1 && data < node.left.data) {
            return rotateRight(node);
        }
        
        // Caso RR
        if (balance < -1 && data > node.right.data) {
            return rotateLeft(node);
        }
        
        // Caso LR
        if (balance > 1 && data > node.left.data) {
            node.left = rotateLeft(node.left);
            return rotateRight(node);
        }
        
        // Caso RL
        if (balance < -1 && data < node.right.data) {
            node.right = rotateRight(node.right);
            return rotateLeft(node);
        }
        
        return node; // Retornar o nó (inalterado)
    }
    
    // Buscar um valor na árvore
    public boolean search(int data) {
        return searchNode(root, data);
    }
    
    private boolean searchNode(Node node, int data) {
        if (node == null) {
            return false;
        }
        
        if (data == node.data) {
            return true;
        } else if (data < node.data) {
            return searchNode(node.left, data);
        } else {
            return searchNode(node.right, data);
        }
    }
    
    // Remover um valor da árvore
    public void delete(int data) {
        root = deleteNode(root, data);
    }
    
    private Node deleteNode(Node node, int data) {
        // 1. Remoção normal em BST
        if (node == null) {
            return node;
        }
        
        if (data < node.data) {
            node.left = deleteNode(node.left, data);
        } else if (data > node.data) {
            node.right = deleteNode(node.right, data);
        } else {
            // Nó a ser removido encontrado
            if (node.left == null || node.right == null) {
                Node temp = node.left != null ? node.left : node.right;
                
                if (temp == null) {
                    temp = node;
                    node = null;
                } else {
                    node = temp;
                }
            } else {
                // Nó com dois filhos
                Node temp = minValueNode(node.right);
                node.data = temp.data;
                node.right = deleteNode(node.right, temp.data);
            }
        }
        
        if (node == null) {
            return node;
        }
        
        // 2. Atualizar altura
        updateHeight(node);
        
        // 3. Obter fator de balanceamento
        int balance = getBalance(node);
        
        // 4. Se desequilibrado, há 4 casos:
        
        // Caso LL
        if (balance > 1 && getBalance(node.left) >= 0) {
            return rotateRight(node);
        }
        
        // Caso LR
        if (balance > 1 && getBalance(node.left) < 0) {
            node.left = rotateLeft(node.left);
            return rotateRight(node);
        }
        
        // Caso RR
        if (balance < -1 && getBalance(node.right) <= 0) {
            return rotateLeft(node);
        }
        
        // Caso RL
        if (balance < -1 && getBalance(node.right) > 0) {
            node.right = rotateRight(node.right);
            return rotateLeft(node);
        }
        
        return node;
    }
    
    private Node minValueNode(Node node) {
        Node current = node;
        while (current.left != null) {
            current = current.left;
        }
        return current;
    }
    
    // Percurso em-ordem
    public void inOrder() {
        inOrderRec(root);
    }
    
    private void inOrderRec(Node node) {
        if (node != null) {
            inOrderRec(node.left);
            System.out.print(node.data + " ");
            inOrderRec(node.right);
        }
    }
}`;

  useEffect(() => {
    // Highlight.js would be initialized here if using it
  }, []);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(javaCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Falha ao copiar código:', err);
    }
  };

  const handleDownload = () => {
    const blob = new Blob([javaCode], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'AVLTree.java';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <section id="codigo" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Implementação em Java
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Código completo de uma árvore AVL implementada em Java com todas as operações
          </p>
        </div>

        <div className="bg-gray-900 rounded-lg overflow-hidden shadow-xl">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between px-6 py-4 bg-gray-800 gap-4">
            <div className="flex items-center space-x-2">
              <CodeIcon className="h-5 w-5 text-gray-400 flex-shrink-0" />
              <span className="text-white font-medium">AVLTree.java</span>
            </div>
            <div className="flex flex-col sm:flex-row gap-2">
              <button
                onClick={handleCopy}
                className="flex items-center justify-center space-x-2 px-4 py-2 bg-blue-600 text-white text-sm rounded hover:bg-blue-700 transition-colors duration-200"
              >
                {copied ? (
                  <>
                    <Check className="h-4 w-4" />
                    <span>Copiado!</span>
                  </>
                ) : (
                  <>
                    <Copy className="h-4 w-4" />
                    <span>Copiar código</span>
                  </>
                )}
              </button>
              <button
                onClick={handleDownload}
                className="flex items-center justify-center space-x-2 px-4 py-2 bg-green-600 text-white text-sm rounded hover:bg-green-700 transition-colors duration-200"
              >
                <Download className="h-4 w-4" />
                <span>Baixar arquivo</span>
              </button>
            </div>
          </div>

          {/* Code */}
          <div className="p-6 overflow-x-auto">
            <pre className="text-sm text-gray-300 whitespace-pre-wrap break-words">
              <code>{javaCode}</code>
            </pre>
          </div>
        </div>

        {/* Code explanation */}
        <div className="mt-12 grid lg:grid-cols-2 gap-8">
          <div className="bg-blue-50 p-6 rounded-lg">
            <h3 className="text-xl font-bold text-blue-900 mb-4">Operações Principais</h3>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                <div className="min-w-0 flex-1">
                  <p className="font-medium text-blue-800 break-words">insert(int data)</p>
                  <p className="text-sm text-blue-700 break-words">Insere um novo valor mantendo o balanceamento</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                <div className="min-w-0 flex-1">
                  <p className="font-medium text-blue-800 break-words">delete(int data)</p>
                  <p className="text-sm text-blue-700 break-words">Remove um valor e rebalanceia se necessário</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                <div className="min-w-0 flex-1">
                  <p className="font-medium text-blue-800 break-words">search(int data)</p>
                  <p className="text-sm text-blue-700 break-words">Busca um valor na árvore em O(log n)</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-green-50 p-6 rounded-lg">
            <h3 className="text-xl font-bold text-green-900 mb-4">Operações de Rotação</h3>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-green-600 rounded-full mt-2 flex-shrink-0"></div>
                <div className="min-w-0 flex-1">
                  <p className="font-medium text-green-800 break-words">rotateLeft(Node x)</p>
                  <p className="text-sm text-green-700 break-words">Rotação simples à esquerda (RR)</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-green-600 rounded-full mt-2 flex-shrink-0"></div>
                <div className="min-w-0 flex-1">
                  <p className="font-medium text-green-800 break-words">rotateRight(Node y)</p>
                  <p className="text-sm text-green-700 break-words">Rotação simples à direita (LL)</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-green-600 rounded-full mt-2 flex-shrink-0"></div>
                <div className="min-w-0 flex-1">
                  <p className="font-medium text-green-800 break-words">getBalance(Node node)</p>
                  <p className="text-sm text-green-700 break-words">Calcula o fator de balanceamento</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 bg-gray-50 p-6 rounded-lg">
          <h3 className="text-xl font-bold text-gray-900 mb-4">Como Usar</h3>
          <div className="bg-white p-6 rounded border-l-4 border-blue-500 overflow-x-auto">
            <pre className="text-sm text-gray-800 whitespace-pre-wrap break-words"><code>{`// Exemplo de uso da árvore AVL
AVLTree tree = new AVLTree();

// Inserir valores
tree.insert(10);
tree.insert(20);
tree.insert(30);
tree.insert(40);
tree.insert(50);
tree.insert(25);

// Buscar um valor
boolean found = tree.search(30); // retorna true

// Percorrer a árvore em ordem
tree.inOrder(); // imprime: 10 20 25 30 40 50

// Remover um valor
tree.delete(20);`}</code></pre>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Code;