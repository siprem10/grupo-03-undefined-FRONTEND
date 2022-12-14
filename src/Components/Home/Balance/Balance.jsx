import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import eyeHide from "../../../assets/balance/eyeHide.webp";
import eyeShow from "../../../assets/balance/eyeShow.webp";
import { getTransactions } from '../../../redux/actions/transactionActions';

export default function Balance() {

    const dispatch = useDispatch();
    const [isShow, setShow] = useState(false);
    const { id } = useSelector(state => state.auth.userData);
    const { balance } = useSelector(state => state.transactions);

    useEffect(() => {
        const interval = setInterval(() => dispatch(getTransactions(id)), 7000);
        dispatch(getTransactions(id));

        return () => clearInterval(interval);

    }, [dispatch]);

    function handleShow() {
        setShow(!isShow);
    }

    function getBalance() {
        const symbol = "$";
        const censured = "***";
        
        return isShow ? `${symbol} ${balance}` : `${symbol} ${censured}`;
    }

    function getIconShow() {
        return isShow ? eyeShow : eyeHide;
    }

    return (
        <div className="flex justify-start items-center">
            <h1 className="anim primaryTitle md:text-md xl:text-4xl">{getBalance()}</h1>
            <img className="pl-2 mt-1 cursor-pointer" onClick={handleShow} src={getIconShow()} alt="img found"></img>
        </div>
    );
}
