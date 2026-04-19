import React, { useEffect, useState } from 'react';
import { useWorkflowStore } from '../store/workflowStore';
import { getAutomations, type Automation } from '../api/workflowApi';

export const NodeConfigPanel: React.FC = () => {
  const { nodes, selectedNodeId, updateNodeData, setNodes } = useWorkflowStore();
  const [automations, setAutomations] = useState<Automation[]>([]);
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    getAutomations().then(setAutomations);
  }, []);

  const selectedNode = nodes.find((n) => n.id === selectedNodeId);

  if (!selectedNode) {
    return (
      <aside className="config-panel empty-panel">
        <p>Select a node to configure</p>
      </aside>
    );
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    let errorMsg = '';

    if (name === 'title' && value.trim() === '') {
      errorMsg = 'Title is required';
    } 
    if (name === 'autoApproveThreshold') {
      const num = Number(value);
      if (isNaN(num) || num < 0) {
        errorMsg = 'Must be a positive number';
        setErrors({ ...errors, [name]: errorMsg });
        return; // Prevent update
      }
    }

    setErrors({ ...errors, [name]: errorMsg });
    updateNodeData(selectedNode.id, { [name]: name === 'autoApproveThreshold' ? Number(value) : value });
  };

  const handleDelete = () => {
    setNodes(nodes.filter(n => n.id !== selectedNode.id));
  };

  return (
    <aside className="config-panel">
      <div className="config-header">
        <h3>Configure Node</h3>
        <button className="del-btn" onClick={handleDelete}>Delete Node</button>
      </div>

      <div className="config-form">
        <div className="form-group">
          <label>Title</label>
          <input
            type="text"
            name="title"
            value={String(selectedNode.data?.title || '')}
            onChange={handleChange}
            placeholder="Node Title"
            className={errors.title ? 'invalid-input' : ''}
          />
          {errors.title && <span style={{ color: '#ef4444', fontSize: '11px', marginTop: '4px' }}>{errors.title}</span>}
        </div>

        {selectedNode.type === 'start' && (
          <div className="form-group">
            <label>Metadata Key-Value Pairs</label>
            <input
              type="text"
              name="metadata"
              value={String(selectedNode.data?.metadata || '')}
              onChange={handleChange}
              placeholder="e.g. source: web"
            />
          </div>
        )}

        {selectedNode.type === 'task' && (
          <>
            <div className="form-group">
              <label>Assignee</label>
              <input
                type="text"
                name="assignee"
                value={String(selectedNode.data?.assignee || '')}
                onChange={handleChange}
                placeholder="e.g. John Doe"
              />
            </div>
            <div className="form-group">
              <label>Due Date</label>
              <input
                type="date"
                name="dueDate"
                value={String(selectedNode.data?.dueDate || '')}
                onChange={handleChange}
              />
            </div>
          </>
        )}

        {selectedNode.type === 'approval' && (
          <>
            <div className="form-group">
              <label>Approver Role</label>
              <input
                type="text"
                name="approverRole"
                value={String(selectedNode.data?.approverRole || '')}
                onChange={handleChange}
                placeholder="e.g. HR Manager"
              />
            </div>
            <div className="form-group">
              <label>Auto-Approve Threshold (Days)</label>
              <input
                type="number"
                name="autoApproveThreshold"
                value={String(selectedNode.data?.autoApproveThreshold || '')}
                onChange={handleChange}
                className={errors.autoApproveThreshold ? 'invalid-input' : ''}
              />
              {errors.autoApproveThreshold && <span style={{ color: '#ef4444', fontSize: '11px', marginTop: '4px' }}>{errors.autoApproveThreshold}</span>}
            </div>
          </>
        )}

        {selectedNode.type === 'automated' && (
          <div className="form-group">
            <label>Action</label>
            <select name="action" value={String(selectedNode.data?.action || '')} onChange={handleChange}>
              <option value="">Select Action</option>
              {automations.map((opt) => (
                <option key={opt.id} value={opt.id}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>
        )}

        {selectedNode.type === 'end' && (
          <div className="form-group">
            <label>End Message</label>
            <input
              type="text"
              name="endMessage"
              value={String(selectedNode.data?.endMessage || '')}
              onChange={handleChange}
              placeholder="e.g. HR Onboarding Complete"
            />
          </div>
        )}
      </div>
    </aside>
  );
};
