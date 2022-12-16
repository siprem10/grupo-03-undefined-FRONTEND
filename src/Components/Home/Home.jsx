import Balance from './Balance/Balance';
import Card from '../Card/Card';
import Layout from '../Layout/Layout';
import Shortcuts from './Shortcuts/Shortcuts';
import CreditCard from './CreditCard/CreditCard';

export default function Home() {

  return (
    <Layout>
        <Card className="flex flex-col justify-center w-[90%] xs:w-[410px] md:w-[500px]">
          <Balance className={"mb-3 xs:mb-4"} />
          <Shortcuts className={"mb-3 xs:mb-4"} />
          <CreditCard />
        </Card>
    </Layout>
  );
}
