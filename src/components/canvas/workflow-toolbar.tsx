import { useWorkflow } from "@/context/workflow-context";
import { Panel, useReactFlow, type Edge, type Node } from "@xyflow/react";
import { Button } from "../ui/button";
import WorkflowExportButton from "./workflow-export-button";
import WorkflowImportButton from "./workflow-import-button";

/**
 * A toolbar component for the workflow canvas that contains buttons for
 * opening the sandbox, exporting the workflow, and importing a workflow
 * JSON file.
 *
 * It uses the `useReactFlow` hook to get the setEdges and setNodes
 * functions, which are used to update the edges and nodes of the
 * workflow when importing a workflow JSON file.
 *
 * The `onImport` function is called when the user imports a workflow
 * JSON file, and it updates the edges and nodes of the workflow
 * accordingly.
 *
 * The component renders a panel with the buttons for opening the
 * sandbox, exporting the workflow, and importing a workflow JSON file.
 */
const WorkflowToolbar: React.FC = () => {
  const { setEdges, setNodes } = useReactFlow();
  const { openSandbox } = useWorkflow();
  const onImport = (data: { nodes: Node[]; edges: Edge[] }) => {
    setEdges(data.edges);
    setNodes(data.nodes);
  };
  return (
    <Panel position="bottom-center" className="flex gap-2">
      <Button variant="outline" size={"sm"} onClick={openSandbox}>
        Open Sandbox
      </Button>
      <WorkflowExportButton />
      <WorkflowImportButton onImport={onImport} />
    </Panel>
  );
};

export default WorkflowToolbar;
