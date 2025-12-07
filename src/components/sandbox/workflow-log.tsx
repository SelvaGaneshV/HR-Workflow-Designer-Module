import { Button } from "@/components/ui/button";
import { cn, getIcon, getIconColor } from "@/lib/utils";
import type { Logs } from "@/types/workflow";
import { useReactFlow } from "@xyflow/react";
import React from "react";
/**
 * WorkflowLog Component
 *
 * Renders a single log entry inside the workflow simulation panel.
 * Includes:
 * - Log index number
 * - Icon representing the log type (info, success, error, etc.)
 * - Clickable message that focuses the React Flow viewport on the related node
 *
 * @component
 *
 * @param {Object} props - Component props.
 * @param {Logs} props.log - The log entry object containing message, type, and optional nodeId.
 * @param {number} props.i - The index of the log entry (used for numbering).
 *
 * @returns {JSX.Element} The rendered workflow log item.
 *
 * @example
 * <WorkflowLog
 *   log={{ type: "info", message: "Node executed", nodeId: "123" }}
 *   i={0}
 * />
 */
const WorkflowLog: React.FC<{ log: Logs; i: number }> = ({ log, i }) => {
  const { fitView } = useReactFlow();

  const Icon = getIcon(log.type);

  return (
    <div key={i} className="flex gap-2 items-start justify-center    text-sm">
      <span className="text-xs text-muted-foreground w-4">{i + 1}.</span>
      <Icon className={cn("size-4", getIconColor(log.type))} />
      <Button
        disabled={!log.nodeId ? true : false}
        onClick={() => {
          fitView({
            nodes: [{ id: log.nodeId }],
            duration: 500,
          });
        }}
        variant={"link"}
        className="flex-1 min-w-0 w-auto p-0 items-start justify-start  font-normal hover:text-primary text-muted-foreground"
      >
        <div className="whitespace-normal h-fit  text-balance text-start  overflow-hidden">
          {log.message}
        </div>
      </Button>
    </div>
  );
};

export default WorkflowLog;
