import React from 'react';
import { makeStyles, Theme } from '@material-ui/core/styles';
import {
  Grid,
  Box,
  Button,
  Menu,
  MenuItem,
  IconButton,
} from '@material-ui/core';
import { Colors } from './../../../theme';
import Moment from '../../moment/moment';
import { useAuth } from '../../../lib/contexts/auth';
import { AiFillCaretDown, AiOutlineMenu } from 'react-icons/ai';
import Persian from './../../../lib/constants/persian';
import { Link } from 'react-router-dom';
import Global from './../../../global';
import Sidebar from '../sidebar/sidebar';
import { withRouter, RouteComponentProps } from 'react-router-dom';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    borderRadius: '0 0 16px 16px !important',
  },
  list: {
    '& .MuiMenu-paper': {
      backgroundColor: Colors.primary + ' !important',
      color: Colors.white,
      minWidth: 140,
    },
  },
  image: {
    borderRadius: '50%',
  },
}));

const Header: React.FC<RouteComponentProps> = (props) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [sidebar, setSidebar] = React.useState<boolean>(false);
  const classes = useStyles();
  const { user, roles, logout } = useAuth();

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(e.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box
      boxShadow={8}
      px={4}
      py={2}
      className={classes.root}
      bgcolor={Colors.backgroundOpacity}
    >
      <Grid
        container
        direction="row"
        alignItems="center"
        justify="space-between"
      >
        <Box>
          <Box>
            <Moment type="date" />
          </Box>
          <Box textAlign="center">
            <Moment type="time" />
          </Box>
        </Box>
        <Box ml="auto">
          <Button
            variant="contained"
            color="primary"
            aria-controls="simple-menu"
            aria-haspopup="true"
            onClick={handleClick}
          >
            <Grid container direction="row" alignItems="center">
              <img
                src={Global.API_BASE_URL + user?.avatar}
                width={24}
                className={classes.image}
                alt={user?.firstName + ' ' + user?.lastName}
              />
              <Box ml={2} mr={4} className="font-11">
                {user?.firstName + ' ' + user?.lastName}
              </Box>
              <AiFillCaretDown />
            </Grid>
          </Button>
          <Menu
            id="simple-menu"
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
            {roles?.includes('ADMIN') && (
              <Link to="/admin/users">
                <MenuItem className="font-12" onClick={handleClose}>
                  {Persian.manageUsers}
                </MenuItem>
              </Link>
            )}
            {roles?.includes('ADMIN') && (
              <Link to="/admin/competitions">
                <MenuItem className="font-12" onClick={handleClose}>
                  {Persian.manageCompetitions}
                </MenuItem>
              </Link>
            )}
            {roles?.includes('ADMIN') && (
              <Link to="/admin/teams">
                <MenuItem className="font-12" onClick={handleClose} divider>
                  {Persian.manageTeams}
                </MenuItem>
              </Link>
            )}
            {!roles?.includes('GUEST') && (
              <Link to="/transactions">
                <MenuItem className="font-12" onClick={handleClose}>
                  {Persian.transactions}
                </MenuItem>
              </Link>
            )}
            {!roles?.includes('GUEST') && (
              <Link to="/edit_information">
                <MenuItem className="font-12" onClick={handleClose}>
                  {Persian.changeInformation}
                </MenuItem>
              </Link>
            )}
            {!roles?.includes('GUEST') && (
              <Link to="/change_password">
                <MenuItem className="font-12" onClick={handleClose} divider>
                  {Persian.changePassword}
                </MenuItem>
              </Link>
            )}
            <MenuItem className="font-12" onClick={logout}>
              {Persian.logout}
            </MenuItem>
          </Menu>
        </Box>
        <IconButton
          color="inherit"
          aria-label="upload picture"
          component="span"
          onClick={() => setSidebar(true)}
        >
          <AiOutlineMenu />
        </IconButton>
        <Sidebar
          sidebar={sidebar}
          setSidebar={setSidebar}
          history={props.history}
        />
      </Grid>
    </Box>
  );
};

export default withRouter(Header);
