import { Button } from "@/components/ui/button";
import { EdgeToolbar, useReactFlow } from "@xyflow/react";
import { Trash } from "lucide-react";
import React from "react";

/**
 * BasicEdgeToolbar Component
 *
 * Renders a toolbar for a React Flow edge, positioned using the provided
 * coordinates. Includes controls such as deleting the edge.
 *
 * @component
 *
 * @param {Object} props - Component props.
 * @param {string} props.id - The unique ID of the edge this toolbar belongs to.
 * @param {number} props.x - The x-coordinate where the toolbar should be positioned.
 * @param {number} props.y - The y-coordinate where the toolbar should be positioned.
 *
 * @returns {React.JSX.Element} The rendered edge toolbar component.
 *
 * @example
 * <BasicEdgeToolbar id="edge-1" x={120} y={80} />
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
