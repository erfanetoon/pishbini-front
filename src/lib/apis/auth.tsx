import Api from './api';
import Persian from '../constants/persian';
import { toast } from 'react-toastify';
import { Output } from './../constants/interfaces';

export const login = async (
  email: string,
  password: string
): Promise<Output> => {
  var result: Output = { status: 'FAILED' };
  let query = {
    query: `
      mutation login($email: String!, $password: String!) {
          login(email: $email, password: $password) {
              status
              message
              token
              settings {
                servicePrice
              }
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
              job {
                title
                description
                status
                phone
                link
              }
          }
      }
    `,
    variables: {
      email: email,
      password: password,
    },
  };
  await Api.post('', JSON.stringify(query))
    .then((res) => {
      if (res.data.data && res.data.data.login) {
        if (res.data.data.login.status === 'SUCCESS') {
          result = {
            status: res.data.data.login.status,
            user: res.data.data.login.user,
            token: res.data.data.login.token,
            job: res.data.data.login.job,
            settings: res.data.data.login.settings,
          };
        } else {
          result = {
            status: res.data.data.login.status,
          };
          toast.error(res.data.data.login.message, {
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

export const forget = async (email: string): Promise<Output> => {
  var result: Output = { status: 'FAILED' };
  let query = {
    query: `
      mutation forget($email: String!) {
          forget(email: $email) {
            status
            message
          }
      }
    `,
    variables: {
      email: email,
    },
  };
  await Api.post('', JSON.stringify(query))
    .then((res) => {
      if (res.data.data && res.data.data.forget) {
        if (res.data.data.forget.status === 'SUCCESS') {
          result = {
            status: res.data.data.forget.status,
            message: res.data.data.forget.message,
          };
          toast.success(res.data.data.forget.message, {
            position: toast.POSITION.BOTTOM_CENTER,
          });
        } else {
          result = {
            status: res.data.data.forget.status,
          };
          toast.error(res.data.data.forget.message, {
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

export const register = async (
  firstName: string,
  lastName: string,
  email: string,
  mobile: string,
  password: string
): Promise<Output> => {
  var result: Output = { status: 'FAILED' };
  let query = {
    query: `
      mutation register($firstName: String!, $lastName: String!, $email: String!, $mobile: String!, $password: String!) {
        register(firstName: $firstName, lastName: $lastName, email: $email, mobile: $mobile, password: $password) {
          status
          message
        }
      }
    `,
    variables: {
      firstName: firstName,
      lastName: lastName,
      email: email,
      mobile: mobile,
      password: password,
    },
  };
  await Api.post('', JSON.stringify(query))
    .then((res) => {
      if (res.data.data && res.data.data.register) {
        if (res.data.data.register.status === 'SUCCESS') {
          result = {
            status: res.data.data.register.status,
            message: res.data.data.register.message,
          };
          toast.success(res.data.data.register.message, {
            position: toast.POSITION.BOTTOM_CENTER,
          });
        } else {
          result = {
            status: res.data.data.register.status,
          };
          toast.error(res.data.data.register.message, {
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

export const getUser = async (): Promise<Output> => {
  var result: Output = { status: 'FAILED' };
  let query = {
    query: `
      query getUser {
          user {
            status
            message
            settings {
              servicePrice
            }
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
            job {
              title
              description
              status
              phone
              link
            }
          }
      }
    `,
  };
  await Api.post('', JSON.stringify(query))
    .then((res) => {
      if (res.data.data && res.data.data.user) {
        if (res.data.data.user.status === 'SUCCESS') {
          result = {
            status: res.data.data.user.status,
            user: res.data.data.user.user,
            job: res.data.data.user.job,
            settings: res.data.data.user.settings,
          };
        } else {
          result = {
            status: res.data.data.user.status,
          };
          toast.error(res.data.data.user.message, {
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
