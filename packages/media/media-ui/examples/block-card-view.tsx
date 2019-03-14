import * as React from 'react';
import Page, { Grid, GridColumn } from '@atlaskit/page';
import Button from '@uidu/button';
import {
  BlockCardResolvingView,
  BlockCardErroredView,
  BlockCardUnauthorisedView,
  BlockCardForbiddenView,
  BlockCardResolvedView,
} from '../src/BlockCard';

const url = 'https://www.dropbox.com/';
const icon =
  'https://aem.dropbox.com/cms/content/dam/dropbox/www/en-us/branding/app-dropbox-windows@2x.png';

const log = (name: string) => () => console.log(name);
const onClick = log('Open');

class Example extends React.Component {
  state = {
    isSelected: false,
  };

  handleSelectedClick = () => {
    this.setState({
      isSelected: !this.state.isSelected,
    });
  };

  render() {
    return (
      <Page>
        <Grid>
          <GridColumn>
            <Button ariaLabel="Is selected?" onClick={this.handleSelectedClick}>
              {this.state.isSelected ? 'Deselect' : 'Make those selected'}
            </Button>
            <h4>Loading</h4>
            <BlockCardResolvingView
              isSelected={this.state.isSelected}
              onClick={onClick}
            />

            <h4>Errored</h4>
            <BlockCardErroredView
              url={url}
              isSelected={this.state.isSelected}
              message="We stumbled a bit here."
              onClick={onClick}
              onRetry={log('Retry')}
            />

            <h4>Unauthorised</h4>
            <BlockCardUnauthorisedView
              icon={icon}
              isSelected={this.state.isSelected}
              url={url}
              onClick={onClick}
              onAuthorise={log('Authorise')}
            />

            <h4>Forbidden</h4>
            <BlockCardForbiddenView
              url={url}
              isSelected={this.state.isSelected}
              onClick={onClick}
              onAuthorise={log('Authorise')}
            />

            <h4>Resolved</h4>
            <BlockCardResolvedView
              context={{
                text: 'Dropbox',
                icon: icon,
              }}
              title={{
                text: 'foo bar',
                tooltip:
                  'Qui dolor laborum consectetur nostrud et eu sint adipisicing.',
              }}
              byline={{ text: 'foo bar' }}
              isSelected={this.state.isSelected}
            />
            <br />
            <br />
            <BlockCardResolvedView
              isSelected={this.state.isSelected}
              context={{
                text: 'Dropbox',
                icon: icon,
              }}
              user={{
                name: 'Foo bar',
              }}
              title={{
                text:
                  'The public is more familiar with bad design than good design. It is, in effect, conditioned to prefer bad design, because that is what it lives with. The ne',
              }}
              byline={{
                text:
                  'Entity byline (not description) is limited to a single line, yep just one',
              }}
              description={{
                text:
                  'Descriptions can be added in the meta data area using the text display. They are used to show additional information on the object and can be up to three lines',
              }}
              thumbnail="https://www.cupcakediariesblog.com/wp-content/uploads/2016/02/cookie-monster-cupcakes-2.jpg"
              preview="https://www.timelinecoverbanner.com/facebook-covers/2012/11/sunrise-earth.jpg"
              details={[
                {
                  title: 'Size',
                  text: '44.5MB',
                },
                {
                  lozenge: {
                    text: 'foobar',
                  },
                },
                {
                  title: 'Size',
                  text: '44.5MB',
                },
                {
                  lozenge: {
                    text: 'foobar',
                  },
                },
                {
                  title: 'Size',
                  text: '44.5MB',
                },
                {
                  lozenge: {
                    text: 'foobar',
                  },
                },
                {
                  title: 'Size',
                  text: '44.5MB',
                },
                {
                  lozenge: {
                    text: 'foobar',
                  },
                },
              ]}
              users={[
                {
                  name: 'James',
                  icon:
                    'https://www.timelinecoverbanner.com/facebook-covers/2012/11/sunrise-earth.jpg',
                },
                { name: 'Scotty' },
                { name: 'Artur' },
                { name: 'Adam' },
                { name: 'Sherif' },
                { name: 'Waldemar' },
              ]}
              actions={[
                {
                  id: 'success',
                  text: 'Success',
                  handler: ({ success }) => success('Success!'),
                },
                {
                  id: 'failure',
                  text: 'Failure',
                  handler: ({ failure }) => failure(),
                },
                {
                  id: 'pending',
                  text: 'Pending',
                  handler: ({ pending }) => pending(),
                },
              ]}
            />
          </GridColumn>
        </Grid>
      </Page>
    );
  }
}

export default () => <Example />;
