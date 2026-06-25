export default function ConditionalWrapper({ condition, wrap, children }) {
    return condition ? wrap(children) : children;
}
