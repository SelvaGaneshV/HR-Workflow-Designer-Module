import type { KeyValuePair } from "@/components/shared/key-value-input";
import KeyValueInput from "@/components/shared/key-value-input";
import NodeInput from "@/components/shared/node-input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { InputGroupButton } from "@/components/ui/input-group";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { useWorkflow } from "@/context/workflow-context";
import { useQuery } from "@tanstack/react-query";
import { useReactFlow } from "@xyflow/react";
import { ChevronDownIcon } from "lucide-react";
import React from "react";

type AutomationResponse = {
  id: string;
  label: string;
  params: string[];
};
/**
 * A form component for AutomatedStepNode.
 * It contains input fields for title and action.
 * The form data is updated in the workflow context when the fields are changed.
 * @returns A JSX element representing the AutomatedStepNode form.
 */
const AutomatedStepNodeForm = () => {
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
      <AutomationsActions onChange={onNodeDataChange} />

      <ScrollArea className="w-full  h-[600px]">
        <KeyValueInput onChange={onChangeKeyValue} />
      </ScrollArea>
    </div>
  );
};

const AutomationsActions: React.FC<{
  onChange: (value: any) => void;
}> = ({ onChange }) => {
  const { selectedNode } = useWorkflow();
  const [action, setAction] = React.useState<string | undefined>(
    selectedNode?.data?.action as string | undefined
  );
  const { data: actionList, isLoading } = useQuery({
    queryKey: ["automated-steps"],
    queryFn: async (): Promise<AutomationResponse[]> => {
      const response = await fetch("/api/automations");
      return response.json();
    },
  });
  const params = actionList?.find((item) => item.id === action)?.params || [];
  const selectedAction =
    actionList?.find((item) => item.id === action)?.label || "";
  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!actionList) {
    return <div>No data</div>;
  }

  return (
    <div className="w-full h-auto flex flex-col gap-2.5">
      <p className="w-full text-center">Action</p>
      <Separator />
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <InputGroupButton
            variant="outline"
            className=" text-xs text-center w-full h-8 self-end"
          >
            {selectedAction || "Select Action"}{" "}
            <ChevronDownIcon className="size-3" />
          </InputGroupButton>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="rounded-md">
          <DropdownMenuRadioGroup
            value={action}
            onValueChange={(val) => {
              onChange(val);
              setAction(val);
            }}
          >
            {actionList.map((action) => (
              <DropdownMenuRadioItem key={action.id} value={action.id}>
                {action.label}
              </DropdownMenuRadioItem>
            ))}
          </DropdownMenuRadioGroup>
        </DropdownMenuContent>
      </DropdownMenu>

      {params.map((param) => (
        <NodeInput
          key={param}
          onChange={(value) => {
            onChange({
              [param]: value,
            });
          }}
          validate={(value) => (!value ? "Required" : null)}
          type="text"
          label={param}
          value={selectedNode?.data?.[param]}
        />
      ))}
    </div>
  );
};

export default AutomatedStepNodeForm;
