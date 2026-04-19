import React from 'react';

export const Sidebar: React.FC = () => {
  const onDragStart = (event: React.DragEvent, nodeType: string) => {
    event.dataTransfer.setData('application/reactflow', nodeType);
    event.dataTransfer.effectAllowed = 'move';
  };

  return (
    <aside className="sidebar">
      <h2>Nodes</h2>
      <div className="nodes-list">
        <div className="dnd-node start" onDragStart={(event) => onDragStart(event, 'start')} draggable>
          Start Node
        </div>
        <div className="dnd-node task" onDragStart={(event) => onDragStart(event, 'task')} draggable>
          Task Node
        </div>
        <div className="dnd-node approval" onDragStart={(event) => onDragStart(event, 'approval')} draggable>
          Approval Node
        </div>
        <div className="dnd-node automated" onDragStart={(event) => onDragStart(event, 'automated')} draggable>
          Automated Node
        </div>
        <div className="dnd-node end" onDragStart={(event) => onDragStart(event, 'end')} draggable>
          End Node
        </div>
      </div>
    </aside>
  );
};
