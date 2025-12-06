import type { KeyValuePair } from "@/components/shared/key-value-input";
import KeyValueInput from "@/components/shared/key-value-input";
import NodeInput from "@/components/shared/node-input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useWorkflow } from "@/context/workflow-context";
import { useReactFlow } from "@xyflow/react";

/**
 * A form component for ApprovalNode.
 * It contains input fields for title, approver role and auto-approve.
 * It also contains a KeyValueInput component for custom key-value pairs.
 * The form data is updated in the workflow context when the fields are changed.
 * @returns A JSX element representing the ApprovalNode form.
 */
const ApprovalNodeForm = () => {
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
      <NodeInput
        onChange={(value) => {
          onNodeDataChange({
            approverRole: value,
          });
        }}
        validate={(value) => (!value ? "Required" : null)}
        type="text"
        label="Approver role"
        value={selectedNode?.data?.approverRole}
      />
      <NodeInput
        onChange={(value) => {
          onNodeDataChange({
            autoApprove: value,
          });
        }}
        validate={(value) => (!value ? "Required" : null)}
        type="number"
        label="Auto-approve"
        value={selectedNode?.data?.autoApprove}
      />

      <KeyValueInput onChange={onChangeKeyValue} />
    </div>
  );
};

export default ApprovalNodeForm;
