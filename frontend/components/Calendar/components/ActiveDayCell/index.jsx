import React from 'react';
import PropTypes from 'prop-types';
import { Grid } from '@shopgate/engage/components';
import FlippingCard from '../../../FlippingCard';
import { styles } from '../../styles';
import { getCalendarDayConfig } from '../../../../helpers';

/**
 * @returns {JSX}
 */
const ActiveDayCell = ({ day, onActivateDay }) => {
  const {
    grid: {
      frontLabel,
      frontImage,
      backLabel,
      backImage,
    } = {},
  } = getCalendarDayConfig(day) || {};

  return (
    <Grid.Item shrink={0} className={styles.gridItem.toString()}>
      <FlippingCard
        front={(
          <span>
            {frontImage
              ? ''
              : frontLabel || day}
          </span>
        )}
        back={(
          <span>
            {backImage
              ? ''
              : backLabel || '😀'}
          </span>
        )}
        onFlip={() => onActivateDay(day)}
        className={styles.gridItemActive.toString()}
        frontStyle={frontImage && {
          backgroundImage: `url(${frontImage})`,
        }}
        backStyle={backImage && {
          backgroundImage: `url(${backImage})`,
        }}
      />
    </Grid.Item>
  );
};

ActiveDayCell.propTypes = {
  day: PropTypes.number.isRequired,
  onActivateDay: PropTypes.func.isRequired,
};

export default ActiveDayCell;
