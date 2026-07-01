import StateButton from "./StateButton";

import StarIcon from "../assets/images/icon-star.svg?react";
import StarFilledIcon from "../assets/images/icon-star-filled.svg?react";

import { toggleFavorite } from "../utils/utils";
import clsx from "clsx";

import "./FavButton.css";

export default function FavButton({
    favorites,
    setFavorites,
    sendCurrency,
    currency,
    className,
    style,
    ...props
}) {
    return (
        <StateButton
            className={clsx("pair-favorite", className)}
            style={{ gridArea: "favorite", ...style }}
            checked={favorites.includes(`${sendCurrency}-${currency.code}`)}
            onClick={() => toggleFavorite(favorites, setFavorites, sendCurrency, currency.code)}
            {...props}
        >
            <StateButton.Off>
                <StarIcon />
            </StateButton.Off>
            <StateButton.On>
                <StarFilledIcon />
            </StateButton.On>
        </StateButton>
    );
}
