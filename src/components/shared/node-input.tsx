import type { InputDeciderProps, NodeInputProps } from "@/types/node-form";
import React from "react";
import { Field, FieldError, FieldLabel } from "../ui/field";
import { Input } from "../ui/input";

const NodeInput: React.FC<NodeInputProps> = ({
  onChange,
  validate,
  type = "text",
  label,
  value,
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
        />
      );
  }
};

export default NodeInput;
