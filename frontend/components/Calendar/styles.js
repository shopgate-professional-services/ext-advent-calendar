import { css } from 'glamor';
import config from '../../config.json';

const { styles: configStyles } = config.calendarGrid;

export const styles = {
  gridWrapper: css({
    maxWidth: 320,
    margin: '0 auto',
    position: 'relative',
  }).toString(),
  grid: css({
    display: 'grid',
    gridGap: '6px',
    gridTemplateColumns: 'repeat(4, 1fr)',
    width: '100%',
    borderRadius: '20px',
    ' > *:nth-child(1)': {
      borderRadius: '20px 0 0px 0px',
    },
    ' > *:nth-child(4)': {
      borderRadius: '0px 20px 0px 0px',
    },
    ' > *:nth-child(21)': {
      borderRadius: '0px 0 0px 20px',
    },
    ' > *:nth-child(24)': {
      borderRadius: '0px 0 20px 0px',
    },
  }, configStyles.grid),
  gridItem: css({
    height: 80,
    border: '1px solid #D3D3D3',
    fontWeight: 500,
    fontSize: '1.5rem',
    color: '#D3D3D3',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    backgroundRepeat: 'no-repeat',
    backgroundSize: '100% 100%',
  }, configStyles.gridItem),
  gridItemActive: css({
    backgroundColor: '#A70F09',
  }, configStyles.active),
  gridItemFuture: css({
    backgroundColor: '#A70F09',
  }, configStyles.future),
  gridItemExpired: css({
    backgroundColor: '#2c2c2c',
  }, configStyles.expired),
  flippingSide: css({
    position: 'absolute',
    maxWidth: '90px',
    maxHeight: '80px',
    width: '50ch',
    height: '50ch',
    cursor: 'pointer',
    willChange: 'transform, opacity',
  }),
};
