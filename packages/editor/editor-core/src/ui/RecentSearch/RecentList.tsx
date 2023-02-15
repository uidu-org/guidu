import { ActivityItem } from '@uidu/activity-provider';
import { MenuGroup, Section } from '@uidu/menu';
import Spinner from '@uidu/spinner';
import * as React from 'react';
import { PureComponent } from 'react';
import styled from 'styled-components';
import RecentItem from './RecentItem';

const SpinnerContainer = styled.div`
  text-align: center;
  min-height: 80px;
  margin-top: 30px;
`;

export interface Props {
  items?: Array<ActivityItem>;
  isLoading: boolean;
  selectedIndex: number;
  onSelect: (href: string, text: string) => void;
  onMouseMove: (objectId: string) => void;
}

export default class RecentList extends PureComponent<Props, {}> {
  render() {
    const { onSelect, onMouseMove, items, selectedIndex, isLoading } =
      this.props;

    if (isLoading) {
      return (
        <div>
          <SpinnerContainer>
            <Spinner invertColor size="medium" />
          </SpinnerContainer>
        </div>
      );
    }

    if (!items || items.length === 0) {
      return null;
    }

    return (
      <MenuGroup>
        <Section isScrollable>
          {items.map((item, index) => (
            <RecentItem
              item={item}
              selected={selectedIndex === index}
              onMouseMove={onMouseMove}
              onSelect={onSelect}
              key={item.objectId}
            />
          ))}
        </Section>
      </MenuGroup>
    );
  }
}
