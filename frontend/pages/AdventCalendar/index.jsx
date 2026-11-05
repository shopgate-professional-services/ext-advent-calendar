import React from 'react';
import { css } from 'glamor';
import { useTheme } from '@shopgate/engage/core';
import { HtmlSanitizer, Route } from '@shopgate/engage/components';
import CloseButton from '../../components/CloseButton';
import Calendar from '../../components/Calendar';
import ComingSoon from '../../components/ComingSoon';
import { isCalendarAllowed } from '../../helpers';
import config from '../../config.json';
import { CALENDAR_ROUTE } from '../../constants';

const { image, styles: pageStyles, texts = {} } = config.calendarPage;

const styles = {
  page: css(pageStyles),
  content: css({
    margin: '1.25rem',
    marginTop: 'calc(1.25rem + var(--safe-area-inset-top))',
    position: 'relative',
  }),
  image: css({
    margin: '1rem 0',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  }),
};

/**
 * @returns {JSX}
 */
const AdventCalendar = () => {
  const { View } = useTheme();

  const allowCalendar = isCalendarAllowed();

  return (
    <View>
      <div className={styles.page}>
        <div className={styles.content}>
          <CloseButton />

          <div className={styles.image}>
            <img className="advent-header-img" src={image} alt="" />
          </div>

          {texts.headline && (<h1 className="advent-headline">{texts.headline}</h1>)}
          {texts.aboveGrid && (<div className="advent-text-above">{texts.aboveGrid}</div>)}

          {allowCalendar && <Calendar />}
          {!allowCalendar && <ComingSoon />}

          {texts.belowGrid && (
            <HtmlSanitizer className="advent-text-below">
              {texts.belowGrid}
            </HtmlSanitizer>
          )}
        </div>
      </div>
    </View>
  );
};

export default () => (
  <Route
    pattern={CALENDAR_ROUTE}
    component={AdventCalendar}
  />
);
