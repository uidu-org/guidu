import Expand from '@atlaskit/icon/glyph/arrow-down';
import Calendar from '@atlaskit/icon/glyph/calendar';
import Open from '@atlaskit/icon/glyph/editor/open';
import Unlink from '@atlaskit/icon/glyph/editor/unlink';
import Page from '@atlaskit/icon/glyph/page';
import Question from '@atlaskit/icon/glyph/question';
import { ScrollableContainer, ShellBody, ShellHeader } from '@uidu/shell';
import * as React from 'react';
import { PlusCircle } from 'react-feather';
import Button, { ButtonAppearances, ButtonGroup } from '../src';

const styles = {
  sample: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottom: '1px solid',
    paddingBottom: '10px',
    paddingTop: '10px',
    backgroundColor: 'white',
  },
  purpleBorder: {
    border: '1px solid purple',
  },
  pinkBg: {
    backgroundColor: 'pink !important',
  },
  truncated: {
    maxWidth: '100px',
  },
  buttonContainer: {
    '> a': {
      marginRight: '5px',
    },
    '> button': {
      marginRight: '5px',
    },
    '.sample > a': {
      marginRight: '5px',
    },
    '.sample > button': {
      marginRight: '5px',
    },
  },
};

const CustomComponent = React.forwardRef<HTMLDivElement, {}>((props, ref) => (
  <div {...props} ref={ref}>
    {props.children}
  </div>
));

const BuildStory = (props: any) => (
  <div style={{ padding: '10px' }}>
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        width: '70%',
      }}
    >
      <div style={styles.sample}>
        <Button {...props}>Create Issue</Button>
        <span>no extra attrs</span>
      </div>

      <div style={styles.sample}>
        <Button {...props} href="//www.atlassian.com">
          Create Issue
        </Button>
        <span>with href attribute</span>
      </div>

      <div style={styles.sample}>
        <div tw="flex space-x-2 items-center">
          <Button {...props} href="//www.atlassian.com">
            Create Issue
          </Button>
        </div>
        <span>with href attribute + no target</span>
      </div>

      <div style={styles.sample}>
        <div tw="flex space-x-2 items-center">
          <span>text</span>
          <Button
            {...props}
            onClick={() => console.log('clicking the Component')}
          >
            Create Issue
          </Button>
          <span>text</span>
        </div>
        <span>click event + text alignment check</span>
      </div>

      <div style={styles.sample}>
        <div tw="flex space-x-2 items-center">
          <Button
            {...props}
            isDisabled
            onClick={() => console.log('clicking the Component')}
          >
            Disabled Option
          </Button>
        </div>
        <span>disabled</span>
      </div>

      <div style={styles.sample}>
        <div tw="flex space-x-2 items-center">
          <Button
            {...props}
            isDisabled
            onClick={() => console.log('clicking the Component')}
            href="//www.atlassian.com"
            target="_blank"
          >
            Go to Site
          </Button>
        </div>
        <span>disabled + href + target</span>
      </div>

      <div style={styles.sample}>
        <Button {...props} component={CustomComponent} to="/custom-link">
          With a custom component
        </Button>
      </div>

      <div style={styles.sample}>
        <Button {...props} tw="bg-red-100! text-red-500! hover:bg-red-200!">
          Custom classes with crazy colors
        </Button>
        <span>custom classes</span>
      </div>

      <div style={styles.sample}>
        <Button {...props} style={styles.truncated}>
          Truncated text which is very long and has many words to demonstrate
          truncation
        </Button>
        <span>truncated</span>
      </div>

      <div style={styles.sample}>
        <Button {...props} isSelected>
          Selected
        </Button>
        <span>selected</span>
      </div>

      <div style={styles.sample}>
        <Button
          {...props}
          iconBefore={<PlusCircle size={18} />}
          iconAfter={<div tw="bg-gray-500">N</div>}
        >
          Comment
        </Button>
        <span>button + text with page icon</span>
      </div>

      <div style={styles.sample}>
        <div tw="flex space-x-2 items-center">
          <span>text</span>
          <Button
            {...props}
            iconBefore={<Question label="question icon">Question</Question>}
          >
            Info
          </Button>
          <span>text</span>
        </div>
        <span>button + text with question icon + text alignment check</span>
      </div>

      <div style={styles.sample}>
        <div tw="flex space-x-2 items-center">
          <span>text</span>
          <Button
            {...props}
            isSelected
            iconAfter={<Calendar label="calendar icon" size="small" />}
          >
            Pick Date
          </Button>
          <span>text</span>
        </div>
        <span>
          button + text with calendar icon + text alignment check + selected
        </span>
      </div>

      <div style={styles.sample}>
        <Button
          {...props}
          iconAfter={<Expand label="expand icon" size="small" />}
        >
          Show Options
        </Button>
        <span>button + text with expand icon</span>
      </div>

      <div style={styles.sample}>
        <Button
          {...props}
          href="//www.atlassian.com"
          iconBefore={<Page label="page icon" size="small" />}
        />
        <span>button with Page icon + href</span>
      </div>

      <div style={styles.sample}>
        <Button
          {...props}
          href="//www.atlassian.com"
          target="_blank"
          iconBefore={<Expand label="expand icon" size="small" />}
        />
        <span>button with icons + href + target</span>
      </div>

      <div style={styles.sample}>
        <div tw="flex space-x-2 items-center">
          <span>text</span>
          <Button
            {...props}
            iconBefore={<Calendar label="calendar icon" size="small" />}
          />
          <span>text</span>
        </div>
        <span>button with Calendar icon + text alignment check</span>
      </div>

      <div style={styles.sample}>
        <Button
          {...props}
          isSelected
          iconBefore={
            <Question label="question icon" size="small">
              Question
            </Question>
          }
        />
        <span>button with Question icon + selected</span>
      </div>

      <div style={styles.sample}>
        <ButtonGroup>
          <Button
            {...props}
            spacing="none"
            iconBefore={<Unlink label="unlink icon">unlink</Unlink>}
          />
          <Button
            {...props}
            spacing="none"
            isSelected
            iconBefore={<Unlink label="unlink icon">unlink selected</Unlink>}
          />
          <Button
            {...props}
            spacing="none"
            iconBefore={<Open label="open icon">open</Open>}
          />
          <Button
            {...props}
            spacing="none"
            isSelected
            iconBefore={<Open label="open icon">open selected</Open>}
          />
        </ButtonGroup>
        <span>button with icons, no spacing &amp; selected</span>
      </div>

      <div style={styles.sample}>
        <Button {...props} spacing="compact">
          Create Issue
        </Button>
        <span>compact</span>
      </div>

      <div style={styles.sample}>
        <Button
          {...props}
          onClick={() => console.log('clicking the Component')}
          spacing="compact"
          isDisabled
        >
          Disabled Option
        </Button>
        <span>compact + disabled</span>
      </div>

      <div style={styles.sample}>
        <Button {...props} spacing="compact" isSelected>
          Selected Option
        </Button>
        <span>compact + selected</span>
      </div>

      <div style={styles.sample}>
        <Button {...props} shouldFitContainer>
          Create Issue
        </Button>
        <span>shouldFitContainer</span>
      </div>

      <div style={styles.sample}>
        <Button
          {...props}
          iconBefore={<Page label="page icon" />}
          shouldFitContainer
        >
          Comment
        </Button>
        <span>shouldFitContainer with page icon</span>
      </div>
    </div>
  </div>
);

const appearances: ButtonAppearances[] = [
  'default',
  'danger',
  'link',
  'primary',
  'subtle',
  'subtle-link',
  'warning',
];

type State = {
  appearance: ButtonAppearances;
};

/* eslint-disable react/no-multi-comp */
export default class extends React.Component<{}, State> {
  state: State = {
    appearance: 'default',
  };

  setAppearance = (e: { target: { value: string } }) => {
    this.setState({ appearance: e.target.value as ButtonAppearances });
  };

  render() {
    return (
      <>
        <ShellHeader>
          <h3>Select an apperance option to see its effects in contexts</h3>
          <select onChange={this.setAppearance} value={this.state.appearance}>
            {appearances.map((a) => (
              <option key={a} value={a}>
                {a}
              </option>
            ))}
          </select>
        </ShellHeader>
        <ShellBody>
          <ScrollableContainer>
            <BuildStory appearance={this.state.appearance} />
          </ScrollableContainer>
        </ShellBody>
      </>
    );
  }
}
