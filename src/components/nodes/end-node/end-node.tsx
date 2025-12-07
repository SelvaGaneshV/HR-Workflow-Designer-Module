import CustomNodeToolBar from "@/components/nodes/custom-node-toolbar";
import { Badge } from "@/components/ui/badge";
import { useWorkflow } from "@/hooks/use-workflow";
import { cn, getNodeStylesBasedOnType } from "@/lib/utils";
import type { EndNodeProps } from "@/types/nodes";
import { Handle, Position } from "@xyflow/react";
import { SquareCheckBig } from "lucide-react";
import React from "react";

const EndNode: React.FC<EndNodeProps> = ({ id, data }) => {
  const { logsNodesStatus } = useWorkflow();
  return (
    <div
      className={cn(
        "cursor-grab active:cursor-grabbing p-4 max-w-70 min-w-30 border min-h-12 bg-secondary text-secondary-foreground rounded-md transition-colors",
        getNodeStylesBasedOnType(logsNodesStatus[id]!)
      )}
    >
      <CustomNodeToolBar id={id} />

      <div className="flex items-start gap-3">
        <SquareCheckBig className="size-5 shrink-0" />

        <div className="flex flex-col min-w-0">
          {/* Fixed title */}
          <div className="text-sm font-medium">End</div>

          {/* Description (message) */}
          {data?.message && (
            <div className="text-xs text-muted-foreground mt-0.5 wrap-break-word max-w-[180px]">
              {data.message}
            </div>
          )}

          {/* Summary flag badge */}
          {/* Summary flag (boolean) */}
          {data?.summaryFlag === true && (
            <Badge
              variant="outline"
              className="text-[10px] font-normal px-2 py-0.5 mt-1"
            >
              Summary
            </Badge>
          )}
        </div>
      </div>

      <Handle
        id={id + "-target"}
        className="size-2.5!"
        style={{ left: "-10%" }}
        type="target"
        position={Position.Left}
      />
    </div>
  );
};

export default EndNode;
