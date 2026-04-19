import React, { useState } from 'react';
import { useWorkflowStore } from '../store/workflowStore';
import { simulateWorkflow } from '../api/workflowApi';
import { PlayCircle } from 'lucide-react';

export const SimulationPanel: React.FC = () => {
  const { nodes, edges } = useWorkflowStore();
  const [logs, setLogs] = useState<string[]>([]);
  const [isRunning, setIsRunning] = useState(false);

  const handleRun = async () => {
    setIsRunning(true);
    setLogs([]);
    try {
      const resultLogs = await simulateWorkflow(nodes, edges);
      setLogs(resultLogs);
    } catch (err) {
      setLogs(['Error executing simulation']);
    } finally {
      setIsRunning(false);
    }
  };

  return (
    <div className="simulation-panel">
      <div className="panel-header">
        <button onClick={handleRun} disabled={isRunning} className="run-btn">
          <PlayCircle size={16} />
          {isRunning ? 'Running...' : 'Run Workflow'}
        </button>
      </div>
      <div className="logs-container">
        {logs.length === 0 ? (
          <p className="no-logs">Press "Run Workflow" to see execution steps</p>
        ) : (
          logs.map((log, index) => (
            <div key={index} className={`log-entry ${log.includes('ERROR') ? 'log-error' : ''}`}>
              {log}
            </div>
          ))
        )}
      </div>
    </div>
  );
};
