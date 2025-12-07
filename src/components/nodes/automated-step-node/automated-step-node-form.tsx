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
import { Separator } from "@/components/ui/separator";
import useNodeForm from "@/hooks/use-node-form";
import { automatedStepActionsQueryOptions } from "@/query/nodes-query";
import { useSuspenseQuery } from "@tanstack/react-query";
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
      <AutomationsActions onChange={onNodeDataChange} />

      <KeyValueInput onChange={onChangeKeyValue} />
    </div>
  );
};

const AutomationsActions: React.FC<{
  onChange: (value: any) => void;
}> = ({ onChange }) => {
  const { selectedNode } = useNodeForm();
  const [action, setAction] = React.useState<string | undefined>(
    selectedNode?.data?.action as string | undefined
  );
  const { data: actionList, isLoading } = useSuspenseQuery(
    automatedStepActionsQueryOptions()
  );
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
              onChange({ action: val });
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
