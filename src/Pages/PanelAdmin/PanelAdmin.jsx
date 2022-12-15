import Layout from '../../Components/Layout/Layout';
import UsersTable from '../../Components/UsersTable/UsersTable';

const PanelAdmin = () => {
  return (
    <Layout>
      <div className="w-full p-6">
        <h1 className="xs:text-xl md:text-2xl xl:text-3xl text-xs font-medium text-white my-4 text-center uppercase">Usuarios registrados</h1>
        <UsersTable />
      </div>
    </Layout>
  );
};
export default PanelAdmin;

l