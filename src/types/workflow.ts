import type { Edge, Node } from "@xyflow/react";
type SimulationResult = {
  log: string[];
  status: "success" | "error";
};
type WorkflowContextType = {
  dragData: string | null;
  setDragData: React.Dispatch<React.SetStateAction<string | null>>;
  selectedNode: Node | null;
  setSelectedNode: React.Dispatch<React.SetStateAction<Node | null>>;
  isSandboxOpen: boolean;
  openSandbox: () => void;
  closeSandbox: () => void;
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
};
