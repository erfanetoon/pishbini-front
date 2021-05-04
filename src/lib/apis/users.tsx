import Api from './api';
import Persian from '../constants/persian';
import { toast } from 'react-toastify';
import { Output } from './../constants/interfaces';

export const getUsers = async (): Promise<Output> => {
  var result: Output = { status: 'FAILED' };
  let query = {
    query: `
    query getUsers {
              users {
                status
                message
                users {
                  id
                  firstName
                  lastName
                  email
                  mobile
                  status
                }
              }
            }
      `,
  };
  await Api.post('', JSON.stringify(query))
    .then((res) => {
      if (res.data.data && res.data.data.users) {
        if (res.data.data.users.status === 'SUCCESS') {
          result = {
            status: res.data.data.users.status,
            users: res.data.data.users.users,
          };
        } else {
          result = {
            status: res.data.data.users.status,
          };
          toast.error(res.data.data.users.message, {
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

export const addUser = async (
  firstName: string,
  lastName: string,
  email: string,
  mobile: string
): Promise<Output> => {
  var result: Output = { status: 'FAILED' };
  let query = {
    query: `
      mutation addUser($firstName: String!, $lastName: String!, $email: String!, $mobile: String!) {
        addUser(firstName: $firstName, lastName: $lastName, email: $email, mobile: $mobile ) {
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
    },
  };

  await Api.post('', query)
    .then((res) => {
      if (res.data.data && res.data.data.addUser) {
        if (res.data.data.addUser.status === 'SUCCESS') {
          result = {
            status: res.data.data.addUser.status,
          };
          toast.success(res.data.data.addUser.message, {
            position: toast.POSITION.BOTTOM_CENTER,
          });
        } else {
          result = {
            status: res.data.data.addUser.status,
          };
          toast.error(res.data.data.addUser.message, {
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

export const statusUser = async (
  id: string,
  status: boolean
): Promise<Output> => {
  var result: Output = { status: 'FAILED' };
  let query = {
    query: `
    mutation statusUser($id: String!, $status: Boolean!) {
      statusUser(id: $id, status: $status) {
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
      if (res.data.data && res.data.data.statusUser) {
        if (res.data.data.statusUser.status === 'SUCCESS') {
          result = {
            status: res.data.data.statusUser.status,
          };
          toast.success(res.data.data.statusUser.message, {
            position: toast.POSITION.BOTTOM_CENTER,
          });
        } else {
          result = {
            status: res.data.data.statusUser.status,
          };
          toast.error(res.data.data.statusUser.message, {
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

export const deleteUser = async (id: string): Promise<Output> => {
  var result: Output = { status: 'FAILED' };
  let query = {
    query: `
    mutation deleteUser($id: String!) {
      deleteUser(id: $id) {
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
      if (res.data.data && res.data.data.deleteUser) {
        if (res.data.data.deleteUser.status === 'SUCCESS') {
          result = {
            status: res.data.data.deleteUser.status,
          };
          toast.success(res.data.data.deleteUser.message, {
            position: toast.POSITION.BOTTOM_CENTER,
          });
        } else {
          result = {
            status: res.data.data.deleteUser.status,
          };
          toast.error(res.data.data.deleteUser.message, {
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

export const getMatch = async (id: string): Promise<Output> => {
  var result: Output = { status: 'FAILED' };
  let query = {
    query: `
    query getMatch($id: String!) {
              match(id: $id){
                status
                message
                match {
                  id
                  home {
                    id
                    name
                    logo
                  }
                  away {
                    id
                    name
                    logo
                  }
                  matchDateTime
                  homeGoal
                  awayGoal
                  sentDateTime
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
      if (res.data.data && res.data.data.match) {
        if (res.data.data.match.status === 'SUCCESS') {
          result = {
            status: res.data.data.match.status,
            match: res.data.data.match.match,
          };
        } else {
          result = {
            status: res.data.data.match.status,
          };
          toast.error(res.data.data.match.message, {
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

export const editMatch = async (
  id: string,
  home: string,
  away: string
): Promise<Output> => {
  var result: Output = { status: 'FAILED' };
  let query = {
    query: `
      mutation editMatch($id: String!, $home: String!, $away: String!) {
        editMatch(id: $id, home: $home, away: $away) {
                  status
                  message
                }
              }
        `,
    variables: {
      id: id,
      home: home,
      away: away,
    },
  };

  await Api.post('', query)
    .then((res) => {
      if (res.data.data && res.data.data.editMatch) {
        if (res.data.data.editMatch.status === 'SUCCESS') {
          result = {
            status: res.data.data.editMatch.status,
          };
          toast.success(res.data.data.editMatch.message, {
            position: toast.POSITION.BOTTOM_CENTER,
          });
        } else {
          result = {
            status: res.data.data.editMatch.status,
          };
          toast.error(res.data.data.editMatch.message, {
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

export const deleteMatch = async (id: string): Promise<Output> => {
  var result: Output = { status: 'FAILED' };
  let query = {
    query: `
    mutation deleteMatch($id: String!) {
      deleteMatch(id: $id) {
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
      if (res.data.data && res.data.data.deleteMatch) {
        if (res.data.data.deleteMatch.status === 'SUCCESS') {
          result = {
            status: res.data.data.deleteMatch.status,
          };
          toast.success(res.data.data.deleteMatch.message, {
            position: toast.POSITION.BOTTOM_CENTER,
          });
        } else {
          result = {
            status: res.data.data.deleteMatch.status,
          };
          toast.error(res.data.data.deleteMatch.message, {
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

export const submitScore = async (
  id: string,
  url: string,
  homeGoal: number,
  awayGoal: number
): Promise<Output> => {
  var result: Output = { status: 'FAILED' };
  let query = {
    query: `
      mutation submitScore($id: String!, $url: String!, $homeGoal: Int!, $awayGoal: Int!) {
        submitScore(id: $id, url: $url, homeGoal: $homeGoal, awayGoal: $awayGoal) {
                  status
                  message
                }
              }
        `,
    variables: {
      id: id,
      url: url,
      homeGoal: homeGoal,
      awayGoal: awayGoal,
    },
  };

  await Api.post('', query)
    .then((res) => {
      if (res.data.data && res.data.data.submitScore) {
        if (res.data.data.submitScore.status === 'SUCCESS') {
          result = {
            status: res.data.data.submitScore.status,
          };
          toast.success(res.data.data.submitScore.message, {
            position: toast.POSITION.BOTTOM_CENTER,
          });
        } else {
          result = {
            status: res.data.data.submitScore.status,
          };
          toast.error(res.data.data.submitScore.message, {
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

export const submitTime = async (
  id: string,
  matchDateTime: string
): Promise<Output> => {
  var result: Output = { status: 'FAILED' };
  let query = {
    query: `
      mutation submitTime($id: String!, $matchDateTime: String!) {
        submitTime(id: $id, matchDateTime: $matchDateTime) {
                  status
                  message
                }
              }
        `,
    variables: {
      id: id,
      matchDateTime: matchDateTime,
    },
  };

  await Api.post('', query)
    .then((res) => {
      if (res.data.data && res.data.data.submitTime) {
        if (res.data.data.submitTime.status === 'SUCCESS') {
          result = {
            status: res.data.data.submitTime.status,
          };
          toast.success(res.data.data.submitTime.message, {
            position: toast.POSITION.BOTTOM_CENTER,
          });
        } else {
          result = {
            status: res.data.data.submitTime.status,
          };
          toast.error(res.data.data.submitTime.message, {
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
