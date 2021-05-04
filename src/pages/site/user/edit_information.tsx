import React from 'react';
import {
  Box,
  Button,
  CircularProgress,
  Grid,
  InputAdornment,
  TextField,
  Switch,
  FormControlLabel,
} from '@material-ui/core';
import { Colors } from './../../../theme';
import Persian from './../../../lib/constants/persian';
import { useAuth } from './../../../lib/contexts/auth';
import { FaKey } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { editInformation } from '../../../lib/apis/user';
import { RouteComponentProps } from 'react-router-dom';
import { editJob } from './../../../lib/apis/user';
import Crop from '../../../components/crop/crop';
import Global from './../../../global';
import { makeStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) => ({
  image: {
    borderRadius: '50%',
  },
}));

const EditInformation: React.FC<RouteComponentProps> = (props) => {
  const [firstName, setFirstName] = React.useState<string>('');
  const [lastName, setLastName] = React.useState<string>('');
  const [email, setEmail] = React.useState<string>('');
  const [mobile, setMobile] = React.useState<string>('');
  const [title, setTitle] = React.useState<string>('');
  const [description, setDescription] = React.useState<string>('');
  const [phone, setPhone] = React.useState<string>('');
  const [link, setLink] = React.useState<string>('');
  const [status, setStatus] = React.useState<boolean>(false);
  const [loading, setLoading] = React.useState<boolean>(true);
  const [image, setImage] = React.useState<any>(undefined);
  const { user, job, logout, setUser, setJob } = useAuth();
  const classes = useStyles();

  React.useEffect(() => {
    if (user) {
      setFirstName(user.firstName);
      setLastName(user.lastName);
      setEmail(user.email);
      setMobile(user.mobile);
    }
    if (job) {
      setTitle(job.title);
      setPhone(job.phone);
      setLink(job.link);
      setStatus(job.status);
      setDescription(job.description);
    }
    setLoading(false);
  }, []);

  const handleInformationSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();
    setLoading(true);

    if (firstName.length < 3) {
      toast.error(Persian.firstNameInvalid, {
        position: toast.POSITION.BOTTOM_CENTER,
      });
    } else if (lastName.length < 3) {
      toast.error(Persian.lastNameInvalid, {
        position: toast.POSITION.BOTTOM_CENTER,
      });
    } else if (mobile.length > 11 || mobile.length < 11) {
      toast.error(Persian.mobileInvalid, {
        position: toast.POSITION.BOTTOM_CENTER,
      });
    } else if (!(Number(mobile.charAt(0)) === 0)) {
      toast.error(Persian.mobileInvalid, {
        position: toast.POSITION.BOTTOM_CENTER,
      });
    } else if (
      firstName === user?.firstName &&
      lastName === user?.lastName &&
      mobile === user?.mobile
    ) {
    } else {
      await editInformation(firstName, lastName, mobile).then(async (res) => {
        if (res.status === 'SUCCESS') {
          setUser(res.user);
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
    }
    setLoading(false);
  };

  const handleJobSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    if (title.length < 3) {
      toast.error(Persian.titleInvalid, {
        position: toast.POSITION.BOTTOM_CENTER,
      });
      setLoading(false);
    } else if (description.length < 15) {
      toast.error(Persian.descriptionInvalid, {
        position: toast.POSITION.BOTTOM_CENTER,
      });
      setLoading(false);
    } else if (link.length < 5) {
      toast.error(Persian.linkInvalid, {
        position: toast.POSITION.BOTTOM_CENTER,
      });
      setLoading(false);
    } else if (phone.length > 11 || phone.length < 11) {
      toast.error(Persian.mobileInvalid, {
        position: toast.POSITION.BOTTOM_CENTER,
      });
      setLoading(false);
    } else if (!(Number(phone.charAt(0)) === 0)) {
      toast.error(Persian.mobileInvalid, {
        position: toast.POSITION.BOTTOM_CENTER,
      });
      setLoading(false);
    } else if (
      title === job?.title &&
      description === job?.description &&
      phone === job?.phone &&
      status === job?.status &&
      link === job?.link
    ) {
      setLoading(false);
    } else {
      await editJob(title, description, phone, status, link).then(
        async (res) => {
          if (res.status === 'SUCCESS') {
            setJob(res.job);
            setLoading(false);
          } else if (res.status === 'LOGOUT') {
            if (logout) {
              await logout().then(async (res) => {
                if (res.status === 'SUCCESS') {
                  await props.history.push('/login');
                }
              });
            }
          } else {
            setLoading(false);
          }
        }
      );
    }
  };

  const handleUploadAvatar = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setImage(e.target.files[0]);
    }
  };

  return (
    <React.Fragment>
      <Box textAlign="center" mb={3}>
        <input
          accept="image/*"
          className="d-none"
          id="raised-button-file"
          type="file"
          onChange={(e) => handleUploadAvatar(e)}
        />
        <label htmlFor="raised-button-file">
          <img
            className={classes.image}
            width={100}
            src={Global.API_BASE_URL + user?.avatar}
            alt={user?.firstName + ' ' + user?.lastName}
          />
          <br />
          <Button variant="contained" color="secondary" component="span">
            {Persian.uploadAvatar}
          </Button>
        </label>
      </Box>
      {image && <Crop type="AVATAR" image={image} history={props.history} />}
      <Box
        bgcolor={Colors.backgroundOpacity}
        borderRadius={16}
        p={4}
        boxShadow={8}
        mb={4}
        color={Colors.white}
      >
        <form onSubmit={handleInformationSubmit}>
          <Box mb={4}>
            <Grid container spacing={4}>
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
                        <FaKey color={Colors.white} />
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
                        <FaKey color={Colors.white} />
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
            </Grid>
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
                    <FaKey color={Colors.white} />
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
              type="text"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setEmail(e.target.value)
              }
              className="input-text-white"
              disabled
              value={email}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <FaKey color={Colors.white} />
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
      <Box
        bgcolor={Colors.backgroundOpacity}
        borderRadius={16}
        p={4}
        boxShadow={8}
        color={Colors.white}
      >
        <form onSubmit={handleJobSubmit}>
          <Box mb={4}>
            <TextField
              id="title"
              label={Persian.titleText}
              fullWidth
              type="text"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setTitle(e.target.value)
              }
              className="input-text-white"
              disabled={loading}
              value={title}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <FaKey color={Colors.white} />
                  </InputAdornment>
                ),
              }}
            />
          </Box>
          <Box mb={4}>
            <TextField
              id="description"
              label={Persian.description}
              fullWidth
              multiline
              type="text"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setDescription(e.target.value)
              }
              className="input-text-white"
              value={description}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <FaKey color={Colors.white} />
                  </InputAdornment>
                ),
              }}
            />
          </Box>
          <Box mb={4}>
            <Grid container spacing={4}>
              <Grid item xs={6}>
                <TextField
                  id="link"
                  label={Persian.link}
                  fullWidth
                  type="text"
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setLink(e.target.value)
                  }
                  className="input-text-white"
                  disabled={loading}
                  value={link}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <FaKey color={Colors.white} />
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  id="phone"
                  label={Persian.phone}
                  fullWidth
                  type="text"
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setPhone(e.target.value)
                  }
                  className="input-text-white"
                  disabled={loading}
                  value={phone}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <FaKey color={Colors.white} />
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
            </Grid>
          </Box>
          <Box mb={4} textAlign="right">
            <FormControlLabel
              control={
                <Switch
                  checked={status}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setStatus(!status)
                  }
                  color="secondary"
                />
              }
              label={Persian.status}
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
    </React.Fragment>
  );
};

export default EditInformation;
