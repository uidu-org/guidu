import { ButtonItem, MenuGroup } from '@uidu/menu';
import { borderRadius } from '@uidu/theme';
import React, { useCallback, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { Shortcut } from '../../../ui/styles';
import IconFallback from '../../quick-insert/assets/fallback';
import { TypeAheadItem } from '../types';

export const ItemIcon = styled.div`
  width: 40px;
  height: 40px;
  overflow: hidden;
  border: 1px solid rgba(223, 225, 229, 0.5); /* N60 at 50% */
  border-radius: ${borderRadius()}px;
  box-sizing: border-box;

  display: flex;
  justify-content: center;
  align-items: center;

  div {
    width: 40px;
    height: 40px;
  }
`;

const fallbackIcon = (label: string) => <IconFallback label={label} />;

export type TypeAheadItemsListProps = {
  items?: Array<TypeAheadItem>;
  currentIndex: number;
  insertByIndex: (index: number) => void;
  setCurrentIndex: (index: number) => void;
};

export function scrollIntoViewIfNeeded(element: HTMLElement) {
  const { offsetTop, offsetHeight, offsetParent } = element;

  const { offsetHeight: offsetParentHeight, scrollTop } =
    offsetParent as HTMLElement;

  const direction =
    offsetTop + offsetHeight > offsetParentHeight + scrollTop
      ? 1
      : scrollTop > offsetTop
      ? -1
      : 0;

  if (direction !== 0 && offsetParent) {
    offsetParent.scrollTop =
      direction === 1
        ? offsetTop + offsetHeight - offsetParentHeight
        : offsetTop;
  }
}

export function TypeAheadItemsList({
  items,
  currentIndex,
  insertByIndex,
  setCurrentIndex,
}: TypeAheadItemsListProps) {
  if (!Array.isArray(items)) {
    return null;
  }

  return (
    <MenuGroup>
      {items.map((item, index) => (
        <TypeAheadItemComponent
          key={item.key || item.title}
          item={item}
          index={index}
          currentIndex={currentIndex}
          insertByIndex={insertByIndex}
          setCurrentIndex={setCurrentIndex}
        />
      ))}
    </MenuGroup>
  );
}

export type TypeAheadItemComponentProps = {
  item: TypeAheadItem;
  index: number;
  currentIndex: number;
  insertByIndex: (index: number) => void;
  setCurrentIndex: (index: number) => void;
};

export function TypeAheadItemComponent({
  setCurrentIndex: setCurrentIndexProp,
  insertByIndex: inserByIndexProp,
  currentIndex,
  index,
  item,
}: TypeAheadItemComponentProps) {
  const ref = useRef(null);

  const isSelected = useCallback(
    () => index === currentIndex,
    [index, currentIndex],
  );

  const insertByIndex = (item) => {
    inserByIndexProp(index);
  };

  const setCurrentIndex = () => {
    if (!isSelected()) {
      setCurrentIndexProp(index);
    }
  };

  useEffect(() => {
    if (index === currentIndex && ref.current) {
      scrollIntoViewIfNeeded(ref.current);
    }
  }, [ref, currentIndex, index]);

  return item.render ? (
    <div onMouseMove={setCurrentIndex} ref={ref} style={{ overflow: 'hidden' }}>
      <item.render
        onClick={insertByIndex}
        onHover={setCurrentIndex}
        isSelected={isSelected()}
      />
    </div>
  ) : (
    <ButtonItem
      onClick={insertByIndex}
      onMouseDown={setCurrentIndex}
      iconBefore={
        <ItemIcon>
          {item.icon ? item.icon() : fallbackIcon(item.title)}
        </ItemIcon>
      }
      iconAfter={item.keyshortcut && <Shortcut>{item.keyshortcut}</Shortcut>}
      description={item.description}
      isSelected={isSelected()}
      aria-describedby={item.title}
      ref={ref}
    >
      {item.title}
    </ButtonItem>
  );
}
