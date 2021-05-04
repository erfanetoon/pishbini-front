import React from 'react';
import {
  Box,
  Typography,
  Grid,
  Divider,
  Button,
  CircularProgress,
} from '@material-ui/core';
import { RouteComponentProps } from 'react-router-dom';
import { makeStyles, Theme } from '@material-ui/core/styles';
import { toast } from 'react-toastify';
import { useAuth } from './../../../../../../lib/contexts/auth';
import Persian from './../../../../../../lib/constants/persian';
import { Colors } from './../../../../../../theme';
import { editMatch, getMatch } from '../../../../../../lib/apis/matches';
import { TeamInterface } from './../../../../../../lib/constants/interfaces';
import { getTeams } from './../../../../../../lib/apis/teams';

interface props {
  url: string;
  id: string;
}

const useStyles = makeStyles((theme: Theme) => ({
  divider: {
    backgroundColor: Colors.dividerColor,
  },
}));

const EditMatch: React.FC<RouteComponentProps<props>> = (props) => {
  const [home, setHome] = React.useState<string>('');
  const [away, setAway] = React.useState<string>('');
  const [teams, setTeams] = React.useState<TeamInterface[] | undefined>(
    undefined
  );
  const [loading, setLoading] = React.useState<boolean>(false);
  const { logout } = useAuth();
  const classes = useStyles();

  React.useEffect(() => {
    handleTeams();
  }, []);

  const handleTeams = async () => {
    await getTeams(props.match.params.url).then(async (res) => {
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
    await getMatch(props.match.params.id).then(async (res) => {
      if (res.status === 'SUCCESS' && res.match) {
        setHome(res.match.home.id);
        setAway(res.match.away.id);
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

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    if (home.length < 3) {
      toast.error(Persian.teamInvalid, {
        position: toast.POSITION.BOTTOM_CENTER,
      });
    } else if (away.length < 3) {
      toast.error(Persian.teamInvalid, {
        position: toast.POSITION.BOTTOM_CENTER,
      });
    } else {
      await editMatch(props.match.params.id, home, away).then(async (res) => {
        if (res.status === 'SUCCESS') {
          props.history.push(
            `/admin/competitions/${props.match.params.url}/matches`
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
        }
      });
      setLoading(false);
    }
    setLoading(false);
  };

  return (
    <Box>
      <Box mb={4}>
        <Grid container justify="space-between" alignItems="center">
          <Typography variant="h6" component="h1">
            {Persian.addPeriod}
          </Typography>
        </Grid>
        <Box my={2}>
          <Divider className={classes.divider} />
        </Box>
      </Box>
      {loading && (
        <Box textAlign="center">
          <CircularProgress />
        </Box>
      )}
      {!loading && home && away && (
        <Box
          bgcolor={Colors.backgroundOpacity}
          borderRadius={16}
          p={4}
          boxShadow={8}
          mb={4}
          color={Colors.white}
        >
          {teams && (
            <form
              onSubmit={(e: React.FormEvent<HTMLFormElement>) =>
                handleSubmit(e)
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
                    defaultValue={home}
                    onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                      setHome(e.target.value)
                    }
                    className="font-11"
                  >
                    <option value="" disabled>
                      انتخاب گزینه
                    </option>
                    {teams.map((item, index) => (
                      <option key={index} value={item.id}>
                        {item.name}
                      </option>
                    ))}
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
                    defaultValue={away}
                    onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                      setAway(e.target.value)
                    }
                    className="font-11"
                  >
                    <option value="" disabled>
                      انتخاب گزینه
                    </option>
                    {teams.map((item, index) => (
                      <option key={index} value={item.id}>
                        {item.name}
                      </option>
                    ))}
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
          )}
        </Box>
      )}
    </Box>
  );
};

export default EditMatch;
