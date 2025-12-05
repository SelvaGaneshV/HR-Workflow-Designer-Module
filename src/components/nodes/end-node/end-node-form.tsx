import type { KeyValuePair } from "@/components/shared/key-value-input";
import KeyValueInput from "@/components/shared/key-value-input";
import NodeInput from "@/components/shared/node-input";
import { useWorkflow } from "@/contexts/workflow-context";
import { useReactFlow } from "@xyflow/react";
import React from "react";

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
            title: value,
          });
        }}
        validate={(value) => (!value ? "Required" : null)}
        type="text"
        label="Title"
        value={selectedNode?.data?.title}
      />
      <div className="w-full h-full   flex-1 overflow-hidden">
        <KeyValueInput onChange={onChangeKeyValue} />
      </div>
    </div>
  );
};

export default EndNodeForm;
