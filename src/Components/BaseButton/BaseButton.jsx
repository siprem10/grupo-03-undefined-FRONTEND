
export default function BaseButton({text, color, onClick}) {

    return (
        <button 
            type="submit"
            onClick={onClick}
            color={{background: color}}>
            {text ? text : "Aceptar"}
        </button>
    )
}