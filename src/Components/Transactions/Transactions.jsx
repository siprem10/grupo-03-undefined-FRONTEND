import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getTransactions } from '../../redux/actions/transactionActions';
import Card from '../Card/Card';
import Layout from '../Layout/Layout';
import Filter from './Filter/Filter';
import eyeHide from "../../assets/balance/eyeHide.webp";
import eyeShow from "../../assets/balance/eyeShow.webp";
import NotFound from '../NotFound/NotFound';
import Loader from '../Loader/Loader';

export default function Home() {

    const dispatch = useDispatch();
    const { id } = useSelector(state => state.auth.userData);
    const { transactionsFilter, filter } = useSelector(state => state.transactions);
    const [isShow, setShow] = useState(false);
    const [isLoading, setLoading] = useState(true);
    const h1Style = "anim text-primary text-gray-700 font-bold uppercase text-[13px] xs:text-[16px] sm:text-[17px] md:text-[18px] lg:text-[19px] xl:text-[20px] break-words";

    useEffect(() => {
        const interval = setInterval(() => dispatch(getTransactions(id, filter)), 7000);
        dispatch(getTransactions(id, filter));
        setTimeout(() => setLoading(false), 1000);

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

    function showIfService(name) {
        if (!name) return false;
        return name.includes("Pago");
    }

    function handleShow() {
        setShow(!isShow);
    }

    function getIconShow() {
        return isShow ? eyeShow : eyeHide;
    }

    if(isLoading){        
        return <Loader />
    }
    
    if (!transactionsFilter.length) {
        return <NotFound title="No hay transacciones" />
    }

    return (
        <Layout>
            <div className="flex w-full justify-center my-10">
                <Card className="px-6 flex flex-col sm:w-[90%] md:w-[70%] lg:w-[60%] xl:w-[50%] 2xl:w-[40%] w-full items-center">
                    {/* <h1>MOVIMIENTOS</h1> */}
                    <div className='flex w-full justify-start items-center'>
                        <Filter currentFilter={filter} className="flex w-full" />
                        <img className="mb-1 cursor-pointer" onClick={handleShow} src={getIconShow()} alt="img found"></img>
                    </div>
                    {transactionsFilter?.map((transaction) =>
                        <Card className='px-6 flex flex-col m-2 w-full hover:bg-gray-100 anim' key={transaction.id}>
                            <div className='flex justify-between w-full'>
                                <h1 className={`${h1Style} pr-6 xl:pr-12`}>{transaction.pay}</h1>
                                <h1 className={`${h1Style} ${isIngreso(transaction.type) ? "text-green-600" : "text-red-600"}`}>{`${isIngreso(transaction.type) ? "+" : "-"} $ ${transaction.amount}`}</h1>
                            </div>
                            {showIfTransfer(transaction.pay) &&
                                <div className='flex flex-inline items-center'>
                                    <h1 className={`${h1Style} mr-2`}>{type(transaction.pay) ? "A:" : "De:"}</h1>
                                    <h1 className={h1Style}>{type(transaction.pay) ? transaction.toUser.fullname : transaction.user.fullname}</h1>
                                </div>
                            }
                            {showIfService(transaction.pay) && transaction?.Category?.name &&
                                <h1 className={`${h1Style} mr-2`}>{`De: ${transaction.Category.name}`}</h1>                                   
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
