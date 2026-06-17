import "./App.css";
import StateButton from "./components/StateButton";
import Tabs from "./components/Tabs";
import React from "react";
import SVGCheck from "./assets/images/icon-check.svg?react";
import SVGStar from "./assets/images/icon-star.svg?react";

export default function App() {
    const [logged, setLogged] = React.useState(false);
    const [counter, setCounter] = React.useState(1);
    return (
        <>
            <StateButton state={logged} checked={logged} onClick={() => setLogged((prev) => !prev)}>
                <StateButton.Off>Log conversion</StateButton.Off>
                <StateButton.On>
                    <SVGCheck />
                    Logged
                </StateButton.On>
            </StateButton>
            <StateButton
                state={counter}
                checked={counter === 3}
                onClick={() => setCounter((prev) => (prev % 3) + 1)}
            >
                <StateButton.State state={1}>State 1</StateButton.State>
                <StateButton.State state={2}>State 2</StateButton.State>
                <StateButton.State state={3}>State 3</StateButton.State>
            </StateButton>
            <Tabs>
                <Tabs.Tab label="Alma">Az alma finom</Tabs.Tab>
                <Tabs.Tab label="Körte" notifications={1}>
                    Az körte is finom
                </Tabs.Tab>
                <Tabs.Tab label="Some really loooong content" notifications={12528}>
                    Nulla est ex anim ipsum commodo adipisicing incididunt cupidatat dolor esse id
                    consectetur. Tempor consequat cillum amet consequat adipisicing veniam. Nulla ut velit
                    Lorem cillum irure consectetur fugiat. Ad qui officia aliqua magna officia non laborum
                    magna deserunt officia dolor anim aliquip. Labore consequat enim in incididunt magna.
                    Reprehenderit excepteur ad dolore occaecat ad deserunt reprehenderit nisi mollit eiusmod
                    laborum nostrud nulla ipsum. In Lorem ut est veniam anim duis. Adipisicing occaecat in
                    minim pariatur mollit occaecat enim velit velit aliquip. Sint labore in esse tempor
                    laborum aliqua voluptate sunt. Culpa laborum esse laboris est ut mollit sit dolore do
                    adipisicing.
                </Tabs.Tab>
            </Tabs>
            <button className="button">Click me!</button>
            <button className="button">
                <SVGStar />
            </button>
            <button className="button">
                <SVGStar />
                Favorite
            </button>
        </>
    );
}
