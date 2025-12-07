import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldSet,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "@/components/ui/input-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { ChevronDownIcon, Plus, Trash2 } from "lucide-react";
import React, { useState } from "react";

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
/**
 * KeyValueInput Component
 *
 * A dynamic key-value editor that supports multiple field types
 * (`string`, `number`, `boolean`, `object`, `array`).
 *
 * Features:
 * - Add or remove key/value rows
 * - Auto-coerces value based on the selected type
 * - Inline validation for key uniqueness, required fields, and JSON validity
 * - Emits updated rows to the parent via `onChange`
 *
 * @component
 *
 * @param {Object} props - Component props.
 * @param {KeyValuePair[]} [props.value=[]] - Initial list of key-value rows.
 * @param {(rows: KeyValuePair[]) => void} [props.onChange] - Callback triggered whenever rows are updated.
 *
 * @returns {JSX.Element} The rendered key-value input UI.
 *
 * @example
 * const [data, setData] = useState([]);
 *
 * <KeyValueInput
 *   value={data}
 *   onChange={(updated) => setData(updated)}
 * />
 */
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
    <div className=" flex flex-col relative w-full gap-2.5">
      <Button className="self-end sticky top-0 z-10" onClick={addRow}>
        <Plus className="w-4 h-4 mr-2" />
        Add Field
      </Button>

      <div className=" flex flex-col gap-2.5">
        {rows.map((row, i) => (
          <KeyValueInputItems
            key={i}
            row={row}
            i={i}
            updateField={updateField}
            removeRow={removeRow}
            haskeyError={haskeyError}
            hasValueError={hasValueError}
          />
        ))}
      </div>
    </div>
  );
};


/**
 * KeyValueInputItems Component
 *
 * Renders a single editable row inside the KeyValueInput component.
 * Each row contains:
 * - A key field (with duplicate + empty validation)
 * - A type selector (string, number, boolean, object, array)
 * - A value field that dynamically changes input type based on selected type
 * - A remove button to delete the row
 *
 * Dynamic Behavior:
 * - For `"boolean"` → uses a Select dropdown
 * - For `"object"` and `"array"` → uses a Textarea with JSON validation
 * - For `"string"` and `"number"` → standard Input field
 *
 * Validation:
 * - `haskeyError()` is called on every key change:
 *    - Ensures the key is not empty
 *    - Ensures the key is unique among rows
 *
 * - `hasValueError()` is called on value changes:
 *    - Ensures valid JSON for object/array types
 *    - Ensures array parses into an actual array
 *
 * Auto-coercion:
 * - Value handling is delegated to `updateField`, which may transform
 *   values depending on the type (e.g., boolean → true/false)
 *
 * @component
 *
 * @param {Object} props - Component props.
 * @param {number} props.i - Index of the row being edited.
 * @param {KeyValuePair} props.row - Current key-value row data.
 * @param {(i: number, field: keyof KeyValuePair, val: any) => void} props.updateField
 *        Updates a specific field (`key`, `value`, or `type`) for the row.
 * @param {(i: number) => void} props.removeRow
 *        Removes the row at index `i`.
 * @param {(key: string, index: number) => string | null} props.haskeyError
 *        Validation function for key names.
 * @param {(value: any, type: KVType) => string | null} props.hasValueError
 *        Validation function for value inputs based on type.
 *
 * @returns {JSX.Element} The rendered key-value editor row.
 *
 * @example
 * <KeyValueInputItems
 *   i={0}
 *   row={{ key: "age", value: 25, type: "number" }}
 *   updateField={updateField}
 *   removeRow={removeRow}
 *   haskeyError={haskeyError}
 *   hasValueError={hasValueError}
 * />
 */
const KeyValueInputItems: React.FC<{
  i: number;
  row: KeyValuePair;
  updateField: (i: number, field: keyof KeyValuePair, val: any) => void;
  removeRow: (i: number) => void;
  haskeyError: (key: string, index: number) => string | null;
  hasValueError: (value: any, type: KVType) => string | null;
}> = ({ i, row, haskeyError, hasValueError, updateField, removeRow }) => {
  const [keyError, setKeyError] = useState<string | null>(null);
  const [valueError, setValueError] = useState<string | null>(null);

  return (
    <FieldGroup className="bg-background p-3 rounded-md shadow-2xs gap-2.5">
      <FieldSet className="">
        <Field orientation={"vertical"}>
          <FieldLabel>Key</FieldLabel>
          <InputGroup>
            <InputGroupInput
              value={row.key}
              placeholder="enter key"
              onChange={(e) => {
                const key = e.target.value;
                const error = haskeyError(key, i);
                if (error) setKeyError(error);
                else setKeyError(null);
                updateField(i, "key", e.target.value);
              }}
            />

            <InputGroupAddon align="inline-end">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <InputGroupButton
                    variant="ghost"
                    className="pr-1.5! text-xs text-center"
                  >
                    {row.type || "type"} <ChevronDownIcon className="size-3" />
                  </InputGroupButton>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="rounded-md">
                  <DropdownMenuRadioGroup
                    value={row.type}
                    onValueChange={(val) => {
                      updateField(i, "type", val);
                    }}
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
              onValueChange={(v) => {
                const error = hasValueError(v === "true", row.type);
                if (error) setValueError(error);
                else setValueError(null);
                updateField(i, "value", v === "true");
              }}
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
                const error = hasValueError(e.target.value, row.type);
                if (error) setValueError(error);
                else setValueError(null);
                updateField(i, "value", e.target.value);
              }}
              className="text-xs text-muted-foreground mt-2"
            />
          ) : (
            <Input
              value={row.value}
              type={row.type === "number" ? "number" : "text"}
              placeholder="value"
              onChange={(e) => {
                const error = hasValueError(e.target.value, row.type);
                if (error) setValueError(error);
                else setValueError(null);
                updateField(i, "value", e.target.value);
              }}
            />
          )}
          <FieldError>{valueError}</FieldError>
        </Field>
      </FieldSet>
    </FieldGroup>
  );
};

export default KeyValueInput;
