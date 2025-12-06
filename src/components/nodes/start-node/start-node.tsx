import CustomNodeToolBar from "@/components/nodes/custom-node-toolbar";
import { Handle, Position, type NodeProps } from "@xyflow/react";
import { Play } from "lucide-react";
import React from "react";

const StartNode: React.FC<NodeProps> = ({ id, data }) => {
  return (
    <div className="cursor-grab active:cursor-grabbing p-4 min-w-30 border min-h-12 bg-secondary text-secondary-foreground rounded-md transition-colors">
      <CustomNodeToolBar id={id} />
      <div className="flex items-center gap-3">
        <Play className="size-5" />
        <div>
          <div className="text-sm font-medium" title="">
            {(data?.title ? data?.title : "Start") as React.ReactNode}
          </div>
        </div>
        <div className="text-xs">{data?.description as React.ReactNode}</div>
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
    </div>
  );
};

export default StartNode;
