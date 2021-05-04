import React from 'react';
import { makeStyles, Theme } from '@material-ui/core/styles';
import { Backdrop as BackdropContainer } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) => ({
  backdrop: {
    zIndex: 1005,
    backgroundColor: theme.palette.grey[100],
  },
}));

interface backdrop {
  status: boolean;
}

const Backdrop: React.FC<backdrop> = (props) => {
  const classes = useStyles();

  return (
    <BackdropContainer className={classes.backdrop} open={props.status}>
      <div className="lds-roller">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </BackdropContainer>
  );
};

export default Backdrop;
