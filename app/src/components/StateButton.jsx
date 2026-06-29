import React from "react";
import Button from "./Button";
import clsx from "clsx";

import "./StateButton.css";

const DEFAULT_STATE = false;
const ButtonState = React.createContext({});

export default function StateButton({
    children,
    state = null,
    checked = false,
    setChecked = null,
    uncheckAfter = null,
    disabledWhenChecked = false,
    onClick,
    isDisabled = false,
    className,
    ...props
}) {
    state ??= checked ?? DEFAULT_STATE;

    React.useEffect(() => {
        if (!setChecked || !uncheckAfter || checked !== true) {
            return;
        }

        const timeout = setTimeout(() => {
            setChecked(false);
        }, uncheckAfter);

        return () => clearTimeout(timeout);
    }, [checked, setChecked, uncheckAfter]);

    return (
        <ButtonState.Provider value={state}>
            <Button
                className={clsx("statebutton", checked && "checked", className)}
                data-state={state}
                data-disabled-hidden={disabledWhenChecked && checked}
                isDisabled={isDisabled || (disabledWhenChecked && checked)}
                onClick={onClick}
                {...props}
            >
                {children}
            </Button>
        </ButtonState.Provider>
    );
}

function State({ children, state = DEFAULT_STATE }) {
    const activeState = React.useContext(ButtonState);

    const isActive = state === activeState;

    return <div data-active={isActive}>{children}</div>;
}

function Off({ children }) {
    return <State state={false}>{children}</State>;
}

function On({ children }) {
    return <State state={true}>{children}</State>;
}

StateButton.State = State;
StateButton.Off = Off;
StateButton.On = On;
