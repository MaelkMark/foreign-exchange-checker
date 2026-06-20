import React from "react";

import "./Tabs.css";

export default function Tabs({ children }) {
    const tabElements = React.Children.toArray(children).filter(
        child => React.isValidElement(child) && child.type === Tab,
    );

    let initialTabIdx = 0;

    for (const [idx, tab] of tabElements.entries()) {
        if (tab.props.active === true) {
            initialTabIdx = idx;
            break;
        }
    }

    const [activeIdx, setActiveIdx] = React.useState(initialTabIdx);

    const tabsId = React.useId();

    return (
        <div className="tabs-wrapper">
            <div className="tabs-labels" role="tablist" aria-label="Tabs">
                {tabElements.map((tab, idx) => {
                    const { label, notifications } = tab.props;
                    const isActive = activeIdx === idx;

                    return (
                        <label key={idx} className="tab-label" data-active={isActive}>
                            <input
                                type="radio"
                                className="tab-radio"
                                name={`tabs--${tabsId}_selected-tab`}
                                onChange={() => setActiveIdx(idx)}
                                checked={isActive}
                            />
                            <span className="tab-label-text">{label}</span>
                            {notifications && (
                                <span className="tab-label-notifications">{notifications}</span>
                            )}
                        </label>
                    );
                })}
            </div>
            <div className="tabs-contents">
                {tabElements.map((tab, idx) => {
                    const isActive = activeIdx === idx;
                    return (
                        <div className="tab-content" data-active={isActive} key={idx}>
                            {tab.props.children}
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

// eslint-disable-next-line no-unused-vars
function Tab({ label, notifications, active = false, children }) {
    return <>{children}</>;
}

Tabs.Tab = Tab;
