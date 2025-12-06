import type {
  SimulationResult,
  WorkflowContextType,
  WorkflowJson,
} from "@/types/workflow";
import type { Node } from "@xyflow/react";
import React from "react";

const WorkflowContext = React.createContext<WorkflowContextType | null>(null);

export const WorkflowProvider: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  const [dragData, setDragData] = React.useState<string | null>(null);
  const [selectedNode, setSelectedNode] = React.useState<Node | null>(null);
  const [isSandboxOpen, setIsSandboxOpen] = React.useState(false);
  const openSandbox = () => setIsSandboxOpen(true);
  const closeSandbox = () => setIsSandboxOpen(false);

  return (
    <WorkflowContext.Provider
      value={{
        dragData,
        setDragData,
        selectedNode,
        setSelectedNode,
        isSandboxOpen,
        openSandbox,
        closeSandbox,
      }}
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
