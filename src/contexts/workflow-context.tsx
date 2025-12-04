import type { WorkflowContextType } from "@/types/workflow";
import type { Node } from "@xyflow/react";
import React from "react";

const WorkflowContext = React.createContext<WorkflowContextType | null>(null);

export const WorkflowProvider: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  const [dragData, setDragData] = React.useState<string | null>(null);
  const [selectedNode, setSelectedNode] = React.useState<Node | null>(null);
  return (
    <WorkflowContext.Provider
      value={{ dragData, setDragData, selectedNode, setSelectedNode }}
    >
      {children}
    </WorkflowContext.Provider>
  );
};

export function useWorkflow(): WorkflowContextType {
  const context = React.useContext(WorkflowContext);
  if (!context) {
    throw new Error("useWorkflow must be used within a WorkflowProvider");
  }
  return context;
}
