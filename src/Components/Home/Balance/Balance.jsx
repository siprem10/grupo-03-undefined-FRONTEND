import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import eyeHide from "../../../assets/balance/eyeHide.webp";
import eyeShow from "../../../assets/balance/eyeShow.webp";

export default function Balance() {

    const dispatch = useDispatch();
    const [isShow, setShow] = useState(false);
    const balancedHardcoded = "10.039"

    // hay que crear un estado global y al montarse el componente hago el request
    //const {balance} = useSelector(state => state.balance);
    // useEffect(() => {
    //     dispatch(getBalance());
    // }, [dispatch]);

    function handleShow() {
        setShow(!isShow);
    }

    function getBalance() {
        const symbol = "$";
        const censured = "***";
        
        return isShow ? `${symbol} ${balancedHardcoded}` : `${symbol} ${censured}`;
    }

    function getIconShow() {
        return isShow ? eyeShow : eyeHide;
    }

    return (
        <div className="flex justify-start items-center">
            <h1 className="anim primaryTitle md:text-md xl:text-4xl">{getBalance()}</h1>
            <img className="pl-2 mt-1" onClick={handleShow} src={getIconShow()} alt="img found"></img>
        </div>
    );
}
