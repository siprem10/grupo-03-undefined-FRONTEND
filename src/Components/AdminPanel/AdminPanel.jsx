import Layout from '../Layout/Layout';
import UsersTable from '../UsersTable/UsersTable';

const AdminPanel = () => {
  return (
    <Layout>
      <div className="w-full p-6">
        <h1 className="text-sm xs:text-xl sm:text-2xl xl:text-3xl font-bold text-white my-5 text-center uppercase">Usuarios registrados</h1>
        <UsersTable />
      </div>
    </Layout>
  );
};

export default AdminPanel;
