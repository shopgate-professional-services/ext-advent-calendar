import React from 'react';
import PropTypes from 'prop-types';
import { css } from 'glamor';
import { Grid } from '@shopgate/engage/components';
import { styles } from '../../styles';
import { getCalendarDayConfig } from '../../../../helpers';

/**
 * @returns {JSX}
 */
const ExpiredDayCell = ({ day }) => {
  const {
    grid: {
      frontLabel,
      frontImage,
    } = {},
  } = getCalendarDayConfig(day) || {};

  return (
    <Grid.Item
      shrink={0}
      className={css(
        styles.gridItem,
        styles.gridItemExpired,
        frontImage && {
          backgroundImage: `url(${frontImage})`,
        }
      ).toString()}
    >
      <span>
        {frontImage
          ? ''
          : frontLabel || day}
      </span>
    </Grid.Item>
  );
};

ExpiredDayCell.propTypes = {
  day: PropTypes.node.isRequired,
};

export default ExpiredDayCell;
