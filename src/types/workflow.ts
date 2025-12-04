import type { Node } from "@xyflow/react";

type WorkflowContextType = {
  dragData: string | null;
  setDragData: React.Dispatch<React.SetStateAction<string | null>>;
  selectedNode: Node | null;
  setSelectedNode: React.Dispatch<React.SetStateAction<Node | null>>;
};

export type { WorkflowContextType };
