import {
  Button,
  InputAdornment,
  TextField,
  Box,
  CircularProgress,
} from '@material-ui/core';
import React from 'react';
import { FaKey } from 'react-icons/fa';
import Persian from '../../../lib/constants/persian';
import { useAuth } from '../../../lib/contexts/auth';
import { toast } from 'react-toastify';
import { RouteComponentProps } from 'react-router-dom';
import { Colors } from './../../../theme';
import { changePassword } from './../../../lib/apis/user';

const ChangePassword: React.FC<RouteComponentProps> = (props) => {
  const [currentPassword, setCurrentPassword] = React.useState<string>('');
  const [newPassword, setNewPassword] = React.useState<string>('');
  const [confirmNewPassword, setConfirmNewPassword] = React.useState<string>(
    ''
  );
  const [loading, setLoading] = React.useState<boolean>(false);
  const { logout } = useAuth();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    if (currentPassword.length < 6) {
      toast.error(Persian.currentPasswordInvalid, {
        position: toast.POSITION.BOTTOM_CENTER,
      });
    } else if (newPassword.length < 6) {
      toast.error(Persian.newPasswordInvalid, {
        position: toast.POSITION.BOTTOM_CENTER,
      });
    } else if (confirmNewPassword.length < 6) {
      toast.error(Persian.confirmNewPasswordInvalid, {
        position: toast.POSITION.BOTTOM_CENTER,
      });
    } else if (!(newPassword === confirmNewPassword)) {
      toast.error(Persian.newPasswordsNotMatch, {
        position: toast.POSITION.BOTTOM_CENTER,
      });
    } else {
      await changePassword(currentPassword, newPassword).then(async (res) => {
        if (res.status === 'SUCCESS' || res.status === 'LOGOUT') {
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
    <Box
      bgcolor={Colors.backgroundOpacity}
      borderRadius={16}
      p={4}
      boxShadow={8}
      color={Colors.white}
    >
      <form onSubmit={handleSubmit}>
        <Box mb={4}>
          <TextField
            id="currentPassword"
            label={Persian.currentPassword}
            fullWidth
            type="password"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setCurrentPassword(e.target.value)
            }
            className="input-text-white"
            disabled={loading}
            defaultValue={currentPassword}
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
            id="newPassword"
            label={Persian.newPassword}
            fullWidth
            type="password"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setNewPassword(e.target.value)
            }
            className="input-text-white"
            disabled={loading}
            defaultValue={newPassword}
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
            id="confirmNewPassword"
            label={Persian.confirmNewPassword}
            fullWidth
            type="password"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setConfirmNewPassword(e.target.value)
            }
            className="input-text-white"
            disabled={loading}
            defaultValue={confirmNewPassword}
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
  );
};

export default ChangePassword;
