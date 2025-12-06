import KeyValueInput, {
  type KeyValuePair,
} from "@/components/shared/key-value-input";
import NodeInput from "@/components/shared/node-input";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useWorkflow } from "@/context/workflow-context";
import { useReactFlow } from "@xyflow/react";

const StarNodeForm = () => {
  const { updateNodeData } = useReactFlow();
  const { selectedNode } = useWorkflow();
  const onNodeDataChange = (data: any) => {
    updateNodeData(selectedNode!.id, data);
  };
  const onChangeKeyValue = (value: KeyValuePair[]) => {
    onNodeDataChange({ customFields: value });
  };

  return (
    <div className="flex flex-col h-full items-center justify-start gap-2.5">
      <NodeInput
        onChange={(value) => {
          onNodeDataChange({
            title: value,
          });
        }}
        validate={(value) => (!value ? "Required" : null)}
        type="text"
        label="Title"
        value={selectedNode?.data?.title}
      />

      <KeyValueInput
        value={(selectedNode?.data?.customFields as KeyValuePair[]) || []}
        onChange={onChangeKeyValue}
      />
    </div>
  );
};

export default StarNodeForm;
