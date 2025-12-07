import useNodeForm from "@/hooks/use-node-form";
import { Controls, MiniMap } from "@xyflow/react";

const WorkflowControls = () => {
  const { selectedNodeId } = useNodeForm();

  return (
    <>
      <Controls />
      {!selectedNodeId && (
        <MiniMap
          bgColor="var(--background)"
          nodeColor="var(--accent)"
          maskColor="var(--secondary)"
          position="bottom-right"
        />
      )}
    </>
  );
};

export default WorkflowControls;
