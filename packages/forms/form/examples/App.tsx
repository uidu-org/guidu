import {
  ScrollableContainer,
  ShellBody,
  ShellHeader,
  ShellMain,
  ShellSidebar,
} from '@uidu/shell';
import * as React from 'react';
import Options from './Options';
import Playground from './Playground';

export type LayoutChoice = 'horizontal' | 'vertical' | 'elementOnly';

const initialState = Object.freeze({
  sectionLayout: 'vertical' as LayoutChoice,
  layout: 'vertical' as LayoutChoice,
  showingOptions: true,
  validateBeforeSubmit: true,
  validatePristine: false,
  disabled: false,
});

type State = typeof initialState;

class App extends React.Component<{}, State> {
  public readonly state: Readonly<State> = initialState;

  private handleChangeOption = (name, value): void => {
    const newState = {};
    if (Array.isArray(value)) {
      let options: string[];
      if (name === 'validationOptions') {
        options = ['validatePristine', 'validateBeforeSubmit'];
      } else if (name === 'elementOptions') {
        options = ['disabled'];
      } else {
        options = [];
      }
      options.forEach((option): void => {
        newState[option] = value.indexOf(option) !== -1;
      });
    } else {
      newState[name] = value;
    }
    this.setState(newState);
  };

  private handleToggleOptions = (): void => {
    const { showingOptions } = this.state;
    this.setState({ showingOptions: !showingOptions });
  };

  public render(): JSX.Element {
    const {
      layout,
      sectionLayout,
      validateBeforeSubmit,
      validatePristine,
      showingOptions,
      disabled,
    } = this.state;
    return (
      <ShellBody>
        <ShellSidebar style={{ width: '20rem' }} tw="border-r">
          <Options
            layoutChoice={layout}
            sectionLayoutChoice={sectionLayout}
            validateBeforeSubmitChoice={validateBeforeSubmit}
            validatePristineChoice={validatePristine}
            showing={showingOptions}
            disabledChoice={disabled}
            onChangeOption={this.handleChangeOption}
            onToggle={this.handleToggleOptions}
          />
        </ShellSidebar>
        <ShellMain>
          <ShellHeader tw="border-b flex items-center px-8">
            <h5 className="m-0">
              Form Playground{' '}
              <small>
                <code>{layout}</code>
              </small>
            </h5>
          </ShellHeader>
          <ShellBody>
            <ScrollableContainer shadowOnScroll={false}>
              <div tw="my-8 px-4 md:px-16">
                <div tw="mx-auto max-w-6xl">
                  <Playground
                    layoutChoice={layout}
                    sectionLayoutChoice={sectionLayout}
                    validateBeforeSubmitChoice={validateBeforeSubmit}
                    validatePristineChoice={validatePristine}
                    disabledChoice={disabled}
                  />
                </div>
              </div>
            </ScrollableContainer>
          </ShellBody>
        </ShellMain>
      </ShellBody>
    );
  }
}

export default App;
