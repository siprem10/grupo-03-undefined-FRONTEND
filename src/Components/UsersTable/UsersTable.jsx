import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import { FaUserEdit, FaTrash, FaTrashRestore } from 'react-icons/fa';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { bannedUser, getAllUsers, unbannedUser } from '../../redux/actions/userActions';
import { resetAdminUsers } from '../../redux/slices/userSlice';

export default function UsersTable() {

  const dispatch = useDispatch();
  const { adminUsers } = useSelector(state => state.user);

  useEffect(() => {
    dispatch(getAllUsers());

    return () => dispatch(resetAdminUsers());

  }, [dispatch]);

  function handleBan(id) {
    dispatch(bannedUser(id));
  }

  function handleUnban(id) {
    dispatch(unbannedUser(id));
  }

  // function handleRole(roleId) {

  //   //dispatch(changeRoleId(id));
  // }

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
    }, {
      field: 'actions',
      headerName: 'Acciones',
      width: 190,
      sortable: false,
      filterable: false,
      renderCell: params => {
        return (
          <>
            {/* <Tooltip title="Editar" arrow enterNextDelay={1500}>
              <Button onClick={() => handleRole(params.row.roleId)}>
                <FaUserEdit color="secondary" />
              </Button>
            </Tooltip> */}
            {params.row.deletedAt
              ?
              <Tooltip title="Desbanear" arrow enterNextDelay={1500}>
                <Button onClick={() => handleUnban(params.row.id)}>
                  <FaTrashRestore color="#054a47" />
                </Button>
              </Tooltip>
              :
              <Tooltip title="Banear" arrow enterNextDelay={1500}>
                <Button onClick={() => handleBan(params.row.id)}>
                  <FaTrash color="red" />
                </Button>
              </Tooltip>
            }
          </>
        );
      }
    }
  ];

  return (
    <div className="flex w-full justify-center rounded-md ">
      <Box className="flex h-[32rem] w-[40rem]">
        <DataGrid
          rows={adminUsers}
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
