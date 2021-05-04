import {
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Fab,
  Grid,
  Tooltip,
  Typography,
} from '@material-ui/core';
import React from 'react';
import { MatchInterface } from './../../lib/constants/interfaces';
import { Colors } from './../../theme';
import Global from './../../global';
import { makeStyles, Theme } from '@material-ui/core/styles';
import Moment from '../../components/moment/moment';
import Persian from './../../lib/constants/persian';
import { useAuth } from './../../lib/contexts/auth';
import { IoMdTrash } from 'react-icons/io';
import { RiEdit2Fill } from 'react-icons/ri';
import { GrScorecard } from 'react-icons/gr';
import { BiTimeFive } from 'react-icons/bi';
import { MuiPickersUtilsProvider, DateTimePicker } from '@material-ui/pickers';
import JalaliUtils from '@date-io/jalaali';
import jMoment from 'moment-jalaali';
import moment from 'moment';
import { Link } from 'react-router-dom';
import { deleteMatch, submitTime, submitScore } from './../../lib/apis/matches';
import { History } from 'history';
import { toast } from 'react-toastify';

interface props {
  data: MatchInterface;
  url: string;
  history: History;
  setMatches: Function;
  setActivePeriod: Function;
  setActivePeriodId: Function;
}

jMoment.loadPersian({ dialect: 'persian-modern', usePersianDigits: true });

const useStyles = makeStyles((theme: Theme) => ({
  image: {
    width: '100%',
  },
  divider: {
    backgroundColor: Colors.dividerColor,
  },
}));

const Match: React.FC<props> = ({
  data,
  url,
  history,
  setMatches,
  setActivePeriodId,
  setActivePeriod,
}) => {
  const [dialog, setDialog] = React.useState<boolean>(false);
  const [activeId, setActiveId] = React.useState<string>('');
  const [loading, setLoading] = React.useState<boolean>(false);
  const [type, setType] = React.useState<string>('');
  const [homeGoal, setHomeGoal] = React.useState<number | null>(null);
  const [awayGoal, setAwayGoal] = React.useState<number | null>(null);
  const [dateTime, setDateTime] = React.useState<Date | undefined>(undefined);
  const { logout, user } = useAuth();
  const classes = useStyles();

  const handleOpen = (
    e: React.MouseEvent<HTMLButtonElement>,
    id: string,
    type: string,
    matchDateTime?: string,
    homeGoal?: number,
    awayGoal?: number
  ) => {
    setActiveId(id);
    setType(type);
    if (type === 'time') {
      if (matchDateTime) {
        setDateTime(new Date(Number(matchDateTime)));
      }
    }
    if (type === 'score') {
      if (homeGoal !== undefined) {
        setHomeGoal(homeGoal);
      }
      if (awayGoal !== undefined) {
        setAwayGoal(awayGoal);
      }
    }
    setDialog(true);
  };

  const handleClose = () => {
    setDialog(false);
    setActiveId('');
    setType('');
    setDateTime(undefined);
    setHomeGoal(null);
    setAwayGoal(null);
  };

  const handleDateChange = async (e: any) => {
    setDateTime(e);
  };

  const handleDelete = async () => {
    setLoading(true);
    await deleteMatch(activeId).then(async (res) => {
      if (res.status === 'SUCCESS') {
        history.push('/admin/competitions');
      } else if (res.status === 'LOGOUT') {
        if (logout) {
          await logout().then(async (res) => {
            if (res.status === 'SUCCESS') {
              history.push('/login');
            }
          });
        }
      } else {
        handleClose();
      }
    });
    setLoading(false);
  };

  const handleSubmitScore = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    if (homeGoal !== null && awayGoal !== null) {
      await submitScore(activeId, url, homeGoal, awayGoal).then(async (res) => {
        if (res.status === 'SUCCESS') {
          setActivePeriodId(undefined);
          setActivePeriod(undefined);
          setMatches(undefined);
          handleClose();
        } else if (res.status === 'LOGOUT') {
          if (logout) {
            await logout().then(async (res) => {
              if (res.status === 'SUCCESS') {
                history.push('/login');
              }
            });
          }
        } else {
          handleClose();
        }
      });
    } else {
      toast.error(Persian.pleaseEnterYourPredictCurrectly, {
        position: toast.POSITION.BOTTOM_CENTER,
      });
    }
    setLoading(false);
  };

  const handleSubmitTime = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    if (dateTime) {
      await submitTime(activeId, dateTime.toString()).then(async (res) => {
        if (res.status === 'SUCCESS') {
          setActivePeriodId(undefined);
          setActivePeriod(undefined);
          setMatches(undefined);
          handleClose();
        } else if (res.status === 'LOGOUT') {
          if (logout) {
            await logout().then(async (res) => {
              if (res.status === 'SUCCESS') {
                history.push('/login');
              }
            });
          }
        } else {
          handleClose();
        }
      });
    }
    setLoading(false);
  };

  const handleDelayed = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setLoading(true);
    await submitTime(activeId, '').then(async (res) => {
      if (res.status === 'SUCCESS') {
        history.push('/admin/competitions');
      } else if (res.status === 'LOGOUT') {
        if (logout) {
          await logout().then(async (res) => {
            if (res.status === 'SUCCESS') {
              history.push('/login');
            }
          });
        }
      } else {
        handleClose();
      }
    });
    setLoading(false);
  };

  return (
    <React.Fragment>
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
                src={Global.API_BASE_URL + data.home.logo}
                alt={data.home.name}
                className={classes.image}
              />
              <Typography variant="h6" className="font-13">
                {data.home.name}
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={4}>
            {data.matchDateTime ? (
              <React.Fragment>
                <Box textAlign="center" className="font-12">
                  <Moment type="date" time={Number(data.matchDateTime)} />
                </Box>
                <Box textAlign="center" className="font-12" mb={2}>
                  <Moment type="time" time={Number(data.matchDateTime)} />
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
              {data.sentDateTime
                ? data.homeGoal + ' ' + Persian.dash + ' ' + data.awayGoal
                : Persian.questionMark}
            </Box>
          </Grid>
          <Grid item xs={4}>
            <Box textAlign="center" px={3}>
              <img
                src={Global.API_BASE_URL + data.away.logo}
                alt={data.away.name}
                className={classes.image}
              />
              <Typography variant="h6" className="font-13">
                {data.away.name}
              </Typography>
            </Box>
          </Grid>
        </Grid>
        <Box my={4}>
          <Divider className={classes.divider} />
        </Box>
        <Grid container alignItems="center">
          <Box component="span" mr={2}>
            <Tooltip title={Persian.submitTime}>
              <Fab
                onClick={(e) =>
                  handleOpen(e, data.id, 'time', data.matchDateTime)
                }
                size="small"
                color="primary"
                aria-label="time"
              >
                <BiTimeFive className="font-21" />
              </Fab>
            </Tooltip>
          </Box>
          <Box component="span">
            <Tooltip title={Persian.submitScore}>
              <Fab
                onClick={(e) =>
                  handleOpen(
                    e,
                    data.id,
                    'score',
                    undefined,
                    data.homeGoal,
                    data.awayGoal
                  )
                }
                size="small"
                color="primary"
                aria-label="score"
              >
                <GrScorecard className="font-21" />
              </Fab>
            </Tooltip>
          </Box>
          <Box component="span" ml="auto" mr={2}>
            <Link to={`/admin/competitions/${url}/matches/${data.id}/edit`}>
              <Tooltip title={Persian.edit}>
                <Fab size="small" aria-label="edit">
                  <RiEdit2Fill className="font-21" />
                </Fab>
              </Tooltip>
            </Link>
          </Box>
          <Box component="span">
            <Tooltip title={Persian.delete}>
              <Fab
                onClick={(e) => handleOpen(e, data.id, 'delete')}
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
      <Dialog
        fullWidth
        maxWidth="sm"
        open={dialog}
        onClose={handleClose}
        aria-labelledby="max-width-dialog-title"
      >
        {type === 'delete' && (
          <React.Fragment>
            <DialogTitle id="confirmation-dialog-title">
              {Persian.deleteQuestion}
            </DialogTitle>
            <DialogActions>
              <Box textAlign="center" width="100%">
                <Box component="span" mx={2}>
                  <Button
                    onClick={handleClose}
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
        {type === 'time' && (
          <MuiPickersUtilsProvider utils={JalaliUtils} locale="fa">
            <DialogTitle id="max-width-dialog-title">
              {Persian.submitTime}
            </DialogTitle>
            <DialogContent>
              <form onSubmit={handleSubmitTime}>
                <Box mb={4}>
                  <DateTimePicker
                    fullWidth
                    okLabel="تأیید"
                    cancelLabel="لغو"
                    labelFunc={(date) =>
                      date ? date.format('jDD jMMMM jYY - HH:mm') : ''
                    }
                    invalidDateMessage=""
                    ampm={false}
                    error={false}
                    value={dateTime}
                    label={Persian.submitTime}
                    onChange={handleDateChange}
                  />
                </Box>
                <Grid container spacing={3}>
                  <Grid item xs={8}>
                    <Button
                      type="submit"
                      variant="contained"
                      color="primary"
                      fullWidth
                      disabled={loading}
                    >
                      {loading ? (
                        <CircularProgress size={19} />
                      ) : (
                        Persian.submit
                      )}
                    </Button>
                  </Grid>
                  <Grid item xs={4}>
                    <Button
                      variant="contained"
                      color="secondary"
                      fullWidth
                      onClick={handleDelayed}
                      disabled={loading}
                    >
                      {loading ? (
                        <CircularProgress size={19} />
                      ) : (
                        Persian.delayed
                      )}
                    </Button>
                  </Grid>
                </Grid>
              </form>
            </DialogContent>
          </MuiPickersUtilsProvider>
        )}
        {type === 'score' && (
          <React.Fragment>
            <DialogTitle id="max-width-dialog-title">
              {Persian.submitScore}
            </DialogTitle>
            <DialogContent>
              <form
                onSubmit={(e: React.FormEvent<HTMLFormElement>) =>
                  handleSubmitScore(e)
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
                      defaultValue={homeGoal !== null ? homeGoal : ''}
                      onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                        setHomeGoal(Number(e.target.value))
                      }
                      className="font-11"
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
                      defaultValue={awayGoal !== null ? awayGoal : ''}
                      onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                        setAwayGoal(Number(e.target.value))
                      }
                      className="font-11"
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
                    {loading ? <CircularProgress size={19} /> : Persian.submit}
                  </Button>
                </Box>
              </form>
            </DialogContent>
          </React.Fragment>
        )}
      </Dialog>
    </React.Fragment>
  );
};

export default Match;
