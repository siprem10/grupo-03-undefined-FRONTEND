
export default function BaseButton({text, color, onClick}) {

    // Add values needed!
    const background = {
        blue: "blue",
        green: "green",
        red: "red",
        default: "#804000"
    }

    function getBackgroundColor(){
        return background[color] ?? [background.default];
    }

    return (
        <button 
            type="submit"
            onClick={onClick}
            style={{background: getBackgroundColor(color)}}>
            {text ? text : "Aceptar"}
        </button>
    )
}