import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getTransactions } from '../../redux/actions/transactionActions';
import Card from '../Card/Card';
import Layout from '../Layout/Layout';
import Filter from './Filter/Filter';
import eyeHide from "../../assets/balance/eyeHide.webp";
import eyeShow from "../../assets/balance/eyeShow.webp";
import NotFound from '../NotFound/NotFound';

export default function Home() {

    const dispatch = useDispatch();
    const { id } = useSelector(state => state.auth.userData);
    const { transactionsFilter } = useSelector(state => state.transactions);
    const { filter } = useSelector(state => state.transactions);
    const [isShow, setShow] = useState(false);
    const h1Style = "anim text-primary text-gray-700 font-bold uppercase md:text-md xl:text-xl lg:text-lg break-words";

    useEffect(() => {
        const interval = setInterval(() => dispatch(getTransactions(id, filter)), 7000);
        dispatch(getTransactions(id, filter));

        return () => clearInterval(interval);

    }, [dispatch, filter]);

    function type(name) {
        if (!name) return false;
        return name.includes("enviada");
    }

    function isIngreso(type) {
        if (!type) return false;
        return type === "Ingreso";
    }

    function showIfTransfer(name) {
        if (!name) return false;
        return name.includes("Transferencia");
    }

    function handleShow() {
        setShow(!isShow);
    }

    function getIconShow() {
        return isShow ? eyeShow : eyeHide;
    }

    if (!transactionsFilter.length) {
        return <NotFound title="No hay transacciones" />
    }

    return (
        <Layout>
            <div className="flex w-full justify-center m-5">
                <Card className="flex flex-col w-full items-center w-fit">
                    {/* <h1>MOVIMIENTOS</h1> */}
                    <div className='flex w-full justify-start items-center'>
                        <Filter currentFilter={filter} className="flex w-full" />
                        <img className="mb-1 cursor-pointer" onClick={handleShow} src={getIconShow()} alt="img found"></img>
                    </div>
                    {transactionsFilter?.map((transaction) =>
                        <Card className='flex flex-col m-2 md:w-full 2xl:w-full w-full hover:bg-gray-100 anim' key={transaction.id}>
                            <div className='flex justify-between w-full'>
                                <h1 className={`${h1Style} pr-6 xl:pr-12`}>{transaction.Category.name}</h1>
                                <h1 className={`${h1Style} ${isIngreso(transaction.type) ? "text-green-600" : "text-red-600"}`}>{`${isIngreso(transaction.type) ? "+" : "-"} $ ${transaction.amount}`}</h1>
                            </div>
                            {showIfTransfer(transaction.Category.name) &&
                                <div className='flex flex-inline items-center'>
                                    <h1 className={`${h1Style} mr-2`}>{type(transaction.Category.name) ? "A:" : "De:"}</h1>
                                    <h1 className={h1Style}>{type(transaction.Category.name) ? transaction.toUser.fullname : transaction.user.fullname}</h1>
                                </div>
                            }
                            <h1 className={h1Style}>{transaction.updatedAt ?? transaction.createdAt}</h1>
                            {isShow && transaction.concept &&
                                <h1 className={h1Style}>Concepto: {transaction.concept}</h1>
                            }
                        </Card>
                    )}
                </Card>
            </div>
        </Layout>
    );
}
