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
import { makeStyles, Theme } from '@material-ui/core/styles';
import { toast } from 'react-toastify';
import { FaUserAlt, FaEnvelope, FaMobile } from 'react-icons/fa';
import { useAuth } from './../../../../lib/contexts/auth';
import { addUser } from './../../../../lib/apis/users';
import Persian from './../../../../lib/constants/persian';
import { Colors } from './../../../../theme';

interface props {
  url: string;
}

const useStyles = makeStyles((theme: Theme) => ({
  divider: {
    backgroundColor: Colors.dividerColor,
  },
}));

const AddUser: React.FC<RouteComponentProps<props>> = (props) => {
  const [firstName, setFirstName] = React.useState<string>('');
  const [lastName, setLastName] = React.useState<string>('');
  const [email, setEmail] = React.useState<string>('');
  const [mobile, setMobile] = React.useState<string>('');
  const [loading, setLoading] = React.useState<boolean>(false);
  const { logout } = useAuth();
  const classes = useStyles();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (firstName.length < 3) {
      toast.error(Persian.firstNameInvalid, {
        position: toast.POSITION.BOTTOM_CENTER,
      });
    } else if (lastName.length < 3) {
      toast.error(Persian.lastNameInvalid, {
        position: toast.POSITION.BOTTOM_CENTER,
      });
    } else if (mobile.length !== 11 || mobile.substring(0, 2) !== '09') {
      toast.error(Persian.mobileInvalid, {
        position: toast.POSITION.BOTTOM_CENTER,
      });
    } else if (!re.test(email)) {
      toast.error(Persian.emailInvalid, {
        position: toast.POSITION.BOTTOM_CENTER,
      });
    } else {
      await addUser(firstName, lastName, email, mobile).then(async (res) => {
        if (res.status === 'SUCCESS') {
          props.history.push(`/admin/users`);
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
      <Box
        bgcolor={Colors.backgroundOpacity}
        borderRadius={16}
        p={4}
        boxShadow={8}
        mb={4}
        color={Colors.white}
      >
        <form onSubmit={handleSubmit}>
          <Box mb={4}>
            <Grid container spacing={3}>
              <Grid item xs={6}>
                <TextField
                  id="firstName"
                  label={Persian.firstName}
                  fullWidth
                  type="text"
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setFirstName(e.target.value)
                  }
                  className="input-text-white"
                  disabled={loading}
                  value={firstName}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <FaUserAlt color={Colors.white} />
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  id="lastName"
                  label={Persian.lastName}
                  fullWidth
                  type="text"
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setLastName(e.target.value)
                  }
                  className="input-text-white"
                  disabled={loading}
                  value={lastName}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <FaUserAlt color={Colors.white} />
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
            </Grid>
          </Box>
          <Box mb={4}>
            <TextField
              id="email"
              label={Persian.email}
              fullWidth
              type="text"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setEmail(e.target.value)
              }
              className="input-text-white"
              disabled={loading}
              value={email}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <FaEnvelope color={Colors.white} />
                  </InputAdornment>
                ),
              }}
            />
          </Box>
          <Box mb={4}>
            <TextField
              id="mobile"
              label={Persian.mobile}
              fullWidth
              type="text"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setMobile(e.target.value)
              }
              className="input-text-white"
              disabled={loading}
              value={mobile}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <FaMobile color={Colors.white} />
                  </InputAdornment>
                ),
              }}
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
    </Box>
  );
};

export default AddUser;
