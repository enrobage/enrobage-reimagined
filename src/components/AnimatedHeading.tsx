import { ReactNode } from "react";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";

interface Props {
  children: ReactNode;
  direction?: "left" | "right";
  className?: string;
}

export const AnimatedHeading = ({ children, direction = "left", className = "" }: Props) => {
  const { ref, isVisible } = useScrollReveal();
  const initial = direction === "left" ? "-translate-x-16" : "translate-x-16";
  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ease-out ${
        isVisible ? "opacity-100 translate-x-0" : `opacity-0 ${initial}`
      } ${className}`}
    >
      {children}
    </div>
  );
};
