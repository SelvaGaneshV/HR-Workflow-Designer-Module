import { Button } from "@/components/ui/button";
import { useWorkflow } from "@/hooks/use-workflow";
import { NodeToolbar, Position, useReactFlow } from "@xyflow/react";
import { Edit, TrashIcon } from "lucide-react";
import React from "react";

const CustomNodeToolBar: React.FC<{ id: string }> = ({ id }) => {
  const { deleteElements } = useReactFlow();
  const { setSelectedNodeId } = useWorkflow();
  return (
    <NodeToolbar position={Position.Top} align={"center"}>
      <Button
        onClick={() => {
          setSelectedNodeId(id);
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
