import type { Edge, Node } from "@xyflow/react";
type SimulationResult = {
  logs: Record<string, { type: string; message: string }[]>;
  paths: string[][];
};
type UseSimulation = {
  simulation: SimulationResult | undefined;
  runSimulation: (workflowJson: WorkflowJson) => void;
  isSimulating: boolean;
};

type WorkflowContextType = UseSimulation & {
  dragData: string | null;
  setDragData: React.Dispatch<React.SetStateAction<string | null>>;
  selectedNode: Pick<Node, "id" | "type" | "data"> | null;
  setSelectedNodeId: React.Dispatch<React.SetStateAction<string | null>>;
  isSandboxOpen: boolean;
  openSandbox: () => void;
  closeSandbox: () => void;
  openChangeSandboxSidebar: (v: boolean) => void;
};

type WorkflowJson = { nodes: Node[]; edges: Edge[] };

type WorkflowSandboxProps = {
  workflowJson: WorkflowJson;
};

export type {
  WorkflowContextType,
  SimulationResult,
  WorkflowSandboxProps,
  WorkflowJson,
  UseSimulation,
};
