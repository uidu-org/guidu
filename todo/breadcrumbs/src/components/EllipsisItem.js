// @flow
import React, { Component } from 'react';
import Button from '../styled/Button';
import ItemWrapper from '../styled/BreadcrumbsItem';
import Separator from '../styled/Separator';

type Props = {|
  hasSeparator: boolean,
  onClick: Event => mixed,
|};

export default class EllipsisItem extends Component<Props, {}> {
  props: Props; // eslint-disable-line react/sort-comp

  static defaultProps = {
    hasSeparator: false,
    onClick: () => {},
  };

  render() {
    return (
      <ItemWrapper>
        <Button
          appearance="subtle-link"
          spacing="none"
          onClick={this.props.onClick}
        >
          &hellip;
        </Button>
        {this.props.hasSeparator ? <Separator>/</Separator> : null}
      </ItemWrapper>
    );
  }
}
/* eslint-enable react/prefer-stateless-function */
