import type { NodeProps } from "@xyflow/react";
interface StartNodeProps extends NodeProps {
  data: {
    title?: string;
    customFields?: Record<string, any>;
  };
}

interface TaskNodeProps extends NodeProps {
  data: {
    title?: string;
    description?: string;
    assignee?: string;
    dueDate?: string;
    customFields?: Record<string, any>;
  };
}
interface ApprovalNodeProps extends NodeProps {
  data: {
    title?: string;
    approverRole?: string;
    autoApprove?: number;
    customFields?: Record<string, any>;
  };
}

interface AutomatedStepNodeProps extends NodeProps {
  data: {
    title?: string;
    action?: string;
    parameters?: Record<string, any>;
    customFields?: Record<string, any>;
  };
}

interface EndNodeProps extends NodeProps {
  data: {
    message?: string;
    summaryFlag?: boolean;
  };
}

type AutomatadStepActionsResponse = {
  id: string;
  label: string;
  params: string[];
};

export type {
  StartNodeProps,
  TaskNodeProps,
  ApprovalNodeProps,
  AutomatedStepNodeProps,
  EndNodeProps,
  AutomatadStepActionsResponse,
};
