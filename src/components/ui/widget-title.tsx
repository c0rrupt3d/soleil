import React, { ReactNode } from "react";
import { Separator } from "@/components/ui/separator";

const WidgetTitle: React.FC<{
  left: string;
  right?: string;
  alt?: boolean;
  children?: ReactNode;
}> = ({ left, right, alt, children }) => {
  return (
    <div className="text-sm whitespace-nowrap overflow-hidden h-8 w-full flex flex-col text-start justify-between">
      <h3 className="flex justify-between items-center h-8">
        <div className={`flex ${!children ? "px-2" : "pr-2 pl-0.5"} items-center`}>
          {children} <span>{left}</span>{" "}
        </div>
        <span className="px-2">{right}</span>
      </h3>
      <Separator className={`${alt ? "bg-border" : "bg-background"}`} />
    </div>
  );
};

export default WidgetTitle;
