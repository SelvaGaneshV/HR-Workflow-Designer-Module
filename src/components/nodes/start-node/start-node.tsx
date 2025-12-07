import CustomNodeToolBar from "@/components/nodes/custom-node-toolbar";
import { useWorkflow } from "@/hooks/use-workflow";
import { cn, getNodeStylesBasedOnType } from "@/lib/utils";
import type { StartNodeProps } from "@/types/nodes";
import { Handle, Position } from "@xyflow/react";
import { Play } from "lucide-react";
import React from "react";

const StartNode: React.FC<StartNodeProps> = ({ id, data }) => {
  const { logsNodesStatus } = useWorkflow();
  return (
    <div
      className={cn(
        "cursor-grab active:cursor-grabbing p-4 max-w-70 min-w-30 border min-h-12 bg-secondary text-secondary-foreground rounded-md transition-colors",
        getNodeStylesBasedOnType(logsNodesStatus[id]!)
      )}
    >
      <CustomNodeToolBar id={id} />

      <div className="flex items-center gap-3 min-w-0">
        <Play className="size-5 shrink-0" />

        <div className="flex-1 min-w-0">
          <div
            className="text-sm font-medium truncate min-w-0"
            title={data?.title}
          >
            {(data?.title ? data?.title : "Start") as React.ReactNode}
          </div>
        </div>
      </div>

      <Handle
        id={id + "-source"}
        className="size-2.5!"
        style={{ right: "-10%" }}
        type="source"
        position={Position.Right}
      />
    </div>
  );
};

export default StartNode;
