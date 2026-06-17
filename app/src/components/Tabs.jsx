import React from "react";

import "./Tabs.css"

export default function Tabs({ children }) {
    const [activeIdx, setActiveIdx] = React.useState(0);

    const tabElements = React.Children.toArray(children).filter(
        (child) => React.isValidElement(child) && child.type === Tab,
    );

    return (
        <div className="tabs-wrapper">
            <div className="tabs-labels">
                {tabElements.map((tab, idx) => {
                    const { label, notifications } = tab.props;
                    const isActive = activeIdx === idx;

                    return (
                        <button
                            className="tab-label"
                            data-active={isActive}
                            onClick={() => setActiveIdx(idx)}
                            key={idx}
                        >
                            <span className="tab-label-text">{label}</span>
                            {notifications && (
                                <span className="tab-label-notifications">{notifications}</span>
                            )}
                        </button>
                    );
                })}
            </div>
            <div className="tabs-contents">
                {
                    tabElements.map((tab, idx) => {
                        const isActive = activeIdx === idx;
                        return (
                            <div className="tab-content" data-active={isActive} key={idx}>
                                {tab.props.children}
                            </div>
                        )
                    })
                }
            </div>
        </div>
    );
}

function Tab({ label, notifications, children }) {
    return <>{children}</>;
}

Tabs.Tab = Tab;
