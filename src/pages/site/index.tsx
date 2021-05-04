import React from 'react';
import {
  Box,
  Grid,
  Typography,
  Divider,
  Card,
  CardMedia,
  CardContent,
  CircularProgress,
  Button,
  CardActions,
} from '@material-ui/core';
import { useAuth } from '../../lib/contexts/auth';
import { makeStyles, Theme } from '@material-ui/core/styles';
import Persian from '../../lib/constants/persian';
import { Swiper, SwiperSlide } from 'swiper/react';
import { getCompetitions } from '../../lib/apis/competition';
import { CompetitionInterface } from '../../lib/constants/interfaces';
import { Link, RouteComponentProps } from 'react-router-dom';
import NumberFormat from 'react-number-format';
import { Colors } from '../../theme';
import Global from './../../global';
import { RiTimerFlashLine } from 'react-icons/ri';
import { registerCompetition } from './../../lib/apis/competition';
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

const Home: React.FC<RouteComponentProps> = (props) => {
  const [competitions, setCompetitions] = React.useState<
    [CompetitionInterface] | undefined
  >(undefined);
  const [loading, setLoading] = React.useState<boolean>(true);
  const { user, logout, setUser } = useAuth();
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

  const handleRegister = async (item: CompetitionInterface) => {
    setLoading(true);
    await registerCompetition(item.id).then(async (res) => {
      if (res.status === 'SUCCESS') {
        setUser(res.user);
        props.history.push('/competitions/' + item.url);
      } else if (res.status === 'LOGOUT') {
        if (logout) {
          await logout().then(async (res) => {
            if (res.status === 'SUCCESS') {
              props.history.push('/login');
            }
          });
        }
      } else {
      }
    });
    setLoading(false);
  };

  return (
    <Box>
      <Box mb={4}>
        <Box
          boxShadow={8}
          bgcolor={Colors.backgroundOpacity}
          p={4}
          mb={3}
          textAlign="center"
          borderRadius={16}
        >
          <Typography component="h2">{Persian.myCompetitions}</Typography>
        </Box>
        {loading && (
          <Box textAlign="center">
            <CircularProgress />
          </Box>
        )}
        {!loading && user?.competitions && user.competitions.length < 1 && (
          <Box textAlign="center">{Persian.notFound}</Box>
        )}
        {!loading && user?.competitions && (
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
            {user?.competitions.map(
              (item, index) =>
                !item.isFinish && (
                  <SwiperSlide key={index}>
                    <Card elevation={8} className={classes.card}>
                      <Box boxShadow={5}>
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
                        <Divider variant="middle" className={classes.divider} />
                      </Box>
                      <CardActions>
                        <Grid container justify="space-between">
                          {user.pay.map((item2, index, array, data = item) =>
                            data.url === item2.competition.url ? (
                              item2.status ? (
                                <Box
                                  key={index}
                                  component="span"
                                  color={Colors.success}
                                >
                                  {Persian.paid}
                                </Box>
                              ) : (
                                <Box
                                  key={index}
                                  component="span"
                                  color={Colors.secondary}
                                >
                                  {Persian.notPaid}
                                </Box>
                              )
                            ) : null
                          )}
                          <Link to={'/competitions/' + item.url}>
                            <Button
                              size="small"
                              variant="contained"
                              color="primary"
                            >
                              {Persian.predict}
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
      <Box mb={4}>
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
              competitions.map((item, index) => {
                const buy = user?.competitions.find(
                  (item2) => item2.url === item.url
                );
                if (!item.isFinish && !buy) {
                  return (
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
                          <Grid container justify="space-between">
                            <Box component="span" color={Colors.white}>
                              <NumberFormat
                                className="font-weight-bold text-danger font-14"
                                value={item.price}
                                displayType={'text'}
                                thousandSeparator={true}
                                suffix={` ${Persian.toman}`}
                              />
                            </Box>
                            <Button
                              size="small"
                              variant="contained"
                              color="secondary"
                              onClick={() => handleRegister(item)}
                            >
                              {Persian.register}
                            </Button>
                          </Grid>
                        </CardActions>
                      </Card>
                    </SwiperSlide>
                  );
                } else {
                  return null;
                }
              })}
          </Swiper>
        )}
      </Box>
      <Box mb={4}>
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
    </Box>
  );
};

export default Home;
