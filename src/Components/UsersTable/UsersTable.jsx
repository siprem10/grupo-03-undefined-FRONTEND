import { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import { FaUserEdit, FaTrash } from 'react-icons/fa';
import { DataGrid } from '@mui/x-data-grid';
import useUsersList from '../../Hooks/useUsersList';

const columns = [
  { field: 'id', headerName: 'ID', width: 90 },
  {
    field: 'firstName',
    headerName: 'Nombre',
    width: 180,
    editable: true
  },
  {
    field: 'lastName',
    headerName: 'Apellidos',
    width: 180,
    editable: true
  },
  {
    field: 'email',
    headerName: 'Correo electrónico',
    type: 'email',
    width: 300,
    editable: true
  },
  {
    field: 'actions',
    headerName: 'Acciones',
    headerAlign: 'right',
    width: 190,
    sortable: false,
    filterable: false,
    align: 'right',
    renderCell: params => {
      return (
        <>
          <Tooltip title="Editar" arrow enterNextDelay={1500}>
            <Button onClick={e => handleUpdate(e, params.row)}>
              <FaUserEdit color="secondary" />
            </Button>
          </Tooltip>
          <Tooltip title="Eliminar" arrow enterNextDelay={1500}>
            <Button onClick={e => handleDelete(e, params.row)}>
              <FaTrash className=" text-red-700" />
            </Button>
          </Tooltip>
        </>
      );
    }
  }
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
    <div className="flex flex-col w-full grow overflow-hidden rounded-md ">
      <Box sx={{ width: '1000px' }} className="h-[36.5rem] w-[60rem] mx-auto">
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={10}
          rowsPerPageOptions={[5]}
          checkboxSelection
          disableSelectionOnClick
          experimentalFeatures={{ newEditingApi: true }}
          className=" bg-white"
        />
      </Box>
    </div>
  );
};

export default UsersTable;
