import type React from "react";

type NodeInputType = React.HTMLInputTypeAttribute | "dropdown" | "checkbox" | "textarea"  ;
type NodeInputProps = {
  label: string;
  value: any;
  onChange: (value: any) => void;
  validate?: (value: any) => string | null;
  type?: NodeInputType;
  disable?: boolean;
  orientation?: "vertical" | "horizontal" | "responsive";
};
type InputDeciderProps = Omit<NodeInputProps, "label"> & {
  error: string | null | undefined;
  setError: (value: string | null | undefined) => void;
};

export type { NodeInputProps, NodeInputType, InputDeciderProps };
