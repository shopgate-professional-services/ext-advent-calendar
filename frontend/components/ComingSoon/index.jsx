import React from 'react';
import { css } from 'glamor';
import { CountdownTimer } from '@shopgate/engage/components';
import { getCountDownSeconds } from '../../helpers';
import config from '../../config.json';

export const styles = {
  p: css({
    textAlign: 'center',
  }),
  timer: css({
    marginTop: '1rem',
    textAlign: 'center',
    fontSize: '2rem',
  }),
};

/**
 * @returns {JSX}
 */
const ComingSoon = () => (
  <>
    <p className={styles.p}>
      {config.messages.calendarTooEarly}
    </p>
    <p className={styles.timer}>
      <CountdownTimer timeout={getCountDownSeconds()} />
    </p>
  </>
);

export default ComingSoon;
