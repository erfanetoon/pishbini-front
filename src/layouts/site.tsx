import React from 'react';
import { Container, Box } from '@material-ui/core';
import { useAuth } from '../lib/contexts/auth';
import SiteRoutes from './../routes/site';
import Header from '../components/inc/header/header';

const SiteLayout: React.FC = (props) => {
  const { roles } = useAuth();
  return (
    <section>
      <Box component="header" mb={4}>
        <Header />
      </Box>
      <Box component="main">
        <Container fixed>
          <div>{roles && <SiteRoutes roles={roles} />}</div>
        </Container>
      </Box>
    </section>
  );
};

export default SiteLayout;
