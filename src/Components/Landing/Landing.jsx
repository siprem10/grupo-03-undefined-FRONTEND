import Layout from '../Layout/Layout';
import imagen from '../../assets/imagen.png';
import BaseButton from '../BaseButton/BaseButton';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

export default function Landing() {
  const {status} = useSelector(state => state.auth);
  const navigate = useNavigate();

  const redirect = () => {
    if (status === 'success') {
      navigate('/home');
    } else {
      navigate('/register');
    }
  };

  return (
    <Layout>
      <div className="flex flex-col lg:flex-row w-full xl:p-20 p-10 items-stretch">
        {/* Text Container */}
        <div className="w-full h-full lg:p-20 mb-8">
          <span className="text-2xl font-medium text-white inline-block">
            Bienvenido a AlkyBank Wallet
          </span>
          <h1 className="xs:text-3xl lg:text-4xl xl:text-5xl 2xl:text-6xl text-2xl font-medium text-accent my-4 ">
            Gestiona tu dinero de manera fácil
          </h1>
          <p className="">
            Toma el control de tus finanzas personales y de tu negocio con AlkyBank Wallet. Con esta
            app podrás llevar un control de tus ingresos y gastos. Además, podrás
            realizar carga de saldo, transferencias, pago de servicios y ver estadísticas.
          </p>
          <BaseButton
            text={status === 'success' ? 'Ir a mi cuenta' : 'Registrate'}
            onClick={redirect}
            className="mt-7"
          />
        </div>

        {/* Image Container */}
        <div className="flex w-full bg-primary p-10 lg:p-20 items-center justify-center">
          <img src={imagen} alt="" className="w-[300px] lg:w-full" />
        </div>
      </div>
    </Layout>
  );
}
