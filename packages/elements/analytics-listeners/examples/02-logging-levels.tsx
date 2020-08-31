import Button from '@uidu/button';
import * as React from 'react';
import {
  createAnalyticsWebClientMock,
  createComponentWithAnalytics,
  IncorrectEventType,
} from '../examples/helpers';
import { LOG_LEVEL } from '../src';
import FabricAnalyticsListeners from '../src/FabricAnalyticsListeners';
import { FabricChannel } from '../src/types';

const DummyElementsComponentWithAnalytics = createComponentWithAnalytics(
  FabricChannel.elements,
);
const DummyGuiduComponentWithAnalytics = createComponentWithAnalytics(
  FabricChannel.guidu,
);
const GuiduIncorrectEventType = IncorrectEventType(FabricChannel.uidu);

const myOnClickHandler = () => {
  console.log('Button clicked');
};

const logLevels = [
  { name: 'DEBUG', level: LOG_LEVEL.DEBUG },
  { name: 'INFO', level: LOG_LEVEL.INFO },
  { name: 'WARN', level: LOG_LEVEL.WARN },
  { name: 'ERROR', level: LOG_LEVEL.ERROR },
  { name: 'OFF', level: LOG_LEVEL.OFF },
];

class Example extends React.Component {
  state = {
    loggingLevelIdx: 0,
  };

  changeLogLevel = () => {
    this.setState({
      loggingLevelIdx: (this.state.loggingLevelIdx + 1) % logLevels.length,
    });
  };

  render() {
    const logLevel = logLevels[this.state.loggingLevelIdx];
    return (
      <FabricAnalyticsListeners
        client={createAnalyticsWebClientMock()}
        logLevel={logLevel.level}
      >
        <div>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <Button appearance="primary" onClick={this.changeLogLevel}>
              Change log level
            </Button>
            <div style={{ padding: '16px 8px' }}>Level: {logLevel.name}</div>
          </div>
          <div style={{ display: 'block' }}>
            <DummyElementsComponentWithAnalytics onClick={myOnClickHandler} />
          </div>
          <div style={{ display: 'block' }}>
            <DummyGuiduComponentWithAnalytics onClick={myOnClickHandler} />
          </div>
          <div style={{ display: 'block' }}>
            <GuiduIncorrectEventType onClick={myOnClickHandler} />
          </div>
        </div>
      </FabricAnalyticsListeners>
    );
  }
}

Object.assign(Example, {
  meta: {
    noListener: true,
  },
});

export default Example;
