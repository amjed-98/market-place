import { useState, Component, type ReactNode } from 'react';

type TabKey = string | number;

type Props = { children: ReactNode; defaultActiveTab: TabKey; className?: string };

type TabItemProps = {
  className?: string;
  title: string;
  children: ReactNode;
  tabKey: TabKey;
};

class TabItem extends Component<TabItemProps> {
  static activeTab: string | number;

  // eslint-disable-next-line no-unused-vars
  static handleActiveTab: (tabKey: TabKey) => void;

  render() {
    const { activeTab, handleActiveTab } = TabItem;
    const { children, title, tabKey, className } = this.props;

    const activeClass = 'tab-bordered tab-active !border-pink !border-b-4';
    const toggledActiveClass = activeTab === tabKey ? activeClass : '';
    return (
      <>
        <div
          onClick={handleActiveTab.bind(this, tabKey)}
          className={`tab -order-1 ${toggledActiveClass} ${className}`}
        >
          <span>{title}</span>
        </div>

        {activeTab === tabKey && children}
      </>
    );
  }
}

function Tabs({ children, defaultActiveTab, className }: Props) {
  const [activeTab, setActiveTab] = useState(defaultActiveTab);

  const handleActiveTab = (tab: TabKey) => {
    setActiveTab(tab);
  };

  TabItem.activeTab = activeTab;
  TabItem.handleActiveTab = handleActiveTab;

  return (
    <div key={activeTab} className={`tabs gap-4 py-20 ${className}`}>
      {children}
    </div>
  );
}

Tabs.TabItem = TabItem;
export default Tabs;
