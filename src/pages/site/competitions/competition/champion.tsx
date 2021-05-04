import React from 'react';
import Intro from '../../../../components/competitions/intro';
import { RouteComponentProps } from 'react-router';
import {
  Grid,
  Box,
  Typography,
  Divider,
  Button,
  CircularProgress,
  Dialog,
  DialogTitle,
  DialogContent,
} from '@material-ui/core';
import { Colors } from './../../../../theme';
import Persian from './../../../../lib/constants/persian';
import { makeStyles, Theme } from '@material-ui/core/styles';
import {
  PredictionsInterface,
  TeamInterface,
} from '../../../../lib/constants/interfaces';
import {
  getChampion,
  getPredictions,
  sendChampion,
} from './../../../../lib/apis/competition';
import { useAuth } from './../../../../lib/contexts/auth';
import Global from './../../../../global';
import { toast } from 'react-toastify';

interface props {
  url: string;
}

const useStyles = makeStyles((theme: Theme) => ({
  image: {
    width: '100%',
  },
  imageRadius: {
    borderRadius: '100px',
  },
  divider: {
    backgroundColor: Colors.dividerColor,
  },
}));

const Champion: React.FC<RouteComponentProps<props>> = (props) => {
  const [teams, setTeams] = React.useState<[TeamInterface] | undefined>(
    undefined
  );
  const [loading, setLoading] = React.useState<boolean>(true);
  const [selectLoading, setSelectLoading] = React.useState<boolean>(false);
  const [isFinished, setIsFinished] = React.useState<boolean>(true);
  const [myPrediction, setMyPrediction] = React.useState<
    TeamInterface | undefined
  >(undefined);
  const [champion, setChampion] = React.useState<TeamInterface | undefined>(
    undefined
  );
  const [point, setPoint] = React.useState<number | undefined>(undefined);
  const [otherPredictions, setOtherPredictions] = React.useState<
    [PredictionsInterface] | undefined
  >(undefined);
  const [open, setOpen] = React.useState<boolean>(false);
  const { logout, user } = useAuth();
  const classes = useStyles();

  React.useEffect(() => {
    getChampionPredict();
  }, []);

  const getChampionPredict = async () => {
    await getChampion(props.match.params.url).then(async (res) => {
      if (res.status === 'SUCCESS') {
        if (res.champion && res.competition) {
          if (res.champion.myPrediction) {
            setMyPrediction(res.champion.myPrediction);
          }
          if (
            Number(res.competition.championPredictionDateTime) >
            new Date().getTime()
          ) {
            setIsFinished(false);
          }
          if (res.competition.champion) {
            setChampion(res.competition.champion);
          }
          if (res.champion.point) {
            setPoint(res.champion.point);
          }
          setTeams(res.competition.teams);
        }
        setLoading(false);
      } else if (res.status === 'LOGOUT') {
        if (logout) {
          await logout().then(async (res) => {
            if (res.status === 'SUCCESS') {
              props.history.push('/login');
            }
          });
        }
      } else {
        props.history.push('/');
      }
    });
  };

  const handleClickOpen = async () => {
    await getPredictions('CHAMPION', props.match.params.url).then(
      async (res) => {
        if (res.status === 'SUCCESS') {
          if (res.predictions && user) {
            console.log(res);
            setOtherPredictions(res.predictions);
          }
        } else if (res.status === 'LOGOUT') {
          if (logout) {
            await logout().then(async (res) => {
              if (res.status === 'SUCCESS') {
                await props.history.push('/login');
              }
            });
          }
        }
      }
    );
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChampionChange = async (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    let data = teams?.find((item) => item.id === e.target.value);
    setMyPrediction(data);
  };

  const handleSubmitChampion = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSelectLoading(true);
    if (myPrediction) {
      await sendChampion(props.match.params.url, myPrediction.id).then(
        async (res) => {
          if (res.status === 'SUCCESS') {
            setLoading(false);
          } else if (res.status === 'LOGOUT') {
            if (logout) {
              await logout().then(async (res) => {
                if (res.status === 'SUCCESS') {
                  await props.history.push('/login');
                }
              });
            }
          }
        }
      );
    } else {
      toast.warning(Persian.pleaseEnterYourPredictCurrectly, {
        position: toast.POSITION.BOTTOM_CENTER,
      });
    }
    setSelectLoading(false);
  };

  return (
    <section>
      <Intro url={props.match.params.url} />
      {loading && (
        <Box textAlign="center">
          <CircularProgress />
        </Box>
      )}
      {!loading && (
        <Grid container spacing={3}>
          <Grid item xs={12} sm={1} md={2}></Grid>
          <Grid item xs={12} sm={10} md={8}>
            <Box
              mb={6}
              p={3}
              boxShadow={8}
              textAlign="center"
              borderRadius={16}
              bgcolor={Colors.backgroundOpacity}
            >
              <Typography component="div">
                {Persian.predict + ' ' + Persian.champion}
              </Typography>
              <Box my={4}>
                <Divider className={classes.divider} />
              </Box>
              <Grid container spacing={3} alignItems="center">
                <Grid item xs={12} sm={6}>
                  <Box textAlign="center" mb={3}>
                    <Box mb={3}>
                      <Typography component="div">
                        {Persian.myPredict}
                      </Typography>
                    </Box>
                    {myPrediction && (
                      <React.Fragment>
                        <img
                          width={86}
                          src={Global.API_BASE_URL + myPrediction.logo}
                          alt={myPrediction.name}
                        />
                        <Typography>{myPrediction.name}</Typography>
                      </React.Fragment>
                    )}
                    {!myPrediction && (
                      <Typography>{Persian.questionMark}</Typography>
                    )}
                  </Box>
                </Grid>
                <Grid item xs={12} sm={6}>
                  {isFinished && (
                    <Box textAlign="center" mb={3}>
                      <Box mb={3}>
                        <Typography component="div">
                          {Persian.winner}
                        </Typography>
                      </Box>
                      {champion && (
                        <React.Fragment>
                          <img
                            width={86}
                            src={Global.API_BASE_URL + champion.logo}
                            alt={champion.name}
                          />
                          <Typography>{champion.name}</Typography>
                        </React.Fragment>
                      )}
                      {!champion && (
                        <Typography>{Persian.questionMark}</Typography>
                      )}
                    </Box>
                  )}
                  {!isFinished && (
                    <form
                      onSubmit={(e: React.FormEvent<HTMLFormElement>) =>
                        handleSubmitChampion(e)
                      }
                    >
                      <Box
                        px={2}
                        py={1}
                        mb={3}
                        width="100%"
                        component="select"
                        bgcolor={Colors.primary}
                        boxShadow={4}
                        border="none"
                        borderRadius={16}
                        color={Colors.white}
                        className="font-11"
                        defaultValue={myPrediction ? myPrediction.id : ''}
                        onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                          handleChampionChange(e)
                        }
                      >
                        <option value="" disabled>
                          انتخاب گزینه
                        </option>
                        {teams &&
                          teams.map((item) => (
                            <option key={item.id} value={item.id}>
                              {item.name}
                            </option>
                          ))}
                      </Box>
                      <Button
                        type="submit"
                        variant="contained"
                        color="secondary"
                        className="font-12"
                        disabled={selectLoading}
                      >
                        {selectLoading ? (
                          <CircularProgress size={19} />
                        ) : (
                          Persian.submit
                        )}
                      </Button>
                    </form>
                  )}
                </Grid>
              </Grid>
              <Box mt={3} textAlign="center">
                {point && (
                  <Box
                    component="span"
                    bgcolor={Colors.white}
                    borderRadius={16}
                    boxShadow={4}
                    px={2}
                    py={1}
                    mr={2}
                    color={Colors.black}
                  >
                    {point + ' ' + Persian.point}
                  </Box>
                )}
                {isFinished && (
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleClickOpen}
                  >
                    {Persian.otherPeoplePredictions}
                  </Button>
                )}
              </Box>
            </Box>
          </Grid>
        </Grid>
      )}
      <Dialog
        fullWidth
        maxWidth="md"
        open={open}
        onClose={handleClose}
        aria-labelledby="max-width-dialog-title"
      >
        <DialogTitle id="max-width-dialog-title">
          {Persian.otherPeoplePredictions}
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={3}>
            {otherPredictions &&
              otherPredictions.map((item, index) => {
                if (item.user.id === user?.id) {
                  return null;
                } else {
                  return (
                    <Grid key={index} item xs={12} sm={6} md={4} lg={3}>
                      <Box
                        mt={2}
                        bgcolor={Colors.backgroundOpacity}
                        borderRadius={16}
                        boxShadow={8}
                        p={3}
                      >
                        <Grid
                          container
                          direction="row"
                          justify="space-around"
                          alignItems="center"
                        >
                          <Box textAlign="center">
                            <img
                              className={classes.imageRadius}
                              src={
                                item.user.avatar
                                  ? Global.API_BASE_URL + item.user.avatar
                                  : '/img/avatar.png'
                              }
                              width={64}
                              alt={
                                item.user.firstName + ' ' + item.user.lastName
                              }
                            />
                            <Typography variant="h6" className="font-13">
                              {item.user.firstName + ' ' + item.user.lastName}
                            </Typography>
                          </Box>
                          <Box textAlign="center">
                            {item.myPredictionChampion ? (
                              <img
                                width={32}
                                src={
                                  Global.API_BASE_URL +
                                  item.myPredictionChampion?.logo
                                }
                                alt={item.myPredictionChampion?.name}
                              />
                            ) : (
                              <Box
                                bgcolor={Colors.backgroundOpacity}
                                borderRadius={16}
                                p={2}
                                mb={2}
                              >
                                {Persian.questionMark}
                              </Box>
                            )}
                            <Box
                              bgcolor={Colors.backgroundOpacity}
                              borderRadius={16}
                              p={2}
                              mb={2}
                            >
                              <Typography
                                component="span"
                                variant="h6"
                                className="font-13"
                              >
                                {item.point}
                              </Typography>
                              <Typography component="span" className="font-11">
                                {' ' + Persian.point}
                              </Typography>
                            </Box>
                          </Box>
                        </Grid>
                      </Box>
                    </Grid>
                  );
                }
              })}
          </Grid>
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default Champion;
