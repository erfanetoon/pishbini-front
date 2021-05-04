import React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import Intro from '../../../../components/competitions/intro';
import { Box, CircularProgress, Grid, Typography } from '@material-ui/core';
import { PeriodInterface } from './../../../../lib/constants/interfaces';
import { useAuth } from './../../../../lib/contexts/auth';
import { getStats } from './../../../../lib/apis/competition';
import Persian from './../../../../lib/constants/persian';
import { Colors } from './../../../../theme';
import Global from './../../../../global';
import { makeStyles, Theme } from '@material-ui/core/styles';

interface props {
  url: string;
}

const useStyles = makeStyles((theme: Theme) => ({
  image: {
    borderRadius: '50%',
  },
}));

const Stats: React.FC<RouteComponentProps<props>> = (props) => {
  const [loading, setLoading] = React.useState<boolean>(true);
  const [periods, setPeriods] = React.useState<[PeriodInterface] | undefined>(
    undefined
  );
  const { logout } = useAuth();
  const classes = useStyles();

  React.useEffect(() => {
    const getPeriodsStats = async () => {
      await getStats(props.match.params.url).then(async (res) => {
        if (res.status === 'SUCCESS') {
          setPeriods(res.periods);
          setLoading(false);
        } else if (res.status === 'LOGOUT') {
          if (logout) {
            await logout().then(async (res) => {
              if (res.status === 'SUCCESS') {
                await props.history.push('/login');
              }
            });
          }
        } else {
          await props.history.push('/');
        }
      });
    };
    getPeriodsStats();
  }, []);

  return (
    <section>
      <Intro url={props.match.params.url} />
      {loading && (
        <Box textAlign="center">
          <CircularProgress />
        </Box>
      )}
      {!loading && periods && periods.length > 0 && (
        <Grid container spacing={3}>
          stats
        </Grid>
      )}
      {!loading && periods && periods.length < 1 && (
        <Box textAlign="center">{Persian.notFound}</Box>
      )}
    </section>
  );
};

export default Stats;
