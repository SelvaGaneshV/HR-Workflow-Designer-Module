import { BaseEdge, getSmoothStepPath, type EdgeProps } from "@xyflow/react";
import React from "react";
import BasicEdgeToolbar from "./basic-edge-toolbar";


/**
 * A basic edge component for the workflow canvas.
 *
 * It renders a toolbar with a single button to delete the edge.
 *
 * The edge itself is rendered as a smooth path between the source and
 * target nodes.
 *
 * @param {EdgeProps} props - The props for the edge component.
 * @param {string} props.id - The ID of the edge.
 * @returns {React.ReactElement} - The basic edge component.
 */
const BasicEdge: React.FC<EdgeProps> = ({ id, ...props }) => {
  const [edgePath, labelX, labelY] = getSmoothStepPath(props);

  return (
    <>
      <BasicEdgeToolbar id={id} x={labelX} y={labelY} />
      <BaseEdge id={id} path={edgePath} />
    </>
  );
};

export default BasicEdge;
