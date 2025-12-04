import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { NodeProps } from "@xyflow/react";
import { Bot } from "lucide-react";
import React from "react";

const AutomatedStepNode: React.FC<NodeProps> = ({ data }) => {
  return (
    <Card className="cursor-grab active:cursor-grabbing min-w-30 max-h-12 hover:bg-sidebar-accent rounded-md transition-colors py-2">
      <CardHeader className="flex items-center gap-3">
        <Bot className="size-5 text-muted-foreground" />
        <div>
          <CardTitle className="text-sm font-medium" title="">
            {(data?.label ? data?.label : "Start") as React.ReactNode}
          </CardTitle>
        </div>
        <CardDescription className="text-xs text-muted-foreground">
          {data?.description as React.ReactNode}
        </CardDescription>
      </CardHeader>
    </Card>
  );
};

export default AutomatedStepNode;
