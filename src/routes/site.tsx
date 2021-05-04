import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { role } from '../lib/constants/interfaces';
import { Box, CircularProgress } from '@material-ui/core';

// Users
const Home = React.lazy(() => import('../pages/site/index'));
const Jobs = React.lazy(() => import('../pages/site/jobs'));
const HallOfFame = React.lazy(() => import('../pages/site/hall_of_fame'));
const EditInformation = React.lazy(
  () => import('../pages/site/user/edit_information')
);
const ChangePassword = React.lazy(
  () => import('../pages/site/user/change_password')
);
const Transactions = React.lazy(
  () => import('../pages/site/user/transactions')
);
const Matches = React.lazy(
  () => import('../pages/site/competitions/competition/matches')
);
const Table = React.lazy(
  () => import('../pages/site/competitions/competition/table')
);
const Champion = React.lazy(
  () => import('../pages/site/competitions/competition/champion')
);
const Stats = React.lazy(
  () => import('../pages/site/competitions/competition/stats')
);

// Guests
const Guest = React.lazy(() => import('../pages/site/guest/guest'));

// Admins
const Users = React.lazy(() => import('../pages/site/admin/users/users'));

const AddUser = React.lazy(() => import('../pages/site/admin/users/addUser'));

const Teams = React.lazy(() => import('../pages/site/admin/teams/teams'));

const AddTeam = React.lazy(() => import('../pages/site/admin/teams/addTeam'));

const EditTeam = React.lazy(() => import('../pages/site/admin/teams/editTeam'));

const Competitions = React.lazy(
  () => import('../pages/site/admin/competitions/competitions')
);

const AddCompetition = React.lazy(
  () => import('../pages/site/admin/competitions/addCompetition')
);

const EditCompetition = React.lazy(
  () => import('../pages/site/admin/competitions/editCompetition')
);

const FinishCompetition = React.lazy(
  () => import('../pages/site/admin/competitions/finishCompetition')
);

const Periods = React.lazy(
  () => import('../pages/site/admin/competitions/competition/periods/periods')
);

const AddPeriod = React.lazy(
  () => import('../pages/site/admin/competitions/competition/periods/addPeriod')
);

const EditPeriod = React.lazy(
  () =>
    import('../pages/site/admin/competitions/competition/periods/editPeriod')
);

const CompetitionMatches = React.lazy(
  () => import('../pages/site/admin/competitions/competition/matches/matches')
);

const AddMatch = React.lazy(
  () => import('../pages/site/admin/competitions/competition/matches/addMatch')
);

const EditMatch = React.lazy(
  () => import('../pages/site/admin/competitions/competition/matches/editMatch')
);

interface props {
  roles: [role] | undefined;
}

const SiteRoutes: React.FC<props> = (props) => {
  return (
    <React.Suspense
      fallback={
        <Box textAlign="center">
          <CircularProgress />
        </Box>
      }
    >
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/hall_of_fame" component={HallOfFame} />
        <Route exact path="/jobs" component={Jobs} />
        {props.roles?.includes('GUEST') && (
          <React.Fragment>
            <Route exact path="/guest" component={Guest} />
          </React.Fragment>
        )}
        {props.roles?.includes('ADMIN') && props.roles?.includes('USER') && (
          <React.Fragment>
            <Route exact path="/edit_information" component={EditInformation} />
            <Route exact path="/change_password" component={ChangePassword} />
            <Route exact path="/transactions" component={Transactions} />
            <Route exact path="/competitions/:url" component={Matches} />
            <Route exact path="/competitions/:url/table" component={Table} />
            <Route
              exact
              path="/competitions/:url/champion"
              component={Champion}
            />
            <Route exact path="/competitions/:url/stats" component={Stats} />
            <Route exact path="/admin/users" component={Users} />
            <Route exact path="/admin/users/add" component={AddUser} />
            <Route exact path="/admin/users/requests" component={Guest} />
            <Route exact path="/admin/teams" component={Teams} />
            <Route exact path="/admin/teams/add" component={AddTeam} />
            <Route exact path="/admin/teams/:id/edit" component={EditTeam} />
            <Route exact path="/admin/competitions" component={Competitions} />
            <Route
              exact
              path="/admin/competitions/add"
              component={AddCompetition}
            />
            <Route
              exact
              path="/admin/competitions/:url/edit"
              component={EditCompetition}
            />
            <Route
              exact
              path="/admin/competitions/:url/finish"
              component={FinishCompetition}
            />
            <Route
              exact
              path="/admin/competitions/:url/periods"
              component={Periods}
            />
            <Route
              exact
              path="/admin/competitions/:url/periods/add"
              component={AddPeriod}
            />
            <Route
              exact
              path="/admin/competitions/:url/periods/:id/edit"
              component={EditPeriod}
            />
            <Route
              exact
              path="/admin/competitions/:url/matches"
              component={CompetitionMatches}
            />
            <Route
              exact
              path="/admin/competitions/:url/matches/:id/add"
              component={AddMatch}
            />
            <Route
              exact
              path="/admin/competitions/:url/matches/:id/edit"
              component={EditMatch}
            />
          </React.Fragment>
        )}
        {props.roles?.includes('USER') && (
          <React.Fragment>
            <Route exact path="/edit_information" component={EditInformation} />
            <Route exact path="/change_password" component={ChangePassword} />
            <Route exact path="/transactions" component={Transactions} />
            <Route exact path="/competitions/:url" component={Matches} />
            <Route exact path="/competitions/:url/table" component={Table} />
            <Route
              exact
              path="/competitions/:url/champion"
              component={Champion}
            />
            <Route exact path="/competitions/:url/stats" component={Stats} />
          </React.Fragment>
        )}
      </Switch>
    </React.Suspense>
  );
};

export default SiteRoutes;
