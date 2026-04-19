import type { Node, Edge } from '@xyflow/react';

export interface BaseNodeData extends Record<string, unknown> {
  title: string;
}

export interface StartNodeData extends BaseNodeData {
  metadata?: Record<string, string>;
}

export interface TaskNodeData extends BaseNodeData {
  assignee?: string;
  dueDate?: string;
}

export interface ApprovalNodeData extends BaseNodeData {
  approverRole?: string;
  autoApproveThreshold?: number;
}

export interface AutomatedNodeData extends BaseNodeData {
  action?: string;
}

export interface EndNodeData extends BaseNodeData {
  endMessage?: string;
}

export type WorkflowNodeData =
  | StartNodeData
  | TaskNodeData
  | ApprovalNodeData
  | AutomatedNodeData
  | EndNodeData;

export type WorkflowNode = Node<WorkflowNodeData, 'start' | 'task' | 'approval' | 'automated' | 'end'>;
export type WorkflowEdge = Edge;
