import { Box, Typography, Divider, Button, Grid } from '@material-ui/core';
import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Colors } from './../../theme';
import { makeStyles, Theme } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import Persian from './../../lib/constants/persian';
import { useAuth } from './../../lib/contexts/auth';
import NumberFormat from 'react-number-format';
import { getCompetition } from '../../lib/apis/competition';
import SwiperCore, { Navigation } from 'swiper';

SwiperCore.use([Navigation]);

interface props {
  url: string;
}

const useStyles = makeStyles((theme: Theme) => ({
  box: {
    borderRadius: '4px !important',
    '&:hover': {
      backgroundColor: Colors.primary + ' !important',
      color: Colors.white + ' !important',
    },
    '&:active': {
      backgroundColor: Colors.primary + ' !important',
      color: Colors.white + ' !important',
    },
    '&:focus': {
      backgroundColor: Colors.primary + ' !important',
      color: Colors.white + ' !important',
    },
  },
}));

const Intro: React.FC<props> = (props) => {
  const [pay, setPay] = React.useState<boolean>(false);
  const [competitionPrice, setCompetitionPrice] = React.useState<number>(0);
  const [servicePrice, setServicePrice] = React.useState<number>(0);
  const [total, setTotal] = React.useState<number>(0);
  const { user, settings } = useAuth();
  const classes = useStyles();

  React.useEffect(() => {
    const getCompetitionDetail = async () => {
      user?.pay.map((item) =>
        item.competition.url === props.url ? setPay(true) : setPay(false)
      );
      if (settings?.servicePrice) {
        setServicePrice(settings.servicePrice);
      }
      await getCompetition(props.url).then(async (res) => {
        if (res.status === 'SUCCESS' && res.competition) {
          setCompetitionPrice(res.competition.price);
        }
      });
    };
    getCompetitionDetail();
  }, []);

  React.useEffect(() => {
    var totalPrice = competitionPrice + servicePrice;
    setTotal(totalPrice);
  }, [competitionPrice, servicePrice]);

  return (
    <section>
      {/* {pay ? null : (
        <Box
          mb={4}
          bgcolor={Colors.error}
          borderRadius={16}
          boxShadow={8}
          p={4}
        >
          <Grid
            container
            direction="row"
            alignItems="center"
            justify="space-between"
          >
            <Box>{Persian.componentAmount}</Box>
            <Box component="span" fontWeight="bold">
              <NumberFormat
                value={competitionPrice}
                displayType={'text'}
                thousandSeparator={true}
                suffix={` ${Persian.toman}`}
              />
            </Box>
          </Grid>
          <Grid
            container
            direction="row"
            alignItems="center"
            justify="space-between"
          >
            <Box>{Persian.serviceAmount}</Box>
            <Box component="span" fontWeight="bold">
              <NumberFormat
                value={servicePrice}
                displayType={'text'}
                thousandSeparator={true}
                suffix={` ${Persian.toman}`}
              />
            </Box>
          </Grid>
          <Box my={4}>
            <Divider />
          </Box>
          <Grid
            container
            direction="row"
            alignItems="center"
            justify="space-between"
          >
            <Box>
              {Persian.totalAmount + ': '}
              <Box component="span" fontWeight="bold">
                <NumberFormat
                  value={total}
                  displayType={'text'}
                  thousandSeparator={true}
                  suffix={` ${Persian.toman}`}
                />
              </Box>
            </Box>
            <Box>
              <Link to="/submit_pay">
                <Button variant="contained" color="primary">
                  {Persian.submitPay}
                </Button>
              </Link>
              <Box ml={2} component="span">
                <a
                  href="https://me.pay.ir/irpish"
                  target="_blank"
                  rel="noreferrer"
                >
                  <Button variant="contained" color="primary">
                    {Persian.payNow}
                  </Button>
                </a>
              </Box>
            </Box>
          </Grid>
        </Box>
      )} */}
      <Box mb={4}>
        <Swiper
          navigation
          spaceBetween={20}
          breakpoints={{
            0: {
              slidesPerView: 2,
            },
            640: {
              slidesPerView: 3,
            },
            991: {
              slidesPerView: 4,
            },
            1200: {
              slidesPerView: 5,
            },
          }}
        >
          <SwiperSlide>
            <Link to={`/competitions/${props.url}/`}>
              <Box
                padding={3}
                bgcolor={Colors.backgroundOpacity}
                className={classes.box + ' transition'}
                boxShadow={4}
                textAlign="center"
              >
                <img src="/img/prediction.png" alt="matches" />
                <Typography>{Persian.matches}</Typography>
              </Box>
            </Link>
          </SwiperSlide>
          <SwiperSlide>
            <Link to={`/competitions/${props.url}/table`}>
              <Box
                padding={3}
                bgcolor={Colors.backgroundOpacity}
                className={classes.box + ' transition'}
                boxShadow={4}
                textAlign="center"
              >
                <img src="/img/table.png" alt="table" />
                <Typography>{Persian.table}</Typography>
              </Box>
            </Link>
          </SwiperSlide>
          <SwiperSlide>
            <Link to={`/competitions/${props.url}/champion`}>
              <Box
                padding={3}
                bgcolor={Colors.backgroundOpacity}
                className={classes.box + ' transition'}
                boxShadow={4}
                textAlign="center"
              >
                <img src="/img/champion.png" alt="champion" />
                <Typography>{Persian.champion}</Typography>
              </Box>
            </Link>
          </SwiperSlide>
          <SwiperSlide>
            <Link to={`/competitions/${props.url}/stats`}>
              <Box
                padding={3}
                bgcolor={Colors.backgroundOpacity}
                className={classes.box + ' transition'}
                boxShadow={4}
                textAlign="center"
              >
                <img src="/img/chart.png" alt="stats" />
                <Typography>{Persian.stats}</Typography>
              </Box>
            </Link>
          </SwiperSlide>
          <SwiperSlide>
            <a href="https://varzesh3.com/" target="_blank" rel="noreferrer">
              <Box
                padding={3}
                bgcolor={Colors.backgroundOpacity}
                className={classes.box + ' transition'}
                boxShadow={4}
                textAlign="center"
              >
                <img src="/img/varzesh3.png" alt="varzesh3" />
                <Typography>{Persian.varzesh3}</Typography>
              </Box>
            </a>
          </SwiperSlide>
        </Swiper>
      </Box>
    </section>
  );
};

export default Intro;
