import React, { forwardRef } from 'react';
import {
  Box,
  Fab,
  Grid,
  Typography,
  Divider,
  CircularProgress,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Tooltip,
  FormControlLabel,
  Switch,
  Dialog,
  DialogTitle,
  DialogActions,
  Button,
} from '@material-ui/core';
import Persian from './../../../../lib/constants/persian';
import { Link, RouteComponentProps } from 'react-router-dom';
import { IoMdAdd, IoMdTrash } from 'react-icons/io';
import { makeStyles, Theme } from '@material-ui/core/styles';
import { Colors } from './../../../../theme';
import { UserInterface } from './../../../../lib/constants/interfaces';
import { useAuth } from './../../../../lib/contexts/auth';
import { RiEdit2Fill } from 'react-icons/ri';
import { FiGitPullRequest } from 'react-icons/fi';
import { getUsers, statusUser, deleteUser } from './../../../../lib/apis/users';
import MaterialTable, { Icons } from 'material-table';

import {
  MdAddBox,
  MdArrowDownward,
  MdCheck,
  MdChevronLeft,
  MdChevronRight,
  MdClear,
  MdDelete,
  MdEdit,
  MdFilterList,
  MdFirstPage,
  MdLastPage,
  MdRemove,
  MdSave,
  MdSearch,
  MdViewColumn,
} from 'react-icons/md';

const tableIcons: Icons = {
  Add: forwardRef((props, ref) => <MdAddBox {...props} />),
  Check: forwardRef((props, ref) => <MdCheck {...props} />),
  Clear: forwardRef((props, ref) => <MdClear {...props} />),
  Delete: forwardRef((props, ref) => <MdDelete {...props} />),
  DetailPanel: forwardRef((props, ref) => <MdChevronRight {...props} />),
  Edit: forwardRef((props, ref) => <MdEdit {...props} />),
  Export: forwardRef((props, ref) => <MdSave {...props} />),
  Filter: forwardRef((props, ref) => <MdFilterList {...props} />),
  FirstPage: forwardRef((props, ref) => <MdFirstPage {...props} />),
  LastPage: forwardRef((props, ref) => <MdLastPage {...props} />),
  NextPage: forwardRef((props, ref) => <MdChevronRight {...props} />),
  PreviousPage: forwardRef((props, ref) => <MdChevronLeft {...props} />),
  ResetSearch: forwardRef((props, ref) => <MdClear {...props} />),
  Search: forwardRef((props, ref) => <MdSearch {...props} />),
  SortArrow: forwardRef((props, ref) => <MdArrowDownward {...props} />),
  ThirdStateCheck: forwardRef((props, ref) => <MdRemove {...props} />),
  ViewColumn: forwardRef((props, ref) => <MdViewColumn {...props} />),
};

const useStyles = makeStyles((theme: Theme) => ({
  image: {
    width: 120,
    height: 120,
    margin: 'auto',
  },
  card: {
    backgroundColor: Colors.backgroundOpacity,
    overflow: 'unset !important',
    marginBottom: '16px',
  },
  divider: {
    backgroundColor: Colors.dividerColor,
  },
  table: {
    backgroundColor: 'transparent !important',
  },
}));

const Users: React.FC<RouteComponentProps> = (props) => {
  const [users, setUsers] = React.useState<[UserInterface] | undefined>(
    undefined
  );
  const [loading, setLoading] = React.useState<boolean>(true);
  const [actionLoading, setActionLoading] = React.useState<boolean>(false);
  const [activeId, setActiveId] = React.useState<string>('');
  const [dialog, setDialog] = React.useState<boolean>(false);
  const { logout } = useAuth();
  const classes = useStyles();

  React.useEffect(() => {
    handleUsers();
  }, []);

  const handleUsers = async () => {
    await getUsers().then(async (res) => {
      if (res.status === 'SUCCESS' && res.users) {
        setUsers(res.users);
      } else if (res.status === 'LOGOUT') {
        if (logout) {
          await logout().then(async (res) => {
            if (res.status === 'SUCCESS') {
              props.history.push('/login');
            }
          });
        }
      }
    });
    setLoading(false);
  };

  const handleStatus = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setActionLoading(true);
    await statusUser(e.target.id, e.target.checked).then(async (res) => {
      if (res.status === 'SUCCESS') {
        props.history.push('/');
      } else if (res.status === 'LOGOUT') {
        if (logout) {
          await logout().then(async (res) => {
            if (res.status === 'SUCCESS') {
              props.history.push('/login');
            }
          });
        }
      }
    });
    setActionLoading(false);
  };

  const handleDelete = async () => {
    setActionLoading(true);
    await deleteUser(activeId).then(async (res) => {
      if (res.status === 'SUCCESS') {
        props.history.push('/');
      } else if (res.status === 'LOGOUT') {
        if (logout) {
          await logout().then(async (res) => {
            if (res.status === 'SUCCESS') {
              props.history.push('/login');
            }
          });
        }
      }
    });
    setActionLoading(false);
  };

  const handleOpen = (e: React.MouseEvent<HTMLButtonElement>, id: string) => {
    setDialog(true);
    setActiveId(id);
  };

  const handleCancel = () => {
    setDialog(false);
    setActiveId('');
  };

  return (
    <Box>
      <Box mb={4}>
        <Grid container justify="space-between" alignItems="center">
          <Typography variant="h6" component="h1">
            {Persian.manageUsers}
          </Typography>
          <Box>
            <Box component="span" mr={2}>
              <Link to="/admin/users/requests">
                <Fab size="small" color="primary" aria-label="requests">
                  <FiGitPullRequest className="font-21" />
                </Fab>
              </Link>
            </Box>
            <Link to="/admin/users/add">
              <Fab size="small" color="primary" aria-label="add">
                <IoMdAdd className="font-21" />
              </Fab>
            </Link>
          </Box>
        </Grid>
        <Box my={2}>
          <Divider className={classes.divider} />
        </Box>
      </Box>
      <Box pt={12} className="users-table">
        {loading && (
          <Box textAlign="center">
            <CircularProgress />
          </Box>
        )}
        {!loading && users !== undefined && users.length < 1 && (
          <Box textAlign="center">{Persian.notFound}</Box>
        )}
        {!loading && users !== undefined && users !== undefined && (
          <MaterialTable
            icons={tableIcons}
            columns={[
              { title: 'نام', field: 'firstName' },
              { title: 'نام خانوادگی', field: 'lastName' },
              { title: 'شماره همراه', field: 'mobile', type: 'numeric' },
              { title: 'پست الکترونیک', field: 'email' },
              {
                title: 'وضعیت',
                field: 'status',
                render: (rowData) => (
                  <Box component="span" mr="auto" color={Colors.white}>
                    <FormControlLabel
                      control={
                        <Switch
                          id={rowData.id}
                          onChange={handleStatus}
                          defaultChecked={rowData.status}
                          color="primary"
                        />
                      }
                      label=""
                    />
                  </Box>
                ),
              },
              {
                title: '',
                field: '',
                render: (rowData) => (
                  <React.Fragment>
                    {/* <Box component="span" color={Colors.white}>
                      <Tooltip title={Persian.delete}>
                        <Fab
                          onClick={(e) => handleOpen(e, rowData.id)}
                          name={rowData.id}
                          size="small"
                          color="secondary"
                          aria-label="delete"
                        >
                          <IoMdTrash className="font-21" />
                        </Fab>
                      </Tooltip>
                    </Box>
                    <Box component="span" color={Colors.white}>
                      <Tooltip title={Persian.delete}>
                        <Fab
                          onClick={(e) => handleOpen(e, rowData.id)}
                          name={rowData.id}
                          size="small"
                          color="secondary"
                          aria-label="delete"
                        >
                          <IoMdTrash className="font-21" />
                        </Fab>
                      </Tooltip>
                    </Box>
                    <Box component="span" color={Colors.white}>
                      <Tooltip title={Persian.delete}>
                        <Fab
                          onClick={(e) => handleOpen(e, rowData.id)}
                          name={rowData.id}
                          size="small"
                          color="secondary"
                          aria-label="delete"
                        >
                          <IoMdTrash className="font-21" />
                        </Fab>
                      </Tooltip>
                    </Box> */}
                  </React.Fragment>
                ),
              },
            ]}
            localization={{
              body: {
                emptyDataSourceMessage: 'موردی یافت نشد!',
              },
              pagination: {
                labelDisplayedRows: '{from}-{to} از {count}',
                labelRowsSelect: 'عدد',
              },
              toolbar: {
                searchPlaceholder: 'جست و جو',
                searchTooltip: 'جست و جو',
              },
            }}
            title={Persian.manageUsers}
            data={users}
          />
        )}
      </Box>
      <Dialog maxWidth="xs" open={dialog}>
        <DialogTitle id="confirmation-dialog-title">
          {Persian.deleteQuestion}
        </DialogTitle>
        <DialogActions>
          <Box textAlign="center" width="100%">
            <Box component="span" mx={2}>
              <Button
                onClick={handleCancel}
                variant="contained"
                color="primary"
              >
                {Persian.no}
              </Button>
            </Box>
            <Box component="span" mx={2}>
              <Button
                onClick={handleDelete}
                variant="contained"
                color="secondary"
              >
                {Persian.yes}
              </Button>
            </Box>
          </Box>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Users;
