import Layout from '../Layout/Layout';
import imagen from '../../assets/imagen.png';
import BaseButton from '../BaseButton/BaseButton';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

export default function Home() {
  const authStatus = useSelector(state => state.auth.status);
  const navigate = useNavigate();

  const onClick = () => {
    if (authStatus === 'success') {
      return navigate('/transactions');
    } else {
      return navigate('/login');
    }
  };

  return (
    <Layout>
      <div className="flex flex-col lg:flex-row w-full xl:p-20 p-10 items-stretch">
        {/* Text Container */}
        <div className="w-full h-full lg:p-20 mb-8">
          <span className="text-2xl font-medium text-white my-4 inline-block">
            Bienvenido a AlkyBank Wallet
          </span>
          <h1 className="text-6xl font-medium text-accent my-4 ">
            Gestiona tu dinero de manera fácil
          </h1>
          <p className="">
            Toma el control de tus finanzas personales y de tu negocio con AlkyBank Wallet. Con esta
            app podrás llevar un control de tus gastos, ingresos y transferencias. Además, podrás
            crear presupuestos y ver tus estadísticas de gastos.
          </p>
          <BaseButton
            text={authStatus === 'success' ? 'Ir a mis Transacciones' : 'Iniciar sesión'}
            onClick={onClick}
            className="hover:opacity-60 text-white py-4 px-8 rounded-md m-8"
          />
        </div>

        {/* Image Container */}
        <div className="flex w-full bg-primary p-20 items-middle justify-center">
          <img src={imagen} alt="" className="object-contain" />
        </div>
      </div>
    </Layout>
  );
}
