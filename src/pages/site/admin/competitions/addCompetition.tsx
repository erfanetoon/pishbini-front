import React from 'react';
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
import { RouteComponentProps } from 'react-router-dom';
import Persian from './../../../../lib/constants/persian';
import { makeStyles, Theme } from '@material-ui/core/styles';
import { Colors } from './../../../../theme';
import Crop from '../../../../components/crop/crop';
import { ImPriceTag, ImLink } from 'react-icons/im';
import { toast } from 'react-toastify';
import { BiText } from 'react-icons/bi';
import { MuiPickersUtilsProvider, DateTimePicker } from '@material-ui/pickers';
import JalaliUtils from '@date-io/jalaali';
import jMoment from 'moment-jalaali';
import moment from 'moment';
import { Autocomplete } from '@material-ui/lab';
import { TeamInterface } from './../../../../lib/constants/interfaces';
import { getTeams } from './../../../../lib/apis/teams';
import { useAuth } from './../../../../lib/contexts/auth';

jMoment.loadPersian({ dialect: 'persian-modern', usePersianDigits: true });

const useStyles = makeStyles((theme: Theme) => ({
  divider: {
    backgroundColor: Colors.dividerColor,
  },
}));

const AddCompetition: React.FC<RouteComponentProps> = (props) => {
  const [title, setTitle] = React.useState<string>('');
  const [price, setPrice] = React.useState<string>('');
  const [url, setUrl] = React.useState<string>('');
  const [
    championPredictionDateTime,
    setChampionPredictionDateTime,
  ] = React.useState<Date>(new Date());
  const [image, setImage] = React.useState<any>(undefined);
  const [step, setStep] = React.useState<number>(1);
  const [loading, setLoading] = React.useState<boolean>(true);
  const [teams, setTeams] = React.useState<[TeamInterface] | undefined>(
    undefined
  );
  const [selectedTeams, setSelectedTeams] = React.useState<
    TeamInterface[] | undefined
  >(undefined);
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
    } else if (!moment(championPredictionDateTime).isValid()) {
      toast.error(Persian.dateTimeInvalid, {
        position: toast.POSITION.BOTTOM_CENTER,
      });
    } else if (selectedTeams === undefined) {
      toast.error(Persian.mustSelectTeam, {
        position: toast.POSITION.BOTTOM_CENTER,
      });
    } else {
      setStep(2);
    }
    setLoading(false);
  };

  const handleUploadLogo = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setImage(e.target.files[0]);
    }
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
        {step === 1 && (
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
                {teams && (
                  <Autocomplete
                    multiple
                    id="teams"
                    onChange={handleTeamChange}
                    options={teams}
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
                <DateTimePicker
                  fullWidth
                  okLabel="تأیید"
                  cancelLabel="لغو"
                  labelFunc={(date) =>
                    date ? date.format('jDD jMMMM jYY - HH:mm') : ''
                  }
                  invalidDateMessage=""
                  disablePast
                  ampm={false}
                  error={false}
                  value={championPredictionDateTime}
                  label={Persian.championPredictionDateTime}
                  onChange={handleDateChange}
                />
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
        )}
        {step === 2 && (
          <Box>
            <Box textAlign="center" mb={3}>
              <input
                accept="image/*"
                className="d-none"
                id="raised-button-file"
                type="file"
                onChange={(e) => handleUploadLogo(e)}
              />
              <label htmlFor="raised-button-file">
                <Button variant="contained" color="secondary" component="span">
                  {Persian.uploadAvatar}
                </Button>
              </label>
            </Box>
            {image && (
              <Crop
                type="COMPETITION"
                data={{
                  title,
                  price,
                  url,
                  selectedTeams,
                  championPredictionDateTime,
                }}
                image={image}
                history={props.history}
              />
            )}
          </Box>
        )}
      </Box>
    </MuiPickersUtilsProvider>
  );
};

export default AddCompetition;
