import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import useUsersList from '../../Hooks/useUsersList';

const columns = [
  {
    field: 'firstName',
    headerName: 'Nombre',
    width: 100
  },
  {
    field: 'lastName',
    headerName: 'Apellido',
    width: 100
  },
  {
    field: 'email',
    headerName: 'Correo electrónico',
    type: 'email',
    width: 240
  },
];

const UsersTable = () => {
  const users = useUsersList();

  const rows = users.map(user => {
    return {
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email
    };
  });

  return (
    <div className="flex w-full justify-center rounded-md ">
      <Box className="flex h-[32rem] w-[40rem]">
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={10}
          rowsPerPageOptions={[5]}
          disableSelectionOnClick
          experimentalFeatures={{ newEditingApi: true }}
          className="bg-white px-4"
        />
      </Box>
    </div>
  );
};

export default UsersTable;
