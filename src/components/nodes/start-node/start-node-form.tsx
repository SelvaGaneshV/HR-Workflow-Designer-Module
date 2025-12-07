import KeyValueInput, {
  type KeyValuePair,
} from "@/components/shared/key-value-input";
import NodeInput from "@/components/shared/node-input";
import useNodeForm from "@/hooks/use-node-form";

const StarNodeForm = () => {
  const { selectedNode, updateNodeData } = useNodeForm();
  const onNodeDataChange = (data: any) => {
    updateNodeData(data);
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
