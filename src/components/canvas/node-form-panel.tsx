import ApprovalNodeForm from "@/components/nodes/approval-node/apporval-node-form";
import AutomatedStepNodeForm from "@/components/nodes/automated-step-node/automated-step-node-form";
import EndNodeForm from "@/components/nodes/end-node/end-node-form";
import StarNodeForm from "@/components/nodes/start-node/start-node-form";
import TaskNodeForm from "@/components/nodes/task-node/task-node-form";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import useNodeForm from "@/hooks/use-node-form";
import { Panel, useNodesData } from "@xyflow/react";
import { Save } from "lucide-react";
import type React from "react";

/**
 * A panel that displays a form for the currently selected node.
 * If no node is selected, it renders nothing.
 * The form is determined by the type of the selected node.
 * @returns A panel with a form for the selected node.
 */
const NodeFormPanel: React.FC = () => {
  const { selectedNode, selectedNodeId, errors, onSubmit } = useNodeForm();
  const node = useNodesData(selectedNodeId!);
  if (!selectedNode || !node) {
    return null;
  }

  return (
    <Panel
      position="top-right"
      className="bg-sidebar flex flex-col items-center justify-start h-[97%] w-xs rounded-md border border-sidebar-border"
    >
      <div className="flex w-full h-12 items-center justify-between border-b gap-1 border-sidebar-border px-3 py-2">
        <span className="text-xl font-medium text-start truncate capitalize text-muted-foreground">
          {
            (node?.data?.title
              ? node?.data?.title
              : selectedNode?.type) as React.ReactNode
          }
        </span>
        <Button
          variant={"outline"}
          onClick={onSubmit}
          disabled={errors.size > 0}
          size="icon-sm"
        >
          <Save />
        </Button>
      </div>
      <div className="flex-1 min-h-0 w-full overflow-hidden ">
        <ScrollArea className="w-full h-full p-3">
          <RenderForm
            key={selectedNode.id + "-form"}
            type={selectedNode?.type}
          />
        </ScrollArea>
      </div>
    </Panel>
  );
};

/**
 * Renders a form based on the type of the node.
 * If the type is "start", it renders a StarNodeForm.
 * If the type is "end", it renders an EndNodeForm.
 * If the type is "approval", it renders an ApprovalNodeForm.
 * If the type is "task", it renders a TaskNodeForm.
 * If the type is "automatedStep", it renders an AutomatedStepNodeForm.
 * If the type is undefined or any other value, it renders null.
 *
 * @param {string | undefined} type - The type of the node.
 * @returns {React.ReactElement | null} - The rendered form or null if the type is undefined or any other value.
 */
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
