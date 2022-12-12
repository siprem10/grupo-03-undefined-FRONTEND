import { useState } from "react";
import { useSelector } from "react-redux";
import logoMc from "../../../assets/creditCard/logoMc.png";
import aw from "../../../assets/app/icon.png";

export default function CreditCard() {

    const [isShow, setShow] = useState(false);
    const { userData } = useSelector(state => state.auth);
    const spanStyle = "text-primary font-bold uppercase md:text-md xl:text-xl lg:text-lg";

    function handleShow(e) {
        setShow(!isShow);
        e.stopPropagation();
    }

    return (
        <div onClick={handleShow} className="flex flex-col justify-center items-start">
            <div className="w-full bg-emerald-500 hover:bg-emerald-400 p-5 rounded-xl flex flex-col justify-center items-start anim cursor-pointer">
                <div className="w-full flex justify-between">
                    <img src={logoMc} className="h-6 xl:h-8 anim" alt="not found" />
                    <img src={aw} className="h-7 xl:h-9 anim" alt="not found" />
                </div>
                {isShow &&
                    <>
                        <span className={spanStyle}>Número de tarjeta</span>
                        <span className={spanStyle}>{userData.creditCard?.num ?? "**** **** **** 1234"}</span>
                        <span className={spanStyle}>{userData.creditCard?.expDate ?? "01/25"}</span>
                        <h1 className={spanStyle} >{`${userData.firstName} ${userData.lastName}` ?? ""}</h1>
                    </>
                }
            </div>
        </div>
    );
}
