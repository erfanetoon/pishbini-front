import React from 'react';
import { RouteComponentProps, Link } from 'react-router-dom';
import { getPeriods } from './../../../../../../lib/apis/competition';
import { useAuth } from './../../../../../../lib/contexts/auth';
import { PeriodInterface } from './../../../../../../lib/constants/interfaces';
import {
  Box,
  Grid,
  Typography,
  Divider,
  Fab,
  CircularProgress,
  Card,
  Tooltip,
  Dialog,
  DialogTitle,
  DialogActions,
  Button,
} from '@material-ui/core';
import Persian from './../../../../../../lib/constants/persian';
import { makeStyles, Theme } from '@material-ui/core/styles';
import { Colors } from './../../../../../../theme';
import { IoMdAdd, IoMdTrash } from 'react-icons/io';
import { RiEdit2Fill } from 'react-icons/ri';
import { RiTimerFlashLine } from 'react-icons/ri';
import { deletePeriod } from '../../../../../../lib/apis/periods';
import { activePeriod } from './../../../../../../lib/apis/periods';

interface props {
  url: string;
}

const useStyles = makeStyles((theme: Theme) => ({
  divider: {
    backgroundColor: Colors.dividerColor,
  },
}));

const Periods: React.FC<RouteComponentProps<props>> = (props) => {
  const [loading, setLoading] = React.useState<boolean>(true);
  const [periods, setPeriods] = React.useState<PeriodInterface[] | undefined>(
    undefined
  );
  const [dialog, setDialog] = React.useState<boolean>(false);
  const [activeId, setActiveId] = React.useState<string>('');
  const [type, setType] = React.useState<string>('');
  const [actionLoading, setActionLoading] = React.useState<boolean>(false);
  const { logout } = useAuth();
  const classes = useStyles();

  React.useEffect(() => {
    handlePeriods();
  }, []);

  const handlePeriods = async () => {
    await getPeriods(props.match.params.url).then(async (res) => {
      if (res.status === 'SUCCESS' && res.periods) {
        setPeriods(res.periods);
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

  const handleDelete = async () => {
    setActionLoading(true);
    await deletePeriod(activeId, props.match.params.url).then(async (res) => {
      if (res.status === 'SUCCESS') {
        props.history.push('/admin/competitions');
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

  const handleActive = async () => {
    setActionLoading(true);
    await activePeriod(activeId, props.match.params.url).then(async (res) => {
      if (res.status === 'SUCCESS') {
        props.history.push('/admin/competitions');
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

  const handleOpen = (
    e: React.MouseEvent<HTMLButtonElement>,
    id: string,
    type: string
  ) => {
    setActiveId(id);
    setType(type);
    setDialog(true);
  };

  const handleCancel = () => {
    setDialog(false);
    setActiveId('');
    setType('');
  };

  return (
    <Box>
      <Box mb={4}>
        <Grid container justify="space-between" alignItems="center">
          <Typography variant="h6" component="h1">
            {Persian.managePeriods}
          </Typography>
          <Box>
            <Link
              to={`/admin/competitions/${props.match.params.url}/periods/add`}
            >
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
      <Box>
        {loading && (
          <Box textAlign="center">
            <CircularProgress />
          </Box>
        )}
        {!loading && periods !== undefined && periods.length < 1 && (
          <Box textAlign="center">{Persian.notFound}</Box>
        )}
        {!loading && periods !== undefined && (
          <Grid container spacing={4}>
            {periods.map((item) => (
              <Grid key={item.id} item xs={12} sm={6} lg={4}>
                <Box
                  bgcolor={Colors.backgroundOpacity}
                  p={4}
                  boxShadow={8}
                  borderRadius={16}
                >
                  <Grid container alignItems="center">
                    <Typography component="h1">{item.name}</Typography>
                    <Box ml="auto" mr={2}>
                      <Tooltip title={Persian.setActive}>
                        <Fab
                          size="small"
                          color="primary"
                          aria-label="active"
                          onClick={(e) => handleOpen(e, item.id, 'active')}
                        >
                          <RiTimerFlashLine className="font-21" />
                        </Fab>
                      </Tooltip>
                    </Box>
                    <Box mr={2}>
                      <Link
                        to={`/admin/competitions/${props.match.params.url}/periods/${item.id}/edit`}
                      >
                        <Tooltip title={Persian.edit}>
                          <Fab size="small" aria-label="edit">
                            <RiEdit2Fill className="font-21" />
                          </Fab>
                        </Tooltip>
                      </Link>
                    </Box>
                    <Box>
                      <Tooltip title={Persian.delete}>
                        <Fab
                          onClick={(e) => handleOpen(e, item.id, 'delete')}
                          size="small"
                          color="secondary"
                          aria-label="delete"
                        >
                          <IoMdTrash className="font-21" />
                        </Fab>
                      </Tooltip>
                    </Box>
                  </Grid>
                </Box>
              </Grid>
            ))}
          </Grid>
        )}
      </Box>
      <Dialog maxWidth="xs" open={dialog}>
        {type === 'delete' && (
          <React.Fragment>
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
          </React.Fragment>
        )}
        {type === 'active' && (
          <React.Fragment>
            <DialogTitle id="confirmation-dialog-title">
              {Persian.activeQuestion}
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
                    onClick={handleActive}
                    variant="contained"
                    color="secondary"
                  >
                    {Persian.yes}
                  </Button>
                </Box>
              </Box>
            </DialogActions>
          </React.Fragment>
        )}
      </Dialog>
    </Box>
  );
};

export default Periods;
