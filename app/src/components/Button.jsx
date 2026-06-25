import "./Button.css";
import {Button as AriaButton} from "react-aria-components/Button";

export default function Button({ children, className, ...props }) {
    return (
        <AriaButton className={`button ${className || ''}`} {...props}>
            {children}
        </AriaButton>
    );
}