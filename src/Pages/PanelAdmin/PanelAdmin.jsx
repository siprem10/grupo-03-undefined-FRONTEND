import Layout from '../../Components/Layout/Layout';
import UsersTable from '../../Components/UsersTable/UsersTable';

const PanelAdmin = () => {
  return (
    <Layout title="Panel Admin">
      <div className="w-full p-6">
        <h1 className="text-3xl font-medium text-white my-4 text-center">Panel Admin</h1>
        <UsersTable />
      </div>
    </Layout>
  );
};
export default PanelAdmin;
