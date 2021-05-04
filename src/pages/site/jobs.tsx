import React from 'react';
import { JobInterface } from './../../lib/constants/interfaces';
import { jobs as jobsFunc } from './../../lib/apis/site';
import { RouteComponentProps } from 'react-router-dom';
import { useAuth } from './../../lib/contexts/auth';
import {
  CircularProgress,
  Grid,
  Box,
  Button,
  Divider,
  Typography,
} from '@material-ui/core';
import Persian from './../../lib/constants/persian';
import { Colors } from './../../theme';
import { makeStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) => ({
  divider: {
    backgroundColor: Colors.dividerColor,
  },
}));

const Jobs: React.FC<RouteComponentProps> = (props) => {
  const [jobs, setJobs] = React.useState<[JobInterface] | undefined>(undefined);
  const [loading, setLoading] = React.useState<boolean>(true);
  const { logout } = useAuth();
  const classes = useStyles();

  React.useEffect(() => {
    getJobs();
  }, []);

  const getJobs = async () => {
    await jobsFunc().then(async (res) => {
      if (res.status === 'SUCCESS') {
        setJobs(res.jobs);
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
    setLoading(false);
  };

  return (
    <section>
      {loading && (
        <Box textAlign="center">
          <CircularProgress />
        </Box>
      )}
      {!loading && jobs && jobs.length > 0 && (
        <Grid container spacing={3}>
          {jobs.map((item, index) => (
            <Grid key={index} item xs={12} sm={6} md={4} lg={3}>
              <Box
                bgcolor={Colors.backgroundOpacity}
                p={3}
                mb={2}
                borderRadius={16}
                boxShadow={8}
              >
                <Box textAlign="center" mb={2}>
                  <Typography variant="h6" component="h2">
                    {item.title}
                  </Typography>
                </Box>
                <Box textAlign="center">
                  <Typography>{item.description}</Typography>
                </Box>
                <Box my={4}>
                  <Divider className={classes.divider} />
                </Box>
                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <Button
                      variant="outlined"
                      color="primary"
                      fullWidth
                      href={item.link}
                    >
                      {Persian.link}
                    </Button>
                  </Grid>
                  <Grid item xs={6}>
                    <Button
                      variant="outlined"
                      color="secondary"
                      fullWidth
                      href={`tel:${item.phone}`}
                    >
                      {Persian.phone}
                    </Button>
                  </Grid>
                </Grid>
              </Box>
            </Grid>
          ))}
        </Grid>
      )}
      {!loading && jobs && jobs.length < 1 && (
        <Box textAlign="center">{Persian.notFound}</Box>
      )}
    </section>
  );
};

export default Jobs;
