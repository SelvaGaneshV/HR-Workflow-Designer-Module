import { Button } from "@/components/ui/button";
import useNodeForm from "@/hooks/use-node-form";
import { NodeToolbar, Position, useReactFlow } from "@xyflow/react";
import { Edit, TrashIcon } from "lucide-react";
import React from "react";

const CustomNodeToolBar: React.FC<{ id: string }> = ({ id }) => {
  const { deleteElements, getNode } = useReactFlow();
  const { onOpenNodeForm } = useNodeForm();
  return (
    <NodeToolbar position={Position.Top} align={"center"}>
      <Button
        onClick={() => {
          onOpenNodeForm(getNode(id) || null);
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
