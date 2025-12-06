import { useWorkflow } from "@/context/workflow-context";
import { Controls, MiniMap } from "@xyflow/react";

const WorkflowControls = () => {
  const { selectedNode } = useWorkflow();

  return (
    <>
      <Controls />
      {!selectedNode && (
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
