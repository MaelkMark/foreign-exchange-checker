import React from "react";
import {
    Select as AriaSelect,
    SelectValue,
    ListBox,
    ListBoxItem,
    Popover,
    Label,
    FieldError,
    useFilter,
    Autocomplete,
} from "react-aria-components";
import Button from "./Button";
import SearchField from "./SearchField";
import ChevronDown from "../assets/images/icon-chevron-down.svg?react";
import Check from "../assets/images/icon-check.svg?react";
import ConditionalWrapper from "../utils/ConditionalWrapper";
import "./Select.css";

const SelectContext = React.createContext({ selectionIcon: true });
export default function Select({
    search = true,
    selectionIcon = true,
    label,
    ariaLabel,
    errorMessage,
    children,
    ...props
}) {
    if (label && !ariaLabel) {
        ariaLabel = label;
    }

    const { contains } = useFilter({ sensitivity: "base" });

    return (
        <SelectContext.Provider value={{ selectionIcon }}>
            <AriaSelect className="select" {...props} aria-label={ariaLabel}>
                {label && <Label className="select-label">{label}</Label>}
                <Button className="select-trigger">
                    <SelectValue className="select-value" />
                    <ChevronDown className="select-trigger-icon" />
                </Button>
                <ConditionalWrapper
                    condition={search}
                    wrap={children => <Autocomplete filter={contains}>{children}</Autocomplete>}
                >
                    <Popover hideArrow className="select-popover">
                        {search && (
                            <SearchField aria-label="Search options" placeholder="Search options" autoFocus />
                        )}
                        <ListBox className="select-listbox">{children}</ListBox>
                    </Popover>
                </ConditionalWrapper>
                <FieldError className="select-error">{errorMessage}</FieldError>
            </AriaSelect>
        </SelectContext.Provider>
    );
}

function Item({ value, children, ...props }) {
    const { selectionIcon } = React.useContext(SelectContext);
    const textValue = typeof children === "string" ? children : value;
    const Icon = selectionIcon === true ? Check : selectionIcon;
    return (
        <ListBoxItem className="select-item" value={value} id={value} textValue={textValue} {...props}>
            {children}
            {Icon && <Icon className="select-item-check" />}
        </ListBoxItem>
    );
}

Select.Item = Item;
