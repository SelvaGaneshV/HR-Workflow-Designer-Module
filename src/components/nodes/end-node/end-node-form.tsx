import type { KeyValuePair } from "@/components/shared/key-value-input";
import KeyValueInput from "@/components/shared/key-value-input";
import NodeInput from "@/components/shared/node-input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useWorkflow } from "@/context/workflow-context";
import { useReactFlow } from "@xyflow/react";
import React from "react";

/**
 * A form component for EndNode.
 * It contains input fields for message and summary flag.
 * The form data is updated in the workflow context when the fields are changed.
 * @returns A JSX element representing the EndNode form.
 */
const EndNodeForm = () => {
  const { updateNodeData } = useReactFlow();
  const { selectedNode } = useWorkflow();
  const onNodeDataChange = (data: any) => {
    updateNodeData(selectedNode!.id, data);
  };
  const onChangeKeyValue = (value: KeyValuePair[]) => {
    console.log(value);
  };

  return (
    <div className="flex flex-col h-full items-center overflow-hidden justify-start gap-2.5">
      <NodeInput
        onChange={(value) => {
          onNodeDataChange({
            message: value,
          });
        }}
        type="textArea"
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
        value={selectedNode?.data?.summaryFlag}
      />
      <ScrollArea className="w-full flex-1 h-[680px]">
        <KeyValueInput onChange={onChangeKeyValue} />
      </ScrollArea>
    </div>
  );
};

export default EndNodeForm;
