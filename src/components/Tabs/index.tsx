import React, { FC, useState } from "react";
import * as Styled from "./styled";

type TTabs = {
  label: string;
  action?: () => void;
};

type TabsProps = {
  tabs: TTabs[];
  activeTab: (tab: string) => void;
};

const Tabs: FC<TabsProps> = ({ tabs, activeTab }) => {
  const [selectedTab, setSelectedTab] = useState(tabs[0].label);

  const handleTab = (tab: TTabs) => {
    setSelectedTab(tab.label);
    activeTab(tab.label);
    tab.action?.();
  };

  return (
    <Styled.Container>
      {tabs.map((tab) => {
        return (
          <Styled.Tab
            onClick={() => handleTab(tab)}
            active={tab.label === selectedTab}
          >
            <h3>{tab.label}</h3>
          </Styled.Tab>
        );
      })}
    </Styled.Container>
  );
};

export default Tabs;
