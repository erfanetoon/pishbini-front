import React, { useState } from 'react';
import Cropper from 'react-cropper';
import { Button, Box, CircularProgress } from '@material-ui/core';
import { uploadAvatar } from '../../lib/apis/user';
import Persian from './../../lib/constants/persian';
import { useAuth } from './../../lib/contexts/auth';
import { History } from 'history';
import { addTeam } from '../../lib/apis/teams';
import { addCompetition } from './../../lib/apis/competition';
import { TeamInterface } from './../../lib/constants/interfaces';

interface props {
  image: File;
  type: 'AVATAR' | 'TEAM' | 'COMPETITION';
  history: History;
  data?: {
    name?: string;
    title?: string;
    price?: string;
    url?: string;
    selectedTeams?: TeamInterface[];
    championPredictionDateTime?: Date;
  };
}

const Crop: React.FC<props> = (props) => {
  const [image, setImage] = useState<string | null>(null);
  const [cropData, setCropData] = useState('#');
  const [cropper, setCropper] = useState<any>();
  const [loading, setLoading] = useState<boolean>(false);
  const { setUser, logout, user } = useAuth();

  React.useEffect(() => {
    const reader = new FileReader();
    reader.onload = () => {
      setImage(reader.result as any);
    };
    reader.readAsDataURL(props.image);
  });

  const getCropData = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    if (typeof cropper !== 'undefined') {
      if (props.type === 'AVATAR') {
        await fetch(cropper.getCroppedCanvas().toDataURL())
          .then((res) => res.blob())
          .then(async (blob) => {
            if (user?.id) {
              const file = new File([blob], `${Math.random() + user.id}.jpg`, {
                type: 'image/jpg',
              });
              await uploadAvatar(file).then(async (res) => {
                if (res.status === 'SUCCESS') {
                  setUser(res.user);
                  setLoading(false);
                  await props.history.push('/');
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
              });
            }
          });
      } else if (props.type === 'TEAM') {
        await fetch(cropper.getCroppedCanvas().toDataURL())
          .then((res) => res.blob())
          .then(async (blob) => {
            if (props.data?.name) {
              const file = new File([blob], `${props.data.name}.png`, {
                type: 'image/png',
              });
              await addTeam(file, props.data.name).then(async (res) => {
                if (res.status === 'SUCCESS') {
                  props.history.push('/admin/teams');
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
                  setLoading(false);
                }
              });
            }
          });
      } else if (props.type === 'COMPETITION') {
        await fetch(cropper.getCroppedCanvas().toDataURL())
          .then((res) => res.blob())
          .then(async (blob) => {
            if (
              props.data?.title &&
              props.data?.url &&
              props.data?.championPredictionDateTime &&
              props.data?.selectedTeams
            ) {
              const file = new File([blob], `${props.data.url}.jpg`, {
                type: 'image/jpg',
              });
              await addCompetition(
                props.data.title,
                props.data?.price ? props.data?.price : '',
                props.data.url,
                props.data.selectedTeams,
                props.data.championPredictionDateTime.toString(),
                file
              ).then(async (res) => {
                if (res.status === 'SUCCESS') {
                  props.history.push('/admin/competitions');
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
          });
      }
    }
  };

  return (
    <Box>
      {image && (
        <Cropper
          style={{ height: 400, width: '100%', borderRadius: '16px' }}
          src={image}
          aspectRatio={props.type === 'COMPETITION' ? 16 / 9 : 1 / 1}
          viewMode={1}
          guides={true}
          minCropBoxHeight={
            props.type === 'TEAM'
              ? 250
              : props.type === 'AVATAR'
              ? 10
              : props.type === 'COMPETITION'
              ? 640
              : 10
          }
          minCropBoxWidth={
            props.type === 'TEAM'
              ? 250
              : props.type === 'AVATAR'
              ? 10
              : props.type === 'COMPETITION'
              ? 360
              : 10
          }
          background={false}
          responsive={true}
          autoCropArea={1}
          checkOrientation={false}
          onInitialized={(instance) => {
            setCropper(instance);
          }}
          disabled={loading}
        />
      )}
      <Box my={3} textAlign="center">
        <Button
          onClick={getCropData}
          variant="contained"
          color="primary"
          disabled={loading}
        >
          {loading ? <CircularProgress size={19} /> : Persian.submit}
        </Button>
      </Box>
    </Box>
  );
};

export default Crop;
