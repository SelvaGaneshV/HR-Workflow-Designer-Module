import type { AutomatedStepNodeProps } from "@/types/nodes";
import { Handle, Position } from "@xyflow/react";
import { Bot } from "lucide-react";
import React from "react";
import CustomNodeToolBar from "../custom-node-toolbar";
import { useQueryClient } from "@tanstack/react-query";

const AutomatedStepNode: React.FC<AutomatedStepNodeProps> = ({ id, data }) => {
  const queryClient = useQueryClient();
  const actions = queryClient.getQueryData(["automated-steps-actions"]);
  const action = Array.isArray(actions)
    ? actions?.find((a) => a.id === data?.action)?.label || ""
    : "";

  return (
    <div className="cursor-grab active:cursor-grabbing p-4 border min-w-30 max-w-70 min-h-12 bg-secondary text-secondary-foreground rounded-md transition-colors">
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
