import React, {
  FC,
  ReactNode,
  useEffect,
  useRef,
  useState,
  FocusEvent,
} from "react";
import * as Styled from "./styled";

type TooltipProps = {
  children: ReactNode | ReactNode[];
  toolTipContent: ReactNode | ReactNode[];
  position: "top" | "bottom" | "left" | "right";
  onHover?: boolean;
  width?: string;
  disable?: boolean;
};

const Tooltip: FC<TooltipProps> = ({
  children,
  toolTipContent,
  position,
  onHover,
  width,
  disable = false,
}) => {
  const tooltipRef = useRef<HTMLDivElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const [showSelector, setShowSelector] = useState(false);
  const [isMouseInside, setIsMouseInside] = useState(false);

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

  const handleLostFocus = (event: FocusEvent<HTMLDivElement>) => {
    // if (!event.currentTarget.contains(event.relatedTarget)) {
    // }
    setTimeout(() => {
      setShowSelector(false);
    }, 100);
  };

  const handleMouseEnter = () => {
    setIsMouseInside(true);
  };

  const handleMouseLeaveCard = (event: React.MouseEvent<HTMLDivElement>) => {
    if (
      isMouseInside &&
      !event.currentTarget.contains(event.relatedTarget as Node)
    ) {
      setTimeout(() => {
        setShowSelector(false);
      }, 100);
      setIsMouseInside(false);
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
    <Styled.Container
      width={width}
      tabIndex={0}
      onBlur={handleLostFocus}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeaveCard}
    >
      <Styled.Content
        hover={onHover}
        showSelector={showSelector}
        width={width}
        onClick={() => setShowSelector(!showSelector)}
        ref={onHover ? containerRef : null}
        onMouseOver={() => (onHover ? setShowSelector(true) : "")}
        disable={disable}
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
        ref={onHover ? tooltipRef : null}
        position={position}
        showSelector={!disable && !!toolTipContent && showSelector}
      >
        {toolTipContent}
      </Styled.ToolTipContent>
    </Styled.Container>
  );
};

export default Tooltip;
