import { Checkbox } from "@/components/ui/checkbox";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import type { InputDeciderProps, NodeInputProps } from "@/types/node-form";
import React from "react";

const NodeInput: React.FC<NodeInputProps> = ({
  onChange,
  validate,
  type = "text",
  label,
  value,
  disable = false,
  orientation = "vertical",
}) => {
  const id = React.useId();
  const [error, setError] = React.useState<string | null | undefined>(null);

  return (
    <Field id={id} orientation={orientation}>
      <FieldLabel>{label}</FieldLabel>
      <InputDecider
        key={id + "-InputDecider"}
        onChange={onChange}
        value={value}
        type={type}
        validate={validate}
        error={error}
        setError={(error) => setError(error)}
        disable={disable}
      />
      <FieldError>{error}</FieldError>
    </Field>
  );
};

const InputDecider: React.FC<InputDeciderProps> = ({
  onChange,
  value,
  type,
  validate,
  error,
  setError,
  disable,
}) => {
  switch (type) {
    case "checkbox":
      return (
        <Checkbox
          className="size-5"
          defaultChecked={value}
          onCheckedChange={(value) => {
            const err = validate?.(value);
            if (err) setError(err);
            else if (error) setError(null);
            onChange(value);
          }}
          disabled={disable}
        />
      );
    case "textarea":
      return (
        <Textarea
          defaultValue={value}
          onChange={(e) => {
            const err = validate?.(e.target.value);
            if (err) setError(err);
            else if (error) setError(null);
            onChange(e.target.value);
          }}
          disabled={disable}
        />
      );
    default:
      return (
        <Input
          defaultValue={value}
          type={type}
          onChange={(e) => {
            let value = null;
            if (type === "number") value = e.target.valueAsNumber;
            else if (type === "date")
              value = e.target.valueAsDate?.toISOString();
            else value = e.target.value;
            const err = validate?.(value);
            if (err) setError(err);
            else if (error) setError(null);
            onChange(value);
          }}
          disabled={disable}
        />
      );
  }
};

export default NodeInput;
