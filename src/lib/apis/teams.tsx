import Api from './api';
import Persian from '../constants/persian';
import { toast } from 'react-toastify';
import { Output } from './../constants/interfaces';

export const getTeams = async (url?: string): Promise<Output> => {
  var result: Output = { status: 'FAILED' };
  let query = {
    query: `
    query getTeams($url: String) {
              teams(url: $url){
                status
                message
                teams {
                  id
                  name
                  logo
                  status
                }
              }
            }
      `,
    variables: {
      url: url,
    },
  };
  await Api.post('', JSON.stringify(query))
    .then((res) => {
      if (res.data.data && res.data.data.teams) {
        if (res.data.data.teams.status === 'SUCCESS') {
          result = {
            status: res.data.data.teams.status,
            teams: res.data.data.teams.teams,
          };
        } else {
          result = {
            status: res.data.data.teams.status,
          };
          toast.error(res.data.data.teams.message, {
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

export const addTeam = async (logo: File, name: string): Promise<Output> => {
  var result: Output = { status: 'FAILED' };
  let query = {
    query: `
    mutation addTeam($logo: Upload!, $name: String!) {
      addTeam(logo: $logo, name: $name) {
                status
                message
              }
            }
      `,
    variables: {
      logo: logo,
      name: name,
    },
  };

  let map = {
    0: ['variables.logo'],
  };

  let fd = new FormData();
  fd.append('operations', JSON.stringify(query));
  fd.append('map', JSON.stringify(map));
  fd.append('0', logo, logo.name);

  await Api.post('', fd)
    .then((res) => {
      if (res.data.data && res.data.data.addTeam) {
        if (res.data.data.addTeam.status === 'SUCCESS') {
          result = {
            status: res.data.data.addTeam.status,
          };
          toast.success(res.data.data.addTeam.message, {
            position: toast.POSITION.BOTTOM_CENTER,
          });
        } else {
          result = {
            status: res.data.data.addTeam.status,
          };
          toast.error(res.data.data.addTeam.message, {
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

export const statusTeam = async (
  id: string,
  status: boolean
): Promise<Output> => {
  var result: Output = { status: 'FAILED' };
  let query = {
    query: `
    mutation statusTeam($id: String!, $status: Boolean!) {
      statusTeam(id: $id, status: $status) {
                status
                message
              }
            }
      `,
    variables: {
      id: id,
      status: status,
    },
  };

  await Api.post('', query)
    .then((res) => {
      if (res.data.data && res.data.data.statusTeam) {
        if (res.data.data.statusTeam.status === 'SUCCESS') {
          result = {
            status: res.data.data.statusTeam.status,
          };
          toast.success(res.data.data.statusTeam.message, {
            position: toast.POSITION.BOTTOM_CENTER,
          });
        } else {
          result = {
            status: res.data.data.statusTeam.status,
          };
          toast.error(res.data.data.statusTeam.message, {
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

export const deleteTeam = async (id: string): Promise<Output> => {
  var result: Output = { status: 'FAILED' };
  let query = {
    query: `
    mutation deleteTeam($id: String!) {
      deleteTeam(id: $id) {
                status
                message
              }
            }
      `,
    variables: {
      id: id,
    },
  };

  await Api.post('', query)
    .then((res) => {
      if (res.data.data && res.data.data.deleteTeam) {
        if (res.data.data.deleteTeam.status === 'SUCCESS') {
          result = {
            status: res.data.data.deleteTeam.status,
          };
          toast.success(res.data.data.deleteTeam.message, {
            position: toast.POSITION.BOTTOM_CENTER,
          });
        } else {
          result = {
            status: res.data.data.deleteTeam.status,
          };
          toast.error(res.data.data.deleteTeam.message, {
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
