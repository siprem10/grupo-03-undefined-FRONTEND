export default function BaseButton({ text, color, onClick, disabled }) {

    // function getBackgroundColor() {
    //     const background = {
    //         blue: "blue",
    //         green: "green",
    //         red: "red",
    //         default: "#804000"
    //     }
    //     return background[color] ?? [background.default];
    // }

    return (
        <button className="primaryButton"
            type="submit"
            onClick={onClick}
            // style={{ background: getBackgroundColor(color) }}
            disabled={disabled ? disabled : false}>
            {text ? text : "Aceptar"}
        </button>
    )
}