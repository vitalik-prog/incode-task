import React, { useCallback, useState } from 'react';
import { Container, Grid, Input, Statistic } from 'semantic-ui-react';
import { MILLISECONDS_IN_SECONDS } from 'src/common/constants';
import styles from './style.module.scss'

const ContentHeader = ({ interval, setInterval }) => {
  const [newInterval, setNewInterval] = useState('');

  const onSetInterval = useCallback(() => {
    if (newInterval === interval || Number(newInterval) <= 0) {
      return setNewInterval(String(interval / MILLISECONDS_IN_SECONDS));
    }

    setInterval(Number(newInterval));
    setNewInterval('');
  }, [newInterval, setInterval, interval]);

  const handelIntervalChange = useCallback((e) => {
    setNewInterval(e.target.value);
  }, []);

  return (
    <Grid className={styles.contentHeader}>
      <Container className={styles.contentHeader__currentUptime}>
        <Statistic horizontal label='Seconds (uptime)' value={interval / MILLISECONDS_IN_SECONDS} />
      </Container>
      <Input
        className={styles.contentHeader__inputUptimeChange}
        label={{ basic: true, content: 'seconds' }}
        labelPosition='right'
        placeholder='Change uptime'
        type='number'
        value={newInterval}
        onChange={handelIntervalChange}
        onBlur={onSetInterval}
      />
    </Grid>
  );
};

export default React.memo(ContentHeader);
