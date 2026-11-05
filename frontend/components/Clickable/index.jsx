import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { css } from 'glamor';

const styles = {
  wrapper: css({
    display: 'inherit',
    alignItems: 'inherit',
    justifyContent: 'inherit',
    borderRadius: 'inherit',
    ':focus:not(:focus-visible)': {
      outline: 'none',
    },
  }),
};

/**
 * @returns {JSX}
 */
const Clickable = ({ children, onClick }) => {
  const handleKeyDown = useCallback((event) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      onClick(event);
    }
  }, [onClick]);

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={onClick}
      onKeyDown={handleKeyDown}
      className={styles.wrapper}
    >
      {children}
    </div>
  );
};

Clickable.propTypes = {
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default Clickable;
