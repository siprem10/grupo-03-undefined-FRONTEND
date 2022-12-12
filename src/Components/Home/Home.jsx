import Balance from './Balance/Balance';
import Card from '../Card/Card';
import Layout from '../Layout/Layout';
import Shortcuts from './Shortcuts/Shortcuts';

export default function Home() {

  return (
    <Layout>
      <div className="flex w-full justify-center">
        <Card>
          <Balance />
          <Shortcuts />
        </Card>
      </div>
    </Layout>
  );
}
