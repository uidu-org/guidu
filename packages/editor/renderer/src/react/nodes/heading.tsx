import React from 'react';

import Url from 'url-parse';
import { CopyTextConsumer } from './copy-text-provider';
import HeadingAnchor from './heading-anchor';

export type HeadingLevels = 1 | 2 | 3 | 4 | 5 | 6;

const getCurrentUrlWithHash = (hash: string = ''): string => {
  const url = new Url(window.location.href);
  url.set('hash', encodeURIComponent(hash));
  return url.href;
};

function Heading(
  props: {
    level: HeadingLevels;
    headingId?: string;
    showAnchorLink?: boolean;
  } & React.Props<any>,
) {
  const { headingId } = props;
  const HX = `h${props.level}` as 'h1';

  return (
    <HX id={headingId}>
      {!!props.showAnchorLink && (
        <CopyTextConsumer>
          {({ copyTextToClipboard }) => {
            return (
              headingId && (
                <HeadingAnchor
                  onCopyText={() => {
                    return copyTextToClipboard(
                      getCurrentUrlWithHash(headingId),
                    );
                  }}
                />
              )
            );
          }}
        </CopyTextConsumer>
      )}
      {props.children}
    </HX>
  );
}

export default Heading;
