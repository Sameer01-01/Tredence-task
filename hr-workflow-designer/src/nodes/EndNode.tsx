import { Handle, Position } from '@xyflow/react';
import { SquareSquare } from 'lucide-react';

export const EndNode = ({ data }: any) => {
  return (
    <div className="custom-node end-node">
      <Handle type="target" position={Position.Top} className="handle-target" />
      <div className="node-header">
        <SquareSquare size={16} />
        <span>{data.title || 'End Node'}</span>
      </div>
      <div className="node-content">
        <small>{data.endMessage || 'Terminates workflow'}</small>
      </div>
    </div>
  );
};
