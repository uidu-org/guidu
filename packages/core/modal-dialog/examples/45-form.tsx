import Button from '@uidu/button';
import { Checkbox } from '@uidu/checkbox';
import FieldText from '@uidu/field-text';
import Form, { FormSubmit } from '@uidu/form';
import { RadioGroup } from '@uidu/radio';
import React from 'react';
import ModalDialog, {
  ModalBody,
  ModalFooter,
  ModalHeader,
  ModalTitle,
  ModalTransition,
} from '../src';
import { FooterProps } from '../src/components/Footer';

interface State {
  isOpen: boolean;
}
export default class GuiduFormDemo extends React.Component<{}, State> {
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
            <ModalDialog onClose={this.close}>
              <ModalHeader>
                <ModalTitle>
                  <h2>Form Demo</h2>
                </ModalTitle>
              </ModalHeader>
              <ModalBody>
                <Form
                  handleSubmit={this.onFormSubmit}
                  footerRenderer={(props) => (
                    <ModalFooter>
                      <FormSubmit {...props}>Test</FormSubmit>
                    </ModalFooter>
                  )}
                >
                  <p>
                    Enter some text then submit the form to see the response.
                  </p>
                  <FieldText label="Name" name="my-name" defaultValue="" />
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
                  <RadioGroup
                    options={radioItems}
                    name="radio"
                    label="Basic Radio Group Example"
                  ></RadioGroup>
                </Form>
              </ModalBody>
            </ModalDialog>
          )}
        </ModalTransition>
      </div>
    );
  }
}
