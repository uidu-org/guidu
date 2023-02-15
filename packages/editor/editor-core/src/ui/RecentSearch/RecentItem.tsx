import { ActivityItem } from '@uidu/activity-provider';
import { ButtonItem } from '@uidu/menu';
import { colors } from '@uidu/theme';
import * as React from 'react';
import styled from 'styled-components';

interface ContainerProps {
  selected: boolean;
}

const Container = styled.li`
  background-color: ${(props: ContainerProps) =>
    props.selected ? colors.N20 : 'transparent'};
  padding: 5px 8px;
  cursor: pointer;
  display: flex;
`;

const Icon = styled.span`
  width: 16px;
  margin-top: 3px;
  margin-right: 8px;
`;

export interface Props {
  item: ActivityItem;
  selected: boolean;
  onSelect: (href: string, text: string) => void;
  onMouseMove: (objectId: string) => void;
}

export default class RecentItem extends React.PureComponent<Props, {}> {
  handleSelect = (e: React.MouseEvent) => {
    e.preventDefault(); // don't let editor lose focus
    const { item, onSelect } = this.props;
    onSelect(item.url, item.name);
  };

  handleMouseMove = () => {
    const { onMouseMove, item } = this.props;
    onMouseMove(item.objectId);
  };

  render() {
    const { item, selected } = this.props;

    return (
      <ButtonItem
        isSelected={selected}
        onMouseDown={this.handleSelect}
        onMouseMove={this.handleMouseMove}
        iconBefore={
          <Icon>
            <img src={item.iconUrl} tw="h-4 w-4 m-0!" />
          </Icon>
        }
        description={item.container}
      >
        {item.name}
      </ButtonItem>
    );
  }
}
