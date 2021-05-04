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
import { FaUserAlt, FaKey } from 'react-icons/fa';
import Persian from '../../../lib/constants/persian';
import { Link, RouteComponentProps } from 'react-router-dom';
import { useAuth } from '../../../lib/contexts/auth';
import { toast } from 'react-toastify';
import { Colors } from './../../../theme';
import { makeStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) => ({
  divider: {
    backgroundColor: Colors.dividerColor,
  },
}));

const Login: React.FC<RouteComponentProps> = ({ history }) => {
  const [email, setEmail] = React.useState<string>('');
  const [password, setPassword] = React.useState<string>('');
  const [loading, setLoading] = React.useState<boolean>(false);
  const { login } = useAuth();
  const classes = useStyles();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    if (login) {
      const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      if (!re.test(email)) {
        toast.error(Persian.emailInvalid, {
          position: toast.POSITION.BOTTOM_CENTER,
        });
      } else if (password.length < 6) {
        toast.error(Persian.passwordInvalid, {
          position: toast.POSITION.BOTTOM_CENTER,
        });
      } else {
        await login(email, password).then((res) => {
          if (res.status === 'SUCCESS') {
            history.push('/');
          }
        });
      }
    }
    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit}>
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
                <FaUserAlt color={Colors.primary} />
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
        {loading ? <CircularProgress size={19} /> : Persian.login}
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
        <Link to="/forget">
          <ButtonBase className="font-12">{Persian.forgetPassword}</ButtonBase>
        </Link>
        <Link to="/register">
          <ButtonBase className="font-12">{Persian.register}</ButtonBase>
        </Link>
      </Grid>
    </form>
  );
};

export default Login;
