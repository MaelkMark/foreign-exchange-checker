import React from "react";
import {clsx} from "clsx"

import "./StateButton.css";

const DEFAULT_STATE = false;

const ButtonState = React.createContext({});

export default function StateButton({
    children,
    state = DEFAULT_STATE,
    checked = false,
    ...props
}) {
    return (
        <ButtonState.Provider value={state}>
            <button className={clsx("button", "statebutton", checked && "checked")} data-state={state} {...props}>
                {children}
            </button>
        </ButtonState.Provider>
    );
}

function State({ children, state = DEFAULT_STATE }) {
    const activeState = React.useContext(ButtonState);

    const isActive = state === activeState;

    return <div data-active={isActive}>{children}</div>;
}

function Off({children}) {
    return <State state={false}>{children}</State>
}

function On({children}) {
    return <State state={true}>{children}</State>
}

StateButton.State = State;
StateButton.Off = Off;
StateButton.On = On;
