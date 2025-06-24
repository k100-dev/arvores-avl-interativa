import { TreeNode, RotationStep } from '../types/AVLTree';

export class AVLTreeClass {
  root: TreeNode | null = null;
  private nodeIdCounter = 0;

  private createNode(value: number): TreeNode {
    return {
      value,
      left: null,
      right: null,
      height: 1,
      id: `node-${this.nodeIdCounter++}`
    };
  }

  private getHeight(node: TreeNode | null): number {
    return node ? node.height : 0;
  }

  private getBalance(node: TreeNode): number {
    return this.getHeight(node.left) - this.getHeight(node.right);
  }

  private updateHeight(node: TreeNode): void {
    node.height = Math.max(this.getHeight(node.left), this.getHeight(node.right)) + 1;
  }

  private rotateRight(y: TreeNode): TreeNode {
    const x = y.left!;
    const T2 = x.right;

    x.right = y;
    y.left = T2;

    this.updateHeight(y);
    this.updateHeight(x);

    return x;
  }

  private rotateLeft(x: TreeNode): TreeNode {
    const y = x.right!;
    const T2 = y.left;

    y.left = x;
    x.right = T2;

    this.updateHeight(x);
    this.updateHeight(y);

    return y;
  }

  insert(value: number): { success: boolean; message: string; rotationType?: string } {
    if (this.search(value)) {
      return { success: false, message: 'Valor já existe na árvore' };
    }

    let rotationType: string | undefined;
    this.root = this.insertNode(this.root, value, (type) => {
      rotationType = type;
    });

    return { 
      success: true, 
      message: 'Valor inserido com sucesso',
      rotationType 
    };
  }

  private insertNode(node: TreeNode | null, value: number, onRotation: (type: string) => void): TreeNode {
    if (!node) {
      return this.createNode(value);
    }

    if (value < node.value) {
      node.left = this.insertNode(node.left, value, onRotation);
    } else if (value > node.value) {
      node.right = this.insertNode(node.right, value, onRotation);
    } else {
      return node;
    }

    this.updateHeight(node);
    const balance = this.getBalance(node);

    // Rotação LL
    if (balance > 1 && value < node.left!.value) {
      onRotation('LL - Rotação Simples à Direita');
      return this.rotateRight(node);
    }

    // Rotação RR
    if (balance < -1 && value > node.right!.value) {
      onRotation('RR - Rotação Simples à Esquerda');
      return this.rotateLeft(node);
    }

    // Rotação LR
    if (balance > 1 && value > node.left!.value) {
      onRotation('LR - Rotação Dupla Esquerda-Direita');
      node.left = this.rotateLeft(node.left!);
      return this.rotateRight(node);
    }

    // Rotação RL
    if (balance < -1 && value < node.right!.value) {
      onRotation('RL - Rotação Dupla Direita-Esquerda');
      node.right = this.rotateRight(node.right!);
      return this.rotateLeft(node);
    }

    return node;
  }

  remove(value: number): { success: boolean; message: string; rotationType?: string } {
    if (!this.search(value)) {
      return { success: false, message: 'Valor não encontrado na árvore' };
    }

    let rotationType: string | undefined;
    this.root = this.removeNode(this.root, value, (type) => {
      rotationType = type;
    });

    return { 
      success: true, 
      message: 'Valor removido com sucesso',
      rotationType 
    };
  }

  private removeNode(node: TreeNode | null, value: number, onRotation: (type: string) => void): TreeNode | null {
    if (!node) return null;

    if (value < node.value) {
      node.left = this.removeNode(node.left, value, onRotation);
    } else if (value > node.value) {
      node.right = this.removeNode(node.right, value, onRotation);
    } else {
      if (!node.left || !node.right) {
        const temp = node.left || node.right;
        if (!temp) {
          return null;
        } else {
          return temp;
        }
      } else {
        const temp = this.getMinValueNode(node.right);
        node.value = temp.value;
        node.right = this.removeNode(node.right, temp.value, onRotation);
      }
    }

    this.updateHeight(node);
    const balance = this.getBalance(node);

    // Rotações após remoção
    if (balance > 1 && this.getBalance(node.left!) >= 0) {
      onRotation('LL - Rotação Simples à Direita');
      return this.rotateRight(node);
    }

    if (balance > 1 && this.getBalance(node.left!) < 0) {
      onRotation('LR - Rotação Dupla Esquerda-Direita');
      node.left = this.rotateLeft(node.left!);
      return this.rotateRight(node);
    }

    if (balance < -1 && this.getBalance(node.right!) <= 0) {
      onRotation('RR - Rotação Simples à Esquerda');
      return this.rotateLeft(node);
    }

    if (balance < -1 && this.getBalance(node.right!) > 0) {
      onRotation('RL - Rotação Dupla Direita-Esquerda');
      node.right = this.rotateRight(node.right!);
      return this.rotateLeft(node);
    }

    return node;
  }

  private getMinValueNode(node: TreeNode): TreeNode {
    let current = node;
    while (current.left) {
      current = current.left;
    }
    return current;
  }

  search(value: number): boolean {
    return this.searchNode(this.root, value);
  }

  private searchNode(node: TreeNode | null, value: number): boolean {
    if (!node) return false;
    if (value === node.value) return true;
    if (value < node.value) return this.searchNode(node.left, value);
    return this.searchNode(node.right, value);
  }

  clear(): void {
    this.root = null;
    this.nodeIdCounter = 0;
  }

  getInorderTraversal(): number[] {
    const result: number[] = [];
    this.inorderHelper(this.root, result);
    return result;
  }

  private inorderHelper(node: TreeNode | null, result: number[]): void {
    if (node) {
      this.inorderHelper(node.left, result);
      result.push(node.value);
      this.inorderHelper(node.right, result);
    }
  }

  getTreeHeight(): number {
    return this.getHeight(this.root);
  }

  isBalanced(): boolean {
    return this.checkBalance(this.root);
  }

  private checkBalance(node: TreeNode | null): boolean {
    if (!node) return true;
    
    const balance = Math.abs(this.getBalance(node));
    return balance <= 1 && this.checkBalance(node.left) && this.checkBalance(node.right);
  }
}