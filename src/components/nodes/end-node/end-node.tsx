import { Handle, Position, type NodeProps } from "@xyflow/react";
import { SquareCheckBig } from "lucide-react";
import React from "react";
import CustomNodeToolBar from "../custom-node-toolbar";

const EndNode: React.FC<NodeProps> = ({ id, data }) => {
  return (
    <div className="cursor-grab active:cursor-grabbing p-4 min-w-30 border min-h-12 bg-secondary text-secondary-foreground rounded-md transition-colors">
      <CustomNodeToolBar id={id} />
      <div className="flex items-center gap-3">
        <SquareCheckBig className="size-5 " />
        <div>
          <div className="text-sm font-medium" title="">
            {(data?.title ? data?.title : "End") as React.ReactNode}
          </div>
        </div>
        <div className="text-xs ">{data?.description as React.ReactNode}</div>
      </div>
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

export default EndNode;
