import { Button } from "@/components/ui/button";
import { EdgeToolbar, useReactFlow } from "@xyflow/react";
import { Trash } from "lucide-react";
import React from "react";

/**
 * A basic toolbar for edges in the workflow canvas.
 *
 * It contains a single button to delete the edge.
 *
 * @param {string} id - The ID of the edge.
 * @param {number} x - The x-coordinate of the toolbar.
 * @param {number} y - The y-coordinate of the toolbar.
 */
const BasicEdgeToolbar: React.FC<{
  id: string;
  x: number;
  y: number;
}> = ({ id, x, y }) => {
  const { deleteElements } = useReactFlow();
  return (
    <EdgeToolbar edgeId={id} x={x} y={y}>
      <div className="flex gap-2 items-center">
        <Button
          variant={"destructive"}
          onClick={() => {
            deleteElements({ edges: [{ id }] });
          }}
          size={"icon-sm"}
        >
          <Trash />
        </Button>
      </div>
    </EdgeToolbar>
  );
};

export default BasicEdgeToolbar;
