import { TreeNode } from '../types/AVLTree';

export interface LayoutNode extends TreeNode {
  x: number;
  y: number;
}

export function calculateTreeLayout(root: TreeNode | null, width: number, height: number): LayoutNode[] {
  if (!root) return [];

  const nodes: LayoutNode[] = [];
  const levelHeight = height / (getTreeHeight(root) + 1);
  
  function layoutNode(node: TreeNode, x: number, y: number, level: number, minX: number, maxX: number): void {
    const layoutNode: LayoutNode = {
      ...node,
      x,
      y: level * levelHeight + 50
    };
    nodes.push(layoutNode);

    if (node.left) {
      const leftX = minX + (x - minX) / 2;
      layoutNode(node.left, leftX, y + levelHeight, level + 1, minX, x);
    }

    if (node.right) {
      const rightX = x + (maxX - x) / 2;
      layoutNode(node.right, rightX, y + levelHeight, level + 1, x, maxX);
    }
  }

  layoutNode(root, width / 2, 50, 0, 0, width);
  return nodes;
}

function getTreeHeight(node: TreeNode | null): number {
  if (!node) return 0;
  return Math.max(getTreeHeight(node.left), getTreeHeight(node.right)) + 1;
}

export function getNodeConnections(nodes: LayoutNode[]): Array<{ from: LayoutNode; to: LayoutNode }> {
  const connections: Array<{ from: LayoutNode; to: LayoutNode }> = [];
  const nodeMap = new Map(nodes.map(n => [n.id, n]));

  nodes.forEach(node => {
    if (node.left) {
      const leftNode = nodeMap.get(node.left.id);
      if (leftNode) {
        connections.push({ from: node, to: leftNode });
      }
    }
    if (node.right) {
      const rightNode = nodeMap.get(node.right.id);
      if (rightNode) {
        connections.push({ from: node, to: rightNode });
      }
    }
  });

  return connections;
}