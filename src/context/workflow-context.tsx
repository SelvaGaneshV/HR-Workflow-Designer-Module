import { useSimulation } from "@/hooks/use-simulation";
import type { Selectedflow, WorkflowContextType } from "@/types/workflow";
import { useNodesData } from "@xyflow/react";
import React from "react";

export const WorkflowContext = React.createContext<WorkflowContextType | null>(
  null
);

export const WorkflowProvider: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  const [dragData, setDragData] = React.useState<string | null>(null);
  const [selectedNodeId, setSelectedNodeId] = React.useState<string | null>(
    null
  );
  const [isSandboxOpen, setIsSandboxOpen] = React.useState(false);
  const [selectedFlow, setSelectedFlow] = React.useState<null | Selectedflow>(
    null
  );

  const { runSimulation, simulation, isSimulating } = useSimulation();

  const selectedNode = useNodesData(selectedNodeId!);

  const openSandbox = () => setIsSandboxOpen(true);

  const closeSandbox = () => setIsSandboxOpen(false);
  const openChangeSandboxSidebar = (v: boolean) => setIsSandboxOpen(v);

  const logs = React.useMemo(() => {
    if (!simulation || !selectedFlow) return null;
    return simulation.logs?.[selectedFlow.id] ?? null;
  }, [simulation, selectedFlow]);

  const logsNodesStatus = React.useMemo(() => {
    if (!logs) return {};

    return logs.reduce((acc: Record<string, string>, log) => {
      const key = log.nodeId || log.title;
      if (key) acc[key] = log.type;
      return acc;
    }, {});
  }, [logs]);

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
        selectedFlow,
        setSelectedFlow,
        openChangeSandboxSidebar,
        logsNodesStatus,
        logs,
      }}
    >
      {children}
    </WorkflowContext.Provider>
  );
};
