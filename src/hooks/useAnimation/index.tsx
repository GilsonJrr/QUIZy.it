import React, { createContext, useState, useContext, ReactNode } from "react";

interface AnimationContextType {
  animate: (delay: number) => void;
  triggerAnimation: boolean;
  setTriggerAnimation: (trigger: boolean) => void;
}

const AnimationContext = createContext<AnimationContextType | undefined>(
  undefined
);

interface AnimationProviderProps {
  children: ReactNode;
}

export const AnimationProvider: React.FC<AnimationProviderProps> = ({
  children,
}) => {
  const [triggerAnimation, setTriggerAnimation] = useState<boolean>(false);

  const animate = (delay: number) => {
    setTriggerAnimation(true);
    const timeout = setTimeout(
      () => {
        setTriggerAnimation(false);
      },
      delay ? delay : 200
    );
    return () => clearTimeout(timeout);
  };

  return (
    <AnimationContext.Provider
      value={{ animate, triggerAnimation, setTriggerAnimation }}
    >
      {children}
    </AnimationContext.Provider>
  );
};

export const useAnimation = (): AnimationContextType => {
  const context = useContext(AnimationContext);
  if (context === undefined) {
    throw new Error("useAnimation must be used within an AnimationProvider");
  }
  return context;
};
