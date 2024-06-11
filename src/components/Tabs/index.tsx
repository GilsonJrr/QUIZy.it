import React, { FC, ReactNode, useState } from "react";
import * as Styled from "./styled";

export type TTabs = {
  label: string | ReactNode;
  color?: string;
  action?: () => void;
  active?: boolean;
};

type TabsProps = {
  tabs: TTabs[];
  activeTab?: (tab: string) => void;
  radius?: number;
  active?: string;
  tabActive?: boolean;
  wrap?: boolean;
  onClick?: () => void;
};

const Tabs: FC<TabsProps> = ({
  tabs,
  activeTab,
  radius,
  active,
  wrap,
  onClick,
  tabActive,
}) => {
  const [selectedTab, setSelectedTab] = useState(tabs[0].label);

  const handleTab = (tab: TTabs) => {
    setSelectedTab(tab.label);
    activeTab?.(tab.label as string);
    tab.action?.();
  };

  return (
    <Styled.Container wrap={wrap} onClick={onClick}>
      {tabs.map((tab) => {
        return (
          <Styled.Tab
            onClick={() => handleTab(tab)}
            active={
              tabActive
                ? tab.active
                : active
                ? active === tab.label
                : tab.label === selectedTab
            }
            radius={radius}
            color={tab.color}
            wrap={wrap}
          >
            <h3>{tab.label}</h3>
          </Styled.Tab>
        );
      })}
    </Styled.Container>
  );
};

export default Tabs;
