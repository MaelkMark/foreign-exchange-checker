import "./App.css";
import StateButton from "./components/StateButton";
import React from "react";
import SVGCheck from "./assets/images/icon-check.svg?react"
import SVGStar from "./assets/images/icon-star.svg?react"

export default function App() {
    const [logged, setLogged] = React.useState(false);
    const [counter, setCounter] = React.useState(1);
    return (
        <>
            <StateButton state={logged} checked={logged} onClick={() => setLogged((prev) => !prev)}>
                <StateButton.Off>
                    Log conversion
                </StateButton.Off>
                <StateButton.On>
                    <SVGCheck />
                    Logged
                </StateButton.On>
            </StateButton>
            <StateButton state={counter} checked={counter === 3} onClick={() => setCounter((prev) => (prev) % 3 + 1)}>
                <StateButton.State state={1}>
                    State 1
                </StateButton.State>
                <StateButton.State state={2}>
                    State 2
                </StateButton.State>
                <StateButton.State state={3}>
                    State 3
                </StateButton.State>
            </StateButton>
            <button className="button">Click me!</button>
            <button className="button"><SVGStar /></button>
            <button className="button"><SVGStar />Favorite</button>
        </>
    );
}
