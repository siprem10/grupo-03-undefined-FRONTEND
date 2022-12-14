import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { PieChart, Pie, Sector, Cell, ResponsiveContainer } from 'recharts';
import { getTransactions } from '../../../redux/actions/transactionActions';

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
    { name: 'Gastos', value: expenses }
  ];
};

const renderActiveShape = props => {
  const RADIAN = Math.PI / 180;
  const {
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    startAngle,
    endAngle,
    fill,
    payload,
    percent,
    value
  } = props;
  const sin = Math.sin(-RADIAN * midAngle);
  const cos = Math.cos(-RADIAN * midAngle);
  const sx = cx + (outerRadius + 10) * cos;
  const sy = cy + (outerRadius + 10) * sin;
  const mx = cx + (outerRadius + 30) * cos;
  const my = cy + (outerRadius + 30) * sin;
  const ex = mx + (cos >= 0 ? 1 : -1) * 22;
  const ey = my;
  const textAnchor = cos >= 0 ? 'start' : 'end';

  return (
    <g>
      <text x={cx} y={cy} dy={8} textAnchor="middle" fill={fill}>
        {payload.name}
      </text>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
      />
      <Sector
        cx={cx}
        cy={cy}
        startAngle={startAngle}
        endAngle={endAngle}
        innerRadius={outerRadius + 6}
        outerRadius={outerRadius + 10}
        fill={fill}
      />
      <path d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`} stroke={fill} fill="none" />
      <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
      <text
        x={ex + (cos >= 0 ? 1 : -1) * 12}
        y={ey}
        textAnchor={textAnchor}
        fill="#f9bc60">{`$ ${value}`}</text>
      <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} dy={18} textAnchor={textAnchor} fill="#999">
        {`(Tasa ${(percent * 100).toFixed(2)}%)`}
      </text>
    </g>
  );
};

const BudgetChart = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [data, setData] = useState([]);
  const dispatch = useDispatch();
  const { id } = useSelector(state => state.auth.userData);
  const { transactions } = useSelector(state => state.transactions);

  useEffect(() => {
    dispatch(getTransactions(id));
    const dataBudget = calculateBudget(transactions);
    setData(dataBudget);
  }, [dispatch, data]);

  const onPieEnter = (_, index) => {
    setActiveIndex(index);
  };

  const colors = ['#abd1c6', '#e16162'];

  return (
    <div className="w-[400px] h-[400px]">
      <h3 className="text-primary font-bold text-black dark:text-white text-lg absolute">
        Grafico de Ingresos vs. Gastos
      </h3>
      <ResponsiveContainer>
        <PieChart className="w-[300px] h-[300px]">
          <Pie
            activeIndex={activeIndex}
            activeShape={renderActiveShape}
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={80}
            fill={'#abd1c6'}
            dataKey="value"
            onMouseEnter={onPieEnter}>
            {data.map((entry, index) => (
              <Cell key={index} fill={colors[index]} />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default BudgetChart;
