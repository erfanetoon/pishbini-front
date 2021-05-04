import React from 'react';
import { CompetitionInterface } from '../../../../lib/constants/interfaces';
import { makeStyles, Theme } from '@material-ui/core/styles';
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  CircularProgress,
  Typography,
  Grid,
  Divider,
  CardActions,
  Button,
  Fab,
  Tooltip,
  Dialog,
  DialogTitle,
  DialogActions,
} from '@material-ui/core';
import { Colors } from './../../../../theme';
import {
  getCompetitions,
  deleteCompetition,
} from './../../../../lib/apis/competition';
import { useAuth } from './../../../../lib/contexts/auth';
import { RouteComponentProps, Link } from 'react-router-dom';
import Persian from './../../../../lib/constants/persian';
import { Swiper, SwiperSlide } from 'swiper/react';
import Global from './../../../../global';
import { RiTimerFlashLine, RiEdit2Fill } from 'react-icons/ri';
import { IoMdAdd, IoMdTrash } from 'react-icons/io';
import { BiCalendarWeek } from 'react-icons/bi';
import { GiSoccerField } from 'react-icons/gi';
import SwiperCore, { Navigation } from 'swiper';

SwiperCore.use([Navigation]);

const useStyles = makeStyles((theme: Theme) => ({
  image: {
    width: '100%',
    height: 150,
  },
  avatar: {
    borderRadius: '50%',
  },
  card: {
    backgroundColor: Colors.backgroundOpacity,
  },
  divider: {
    backgroundColor: Colors.dividerColor,
  },
}));

const Competitions: React.FC<RouteComponentProps> = (props) => {
  const [competitions, setCompetitions] = React.useState<
    [CompetitionInterface] | undefined
  >(undefined);
  const [loading, setLoading] = React.useState<boolean>(true);
  const [actionLoading, setActionLoading] = React.useState<boolean>(false);
  const [activeId, setActiveId] = React.useState<string>('');
  const [dialog, setDialog] = React.useState<boolean>(false);
  const { logout } = useAuth();
  const classes = useStyles();

  React.useEffect(() => {
    handleCompetitions();
  }, []);

  const handleCompetitions = async () => {
    await getCompetitions().then(async (res) => {
      if (res.status === 'SUCCESS' && res.competitions) {
        setCompetitions(res.competitions);
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
    await deleteCompetition(activeId).then(async (res) => {
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
            {Persian.manageCompetitions}
          </Typography>
          <Box>
            <Link to="/admin/competitions/add">
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
      <Box mb={8}>
        <Box
          boxShadow={8}
          bgcolor={Colors.backgroundOpacity}
          p={4}
          mb={3}
          textAlign="center"
          borderRadius={16}
        >
          <Typography component="h2">{Persian.activeCompetitions}</Typography>
        </Box>
        {loading && (
          <Box textAlign="center">
            <CircularProgress />
          </Box>
        )}
        {!loading && competitions !== undefined && competitions.length < 1 && (
          <Box textAlign="center">{Persian.notFound}</Box>
        )}
        {!loading && competitions !== undefined && (
          <Swiper
            navigation
            spaceBetween={20}
            breakpoints={{
              0: {
                slidesPerView: 1,
              },
              480: {
                slidesPerView: 2,
              },
              991: {
                slidesPerView: 3,
              },
              1200: {
                slidesPerView: 4,
              },
            }}
          >
            {competitions !== undefined &&
              competitions.map(
                (item, index) =>
                  !item.isFinish && (
                    <SwiperSlide key={index}>
                      <Card elevation={8} className={classes.card}>
                        <Box boxShadow={4}>
                          <CardMedia
                            className={classes.image}
                            image={Global.API_BASE_URL + item.image}
                            title={item.title}
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
                              {item.title}
                            </Typography>
                          </Box>
                          <Grid container justify="space-between">
                            <Box textAlign="center">
                              <RiTimerFlashLine
                                color={Colors.warning}
                                className="font-19"
                              />
                              <Box className="font-12" color={Colors.warning}>
                                {item.activePeriod
                                  ? item.activePeriod.name
                                  : Persian.dash}
                              </Box>
                            </Box>
                            <Box></Box>
                          </Grid>
                        </CardContent>
                        <Box my={2}>
                          <Divider
                            variant="middle"
                            className={classes.divider}
                          />
                        </Box>
                        <CardActions>
                          <Grid container>
                            <Box component="span" mr={2} color={Colors.white}>
                              <Link
                                to={`/admin/competitions/${item.url}/matches`}
                              >
                                <Tooltip title={Persian.matches}>
                                  <Fab
                                    size="small"
                                    color="primary"
                                    aria-label="add"
                                  >
                                    <GiSoccerField className="font-21" />
                                  </Fab>
                                </Tooltip>
                              </Link>
                            </Box>
                            <Box
                              component="span"
                              mr="auto"
                              color={Colors.white}
                            >
                              <Link
                                to={`/admin/competitions/${item.url}/periods`}
                              >
                                <Tooltip title={Persian.periods}>
                                  <Fab
                                    size="small"
                                    color="primary"
                                    aria-label="add"
                                  >
                                    <BiCalendarWeek className="font-21" />
                                  </Fab>
                                </Tooltip>
                              </Link>
                            </Box>
                            <Box component="span" mr={2} color={Colors.white}>
                              <Link to={`/admin/competitions/${item.url}/edit`}>
                                <Tooltip title={Persian.edit}>
                                  <Fab size="small" aria-label="edit">
                                    <RiEdit2Fill className="font-21" />
                                  </Fab>
                                </Tooltip>
                              </Link>
                            </Box>
                            <Box component="span" color={Colors.white}>
                              <Tooltip title={Persian.delete}>
                                <Fab
                                  onClick={(e) => handleOpen(e, item.id)}
                                  size="small"
                                  color="secondary"
                                  aria-label="delete"
                                >
                                  <IoMdTrash className="font-21" />
                                </Fab>
                              </Tooltip>
                            </Box>
                          </Grid>
                        </CardActions>
                        <Box my={3} px={6}>
                          <Link to={`/admin/competitions/${item.url}/finish`}>
                            <Button
                              fullWidth
                              variant="contained"
                              color="primary"
                            >
                              {Persian.finishCompetition}
                            </Button>
                          </Link>
                        </Box>
                      </Card>
                    </SwiperSlide>
                  )
              )}
          </Swiper>
        )}
      </Box>
      <Box>
        <Box
          boxShadow={8}
          bgcolor={Colors.backgroundOpacity}
          p={4}
          mb={3}
          textAlign="center"
          borderRadius={16}
        >
          <Typography component="h2">{Persian.archivedCompetitions}</Typography>
        </Box>
        {loading && (
          <Box textAlign="center">
            <CircularProgress />
          </Box>
        )}
        {!loading && competitions !== undefined && competitions.length < 1 && (
          <Box textAlign="center">{Persian.notFound}</Box>
        )}
        {!loading && competitions !== undefined && (
          <Swiper
            navigation
            spaceBetween={20}
            breakpoints={{
              0: {
                slidesPerView: 1,
              },
              480: {
                slidesPerView: 2,
              },
              991: {
                slidesPerView: 3,
              },
              1200: {
                slidesPerView: 4,
              },
            }}
          >
            {competitions !== undefined &&
              competitions.map(
                (item, index) =>
                  item.isFinish && (
                    <SwiperSlide key={index}>
                      <Card elevation={8} className={classes.card}>
                        <Box boxShadow={4}>
                          <CardMedia
                            className={classes.image}
                            image={Global.API_BASE_URL + item.image}
                            title={item.title}
                          />
                        </Box>
                        <CardContent>
                          <Box textAlign="center">
                            <Typography
                              gutterBottom
                              variant="h6"
                              component="h2"
                              color="textSecondary"
                            >
                              {item.title}
                            </Typography>
                          </Box>
                          <Grid container justify="space-between">
                            {item.winner && (
                              <Box textAlign="center">
                                <img
                                  src={
                                    item.winner.avatar
                                      ? Global.API_BASE_URL + item.winner.avatar
                                      : '/img/avatar.png'
                                  }
                                  className={classes.avatar}
                                  height={42}
                                  width={42}
                                  alt={
                                    item.winner.firstName +
                                    ' ' +
                                    item.winner.lastName
                                  }
                                />
                                <Box className="font-12" color={Colors.white}>
                                  {item.winner.firstName +
                                    ' ' +
                                    item.winner.lastName}
                                </Box>
                              </Box>
                            )}
                            {item.champion && (
                              <Box textAlign="center">
                                <img
                                  src={Global.API_BASE_URL + item.champion.logo}
                                  height={42}
                                  width={42}
                                  alt={item.champion.name}
                                />
                                <Box className="font-12" color={Colors.white}>
                                  {item.champion.name}
                                </Box>
                              </Box>
                            )}
                          </Grid>
                        </CardContent>
                        <Box my={2}>
                          <Divider
                            variant="middle"
                            className={classes.divider}
                          />
                        </Box>
                        <CardActions>
                          <Grid container justify="space-between">
                            <Box component="span" color={Colors.white}></Box>
                            <Link to={'/competitions/' + item.url}>
                              <Button
                                size="small"
                                variant="contained"
                                color="inherit"
                              >
                                {Persian.details}
                              </Button>
                            </Link>
                          </Grid>
                        </CardActions>
                      </Card>
                    </SwiperSlide>
                  )
              )}
          </Swiper>
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

export default Competitions;
