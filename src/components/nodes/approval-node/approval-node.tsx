import { Badge } from "@/components/ui/badge";
import type { ApprovalNodeProps } from "@/types/nodes";
import { Handle, Position } from "@xyflow/react";
import { Stamp } from "lucide-react";
import React from "react";
import CustomNodeToolBar from "../custom-node-toolbar";

/**
 * A React component representing an approval node in a workflow.
 *
 * It renders a node with a stamp icon, a title, and a description.
 * The title and description are taken from the `data` prop.
 *
 * It also renders 3 handles: one for an approved output, one for a rejected output, and one for a target input.
 *
 * @param {ApprovalNodeProps} props - The props for the node.
 * @returns {React.ReactElement} - The approval node component.
 */
const ApprovalNode: React.FC<ApprovalNodeProps> = ({ id, data }) => {
  return (
    <div className="cursor-grab active:cursor-grabbing p-4 border min-w-30 max-w-70 min-h-12 bg-secondary text-secondary-foreground rounded-md transition-colors">
      <CustomNodeToolBar id={id} />

      <div className="flex items-start gap-3">
        <Stamp className="size-5 shrink-0" />

        <div className="flex flex-col min-w-0">
          <div
            className="text-sm font-medium truncate max-w-[200px]"
            title={data?.title || "Approval"}
          >
            {data?.title || "Approval"}
          </div>

          <div className="flex flex-wrap gap-1 mt-1">
            {data?.approverRole && (
              <Badge
                variant="outline"
                className="text-xs font-normal text-muted-foreground px-2 py-0.5 truncate max-w-[130px]"
              >
                Role: {data.approverRole}
              </Badge>
            )}

            {data?.autoApprove && (
              <Badge
                variant="outline"
                className="text-[10px] font-normal px-2 py-0.5 border-green-400/40 text-green-600 truncate max-w-[150px]"
              >
                Auto-approve till {data.autoApprove}
              </Badge>
            )}
          </div>
        </div>
      </div>

      {/* Handles */}
      <Handle
        id={id + "-source-approved"}
        type="source"
        className=" size-2.5!"
        style={{
          right: "-10%",
        }}
        position={Position.Right}
      />
      <Handle
        id={id + "-source-rejected"}
        className=" border-destructive! size-2.5!"
        type="source"
        style={{
          bottom: "-30%",
        }}
        position={Position.Bottom}
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

export default ApprovalNode;
