import { DueDateBadge } from "@/components/due-date-badge";
import { Separator } from "@/components/ui/separator";
import type { TaskNodeProps } from "@/types/nodes";
import { Handle, Position } from "@xyflow/react";
import { ClipboardCheck } from "lucide-react";
import React from "react";
import CustomNodeToolBar from "../custom-node-toolbar";

const TaskNode: React.FC<TaskNodeProps> = ({ id, data }) => {
  return (
    <div className="cursor-grab active:cursor-grabbing p-4 max-w-70 min-w-30 border min-h-12 bg-secondary text-secondary-foreground rounded-md transition-colors">
      <CustomNodeToolBar id={id} />

      <div className="flex flex-col gap-2.5 w-full min-w-0">
        <div className="flex items-center gap-3 w-full min-w-0">
          <ClipboardCheck className="size-5 shrink-0" />

          <div className="flex gap-2.5 flex-1 items-center justify-between min-w-0">
            <div
              className="text-sm font-medium flex-1 truncate"
              title={data?.title}
            >
              {(data?.title ? data?.title : "Task") as React.ReactNode}
            </div>

            <div className="flex items-center gap-2 text-xs text-muted-foreground min-w-0">
              {data?.assignee && (
                <div className="truncate max-w-20">
                  to: {data.assignee as React.ReactNode}
                </div>
              )}

              <DueDateBadge date={data?.dueDate} />
            </div>
          </div>
        </div>

        {data?.description && (
          <>
            <Separator />
            <div className="text-xs text-muted-foreground wrap-break-word">
              {data?.description as React.ReactNode}
            </div>
          </>
        )}
      </div>

      <Handle
        id={id + "-source"}
        className="size-2.5!"
        style={{ right: "-10%" }}
        type="source"
        position={Position.Right}
      />
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

export default TaskNode;
