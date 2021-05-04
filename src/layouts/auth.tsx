import React from 'react';
import AuthRoutes from '../routes/auth';
import { Container, Grid, Box, Typography } from '@material-ui/core';
import { GiSoccerBall } from 'react-icons/gi';
import Persian from '../lib/constants/persian';
import { Colors } from './../theme';

const AuthLayout: React.FC = () => {
  return (
    <Box component="section" py={18}>
      <Container fixed>
        <Grid container spacing={2}>
          <Grid item md={2} lg={3}></Grid>
          <Grid item xs={12} md={8} lg={6}>
            <Box
              padding={6}
              bgcolor={Colors.backgroundOpacity}
              borderRadius={16}
              boxShadow={8}
            >
              <Box textAlign="center" color={Colors.primary}>
                <GiSoccerBall className="font-49" />
              </Box>
              <Box textAlign="center" mb={12}>
                <Typography component="h1" variant="h6">
                  {Persian.title}
                </Typography>
              </Box>
              <AuthRoutes />
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default AuthLayout;
