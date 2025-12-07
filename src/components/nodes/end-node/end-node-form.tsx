import type { KeyValuePair } from "@/components/shared/key-value-input";
import KeyValueInput from "@/components/shared/key-value-input";
import NodeInput from "@/components/shared/node-input";
import useNodeForm from "@/hooks/use-node-form";

/**
 * A form component for EndNode.
 * It contains input fields for message and summary flag.
 * The form data is updated in the workflow context when the fields are changed.
 * @returns A JSX element representing the EndNode form.
 */
const EndNodeForm = () => {
  const { selectedNode, updateNodeData } = useNodeForm();
  const onNodeDataChange = (data: any) => {
    updateNodeData(data);
  };
  const onChangeKeyValue = (value: KeyValuePair[]) => {
    onNodeDataChange({ customFields: value });
  };

  return (
    <div className="flex flex-col  h-full items-center  justify-start gap-2.5">
      <NodeInput
        onChange={(value) => {
          onNodeDataChange({
            message: value,
          });
        }}
        type="textarea"
        label="Message"
        value={selectedNode?.data?.message}
      />

      <NodeInput
        onChange={(value) => {
          onNodeDataChange({
            summaryFlag: value,
          });
        }}
        type="checkbox"
        label="Summary flag"
        orientation="horizontal"
        value={selectedNode?.data?.summaryFlag}
      />

      <KeyValueInput onChange={onChangeKeyValue} />
    </div>
  );
};

export default EndNodeForm;
