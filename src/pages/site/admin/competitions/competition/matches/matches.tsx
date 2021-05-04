import React from 'react';
import { RouteComponentProps, Link } from 'react-router-dom';
import { getPeriods } from './../../../../../../lib/apis/competition';
import { getAdminMatches } from './../../../../../../lib/apis/matches';
import {
  MatchInterface,
  PeriodInterface,
} from './../../../../../../lib/constants/interfaces';
import { useAuth } from './../../../../../../lib/contexts/auth';
import { makeStyles, Theme } from '@material-ui/core/styles';
import { Colors } from './../../../../../../theme';
import {
  Box,
  Button,
  CircularProgress,
  Fab,
  Grid,
  Menu,
  MenuItem,
  Typography,
  Divider,
} from '@material-ui/core';
import { AiFillCaretDown } from 'react-icons/ai';
import Persian from './../../../../../../lib/constants/persian';
import { IoMdAdd } from 'react-icons/io';
import Match from '../../../../../../components/admin/match';

interface props {
  url: string;
}

const useStyles = makeStyles((theme: Theme) => ({
  list: {
    '& .MuiMenu-paper': {
      backgroundColor: Colors.primary + ' !important',
      color: Colors.white,

      minWidth: 140,
    },
  },
  divider: {
    backgroundColor: Colors.dividerColor,
  },
}));

const Matches: React.FC<RouteComponentProps<props>> = (props) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [loading, setLoading] = React.useState<boolean>(true);
  const [loadingSecond, setLoadingSecond] = React.useState<boolean>(true);
  const [periods, setPeriods] = React.useState<PeriodInterface[] | undefined>(
    undefined
  );
  const [activePeriod, setActivePeriod] = React.useState<string | undefined>(
    undefined
  );
  const [activePeriodId, setActivePeriodId] = React.useState<
    string | undefined
  >(undefined);
  const [matches, setMatches] = React.useState<MatchInterface[] | undefined>(
    undefined
  );
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
    setActivePeriodId(period.id);
    handleClose();
    await getAdminMatches(period.id).then(async (res) => {
      if (res.status === 'SUCCESS' && res.matches) {
        setMatches(res.matches);
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

  return (
    <Box>
      {loading && (
        <Box textAlign="center">
          <CircularProgress />
        </Box>
      )}
      {!loading && periods && (
        <Box
          mb={6}
          p={2}
          boxShadow={8}
          textAlign="center"
          borderRadius={16}
          bgcolor={Colors.backgroundOpacity}
        >
          <Grid container direction="row" justify="center" alignItems="center">
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
      )}
      {!loading && periods && matches && (
        <React.Fragment>
          <Box mb={4}>
            <Grid container justify="space-between" alignItems="center">
              <Typography variant="h6" component="h1">
                {Persian.manageMatches}
              </Typography>
              <Box>
                <Link
                  to={`/admin/competitions/${props.match.params.url}/matches/${activePeriodId}/add`}
                >
                  <Fab size="small" color="primary" aria-label="add">
                    <IoMdAdd className="font-21" />
                  </Fab>
                </Link>
              </Box>
            </Grid>
            <Box my={2}>
              <Divider className={classes.divider} />
            </Box>
          </Box>
          <Box>
            <Grid container spacing={4}>
              {matches.map((item, index) => (
                <Grid key={index} item xs={12} sm={6} md={4} lg={3}>
                  <Match
                    setActivePeriodId={setActivePeriodId}
                    setActivePeriod={setActivePeriod}
                    setMatches={setMatches}
                    data={item}
                    url={props.match.params.url}
                    history={props.history}
                  />
                </Grid>
              ))}
            </Grid>
          </Box>
        </React.Fragment>
      )}
    </Box>
  );
};

export default Matches;
