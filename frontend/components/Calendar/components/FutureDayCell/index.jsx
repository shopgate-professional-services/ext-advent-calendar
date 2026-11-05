import React from 'react';
import PropTypes from 'prop-types';
import { css } from 'glamor';
import { Grid } from '@shopgate/engage/components';
import { styles } from '../../styles';
import { getCalendarDayConfig } from '../../../../helpers';

/**
 * @returns {JSX}
 */
const FutureDayCell = ({ day, onActivateDay }) => {
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
        styles.gridItemFuture,
        frontImage && {
          backgroundImage: `url(${frontImage})`,
        }
      ).toString()}
      onClick={() => onActivateDay(day)}
    >
      <span>
        {frontImage
          ? ''
          : frontLabel || day}
      </span>
    </Grid.Item>
  );
};

FutureDayCell.propTypes = {
  day: PropTypes.node.isRequired,
  onActivateDay: PropTypes.func.isRequired,
};

export default FutureDayCell;
