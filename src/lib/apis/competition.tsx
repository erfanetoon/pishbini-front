import Api from './api';
import Persian from '../constants/persian';
import { toast } from 'react-toastify';
import { Output, TeamInterface } from './../constants/interfaces';

export const getCompetitions = async (): Promise<Output> => {
  var result: Output = { status: 'FAILED' };
  let query = {
    query: `
    query getCompetitions {
              competitions{
                status
                message
                competitions {
                  id
                  price
                  image
                  champion {
                    name
                    logo
                  }
                  winner {
                    firstName
                    lastName
                    avatar
                  }
                  title
                  isFinish
                  url
                  activePeriod {
                    name
                  }
                  championPredictionDateTime
                }
              }
            }
      `,
  };
  await Api.post('', JSON.stringify(query))
    .then((res) => {
      if (res.data.data && res.data.data.competitions) {
        if (res.data.data.competitions.status === 'SUCCESS') {
          result = {
            status: res.data.data.competitions.status,
            competitions: res.data.data.competitions.competitions,
          };
        } else {
          result = {
            status: res.data.data.competitions.status,
          };
          toast.error(res.data.data.competitions.message, {
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

export const getCompetition = async (url: string): Promise<Output> => {
  var result: Output = { status: 'FAILED' };
  let query = {
    query: `
    query getCompetition($url: String!) {
              competition(url: $url){
                status
                message
                competition {
                  id
                  price
                  image
                  champion {
                    name
                    logo
                  }
                  winner {
                    firstName
                    lastName
                    avatar
                  }
                  title
                  isFinish
                  url
                  championPredictionDateTime
                  activePeriod {
                    name
                  }
                  teams {
                    id
                    name
                    logo
                    status
                  }
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
      if (res.data.data && res.data.data.competition) {
        if (res.data.data.competition.status === 'SUCCESS') {
          result = {
            status: res.data.data.competition.status,
            competition: res.data.data.competition.competition,
          };
        } else {
          result = {
            status: res.data.data.competition.status,
          };
          toast.error(res.data.data.competition.message, {
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

export const getPeriods = async (url: string): Promise<Output> => {
  var result: Output = { status: 'FAILED' };
  let query = {
    query: `
    query getPeriods($url: String!) {
              periods(url: $url){
                status
                message
                periods {
                  id
                  name
                  competition {
                    id
                    url
                    isFinish
                  }
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
      if (res.data.data && res.data.data.periods) {
        if (res.data.data.periods.status === 'SUCCESS') {
          result = {
            status: res.data.data.periods.status,
            periods: res.data.data.periods.periods,
          };
        } else {
          result = {
            status: res.data.data.periods.status,
          };
          toast.error(res.data.data.periods.message, {
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

export const getMatches = async (period: string): Promise<Output> => {
  var result: Output = { status: 'FAILED' };
  let query = {
    query: `
    query getMatches($period: String!) {
              matches(period: $period){
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
                  myPrediction {
                    id
                    homeGoal
                    awayGoal
                  }
                  myPoint
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
      if (res.data.data && res.data.data.matches) {
        if (res.data.data.matches.status === 'SUCCESS') {
          result = {
            status: res.data.data.matches.status,
            matches: res.data.data.matches.matches,
          };
        } else {
          result = {
            status: res.data.data.matches.status,
          };
          toast.error(res.data.data.matches.message, {
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

export const getTable = async (url: string): Promise<Output> => {
  var result: Output = { status: 'FAILED' };
  let query = {
    query: `
    query getTable($url: String!) {
              table(url: $url){
                status
                message
                table {
                  user {
                    id
                    firstName
                    lastName
                    avatar
                  }
                  point
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
      if (res.data.data && res.data.data.table) {
        if (res.data.data.table.status === 'SUCCESS') {
          result = {
            status: res.data.data.table.status,
            table: res.data.data.table.table,
          };
        } else {
          result = {
            status: res.data.data.table.status,
          };
          toast.error(res.data.data.table.message, {
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

export const getTableDetails = async (
  url: string,
  id: string
): Promise<Output> => {
  var result: Output = { status: 'FAILED' };
  let query = {
    query: `
    query getTableDetails($url: String!, $userId: String!) {
              tableDetails(url: $url, userId: $userId){
                status
                message
                tableDetails {
                  exact
                  difference
                  winner
                  wrong
                  empty
                  champion
                }
              }
            }
      `,
    variables: {
      url: url,
      userId: id,
    },
  };
  await Api.post('', JSON.stringify(query))
    .then((res) => {
      if (res.data.data && res.data.data.tableDetails) {
        if (res.data.data.tableDetails.status === 'SUCCESS') {
          result = {
            status: res.data.data.tableDetails.status,
            tableDetails: res.data.data.tableDetails.tableDetails,
          };
        } else {
          result = {
            status: res.data.data.tableDetails.status,
          };
          toast.error(res.data.data.tableDetails.message, {
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

export const getChampion = async (url: string): Promise<Output> => {
  var result: Output = { status: 'FAILED' };
  let query = {
    query: `
    query getChampion($url: String!) {
              champion(url: $url) {
                status
                message
                competition {
                  teams {
                    id
                    name
                    logo
                  }
                  champion {
                    id
                    name
                    logo
                  }
                  championPredictionDateTime
                }
                champion {
                  myPrediction {
                    id
                    name
                    logo
                  }
                  point
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
      if (res.data.data && res.data.data.champion) {
        if (res.data.data.champion.status === 'SUCCESS') {
          result = {
            status: res.data.data.champion.status,
            competition: res.data.data.champion.competition,
            champion: res.data.data.champion.champion,
          };
        } else {
          result = {
            status: res.data.data.champion.status,
          };
          toast.error(res.data.data.champion.message, {
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

export const getPredictions = async (
  type: 'CHAMPION' | 'MATCH',
  url: string,
  match?: string
): Promise<Output> => {
  var result: Output = { status: 'FAILED' };
  let query = {
    query: `
    query getPredictions($type: String!, $url: String!, $match: String) {
              predictions(type: $type, url: $url, match: $match) {
                status
                message
                predictions {
                  myPredictionScore {
                    homeGoal
                    awayGoal
                  }
                  myPredictionChampion {
                    name
                    logo
                  }
                  user {
                    id
                    firstName
                    lastName
                    avatar
                  }
                  point
                }
              }
            }
      `,
    variables: {
      type: type,
      url: url,
      match: match,
    },
  };
  await Api.post('', JSON.stringify(query))
    .then((res) => {
      if (res.data.data && res.data.data.predictions) {
        if (res.data.data.predictions.status === 'SUCCESS') {
          result = {
            status: res.data.data.predictions.status,
            predictions: res.data.data.predictions.predictions,
          };
        } else {
          result = {
            status: res.data.data.predictions.status,
          };
          toast.error(res.data.data.predictions.message, {
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

export const getStats = async (url: string): Promise<Output> => {
  var result: Output = { status: 'FAILED' };
  let query = {
    query: `
    query getStats($url: String!) {
              stats(url: $url) {
                status
                message
                periods {
                  id
                  name
                  bestUser {
                    firstName
                    lastName
                    avatar
                  }
                  bestUserPoint
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
      if (res.data.data && res.data.data.stats) {
        if (res.data.data.stats.status === 'SUCCESS') {
          result = {
            status: res.data.data.stats.status,
            periods: res.data.data.stats.periods,
          };
        } else {
          result = {
            status: res.data.data.stats.status,
          };
          toast.error(res.data.data.stats.message, {
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

export const sendPredict = async (
  match: string,
  homeGoal: number,
  awayGoal: number
): Promise<Output> => {
  var result: Output = { status: 'FAILED' };
  let query = {
    query: `
    mutation sendPredict($match: String!, $homeGoal: Int!, $awayGoal: Int!) {
      predict(match: $match, homeGoal: $homeGoal, awayGoal: $awayGoal) {
        status
        message
      }
            }
      `,
    variables: {
      match: match,
      homeGoal: homeGoal,
      awayGoal: awayGoal,
    },
  };
  await Api.post('', JSON.stringify(query))
    .then((res) => {
      if (res.data.data && res.data.data.predict) {
        if (res.data.data.predict.status === 'SUCCESS') {
          result = {
            status: res.data.data.predict.status,
          };
          toast.success(res.data.data.predict.message, {
            position: toast.POSITION.BOTTOM_CENTER,
          });
        } else {
          result = {
            status: res.data.data.predict.status,
          };
          toast.error(res.data.data.predict.message, {
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

export const sendChampion = async (
  url: string,
  team: string
): Promise<Output> => {
  var result: Output = { status: 'FAILED' };
  let query = {
    query: `
    mutation championPredict($url: String!, $team: String!) {
      championPredict(url: $url, team: $team) {
        status
        message
      }
            }
      `,
    variables: {
      url: url,
      team: team,
    },
  };
  await Api.post('', JSON.stringify(query))
    .then((res) => {
      if (res.data.data && res.data.data.championPredict) {
        if (res.data.data.championPredict.status === 'SUCCESS') {
          result = {
            status: res.data.data.championPredict.status,
          };
          toast.success(res.data.data.championPredict.message, {
            position: toast.POSITION.BOTTOM_CENTER,
          });
        } else {
          result = {
            status: res.data.data.championPredict.status,
          };
          toast.error(res.data.data.championPredict.message, {
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

export const registerCompetition = async (
  competition: string
): Promise<Output> => {
  var result: Output = { status: 'FAILED' };
  let query = {
    query: `
    mutation registerCompetition($competition: String!) {
      registerCompetition(competition: $competition){
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
      competition: competition,
    },
  };
  await Api.post('', JSON.stringify(query))
    .then((res) => {
      if (res.data.data && res.data.data.registerCompetition) {
        if (res.data.data.registerCompetition.status === 'SUCCESS') {
          result = {
            status: res.data.data.registerCompetition.status,
            user: res.data.data.registerCompetition.user,
          };
          toast.success(res.data.data.registerCompetition.message, {
            position: toast.POSITION.BOTTOM_CENTER,
          });
        } else {
          result = {
            status: res.data.data.registerCompetition.status,
          };
          toast.error(res.data.data.registerCompetition.message, {
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

export const addCompetition = async (
  title: string,
  price: string,
  url: string,
  teams: TeamInterface[],
  championPredictionDateTime: String,
  image: File
): Promise<Output> => {
  var result: Output = { status: 'FAILED' };
  const teamsId = await teams.map((item) => item.id);
  let query = {
    query: `
    mutation addCompetition($title: String!, $price: String!, $url: String!, $teams: [String]!, $championPredictionDateTime: String!, $image: Upload!) {
      addCompetition(title: $title, price: $price, url: $url, teams: $teams, championPredictionDateTime: $championPredictionDateTime, image: $image) {
                status
                message
              }
            }
      `,
    variables: {
      title: title,
      price: price,
      url: url,
      teams: teamsId,
      championPredictionDateTime: championPredictionDateTime,
      image: image,
    },
  };

  let map = {
    0: ['variables.image'],
  };

  let fd = new FormData();
  fd.append('operations', JSON.stringify(query));
  fd.append('map', JSON.stringify(map));
  fd.append('0', image, image.name);

  await Api.post('', fd)
    .then((res) => {
      if (res.data.data && res.data.data.addCompetition) {
        if (res.data.data.addCompetition.status === 'SUCCESS') {
          result = {
            status: res.data.data.addCompetition.status,
          };
          toast.success(res.data.data.addCompetition.message, {
            position: toast.POSITION.BOTTOM_CENTER,
          });
        } else {
          result = {
            status: res.data.data.addCompetition.status,
          };
          toast.error(res.data.data.addCompetition.message, {
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

export const editCompetition = async (
  id: string,
  title: string,
  price: string,
  url: string,
  teams: TeamInterface[],
  championPredictionDateTime: string
): Promise<Output> => {
  var result: Output = { status: 'FAILED' };
  const teamsId = await teams.map((item) => item.id);
  let query = {
    query: `
    mutation editCompetition($id: String!, $title: String!, $price: String!, $url: String!, $teams: [String]!, $championPredictionDateTime: String!) {
      editCompetition(id: $id, title: $title, price: $price, url: $url, teams: $teams, championPredictionDateTime: $championPredictionDateTime) {
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
      id: id,
      title: title,
      price: price,
      url: url,
      teams: teamsId,
      championPredictionDateTime: championPredictionDateTime,
    },
  };

  await Api.post('', query)
    .then((res) => {
      if (res.data.data && res.data.data.editCompetition) {
        if (res.data.data.editCompetition.status === 'SUCCESS') {
          result = {
            status: res.data.data.editCompetition.status,
            user: res.data.data.editCompetition.user,
          };
          toast.success(res.data.data.editCompetition.message, {
            position: toast.POSITION.BOTTOM_CENTER,
          });
        } else {
          result = {
            status: res.data.data.editCompetition.status,
          };
          toast.error(res.data.data.editCompetition.message, {
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

export const deleteCompetition = async (id: string): Promise<Output> => {
  var result: Output = { status: 'FAILED' };
  let query = {
    query: `
    mutation deleteCompetition($id: String!) {
      deleteCompetition(id: $id) {
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
      if (res.data.data && res.data.data.deleteCompetition) {
        if (res.data.data.deleteCompetition.status === 'SUCCESS') {
          result = {
            status: res.data.data.deleteCompetition.status,
          };
          toast.success(res.data.data.deleteCompetition.message, {
            position: toast.POSITION.BOTTOM_CENTER,
          });
        } else {
          result = {
            status: res.data.data.deleteCompetition.status,
          };
          toast.error(res.data.data.deleteCompetition.message, {
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
