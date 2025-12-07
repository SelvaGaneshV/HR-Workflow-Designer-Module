import type { Edge, Node } from "@xyflow/react";
type Logs = {
  type: string;
  title: string;
  time: string;
  message: string;
  nodeType: string;
  nodeId: string;
  nodeTitle: string;
};

type Selectedflow = {
  id: string;
  title: string | undefined;
  iconType: string;
};

type SimulationResult = {
  logs: Record<string, Logs[]>;
  paths: string[][];
};
type UseSimulation = {
  simulation: SimulationResult | undefined;
  runSimulation: (workflowJson: WorkflowJson) => void;
  isSimulating: boolean;
};

type WorkflowContextType = UseSimulation & {
  logs: Logs[] | null;
  dragData: string | null;
  setDragData: React.Dispatch<React.SetStateAction<string | null>>;
  selectedNode: Pick<Node, "id" | "type" | "data"> | null;
  setSelectedNodeId: React.Dispatch<React.SetStateAction<string | null>>;
  isSandboxOpen: boolean;
  openSandbox: () => void;
  closeSandbox: () => void;
  openChangeSandboxSidebar: (v: boolean) => void;
  selectedFlow: Selectedflow | null;
  logsNodesStatus: Record<string, string>;
  setSelectedFlow: React.Dispatch<React.SetStateAction<Selectedflow | null>>;
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
  Selectedflow,
  Logs,
};
