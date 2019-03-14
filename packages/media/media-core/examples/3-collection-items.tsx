import * as React from 'react';
import { Component } from 'react';
import { createUserContext } from '@uidu/media-test-helpers';
import { Subscription } from 'rxjs/Subscription';
import { FileIdentifier } from '..';
import { Card } from '@uidu/media-card';
import Button from '@uidu/button';
import { CardsWrapper, Header } from '../example-helpers/styled';

const context = createUserContext();
const collectionName = 'recents';
export interface ExampleState {
  fileIds: string[];
}

class Example extends Component<{}, ExampleState> {
  subscription?: Subscription;

  state: ExampleState = {
    fileIds: [],
  };

  componentDidMount() {
    this.getItems();
  }

  componentWillUnmount() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  renderCards() {
    const { fileIds } = this.state;
    const cards = fileIds.map(id => {
      const identifier: FileIdentifier = {
        id,
        mediaItemType: 'file',
        collectionName,
      };

      return (
        <Card
          key={id}
          identifier={identifier}
          context={context}
          dimensions={{
            width: 100,
            height: 50,
          }}
        />
      );
    });

    return (
      <CardsWrapper>
        <h1>Cards</h1>
        {cards}
      </CardsWrapper>
    );
  }

  getItems = () => {
    this.subscription = context.collection.getItems(collectionName).subscribe({
      next: items => {
        const fileIds = items.map(item => item.id);

        this.setState({
          fileIds,
        });
      },
    });
  };

  fetchNextPage = () => {
    context.collection.loadNextPage(collectionName);
  };

  getFirstPage = () => {
    // We are intentionally creating a new subscription to simulate "new items" case
    context.collection.getItems(collectionName).subscribe();
  };

  renderHeader = () => {
    const { fileIds } = this.state;

    return (
      <Header>
        <Button appearance="primary" onClick={this.fetchNextPage}>
          Fetch next page
        </Button>
        <Button appearance="primary" onClick={this.getFirstPage}>
          Get first page
        </Button>
        Items ({fileIds.length})
      </Header>
    );
  };

  render() {
    return (
      <div>
        {this.renderHeader()}
        {this.renderCards()}
      </div>
    );
  }
}

export default () => (
  <div>
    <Example />
  </div>
);
