import KeyValueInput, {
  type KeyValuePair,
} from "@/components/shared/key-value-input";
import NodeInput from "@/components/shared/node-input";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { useWorkflow } from "@/contexts/workflow-context";
import { useReactFlow } from "@xyflow/react";

const StarNodeForm = () => {
  const { updateNodeData } = useReactFlow();
  const { selectedNode } = useWorkflow();
  const onNodeDataChange = (data: any) => {
    updateNodeData(selectedNode!.id, data);
  };
  const onChangeKeyValue = (value: KeyValuePair[]) => {
    console.log(value);
  };

  return (
    <div className="flex flex-col items-center justify-start gap-2.5">
      <NodeInput
        onChange={(value) => {
          onNodeDataChange({
            label: value,
          });
        }}
        validate={(value) => (!value ? "Required" : null)}
        type="text"
        label="Label"
        value={selectedNode?.data?.label}
      />
      <div className="w-full">
        <KeyValueInput onChange={onChangeKeyValue} />
      </div>
    </div>
  );
};

export default StarNodeForm;
