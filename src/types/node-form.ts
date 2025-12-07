import type { Node } from "@xyflow/react";
import type React from "react";

type NodeInputType =
  | React.HTMLInputTypeAttribute
  | "dropdown"
  | "checkbox"
  | "textarea";
type NodeInputProps = {
  label: string;
  value: any;
  onChange: (value: any) => void;
  validate?: (value: any) => string | null;
  type?: NodeInputType;
  disable?: boolean;
  orientation?: "vertical" | "horizontal" | "responsive";
};
type InputDeciderProps = Omit<NodeInputProps, "label"> & {
  error: string | null | undefined;
  setError: (value: string | null | undefined) => void;
};

type NodeFormContextProps = {
  selectedNodeId: string | null;
  selectedNode: Node | null;
  onOpenNodeForm: (node: Node | null) => void;
  onSubmit: () => void;
  addError: (error: string) => void;
  errors: Set<string>;
  removeError: (error: string) => void;
  updateNodeData: (data: Record<string, any>) => void;
  resetForm: () => void;
};

export type {
  NodeInputProps,
  NodeInputType,
  InputDeciderProps,
  NodeFormContextProps,
};
