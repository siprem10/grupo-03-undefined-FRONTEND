export default function BaseButton({ text, color, onClick, disabled }) {

    function getBackgroundColor() {
        const background = {
            blue: "blue",
            green: "green",
            red: "red",
            default: "#804000"
        }
        return background[color] ?? [background.default];
    }

    return (
        <button className="px-4 py-2 font-semibold rounded"
            type="submit"
            onClick={onClick}
            disabled={disabled ? disabled : false}
            style={{ background: getBackgroundColor(color) }}>
            {text ? text : "Aceptar"}
        </button>
    )
}