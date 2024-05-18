import { cn } from "@/lib/utils";
import { Children, ReactNode } from "react";

const WeatherCard: React.FC<{
  children?: ReactNode;
  className?: string;
}> = ({ children, className }) => {
  const childrenArray = Children.toArray(children);
  const firstChild = childrenArray[0];
  const otherChild = childrenArray.slice(1);
  return (
    <div
      className={cn(
        "bg-secondary dark:bg-secondary/50 backdrop-blur-md h-full shadow-sm border dark:border-transparent overflow-hidden w-full rounded-lg",
        className
      )}
    >
      {firstChild && firstChild}

      <div className="h-[calc(100%-2rem)] flex flex-col text-center p-2 font-normal items-center justify-center"  >
        {otherChild && otherChild}
      </div>
    </div>
  );
};

export default WeatherCard;
