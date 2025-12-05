import type { KeyValuePair } from "@/components/shared/key-value-input";
import KeyValueInput from "@/components/shared/key-value-input";
import NodeInput from "@/components/shared/node-input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useWorkflow } from "@/contexts/workflow-context";
import { useReactFlow } from "@xyflow/react";

const TaskNodeForm = () => {
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
            description: value,
          });
        }}
        validate={(value) => (!value ? "Required" : null)}
        type="text"
        label="Description"
        value={selectedNode?.data?.description}
      />
      <NodeInput
        onChange={(value) => {
          onNodeDataChange({
            assignee: value,
          });
        }}
        validate={(value) => (!value ? "Required" : null)}
        type="text"
        label="Assignee"
        value={selectedNode?.data?.assignee}
      />
      <NodeInput
        onChange={(value) => {
          onNodeDataChange({
            dueDate: value,
          });
        }}
        validate={(value) => (!value ? "Required" : null)}
        type="date"
        label="Due Date"
        value={selectedNode?.data?.dueDate}
      />
      <ScrollArea className="h-full w-full flex-1 ">
        <KeyValueInput onChange={onChangeKeyValue} />
      </ScrollArea>
    </div>
  );
};

export default TaskNodeForm;
