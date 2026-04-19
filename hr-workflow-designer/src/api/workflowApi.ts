import type { Node, Edge } from '@xyflow/react';

export interface Automation {
  id: string;
  label: string;
  params: string[];
}

export const getAutomations = async (): Promise<Automation[]> => {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 500));
  return [
    { id: 'send_email', label: 'Send Email', params: ['to', 'subject'] },
    { id: 'generate_doc', label: 'Generate Document', params: ['template', 'recipient'] },
    { id: 'update_db', label: 'Update Database', params: ['table', 'recordId'] },
    { id: 'notify_slack', label: 'Notify Slack', params: ['channel', 'message'] },
  ];
};

export const simulateWorkflow = async (nodes: Node[], edges: Edge[]): Promise<string[]> => {
  await new Promise((resolve) => setTimeout(resolve, 800));
  
  const logs: string[] = [];
  logs.push('Starting workflow simulation...');

  // Basic validation
  const startNodes = nodes.filter((n) => n.type === 'start');
  if (startNodes.length === 0) {
    logs.push('ERROR: No Start Node found. Workflow aborted.');
    return logs;
  }
  if (startNodes.length > 1) {
    logs.push('ERROR: Multiple Start Nodes found. Must specify exactly one. Workflow aborted.');
    return logs;
  }

  // Build adjacency list for topological traversal
  const adj = new Map<string, string[]>();
  nodes.forEach((n) => adj.set(n.id, []));
  edges.forEach((e) => {
    if (adj.has(e.source)) {
      adj.get(e.source)!.push(e.target);
    }
  });

  // Track visited array
  const visited = new Set<string>();
  
  // BFS Traversal Simulation
  const queue: string[] = [startNodes[0].id];
  visited.add(startNodes[0].id);

  while (queue.length > 0) {
    const currentId = queue.shift()!;
    const node = nodes.find((n) => n.id === currentId);
    if (!node) continue;

    logs.push(`Executing Node (${node.type}): ${node.data?.title || 'Unknown Title'}`);
    
    // Process based on node type
    switch (node.type) {
      case 'start':
        logs.push(` -> Metadata initialized.`);
        break;
      case 'task':
        logs.push(` -> Assigned to ${node.data?.assignee || 'Unassigned'} | Due: ${node.data?.dueDate || 'N/A'}`);
        break;
      case 'approval':
        logs.push(` -> Awaiting approval from role: ${node.data?.approverRole || 'Manager'} `);
        break;
      case 'automated':
        logs.push(` -> Action triggered: ${node.data?.action || 'None'}`);
        break;
      case 'end':
        logs.push(` -> Workflow ended. ${node.data?.endMessage || ''}`);
        break;
    }

    const neighbors = adj.get(currentId) || [];
    for (const neighbor of neighbors) {
      if (!visited.has(neighbor)) {
        visited.add(neighbor);
        queue.push(neighbor);
      }
    }
  }

  logs.push('Workflow simulation completed.');
  return logs;
};
