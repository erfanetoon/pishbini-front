import Api from './api';
import Persian from '../constants/persian';
import { toast } from 'react-toastify';
import { Output } from './../constants/interfaces';

export const changePassword = async (
  currentPassword: string,
  newPassword: string
): Promise<Output> => {
  var result: Output = { status: 'FAILED' };
  let query = {
    query: `
    mutation changePassword($currentPassword: String!, $newPassword: String!) {
        changePassword(currentPassword: $currentPassword, newPassword: $newPassword) {
                status
                message
              }
            }
      `,
    variables: {
      currentPassword: currentPassword,
      newPassword: newPassword,
    },
  };
  await Api.post('', JSON.stringify(query))
    .then((res) => {
      if (res.data.data && res.data.data.changePassword) {
        if (res.data.data.changePassword.status === 'SUCCESS') {
          result = {
            status: res.data.data.changePassword.status,
          };
          toast.success(res.data.data.changePassword.message, {
            position: toast.POSITION.BOTTOM_CENTER,
          });
        } else {
          result = {
            status: res.data.data.changePassword.status,
          };
          toast.error(res.data.data.changePassword.message, {
            position: toast.POSITION.BOTTOM_CENTER,
          });
        }
      } else if (res.data.errors) {
        toast.error(Persian.technicalProblem, {
          position: toast.POSITION.BOTTOM_CENTER,
        });
        result = {
          status: 'FAILED',
        };
      }
    })
    .catch((err) => {
      toast.error(Persian.technicalProblem, {
        position: toast.POSITION.BOTTOM_CENTER,
      });
      result = {
        status: 'FAILED',
      };
    });
  return result;
};

export const editInformation = async (
  firstName: string,
  lastName: string,
  mobile: string
): Promise<Output> => {
  var result: Output = { status: 'FAILED' };
  let query = {
    query: `
    mutation editInformation($firstName: String!, $lastName: String!, $mobile: String!) {
      editInformation(firstName: $firstName, lastName: $lastName, mobile: $mobile) {
                status
                message
                user {
                  id
              firstName
              lastName
              mobile
              email
              avatar
              status
              role
              titles
              competitions{
                image
                title
                isFinish
                url
                activePeriod {
                  name
                }
                championPredictionDateTime
              }
              pay {
                competition {
                  url
                }
                status
              }
                }
              }
            }
      `,
    variables: {
      firstName: firstName,
      lastName: lastName,
      mobile: mobile,
    },
  };
  await Api.post('', JSON.stringify(query))
    .then((res) => {
      if (res.data.data && res.data.data.editInformation) {
        if (res.data.data.editInformation.status === 'SUCCESS') {
          result = {
            status: res.data.data.editInformation.status,
            user: res.data.data.editInformation.user,
          };
          toast.success(res.data.data.editInformation.message, {
            position: toast.POSITION.BOTTOM_CENTER,
          });
        } else {
          result = {
            status: res.data.data.editInformation.status,
          };
          toast.error(res.data.data.editInformation.message, {
            position: toast.POSITION.BOTTOM_CENTER,
          });
        }
      } else if (res.data.errors) {
        toast.error(Persian.technicalProblem, {
          position: toast.POSITION.BOTTOM_CENTER,
        });
        result = {
          status: 'FAILED',
        };
      }
    })
    .catch((err) => {
      toast.error(Persian.technicalProblem, {
        position: toast.POSITION.BOTTOM_CENTER,
      });
      result = {
        status: 'FAILED',
      };
    });
  return result;
};

export const editJob = async (
  title: string,
  description: string,
  phone: string,
  status: boolean,
  link: string
): Promise<Output> => {
  var result: Output = { status: 'FAILED' };
  let query = {
    query: `
    mutation editJob($title: String!, $description: String!, $phone: String!, $link: String!, $status: Boolean!) {
      editJob(title: $title, description: $description, phone: $phone, link: $link, status: $status) {
                status
                message
                job {
                  title
                  description
                  phone
                  link
                  status
                }
              }
            }
      `,
    variables: {
      title: title,
      description: description,
      phone: phone,
      link: link,
      status: status,
    },
  };
  await Api.post('', JSON.stringify(query))
    .then((res) => {
      if (res.data.data && res.data.data.editJob) {
        if (res.data.data.editJob.status === 'SUCCESS') {
          result = {
            status: res.data.data.editJob.status,
            user: res.data.data.editJob.job,
          };
          toast.success(res.data.data.editJob.message, {
            position: toast.POSITION.BOTTOM_CENTER,
          });
        } else {
          result = {
            status: res.data.data.editJob.status,
          };
          toast.error(res.data.data.editJob.message, {
            position: toast.POSITION.BOTTOM_CENTER,
          });
        }
      } else if (res.data.errors) {
        toast.error(Persian.technicalProblem, {
          position: toast.POSITION.BOTTOM_CENTER,
        });
        result = {
          status: 'FAILED',
        };
      }
    })
    .catch((err) => {
      toast.error(Persian.technicalProblem, {
        position: toast.POSITION.BOTTOM_CENTER,
      });
      result = {
        status: 'FAILED',
      };
    });
  return result;
};

export const uploadAvatar = async (avatar: File): Promise<Output> => {
  var result: Output = { status: 'FAILED' };
  let query = {
    query: `
    mutation uploadAvatar($avatar: Upload!) {
      uploadAvatar(avatar: $avatar) {
                status
                message
                user {
                  id
              firstName
              lastName
              mobile
              email
              avatar
              status
              role
              titles
              competitions{
                image
                title
                isFinish
                url
                activePeriod {
                  name
                }
                championPredictionDateTime
              }
              pay {
                competition {
                  url
                }
                status
              }
                }
              }
            }
      `,
    variables: {
      avatar: avatar,
    },
  };

  let map = {
    0: ['variables.avatar'],
  };

  let fd = new FormData();
  fd.append('operations', JSON.stringify(query));
  fd.append('map', JSON.stringify(map));
  fd.append('0', avatar, avatar.name);

  await Api.post('', fd)
    .then((res) => {
      if (res.data.data && res.data.data.uploadAvatar) {
        if (res.data.data.uploadAvatar.status === 'SUCCESS') {
          result = {
            status: res.data.data.uploadAvatar.status,
            user: res.data.data.uploadAvatar.user,
          };
          toast.success(res.data.data.uploadAvatar.message, {
            position: toast.POSITION.BOTTOM_CENTER,
          });
        } else {
          result = {
            status: res.data.data.uploadAvatar.status,
          };
          toast.error(res.data.data.uploadAvatar.message, {
            position: toast.POSITION.BOTTOM_CENTER,
          });
        }
      } else if (res.data.errors) {
        toast.error(Persian.technicalProblem, {
          position: toast.POSITION.BOTTOM_CENTER,
        });
        result = {
          status: 'FAILED',
        };
      }
    })
    .catch((err) => {
      toast.error(Persian.technicalProblem, {
        position: toast.POSITION.BOTTOM_CENTER,
      });
      result = {
        status: 'FAILED',
      };
    });
  return result;
};
