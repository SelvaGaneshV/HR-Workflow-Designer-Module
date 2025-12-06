import { Button } from "@/components/ui/button";
import { parseWorkflowFile } from "@/lib/workflow/import";
import { Upload } from "lucide-react";
import { useRef } from "react";
import { toast } from "sonner";

const WorkflowImportButton: React.FC<{
  onImport: (data: { nodes: any[]; edges: any[] }) => void;
}> = ({ onImport }) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      const workflow = await parseWorkflowFile(file);

      onImport(workflow);

      toast.success(
        <>Workflow Imported, Your workflow JSON was imported successfully.</>
      );
    } catch (err: any) {
      toast.error(
        <>Error importing workflow JSON: {err.message || "Unknown error."}</>
      );
    }

    e.target.value = "";
  };

  return (
    <>
      <input
        ref={inputRef}
        type="file"
        accept="application/json"
        className="hidden"
        onChange={handleFileSelect}
      />

      <Button
        title="Import Workflow"
        size={"icon-sm"}
        variant="secondary"
        onClick={() => inputRef.current?.click()}
      >
        <Upload />
      </Button>
    </>
  );
};

export default WorkflowImportButton;
