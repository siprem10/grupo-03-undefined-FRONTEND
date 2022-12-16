import { useNavigate } from "react-router-dom";
import BaseButton from "../../BaseButton/BaseButton";

export default function Shortcuts({className}) {

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
        <div className={`flex flex-col xs:flex-row justify-center items-center gap-3 ${className ?? ""}`}>
            {shortcuts?.map((shortcut, i) =>                 
                <BaseButton key={i} className="anim w-full xs:w-fit md:text-md lg:text-lg" text={shortcut.name} onClick={() => redirect(shortcut.to)}></BaseButton>                
            )}
        </div>
    );
}
