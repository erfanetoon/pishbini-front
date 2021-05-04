import Api from './api';
import Persian from '../constants/persian';
import { toast } from 'react-toastify';
import { Output } from './../constants/interfaces';

export const getPeriod = async (id: string): Promise<Output> => {
  var result: Output = { status: 'FAILED' };
  let query = {
    query: `
    query getPeriod($id: String!) {
              period(id: $id){
                status
                message
                period {
                  id
                  name
                }
              }
            }
      `,
    variables: {
      id: id,
    },
  };
  await Api.post('', JSON.stringify(query))
    .then((res) => {
      if (res.data.data && res.data.data.period) {
        if (res.data.data.period.status === 'SUCCESS') {
          result = {
            status: res.data.data.period.status,
            period: res.data.data.period.period,
          };
        } else {
          result = {
            status: res.data.data.period.status,
          };
          toast.error(res.data.data.period.message, {
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

export const addPeriod = async (name: string, url: string): Promise<Output> => {
  var result: Output = { status: 'FAILED' };
  let query = {
    query: `
    mutation addPeriod($name: String!, $url: String!) {
        addPeriod(name: $name, url: $url) {
                status
                message
              }
            }
      `,
    variables: {
      name: name,
      url: url,
    },
  };

  await Api.post('', query)
    .then((res) => {
      if (res.data.data && res.data.data.addPeriod) {
        if (res.data.data.addPeriod.status === 'SUCCESS') {
          result = {
            status: res.data.data.addPeriod.status,
          };
          toast.success(res.data.data.addPeriod.message, {
            position: toast.POSITION.BOTTOM_CENTER,
          });
        } else {
          result = {
            status: res.data.data.addPeriod.status,
          };
          toast.error(res.data.data.addPeriod.message, {
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

export const editPeriod = async (
  id: string,
  name: string,
  url: string
): Promise<Output> => {
  var result: Output = { status: 'FAILED' };
  let query = {
    query: `
      mutation editPeriod($id: String!, $name: String!, $url: String!) {
        editPeriod(id: $id, name: $name, url: $url) {
                  status
                  message
                }
              }
        `,
    variables: {
      id: id,
      name: name,
      url: url,
    },
  };

  await Api.post('', query)
    .then((res) => {
      if (res.data.data && res.data.data.editPeriod) {
        if (res.data.data.editPeriod.status === 'SUCCESS') {
          result = {
            status: res.data.data.editPeriod.status,
          };
          toast.success(res.data.data.editPeriod.message, {
            position: toast.POSITION.BOTTOM_CENTER,
          });
        } else {
          result = {
            status: res.data.data.editPeriod.status,
          };
          toast.error(res.data.data.editPeriod.message, {
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

export const activePeriod = async (
  id: string,
  url: string
): Promise<Output> => {
  var result: Output = { status: 'FAILED' };
  let query = {
    query: `
    mutation activePeriod($id: String!, $url: String!) {
        activePeriod(id: $id, url: $url) {
                status
                message
              }
            }
      `,
    variables: {
      id: id,
      url: url,
    },
  };

  await Api.post('', query)
    .then((res) => {
      if (res.data.data && res.data.data.activePeriod) {
        if (res.data.data.activePeriod.status === 'SUCCESS') {
          result = {
            status: res.data.data.activePeriod.status,
          };
          toast.success(res.data.data.activePeriod.message, {
            position: toast.POSITION.BOTTOM_CENTER,
          });
        } else {
          result = {
            status: res.data.data.activePeriod.status,
          };
          toast.error(res.data.data.activePeriod.message, {
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

export const deletePeriod = async (
  id: string,
  url: string
): Promise<Output> => {
  var result: Output = { status: 'FAILED' };
  let query = {
    query: `
    mutation deletePeriod($id: String!, $url: String!) {
        deletePeriod(id: $id, url: $url) {
                status
                message
              }
            }
      `,
    variables: {
      id: id,
      url: url,
    },
  };

  await Api.post('', query)
    .then((res) => {
      if (res.data.data && res.data.data.deletePeriod) {
        if (res.data.data.deletePeriod.status === 'SUCCESS') {
          result = {
            status: res.data.data.deletePeriod.status,
          };
          toast.success(res.data.data.deletePeriod.message, {
            position: toast.POSITION.BOTTOM_CENTER,
          });
        } else {
          result = {
            status: res.data.data.deletePeriod.status,
          };
          toast.error(res.data.data.deletePeriod.message, {
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
