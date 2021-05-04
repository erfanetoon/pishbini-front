import {
  Button,
  InputAdornment,
  TextField,
  Box,
  Divider,
  ButtonBase,
  Grid,
  CircularProgress,
} from '@material-ui/core';
import React from 'react';
import { FaUserAlt, FaKey, FaMobile, FaEnvelope } from 'react-icons/fa';
import Persian from '../../../lib/constants/persian';
import { Link, RouteComponentProps } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Colors } from './../../../theme';
import { register } from './../../../lib/apis/auth';
import { makeStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) => ({
  divider: {
    backgroundColor: Colors.dividerColor,
  },
}));

const Login: React.FC<RouteComponentProps> = ({ history }) => {
  const [firstName, setFirstName] = React.useState<string>('');
  const [lastName, setLastName] = React.useState<string>('');
  const [email, setEmail] = React.useState<string>('');
  const [mobile, setMobile] = React.useState<string>('');
  const [password, setPassword] = React.useState<string>('');
  const [loading, setLoading] = React.useState<boolean>(false);
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
    } else if (password.length < 6) {
      toast.error(Persian.passwordInvalid, {
        position: toast.POSITION.BOTTOM_CENTER,
      });
    } else {
      await register(firstName, lastName, email, mobile, password).then(
        (res) => {
          if (res.status === 'SUCCESS') {
            history.push('/login');
          }
        }
      );
    }
    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit}>
      <Box mb={4}>
        <TextField
          id="firstName"
          label={Persian.firstName}
          fullWidth
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setFirstName(e.target.value)
          }
          disabled={loading}
          defaultValue={firstName}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <FaUserAlt color={Colors.primary} />
              </InputAdornment>
            ),
          }}
        />
      </Box>
      <Box mb={4}>
        <TextField
          id="lastName"
          label={Persian.lastName}
          fullWidth
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setLastName(e.target.value)
          }
          disabled={loading}
          defaultValue={lastName}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <FaUserAlt color={Colors.primary} />
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
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setMobile(e.target.value)
          }
          disabled={loading}
          defaultValue={mobile}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <FaMobile color={Colors.primary} />
              </InputAdornment>
            ),
          }}
        />
      </Box>
      <Box mb={4}>
        <TextField
          id="email"
          label={Persian.email}
          fullWidth
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setEmail(e.target.value)
          }
          disabled={loading}
          defaultValue={email}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <FaEnvelope color={Colors.primary} />
              </InputAdornment>
            ),
          }}
        />
      </Box>
      <Box mb={4}>
        <TextField
          id="password"
          label={Persian.password}
          fullWidth
          type="password"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setPassword(e.target.value)
          }
          disabled={loading}
          defaultValue={password}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <FaKey color={Colors.primary} />
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
        {loading ? <CircularProgress size={19} /> : Persian.register}
      </Button>
      <Box mb={4} mt={8}>
        <Divider className={classes.divider} />
      </Box>
      <Grid
        container
        direction="row"
        justify="space-between"
        alignItems="center"
      >
        <Link to="/login">
          <ButtonBase className="font-12">{Persian.login}</ButtonBase>
        </Link>
        <Link to="/forget">
          <ButtonBase className="font-12">{Persian.forgetPassword}</ButtonBase>
        </Link>
      </Grid>
    </form>
  );
};

export default Login;
