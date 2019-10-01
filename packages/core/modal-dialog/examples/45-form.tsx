import Button from '@uidu/button';
import { Checkbox } from '@uidu/checkbox';
import FieldText from '@uidu/field-text';
import Form from '@uidu/form';
import { RadioGroup } from '@uidu/radio';
import React from 'react';
import ModalDialog, { ModalFooter, ModalTransition } from '../src';
import { FooterProps } from '../src/components/Footer';

interface State {
  isOpen: boolean;
}
export default class AtlaskitFormDemo extends React.Component<{}, State> {
  state = { isOpen: false };

  open = () => this.setState({ isOpen: true });

  close = () => this.setState({ isOpen: false });

  onFormSubmit = async (data: Object) => console.log(JSON.stringify(data));

  render() {
    const { isOpen } = this.state;
    const footer = (props: FooterProps) => (
      <ModalFooter showKeyline={props.showKeyline}>
        <span />
        <Button appearance="primary" type="submit">
          Submit to Console
        </Button>
      </ModalFooter>
    );

    const radioItems = [
      { name: 'color', value: 'red', label: 'Red' },
      { name: 'color', value: 'blue', label: 'Blue' },
      { name: 'color', value: 'yellow', label: 'Yellow' },
    ];

    interface ContainerProps {
      children: React.ReactNode;
      className?: string;
    }

    interface FormProps {
      onSubmit: (e: React.FormEvent | any) => void;
      ref: React.RefObject<HTMLFormElement>;
      onKeyDown: (e: React.KeyboardEvent) => void;
    }

    interface FieldProps {
      id: string;
      isRequired: boolean;
      isDisabled: boolean;
      isInvalid: boolean;
      onChange: (e: any) => any;
      onBlur: () => any;
      onFocus: () => any;
      value: any;
      'aria-invalid': 'true' | 'false';
      'aria-labelledby': string;
    }

    return (
      <div>
        <Button onClick={this.open}>Open Modal</Button>

        <ModalTransition>
          {isOpen && (
            <ModalDialog
              heading="Form Demo"
              onClose={this.close}
              components={{
                Container: ({ children, className }: ContainerProps) => (
                  <Form
                    handleSubmit={this.onFormSubmit}
                    footerRenderer={() => null}
                  >
                    {({ formProps }: { formProps: FormProps }) => (
                      <form {...formProps} className={className}>
                        {children}
                      </form>
                    )}
                  </Form>
                ),
                Footer: footer,
              }}
            >
              <p>Enter some text then submit the form to see the response.</p>
              <FieldText label="Name" name="my-name" defaultValue="" />
              )}
              <FieldText
                autoComplete="off"
                placeholder="gbelson@hooli.com"
                label="Email"
                name="my-email"
                defaultValue=""
              />
              <Checkbox
                value="example"
                label="Checkbox"
                name="checkbox"
                defaultIsChecked
              />
              )}
              <RadioGroup
                items={radioItems}
                label="Basic Radio Group Example"
              ></RadioGroup>
              )}
            </ModalDialog>
          )}
        </ModalTransition>
      </div>
    );
  }
}
