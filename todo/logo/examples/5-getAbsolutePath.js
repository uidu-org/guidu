// @flow
import React, { Component } from 'react';
import { AkCodeBlock } from '@atlaskit/code';
import Select from '@atlaskit/select';
import styled from 'styled-components';
import * as Logos from '../src';

const products = [
  { label: 'Atlassian', value: 'Atlassian' },
  { label: 'Bitbucket', value: 'Bitbucket' },
  { label: 'Confluence', value: 'Confluence' },
  { label: 'Hipchat', value: 'Hipchat' },
  { label: 'JiraCore', value: 'JiraCore' },
  { label: 'Jira', value: 'Jira' },
  { label: 'JiraServiceDesk', value: 'JiraServiceDesk' },
  { label: 'JiraSoftware', value: 'JiraSoftware' },
  { label: 'StatusPage', value: 'StatusPage' },
  { label: 'Stride', value: 'Stride' },
];

const files = [
  { label: 'Logo', value: 'Logo' },
  { label: 'Icon', value: 'Icon' },
  { label: 'Wordmark', value: 'Wordmark' },
];

const SelectWrapper = styled.div`
  width: 200px;
  display: inline-block;
  padding: 20px;
`;

export default class GetPath extends Component<*, *> {
  state = {
    selectedProduct: products[0],
    selectedFile: files[0],
  };

  render() {
    const { selectedFile, selectedProduct } = this.state;

    const name = selectedProduct.value + selectedFile.value;
    const OurComponent = Logos[name];

    return (
      <div>
        <p>Select the product and the component you want to fetch from:</p>
        <SelectWrapper>
          <Select
            options={products}
            value={selectedProduct}
            onChange={e => this.setState({ selectedProduct: e })}
          />
        </SelectWrapper>
        <SelectWrapper>
          <Select
            options={files}
            value={selectedFile}
            onChange={e => this.setState({ selectedFile: e })}
          />
        </SelectWrapper>
        <p>This import statement will render the image below:</p>
        <AkCodeBlock
          language="javascript"
          text={`import ${name} from '@atlaskit/logo/dist/esm/${
            selectedProduct.value
          }Logo/${selectedFile.value}'`}
        />
        <OurComponent />
      </div>
    );
  }
}
