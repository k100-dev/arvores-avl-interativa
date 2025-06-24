export interface TreeNode {
  value: number;
  left: TreeNode | null;
  right: TreeNode | null;
  height: number;
  id: string;
  x?: number;
  y?: number;
}

export interface RotationStep {
  type: 'LL' | 'RR' | 'LR' | 'RL';
  description: string;
  beforeTree: TreeNode | null;
  afterTree: TreeNode | null;
}

export interface AnimationFrame {
  node: TreeNode;
  x: number;
  y: number;
  duration: number;
}