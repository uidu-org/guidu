import { akEditorFloatingDialogZIndex, Popup } from '@uidu/editor-common';
import { borderRadius, colors, gridSize, math } from '@uidu/theme';
import { EditorView } from 'prosemirror-view';
import * as React from 'react';
import styled from 'styled-components';
import { selectByIndex } from '../commands/select-item';
import { setCurrentIndex } from '../commands/set-current-index';
import { TypeAheadItem } from '../types';
import { TypeAheadItemsList } from './TypeAheadItemsList';

export const TypeAheadContent = styled.div`
  background: ${colors.N0};
  border-radius: ${borderRadius()}px;
  box-shadow: 0 0 1px ${colors.N60A}, 0 4px 8px -2px ${colors.N50A};
  padding: ${math.divide(gridSize, 2)}px 0;
  width: 320px;
  max-height: 380px; /* ~5.5 visibile items */
  overflow-y: auto;
  -ms-overflow-style: -ms-autohiding-scrollbar;
  position: relative;
`;

export type TypeAheadProps = {
  active: boolean;
  items?: Array<TypeAheadItem>;
  isLoading?: boolean;
  currentIndex: number;
  editorView: EditorView;
  anchorElement?: HTMLElement;
  popupsMountPoint?: HTMLElement;
  popupsBoundariesElement?: HTMLElement;
  popupsScrollableElement?: HTMLElement;
  highlight?: JSX.Element | null;
};

export class TypeAhead extends React.Component<TypeAheadProps> {
  insertByIndex = (index: number) => {
    selectByIndex(index)(
      this.props.editorView.state,
      this.props.editorView.dispatch,
    );
  };

  setCurrentIndex = (index: number) => {
    if (index !== this.props.currentIndex) {
      setCurrentIndex(index)(
        this.props.editorView.state,
        this.props.editorView.dispatch,
      );
    }
  };

  render() {
    const {
      active,
      items,
      isLoading,
      anchorElement,
      currentIndex,
      popupsMountPoint,
      popupsBoundariesElement,
      popupsScrollableElement,
      highlight,
    } = this.props;

    if (!active || !anchorElement || !items || !items.length) {
      return null;
    }
    return (
      <Popup
        zIndex={akEditorFloatingDialogZIndex}
        target={anchorElement}
        mountTo={popupsMountPoint}
        boundariesElement={popupsBoundariesElement}
        scrollableElement={popupsScrollableElement}
        fitHeight={300}
        fitWidth={340}
        offset={[0, 8]}
      >
        <TypeAheadContent className="fabric-editor-typeahead">
          {highlight}
          {Array.isArray(items) ? (
            <TypeAheadItemsList
              insertByIndex={this.insertByIndex}
              setCurrentIndex={this.setCurrentIndex}
              items={items}
              currentIndex={currentIndex}
            />
          ) : !items && isLoading ? (
            'loading...'
          ) : (
            'no items'
          )}
        </TypeAheadContent>
      </Popup>
    );
  }
}
