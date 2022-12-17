import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import { getTransactions } from '../../../redux/actions/transactionActions';
import Loading from '../../Loading/Loading';
import RefChart from '../RefChart/RefChart';

const calculateBudget = transactions => {
  const incomes = transactions.reduce((acc, transaction) => {
    if (transaction.type === 'Ingreso') {
      acc += transaction.amount;
    }
    return acc;
  }, 0);
  const expenses = transactions.reduce((acc, transaction) => {
    if (transaction.type === 'Egreso') {
      acc += transaction.amount;
    }
    return acc;
  }, 0);

  return [
    { name: 'Ingresos', value: incomes },
    { name: 'Egresos', value: expenses }
  ];
};

const BudgetChart = () => {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const dispatch = useDispatch();
  const { id } = useSelector(state => state.auth.userData);
  const { transactions } = useSelector(state => state.transactions);

  useEffect(() => {
    dispatch(getTransactions(id));
    const dataBudget = calculateBudget(transactions);
    setData(dataBudget);
    setTimeout(() => setLoading(false), 1000);

  }, [dispatch, transactions.length]);

  const colors = ['#1ea34a', '#de2f27'];

  if (isLoading) {
    return (
      <div className="bg-white rounded-lg p-2 flex flex-col items-center justify-center uppercase w-[90%] xs:w-[420px] h-[320px]">
        <Loading color="#054a47" />
      </div>)
  }

  return (
    <div className="bg-white rounded-lg p-2 flex flex-col items-center justify-center uppercase w-[90%] xs:w-[420px] h-[320px]">

      {transactions.length > 0
        ?
        <>
          <h3 className="pt-2 text-center px-5 text-primary font-bold text-black dark:text-white text-lg relative">
            Transacciones
          </h3>
          
          <RefChart className="pt-2" data={data} colors={colors} />

          <ResponsiveContainer>
            <PieChart >
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={40}
                outerRadius={80}
                fill="#abd1c6"
                dataKey="value">
                {data.map((entry, i) => (
                  <Cell key={i} fill={colors[i]} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </>
        : <h3 className="block py-2 text-primary font-bold text-black dark:text-white text-lg">
          No tienes transacciones aun
        </h3>
        }
    </div>
  );
};

export default BudgetChart;
