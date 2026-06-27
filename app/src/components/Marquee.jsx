import React from "react";
import clsx from "clsx";
import "./Marquee.css";

function mergeStyles(baseStyle, extraStyle) {
    return {
        ...(baseStyle ?? {}),
        ...(extraStyle ?? {}),
    };
}

function fillItems(items, sourceItems, containerWidth, nextIndexRef, idRef) {
    if (sourceItems.length === 0 || containerWidth <= 0) {
        return [];
    }

    const nextItems = [...items];
    let currentRight = nextItems.length > 0 ? Math.max(...nextItems.map(item => item.left + item.width)) : 0;

    while (currentRight <= containerWidth) {
        const sourceIndex = nextIndexRef.current % sourceItems.length;
        const sourceItem = sourceItems[sourceIndex];

        nextItems.push({
            id: idRef.current++,
            left: currentRight,
            width: sourceItem.width,
            element: sourceItem.element,
        });

        currentRight += sourceItem.width;
        nextIndexRef.current = (sourceIndex + 1) % sourceItems.length;
    }

    return nextItems;
}

export default function Marquee({ children, speed = 40, className, ...props }) {
    const containerRef = React.useRef(null);
    const sandboxRef = React.useRef(null);
    const frameRef = React.useRef(null);
    const lastFrameTimeRef = React.useRef(null);
    const nextIndexRef = React.useRef(0);
    const instanceIdRef = React.useRef(0);

    const [measuredItems, setMeasuredItems] = React.useState([]);
    const [containerWidth, setContainerWidth] = React.useState(0);
    const [renderedItems, setRenderedItems] = React.useState([]);

    const childItems = React.useMemo(
        () => React.Children.toArray(children).filter(React.isValidElement),
        [children],
    );

    const measuredItemsRef = React.useRef(measuredItems);

    React.useEffect(() => {
        measuredItemsRef.current = measuredItems;
    }, [measuredItems]);

    React.useLayoutEffect(() => {
        if (!containerRef.current) {
            return;
        }

        const updateWidth = () => {
            setContainerWidth(containerRef.current?.getBoundingClientRect().width ?? 0);
        };

        updateWidth();

        const resizeObserver = new ResizeObserver(updateWidth);
        resizeObserver.observe(containerRef.current);

        return () => resizeObserver.disconnect();
    }, []);

    React.useLayoutEffect(() => {
        if (!sandboxRef.current) {
            return;
        }

        const measure = () => {
            const nextMeasuredItems = Array.from(sandboxRef.current.children).map((child, index) => ({
                element: childItems[index],
                width: child.getBoundingClientRect().width,
            }));

            setMeasuredItems(nextMeasuredItems);
        };

        if (typeof document !== "undefined" && document.fonts?.status !== "loaded") {
            document.fonts.ready.then(measure);
        } else {
            measure();
        }
    }, [childItems]);

    React.useEffect(() => {
        if (measuredItems.length === 0 || containerWidth <= 0) {
            setRenderedItems([]);
            nextIndexRef.current = 0;
            return;
        }

        setRenderedItems(currentItems =>
            fillItems(currentItems, measuredItems, containerWidth, nextIndexRef, instanceIdRef),
        );
    }, [measuredItems, containerWidth]);

    React.useEffect(() => {
        const tick = time => {
            if (lastFrameTimeRef.current == null) {
                lastFrameTimeRef.current = time;
            }

            const stepSize = ((time - lastFrameTimeRef.current) / 1000) * speed;
            lastFrameTimeRef.current = time;

            if (measuredItemsRef.current.length > 0 && containerWidth > 0) {
                setRenderedItems(currentItems => {
                    const shiftedItems = currentItems
                        .map(item => ({
                            ...item,
                            left: item.left - stepSize,
                        }))
                        .filter(item => item.left + item.width >= 0);

                    return fillItems(
                        shiftedItems,
                        measuredItemsRef.current,
                        containerWidth,
                        nextIndexRef,
                        instanceIdRef,
                    );
                });
            }

            frameRef.current = requestAnimationFrame(tick);
        };

        frameRef.current = requestAnimationFrame(tick);

        return () => {
            if (frameRef.current != null) {
                cancelAnimationFrame(frameRef.current);
            }
            lastFrameTimeRef.current = null;
        };
    }, [containerWidth, speed]);

    return (
        <div className={clsx("marquee", className)} ref={containerRef} role="marquee" aria-live="off" {...props}>
            <div className="marquee-sandbox" ref={sandboxRef} aria-hidden="true">
                {childItems}
            </div>
            <div className="marquee-content">
                {renderedItems.map(item =>
                    React.cloneElement(item.element, {
                        key: item.id,
                        style: mergeStyles(item.element.props.style, {
                            left: `${item.left}px`,
                        }),
                    }),
                )}
            </div>
        </div>
    );
}

function Item({ children, className, style, ...props }) {
    return (
        <span className={clsx("marquee-item", className)} style={style} {...props}>
            {children}
        </span>
    );
}

Marquee.Item = Item;
