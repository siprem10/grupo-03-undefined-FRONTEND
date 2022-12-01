
export default function BaseButton({text, color, onClick}) {

    function getBackgroundColor(){
                
        const background = {
            blue: "blue",
            green: "green",
            red: "red",
            default: "#804000"
        }

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