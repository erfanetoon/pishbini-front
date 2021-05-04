import {
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogContent,
  DialogTitle,
  Divider,
  Grid,
  Typography,
} from '@material-ui/core';
import React from 'react';
import {
  MatchInterface,
  PredictionsInterface,
} from './../../lib/constants/interfaces';
import { Colors } from './../../theme';
import Global from './../../global';
import { makeStyles, Theme } from '@material-ui/core/styles';
import Moment from '../../components/moment/moment';
import Persian from './../../lib/constants/persian';
import { sendPredict, getPredictions } from '../../lib/apis/competition';
import { toast } from 'react-toastify';
import { useAuth } from './../../lib/contexts/auth';
import { History } from 'history';

interface props {
  history: History;
  url: string;
  data: [MatchInterface];
  predicts: [submitScore];
}

interface submitScore {
  match: string;
  homeGoal: number | null;
  awayGoal: number | null;
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

const Match: React.FC<props> = (props) => {
  const [predicts, setPredicts] = React.useState<[submitScore]>(props.predicts);
  const [activeId, setActiveId] = React.useState<string>('');
  const [loading, setLoading] = React.useState<boolean>(false);
  const [otherPredictions, setOtherPredictions] = React.useState<
    [PredictionsInterface] | undefined
  >(undefined);
  const [open, setOpen] = React.useState<boolean>(false);
  const { logout, user } = useAuth();
  const classes = useStyles();
  props.data.sort(function (a: any, b: any) {
    return Number(a.matchDateTime) - Number(b.matchDateTime);
  });

  const handleClickOpen = async (item: MatchInterface) => {
    await getPredictions('MATCH', props.url, item.id).then(async (res) => {
      if (res.status === 'SUCCESS') {
        if (res.predictions && user) {
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
    });
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleScoreChange = async (
    e: React.ChangeEvent<HTMLSelectElement>,
    item: MatchInterface,
    type: 'HOME_GOAL' | 'AWAY_GOAL'
  ) => {
    var oldPredict: [submitScore] = predicts;
    var data: submitScore | undefined = predicts?.find(
      (i) => i.match === item.id
    );

    if (data) {
      data = {
        match: data.match,
        homeGoal: type === 'HOME_GOAL' ? Number(e.target.value) : data.homeGoal,
        awayGoal: type === 'AWAY_GOAL' ? Number(e.target.value) : data.awayGoal,
      };
      let index = oldPredict.findIndex((i) => i.match === item.id);
      oldPredict[index] = data;
      setPredicts(oldPredict);
    } else {
      oldPredict.push({
        match: item.id,
        homeGoal: type === 'HOME_GOAL' ? Number(e.target.value) : null,
        awayGoal: type === 'AWAY_GOAL' ? Number(e.target.value) : null,
      });
      setPredicts(oldPredict);
    }
  };

  const handleSubmitScore = async (
    e: React.FormEvent<HTMLFormElement>,
    item: MatchInterface
  ) => {
    e.preventDefault();
    setActiveId(item.id);
    setLoading(true);
    let data = predicts.find((i) => i.match === item.id);
    if (
      data &&
      typeof data.homeGoal === 'number' &&
      typeof data.awayGoal === 'number'
    ) {
      await sendPredict(data.match, data.homeGoal, data.awayGoal).then(
        async (res) => {
          if (res.status === 'SUCCESS') {
            setActiveId('');
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
    setActiveId('');
    setLoading(false);
  };

  return (
    <Grid container spacing={3}>
      {props.data.map((item) => (
        <Grid item xs={12} md={6} lg={4} key={item.id}>
          <Box
            bgcolor={Colors.backgroundOpacity}
            borderRadius={16}
            boxShadow={8}
            p={3}
          >
            <Grid container spacing={3}>
              <Grid item xs={4}>
                <Box textAlign="center" px={3}>
                  <img
                    src={Global.API_BASE_URL + item.home.logo}
                    alt={item.home.name}
                    className={classes.image}
                  />
                  <Typography variant="h6" className="font-13">
                    {item.home.name}
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={4}>
                {item.matchDateTime ? (
                  <React.Fragment>
                    <Box textAlign="center" className="font-12">
                      <Moment type="date" time={Number(item.matchDateTime)} />
                    </Box>
                    <Box textAlign="center" className="font-12" mb={2}>
                      <Moment type="time" time={Number(item.matchDateTime)} />
                    </Box>
                  </React.Fragment>
                ) : (
                  <React.Fragment>
                    <Box textAlign="center" className="font-12">
                      {Persian.delayed}
                    </Box>
                    <Box textAlign="center" className="font-12" mb={2}>
                      {Persian.dash}
                    </Box>
                  </React.Fragment>
                )}
                <Box textAlign="center" mb={1}>
                  <Typography component="div" className="font-12">
                    {Persian.matchScore}
                  </Typography>
                </Box>
                <Box
                  textAlign="center"
                  bgcolor={Colors.white}
                  color={Colors.black}
                  borderRadius={16}
                  py={1}
                  className="font-12"
                >
                  {item.sentDateTime
                    ? item.homeGoal + ' ' + Persian.dash + ' ' + item.awayGoal
                    : Persian.questionMark}
                </Box>
              </Grid>
              <Grid item xs={4}>
                <Box textAlign="center" px={3}>
                  <img
                    src={Global.API_BASE_URL + item.away.logo}
                    alt={item.away.name}
                    className={classes.image}
                  />
                  <Typography variant="h6" className="font-13">
                    {item.away.name}
                  </Typography>
                </Box>
              </Grid>
            </Grid>
            <Box my={4}>
              <Divider className={classes.divider} />
            </Box>
            {new Date(Number(item.matchDateTime)) < new Date() &&
            item.matchDateTime != null ? (
              <Grid container spacing={3}>
                <Grid item xs={6}>
                  <Box
                    px={2}
                    py={1}
                    textAlign="center"
                    width="100%"
                    bgcolor={
                      item.myPoint !== null
                        ? item.myPoint === 10 || item.myPoint === 7
                          ? Colors.success
                          : item.myPoint === 5
                          ? Colors.warning
                          : Colors.error
                        : Colors.white
                    }
                    boxShadow={4}
                    border="none"
                    borderRadius={16}
                    color={item.myPoint !== null ? Colors.white : Colors.black}
                    className="font-12"
                  >
                    {item.myPoint !== null
                      ? item.myPoint
                      : Persian.questionMark}
                    {' ' + Persian.point}
                  </Box>
                </Grid>
                <Grid item xs={6}>
                  <Box
                    px={2}
                    py={1}
                    textAlign="center"
                    width="100%"
                    bgcolor={Colors.primary}
                    boxShadow={4}
                    border="none"
                    borderRadius={16}
                    color={Colors.white}
                    className="font-12"
                  >
                    {Persian.predict + ' '}
                    {item.myPrediction
                      ? item.myPrediction.homeGoal +
                        ' ' +
                        Persian.dash +
                        ' ' +
                        item.myPrediction.awayGoal
                      : Persian.questionMark}
                  </Box>
                </Grid>
                <Grid item xs={12}>
                  <Button
                    fullWidth
                    variant="contained"
                    color="default"
                    className="font-11"
                    onClick={(e) => handleClickOpen(item)}
                  >
                    {Persian.otherPeoplePredictions}
                  </Button>
                </Grid>
              </Grid>
            ) : (
              <form
                onSubmit={(e: React.FormEvent<HTMLFormElement>) =>
                  handleSubmitScore(e, item)
                }
              >
                <Grid container spacing={3}>
                  <Grid item xs={6}>
                    <Box
                      px={2}
                      py={1}
                      width="100%"
                      component="select"
                      bgcolor={Colors.primary}
                      boxShadow={4}
                      border="none"
                      borderRadius={16}
                      color={Colors.white}
                      className="font-11"
                      defaultValue={
                        item.myPrediction ? item.myPrediction.homeGoal : ''
                      }
                      onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                        handleScoreChange(e, item, 'HOME_GOAL')
                      }
                    >
                      <option value="" disabled>
                        انتخاب گزینه
                      </option>
                      <option value={0}>0</option>
                      <option value={1}>1</option>
                      <option value={2}>2</option>
                      <option value={3}>3</option>
                      <option value={4}>4</option>
                      <option value={5}>5</option>
                      <option value={6}>6</option>
                      <option value={7}>7</option>
                      <option value={8}>8</option>
                      <option value={9}>9</option>
                      <option value={10}>10</option>
                    </Box>
                  </Grid>
                  <Grid item xs={6}>
                    <Box
                      px={2}
                      py={1}
                      width="100%"
                      component="select"
                      bgcolor={Colors.primary}
                      boxShadow={4}
                      border="none"
                      borderRadius={16}
                      color={Colors.white}
                      className="font-11"
                      defaultValue={
                        item.myPrediction ? item.myPrediction.awayGoal : ''
                      }
                      onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                        handleScoreChange(e, item, 'AWAY_GOAL')
                      }
                    >
                      <option value="" disabled>
                        انتخاب گزینه
                      </option>
                      <option value={0}>0</option>
                      <option value={1}>1</option>
                      <option value={2}>2</option>
                      <option value={3}>3</option>
                      <option value={4}>4</option>
                      <option value={5}>5</option>
                      <option value={6}>6</option>
                      <option value={7}>7</option>
                      <option value={8}>8</option>
                      <option value={9}>9</option>
                      <option value={10}>10</option>
                    </Box>
                  </Grid>
                </Grid>
                <Box textAlign="center" mt={3}>
                  <Button
                    type="submit"
                    variant="contained"
                    color="secondary"
                    className="font-11"
                    disabled={loading}
                  >
                    {loading && activeId === item.id ? (
                      <CircularProgress size={19} />
                    ) : (
                      Persian.submit
                    )}
                  </Button>
                </Box>
              </form>
            )}
          </Box>
        </Grid>
      ))}
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
                                {item.myPredictionScore?.homeGoal}
                              </Typography>
                              <Typography component="span" className="font-11">
                                {' ' + Persian.dash + ' '}
                              </Typography>
                              <Typography
                                component="span"
                                variant="h6"
                                className="font-13"
                              >
                                {item.myPredictionScore?.awayGoal}
                              </Typography>
                            </Box>
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
    </Grid>
  );
};

export default Match;
