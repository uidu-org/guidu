import { valueRenderer } from '@uidu/table';
import React, { PureComponent } from 'react';

const Cover = ({
  cover,
  item,
  children,
}: {
  cover: any;
  item: any;
  children?: any;
}) => {
  return (
    <div
      className="card-img-top"
      style={{
        height: cover && cover.width ? (cover.width * 3) / 2 : '200px',
        backgroundSize: 'cover',
        backgroundPosition: '50% 50%',
        backgroundImage:
          cover && valueRenderer(item.data, cover)
            ? `url(${valueRenderer(item.data, cover)})`
            : null,
        backgroundColor: 'rgba(76,86,106,0.025)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      {children}
    </div>
  );
};

const Avatar = ({ avatar, item }) => {
  return (
    <img
      src={valueRenderer(item.data[avatar.field], avatar)}
      style={{ borderRadius: '100%', width: '7rem' }}
    />
  );
};

export default class ItemHeader extends PureComponent<any> {
  render() {
    const { item, cover, avatar } = this.props;

    if (avatar || cover) {
      return (
        <Cover cover={cover} item={item}>
          {avatar && <Avatar avatar={avatar} item={item} />}
        </Cover>
      );
    }

    return null;
  }
}
