import clsx from "clsx";
import "./Loader.css";

export default function Spinner({ className, duration = 1, ...props }) {
    return (
        <div
            className={clsx("loader", "loader--spinner", className)}
            style={{ animationDuration: `${duration}s` }}
            role="status"
            {...props}
        ></div>
    );
}
