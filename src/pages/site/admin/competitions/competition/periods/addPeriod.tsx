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
import { BiText } from 'react-icons/bi';
import { useAuth } from './../../../../../../lib/contexts/auth';
import { addPeriod } from './../../../../../../lib/apis/periods';
import Persian from './../../../../../../lib/constants/persian';
import { Colors } from './../../../../../../theme';

interface props {
  url: string;
}

const useStyles = makeStyles((theme: Theme) => ({
  divider: {
    backgroundColor: Colors.dividerColor,
  },
}));

const AddPeriod: React.FC<RouteComponentProps<props>> = (props) => {
  const [name, setName] = React.useState<string>('');
  const [loading, setLoading] = React.useState<boolean>(false);
  const { logout } = useAuth();
  const classes = useStyles();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    if (name.length < 3) {
      toast.error(Persian.titleInvalid, {
        position: toast.POSITION.BOTTOM_CENTER,
      });
    } else {
      await addPeriod(name, props.match.params.url).then(async (res) => {
        if (res.status === 'SUCCESS') {
          props.history.push(
            `/admin/competitions/${props.match.params.url}/periods`
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
            <TextField
              id="name"
              label={Persian.name}
              fullWidth
              type="text"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setName(e.target.value)
              }
              className="input-text-white"
              disabled={loading}
              value={name}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <BiText color={Colors.white} />
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

export default AddPeriod;
