import React from "react";
import clsx from "clsx";

import {
    Select as AriaSelect,
    SelectValue,
    ListBox,
    ListBoxItem,
    Popover,
    FieldError,
    useFilter,
    Autocomplete,
    ListBoxSection,
    Header,
} from "react-aria-components";
import Button from "./Button";
import SearchField from "./SearchField";
import ChevronDown from "../assets/images/icon-chevron-down.svg?react";
import Check from "../assets/images/icon-check.svg?react";

import ExchangeContext from "../context/ExchangeContext";

import "./Select.css";
import "./CurrencyPicker.css";

export default function CurrencyPicker({ value, onChange, errorMessage, omit = [], className, ...props }) {
    const { contains } = useFilter({ sensitivity: "base" });
    const [search, setSearch] = React.useState("");
    const previousValue = React.useRef(value);

    omit = Array.isArray(omit) ? omit : [omit];

    let { currencies, currenciesLoading, currenciesError, userCountry } = React.useContext(ExchangeContext);

    currencies ??= [];

    const popularCurrencies = React.useMemo(
        () =>
            [
                ...(userCountry && !userCountry.fallback && userCountry.error === null
                    ? [userCountry.currency]
                    : []),
                "USD",
                "EUR",
                "GBP",
            ]
                .map(code => currencies.find(c => c.code === code))
                .filter(currency => currency !== undefined && !omit.includes(currency.code)),
        [currencies, userCountry, omit],
    );
    const popularItems = React.useMemo(
        () =>
            popularCurrencies.map(currency => {
                return (
                    <Currency
                        key={currency.code}
                        code={currency.code}
                        name={currency.name}
                        iconSrc={currency.icon}
                    />
                );
            }),
        [popularCurrencies],
    );
    const otherCurrencies = React.useMemo(
        () =>
            currencies?.filter(
                currency => !popularCurrencies.includes(currency) && !omit.includes(currency.code),
            ) || [],
        [currencies, popularCurrencies, omit],
    );

    const otherItems = React.useMemo(
        () =>
            otherCurrencies.map(currency => (
                <Currency
                    key={currency.code}
                    code={currency.code}
                    name={currency.name}
                    iconSrc={currency.icon}
                />
            )),
        [otherCurrencies],
    );

    const handleChange = React.useCallback(
        newValue => {
            onChange(newValue, previousValue.current);
            previousValue.current = newValue;
        },
        [onChange]
    );

    if (currenciesError) {
        return <div className="select currency-picker error"></div>;
    }

    return (
        <AriaSelect
            className={clsx("select currency-picker", className, currenciesLoading && "loading")}
            {...props}
            aria-label="Pick a currency"
            value={value}
            onChange={handleChange}
        >
            <Button className="select-trigger">
                <SelectValue className="select-value" />
                <ChevronDown className="select-trigger-icon" />
            </Button>
            <Autocomplete filter={contains}>
                <Popover hideArrow className="select-popover currency-picker">
                    <SearchField
                        aria-label="Search currencies"
                        placeholder="Search currencies"
                        autoFocus
                        onInput={event => setSearch(event.target.value)}
                    />
                    <ListBox className="select-listbox">
                        <Category label="Popular" search={search} filter={contains}>
                            {popularItems}
                        </Category>
                        <Category label="Other currencies" search={search} filter={contains}>
                            {otherItems}
                        </Category>
                    </ListBox>
                </Popover>
            </Autocomplete>
            <FieldError className="select-error">{errorMessage}</FieldError>
        </AriaSelect>
    );
}

function Category({ label, children, search = "", filter, ...props }) {
    const visibleCount = React.Children.toArray(children).filter(child => {
        if (!React.isValidElement(child)) {
            return false;
        }
        const textValue =
            child.props.textValue ??
            `${child.props.code ?? ""} ${child.props.name ?? child.props.code ?? ""}`;
        return filter(textValue, search);
    }).length;

    return (
        <ListBoxSection className="select-category" aria-label={label} {...props}>
            <Header className="select-category-header">
                <div className="select-category-label">{label}</div>
                <div className="select-category-length">{visibleCount}</div>
            </Header>
            {children}
        </ListBoxSection>
    );
}

function Currency({ code, name, iconSrc, ...props }) {
    name ??= code;
    return (
        <ListBoxItem className="select-item" value={code} id={code} textValue={`${code} ${name}`} {...props}>
            <img src={iconSrc} alt={name} className="select-item-icon" aria-hidden="true" />
            <div className="select-item-code">{code}</div>
            <div className="select-item-name">{name}</div>
            <Check className="select-item-check" />
        </ListBoxItem>
    );
}
