import type { WorkflowNode, WorkflowEdge } from '../types/workflow';

export interface WorkflowTemplate {
  id: string;
  name: string;
  description: string;
  category: string;
  icon: string;
  nodes: WorkflowNode[];
  edges: WorkflowEdge[];
}

// ─────────────────────────────────────────────
// TEMPLATE 1 — Employee Onboarding
// ─────────────────────────────────────────────
const onboardingTemplate: WorkflowTemplate = {
  id: 'employee-onboarding',
  name: 'Employee Onboarding',
  description: 'Full onboarding flow: collect documents, get manager approval, then send welcome email automatically.',
  category: 'HR Operations',
  icon: '🧑‍💼',
  nodes: [
    { id: 'on-1', type: 'start',     position: { x: 300, y: 40  }, data: { title: 'New Hire Starts' } },
    { id: 'on-2', type: 'task',      position: { x: 300, y: 160 }, data: { title: 'Collect Documents', assignee: 'HR Coordinator', dueDate: '' } },
    { id: 'on-3', type: 'approval',  position: { x: 300, y: 300 }, data: { title: 'Manager Approval', approverRole: 'Hiring Manager', autoApproveThreshold: 3 } },
    { id: 'on-4', type: 'automated', position: { x: 300, y: 440 }, data: { title: 'Send Welcome Email', action: 'send_email' } },
    { id: 'on-5', type: 'task',      position: { x: 300, y: 580 }, data: { title: 'IT Setup', assignee: 'IT Support', dueDate: '' } },
    { id: 'on-6', type: 'end',       position: { x: 300, y: 720 }, data: { title: 'Onboarding Complete', endMessage: 'Employee successfully onboarded.' } },
  ] as WorkflowNode[],
  edges: [
    { id: 'on-e1', source: 'on-1', target: 'on-2' },
    { id: 'on-e2', source: 'on-2', target: 'on-3' },
    { id: 'on-e3', source: 'on-3', target: 'on-4' },
    { id: 'on-e4', source: 'on-4', target: 'on-5' },
    { id: 'on-e5', source: 'on-5', target: 'on-6' },
  ],
};

// ─────────────────────────────────────────────
// TEMPLATE 2 — Leave Approval
// ─────────────────────────────────────────────
const leaveApprovalTemplate: WorkflowTemplate = {
  id: 'leave-approval',
  name: 'Leave Approval',
  description: 'Employee applies for leave, a manager reviews it, HR is notified, and the request is closed.',
  category: 'Approvals',
  icon: '📅',
  nodes: [
    { id: 'lv-1', type: 'start',     position: { x: 300, y: 40  }, data: { title: 'Leave Requested' } },
    { id: 'lv-2', type: 'task',      position: { x: 300, y: 160 }, data: { title: 'Fill Leave Form', assignee: 'Employee', dueDate: '' } },
    { id: 'lv-3', type: 'approval',  position: { x: 300, y: 300 }, data: { title: 'Manager Review', approverRole: 'Direct Manager', autoApproveThreshold: 2 } },
    { id: 'lv-4', type: 'automated', position: { x: 300, y: 440 }, data: { title: 'Update HR System', action: 'update_db' } },
    { id: 'lv-5', type: 'automated', position: { x: 300, y: 560 }, data: { title: 'Notify Employee', action: 'send_email' } },
    { id: 'lv-6', type: 'end',       position: { x: 300, y: 700 }, data: { title: 'Leave Approved', endMessage: 'Leave request processed successfully.' } },
  ] as WorkflowNode[],
  edges: [
    { id: 'lv-e1', source: 'lv-1', target: 'lv-2' },
    { id: 'lv-e2', source: 'lv-2', target: 'lv-3' },
    { id: 'lv-e3', source: 'lv-3', target: 'lv-4' },
    { id: 'lv-e4', source: 'lv-4', target: 'lv-5' },
    { id: 'lv-e5', source: 'lv-5', target: 'lv-6' },
  ],
};

// ─────────────────────────────────────────────
// TEMPLATE 3 — Document Verification (Condition branch)
// ─────────────────────────────────────────────
const documentVerificationTemplate: WorkflowTemplate = {
  id: 'document-verification',
  name: 'Document Verification',
  description: 'Checks if submitted documents pass a score threshold. Routes to re-submission or final approval.',
  category: 'Compliance',
  icon: '📋',
  nodes: [
    { id: 'dv-1', type: 'start',     position: { x: 280, y: 40  }, data: { title: 'Documents Submitted' } },
    { id: 'dv-2', type: 'task',      position: { x: 280, y: 160 }, data: { title: 'Initial Review', assignee: 'Compliance Officer', dueDate: '' } },
    { id: 'dv-3', type: 'condition', position: { x: 280, y: 300 }, data: { title: 'Docs Valid?', field: 'score', operator: '>', value: '70' } },
    { id: 'dv-4', type: 'automated', position: { x: 100, y: 460 }, data: { title: 'Request Re-submission', action: 'send_email' } },
    { id: 'dv-5', type: 'task',      position: { x: 100, y: 600 }, data: { title: 'Re-submit Documents', assignee: 'Employee', dueDate: '' } },
    { id: 'dv-6', type: 'approval',  position: { x: 480, y: 460 }, data: { title: 'Final Approval', approverRole: 'HR Director', autoApproveThreshold: 5 } },
    { id: 'dv-7', type: 'end',       position: { x: 480, y: 620 }, data: { title: 'Verification Complete', endMessage: 'Documents verified and approved.' } },
  ] as WorkflowNode[],
  edges: [
    { id: 'dv-e1', source: 'dv-1', target: 'dv-2' },
    { id: 'dv-e2', source: 'dv-2', target: 'dv-3' },
    { id: 'dv-e3', source: 'dv-3', target: 'dv-4', sourceHandle: 'false', label: 'false' },
    { id: 'dv-e4', source: 'dv-3', target: 'dv-6', sourceHandle: 'true',  label: 'true'  },
    { id: 'dv-e5', source: 'dv-4', target: 'dv-5' },
    { id: 'dv-e6', source: 'dv-5', target: 'dv-3' },
    { id: 'dv-e7', source: 'dv-6', target: 'dv-7' },
  ],
};

// ─────────────────────────────────────────────
// TEMPLATE 4 — Parallel HR Process (fan-out)
// ─────────────────────────────────────────────
const parallelHRTemplate: WorkflowTemplate = {
  id: 'parallel-hr-process',
  name: 'Parallel HR Process',
  description: 'Background check and document verification run simultaneously, then merge before final approval.',
  category: 'HR Operations',
  icon: '⇉',
  nodes: [
    { id: 'ph-1', type: 'start',    position: { x: 300, y: 40  }, data: { title: 'Candidate Accepted' } },
    { id: 'ph-2', type: 'parallel', position: { x: 300, y: 160 }, data: { title: 'Start Parallel Checks', label: 'Background & Documents' } },
    { id: 'ph-3', type: 'task',     position: { x: 120, y: 320 }, data: { title: 'Background Check', assignee: 'HR Analyst', dueDate: '' } },
    { id: 'ph-4', type: 'task',     position: { x: 480, y: 320 }, data: { title: 'Document Verification', assignee: 'Compliance Officer', dueDate: '' } },
    { id: 'ph-5', type: 'merge',    position: { x: 300, y: 500 }, data: { title: 'Sync Results', strategy: 'all' } },
    { id: 'ph-6', type: 'approval', position: { x: 300, y: 640 }, data: { title: 'Final HR Approval', approverRole: 'HR Director', autoApproveThreshold: 7 } },
    { id: 'ph-7', type: 'end',      position: { x: 300, y: 780 }, data: { title: 'Process Complete', endMessage: 'All checks passed. Candidate cleared.' } },
  ] as WorkflowNode[],
  edges: [
    { id: 'ph-e1', source: 'ph-1', target: 'ph-2' },
    { id: 'ph-e2', source: 'ph-2', target: 'ph-3' },
    { id: 'ph-e3', source: 'ph-2', target: 'ph-4' },
    { id: 'ph-e4', source: 'ph-3', target: 'ph-5' },
    { id: 'ph-e5', source: 'ph-4', target: 'ph-5' },
    { id: 'ph-e6', source: 'ph-5', target: 'ph-6' },
    { id: 'ph-e7', source: 'ph-6', target: 'ph-7' },
  ],
};

// ─────────────────────────────────────────────
// TEMPLATE 5 — Performance Review
// ─────────────────────────────────────────────
const performanceReviewTemplate: WorkflowTemplate = {
  id: 'performance-review',
  name: 'Performance Review',
  description: 'Annual review cycle: self-assessment, manager scoring, conditional outcome routing, and HR archival.',
  category: 'Reviews',
  icon: '📊',
  nodes: [
    { id: 'pr-1', type: 'start',     position: { x: 300, y: 40  }, data: { title: 'Review Cycle Begins' } },
    { id: 'pr-2', type: 'task',      position: { x: 300, y: 160 }, data: { title: 'Self Assessment', assignee: 'Employee', dueDate: '' } },
    { id: 'pr-3', type: 'task',      position: { x: 300, y: 300 }, data: { title: 'Manager Scoring', assignee: 'Direct Manager', dueDate: '' } },
    { id: 'pr-4', type: 'delay',     position: { x: 300, y: 440 }, data: { title: 'Calibration Period', delayMs: 3000 } },
    { id: 'pr-5', type: 'condition', position: { x: 300, y: 580 }, data: { title: 'Rating >= 4?', field: 'rating', operator: '>=', value: '4' } },
    { id: 'pr-6', type: 'automated', position: { x: 100, y: 740 }, data: { title: 'Flag for PIP', action: 'notify_slack' } },
    { id: 'pr-7', type: 'automated', position: { x: 480, y: 740 }, data: { title: 'Send Commendation', action: 'send_email' } },
    { id: 'pr-8', type: 'automated', position: { x: 300, y: 880 }, data: { title: 'Archive to HR System', action: 'update_db' } },
    { id: 'pr-9', type: 'end',       position: { x: 300, y: 1020 }, data: { title: 'Review Closed', endMessage: 'Performance review cycle completed.' } },
  ] as WorkflowNode[],
  edges: [
    { id: 'pr-e1', source: 'pr-1', target: 'pr-2' },
    { id: 'pr-e2', source: 'pr-2', target: 'pr-3' },
    { id: 'pr-e3', source: 'pr-3', target: 'pr-4' },
    { id: 'pr-e4', source: 'pr-4', target: 'pr-5' },
    { id: 'pr-e5', source: 'pr-5', target: 'pr-6', sourceHandle: 'false', label: 'false' },
    { id: 'pr-e6', source: 'pr-5', target: 'pr-7', sourceHandle: 'true',  label: 'true'  },
    { id: 'pr-e7', source: 'pr-6', target: 'pr-8' },
    { id: 'pr-e8', source: 'pr-7', target: 'pr-8' },
    { id: 'pr-e9', source: 'pr-8', target: 'pr-9' },
  ],
};


// ─────────────────────────────────────────────
// TEMPLATE 6 — Document Verification Flow (loop + labelled branches)
// ─────────────────────────────────────────────
const docVerificationLoopTemplate: WorkflowTemplate = {
  id: 'doc-verification-loop',
  name: 'Document Verification Flow',
  description: 'Employee uploads docs → validated by condition. YES routes to approval & close. NO loops back to re-upload.',
  category: 'Compliance',
  icon: '🔄',
  nodes: [
    { id: 'dvl-1', type: 'start',     position: { x: 300, y: 40  }, data: { title: 'Process Initiated' } },
    { id: 'dvl-2', type: 'task',      position: { x: 300, y: 180 }, data: { title: 'Upload Documents',        assignee: 'Employee',           dueDate: '' } },
    { id: 'dvl-3', type: 'condition', position: { x: 300, y: 340 }, data: { title: 'Documents Valid?',       field: 'score', operator: '>', value: '60' } },
    { id: 'dvl-4', type: 'automated', position: { x: 80,  y: 500 }, data: { title: 'Notify Re-upload Required', action: 'send_email' } },
    { id: 'dvl-5', type: 'task',      position: { x: 80,  y: 660 }, data: { title: 'Re-upload Documents',    assignee: 'Employee',           dueDate: '' } },
    { id: 'dvl-6', type: 'approval',  position: { x: 540, y: 500 }, data: { title: 'Compliance Approval',    approverRole: 'Compliance Lead', autoApproveThreshold: 3 } },
    { id: 'dvl-7', type: 'automated', position: { x: 540, y: 660 }, data: { title: 'Archive & Confirm',      action: 'update_db' } },
    { id: 'dvl-8', type: 'end',       position: { x: 540, y: 800 }, data: { title: 'Verification Complete',  endMessage: 'All documents verified and archived.' } },
  ] as WorkflowNode[],
  edges: [
    { id: 'dvl-e1', source: 'dvl-1', target: 'dvl-2' },
    { id: 'dvl-e2', source: 'dvl-2', target: 'dvl-3' },
    // YES branch → approval
    { id: 'dvl-e3', source: 'dvl-3', target: 'dvl-6', sourceHandle: 'true',  label: 'Yes — Valid' },
    // NO branch → re-upload loop
    { id: 'dvl-e4', source: 'dvl-3', target: 'dvl-4', sourceHandle: 'false', label: 'No — Invalid' },
    { id: 'dvl-e5', source: 'dvl-4', target: 'dvl-5' },
    // Loop back to condition after re-upload
    { id: 'dvl-e6', source: 'dvl-5', target: 'dvl-3' },
    { id: 'dvl-e7', source: 'dvl-6', target: 'dvl-7' },
    { id: 'dvl-e8', source: 'dvl-7', target: 'dvl-8' },
  ],
};

// ─────────────────────────────────────────────
// TEMPLATE 7 — Escalation Flow (multi-level condition)
// ─────────────────────────────────────────────
const escalationFlowTemplate: WorkflowTemplate = {
  id: 'escalation-flow',
  name: 'Escalation Flow',
  description: 'Request goes through manager approval, then a delay check decides if senior escalation is needed.',
  category: 'Approvals',
  icon: '🚨',
  nodes: [
    { id: 'esc-1', type: 'start',     position: { x: 300, y: 40  }, data: { title: 'Request Submitted' } },
    { id: 'esc-2', type: 'task',      position: { x: 300, y: 180 }, data: { title: 'Submit Request Form',      assignee: 'Employee',          dueDate: '' } },
    { id: 'esc-3', type: 'approval',  position: { x: 300, y: 340 }, data: { title: 'Manager Approval',         approverRole: 'Line Manager',   autoApproveThreshold: 2 } },
    { id: 'esc-4', type: 'delay',     position: { x: 300, y: 500 }, data: { title: 'SLA Timer',                delayMs: 2000 } },
    { id: 'esc-5', type: 'condition', position: { x: 300, y: 660 }, data: { title: 'Delay > 2 Days?',          field: 'delay', operator: '>', value: '2' } },
    // NO branch — direct close
    { id: 'esc-6', type: 'automated', position: { x: 80,  y: 820 }, data: { title: 'Notify Requester',         action: 'send_email' } },
    { id: 'esc-7', type: 'end',       position: { x: 80,  y: 970 }, data: { title: 'Request Closed',           endMessage: 'Resolved within SLA. No escalation needed.' } },
    // YES branch — escalate
    { id: 'esc-8', type: 'approval',  position: { x: 550, y: 820 }, data: { title: 'Senior Manager Approval',  approverRole: 'Senior Manager', autoApproveThreshold: 5 } },
    { id: 'esc-9', type: 'automated', position: { x: 550, y: 970 }, data: { title: 'Log Escalation Event',     action: 'update_db' } },
    { id: 'esc-10', type: 'end',      position: { x: 550, y: 1110 }, data: { title: 'Escalation Resolved',     endMessage: 'Escalated and approved by senior management.' } },
  ] as WorkflowNode[],
  edges: [
    { id: 'esc-e1', source: 'esc-1', target: 'esc-2' },
    { id: 'esc-e2', source: 'esc-2', target: 'esc-3' },
    { id: 'esc-e3', source: 'esc-3', target: 'esc-4' },
    { id: 'esc-e4', source: 'esc-4', target: 'esc-5' },
    // NO → direct end
    { id: 'esc-e5', source: 'esc-5', target: 'esc-6',  sourceHandle: 'false', label: 'No — Within SLA' },
    // YES → escalate
    { id: 'esc-e6', source: 'esc-5', target: 'esc-8',  sourceHandle: 'true',  label: 'Yes — Escalate' },
    { id: 'esc-e7', source: 'esc-6', target: 'esc-7' },
    { id: 'esc-e8', source: 'esc-8', target: 'esc-9' },
    { id: 'esc-e9', source: 'esc-9', target: 'esc-10' },
  ],
};

export const workflowTemplates: WorkflowTemplate[] = [
  onboardingTemplate,
  leaveApprovalTemplate,
  documentVerificationTemplate,
  parallelHRTemplate,
  performanceReviewTemplate,
  docVerificationLoopTemplate,
  escalationFlowTemplate,
];
