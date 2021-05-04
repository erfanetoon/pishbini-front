import React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import {
  editCompetition,
  getCompetition,
} from './../../../../lib/apis/competition';
import { useAuth } from './../../../../lib/contexts/auth';
import {
  Box,
  Typography,
  Grid,
  Divider,
  Button,
  InputAdornment,
  TextField,
  CircularProgress,
} from '@material-ui/core';
import { MuiPickersUtilsProvider, DateTimePicker } from '@material-ui/pickers';
import JalaliUtils from '@date-io/jalaali';
import jMoment from 'moment-jalaali';
import moment from 'moment';
import { Autocomplete } from '@material-ui/lab';
import { makeStyles, Theme } from '@material-ui/core/styles';
import { Colors } from './../../../../theme';
import Persian from './../../../../lib/constants/persian';
import { TeamInterface } from './../../../../lib/constants/interfaces';
import Crop from '../../../../components/crop/crop';
import { ImPriceTag, ImLink } from 'react-icons/im';
import { toast } from 'react-toastify';
import { BiText } from 'react-icons/bi';
import { getTeams } from './../../../../lib/apis/teams';

interface props {
  url: string;
}

jMoment.loadPersian({ dialect: 'persian-modern', usePersianDigits: true });

const useStyles = makeStyles((theme: Theme) => ({
  divider: {
    backgroundColor: Colors.dividerColor,
  },
}));

const EditCompetition: React.FC<RouteComponentProps<props>> = (props) => {
  const [title, setTitle] = React.useState<string>('');
  const [price, setPrice] = React.useState<string>('');
  const [url, setUrl] = React.useState<string>('');
  const [teams, setTeams] = React.useState<[TeamInterface] | undefined>(
    undefined
  );
  const [
    championPredictionDateTime,
    setChampionPredictionDateTime,
  ] = React.useState<Date | undefined>(undefined);
  const [selectedTeams, setSelectedTeams] = React.useState<
    TeamInterface[] | undefined
  >(undefined);
  const [loading, setLoading] = React.useState<boolean>(true);
  const [id, setId] = React.useState<string>('');
  const { logout, setUser } = useAuth();
  const classes = useStyles();

  React.useEffect(() => {
    getCompetitionFunc();
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

  const getCompetitionFunc = async () => {
    await getCompetition(props.match.params.url).then(async (res) => {
      if (res.status === 'SUCCESS' && res.competition) {
        setTitle(res.competition.title);
        setId(res.competition.id);
        if (res.competition.price) {
          setPrice(res.competition.price.toString());
        }
        setUrl(res.competition.url);
        setSelectedTeams(res.competition.teams);
        setChampionPredictionDateTime(
          new Date(Number(res.competition.championPredictionDateTime))
        );
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

  const handleFirstStep = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    if (title.length < 3) {
      toast.error(Persian.titleInvalid, {
        position: toast.POSITION.BOTTOM_CENTER,
      });
    } else if (url.length < 3) {
      toast.error(Persian.urlInvalid, {
        position: toast.POSITION.BOTTOM_CENTER,
      });
    } else if (
      !championPredictionDateTime ||
      !moment(championPredictionDateTime).isValid()
    ) {
      toast.error(Persian.dateTimeInvalid, {
        position: toast.POSITION.BOTTOM_CENTER,
      });
    } else if (selectedTeams === undefined) {
      toast.error(Persian.mustSelectTeam, {
        position: toast.POSITION.BOTTOM_CENTER,
      });
    } else {
      await editCompetition(
        id,
        title,
        price,
        url,
        selectedTeams,
        championPredictionDateTime.toString()
      ).then(async (res) => {
        if (res.status === 'SUCCESS') {
          setLoading(false);
          props.history.push('/admin/competitions');
          setUser(res.user);
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
    }
    setLoading(false);
  };

  const handleDateChange = async (e: any) => {
    setChampionPredictionDateTime(e);
  };

  const handleTeamChange = async (
    e: React.ChangeEvent<{}>,
    data: TeamInterface[],
    reason: any
  ) => {
    if (data.length > 0) {
      setSelectedTeams(data);
    } else {
      setSelectedTeams(undefined);
    }
  };

  return (
    <MuiPickersUtilsProvider utils={JalaliUtils} locale="fa">
      <Box>
        <Box mb={4}>
          <Grid container justify="space-between" alignItems="center">
            <Typography variant="h6" component="h1">
              {Persian.addCompetition}
            </Typography>
          </Grid>
          <Box my={2}>
            <Divider className={classes.divider} />
          </Box>
        </Box>
        <Box
          bgcolor={Colors.backgroundOpacity}
          borderRadius={16}
          p={4}
          boxShadow={8}
          mb={4}
          color={Colors.white}
        >
          <form onSubmit={handleFirstStep}>
            <Box mb={4}>
              <TextField
                id="title"
                label={Persian.titleText}
                fullWidth
                type="text"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setTitle(e.target.value)
                }
                className="input-text-white"
                disabled={loading}
                value={title}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <BiText color={Colors.white} />
                    </InputAdornment>
                  ),
                }}
              />
            </Box>
            <Box mb={4}>
              <Grid container spacing={4}>
                <Grid item xs={6}>
                  <TextField
                    id="price"
                    label={Persian.price}
                    fullWidth
                    type="text"
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      setPrice(e.target.value)
                    }
                    className="input-text-white"
                    disabled={loading}
                    value={price}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <ImPriceTag color={Colors.white} />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    id="url"
                    label={Persian.url}
                    fullWidth
                    type="text"
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      setUrl(e.target.value)
                    }
                    className="input-text-white"
                    disabled={loading}
                    value={url}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <ImLink color={Colors.white} />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>
              </Grid>
            </Box>
            <Box mb={4}>
              {teams && selectedTeams && (
                <Autocomplete
                  multiple
                  id="teams"
                  onChange={handleTeamChange}
                  options={teams}
                  defaultValue={selectedTeams}
                  getOptionLabel={(option) => option.name}
                  filterSelectedOptions
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      variant="standard"
                      label="انتخاب تیم"
                      placeholder=""
                    />
                  )}
                />
              )}
            </Box>
            <Box mb={4}>
              {championPredictionDateTime && (
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
                  value={championPredictionDateTime}
                  label={Persian.championPredictionDateTime}
                  onChange={handleDateChange}
                />
              )}
            </Box>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              disabled={loading}
            >
              {loading ? <CircularProgress size={19} /> : Persian.submit}
            </Button>
          </form>
        </Box>
      </Box>
    </MuiPickersUtilsProvider>
  );
};

export default EditCompetition;
