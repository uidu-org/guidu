import React from 'react';
import JoyrideWrapper from 'components/JoyrideWrapper';

export default function ProfileOrganizationTour({ tourCallback }) {
  return (
    <JoyrideWrapper
      scrollContainer={document.querySelectorAll('[canvas="container"]')[0]}
      ref={(c) => { this.joyride = c; }}
      steps={[
        {
          title: 'Title only steps — As they say: Make the font bigger!',
          text: 'Can be advanced by clicking an element through the overlay hole.',
          textAlign: 'center',
          selector: '.tour-0',
          position: 'top',
          allowClicksThruHole: true,
        },
        {
          title: 'Our Mission',
          text: 'Can be advanced by clicking an element through the overlay hole.',
          selector: '.tour-1',
          position: 'top',
          allowClicksThruHole: true,
          style: {
            button: {
              display: 'none',
            },
          },
        },
        {
          title: 'Unmounted target',
          text: 'This step tests what happens when a target is missing',
          selector: '.tour-2',
        },
        {
          title: 'About Us',
          text: 'We are the people',
          selector: '.about h2 span',
          position: 'left',
          style: {
            beacon: {
              inner: '#27e200',
              offsetX: 20,
              outer: '#27e200',
            },
            arrow: {
              display: 'none',
            },
          },
        },
        {
          text: 'Text only steps — Because sometimes you don\'t really need a proper heading',
          selector: '.demo__footer a',
          position: 'top',
          isFixed: true,
          style: {
            beacon: '#000',
          },
        },
      ]}
      debug={false}
      callback={tourCallback}
      run
    />
  );
}
