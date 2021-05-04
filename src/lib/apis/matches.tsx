import Api from './api';
import Persian from '../constants/persian';
import { toast } from 'react-toastify';
import { Output } from './../constants/interfaces';

export const getAdminMatches = async (period: string): Promise<Output> => {
  var result: Output = { status: 'FAILED' };
  let query = {
    query: `
    query getAdminMatches($period: String!) {
              adminMatches(period: $period){
                status
                message
                matches {
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
      period: period,
    },
  };
  await Api.post('', JSON.stringify(query))
    .then((res) => {
      if (res.data.data && res.data.data.adminMatches) {
        if (res.data.data.adminMatches.status === 'SUCCESS') {
          result = {
            status: res.data.data.adminMatches.status,
            matches: res.data.data.adminMatches.matches,
          };
        } else {
          result = {
            status: res.data.data.adminMatches.status,
          };
          toast.error(res.data.data.adminMatches.message, {
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

export const addMatch = async (
  home: string,
  away: string,
  period: string,
  url: string
): Promise<Output> => {
  var result: Output = { status: 'FAILED' };
  let query = {
    query: `
      mutation addMatch($home: String!, $away: String!, $period: String!, $url: String!) {
        addMatch(home: $home, away: $away, period: $period, url: $url ) {
                  status
                  message
                }
              }
        `,
    variables: {
      home: home,
      away: away,
      period: period,
      url: url,
    },
  };

  await Api.post('', query)
    .then((res) => {
      if (res.data.data && res.data.data.addMatch) {
        if (res.data.data.addMatch.status === 'SUCCESS') {
          result = {
            status: res.data.data.addMatch.status,
          };
          toast.success(res.data.data.addMatch.message, {
            position: toast.POSITION.BOTTOM_CENTER,
          });
        } else {
          result = {
            status: res.data.data.addMatch.status,
          };
          toast.error(res.data.data.addMatch.message, {
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
