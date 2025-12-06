import { Handle, Position, type NodeProps } from "@xyflow/react";
import { ClipboardCheck } from "lucide-react";
import React from "react";
import CustomNodeToolBar from "../custom-node-toolbar";

const TaskNode: React.FC<NodeProps> = ({ id, data }) => {
  return (
    <div className="cursor-grab active:cursor-grabbing p-4 min-w-30 border min-h-12 bg-secondary text-secondary-foreground rounded-md transition-colors">
      <CustomNodeToolBar id={id} />
      <div className="flex items-center gap-3">
        <ClipboardCheck className="size-5" />
        <div>
          <div className="text-sm font-medium" title="">
            {(data?.title ? data?.title : "Task") as React.ReactNode}
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

export default TaskNode;
