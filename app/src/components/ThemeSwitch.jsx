import Select from "../components/Select";

import DarkModeIcon from "../assets/images/icon-dark.svg?react";
import LightModeIcon from "../assets/images/icon-light.svg?react";
import DeviceIcon from "../assets/images/icon-device.svg?react";

import useLocalStorage from "../hooks/useLocalStorage";

import "./ThemeSwitch.css";

export default function ThemeSwitch() {
    const [theme, setTheme] = useLocalStorage("theme", "system");
    return (
        <Select
            search={false}
            selectedKey={theme}
            onSelectionChange={setTheme}
            selectionIcon={false}
            ariaLabel="Select theme"
            className="theme-switch"
            data-theme={theme}
        >
            <Select.Item key="light" value="light" aria-label="Light theme">
                <LightModeIcon className="theme-icon" />
            </Select.Item>
            <Select.Item key="dark" value="dark" aria-label="Dark theme">
                <DarkModeIcon className="theme-icon" />
            </Select.Item>
            <Select.Item key="system" value="system" aria-label="System default theme">
                <DeviceIcon className="theme-icon" />
            </Select.Item>
        </Select>
    );
}
