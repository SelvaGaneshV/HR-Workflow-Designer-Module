import { Handle, Position, type NodeProps } from "@xyflow/react";
import { Bot } from "lucide-react";
import React from "react";
import CustomNodeToolBar from "../custom-node-toolbar";

/**
 * A React component representing an automated step node in a workflow.
 *
 * It renders a node with a bot icon, a title, and a description.
 * The title and description are taken from the `data` prop.
 *
 * It also renders 2 handles: one for a source output, and one for a target input.
 *
 * @param {NodeProps} props - The props for the node.
 * @returns {React.ReactElement} - The automated step node component.
 */
const AutomatedStepNode: React.FC<NodeProps> = ({ id, data }) => {
  return (
    <div className="cursor-grab active:cursor-grabbing p-4 border min-w-30 min-h-12 bg-secondary text-secondary-foreground rounded-md transition-colors">
      <CustomNodeToolBar id={id} />
      <div className="flex items-center gap-3">
        <Bot className="size-5 " />
        <div>
          <div className="text-sm font-medium" title="">
            {(data?.title ? data?.title : "Automated Step") as React.ReactNode}
          </div>
        </div>
        <div className="text-xs ">{data?.description as React.ReactNode}</div>
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
