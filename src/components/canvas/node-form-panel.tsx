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
      className="bg-sidebar flex flex-col items-center justify-start h-[97%] w-xs rounded-md border border-sidebar-border"
    >
      <div className="flex items-center justify-center border-b border-sidebar-border px-3 py-2">
        <span className="text-xl font-medium text-center text-muted-foreground">
          {
            (selectedNode?.data?.label
              ? selectedNode?.data?.label
              : "Start") as React.ReactNode
          }
        </span>
      </div>
      <div className="flex-1 w-full h-full p-3">
        <RenderForm type={selectedNode?.type} />
      </div>
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
