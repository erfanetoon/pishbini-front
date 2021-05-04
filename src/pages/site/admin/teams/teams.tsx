import React from 'react';
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
import { TeamInterface } from './../../../../lib/constants/interfaces';
import { useAuth } from './../../../../lib/contexts/auth';
import { getTeams, statusTeam, deleteTeam } from './../../../../lib/apis/teams';
import Global from './../../../../global';
import { RiEdit2Fill } from 'react-icons/ri';

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
}));

const Teams: React.FC<RouteComponentProps> = (props) => {
  const [teams, setTeams] = React.useState<[TeamInterface] | undefined>(
    undefined
  );
  const [loading, setLoading] = React.useState<boolean>(true);
  const [actionLoading, setActionLoading] = React.useState<boolean>(false);
  const [activeId, setActiveId] = React.useState<string>('');
  const [dialog, setDialog] = React.useState<boolean>(false);
  const { logout } = useAuth();
  const classes = useStyles();

  React.useEffect(() => {
    handleTeams();
  }, []);

  const handleTeams = async () => {
    await getTeams().then(async (res) => {
      if (res.status === 'SUCCESS' && res.teams) {
        setTeams(res.teams);
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
    await statusTeam(e.target.id, e.target.checked).then(async (res) => {
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
    await deleteTeam(activeId).then(async (res) => {
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
            {Persian.manageTeams}
          </Typography>
          <Box>
            <Link to="/admin/teams/add">
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
      <Box pt={12}>
        {loading && (
          <Box textAlign="center">
            <CircularProgress />
          </Box>
        )}
        {!loading && teams !== undefined && teams.length < 1 && (
          <Box textAlign="center">{Persian.notFound}</Box>
        )}
        {!loading && teams !== undefined && teams !== undefined && (
          <Grid container spacing={4}>
            {teams.map((item, index) => (
              <Grid item key={index} xs={12} sm={6} md={4} lg={3}>
                <Card elevation={8} className={classes.card}>
                  <Box
                    position="relative"
                    bgcolor={Colors.backgroundOpacity}
                    borderRadius="1099px"
                    top={-20}
                    height={150}
                    width={150}
                    pt={2}
                    m="auto"
                  >
                    <CardMedia
                      className={classes.image}
                      image={Global.API_BASE_URL + item.logo}
                      title={item.name}
                    />
                  </Box>
                  <CardContent>
                    <Box textAlign="center" mb={3}>
                      <Typography
                        gutterBottom
                        variant="h6"
                        component="h2"
                        color="textSecondary"
                      >
                        {item.name}
                      </Typography>
                    </Box>
                  </CardContent>
                  <Box my={2}>
                    <Divider variant="middle" className={classes.divider} />
                  </Box>
                  <CardActions>
                    <Grid container>
                      {actionLoading && (
                        <Box mx="auto">
                          <CircularProgress />
                        </Box>
                      )}
                      {!actionLoading && (
                        <React.Fragment>
                          <Box component="span" mr="auto" color={Colors.white}>
                            <FormControlLabel
                              control={
                                <Switch
                                  id={item.id}
                                  onChange={handleStatus}
                                  defaultChecked={item.status}
                                  color="primary"
                                />
                              }
                              label="وضعیت"
                            />
                          </Box>
                          <Box component="span" color={Colors.white}>
                            <Tooltip title={Persian.delete}>
                              <Fab
                                onClick={(e) => handleOpen(e, item.id)}
                                name={item.id}
                                size="small"
                                color="secondary"
                                aria-label="delete"
                              >
                                <IoMdTrash className="font-21" />
                              </Fab>
                            </Tooltip>
                          </Box>
                        </React.Fragment>
                      )}
                    </Grid>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
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

export default Teams;
