import React from "react";
import { Tabs as AriaTabs, TabList, Tab as AriaTab, TabPanel } from "react-aria-components";
import "./Tabs.css";

export default function Tabs({ children }) {
    const tabs = React.Children.toArray(children)
        .filter(child => React.isValidElement(child))
        .map((child, index) => {
            const id = `tab-${index}`;
            return {
                id,
                label: child.props.label || `Tab ${index + 1}`,
                notifications: child.props.notifications || null,
                children: child.props.children,
            };
        });

    return (
        <AriaTabs className="tabs-wrapper">
            <TabList className="tabs-labels">
                {tabs.map(tab => (
                    <AriaTab key={tab.id} id={tab.id} className="tab-label">
                        {({ isSelected }) => (
                            <div
                                style={{ display: "contents" }}
                                data-active={isSelected ? "true" : "false"}
                            >
                                <span className="tab-label-text">{tab.label}</span>
                                {tab.notifications !== null && (
                                    <span className="tab-label-notifications">{tab.notifications}</span>
                                )}
                            </div>
                        )}
                    </AriaTab>
                ))}
            </TabList>

            <div className="tabs-contents">
                {tabs.map(tab => (
                    <TabPanel
                        key={tab.id}
                        id={tab.id}
                        className="tab-content"
                        shouldForceMount={true} // Keep mounted so the grid can measure the tallest panel
                    >
                        {tab.children}
                    </TabPanel>
                ))}
            </div>
        </AriaTabs>
    );
}

Tabs.Tab = function TabPlaceholder({ label, notifications, children }) {
    return null;
};
