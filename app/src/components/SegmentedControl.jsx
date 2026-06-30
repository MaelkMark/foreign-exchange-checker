import { ToggleButtonGroup, ToggleButton, SelectionIndicator } from "react-aria-components/ToggleButtonGroup";
import clsx from "clsx";

import "./SegmentedControl.css";

export default function SegmentedControl({ children, selectedOption, onSelect, className = null, ...props }) {
    selectedOption = selectedOption instanceof Set ? selectedOption : new Set([selectedOption]);
    return (
        <ToggleButtonGroup
            className={clsx("segmented-control", className)}
            disallowEmptySelection
            selectionMode="single"
            selectedKeys={selectedOption}
            onSelectionChange={(keys) => onSelect([...keys][0])}
            {...props}
        >
            {children}
        </ToggleButtonGroup>
    );
}

function Item({ children, id, className = null, ...props }) {
    return (
        <ToggleButton id={id} className={clsx("segmented-control-item", className)} {...props}>
            <SelectionIndicator className="react-aria-SelectionIndicator" data-selected />
            <span>{children}</span>
        </ToggleButton>
    );
}

SegmentedControl.Item = Item;
