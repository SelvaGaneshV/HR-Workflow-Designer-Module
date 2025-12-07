import { NodeFormContext } from "@/context/node-form-context";
import React from "react";

function useNodeForm() {
  const context = React.useContext(NodeFormContext);
  if (!context) {
    throw new Error("useNodeForm must be used within a NodeFormProvider.");
  }

  return context;
}

export default useNodeForm;
