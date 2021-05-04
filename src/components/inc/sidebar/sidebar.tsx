import { Drawer, Box, Typography, Grid, Fab, Divider } from '@material-ui/core';
import React from 'react';
import { makeStyles, Theme } from '@material-ui/core/styles';
import { Colors } from './../../../theme';
import Persian from './../../../lib/constants/persian';
import {
  RiAwardFill,
  RiSettings2Line,
  RiLockPasswordFill,
} from 'react-icons/ri';
import { FaSignOutAlt } from 'react-icons/fa';
import { MdWork, MdHome } from 'react-icons/md';
import { Link } from 'react-router-dom';
import { useAuth } from './../../../lib/contexts/auth';
import Global from './../../../global';
import { History } from 'history';

interface props {
  sidebar: boolean;
  setSidebar: any;
  history: History;
}

const useStyles = makeStyles((theme: Theme) => ({
  list: {
    borderRadius: 16,
    '& svg': {
      marginRight: 8,
      verticalAlign: 'middle',
    },
    '&:hover': {
      backgroundColor: Colors.backgroundOpacity,
    },
    '&:active': {
      backgroundColor: Colors.backgroundOpacity,
    },
    '&:focus': {
      backgroundColor: Colors.backgroundOpacity,
    },
  },
  image: {
    borderRadius: '50%',
    boxShadow: theme.shadows[8],
    border: '1px solid ' + Colors.white,
  },
}));

const Sidebar: React.FC<props> = (props) => {
  const classes = useStyles();
  const { user, roles, logout } = useAuth();

  return (
    <Drawer
      open={props.sidebar}
      elevation={13}
      onClose={() => props.setSidebar(false)}
    >
      {!roles?.includes('GUEST') && (
        <React.Fragment>
          <Box textAlign="center" p={2}>
            <img
              className={classes.image}
              width={96}
              src={Global.API_BASE_URL + user?.avatar}
              alt={user?.firstName + ' ' + user?.lastName}
            />
            <Box mb={3}>
              <Typography variant="h6" component="h3">
                {user?.firstName + ' ' + user?.lastName}
              </Typography>
            </Box>
            <Grid
              container
              direction="row"
              justify="space-around"
              alignItems="center"
            >
              <Link to="/edit_information">
                <Fab color="primary" size="small" aria-label="add">
                  <RiSettings2Line className="font-17" />
                </Fab>
              </Link>
              <Link to="/change_password">
                <Fab color="primary" size="small" aria-label="add">
                  <RiLockPasswordFill className="font-17" />
                </Fab>
              </Link>
              <Fab
                color="primary"
                size="small"
                aria-label="add"
                onClick={logout}
              >
                <FaSignOutAlt className="font-17" />
              </Fab>
            </Grid>
          </Box>
          <Box my={4}>
            <Divider />
          </Box>
        </React.Fragment>
      )}
      <Link to="/">
        <Box
          className={classes.list + ' transition'}
          bgcolor={
            props.history.location.pathname === '/'
              ? Colors.backgroundOpacity
              : 'transparent'
          }
          px={2}
          py={4}
          mb={1}
          onClick={() => props.setSidebar(false)}
        >
          <MdHome className="font-21" />
          {Persian.homepage}
        </Box>
      </Link>
      {!roles?.includes('GUEST') && (
        <React.Fragment>
          <Link to="/jobs">
            <Box
              className={classes.list + ' transition'}
              bgcolor={
                props.history.location.pathname === '/jobs'
                  ? Colors.backgroundOpacity
                  : 'transparent'
              }
              px={2}
              py={4}
              mb={1}
              onClick={() => props.setSidebar(false)}
            >
              <MdWork className="font-21" />
              {Persian.jobs}
            </Box>
          </Link>
          <Link to="/hall_of_fame">
            <Box
              className={classes.list + ' transition'}
              bgcolor={
                props.history.location.pathname === '/hall_of_fame'
                  ? Colors.backgroundOpacity
                  : 'transparent'
              }
              px={2}
              py={4}
              mb={1}
              onClick={() => props.setSidebar(false)}
            >
              <RiAwardFill className="font-21" />
              {Persian.hallOfFame}
            </Box>
          </Link>
        </React.Fragment>
      )}
    </Drawer>
  );
};

export default Sidebar;
