import { Handle, Position } from '@xyflow/react';
import { Play } from 'lucide-react';

export const StartNode = ({ data }: any) => {
  return (
    <div className="custom-node start-node">
      <div className="node-header">
        <Play size={16} />
        <span>{data.title || 'Start Node'}</span>
      </div>
      <div className="node-content">
        <small>Initiates Workflow</small>
      </div>
      <Handle type="source" position={Position.Bottom} className="handle-source" />
    </div>
  );
};
