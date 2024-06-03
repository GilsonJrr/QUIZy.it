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
  editable?: boolean;
  onCloseTooltip?: () => void;
  showTooltip?: boolean;
};

const Tooltip: FC<TooltipProps> = ({
  children,
  toolTipContent,
  position,
  onHover,
  width,
  editable,
  disable = false,
  onCloseTooltip,
  showTooltip,
}) => {
  const tooltipRef = useRef<HTMLDivElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const [showSelector, setShowSelector] = useState(showTooltip);
  const [isMouseInside, setIsMouseInside] = useState(false);

  const handleClickOutside = (event: MouseEvent) => {
    if (
      containerRef.current &&
      !containerRef.current.contains(event.target as Node)
    ) {
      setShowSelector(false);
      onCloseTooltip?.();
    }
  };

  const handleMouseLeave = (event: MouseEvent) => {
    if (
      tooltipRef.current &&
      !tooltipRef.current.contains(event.relatedTarget as Node)
    ) {
      setShowSelector(false);
      onCloseTooltip?.();
    }
  };

  const handleLostFocus = (event: FocusEvent<HTMLDivElement>) => {
    if (!event.currentTarget.contains(event.relatedTarget)) {
      setTimeout(() => {
        setShowSelector(false);
        onCloseTooltip?.();
      }, 100);
    }
  };

  const handleMouseEnter = () => {
    setIsMouseInside(true);
  };

  const handleMouseLeaveCard = (event: React.MouseEvent<HTMLDivElement>) => {
    if (
      editable &&
      isMouseInside &&
      !event.currentTarget.contains(event.relatedTarget as Node)
    ) {
      setTimeout(() => {
        setShowSelector(false);
        onCloseTooltip?.();
      }, 100);
      setIsMouseInside(false);
      return;
    }
    setTimeout(() => {
      setShowSelector(false);
      onCloseTooltip?.();
    }, 100);
    setIsMouseInside(false);
  };

  useEffect(() => {
    setShowSelector(showTooltip);
  }, [showTooltip]);

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
            onCloseTooltip?.();
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
