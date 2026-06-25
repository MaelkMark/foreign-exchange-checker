import { Input, SearchField as AriaSearchField } from "react-aria-components/SearchField";
import {Label} from 'react-aria-components/Label';
import {FieldError} from 'react-aria-components/FieldError';
import Search from "../assets/images/icon-search.svg?react";
import "./SearchField.css";

export default function SearchField({ label, errorMessage, placeholder, onInput, ...props }) {
    return (
        <AriaSearchField className="search-field" {...props}>
            {label && <Label>{label}</Label>}
            <Search />
            <Input placeholder={placeholder} className="react-aria-Input inset" onInput={onInput} />
            <FieldError>{errorMessage}</FieldError>
        </AriaSearchField>
    );
}
