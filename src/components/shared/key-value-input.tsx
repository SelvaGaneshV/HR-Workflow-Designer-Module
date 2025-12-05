import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Trash2, Plus, Search, ChevronDownIcon } from "lucide-react";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
  InputGroupText,
  InputGroupTextarea,
} from "../ui/input-group";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Separator } from "../ui/separator";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldSet,
} from "../ui/field";
import { Textarea } from "../ui/textarea";
import { ScrollArea } from "../ui/scroll-area";

export type KVType = "string" | "number" | "boolean" | "object" | "array";

export interface KeyValuePair {
  key: string;
  value: any;
  type: KVType;
}

interface Props {
  value?: KeyValuePair[];
  onChange?: (value: KeyValuePair[]) => void;
}

const KeyValueInput: React.FC<Props> = ({ value = [], onChange }) => {
  const [rows, setRows] = useState<KeyValuePair[]>(value);

  const update = (newRows: KeyValuePair[]) => {
    setRows(newRows);
    onChange?.(newRows);
  };

  const addRow = () => {
    update([...rows, { key: "", value: "", type: "string" }]);
  };

  const removeRow = (i: number) => {
    const copy = [...rows];
    copy.splice(i, 1);
    update(copy);
  };

  const updateField = (i: number, field: keyof KeyValuePair, val: any) => {
    const copy = [...rows];
    copy[i][field] = val;

    // Auto-coerce based on type
    if (field === "type") {
      const t = val as KVType;
      switch (t) {
        case "number":
          copy[i].value = copy[i].value ? Number(copy[i].value) : 0;
          break;
        case "boolean":
          copy[i].value = false;
          break;
        case "object":
          copy[i].value = "{}";
          break;
        case "array":
          copy[i].value = "[]";
          break;
        default:
          copy[i].value = "";
      }
    }

    update(copy);
  };

  const haskeyError = (key: string, index: number) => {
    if (!key.trim()) return "Required";
    if (rows.filter((r) => r.key === key).length > 1) return "Duplicate";
    return null;
  };
  const hasValueError = (value: any, type: KVType) => {
    if (type === "object" || type === "array") {
      if (!value.trim()) return "Required";
      try {
        JSON.parse(value);
      } catch (e) {
        return "Invalid " + type;
      }
    }

    if (type === "array" && !Array.isArray(JSON.parse(value)))
      return "Must be an array";

    return null;
  };

  return (
    <div className=" flex flex-col w-full gap-2.5">
      <Button className="self-end" onClick={addRow}>
        <Plus className="w-4 h-4 mr-2" />
        Add Field
      </Button>

      <div className=" flex flex-col gap-2.5">
        {rows.map((row, i) => {
          const keyError = haskeyError(row.key, i);

          const valueError = hasValueError(row.value, row.type);

          return (
            <FieldGroup className="bg-background p-3 rounded-md shadow-2xs gap-2.5">
              <FieldSet className="">
                <Field orientation={"vertical"}>
                  <FieldLabel>Key</FieldLabel>
                  <InputGroup>
                    <InputGroupInput
                      value={row.key}
                      placeholder="enter key"
                      onChange={(e) => updateField(i, "key", e.target.value)}
                    />

                    <InputGroupAddon align="inline-end">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <InputGroupButton
                            variant="ghost"
                            className="pr-1.5! text-xs text-center"
                          >
                            {row.type || "type"}{" "}
                            <ChevronDownIcon className="size-3" />
                          </InputGroupButton>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="rounded-md">
                          <DropdownMenuRadioGroup
                            value={row.type}
                            onValueChange={(val) =>
                              updateField(i, "type", val as KVType)
                            }
                          >
                            <DropdownMenuRadioItem value="string">
                              String
                            </DropdownMenuRadioItem>
                            <DropdownMenuRadioItem value="number">
                              Number
                            </DropdownMenuRadioItem>
                            <DropdownMenuRadioItem value="boolean">
                              Boolean
                            </DropdownMenuRadioItem>
                            <DropdownMenuRadioItem value="object">
                              Object
                            </DropdownMenuRadioItem>
                            <DropdownMenuRadioItem value="array">
                              Array
                            </DropdownMenuRadioItem>
                          </DropdownMenuRadioGroup>
                        </DropdownMenuContent>
                      </DropdownMenu>

                      <InputGroupButton
                        variant="ghost"
                        size="icon-sm"
                        onClick={() => removeRow(i)}
                      >
                        <Trash2 className="w-4 h-4 text-red-500" />
                      </InputGroupButton>
                    </InputGroupAddon>
                  </InputGroup>
                  <FieldError>{keyError}</FieldError>
                </Field>
              </FieldSet>
              <FieldSet>
                <Field orientation={"vertical"}>
                  <FieldLabel>Value</FieldLabel>
                  {row.type === "boolean" ? (
                    <Select
                      value={String(row.value)}
                      onValueChange={(v) =>
                        updateField(i, "value", v === "true")
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="true">true</SelectItem>
                        <SelectItem value="false">false</SelectItem>
                      </SelectContent>
                    </Select>
                  ) : row.type === "object" || row.type === "array" ? (
                    <Textarea
                      value={row.value}
                      onChange={(e) => {
                        try {
                          updateField(i, "value", e.target.value);
                        } catch (e) {}
                      }}
                      className="text-xs text-muted-foreground mt-2"
                    />
                  ) : (
                    <Input
                      value={row.value}
                      type={row.type === "number" ? "number" : "text"}
                      placeholder="value"
                      onChange={(e) => updateField(i, "value", e.target.value)}
                    />
                  )}
                  <FieldError>{valueError}</FieldError>
                </Field>
              </FieldSet>
            </FieldGroup>
          );
        })}
      </div>
    </div>
  );
};

export default KeyValueInput;
