import React from "react";
import { Tabs as AriaTabs, TabList, Tab as AriaTab, TabPanel, SelectionIndicator } from "react-aria-components";
import Select from "./Select";
import "./Tabs.css";
import clsx from "clsx";

export default function Tabs({ children }) {
    const wrapperRef = React.useRef(null);
    const labelsRef = React.useRef(null);
    const [labelsFit, setLabelsFit] = React.useState(true);
    const tabs = React.useMemo(
        () =>
            React.Children.toArray(children)
                .filter(child => React.isValidElement(child))
                .map((child, index) => {
                    const id = `tab-${index}`;
                    return {
                        id,
                        label: child.props.label || `Tab ${index + 1}`,
                        notifications: child.props.notifications || null,
                        children: child.props.children,
                    };
                }),
        [children],
    );
    const [selectedKey, setSelectedKey] = React.useState(null);
    const activeSelectedKey = tabs.some(tab => tab.id === selectedKey) ? selectedKey : (tabs[0]?.id ?? null);

    React.useEffect(() => {
        function handleResize() {
            if (!labelsRef.current || !wrapperRef.current) return;
            const labelsWidth = labelsRef.current.style.width;
            labelsRef.current.style.width = "max-content";
            const labelsRect = labelsRef.current.getBoundingClientRect();
            const wrapperRect = wrapperRef.current.getBoundingClientRect();

            setLabelsFit(labelsRect.width <= wrapperRect.width);

            labelsRef.current.style.width = labelsWidth;
        }

        handleResize();

        const resizeObserver = new ResizeObserver(handleResize);
        resizeObserver.observe(document.body);
        return () => {
            resizeObserver.disconnect();
        };
    }, []);

    function handleSelectionChange(key) {
        if (key !== null && key !== undefined) {
            setSelectedKey(key.toString());
        }
    }

    return (
        <AriaTabs
            className="tabs-wrapper"
            ref={wrapperRef}
            selectedKey={activeSelectedKey}
            onSelectionChange={handleSelectionChange}
        >
            {!labelsFit && (
                <Select
                    search={false}
                    selectionIcon={false}
                    ariaLabel="Select tab"
                    selectedKey={activeSelectedKey}
                    onSelectionChange={handleSelectionChange}
                >
                    {tabs.map(tab => {
                        return (
                            <Select.Item key={tab.id} value={tab.id}>
                                <div className="tab-label tab-label--select">
                                    <span className="tab-label-text">{tab.label}</span>
                                    {tab.notifications !== null && (
                                        <span className="tab-label-notifications">{tab.notifications}</span>
                                    )}
                                </div>
                            </Select.Item>
                        );
                    })}
                </Select>
            )}

            <TabList
                className={clsx("tabs-labels", !labelsFit && "tabs-labels-measure")}
                ref={labelsRef}
                aria-hidden={!labelsFit}
            >
                {tabs.map(tab => (
                    <AriaTab key={tab.id} id={tab.id} className="tab-label tab-label--aria">
                        {({ isSelected }) => (
                            <>
                            <SelectionIndicator />
                            <div style={{ display: "contents" }} data-active={isSelected ? "true" : "false"}>
                                <span className="tab-label-text">{tab.label}</span>
                                {tab.notifications !== null && (
                                    <span className="tab-label-notifications">{tab.notifications}</span>
                                )}
                            </div>
                            </>
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

Tabs.Tab = function TabPlaceholder() {
    return null;
};
