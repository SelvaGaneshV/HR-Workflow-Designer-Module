import CustomNodeToolBar from "@/components/nodes/custom-node-toolbar";
import { useWorkflow } from "@/hooks/use-workflow";
import { cn, getNodeStylesBasedOnType } from "@/lib/utils";
import type { AutomatedStepNodeProps } from "@/types/nodes";
import { useQueryClient } from "@tanstack/react-query";
import { Handle, Position } from "@xyflow/react";
import { Bot } from "lucide-react";
import React from "react";

const AutomatedStepNode: React.FC<AutomatedStepNodeProps> = ({ id, data }) => {
  const { logsNodesStatus } = useWorkflow();
  const queryClient = useQueryClient();
  const actions = queryClient.getQueryData(["automated-steps-actions"]);
  const action = Array.isArray(actions)
    ? actions?.find((a) => a.id === data?.action)?.label || ""
    : "";
  return (
    <div
      className={cn(
        "cursor-grab active:cursor-grabbing p-4 max-w-70 min-w-30 border min-h-12 bg-secondary text-secondary-foreground rounded-md transition-colors",
        getNodeStylesBasedOnType(logsNodesStatus[id]!)
      )}
    >
      <CustomNodeToolBar id={id} />
      <div className="flex items-center gap-3">
        <Bot className="size-5 " />
        <div className="flex flex-col">
          <div className="text-sm font-medium" title="">
            {(data?.title ? data?.title : "Automated Step") as React.ReactNode}
          </div>
          <div className="text-xs text-muted-foreground">
            {action as React.ReactNode}
          </div>
        </div>
      </div>
      <Handle
        id={id + "-source"}
        className="size-2.5!"
        style={{
          right: "-10%",
        }}
        type="source"
        position={Position.Right}
      />
      <Handle
        id={id + "-target"}
        className="size-2.5!"
        style={{
          left: "-10%",
        }}
        type="target"
        position={Position.Left}
      />
    </div>
  );
};

export default AutomatedStepNode;
