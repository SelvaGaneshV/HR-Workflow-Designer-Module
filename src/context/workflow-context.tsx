import { useSimulation } from "@/hooks/use-simulation";
import type { WorkflowContextType } from "@/types/workflow";
import { useNodesData } from "@xyflow/react";
import React from "react";

const WorkflowContext = React.createContext<WorkflowContextType | null>(null);

export const WorkflowProvider: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  const [dragData, setDragData] = React.useState<string | null>(null);
  const [selectedNodeId, setSelectedNodeId] = React.useState<string | null>(
    null
  );
  const [isSandboxOpen, setIsSandboxOpen] = React.useState(false);
  const { runSimulation, simulation, isSimulating } = useSimulation();

  const selectedNode = useNodesData(selectedNodeId!);

  const openSandbox = () => setIsSandboxOpen(true);

  const closeSandbox = () => setIsSandboxOpen(false);
  const openChangeSandboxSidebar = (v: boolean) => setIsSandboxOpen(v);
  return (
    <WorkflowContext.Provider
      value={{
        dragData,
        setDragData,
        selectedNode,
        setSelectedNodeId,
        isSandboxOpen,
        openSandbox,
        closeSandbox,
        runSimulation,
        simulation,
        isSimulating,
        openChangeSandboxSidebar,
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
