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
import Persian from './../../../../lib/constants/persian';
import { makeStyles, Theme } from '@material-ui/core/styles';
import { Colors } from './../../../../theme';
import Crop from '../../../../components/crop/crop';
import { SiMicrosoftteams } from 'react-icons/si';
import { toast } from 'react-toastify';

const useStyles = makeStyles((theme: Theme) => ({
  divider: {
    backgroundColor: Colors.dividerColor,
  },
}));

const AddTeam: React.FC<RouteComponentProps> = (props) => {
  const [name, setName] = React.useState<string>('');
  const [image, setImage] = React.useState<any>(undefined);
  const [step, setStep] = React.useState<number>(1);
  const [loading, setLoading] = React.useState<boolean>(false);
  const classes = useStyles();

  const handleFirstStep = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    if (name.length < 3) {
      toast.error(Persian.titleInvalid, {
        position: toast.POSITION.BOTTOM_CENTER,
      });
    } else {
      setStep(2);
    }
    setLoading(false);
  };

  const handleUploadLogo = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setImage(e.target.files[0]);
    }
  };

  return (
    <Box>
      <Box mb={4}>
        <Grid container justify="space-between" alignItems="center">
          <Typography variant="h6" component="h1">
            {Persian.addTeam}
          </Typography>
        </Grid>
        <Box my={2}>
          <Divider className={classes.divider} />
        </Box>
      </Box>
      {step === 1 && (
        <Box
          bgcolor={Colors.backgroundOpacity}
          borderRadius={16}
          p={4}
          boxShadow={8}
          mb={4}
          color={Colors.white}
        >
          <form onSubmit={handleFirstStep}>
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
                      <SiMicrosoftteams color={Colors.white} />
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
      )}
      {step === 2 && (
        <Box>
          <Box textAlign="center" mb={3}>
            <input
              accept="image/*"
              className="d-none"
              id="raised-button-file"
              type="file"
              onChange={(e) => handleUploadLogo(e)}
            />
            <label htmlFor="raised-button-file">
              <Button variant="contained" color="secondary" component="span">
                {Persian.uploadAvatar}
              </Button>
            </label>
          </Box>
          {image && (
            <Crop
              type="TEAM"
              data={{ name }}
              image={image}
              history={props.history}
            />
          )}
        </Box>
      )}
    </Box>
  );
};

export default AddTeam;
