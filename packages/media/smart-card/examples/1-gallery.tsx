import * as React from 'react';
import Page, { Grid, GridColumn } from '@atlaskit/page';
import Button, { ButtonGroup } from '@atlaskit/button';
import { Provider, Card, Client } from '../src';
import urlsJSON from './example-urls.json';
import styled from 'styled-components';
import * as lorem from 'lorem-ipsum';
import { colors } from '@atlaskit/theme';
import { IntlProvider } from 'react-intl';

enum GroupingModes {
  none = 'none',
  provider = 'provider',
  type = 'type',
  visibility = 'visibility',
}

type GroupingMode = keyof typeof GroupingModes;

type ExampleUrlData = {
  provider: string;
  visibility: string;
  type: string;
  url: string;
  description?: string;
};

const exampleUrls: ExampleUrlData[] = urlsJSON;
type GroupedExampleUrls = { [title: string]: Array<ExampleUrlData> };

type ExampleState = {
  mode: GroupingMode;
};

const DivWithMargin = styled.div`
  margin: 10px 0;
`;

const Heading = styled.a`
  margin: 10px 0;
  color: ${colors.N60};
  display: block;
  text-decoration: none;

  &:visited {
    color: ${colors.N60};
  }

  &:hover {
    text-decoration: underline;
    cursor: pointer;
  }
`;

// Same as Fabric Editor.
const LoremText = styled.p`
  font-size: 1em;
  line-height: 1.714;
  font-weight: normal;
  margin-bottom: 0px;
  letter-spacing: -0.005em;
`;

const ucFirst = (text: string): string =>
  text[0].toUpperCase() + text.substring(1);

class Example extends React.Component<{}, ExampleState> {
  state: ExampleState = {
    mode: 'none',
  };

  handleGroupClick = (mode: GroupingMode) => {
    this.setState({ mode });
  };

  getGroupedUrls(grouping: GroupingMode): GroupedExampleUrls {
    if (grouping === 'none') {
      return { '': exampleUrls };
    } else {
      return exampleUrls.reduce(
        (grouped, example) => ({
          ...grouped,
          [example[grouping]]: [
            ...(grouped[example[grouping]] ? grouped[example[grouping]] : []),
            example,
          ],
        }),
        {} as GroupedExampleUrls,
      );
    }
  }

  renderTitle(mode: GroupingMode, data: ExampleUrlData) {
    switch (mode) {
      case 'none':
        return (
          <Heading href={data.url} target="_blank">
            {data.provider} {data.visibility} {data.type}
            <br />
            <sub>{data.description}</sub>
          </Heading>
        );

      case 'provider':
        return (
          <Heading href={data.url} target="_blank">
            {ucFirst(data.visibility)} {data.type}
            <br />
            <sub>{data.description}</sub>
          </Heading>
        );

      case 'type':
        return (
          <Heading href={data.url} target="_blank">
            {data.provider} {data.visibility}
            <br />
            <sub>{data.description}</sub>
          </Heading>
        );

      case 'visibility':
        return (
          <Heading href={data.url} target="_blank">
            {data.provider} {data.type}
            <br />
            <sub>{data.description}</sub>
          </Heading>
        );
    }
  }

  renderByGroup(mode: GroupingMode) {
    let result: Array<React.ReactNode> = [];
    const grouped = this.getGroupedUrls(mode);
    const loremText = () =>
      lorem({
        format: 'plain',
        count: 1,
        units: 'sentences',
        suffix: '&nbsp;',
      });

    for (let title in grouped) {
      if (title) {
        result.push(<h3 key={title}>{ucFirst(title)}</h3>);
      }

      result.push.apply(
        result,
        grouped[title].map((example, idx) => (
          <DivWithMargin key={`${idx}-${title}`}>
            {this.renderTitle(mode, example)}
            <Grid>
              <GridColumn medium={6}>
                <Card
                  url={example.url}
                  client={new Client(undefined, 'staging')}
                  appearance="block"
                />
              </GridColumn>
              <GridColumn medium={6}>
                <LoremText>
                  {loremText()}
                  <Card
                    client={new Client(undefined, 'staging')}
                    url={example.url}
                    appearance="inline"
                  />{' '}
                  {loremText()}
                </LoremText>
              </GridColumn>
            </Grid>
          </DivWithMargin>
        )),
      );
    }

    return result;
  }

  renderButtons(currentMode: GroupingMode) {
    let result: Array<React.ReactNode> = [];

    for (let mode in GroupingModes) {
      result.push(
        <Button
          key={mode}
          isSelected={mode === currentMode}
          onClick={() => this.handleGroupClick(mode as GroupingMode)}
        >
          {mode}
        </Button>,
      );
    }

    return result;
  }

  render() {
    const { mode } = this.state;

    return (
      <IntlProvider locale="en">
        <Provider>
          <Page>
            <Grid>
              <GridColumn>
                <Grid>
                  <GridColumn medium={8}>
                    <ButtonGroup>
                      <Button isDisabled appearance="link">
                        Group by:
                      </Button>
                      {this.renderButtons(mode)}
                    </ButtonGroup>
                  </GridColumn>
                </Grid>

                {this.renderByGroup(mode)}
              </GridColumn>
            </Grid>
          </Page>
        </Provider>
      </IntlProvider>
    );
  }
}

export default () => <Example />;
