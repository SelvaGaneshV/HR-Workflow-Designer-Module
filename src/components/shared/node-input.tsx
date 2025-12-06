import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import type { InputDeciderProps, NodeInputProps } from "@/types/node-form";
import React from "react";

const NodeInput: React.FC<NodeInputProps> = ({
  onChange,
  validate,
  type = "text",
  label,
  value,
  disable = false,
}) => {
  const id = React.useId();
  const [error, setError] = React.useState<string | null | undefined>(null);

  return (
    <Field id={id}>
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
            else {
              onChange(value);
              if (error) setError(null);
            }
          }}
          disabled={disable}
        />
      );
  }
};

export default NodeInput;
