import { useNavigate } from "react-router-dom";
import BaseButton from "../../BaseButton/BaseButton";

export default function Shortcuts() {

    const navigate = useNavigate();

    const shortcuts = [
        {name: "Ingresar dinero", to: "/transactions/create?deposit"},
        {name: "Transferir dinero", to: "/transactions/create?transfer"},
        {name: "Pagar servicios", to: "/transactions/create?services"},
    ];

    function redirect(to){
        if(!to) return;
        navigate(to);
    }

    return (
        <div className="flex justify-center items-center gap-2 lg:gap-4">
            {shortcuts?.map((shortcut, i) =>                 
                <BaseButton key={i} className="anim my-4 md:text-md xl:text-xl lg:text-lg" text={shortcut.name} onClick={() => redirect(shortcut.to)}></BaseButton>                
            )}
        </div>
    );
}
