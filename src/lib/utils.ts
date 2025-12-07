import { clsx, type ClassValue } from "clsx";
import {
  AlertTriangle,
  CheckCircle,
  CircleCheck,
  Info,
  PlayCircle,
} from "lucide-react";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export type DueStatus = "overdue" | "soon" | "future" | "neutral";

export function formatDateWithStatus(dateInput: string | Date): {
  text: string;
  status: DueStatus;
} {
  const date = new Date(dateInput);
  if (isNaN(date.getTime())) return { text: "", status: "neutral" };

  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const target = new Date(date.getFullYear(), date.getMonth(), date.getDate());

  const diffMs = target.getTime() - today.getTime();
  const diffDays = Math.round(diffMs / (1000 * 60 * 60 * 24));

  let status: DueStatus = "neutral";
  let text = "";

  if (diffDays === 0) {
    text = "Today";
    status = "soon";
  } else if (diffDays === 1) {
    text = "Tomorrow";
    status = "soon";
  } else if (diffDays === -1) {
    text = "Yesterday";
    status = "overdue";
  } else if (diffDays > 1 && diffDays <= 7) {
    text = `In ${diffDays} days`;
    status = "future";
  } else if (diffDays >= -7 && diffDays < -1) {
    text = `${Math.abs(diffDays)} days ago`;
    status = "overdue";
  } else {
    const options: Intl.DateTimeFormatOptions = {
      month: "short",
      day: "numeric",
    };
    if (date.getFullYear() !== now.getFullYear()) {
      options.year = "numeric";
    }

    text = date.toLocaleDateString(undefined, options);
    status = diffDays < 0 ? "overdue" : "neutral";
  }

  return { text, status };
}

export const iconMap = {
  start: PlayCircle,
  info: Info,
  success: CheckCircle,
  error: AlertTriangle,
  complete: CircleCheck,
};

export const getIcon = (type: string | undefined | null) =>
  iconMap[type as keyof typeof iconMap];

export const getIconColor = (type: string | undefined | null) => {
  if (!type) return "text-muted-foreground";
  return {
    start: "text-primary",
    info: "text-blue-500",
    success: "text-green-500",
    error: "text-destructive",
    complete: "text-green-600",
  }[type];
};

export const getNodeStylesBasedOnType = (type: string | undefined | null) => {
  if (!type) return "";
  return {
    start: "",
    info: "border-blue-500",
    success: "border-green-500",
    error: "border-destructive",
    complete: "border-green-600",
  }[type];
};

export const getEdgeStylesBasedOnType = (type: string | undefined | null) => {
  if (!type) return "";
  return {
    start: "",
    info: "stroke-blue-500!",
    success: "stroke-green-500!",
    error: "stroke-destructive!",
    complete: "stroke-green-600!",
  }[type];
};
