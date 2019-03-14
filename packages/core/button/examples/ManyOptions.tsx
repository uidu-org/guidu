import * as React from 'react';
import Calendar from '@atlaskit/icon/glyph/calendar';
import Page from '@atlaskit/icon/glyph/page';
import Question from '@atlaskit/icon/glyph/question';
import Expand from '@atlaskit/icon/glyph/arrow-down';
import Unlink from '@atlaskit/icon/glyph/editor/unlink';
import Open from '@atlaskit/icon/glyph/editor/open';

import Button, { ButtonAppearances } from '../src';

const css = `
  .container {
    display: flex;
    flex-direction: column;
    width: 70%;
  }
  .sample {
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    border-bottom: 1px solid;
    padding-bottom: 10px;
    padding-top: 10px;
  }
  .purple-border {
    border: 1px solid purple;
  }
  .pink-bg {
    background-color: pink !important;
  }
  .truncated {
    max-width: 100px;
  }
`;

class CustomComponent extends React.Component<any, {}> {
  render() {
    const { children, innerRef, ...props } = this.props; // eslint-disable-line no-unused-vars
    return <div {...props}>{children}</div>;
  }
}

const BuildStory = (props: any) => (
  <div style={{ padding: '10px' }}>
    <style>{css}</style>
    <style>{'.sample { background-color: white }'}</style>
    <div className="container">
      <div className="sample">
        <Button {...props}>Create Issue</Button>
        <span>no extra attrs</span>
      </div>

      <div className="sample">
        <Button {...props} href="//www.atlassian.com">
          Create Issue
        </Button>
        <span>with href attribute</span>
      </div>

      <div className="sample">
        <Button {...props} href="//www.atlassian.com">
          Create Issue
        </Button>
        <span>with href attribute + no target</span>
      </div>

      <div className="sample">
        <span>
          text
          <Button
            {...props}
            onClick={() => console.log('clicking the Component')}
          >
            Create Issue
          </Button>
          text
        </span>
        <span>click event + text alignment check</span>
      </div>

      <div className="sample">
        <Button
          {...props}
          isDisabled
          onClick={() => console.log('clicking the Component')}
        >
          Disabled Option
        </Button>
        <span>disabled</span>
      </div>

      <div className="sample">
        <Button
          {...props}
          isDisabled
          onClick={() => console.log('clicking the Component')}
          href="//www.atlassian.com"
          target="_blank"
        >
          Go to Site
        </Button>
        <span>disabled + href + target</span>
      </div>

      <div className="sample">
        <Button {...props} component={CustomComponent} to="/custom-link">
          With a custom component
        </Button>
      </div>

      <div className="sample">
        <Button {...props} className="purple-border pink-bg">
          Custom classes with crazy colors
        </Button>
        <span>custom classes</span>
      </div>

      <div className="sample">
        <Button {...props} className="truncated">
          Truncated text which is very long and has many words to demonstrate
          truncation
        </Button>
        <span>truncated</span>
      </div>

      <div className="sample">
        <Button {...props} isSelected>
          Selected
        </Button>
        <span>selected</span>
      </div>

      <div className="sample">
        <Button {...props} iconBefore={<Page label="page icon" />}>
          Comment
        </Button>
        <span>button + text with page icon</span>
      </div>

      <div className="sample">
        <span>
          text
          <Button
            {...props}
            iconBefore={<Question label="question icon">Question</Question>}
          >
            Info
          </Button>
          text
        </span>
        <span>button + text with question icon + text alignment check</span>
      </div>

      <div className="sample">
        <span>
          text
          <Button
            {...props}
            isSelected
            iconAfter={<Calendar label="calendar icon" />}
          >
            Pick Date
          </Button>
          text
        </span>
        <span>
          button + text with calendar icon + text alignment check + selected
        </span>
      </div>

      <div className="sample">
        <Button {...props} iconAfter={<Expand label="expand icon" />}>
          Show Options
        </Button>
        <span>button + text with expand icon</span>
      </div>

      <div className="sample">
        <Button
          {...props}
          href="//www.atlassian.com"
          iconBefore={<Page label="page icon" />}
        />
        <span>button with Page icon + href</span>
      </div>

      <div className="sample">
        <Button
          {...props}
          href="//www.atlassian.com"
          target="_blank"
          iconBefore={<Expand label="expand icon" />}
        />
        <span>button with icons + href + target</span>
      </div>

      <div className="sample">
        <span>
          text
          <Button {...props} iconBefore={<Calendar label="calendar icon" />} />
          text
        </span>
        <span>button with Calendar icon + text alignment check</span>
      </div>

      <div className="sample">
        <Button
          {...props}
          isSelected
          iconBefore={<Question label="question icon">Question</Question>}
        />
        <span>button with Question icon + selected</span>
      </div>

      <div className="sample">
        <div className="ButtonContainer">
          <style>
            {
              '.ButtonContainer > a, .ButtonContainer > button, .sample > a, .sample > button { margin-right: 5px }'
            }
          </style>
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
        </div>
        <span>button with icons, no spacing &amp; selected</span>
      </div>

      <div className="sample">
        <Button {...props} spacing="compact">
          Create Issue
        </Button>
        <span>compact</span>
      </div>

      <div className="sample">
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

      <div className="sample">
        <Button {...props} spacing="compact" isSelected>
          Selected Option
        </Button>
        <span>compact + selected</span>
      </div>

      <div className="sample">
        <Button {...props} shouldFitContainer>
          Create Issue
        </Button>
        <span>shouldFitContainer</span>
      </div>

      <div className="sample">
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
      <div>
        <h3>Select an apperance option to see its effects in contexts</h3>
        <select onChange={this.setAppearance} value={this.state.appearance}>
          {appearances.map(a => (
            <option key={a} value={a}>
              {a}
            </option>
          ))}
        </select>
        <BuildStory appearance={this.state.appearance} />
      </div>
    );
  }
}
