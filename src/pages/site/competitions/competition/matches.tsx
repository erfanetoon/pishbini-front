import {
  Box,
  Button,
  CircularProgress,
  Grid,
  Menu,
  MenuItem,
  Typography,
} from '@material-ui/core';
import React from 'react';
import Intro from '../../../../components/competitions/intro';
import Persian from './../../../../lib/constants/persian';
import {
  MatchInterface,
  PeriodInterface,
} from './../../../../lib/constants/interfaces';
import { getPeriods, getMatches } from '../../../../lib/apis/competition';
import { RouteComponentProps } from 'react-router';
import { Colors } from './../../../../theme';
import { makeStyles, Theme } from '@material-ui/core/styles';
import { AiFillCaretDown } from 'react-icons/ai';
import Match from './../../../../components/competitions/match';
import { useAuth } from './../../../../lib/contexts/auth';

interface props {
  url: string;
}

interface submitScore {
  match: string;
  homeGoal: number | null;
  awayGoal: number | null;
}

const useStyles = makeStyles((theme: Theme) => ({
  list: {
    '& .MuiMenu-paper': {
      backgroundColor: Colors.primary + ' !important',
      color: Colors.white,

      minWidth: 140,
    },
  },
}));

const Matches: React.FC<RouteComponentProps<props>> = (props) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [loading, setLoading] = React.useState<boolean>(true);
  const [activePeriod, setActivePeriod] = React.useState<string | undefined>(
    undefined
  );
  const [periods, setPeriods] = React.useState<[PeriodInterface] | undefined>(
    undefined
  );
  const [matches, setMatches] = React.useState<[MatchInterface] | undefined>(
    undefined
  );
  const [predicts, setPredicts] = React.useState<[submitScore]>([
    { match: '', homeGoal: null, awayGoal: null },
  ]);
  const { logout } = useAuth();
  const classes = useStyles();

  React.useEffect(() => {
    getAllPeriods();
  }, []);

  const getAllPeriods = async () => {
    await getPeriods(props.match.params.url).then(async (res) => {
      if (res.status === 'SUCCESS') {
        setPeriods(res.periods);
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

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(e.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const choosePeriod = async (
    e: React.MouseEvent<HTMLLIElement, MouseEvent>,
    period: PeriodInterface
  ): Promise<any> => {
    setLoading(true);
    setActivePeriod(period.name);
    handleClose();
    await getMatches(period.id).then(async (res) => {
      if (res.status === 'SUCCESS' && res.matches) {
        await res.matches.map((i) =>
          i.myPrediction ? handleSetPredict(i) : null
        );
        await setMatches(res.matches);
        await setLoading(false);
      } else if (res.status === 'LOGOUT') {
        if (logout) {
          await logout().then(async (res) => {
            if (res.status === 'SUCCESS') {
              await props.history.push('/login');
            }
          });
        }
      } else {
        await setLoading(false);
      }
    });
  };

  const handleSetPredict = async (item: MatchInterface) => {
    let data = predicts;
    data.push({
      match: item.id,
      homeGoal: item.myPrediction.homeGoal,
      awayGoal: item.myPrediction.awayGoal,
    });
  };

  return (
    <section>
      <Intro url={props.match.params.url} />
      {loading && (
        <Box textAlign="center">
          <CircularProgress />
        </Box>
      )}
      {!loading && periods && periods.length > 0 && (
        <React.Fragment>
          <Box
            mb={6}
            p={2}
            boxShadow={8}
            textAlign="center"
            borderRadius={16}
            bgcolor={Colors.backgroundOpacity}
          >
            <Grid
              container
              direction="row"
              justify="center"
              alignItems="center"
            >
              <Box mr={2}>
                <Typography>{Persian.choosePeriodOfCompetition}</Typography>
              </Box>
              <Button
                variant="contained"
                color="primary"
                aria-controls="simple-menu2"
                aria-haspopup="true"
                onClick={handleClick}
              >
                {activePeriod ? activePeriod : Persian.threeDots}
                <AiFillCaretDown />
              </Button>
              <Menu
                id="simple-menu2"
                getContentAnchorEl={null}
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'right',
                }}
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                open={Boolean(anchorEl)}
                className={classes.list}
                onClose={handleClose}
              >
                {periods.map((item) => (
                  <MenuItem
                    key={item.id}
                    className="font-12"
                    onClick={(e) => choosePeriod(e, item)}
                  >
                    {item.name}
                  </MenuItem>
                ))}
              </Menu>
            </Grid>
          </Box>
          {matches && (
            <Match
              data={matches}
              predicts={predicts}
              history={props.history}
              url={props.match.params.url}
            />
          )}
        </React.Fragment>
      )}
      {!loading && periods && periods.length < 1 && (
        <Box textAlign="center">{Persian.notFound}</Box>
      )}
    </section>
  );
};

export default Matches;
