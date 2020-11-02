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
      <>
        <ShellSidebar style={{ width: '20rem' }} className="border-right">
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
          <ShellHeader className="border-bottom px-4">
            <h5 className="m-0">
              Form Playground{' '}
              <small>
                <code>{layout}</code>
              </small>
            </h5>
          </ShellHeader>
          <ShellBody>
            <ScrollableContainer>
              <div className="container my-5">
                <div className="row justify-content-center">
                  <div className="col-sm-10">
                    <Playground
                      layoutChoice={layout}
                      sectionLayoutChoice={sectionLayout}
                      validateBeforeSubmitChoice={validateBeforeSubmit}
                      validatePristineChoice={validatePristine}
                      disabledChoice={disabled}
                    />
                  </div>
                </div>
              </div>
            </ScrollableContainer>
          </ShellBody>
        </ShellMain>
        <ShellSidebar
          style={{ width: '20rem' }}
          className="border-left"
        ></ShellSidebar>
      </>
    );
  }
}

export default App;
