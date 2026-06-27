import React from "react";

import SVGCheck from "./assets/images/icon-check.svg?react";
import SVGStar from "./assets/images/icon-star.svg?react";

import "./App.css";
import StateButton from "./components/StateButton";
import Tabs from "./components/Tabs";
import CurrencyPicker from "./components/CurrencyPicker";
import Select from "./components/Select";
import Marquee from "./components/Marquee";

function getCurrencyIconUrl(name) {
    return new URL(`./assets/images/flags/${name}`, import.meta.url).href;
}

export default function App() {
    const [logged, setLogged] = React.useState(false);
    const [counter, setCounter] = React.useState(1);
    const [selectedCurrency, setSelectedCurrency] = React.useState("USD");
    const [value, setValue] = React.useState("option1");
    return (
        <>
            <Marquee>
                <Marquee.Item>START</Marquee.Item>
                <Marquee.Item>125.23</Marquee.Item>
                <Marquee.Item>1.3723</Marquee.Item>
                <Marquee.Item>0.9734</Marquee.Item>
                <Marquee.Item>3.2556</Marquee.Item>
                <Marquee.Item>0.2176</Marquee.Item>
                <Marquee.Item>0.3464</Marquee.Item>
                <Marquee.Item>2.2356</Marquee.Item>
                <Marquee.Item>103.23</Marquee.Item>
                <Marquee.Item>72.245</Marquee.Item>
                <Marquee.Item>2.1248</Marquee.Item>
                <Marquee.Item>{selectedCurrency}</Marquee.Item>
                <Marquee.Item>The end is really long</Marquee.Item>
            </Marquee>
            <Marquee speed={150} style={{ top: "100px" }}>
                <Marquee.Item style={{ padding: "5px", border: "1px solid lightblue" }}>First</Marquee.Item>
                <Marquee.Item>Second</Marquee.Item>
                <Marquee.Item>
                    <div style={{ color: "yellow" }}>Third</div>
                </Marquee.Item>
                <Marquee.Item style={{ color: "red" }}>{selectedCurrency}</Marquee.Item>
                <Marquee.Item>End</Marquee.Item>
            </Marquee>
            <Select ariaLabel="Az alma finom" value={value} onChange={setValue}>
                <Select.Item value="option1">Option 1</Select.Item>
                <Select.Item value="option2">Option 2</Select.Item>
                <Select.Item value="long">Something really-really-really loooong</Select.Item>
                <Select.Item value="option3">Option 3</Select.Item>
                <Select.Item value="option4">Option 4</Select.Item>
                <Select.Item value="option5">Option 5</Select.Item>
                <Select.Item value="option6">Option 6</Select.Item>
                <Select.Item value="option7">Option 7</Select.Item>
                <Select.Item value="option8">Option 8</Select.Item>
                <Select.Item value="option9">Option 9</Select.Item>
                <Select.Item value="option10">Option 10</Select.Item>
                <Select.Item value="option11">Option 11</Select.Item>
                <Select.Item value="option12">Option 12</Select.Item>
                <Select.Item value="option13">Option 13</Select.Item>
                <Select.Item value="option14">Option 14</Select.Item>
                <Select.Item value="option15">Option 15</Select.Item>
            </Select>
            <StateButton state={logged} checked={logged} onClick={() => setLogged(prev => !prev)}>
                <StateButton.Off>Log conversion</StateButton.Off>
                <StateButton.On>
                    <SVGCheck />
                    Logged
                </StateButton.On>
            </StateButton>
            <div>{value}</div>
            <CurrencyPicker
                selectedIcon={SVGCheck}
                initialValue="EUR"
                searchPlaceholder="Search currencies..."
                value={selectedCurrency}
                onChange={setSelectedCurrency}
            >
                <CurrencyPicker.Currency
                    iconSrc={getCurrencyIconUrl("hu.webp")}
                    code="HUF"
                    name="Hungarian Forint"
                />
                <CurrencyPicker.Category label="Popular">
                    <CurrencyPicker.Currency
                        iconSrc={getCurrencyIconUrl("us.webp")}
                        code="USD"
                        name="US Dollar"
                    />
                    <CurrencyPicker.Currency iconSrc={getCurrencyIconUrl("eu.webp")} code="EUR" name="Euro" />
                </CurrencyPicker.Category>
                <CurrencyPicker.Category label="Other Currencies">
                    <CurrencyPicker.Currency
                        iconSrc={getCurrencyIconUrl("ae.webp")}
                        code="AED"
                        name="UAE Dirham"
                    />
                    <CurrencyPicker.Currency
                        iconSrc={getCurrencyIconUrl("ar.webp")}
                        code="ARS"
                        name="Argentine Peso"
                    />
                    <CurrencyPicker.Currency
                        iconSrc={getCurrencyIconUrl("au.webp")}
                        code="AUD"
                        name="Australian Dollar"
                    />
                </CurrencyPicker.Category>
            </CurrencyPicker>
            <div>{selectedCurrency}</div>
            <Tabs>
                <Tabs.Tab label="Page 1" notifications={3}>Selected currency: {selectedCurrency}</Tabs.Tab>
                <Tabs.Tab label="Page 2" notifications="alma">Content of page 2</Tabs.Tab>
                <Tabs.Tab label="Page 3">Content of page 3</Tabs.Tab>
                <Tabs.Tab label="Page 4">Content of page 4</Tabs.Tab>
                <Tabs.Tab label="Page 5" notifications={12528}>
                    Elit eiusmod nostrud labore quis occaecat officia eu sunt est adipisicing elit cillum.
                    Occaecat laboris aliqua in quis occaecat id in eu duis. Do adipisicing nisi non consequat
                    exercitation nisi dolor anim sit labore. Aliqua velit reprehenderit labore in quis velit
                    esse sit velit voluptate sit ad. In amet incididunt culpa incididunt deserunt. Eu deserunt
                    culpa irure ullamco duis magna enim non non. Nulla est nisi adipisicing nulla aliquip est
                    in occaecat ad occaecat id.
                </Tabs.Tab>
            </Tabs>
            After tabs
            {/* <StateButton state={logged} checked={logged} onClick={() => setLogged((prev) => !prev)}>
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
                    A körte is finom
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
            <Tabs>
                <Tabs.Tab label="Page 1">Content of page 1</Tabs.Tab>
                <Tabs.Tab label="Page 2">Content of page 2</Tabs.Tab>
                <Tabs.Tab label="Page 3">Content of page 3</Tabs.Tab>
            </Tabs> */}
        </>
    );
}
