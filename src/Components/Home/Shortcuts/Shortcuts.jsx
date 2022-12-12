import { useNavigate } from "react-router-dom";
import BaseButton from "../../BaseButton/BaseButton";

export default function Shortcuts() {

    const navigate = useNavigate();

    const shortcuts = [
        {name: "Ingresar dinero", to: "/deposit-money"},
        {name: "Transferir dinero", to: "/transfer-money"},
        {name: "Pagar servicios", to: "/pay-services"},
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
