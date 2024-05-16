import { cn } from "@/lib/utils";
import { ReactNode } from "react";
import WeatherCard from "./weatherCard";
import { motion } from "framer-motion";
import { mainAnim } from "@/utils/anim";

const WeatherGlance: React.FC<{
  children?: ReactNode;
  className?: string;
}> = ({ children, className }) => {


  return (
    <motion.div
      variants={mainAnim}
      className={cn(
        "aspect-square flex flex-col w-full items-center justify-center col-span-1",
        className
      )}
    >
      <WeatherCard>{children}</WeatherCard>
    </motion.div>
  );
};

export default WeatherGlance;
