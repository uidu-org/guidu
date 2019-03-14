import * as React from 'react';
import { Component } from 'react';
import Form from '@uidu/form';
import FieldText from '@uidu/field-text';
import { Auth, isClientBasedAuth } from '@uidu/media-core';
import {
  genericFileId,
  defaultParams,
  defaultCollectionName,
  StoryBookAuthProvider,
} from '@uidu/media-test-helpers';
import { MediaImage } from '../src';

export interface ExampleProps {}

export interface ExampleState {
  token: string;
  imageId: string;
  collectionName: string;
  clientId: string;
  baseUrl: string;
}

export default class Example extends Component<ExampleProps, ExampleState> {
  constructor(props: ExampleProps) {
    super(props);

    this.state = {
      token: '',
      imageId: genericFileId.id,
      collectionName: defaultCollectionName,
      clientId: defaultParams.clientId,
      baseUrl: defaultParams.baseUrl,
    };
  }

  componentDidMount() {
    const authProvider = StoryBookAuthProvider.create(false);
    authProvider({ collectionName: defaultCollectionName }).then(
      (auth: Auth) => {
        this.setState({
          token: auth.token,
        });

        if (isClientBasedAuth(auth)) {
          this.setState({
            clientId: auth.clientId,
          });
        }
      },
    );
  }

  onIdChange = (e: any) => {
    this.setState({
      imageId: e.target.value,
    });
  };

  onCollectionChange = (e: any) => {
    this.setState({
      collectionName: e.target.value,
    });
  };

  onTokenChange = (e: any) => {
    this.setState({
      token: e.target.value,
    });
  };

  onClientIdChange = (e: any) => {
    this.setState({
      clientId: e.target.value,
    });
  };

  onBaseUrlChange = (e: any) => {
    this.setState({
      baseUrl: e.target.value,
    });
  };

  render() {
    const { token, imageId, collectionName, clientId, baseUrl } = this.state;
    const apiConfig = {
      token,
      clientId,
      baseUrl,
    };

    return (
      <div>
        <div
          style={{
            display: 'flex',
            padding: '10px',
          }}
        >
          <Form handleSubmit={console.log} footerRenderer={() => {}}>
            <FieldText
              name="image-id"
              label="Image id"
              placeholder="Image id..."
              value={imageId}
              onChange={this.onIdChange}
            />
            <FieldText
              name="collection-id"
              label="Collection name"
              placeholder="Collection name..."
              value={collectionName}
              onChange={this.onCollectionChange}
            />
            <FieldText
              name="token"
              label="Token"
              placeholder="Token..."
              value={token}
              onChange={this.onTokenChange}
            />
            <FieldText
              name="client-id"
              label="Client id"
              placeholder="Client id..."
              value={clientId}
              onChange={this.onClientIdChange}
            />
            <FieldText
              name="service-host"
              label="Service host"
              placeholder="Service host..."
              value={baseUrl}
              onChange={this.onBaseUrlChange}
            />
          </Form>
          <div style={{ marginLeft: 'auto' }}>
            <MediaImage
              id={imageId}
              mediaApiConfig={apiConfig}
              collectionName={collectionName}
              width={300}
            />
          </div>
        </div>
      </div>
    );
  }
}
