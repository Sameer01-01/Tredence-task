import type { WorkflowNode, WorkflowEdge } from '../types/workflow';

export type SimulationStep = { 
  log: string; 
  activeNodeId?: string; 
  nextNodeIds?: string[];
  status?: 'running' | 'completed';
};

export async function* simulateWorkflowAdvanced(nodes: WorkflowNode[], edges: WorkflowEdge[]): AsyncGenerator<SimulationStep> {
  const startNodes = nodes.filter((n) => n.type === 'start');
  if (startNodes.length === 0) return;

  const adj = new Map<string, string[]>();
  nodes.forEach((n) => adj.set(n.id, []));
  edges.forEach((e) => {
    if (adj.has(e.source)) {
      adj.get(e.source)!.push(e.target);
    }
  });

  const visited = new Set<string>();
  const queue: string[] = [startNodes[0].id];
  visited.add(startNodes[0].id);

  yield { log: 'Booting advanced execution engine...' };

  while (queue.length > 0) {
    const currentId = queue.shift()!;
    const node = nodes.find((n) => n.id === currentId);
    if (!node) continue;

    const neighbors = adj.get(currentId) || [];
    
    yield { 
      log: `Executing [${node.type.toUpperCase()}] Node: ${node.data.title || 'Untitled'}`, 
      activeNodeId: currentId,
      status: 'running'
    };

    await new Promise(r => setTimeout(r, 800));

    let actionLog = '';
    // Process based on node type
    switch (node.type) {
      case 'start':
        actionLog = `-> Context initialized successfully.`;
        break;
      case 'task':
        actionLog = `-> Task dynamically assigned to ${node.data.assignee || 'Unassigned'} with deadline ${node.data.dueDate || 'N/A'}`;
        break;
      case 'approval':
        const thr = node.data.autoApproveThreshold || 0;
        actionLog = `-> Sent for manual approval by ${node.data.approverRole || 'Manager'}. (Auto-approval threshold: ${thr})`;
        break;
      case 'automated':
        actionLog = `-> System trigger executed: [${node.data.action || 'None'}] payload fired.`;
        break;
      case 'end':
        actionLog = `-> Terminating branch. System log: "${node.data.endMessage || ''}"`;
        break;
    }
    
    yield { log: actionLog, activeNodeId: currentId, status: 'completed', nextNodeIds: neighbors };
    
    await new Promise(r => setTimeout(r, 400));

    for (const neighbor of neighbors) {
      if (!visited.has(neighbor)) {
        visited.add(neighbor);
        queue.push(neighbor);
      }
    }
  }

  yield { log: 'Global execution flow resolved.' };
}
