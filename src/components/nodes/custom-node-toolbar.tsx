import { Button } from "@/components/ui/button";
import { useWorkflow } from "@/context/workflow-context";
import { NodeToolbar, Position, useReactFlow } from "@xyflow/react";
import { Edit, TrashIcon } from "lucide-react";
import React from "react";

const CustomNodeToolBar: React.FC<{ id: string }> = ({ id }) => {
  const { getNode, deleteElements } = useReactFlow();
  const { setSelectedNode } = useWorkflow();
  return (
    <NodeToolbar isVisible={undefined} position={Position.Top} align={"center"}>
      <Button
        onClick={() => {
          setSelectedNode(getNode(id)!);
        }}
        size={"icon-sm"}
        variant={"ghost"}
      >
        <Edit />
      </Button>
      <Button
        onClick={() => {
          deleteElements({ nodes: [{ id }] });
        }}
        size={"icon-sm"}
        variant={"ghost"}
      >
        <TrashIcon className="text-destructive" />
      </Button>
    </NodeToolbar>
  );
};

export default CustomNodeToolBar;
