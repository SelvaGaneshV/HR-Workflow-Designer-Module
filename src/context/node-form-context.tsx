import type { NodeFormContextProps } from "@/types/node-form";
import { useReactFlow, type Node } from "@xyflow/react";
import React from "react";

export const NodeFormContext = React.createContext<NodeFormContextProps | null>(
  null
);

const NodeFromProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const { updateNodeData: updateData } = useReactFlow();
  const [selectedNode, setSelectedNode] = React.useState<Node | null>(null);
  const [errors, setErrors] = React.useState<Set<string>>(new Set());
  const selectedNodeId = selectedNode?.id || null;
  const resetForm = () => {
    setSelectedNode(null);

    setErrors(new Set());
  };
  const onSubmit = () => {
    if (!selectedNodeId || !selectedNode || errors.size) return;
    updateData(selectedNodeId, selectedNode?.data);
  };

  const updateNodeData = (data: Record<string, any>) => {
    setSelectedNode((prev) => {
      if (!prev) return prev;
      return {
        ...prev,
        data: {
          ...prev?.data,
          ...data,
        },
      };
    });
  };

  const addError = (error: string) =>
    setErrors((prev) => {
      const newSet = new Set(prev);
      newSet.add(error);
      return newSet;
    });

  const removeError = (error: string) =>
    setErrors((prev) => {
      const newSet = new Set(prev);
      newSet.delete(error);
      return newSet;
    });

  const onOpenNodeForm = (node: Node | null) => {
    setSelectedNode(node);
    setErrors(new Set());
  };

  return (
    <NodeFormContext.Provider
      value={{
        selectedNode,
        onSubmit,
        updateNodeData,
        onOpenNodeForm,
        errors,
        addError,
        removeError,
        selectedNodeId,
        resetForm,
      }}
    >
      {children}
    </NodeFormContext.Provider>
  );
};

export default NodeFromProvider;
