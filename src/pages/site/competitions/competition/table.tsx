import React from 'react';
import Intro from '../../../../components/competitions/intro';
import { RouteComponentProps } from 'react-router';
import { getTable } from '../../../../lib/apis/competition';
import { useAuth } from './../../../../lib/contexts/auth';
import {
  TableDetails,
  TableInterface,
} from './../../../../lib/constants/interfaces';
import {
  Box,
  CircularProgress,
  Grid,
  Typography,
  Hidden,
  Divider,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
} from '@material-ui/core';
import Persian from './../../../../lib/constants/persian';
import { Colors } from './../../../../theme';
import Global from './../../../../global';
import { getTableDetails } from './../../../../lib/apis/competition';
import { makeStyles, Theme } from '@material-ui/core/styles';

interface props {
  url: string;
}

const useStyles = makeStyles((theme: Theme) => ({
  image: {
    borderRadius: '50%',
  },
}));

const Table: React.FC<RouteComponentProps<props>> = (props) => {
  const [loading, setLoading] = React.useState<boolean>(true);
  const [table, setTable] = React.useState<[TableInterface] | undefined>(
    undefined
  );
  const [gold, setGold] = React.useState<TableInterface | undefined>(undefined);
  const [silver, setSilver] = React.useState<TableInterface | undefined>(
    undefined
  );
  const [bronze, setBronze] = React.useState<TableInterface | undefined>(
    undefined
  );
  const [open, setOpen] = React.useState<boolean>(false);
  const [pointDetails, setPointDetails] = React.useState<
    TableDetails | undefined
  >(undefined);
  const { logout } = useAuth();
  const classes = useStyles();

  React.useEffect(() => {
    const getCompetitionTable = async () => {
      await getTable(props.match.params.url).then(async (res) => {
        if (res.status === 'SUCCESS' && res.table) {
          res.table.sort(function (a: any, b: any) {
            if (typeof b.point == 'number' && typeof a.point == 'number') {
              return a.point - b.point;
            } else {
              return 0;
            }
          });
          res.table.reverse();
          res.table.map((item, index) => {
            if (index === 0 && item) {
              setGold(item);
            } else if (index === 1) {
              setSilver(item);
            } else if (index === 2) {
              setBronze(item);
            }
            return null;
          });
          setTable(res.table);
          setLoading(false);
        } else if (res.status === 'LOGOUT') {
          if (logout) {
            await logout().then(async (res) => {
              if (res.status === 'SUCCESS') {
                await props.history.push('/login');
              }
            });
          }
        } else {
          await props.history.push('/');
        }
      });
    };
    getCompetitionTable();
  }, []);

  const handleClickOpen = async (id: string) => {
    await getTableDetails(props.match.params.url, id).then(async (res) => {
      if (res.status === 'SUCCESS') {
        setPointDetails(res.tableDetails);
      } else if (res.status === 'LOGOUT') {
        if (logout) {
          await logout().then(async (res) => {
            if (res.status === 'SUCCESS') {
              await props.history.push('/login');
            }
          });
        }
      }
    });
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <section>
      <Intro url={props.match.params.url} />
      {loading && (
        <Box textAlign="center">
          <CircularProgress />
        </Box>
      )}
      {!loading && table && table.length > 0 && (
        <React.Fragment>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Box
                mt={4}
                bgcolor={Colors.backgroundOpacity}
                borderRadius={16}
                boxShadow={8}
                p={3}
                textAlign="center"
              >
                {Persian.bestThree}
              </Box>
            </Grid>
            <Hidden smDown>
              <Grid item md={4}>
                {bronze && (
                  <Box
                    mt={2}
                    bgcolor={Colors.bronzeBackground}
                    borderRadius={16}
                    boxShadow={8}
                    p={3}
                  >
                    <Grid
                      container
                      direction="row"
                      justify="space-around"
                      alignItems="center"
                    >
                      <Box textAlign="center">
                        <img
                          className={classes.image}
                          src={
                            bronze.user.avatar
                              ? Global.API_BASE_URL + bronze.user.avatar
                              : '/img/avatar.png'
                          }
                          width={64}
                          alt={
                            bronze.user.firstName + ' ' + bronze.user.lastName
                          }
                        />
                        <Typography variant="h6" className="font-13">
                          {bronze.user.firstName + ' ' + bronze.user.lastName}
                        </Typography>
                      </Box>
                      <Box textAlign="center">
                        <Box
                          bgcolor={Colors.backgroundOpacity}
                          borderRadius={16}
                          p={2}
                          mb={2}
                        >
                          <Typography
                            component="span"
                            variant="h6"
                            className="font-13"
                          >
                            {bronze.point}
                          </Typography>
                          <Typography component="span" className="font-11">
                            {' ' + Persian.point}
                          </Typography>
                        </Box>
                        <img
                          src="/img/bronze.png"
                          alt="Gold Medal"
                          width={38}
                        />
                      </Box>
                    </Grid>
                    <Box my={3}>
                      <Divider />
                    </Box>
                    <Button
                      onClick={() => handleClickOpen(bronze.user.id)}
                      color="primary"
                      variant="contained"
                      fullWidth
                    >
                      {Persian.tableDetails}
                    </Button>
                  </Box>
                )}
              </Grid>
            </Hidden>
            <Grid item xs={12} md={4}>
              {gold && (
                <Box
                  bgcolor={Colors.goldBackground}
                  borderRadius={16}
                  boxShadow={8}
                  p={3}
                >
                  <Grid
                    container
                    direction="row"
                    justify="space-around"
                    alignItems="center"
                  >
                    <Box textAlign="center">
                      <img
                        className={classes.image}
                        src={
                          gold.user.avatar
                            ? Global.API_BASE_URL + gold.user.avatar
                            : '/img/avatar.png'
                        }
                        width={64}
                        alt={gold.user.firstName + ' ' + gold.user.lastName}
                      />
                      <Typography variant="h6" className="font-13">
                        {gold.user.firstName + ' ' + gold.user.lastName}
                      </Typography>
                    </Box>
                    <Box textAlign="center">
                      <Box
                        bgcolor={Colors.backgroundOpacity}
                        borderRadius={16}
                        p={2}
                        mb={2}
                      >
                        <Typography
                          component="span"
                          variant="h6"
                          className="font-13"
                        >
                          {gold.point}
                        </Typography>
                        <Typography component="span" className="font-11">
                          {' ' + Persian.point}
                        </Typography>
                      </Box>
                      <img src="/img/gold.png" alt="Gold Medal" width={38} />
                    </Box>
                  </Grid>
                  <Box my={3}>
                    <Divider />
                  </Box>
                  <Button
                    onClick={() => handleClickOpen(gold.user.id)}
                    color="primary"
                    variant="contained"
                    fullWidth
                  >
                    {Persian.tableDetails}
                  </Button>
                </Box>
              )}
            </Grid>
            <Grid item xs={12} md={4}>
              {silver && (
                <Box
                  mt={2}
                  bgcolor={Colors.silverBackground}
                  borderRadius={16}
                  boxShadow={8}
                  p={3}
                >
                  <Grid
                    container
                    direction="row"
                    justify="space-around"
                    alignItems="center"
                  >
                    <Box textAlign="center">
                      <img
                        className={classes.image}
                        src={
                          silver.user.avatar
                            ? Global.API_BASE_URL + silver.user.avatar
                            : '/img/avatar.png'
                        }
                        width={64}
                        alt={silver.user.firstName + ' ' + silver.user.lastName}
                      />
                      <Typography variant="h6" className="font-13">
                        {silver.user.firstName + ' ' + silver.user.lastName}
                      </Typography>
                    </Box>
                    <Box textAlign="center">
                      <Box
                        bgcolor={Colors.backgroundOpacity}
                        borderRadius={16}
                        p={2}
                        mb={2}
                      >
                        <Typography
                          component="span"
                          variant="h6"
                          className="font-13"
                        >
                          {silver.point}
                        </Typography>
                        <Typography component="span" className="font-11">
                          {' ' + Persian.point}
                        </Typography>
                      </Box>
                      <img src="/img/silver.png" alt="Gold Medal" width={38} />
                    </Box>
                  </Grid>
                  <Box my={3}>
                    <Divider />
                  </Box>
                  <Button
                    onClick={() => handleClickOpen(silver.user.id)}
                    color="primary"
                    variant="contained"
                    fullWidth
                  >
                    {Persian.tableDetails}
                  </Button>
                </Box>
              )}
            </Grid>
            <Hidden mdUp>
              <Grid item xs={12}>
                {bronze && (
                  <Box
                    mt={2}
                    bgcolor={Colors.bronzeBackground}
                    borderRadius={16}
                    boxShadow={8}
                    p={3}
                  >
                    <Grid
                      container
                      direction="row"
                      justify="space-around"
                      alignItems="center"
                    >
                      <Box textAlign="center">
                        <img
                          className={classes.image}
                          src={
                            bronze.user.avatar
                              ? Global.API_BASE_URL + bronze.user.avatar
                              : '/img/avatar.png'
                          }
                          width={64}
                          alt={
                            bronze.user.firstName + ' ' + bronze.user.lastName
                          }
                        />
                        <Typography variant="h6" className="font-13">
                          {bronze.user.firstName + ' ' + bronze.user.lastName}
                        </Typography>
                      </Box>
                      <Box textAlign="center">
                        <Box
                          bgcolor={Colors.backgroundOpacity}
                          borderRadius={16}
                          p={2}
                          mb={2}
                        >
                          <Typography
                            component="span"
                            variant="h6"
                            className="font-13"
                          >
                            {bronze.point}
                          </Typography>
                          <Typography component="span" className="font-11">
                            {' ' + Persian.point}
                          </Typography>
                        </Box>
                        <img
                          src="/img/bronze.png"
                          alt="Gold Medal"
                          width={38}
                        />
                      </Box>
                    </Grid>
                    <Box my={3}>
                      <Divider />
                    </Box>
                    <Button
                      onClick={() => handleClickOpen(bronze.user.id)}
                      color="primary"
                      variant="contained"
                      fullWidth
                    >
                      {Persian.tableDetails}
                    </Button>
                  </Box>
                )}
              </Grid>
            </Hidden>
            <Grid item xs={12}>
              <Box
                mt={4}
                bgcolor={Colors.backgroundOpacity}
                borderRadius={16}
                boxShadow={8}
                p={3}
                textAlign="center"
              >
                {Persian.otherUsers}
              </Box>
            </Grid>
            {table.map((item, index) => {
              if (index >= 3) {
                return (
                  <Grid key={index} item xs={12} sm={6} md={4} lg={3}>
                    <Box
                      mt={2}
                      bgcolor={Colors.backgroundOpacity}
                      borderRadius={16}
                      boxShadow={8}
                      p={3}
                    >
                      <Grid
                        container
                        direction="row"
                        justify="space-around"
                        alignItems="center"
                      >
                        <Box
                          borderRadius={16}
                          px={3}
                          py={2}
                          bgcolor={Colors.backgroundOpacity}
                        >
                          {index + 1}
                        </Box>
                        <Box textAlign="center">
                          <img
                            className={classes.image}
                            src={
                              item.user.avatar
                                ? Global.API_BASE_URL + item.user.avatar
                                : '/img/avatar.png'
                            }
                            width={64}
                            alt={item.user.firstName + ' ' + item.user.lastName}
                          />
                          <Typography variant="h6" className="font-13">
                            {item.user.firstName + ' ' + item.user.lastName}
                          </Typography>
                        </Box>
                        <Box textAlign="center">
                          <Box
                            bgcolor={Colors.backgroundOpacity}
                            borderRadius={16}
                            p={2}
                            mb={2}
                          >
                            <Typography
                              component="span"
                              variant="h6"
                              className="font-13"
                            >
                              {item.point}
                            </Typography>
                            <Typography component="span" className="font-11">
                              {' ' + Persian.point}
                            </Typography>
                          </Box>
                          <Button
                            onClick={() => handleClickOpen(item.user.id)}
                            color="primary"
                            variant="contained"
                            fullWidth
                          >
                            {Persian.tableDetails}
                          </Button>
                        </Box>
                      </Grid>
                    </Box>
                  </Grid>
                );
              } else {
                return null;
              }
            })}
          </Grid>
        </React.Fragment>
      )}
      {!loading && table && table.length < 1 && (
        <Box textAlign="center">{Persian.notFound}</Box>
      )}
      <Dialog
        fullWidth
        maxWidth="md"
        open={open}
        onClose={handleClose}
        aria-labelledby="max-width-dialog-title"
      >
        <DialogTitle id="max-width-dialog-title">
          {Persian.tableDetails}
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={3}>
            <Grid item xs={6} sm={4}>
              <Box textAlign="center" mb={2}>
                <Typography variant="h6">{Persian.exactPredict}</Typography>
              </Box>
              <Box textAlign="center" mb={4}>
                <Typography>
                  {pointDetails
                    ? pointDetails.exact + ' ' + Persian.number
                    : null}
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={6} sm={4}>
              <Box textAlign="center" mb={2}>
                <Typography variant="h6">
                  {Persian.differencePredict}
                </Typography>
              </Box>
              <Box textAlign="center" mb={4}>
                <Typography>
                  {pointDetails
                    ? pointDetails.difference + ' ' + Persian.number
                    : null}
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={6} sm={4}>
              <Box textAlign="center" mb={2}>
                <Typography variant="h6">{Persian.winnerPredict}</Typography>
              </Box>
              <Box textAlign="center" mb={4}>
                <Typography>
                  {pointDetails
                    ? pointDetails.winner + ' ' + Persian.number
                    : null}
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={6} sm={4}>
              <Box textAlign="center" mb={2}>
                <Typography variant="h6">{Persian.wrongPredict}</Typography>
              </Box>
              <Box textAlign="center" mb={4}>
                <Typography>
                  {pointDetails
                    ? pointDetails.wrong + ' ' + Persian.number
                    : null}
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={6} sm={4}>
              <Box textAlign="center" mb={2}>
                <Typography variant="h6">{Persian.emptyPredict}</Typography>
              </Box>
              <Box textAlign="center" mb={4}>
                <Typography>
                  {pointDetails
                    ? pointDetails.empty + ' ' + Persian.number
                    : null}
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={6} sm={4}>
              <Box textAlign="center" mb={2}>
                <Typography variant="h6">{Persian.championPredict}</Typography>
              </Box>
              <Box
                textAlign="center"
                mb={4}
                color={
                  pointDetails
                    ? pointDetails.champion === true
                      ? Colors.success
                      : Colors.error
                    : Colors.white
                }
              >
                <Typography>
                  {pointDetails
                    ? pointDetails.champion === true
                      ? Persian.currect
                      : '-'
                    : null}
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default Table;
