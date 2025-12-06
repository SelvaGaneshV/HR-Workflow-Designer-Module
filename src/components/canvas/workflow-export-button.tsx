import { Button } from "@/components/ui/button";
import { downloadWorkflow } from "@/lib/workflow/export";
import { useReactFlow } from "@xyflow/react";
import { Download } from "lucide-react";

const WorkflowExportButton = () => {
  const { toObject } = useReactFlow();
  return (
    <Button
      size="icon-sm"
      title="Download Workflow"
      variant="secondary"
      onClick={() => downloadWorkflow(toObject())}
    >
      <Download />
    </Button>
  );
};

export default WorkflowExportButton;
