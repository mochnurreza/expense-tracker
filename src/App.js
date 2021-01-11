import React, {useEffect, useRef} from 'react'
import {Grid} from '@material-ui/core'
import Details from './components/details/Details'
import Main from './components/main/Main'
import useStyles from './Styles'
import { SpeechState, useSpeechContext } from "@speechly/react-client";
import { PushToTalkButton, PushToTalkButtonContainer } from '@speechly/react-ui';

function App() {
  const classes = useStyles()
  const { speechState } = useSpeechContext();
  const main = useRef(null)

  const executeScroll = () => main.current.scrollIntoView()    

  useEffect(() => {
    if (speechState === SpeechState.Recording) {
      executeScroll();
    }
  }, [speechState]);

  return (
    <>
    <Grid  className={classes.grid} container spacing={0} alignItems="center" justify="center" style={{height: '100vh' }}>
      <Grid item xs={12} sm={4}>
        <Details title="Income"/>
      </Grid>
      <Grid className={classes.main} item xs={12} sm={3}>
        <Main/>
      </Grid>
      <Grid className={classes.last} item xs={12} sm={4}>
        <Details title="Expense"/>
      </Grid>
      <PushToTalkButtonContainer>
        <PushToTalkButton />
      </PushToTalkButtonContainer>
    </Grid>
    </>
  );
}

export default App;
