import ApprovalNodeForm from "@/components/nodes/approval-node/apporval-node-form";
import AutomatedStepNodeForm from "@/components/nodes/automated-step-node/automated-step-node-form";
import EndNodeForm from "@/components/nodes/end-node/end-node-form";
import StarNodeForm from "@/components/nodes/start-node/start-node-form";
import TaskNodeForm from "@/components/nodes/task-node/task-node-form";
import { useWorkflow } from "@/contexts/workflow-context";
import { Panel } from "@xyflow/react";
import type React from "react";

const NodeFormPanel = () => {
  const { selectedNode } = useWorkflow();

  if (!selectedNode) {
    return null;
  }

  return (
    <Panel
      position="top-right"
      className="bg-sidebar h-[97%] w-xs rounded-md border border-sidebar-border"
    >
      <RenderForm type={selectedNode?.type} />
    </Panel>
  );
};

const RenderForm: React.FC<{ type: string | undefined }> = ({ type }) => {
  switch (type) {
    case "start":
      return <StarNodeForm />;
    case "end":
      return <EndNodeForm />;
    case "approval":
      return <ApprovalNodeForm />;
    case "task":
      return <TaskNodeForm />;
    case "automatedStep":
      return <AutomatedStepNodeForm />;
    default:
      return null;
  }
};

export default NodeFormPanel;
