import BasicEdgeToolbar from "@/components/edges/basic-edge/basic-edge-toolbar";
import { useWorkflow } from "@/hooks/use-workflow";
import { getEdgeStylesBasedOnType } from "@/lib/utils";
import { BaseEdge, getSmoothStepPath, type EdgeProps } from "@xyflow/react";
import React from "react";

/**
 * BasicEdge Component
 *
 * Custom React Flow edge that:
 * - Renders a smooth step edge using `getSmoothStepPath`
 * - Applies conditional styling based on workflow execution logs
 * - Displays a floating toolbar (delete button) positioned at the edge label coordinates
 *
 * @component
 *
 * @param {EdgeProps} props - React Flow edge properties.
 * @param {string} props.id - Unique ID of the edge.
 * @param {string} props.source - ID of the source node.
 * @param {string} props.target - ID of the target node.
 *
 * @returns {React.JSX.Element} The rendered custom edge with toolbar.
 *
 * @example
 * <BasicEdge id="e1-2" source="1" target="2" {...otherProps} />
 */
const BasicEdge: React.FC<EdgeProps> = ({ id, target, source, ...props }) => {
  const [edgePath, labelX, labelY] = getSmoothStepPath(props);
  const { logsNodesStatus } = useWorkflow();
  return (
    <>
      <BasicEdgeToolbar id={id} x={labelX} y={labelY} />
      <BaseEdge
        id={id}
        path={edgePath}
        className={getEdgeStylesBasedOnType(
          logsNodesStatus[target]! && logsNodesStatus[source]!
            ? logsNodesStatus[target]!
            : ""
        )}
      />
    </>
  );
};

export default BasicEdge;
