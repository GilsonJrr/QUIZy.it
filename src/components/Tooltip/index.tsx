import React, { FC, ReactNode, useEffect, useRef, useState } from "react";
import * as Styled from "./styled";

type TooltipProps = {
  children: ReactNode | ReactNode[];
  toolTipContent: ReactNode | ReactNode[];
  position: "top" | "bottom" | "left" | "right";
  onHover?: boolean;
  width?: string;
};

const Tooltip: FC<TooltipProps> = ({
  children,
  toolTipContent,
  position,
  onHover,
  width,
}) => {
  const [showSelector, setShowSelector] = useState(false);
  const tooltipRef = useRef<HTMLDivElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const handleClickOutside = (event: MouseEvent) => {
    if (
      containerRef.current &&
      !containerRef.current.contains(event.target as Node)
    ) {
      setShowSelector(false);
    }
  };

  const handleMouseLeave = (event: MouseEvent) => {
    if (
      tooltipRef.current &&
      !tooltipRef.current.contains(event.relatedTarget as Node)
    ) {
      setShowSelector(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    tooltipRef.current &&
      tooltipRef.current.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      document.removeEventListener("click", handleClickOutside);
      tooltipRef.current &&
        // eslint-disable-next-line react-hooks/exhaustive-deps
        tooltipRef.current.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <Styled.Container width={width}>
      <Styled.Content
        hover={onHover}
        showSelector={showSelector}
        width={width}
        onClick={() => setShowSelector(!showSelector)}
        ref={containerRef}
        onMouseOver={() => (onHover ? setShowSelector(true) : "")}
      >
        {children}
      </Styled.Content>
      <Styled.ToolTipInvisibleContainer
        showSelector={showSelector}
        position={position}
        onMouseLeave={(event) => {
          if (
            tooltipRef.current &&
            !tooltipRef.current.contains(event.relatedTarget as Node)
          ) {
            setShowSelector(false);
          }
        }}
      />
      <Styled.ToolTipContent
        ref={tooltipRef}
        position={position}
        showSelector={showSelector}
      >
        {toolTipContent}
      </Styled.ToolTipContent>
    </Styled.Container>
  );
};

export default Tooltip;
